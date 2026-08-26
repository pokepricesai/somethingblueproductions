import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notify, RECIPIENTS } from '@/lib/notify';
import { composeBookingAlert, composeBookingConfirmation, type BookingData } from '@/lib/notify-templates';

/**
 * Voucher redemption booking — for recipients who received a gift voucher
 * and are booking their session against it.
 *
 * POST body: {
 *   voucherCode: string,
 *   booking: { name, email, phone, date, time, notes? }
 * }
 *
 * Fixes the pre-existing bug where the redemption flow did NOT mark the
 * voucher as used (allowing repeated redemptions). Server always marks the
 * voucher used after a successful booking insert.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CODE_PATTERN = /^SBP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

type BookingInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
};

function str(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t || t.length > max) return null;
  return t;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const codeRaw = (body as { voucherCode?: unknown })?.voucherCode;
  const b = (body as { booking?: BookingInput })?.booking ?? {};

  if (typeof codeRaw !== 'string') {
    return NextResponse.json({ error: 'voucherCode required' }, { status: 400 });
  }
  const code = codeRaw.trim().toUpperCase();
  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json({ error: 'Voucher code invalid.' }, { status: 400 });
  }

  const name = str(b.name, 100);
  const email = str(b.email, 200);
  const phone = str(b.phone, 40);
  const date = str(b.date, 20);
  const time = str(b.time, 10);
  const notes = typeof b.notes === 'string' ? b.notes.slice(0, 2000) : null;

  if (!name || !email || !phone || !date || !time) {
    return NextResponse.json({ error: 'Missing required booking fields' }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 422 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ error: 'Invalid date/time' }, { status: 422 });
  }

  // ── Atomic voucher claim (prevents double-redemption race) ────────
  // Update status='used' ONLY if it's currently 'unused'. If two concurrent
  // requests race, exactly one wins the update (returns the row), the other
  // gets an empty result and is rejected.
  //
  // TECHNICAL DEBT (Phase B):
  //   This flow is claim-voucher → insert-booking → rollback-voucher on
  //   booking failure. It is materially safer than the pre-Phase-B pattern
  //   (which had no atomicity at all) but it is NOT a single Postgres
  //   transaction. Two edge cases remain:
  //     (a) if the voucher UPDATE succeeds but the process crashes before
  //         the booking INSERT runs, the voucher is left in state='used'
  //         with no corresponding booking. The buyer can no longer redeem.
  //     (b) if the rollback UPDATE fails after a booking INSERT failure,
  //         the voucher is stuck as 'used' with no booking.
  //   Both windows are very small (Vercel function invocations are typically
  //   under a second). We accept the risk for now.
  //   PLANNED FIX: move the claim + insert into a Postgres RPC function
  //   (SECURITY DEFINER) that runs both statements in a single transaction
  //   and returns the booking row. Deferred as no observed correctness
  //   problem in practice.
  const nowIso = new Date().toISOString();
  const { data: claimed, error: claimErr } = await supabaseAdmin
    .from('vouchers')
    .update({ status: 'used', redeemed_at: nowIso })
    .eq('code', code)
    .eq('status', 'unused')
    .select('id, code, session_type, session_duration, session_price, buyer_name, buyer_email, recipient_name, expires_at')
    .maybeSingle();

  if (claimErr) {
    return NextResponse.json({ error: 'Voucher lookup failed' }, { status: 500 });
  }
  if (!claimed) {
    // Either the code doesn't exist, is already used, or was just claimed
    // by a concurrent request. Same user-facing message either way.
    return NextResponse.json({ error: 'Voucher not valid or already used.' }, { status: 400 });
  }
  if (new Date(claimed.expires_at) <= new Date()) {
    // Roll back the claim so the customer can be told to contact us.
    await supabaseAdmin
      .from('vouchers')
      .update({ status: 'unused', redeemed_at: null })
      .eq('id', claimed.id);
    return NextResponse.json({ error: 'Voucher has expired.' }, { status: 400 });
  }

  // ── Insert booking ────────────────────────────────────────────────
  const { data: inserted, error: bErr } = await supabaseAdmin
    .from('bookings')
    .insert({
      name, email, phone,
      service_type: claimed.session_type,
      people_count: claimed.session_duration === 60 ? 3 : 1,
      session_duration: claimed.session_duration,
      session_price: 0,
      slot_date: date,
      slot_time: time,
      voucher_code: claimed.code,
      notes,
      status: 'confirmed',
    })
    .select('id')
    .single();
  if (bErr) {
    // Booking failed AFTER we already marked voucher used. Roll back the
    // voucher so the customer can retry.
    await supabaseAdmin
      .from('vouchers')
      .update({ status: 'unused', redeemed_at: null })
      .eq('id', claimed.id);
    return NextResponse.json({ error: 'Booking insert failed' }, { status: 500 });
  }

  // ── Dispatch notifications ────────────────────────────────────────
  const bookingData: BookingData = {
    id: inserted?.id,
    name, email, phone,
    service_type: claimed.session_type,
    people_count: claimed.session_duration === 60 ? 3 : 1,
    session_duration: claimed.session_duration,
    session_price: 0,
    slot_date: date,
    slot_time: time,
    voucher_code: claimed.code,
    notes,
  };
  const adminMsg = composeBookingAlert(bookingData);
  adminMsg.toEmail = RECIPIENTS.admin.email;
  adminMsg.toName = RECIPIENTS.admin.name;
  const customerMsg = composeBookingConfirmation(bookingData);

  await Promise.all([
    notify(
      { eventType: 'redeem_alert', entityType: 'booking', entityId: inserted?.id, recipientType: 'admin' },
      adminMsg,
      ['email', 'whatsapp']
    ),
    notify(
      { eventType: 'booking_confirmation', entityType: 'booking', entityId: inserted?.id, recipientType: 'customer' },
      customerMsg,
      ['email']
    ),
  ]);

  return NextResponse.json({
    ok: true,
    bookingId: inserted?.id,
    voucher: {
      code: claimed.code,
      session_type: claimed.session_type,
      session_duration: claimed.session_duration,
      buyer_name: claimed.buyer_name,
    },
  });
}
