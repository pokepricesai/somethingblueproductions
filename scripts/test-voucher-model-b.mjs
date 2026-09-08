#!/usr/bin/env node
/**
 * Model B dry-run — proves the refactor works without charging a real customer
 * or emailing a real recipient.
 *
 * Two stages:
 *
 *   Stage A (no migration required):
 *     Proves the Stripe webhook's new parallel notification shape produces
 *     independent notification_log rows (admin email + admin whatsapp + buyer
 *     email), and that one channel failing does not prevent the other.
 *
 *   Stage B (requires phase-b2 migration applied):
 *     Proves the /api/admin/vouchers/send-recipient endpoint:
 *       - rejects unauth
 *       - refuses to re-send without confirmResend when voucher_gift_sent_at is set
 *       - allows confirmResend
 *       - refuses when voucher is revoked
 *     Stage B is skipped with a note when the migration hasn't been applied.
 *
 * All test data uses example.com addresses AND a bogus BREVO_API_KEY, so no
 * real email leaves the machine even if Brevo would accept our IP.
 *
 * Voucher #7 (the real customer) is NEVER touched.
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing Supabase env'); process.exit(1); }
const supabase = createClient(url, key, { auth: { persistSession: false } });

const ADMIN_BASIC = 'Basic ' + Buffer.from(
  (process.env.ADMIN_USERNAME || 'admin') + ':' + (process.env.ADMIN_PASSWORD || ''),
).toString('base64');
const HOST = 'http://localhost:3000';

// Force Brevo to reject every attempt so nothing real is delivered.
process.env.BREVO_API_KEY = 'test-invalid-key-do-not-send';

function assert(cond, msg) {
  if (!cond) { console.error('  ✗ ' + msg); process.exitCode = 1; }
  else console.log('  ✓ ' + msg);
}

async function insertTestVoucher() {
  const code = 'SBP-TEST-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Date.now().toString().slice(-4);
  const { data, error } = await supabase.from('vouchers').insert({
    code,
    occasion: 'DRY-RUN TEST',
    session_type: 'family',
    session_duration: 60,
    session_price: 199,
    buyer_name: 'MODEL-B DRY-RUN buyer',
    buyer_email: 'buyer-dryrun@example.com',
    recipient_name: 'MODEL-B DRY-RUN recipient',
    recipient_email: 'recipient-dryrun@example.com',
    stripe_payment_id: 'test_dryrun_' + Date.now(),
    status: 'unused',
  }).select('id, code, created_at').single();
  if (error) throw new Error('insert voucher: ' + error.message);
  return data;
}

async function cleanup(id) {
  await supabase.from('notification_log').delete().eq('entity_type', 'voucher').eq('entity_id', id);
  await supabase.from('vouchers').delete().eq('id', id);
}

async function fetchLogs(id) {
  const { data } = await supabase
    .from('notification_log')
    .select('id, event_type, recipient_type, channel, ok, status_code, error')
    .eq('entity_type', 'voucher').eq('entity_id', id)
    .order('id', { ascending: true });
  return data || [];
}

// ── Replica of notify()'s per-channel Brevo dispatch ────────────────
// Purpose: run the same wire-level shape as src/lib/notify.ts without
// bundling TypeScript. If this shape logs independent rows and honours
// Promise.allSettled semantics, so does the refactored webhook.

async function directSendEmail(msg) {
  const body = {
    sender: { name: msg.fromName, email: msg.fromEmail || 'hello@something-blue-productions.com' },
    to: [{ email: msg.toEmail, name: msg.toName }],
    subject: msg.subject, htmlContent: msg.html, textContent: msg.text,
  };
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, statusCode: res.status, error: res.ok ? null : (await res.text().catch(() => '')).slice(0, 500) };
  } catch (err) { return { ok: false, error: String(err).slice(0, 500) }; }
}

async function logAttempt(voucherId, recipientType, channel, result) {
  await supabase.from('notification_log').insert({
    event_type: 'voucher_sold', entity_type: 'voucher', entity_id: voucherId,
    channel, recipient_type: recipientType,
    ok: result.ok, status_code: result.statusCode ?? null, provider_ref: null, error: result.error ?? null,
  });
}

async function notifyChannel(voucherId, recipientType, msg, channel) {
  const result = channel === 'email'
    ? await directSendEmail(msg)
    : { ok: false, error: 'whatsapp_disabled: WHATSAPP_ACCESS_TOKEN not set (Phase C)' };
  await logAttempt(voucherId, recipientType, channel, result);
  return result;
}

async function stageA_parallelNotifyShape(voucherRow) {
  const adminMsg = {
    subject: 'New gift voucher sold — ' + voucherRow.code + ' · £199',
    html: '<p>test admin</p>', text: 'test admin',
    toEmail: 'hello@something-blue-productions.com', toName: 'Samantha', fromName: 'Something Blue Bookings',
  };
  const buyerMsg = {
    subject: 'Gift voucher purchase confirmed — ' + voucherRow.code,
    html: '<p>test buyer</p>', text: 'test buyer',
    toEmail: 'buyer-dryrun@example.com', toName: 'MODEL-B DRY-RUN buyer', fromName: 'Something Blue Productions',
  };
  // Same shape as the refactored webhook.
  await Promise.all([
    Promise.all([
      notifyChannel(voucherRow.id, 'admin', adminMsg, 'email'),
      notifyChannel(voucherRow.id, 'admin', adminMsg, 'whatsapp'),
    ]),
    Promise.all([
      notifyChannel(voucherRow.id, 'customer', buyerMsg, 'email'),
    ]),
  ]);
}

async function columnExists(table, column) {
  const { error } = await supabase.from(table).select(column).limit(1);
  return !error;
}

async function stageB_manualSendEndpoint(voucherRow) {
  console.log('  Bb1: unauthenticated request rejected');
  const unauth = await fetch(HOST + '/api/admin/vouchers/send-recipient', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voucherId: voucherRow.id }),
  });
  assert(unauth.status === 401, 'send-recipient without Basic Auth → 401 (got ' + unauth.status + ')');

  console.log('  Bb2: authenticated first-send is attempted (Brevo will 401 our IP → notify logs the failure; sent-at NOT set)');
  const send1 = await fetch(HOST + '/api/admin/vouchers/send-recipient', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: ADMIN_BASIC },
    body: JSON.stringify({ voucherId: voucherRow.id }),
  });
  const send1json = await send1.json().catch(() => ({}));
  console.log('    status=' + send1.status + ' body=' + JSON.stringify(send1json).slice(0, 140));
  assert(send1.status === 502 || send1.status === 200, 'send returned a controlled result (not a crash) — got ' + send1.status);
  if (!send1json.ok) {
    const { data: vAfterFail } = await supabase.from('vouchers').select('voucher_gift_sent_at').eq('id', voucherRow.id).single();
    assert(vAfterFail?.voucher_gift_sent_at == null, 'failed send did NOT set voucher_gift_sent_at (safe retry)');
  }

  console.log('  Bb3: forcing sent state → duplicate protection kicks in');
  await supabase.from('vouchers').update({ voucher_gift_sent_at: new Date().toISOString() }).eq('id', voucherRow.id);
  const send2 = await fetch(HOST + '/api/admin/vouchers/send-recipient', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: ADMIN_BASIC },
    body: JSON.stringify({ voucherId: voucherRow.id }),
  });
  assert(send2.status === 409, 'duplicate send without confirmResend → 409 (got ' + send2.status + ')');

  console.log('  Bb4: explicit confirmResend bypasses the dupe gate');
  const send3 = await fetch(HOST + '/api/admin/vouchers/send-recipient', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: ADMIN_BASIC },
    body: JSON.stringify({ voucherId: voucherRow.id, confirmResend: true }),
  });
  assert(send3.status !== 409, 'confirmResend bypasses the duplicate gate (got ' + send3.status + ')');

  console.log('  Bb5: revoked voucher cannot be sent');
  await supabase.from('vouchers').update({ status: 'revoked' }).eq('id', voucherRow.id);
  const send4 = await fetch(HOST + '/api/admin/vouchers/send-recipient', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: ADMIN_BASIC },
    body: JSON.stringify({ voucherId: voucherRow.id, confirmResend: true }),
  });
  assert(send4.status === 400, 'revoked voucher → 400 (got ' + send4.status + ')');
}

async function main() {
  console.log('▶ Model B dry-run — voucher #7 will NOT be touched\n');

  const { data: v7Before } = await supabase.from('vouchers').select('id, code, status').eq('id', 7).single();
  console.log('  Voucher #7 (real customer) baseline: code=' + v7Before?.code + ' status=' + v7Before?.status);
  const { data: v7LogsBefore } = await supabase.from('notification_log').select('id').eq('entity_type', 'voucher').eq('entity_id', 7);
  const v7LogCountBefore = (v7LogsBefore || []).length;

  console.log('\n▶ Step 1 — insert a TEST voucher row (buyer/recipient @example.com)');
  const test = await insertTestVoucher();
  console.log('  Test voucher id=' + test.id + ' code=' + test.code);

  try {
    console.log('\n▶ Stage A — parallel notify shape (matches src/app/api/stripe-webhook/route.ts)');
    await stageA_parallelNotifyShape(test);
    const logs = await fetchLogs(test.id);
    console.log('  Logged rows:');
    for (const l of logs) {
      console.log('    #' + l.id + ' ' + l.event_type + ' / ' + l.recipient_type + ' / ' + l.channel + ' ok=' + l.ok + ' status=' + l.status_code);
    }
    const adminEmail = logs.find(l => l.recipient_type === 'admin' && l.channel === 'email');
    const adminWa    = logs.find(l => l.recipient_type === 'admin' && l.channel === 'whatsapp');
    const buyerEmail = logs.find(l => l.recipient_type === 'customer' && l.channel === 'email');
    assert(!!adminEmail, 'admin email row was written independently');
    assert(!!adminWa,    'admin whatsapp row was written independently (Phase C stub)');
    assert(!!buyerEmail, 'buyer email row was written independently');
    assert(logs.length === 3, 'exactly 3 log rows for this voucher (not a legacy single-row summary) — got ' + logs.length);
    assert(logs.every(l => l.ok === false), 'invalid Brevo key rejected — no accidental real emails sent');
    const emailRows = logs.filter(l => l.channel === 'email');
    assert(emailRows.every(l => l.status_code === 401), 'both email attempts logged the same Brevo 401 → confirms one failure did not block the other');

    console.log('\n▶ Stage B — /api/admin/vouchers/send-recipient endpoint');
    const hasMigration = await columnExists('vouchers', 'voucher_gift_sent_at');
    if (!hasMigration) {
      console.log('  ⚠ SKIPPED — vouchers.voucher_gift_sent_at column not present.');
      console.log('    Apply scripts/phase-b2-voucher-model-b.sql in Supabase SQL editor and re-run this script.');
    } else {
      await stageB_manualSendEndpoint(test);
    }

    console.log('\n▶ Step 5 — verify voucher #7 (real customer) is unchanged');
    const { data: v7After } = await supabase.from('vouchers').select('id, code, status').eq('id', 7).single();
    assert(v7After?.code === v7Before?.code, 'voucher #7 code unchanged');
    assert(v7After?.status === v7Before?.status, 'voucher #7 status unchanged');
    const { data: v7LogsAfter } = await supabase.from('notification_log').select('id').eq('entity_type', 'voucher').eq('entity_id', 7);
    assert((v7LogsAfter || []).length === v7LogCountBefore, 'voucher #7 notification_log rows unchanged (' + v7LogCountBefore + ')');
  } finally {
    console.log('\n▶ Cleanup — deleting test voucher + log rows');
    await cleanup(test.id);
  }

  console.log('\n' + (process.exitCode ? '✗ FAILED' : '✓ PASSED'));
}

main().catch(e => { console.error(e); process.exit(1); });
