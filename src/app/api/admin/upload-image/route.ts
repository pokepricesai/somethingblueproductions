import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Uploads a file into the journal-images storage bucket using the service
// role, bypassing anon-key access. Middleware enforces admin auth.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const filename = url.searchParams.get('filename');
  const bucket = url.searchParams.get('bucket') || 'journal-images';
  const contentType = req.headers.get('content-type') || 'application/octet-stream';

  if (!filename || !/^[a-zA-Z0-9._-]+$/.test(filename)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(bucket)) {
    return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 });
  }

  const buffer = Buffer.from(await req.arrayBuffer());
  if (buffer.length === 0) {
    return NextResponse.json({ error: 'Empty body' }, { status: 400 });
  }
  if (buffer.length > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (10MB max)' }, { status: 413 });
  }

  const { error } = await supabaseAdmin.storage.from(bucket).upload(filename, buffer, {
    contentType,
    upsert: true,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: pub } = supabaseAdmin.storage.from(bucket).getPublicUrl(filename);
  return NextResponse.json({ url: pub.publicUrl });
}
