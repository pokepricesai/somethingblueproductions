import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DAYS = new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('availability_slots')
    .select('*')
    .is('specific_date', null);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ slots: data ?? [] });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { day_of_week, slot_time } = body as { day_of_week?: string; slot_time?: string };
  if (!day_of_week || !DAYS.has(day_of_week)) {
    return NextResponse.json({ error: 'Invalid day_of_week' }, { status: 400 });
  }
  if (!slot_time || !/^\d{2}:\d{2}$/.test(slot_time)) {
    return NextResponse.json({ error: 'Invalid slot_time' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('availability_slots')
    .insert({ day_of_week, slot_time, is_active: true, specific_date: null })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ slot: data });
}

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { id, is_active } = body as { id?: number; is_active?: boolean };
  if (typeof id !== 'number' || typeof is_active !== 'boolean') {
    return NextResponse.json({ error: 'id and is_active required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('availability_slots').update({ is_active }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('availability_slots').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
