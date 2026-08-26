import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notify, RECIPIENTS } from '@/lib/notify';
import { composeBookingAlert, composeBookingConfirmation, type BookingData } from '@/lib/notify-templates';

/**
 * Booking creation for the "voucher-covered" path (customer applies a valid
 * voucher on the /book form so payment amount is £0 and Stripe is skipped).
 *
 * POST body: {
 *   voucherCode: string,
 *   booking: {
 *     name, email, phone, service, peopleCount, duration, date, time, notes?
 *   }
 * }
 *
 * Server-side flow (atomic-ish):
 *   1. Re-validate voucher (server truth — client cannot forge)
 *   2. Insert booking with session_price=0 and voucher_code set
 *   3. Mark voucher status='used' and redeemed_at=now
 *
 * The client should treat 200 as "booking confirmed"; the endpoint returns
 * the booking id so the client can trigger the confirmation email flow
 * (which currently expects a specific payload — kept unchanged in Phase A).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CODE_PATTERN = /^SBP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

type BookingInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  peopleCount?: unknown;
  duration?: unknown;
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

function num(v: unknown): number | null {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
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
  const service = str(b.service, 40);
  const peopleCount = num(b.peopleCount);
  const duration = num(b.duration);
  const date = str(b.date, 20);
  const time = str(b.time, 10);
  const notes = typeof b.notes === 'string' ? b.notes.slice(0, 2000) : null;

  if (!name || !email || !phone || !service || peopleCount == null || duration == null || !date || !time) {
    return NextResponse.json({ error: 'Missing required booking fields' }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 422 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ error: 'Invalid date/time' }, { status: 422 });
  }

  // 1. ATOMIC voucher claim (mirrors /api/bookings/redeem — prevents the
  //    race where two concurrent requests both see status='unused' and both
  //    create bookings against the same voucher).
  //    UPDATE ... WHERE status='unused' returns the row exactly once; the
  //    losing request gets an empty result and is rejected.
  //
  //    Same TECHNICAL DEBT applies as documented in /api/bookings/redeem:
  //    this is claim → insert → rollback-on-failure, not a single Postgres
  //    transaction. Planned fix is a SECURITY DEFINER RPC. Deferred.
  const nowIso = new Date().toISOString();
  const { data: claimed, error: claimErr } = await supabaseAdmin
    .from('vouchers')
    .update({ status: 'used', redeemed_at: nowIso })
    .eq('code', code)
    .eq('status', 'unused')
    .select('id, code, expires_at')
    .maybeSingle();

  if (claimErr) {
    return NextResponse.json({ error: 'Voucher lookup failed' }, { status: 500 });
  }
  if (!claimed) {
    return NextResponse.json({ error: 'Voucher not valid or already used.' }, { status: 400 });
  }
  if (new Date(claimed.expires_at) <= new Date()) {
    // Roll back the claim so the buyer can be told to contact us.
    await supabaseAdmin
      .from('vouchers')
      .update({ status: 'unused', redeemed_at: null })
      .eq('id', claimed.id);
    return NextResponse.json({ error: 'Voucher has expired.' }, { status: 400 });
  }

  // 2. Insert booking
  const { data: inserted, error: bErr } = await supabaseAdmin
    .from('bookings')
    .insert({
      name, email, phone,
      service_type: service,
      people_count: peopleCount,
      session_duration: duration,
      session_price: 0,
      slot_date: date,
      slot_time: time,
      voucher_code: code,
      notes,
      status: 'confirmed',
    })
    .select('id')
    .single();
  if (bErr) {
    // Booking failed AFTER voucher was already claimed. Roll back the
    // claim so the customer can retry.
    await supabaseAdmin
      .from('vouchers')
      .update({ status: 'unused', redeemed_at: null })
      .eq('id', claimed.id);
    return NextResponse.json({ error: 'Booking insert failed' }, { status: 500 });
  }

  // 4. Dispatch notifications via the unified service.
  const bookingData: BookingData = {
    id: inserted?.id,
    name, email, phone,
    service_type: service,
    people_count: peopleCount,
    session_duration: duration,
    session_price: 0,
    slot_date: date,
    slot_time: time,
    voucher_code: code,
    notes,
  };
  const adminMsg = composeBookingAlert(bookingData);
  adminMsg.toEmail = RECIPIENTS.admin.email;
  adminMsg.toName = RECIPIENTS.admin.name;
  const customerMsg = composeBookingConfirmation(bookingData);

  // Fire both channels for each recipient — swallowed internally.
  await Promise.all([
    notify(
      { eventType: 'booking_alert', entityType: 'booking', entityId: inserted?.id, recipientType: 'admin' },
      adminMsg,
      ['email', 'whatsapp']
    ),
    notify(
      { eventType: 'booking_confirmation', entityType: 'booking', entityId: inserted?.id, recipientType: 'customer' },
      customerMsg,
      ['email']
    ),
  ]);

  return NextResponse.json({ ok: true, bookingId: inserted?.id });
}
