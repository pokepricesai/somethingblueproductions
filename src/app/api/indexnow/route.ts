import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

export const runtime = 'nodejs';

/**
 * Manual IndexNow trigger.
 *
 *   POST /api/indexnow
 *   Header: x-indexnow-secret: <value of INDEXNOW_TRIGGER_SECRET>
 *   Body:   { "urls": ["/journal/some-post", "/weddings"] }
 *
 * Set INDEXNOW_TRIGGER_SECRET in .env.local (any random string) — without it,
 * the route will refuse to run so it can't be abused publicly.
 *
 * For automated submissions from server code (e.g. after publishing a journal
 * post), import `submitToIndexNow` from `@/lib/indexnow` directly instead of
 * hitting this endpoint.
 */
export async function POST(req: Request) {
  const secret = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'INDEXNOW_TRIGGER_SECRET is not configured' },
      { status: 503 }
    );
  }

  const provided = req.headers.get('x-indexnow-secret');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const urls = (body as { urls?: unknown })?.urls;
  if (!urls || (typeof urls !== 'string' && !Array.isArray(urls))) {
    return NextResponse.json(
      { error: 'Body must be { urls: string | string[] }' },
      { status: 400 }
    );
  }

  const result = await submitToIndexNow(urls as string | string[]);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
