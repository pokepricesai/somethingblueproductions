import { NextRequest, NextResponse } from 'next/server';

/**
 * Basic Auth gate for admin routes.
 *
 * Protects: /admin/*, /api/admin/*
 *
 * Env vars:
 *   ADMIN_USERNAME  optional, defaults to "admin"
 *   ADMIN_PASSWORD  REQUIRED — no admin access is granted if unset
 *
 * If ADMIN_PASSWORD is not configured the middleware returns 503 for every
 * admin path. This is intentional — fail closed rather than fail open.
 */

const REALM = 'Something Blue Admin';

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  });
}

function serviceUnavailable(reason: string) {
  // Fail-closed: if the admin password isn't configured, deny access rather
  // than silently allow.
  return new NextResponse(`Admin unavailable: ${reason}`, {
    status: 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}

// Constant-time-ish string comparison. Edge Runtime has TextEncoder but not
// timingSafeEqual — this manual version avoids trivial timing leaks without
// needing Node crypto.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return serviceUnavailable('ADMIN_PASSWORD not configured');
  }
  const username = process.env.ADMIN_USERNAME || 'admin';

  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(':');
  if (idx < 0) return unauthorized();
  const providedUser = decoded.slice(0, idx);
  const providedPass = decoded.slice(idx + 1);

  if (!safeEqual(providedUser, username) || !safeEqual(providedPass, password)) {
    return unauthorized();
  }

  // Authenticated — let the request through.
  return NextResponse.next();
}

// Only gate admin routes. Everything else is public.
export const config = {
  matcher: ['/admin/:path*', '/admin', '/api/admin/:path*'],
};
