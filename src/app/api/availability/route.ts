import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Public availability lookup — returns non-PII slot data needed by /book
 * (config slots, per-date overrides, and taken booking slots) without
 * exposing any customer data.
 *
 * Query:
 *   ?month=YYYY-MM   returns taken booking slots for that month
 *
 * Returns only { slot_date, slot_time } for bookings — no names, emails or
 * anything else. Config data (availability_slots, slot_overrides) is
 * non-sensitive and returned in full.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidMonth(v: string | null): v is string {
  return !!v && /^\d{4}-(0[1-9]|1[0-2])$/.test(v);
}

function isValidDate(v: string | null): v is string {
  return !!v && /^\d{4}-\d{2}-\d{2}$/.test(v);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month'); // "YYYY-MM"
  const date = searchParams.get('date');   // "YYYY-MM-DD"

  if (!isValidMonth(month) && !isValidDate(date)) {
    return NextResponse.json(
      { error: 'Provide month=YYYY-MM or date=YYYY-MM-DD' },
      { status: 400 }
    );
  }

  const defaultsRes = supabaseAdmin
    .from('availability_slots')
    .select('day_of_week, slot_time')
    .eq('is_active', true)
    .is('specific_date', null);

  if (isValidMonth(month)) {
    // First of month → first of next month (half-open range avoids 30/31 edge cases)
    const [y, m] = month.split('-').map(Number);
    const start = `${month}-01`;
    const nextY = m === 12 ? y + 1 : y;
    const nextM = m === 12 ? 1 : m + 1;
    const startOfNext = `${nextY}-${String(nextM).padStart(2, '0')}-01`;
    const [defaults, overrides, bookings] = await Promise.all([
      defaultsRes,
      supabaseAdmin.from('slot_overrides').select('slot_date, slot_time, type').gte('slot_date', start).lt('slot_date', startOfNext),
      supabaseAdmin.from('bookings').select('slot_date, slot_time').gte('slot_date', start).lt('slot_date', startOfNext).eq('status', 'confirmed'),
    ]);
    if (defaults.error) return NextResponse.json({ error: defaults.error.message }, { status: 500 });
    if (overrides.error) return NextResponse.json({ error: overrides.error.message }, { status: 500 });
    if (bookings.error) return NextResponse.json({ error: bookings.error.message }, { status: 500 });
    return NextResponse.json({
      defaults: defaults.data ?? [],
      overrides: overrides.data ?? [],
      bookings: bookings.data ?? [],
    });
  }

  // date query
  const [defaults, overrides, bookings] = await Promise.all([
    defaultsRes,
    supabaseAdmin.from('slot_overrides').select('slot_time, type').eq('slot_date', date!),
    supabaseAdmin.from('bookings').select('slot_time').eq('slot_date', date!).eq('status', 'confirmed'),
  ]);
  if (defaults.error) return NextResponse.json({ error: defaults.error.message }, { status: 500 });
  if (overrides.error) return NextResponse.json({ error: overrides.error.message }, { status: 500 });
  if (bookings.error) return NextResponse.json({ error: bookings.error.message }, { status: 500 });
  return NextResponse.json({
    defaults: defaults.data ?? [],
    overrides: overrides.data ?? [],
    bookings: bookings.data ?? [],
  });
}
