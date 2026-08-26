import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

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

  const { data: voucher, error: vErr } = await supabaseAdmin
    .from('vouchers')
    .select('id, code, session_type, session_duration, session_price, buyer_name, buyer_email, recipient_name, expires_at, status')
    .eq('code', code)
    .maybeSingle();
  if (vErr) return NextResponse.json({ error: 'Voucher lookup failed' }, { status: 500 });
  if (!voucher || voucher.status !== 'unused') {
    return NextResponse.json({ error: 'Voucher not valid.' }, { status: 400 });
  }
  if (new Date(voucher.expires_at) <= new Date()) {
    return NextResponse.json({ error: 'Voucher has expired.' }, { status: 400 });
  }

  const { data: inserted, error: bErr } = await supabaseAdmin
    .from('bookings')
    .insert({
      name, email, phone,
      service_type: voucher.session_type,
      people_count: voucher.session_duration === 60 ? 3 : 1,
      session_duration: voucher.session_duration,
      session_price: 0,
      slot_date: date,
      slot_time: time,
      voucher_code: voucher.code,
      notes,
      status: 'confirmed',
    })
    .select('id')
    .single();
  if (bErr) return NextResponse.json({ error: 'Booking insert failed' }, { status: 500 });

  const { error: uErr } = await supabaseAdmin
    .from('vouchers')
    .update({ status: 'used', redeemed_at: new Date().toISOString() })
    .eq('id', voucher.id);
  if (uErr) console.error('Voucher mark-used failed:', uErr);

  // Return voucher (redacted) so the client can post it to send-redeem-confirmation
  return NextResponse.json({
    ok: true,
    bookingId: inserted?.id,
    voucher: {
      code: voucher.code,
      session_type: voucher.session_type,
      session_duration: voucher.session_duration,
      buyer_name: voucher.buyer_name,
    },
  });
}
