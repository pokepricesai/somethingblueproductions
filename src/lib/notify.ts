/**
 * Unified server-side notification service.
 *
 * Design goals:
 *   - Every notification attempt is logged to notification_log — success or failure.
 *   - Multiple channels (email, whatsapp) dispatch in parallel via Promise.allSettled;
 *     one channel failing never blocks the other.
 *   - Notification failure NEVER blocks the caller's primary path.
 *     Callers should fire-and-await notify() *after* returning success to the
 *     user, or wrap the call itself in try/catch — this module already swallows
 *     errors internally, so it's safe to just `await notify(...)`.
 *   - Composition is separated from delivery: builders create Message objects,
 *     channels deliver them. Adding WhatsApp later requires no changes to callers.
 *
 * Current channels:
 *   - email: Brevo API
 *   - whatsapp: STUBBED (returns skipped result) until Phase C wires it up.
 */

import { supabaseAdmin } from './supabase-admin';

// ── Types ────────────────────────────────────────────────────────────

export type Channel = 'email' | 'whatsapp';
export type RecipientType = 'admin' | 'customer' | 'test';

export type EventType =
  | 'enquiry_alert'
  | 'enquiry_confirmation'
  | 'booking_alert'
  | 'booking_confirmation'
  | 'redeem_alert'
  | 'voucher_sold'
  | 'test_alert';

export interface Message {
  subject: string;
  html: string;
  text: string;                    // plain text version (for WhatsApp; also email fallback)
  toEmail?: string;
  toName?: string;
  toPhone?: string;                // international format, e.g. "447700123456"
  replyToEmail?: string;
  replyToName?: string;
  fromName?: string;
  fromEmail?: string;
}

export interface DispatchContext {
  eventType: EventType;
  entityType: 'enquiry' | 'booking' | 'voucher' | 'test';
  entityId?: number | null;
  recipientType: RecipientType;
}

interface ChannelResult {
  ok: boolean;
  statusCode?: number;
  providerRef?: string;
  error?: string;
}

// ── Utils ────────────────────────────────────────────────────────────

const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'hello@something-blue-productions.com';
const FROM_EMAIL = process.env.NOTIFY_FROM_EMAIL || 'hello@something-blue-productions.com';
const FROM_NAME = process.env.NOTIFY_FROM_NAME || 'Something Blue Productions';

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};

/** Escape untrusted text for safe interpolation into HTML email templates. */
export function escapeHtml(input: string | null | undefined): string {
  if (input == null) return '';
  return String(input).replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);
}

/** Trim to a max length for logs so we never store huge error blobs. */
function truncate(s: string | undefined | null, max: number): string | undefined {
  if (!s) return undefined;
  return s.length > max ? s.slice(0, max) : s;
}

// ── Channels ─────────────────────────────────────────────────────────

async function sendEmail(msg: Message): Promise<ChannelResult> {
  if (!process.env.BREVO_API_KEY) {
    return { ok: false, error: 'BREVO_API_KEY not configured' };
  }
  if (!msg.toEmail) {
    return { ok: false, error: 'no toEmail' };
  }

  const body: Record<string, unknown> = {
    sender: { name: msg.fromName || FROM_NAME, email: msg.fromEmail || FROM_EMAIL },
    to: [{ email: msg.toEmail, name: msg.toName || msg.toEmail }],
    subject: msg.subject,
    htmlContent: msg.html,
    textContent: msg.text,
  };
  if (msg.replyToEmail) {
    body.replyTo = { email: msg.replyToEmail, name: msg.replyToName || msg.replyToEmail };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { ok: false, statusCode: res.status, error: truncate(errText, 500) };
    }
    const json = await res.json().catch(() => ({} as { messageId?: string }));
    return {
      ok: true,
      statusCode: res.status,
      providerRef: truncate((json as { messageId?: string }).messageId, 200),
    };
  } catch (err) {
    return { ok: false, error: truncate(err instanceof Error ? err.message : String(err), 500) };
  }
}

