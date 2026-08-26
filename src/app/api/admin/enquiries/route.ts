import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Auth is enforced by middleware.ts (Basic Auth on /api/admin/*).
// If a request reaches this handler, it is already authenticated.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ enquiries: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const patch = body as { id?: number; ids?: number[]; read?: boolean };

  // Bulk mark-all-read: no id, read boolean supplied
  if (!patch.id && !patch.ids && typeof patch.read === 'boolean') {
    const { error } = await supabaseAdmin
      .from('enquiries')
      .update({ read: patch.read })
      .eq('read', !patch.read);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  // Single-id update
  if (typeof patch.id === 'number' && typeof patch.read === 'boolean') {
    const { error } = await supabaseAdmin
      .from('enquiries')
      .update({ read: patch.read })
      .eq('id', patch.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
}
