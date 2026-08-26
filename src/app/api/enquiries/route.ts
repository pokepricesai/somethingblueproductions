import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  notify,
  RECIPIENTS,
  markEnquiryNotificationStatus,
  computeStatus,
  type NotifyResult,
} from '@/lib/notify';
import {
  composeEnquiryAlert,
  composeEnquiryConfirmation,
  type EnquiryData,
} from '@/lib/notify-templates';

/**
 * Public enquiry submission endpoint.
 *
 * Layered spam protection (cheapest first):
 *   1. Honeypot field (hidden `website` input — bots fill everything).
 *   2. Timing check (form must have been rendered ≥3s before submission).
 *   3. Schema validation (types, lengths, formats).
 *   4. Rate limit (per-IP submissions per hour).
 *   5. Service whitelist (must be one of our real services).
 *
 * Classification:
 *   - blocked_obvious_bot: honeypot filled OR submit <3s after render.
 *                         Row stored, NO notification.
 *   - suspected_spam:     soft signals only (very short message, single-word name).
 *                         Row stored, notification sent WITH warning banner.
 *   - genuine:            default. Row stored, normal notification.
 *
 * The DB save is the source of truth. Notifications never gate the customer's
 * success response.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ── Config ───────────────────────────────────────────────────────────

const RATE_LIMIT_PER_HOUR = 5;
const RATE_LIMIT_BURST_5MIN = 3;
const MIN_SUBMIT_MS = 3000;

// Whitelist for the service field — matches what /enquire form offers.
const SERVICE_WHITELIST = new Set([
  'Wedding Photography',
  'Wedding Videography',
  'Wedding Photography & Videography',
  'Family Photography',
  'Newborn Photography',
  'Maternity Photography',
  'Headshots',
  'Brand & Business Photography',
  'Performance & Show Photography',
  'Extended Studio Session',
  'Outdoor Session',
  'Multi-outfit Shoot',
  'Other',
]);

// ── Input parsing / validation ───────────────────────────────────────

interface Input {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  website: string;      // honeypot
  formTs: number;       // ms epoch when form rendered
  sourcePage?: string;
}

function str(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  const t = v.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function parseInput(raw: unknown): Input {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    name: str(r.name, 100),
    email: str(r.email, 200),
    phone: str(r.phone, 40),
    service: str(r.service, 60),
    date: str(r.date, 60),
    message: str(r.message, 5000),
    website: str(r.website, 200),          // honeypot
    formTs: Number(r.formTs) || 0,
    sourcePage: str(r.sourcePage, 300),
  };
}

type ValidationResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

function validate(i: Input): ValidationResult {
  // Required fields
  if (!i.name || i.name.length < 2) return { ok: false, status: 422, error: 'Name required.' };
  if (!i.email) return { ok: false, status: 422, error: 'Email required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(i.email)) return { ok: false, status: 422, error: 'Invalid email.' };
  if (!i.service) return { ok: false, status: 422, error: 'Please pick a service.' };
  if (!i.message || i.message.length < 5) return { ok: false, status: 422, error: 'Please include a message.' };
  // Phone is optional but if given, should be reasonable
  if (i.phone && !/^[+\d\s()-]{6,25}$/.test(i.phone)) return { ok: false, status: 422, error: 'Invalid phone format.' };
  return { ok: true };
}

function classify(i: Input): { spam_status: 'genuine' | 'suspected_spam' | 'blocked_obvious_bot'; reasons: string[] } {
  const reasons: string[] = [];
  // Hard blocks
  if (i.website) return { spam_status: 'blocked_obvious_bot', reasons: ['honeypot_filled'] };
  const elapsed = Date.now() - i.formTs;
  if (i.formTs > 0 && elapsed < MIN_SUBMIT_MS) {
    return { spam_status: 'blocked_obvious_bot', reasons: [`too_fast:${elapsed}ms`] };
  }
  // Soft signals
  if (i.message.length < 20) reasons.push('short_message');
  if (!SERVICE_WHITELIST.has(i.service)) reasons.push('unknown_service');
  if (!/\s/.test(i.name)) reasons.push('single_word_name');
  if (/^\d+$/.test(i.name)) reasons.push('numeric_name');
  // Suspicious phone patterns (e.g. all zeros, obviously nonsense)
  if (i.phone && /^(\d)\1{5,}$/.test(i.phone.replace(/\D/g, ''))) reasons.push('bogus_phone');
  return { spam_status: reasons.length >= 2 ? 'suspected_spam' : 'genuine', reasons };
}

// ── Rate limit (Supabase-backed) ─────────────────────────────────────

async function checkRateLimit(ip: string | null): Promise<{ ok: boolean; reason?: string }> {
  if (!ip) return { ok: true };  // can't rate-limit without an IP; allow through

  const now = new Date();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

  const { count: hourCount } = await supabaseAdmin
    .from('enquiries')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', hourAgo);
  if ((hourCount ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return { ok: false, reason: `rate_limit_hour:${hourCount}` };
  }

  const { count: burstCount } = await supabaseAdmin
    .from('enquiries')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', fiveMinAgo);
  if ((burstCount ?? 0) >= RATE_LIMIT_BURST_5MIN) {
    return { ok: false, reason: `rate_limit_burst:${burstCount}` };
  }

  return { ok: true };
}

// ── Handler ──────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string | null {
  // Preference order for trustworthiness:
  //
  //   1. x-vercel-forwarded-for — set by Vercel's edge network with the
  //      real client IP only. Cannot be spoofed by the client because
  //      Vercel overwrites any incoming value. This is Vercel's
  //      documented canonical client IP header. Prefer this on Vercel.
  //
  //   2. x-real-ip — also set by Vercel with the same trusted value.
  //      Kept as a fallback if the Vercel-specific header is missing
  //      (e.g. running behind a different reverse proxy locally).
  //
  //   3. x-forwarded-for — a spoofable, potentially-chained header.
  //      Only used as a last resort so local dev / third-party proxy
  //      setups still get some rate-limit protection. Take the LEFTMOST
  //      entry (the originating client) and be aware it may be spoofed.
  //
  // We intentionally do NOT trust arbitrary client headers when a
  // Vercel-set header is available.
  const vercel = req.headers.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return null;
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const input = parseInput(raw);
  const v = validate(input);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: v.status });
  }

  const ip = getClientIp(req);
  const userAgent = (req.headers.get('user-agent') || '').slice(0, 500);

  // Rate limit (before any DB writes)
  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    // Genuine users hitting the limit is unlikely with our thresholds; still
    // return a friendly 429 that the form can display.
    return NextResponse.json(
      { error: "Too many enquiries from this address in a short period. Please try again shortly or email us directly." },
      { status: 429 }
    );
  }

  const classification = classify(input);

  // Insert enquiry (source of truth)
  const { data: inserted, error: insertError } = await supabaseAdmin
    .from('enquiries')
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      service: input.service,
      date: input.date || null,
      message: input.message,
      read: false,
      spam_status: classification.spam_status,
      notification_status: classification.spam_status === 'blocked_obvious_bot' ? 'skipped_spam' : 'pending',
      source_page: input.sourcePage || null,
      ip: ip || null,
      user_agent: userAgent || null,
    })
    .select('id, created_at')
    .single();

  if (insertError || !inserted) {
    console.error('[enquiries] insert failed', insertError);
    return NextResponse.json({ error: 'Save failed. Please try again shortly.' }, { status: 500 });
  }

  const enquiryId = inserted.id as number;

  // For obvious bots, return success quietly (don't notify, don't waste Brevo quota)
  if (classification.spam_status === 'blocked_obvious_bot') {
    return NextResponse.json({ ok: true, id: enquiryId, classification: classification.spam_status });
  }

  // Compose messages and dispatch. NotifyResults are awaited so we can update
  // the enquiry's notification_status, but the customer already gets 201
  // regardless — see the return AFTER notifications complete.
  const enquiryData: EnquiryData = {
    id: enquiryId,
    name: input.name,
    email: input.email,
    phone: input.phone,
    service: input.service,
    message: input.message,
    spam_status: classification.spam_status,
    source_page: input.sourcePage,
    created_at: inserted.created_at,
  };

  const adminMsg = composeEnquiryAlert(enquiryData);
  adminMsg.toEmail = RECIPIENTS.admin.email;
  adminMsg.toName = RECIPIENTS.admin.name;

  const customerMsg = composeEnquiryConfirmation(enquiryData);

  // Dispatch both in parallel; each swallows its own errors.
  const [adminResult, customerResult] = await Promise.all<NotifyResult>([
    notify(
      {
        eventType: 'enquiry_alert',
        entityType: 'enquiry',
        entityId: enquiryId,
        recipientType: 'admin',
      },
      adminMsg,
      ['email', 'whatsapp']
    ),
    notify(
      {
        eventType: 'enquiry_confirmation',
        entityType: 'enquiry',
        entityId: enquiryId,
        recipientType: 'customer',
      },
      customerMsg,
      ['email']  // customer never gets WhatsApp (would need their opt-in)
    ),
  ]);

  await markEnquiryNotificationStatus(enquiryId, computeStatus(adminResult, customerResult));

  return NextResponse.json({
    ok: true,
    id: enquiryId,
    classification: classification.spam_status,
  });
}