async function sendWhatsApp(msg: Message): Promise<ChannelResult> {
  // Stub. Phase C wires this up using WhatsApp Cloud API.
  // Keeping the same signature and log semantics means the caller doesn't
  // need to change when we go live.
  if (!process.env.WHATSAPP_ACCESS_TOKEN) {
    return { ok: false, error: 'whatsapp_disabled: WHATSAPP_ACCESS_TOKEN not set (Phase C)' };
  }
  // Placeholder for future implementation
  void msg;
  return { ok: false, error: 'whatsapp_not_implemented' };
}

// ── Logging ──────────────────────────────────────────────────────────

async function logAttempt(
  ctx: DispatchContext,
  channel: Channel,
  result: ChannelResult
): Promise<void> {
  try {
    await supabaseAdmin.from('notification_log').insert({
      event_type: ctx.eventType,
      entity_type: ctx.entityType,
      entity_id: ctx.entityId ?? null,
      channel,
      recipient_type: ctx.recipientType,
      ok: result.ok,
      status_code: result.statusCode ?? null,
      provider_ref: result.providerRef ?? null,
      error: result.error ?? null,
    });
  } catch (err) {
    // If we can't log, at least emit to server logs so it's visible in Vercel.
    console.error('[notify] failed to write notification_log', err);
  }
}

// ── Public API ───────────────────────────────────────────────────────

export interface NotifyResult {
  email: ChannelResult;
  whatsapp: ChannelResult;
  /** Overall — true if AT LEAST one channel succeeded. */
  anyOk: boolean;
}

/**
 * Deliver a message via the requested channels, logging each attempt.
 * Never throws. Returns a per-channel result.
 */
export async function notify(
  ctx: DispatchContext,
  msg: Message,
  channels: Channel[] = ['email', 'whatsapp']
): Promise<NotifyResult> {
  const attempts = channels.map(async (ch): Promise<[Channel, ChannelResult]> => {
    const result = ch === 'email' ? await sendEmail(msg) : await sendWhatsApp(msg);
    await logAttempt(ctx, ch, result);
    return [ch, result];
  });

  const settled = await Promise.allSettled(attempts);
  const results: Record<Channel, ChannelResult> = {
    email: { ok: false, error: 'not_attempted' },
    whatsapp: { ok: false, error: 'not_attempted' },
  };
  for (const s of settled) {
    if (s.status === 'fulfilled') {
      const [ch, r] = s.value;
      results[ch] = r;
    }
    // 'rejected' shouldn't happen because sendEmail/sendWhatsApp are try/catch-guarded,
    // but if it does, we leave the not_attempted default.
  }

  return { email: results.email, whatsapp: results.whatsapp, anyOk: results.email.ok || results.whatsapp.ok };
}

/** Convenience recipient constants. */
export const RECIPIENTS = {
  admin: { email: ADMIN_EMAIL, name: 'Samantha' },
};

/** Best-effort update of enquiries.notification_status based on results. */
export async function markEnquiryNotificationStatus(
  enquiryId: number,
  status: 'pending' | 'sent' | 'partial' | 'failed' | 'skipped_spam'
): Promise<void> {
  try {
    await supabaseAdmin
      .from('enquiries')
      .update({ notification_status: status })
      .eq('id', enquiryId);
  } catch (err) {
    console.error('[notify] failed to mark enquiry status', err);
  }
}

/** Given a combined admin+customer NotifyResult, compute the enquiry status. */
export function computeStatus(admin: NotifyResult, customer: NotifyResult): 'sent' | 'partial' | 'failed' {
  // We treat admin alert as the critical one.
  const adminOk = admin.anyOk;
  const customerOk = customer.anyOk;
  if (adminOk && customerOk) return 'sent';
  if (adminOk || customerOk) return 'partial';
  return 'failed';
}
