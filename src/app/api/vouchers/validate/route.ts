import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Public voucher validator.
 *
 * POST body: { code: string }
 *
 * Returns 200 with a limited-field voucher record if:
 *   - the code matches a row
 *   - status = 'unused'
 *   - expires_at > now
 *
 * Otherwise returns 404 (invalid or already used) or 410 (expired).
 *
 * IMPORTANT: does NOT expose enumeration — you must provide an exact code.
 * Never accepts wildcards / partial matches. Voucher table itself is not
 * anon-readable (Phase A RLS), so this is the only path to voucher lookup
 * for the public /book flow.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CODE_PATTERN = /^SBP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const raw = (body as { code?: unknown })?.code;
  if (typeof raw !== 'string') {
    return NextResponse.json({ error: 'code required' }, { status: 400 });
  }

  const code = raw.trim().toUpperCase();
  if (!CODE_PATTERN.test(code)) {
    // Uniform "not found" response — no leak that the format is even wrong
    return NextResponse.json({ error: 'Voucher code not found or already used.' }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from('vouchers')
    .select('id, code, occasion, session_type, session_duration, session_price, recipient_name, buyer_name, expires_at, status')
    .eq('code', code)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }
  if (!data || data.status !== 'unused') {
    return NextResponse.json({ error: 'Voucher code not found or already used.' }, { status: 404 });
  }
  if (new Date(data.expires_at) <= new Date()) {
    return NextResponse.json({ error: 'This voucher has expired.' }, { status: 410 });
  }

  return NextResponse.json({ voucher: data });
}
