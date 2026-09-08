import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notify } from '@/lib/notify';
import { composeVoucherGiftEmail, type VoucherData } from '@/lib/notify-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Model B: manually send the gift voucher email to the recipient.
 *
 * Protected by /api/admin/* Basic Auth middleware.
 *
 * Body: { voucherId: number, confirmResend?: boolean }
 *
 * Behaviour:
 *  - Voucher is loaded from the DB (source of truth); we never trust client
 *    fields for the actual email content, so a stale admin session can't send
 *    a doctored voucher.
 *  - If voucher_gift_sent_at is already set and confirmResend is not true, we
 *    return 409 without sending — the admin UI must explicitly confirm a
 *    resend to avoid accidental duplicates.
 *  - Revoked vouchers cannot be sent.
 *  - Uses the unified notify() service so the send is logged as its own
 *    notification_log row (event_type='voucher_sold', recipient_type='customer',
 *    channel='email'). Notify never throws.
 *  - Only marks voucher_gift_sent_at on Brevo success — a failed send stays
 *    "not sent" so the admin retry doesn't need the resend flag.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { voucherId, confirmResend } = body as { voucherId?: number; confirmResend?: boolean };
  if (typeof voucherId !== 'number') {
    return NextResponse.json({ error: 'voucherId (number) required' }, { status: 400 });
  }

  const { data: v, error: readErr } = await supabaseAdmin
    .from('vouchers')
    .select('id, code, occasion, session_type, session_duration, session_price, buyer_name, buyer_email, recipient_name, recipient_email, status, voucher_gift_sent_at, created_at')
    .eq('id', voucherId)
    .single();

  if (readErr || !v) {
    return NextResponse.json({ error: 'Voucher not found' }, { status: 404 });
  }
  if (v.status === 'revoked') {
    return NextResponse.json({ error: 'Voucher is revoked' }, { status: 400 });
  }
  if (v.voucher_gift_sent_at && !confirmResend) {
    return NextResponse.json({
      error: 'Already sent',
      alreadySentAt: v.voucher_gift_sent_at,
      hint: 'Pass confirmResend:true to send again.',
    }, { status: 409 });
  }

  // Message is derived from the DB row we just fetched. The admin UI supplies
  // no email content — this is intentional so verification is against the
  // stored voucher rather than what a stale form field might have.
  const voucher: VoucherData = {
    id: v.id,
    code: v.code,
    occasion: v.occasion,
    session_type: v.session_type,
    session_duration: v.session_duration,
    session_price: v.session_price,
    buyer_name: v.buyer_name,
    buyer_email: v.buyer_email,
    recipient_name: v.recipient_name,
    recipient_email: v.recipient_email,
    message: null,
    created_at: v.created_at,
  };

  const msg = composeVoucherGiftEmail(voucher);
  if (!msg.toEmail) {
    return NextResponse.json({ error: 'No recipient email on voucher' }, { status: 400 });
  }

  const result = await notify(
    { eventType: 'voucher_sold', entityType: 'voucher', entityId: v.id, recipientType: 'customer' },
    msg,
    ['email'],
  );

  if (result.email.ok) {
    // Timestamp the successful send so the admin UI can render "sent at ..."
    // and require an explicit resend confirmation next time.
    const { error: upErr } = await supabaseAdmin
      .from('vouchers')
      .update({ voucher_gift_sent_at: new Date().toISOString() })
      .eq('id', v.id);
    if (upErr) console.error('[voucher-send] failed to timestamp send', upErr);
  }

  return NextResponse.json({
    ok: result.email.ok,
    statusCode: result.email.statusCode ?? null,
    providerRef: result.email.providerRef ?? null,
    error: result.email.error ?? null,
    resend: !!v.voucher_gift_sent_at,
  }, { status: result.email.ok ? 200 : 502 });
}
