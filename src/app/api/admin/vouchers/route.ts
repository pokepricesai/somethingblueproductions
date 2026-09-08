import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  // Selecting * so voucher_gift_sent_at (added in phase-b2 migration) flows
  // through automatically once the DB column exists. If the migration hasn't
  // been applied yet the field is simply absent from each row.
  const { data, error } = await supabaseAdmin
    .from('vouchers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ vouchers: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { id, status } = body as { id?: number; status?: string };
  if (typeof id !== 'number' || typeof status !== 'string') {
    return NextResponse.json({ error: 'id and status required' }, { status: 400 });
  }
  const allowed = new Set(['unused', 'used', 'revoked']);
  if (!allowed.has(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('vouchers').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
