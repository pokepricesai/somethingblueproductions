import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES = new Set(['blocked', 'added']);

export async function GET() {
  const { data, error } = await supabaseAdmin.from('slot_overrides').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ overrides: data ?? [] });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { slot_date, slot_time, type } = body as { slot_date?: string; slot_time?: string; type?: string };
  if (!slot_date || !/^\d{4}-\d{2}-\d{2}$/.test(slot_date)) {
    return NextResponse.json({ error: 'Invalid slot_date' }, { status: 400 });
  }
  if (!slot_time || !/^\d{2}:\d{2}$/.test(slot_time)) {
    return NextResponse.json({ error: 'Invalid slot_time' }, { status: 400 });
  }
  if (!type || !TYPES.has(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('slot_overrides')
    .insert({ slot_date, slot_time, type })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ override: data });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { id, type } = body as { id?: number; type?: string };
  if (typeof id !== 'number' || !type || !TYPES.has(type)) {
    return NextResponse.json({ error: 'id and valid type required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('slot_overrides').update({ type }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('slot_overrides').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
