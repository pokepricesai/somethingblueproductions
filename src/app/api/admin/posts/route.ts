import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Middleware.ts enforces Basic Auth on /api/admin/*.
// Posts are public content (no PII) but write access still needs gating so
// only the admin dashboard can modify them.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { id, patch } = body as { id?: number; patch?: Record<string, unknown> };
  if (typeof id !== 'number' || !patch || typeof patch !== 'object') {
    return NextResponse.json({ error: 'id and patch required' }, { status: 400 });
  }
  // Whitelist keys we allow updating from the admin UI
  const allowed = new Set(['published', 'image_url', 'title', 'meta_description', 'excerpt', 'body', 'category', 'faqs']);
  const safePatch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (allowed.has(k)) safePatch[k] = v;
  }
  if (Object.keys(safePatch).length === 0) {
    return NextResponse.json({ error: 'No allowed fields' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('posts').update(safePatch).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
