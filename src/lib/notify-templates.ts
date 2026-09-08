/**
 * Message composers for each notification event type.
 * All customer-supplied fields are HTML-escaped in the html builder.
 */

import { escapeHtml, type Message } from './notify';

const ADMIN_URL_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://something-blue-productions.com';

// ── Enquiry alert (admin) ────────────────────────────────────────────

export interface EnquiryData {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  spam_status?: string | null;
  source_page?: string | null;
  created_at: string;
}

export function composeEnquiryAlert(e: EnquiryData): Message {
  const submitted = new Date(e.created_at).toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/London',
  });

  const spamLabel = e.spam_status && e.spam_status !== 'genuine'
    ? `<div style="background:#fff3cd;border-left:3px solid #C8572A;padding:12px 16px;margin-bottom:20px;">
         <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8572A;margin:0 0 4px;">⚠ ${escapeHtml(e.spam_status)}</p>
         <p style="font-family:Georgia,serif;font-size:13px;color:#5c5550;margin:0;">Marked by spam filter — please review manually.</p>
       </div>`
    : '';

  const adminUrl = `${ADMIN_URL_BASE}/admin/enquiries`;

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8572A;margin:0 0 8px;">New Something Blue enquiry</p>
    <h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 20px;">${escapeHtml(e.name)}</h2>
    ${spamLabel}
    <table style="width:100%;border-collapse:collapse;">
      ${e.service ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;width:100px;">Type</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(e.service)}</td></tr>` : ''}
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Email</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="mailto:${escapeHtml(e.email)}" style="color:#1B3A5C;">${escapeHtml(e.email)}</a></td></tr>
      ${e.phone ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Phone</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="tel:${escapeHtml(e.phone)}" style="color:#1B3A5C;">${escapeHtml(e.phone)}</a></td></tr>` : ''}
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Submitted</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(submitted)}</td></tr>
      ${e.source_page ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">From page</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(e.source_page)}</td></tr>` : ''}
    </table>
    <div style="background:#F5F0E8;padding:20px;margin:24px 0;border-left:3px solid #C8572A;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.8;margin:0;white-space:pre-wrap;">${escapeHtml(e.message)}</p>
    </div>
    <div style="margin-top:24px;display:flex;gap:8px;flex-wrap:wrap;">
      <a href="mailto:${escapeHtml(e.email)}?subject=Re: Your enquiry — Something Blue Productions" style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:12px 20px;text-decoration:none;display:inline-block;">Reply</a>
      ${e.phone ? `<a href="tel:${escapeHtml(e.phone)}" style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#F5F0E8;color:#1B3A5C;padding:12px 20px;text-decoration:none;display:inline-block;border:1px solid #DDD5C0;">Call</a>` : ''}
    </div>
    <p style="font-family:Georgia,serif;font-size:12px;color:#9E9282;margin:20px 0 0;"><a href="${adminUrl}" style="color:#1B3A5C;">View in admin →</a></p>
  </div>
</body>
</html>`;

  const text = [
    `NEW SOMETHING BLUE ENQUIRY`,
    e.spam_status && e.spam_status !== 'genuine' ? `[${e.spam_status.toUpperCase()}]` : '',
    ``,
    e.service ? `Type: ${e.service}` : '',
    `Name: ${e.name}`,
    e.phone ? `Phone: ${e.phone}` : '',
    `Email: ${e.email}`,
    ``,
    `Message:`,
    e.message,
    ``,
    e.source_page ? `From page: ${e.source_page}` : '',
    `Submitted: ${submitted}`,
    ``,
    `Admin: ${adminUrl}`,
  ].filter(Boolean).join('\n');

  return {
    subject: `${e.spam_status === 'suspected_spam' ? '[possibly spam] ' : ''}New enquiry from ${e.name}${e.service ? ' — ' + e.service : ''}`,
    html,
    text,
    toEmail: undefined, // set by caller
    toName: undefined,
    replyToEmail: e.email,
    replyToName: e.name,
    fromName: 'Something Blue Website',
  };
}

// ── Enquiry confirmation (customer) ──────────────────────────────────

export function composeEnquiryConfirmation(e: EnquiryData): Message {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:32px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#E8DDB5;margin:0;">We've got your enquiry.</h1>
    </div>
    <div style="padding:32px 40px;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 20px;">Hi ${escapeHtml(e.name.split(' ')[0] || e.name)},</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 20px;">Thanks for getting in touch about ${e.service ? escapeHtml(e.service.toLowerCase()) : 'your session'}. Samantha reads every message personally and will come back to you as soon as possible.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 20px;">If you'd rather chat directly, you're welcome to reply to this email or call/WhatsApp us on 07765 253340.</p>
      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;line-height:1.7;margin:20px 0 0;">— Something Blue Productions<br/>Papworth Everard, Cambridgeshire</p>
    </div>
    <div style="background:#0d1b2a;padding:20px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">hello@something-blue-productions.com · something-blue-productions.com</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `Hi ${e.name.split(' ')[0] || e.name},`,
    ``,
    `Thanks for getting in touch about ${e.service ? e.service.toLowerCase() : 'your session'}. Samantha reads every message personally and will come back to you as soon as possible.`,
    ``,
    `If you'd rather chat directly, reply to this email or call/WhatsApp us on 07765 253340.`,
    ``,
    `— Something Blue Productions`,
    `Papworth Everard, Cambridgeshire`,
    `hello@something-blue-productions.com`,
  ].join('\n');

  return {
    subject: `We've got your enquiry — Something Blue Productions`,
    html,
    text,
    toEmail: e.email,
    toName: e.name,
    fromName: 'Something Blue Productions',
  };
}

// ── Booking alert (admin) ────────────────────────────────────────────

export interface BookingData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  people_count?: number;
  session_duration: number;
  session_price: number;
  slot_date: string;
  slot_time: string;
  voucher_code?: string | null;
  notes?: string | null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Europe/London',
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}${m !== '00' ? ':' + m : ''}${ampm}`;
}

export function composeBookingAlert(b: BookingData): Message {
  const isVoucher = !!b.voucher_code;
  const label = b.session_duration === 60 ? 'Family Session' : 'Studio Session';
  const dateFmt = formatDate(b.slot_date);
  const timeFmt = formatTime(b.slot_time);
  const adminUrl = `${ADMIN_URL_BASE}/admin/bookings`;

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#1B3A5C;margin:0 0 8px;">${isVoucher ? 'Voucher redeemed' : 'New booking'}</p>
    <h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 20px;">${escapeHtml(b.name)}</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;width:110px;">Session</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(label)} · ${escapeHtml(b.service_type)}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Date</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(dateFmt)}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Time</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(timeFmt)}</td></tr>
      ${b.people_count ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">People</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${b.people_count}</td></tr>` : ''}
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Email</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="mailto:${escapeHtml(b.email)}" style="color:#1B3A5C;">${escapeHtml(b.email)}</a></td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Phone</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="tel:${escapeHtml(b.phone)}" style="color:#1B3A5C;">${escapeHtml(b.phone)}</a></td></tr>
      ${isVoucher ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Voucher</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(b.voucher_code || '')}</td></tr>` : `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Paid</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">£${b.session_price}</td></tr>`}
      ${b.notes ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;">Notes</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;white-space:pre-wrap;">${escapeHtml(b.notes)}</td></tr>` : ''}
    </table>
    <div style="margin-top:24px;">
      <a href="${adminUrl}" style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:12px 20px;text-decoration:none;display:inline-block;">View in admin</a>
    </div>
  </div>
</body>
</html>`;

  const text = [
    isVoucher ? `VOUCHER REDEEMED` : `NEW BOOKING`,
    ``,
    `Customer: ${b.name}`,
    `Session: ${label} · ${b.service_type}`,
    `Date: ${dateFmt}`,
    `Time: ${timeFmt}`,
    b.people_count ? `People: ${b.people_count}` : '',
    ``,
    `Phone: ${b.phone}`,
    `Email: ${b.email}`,
    ``,
    isVoucher ? `Voucher: ${b.voucher_code}` : `Paid: £${b.session_price}`,
    b.notes ? `Notes: ${b.notes}` : '',
    b.id ? `Booking ID: ${b.id}` : '',
    ``,
    `Admin: ${adminUrl}`,
  ].filter(Boolean).join('\n');

  return {
    subject: `${isVoucher ? 'Voucher redeemed' : 'New booking'} — ${b.name} · ${dateFmt} ${timeFmt}`,
    html,
    text,
    fromName: 'Something Blue Bookings',
  };
}

// ── Booking confirmation (customer) ──────────────────────────────────

export function composeBookingConfirmation(b: BookingData): Message {
  const label = b.session_duration === 60 ? 'Family Session' : 'Studio Session';
  const imagesLabel = b.session_duration === 60 ? '10–20' : '5–10';
  const dateFmt = formatDate(b.slot_date);
  const timeFmt = formatTime(b.slot_time);

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:40px 40px 32px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:28px;color:#E8DDB5;margin:0;">You're booked in.</h1>
    </div>
    <div style="padding:32px 40px;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 24px;">Hi ${escapeHtml(b.name.split(' ')[0] || b.name)},</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 24px;">We're looking forward to seeing you at the studio. Here are your booking details:</p>
      <div style="background:#F5F0E8;border-left:3px solid #1B3A5C;padding:20px 24px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;width:110px;">Session</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(label)}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Date</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(dateFmt)}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Time</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(timeFmt)}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Duration</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${b.session_duration} minutes</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Images</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${imagesLabel} included</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Studio</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">Papworth Everard, CB23</td></tr>
        </table>
      </div>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.7;margin:0 0 16px;">Please arrive a few minutes early so we can get started on time. The studio is relaxed and informal — we'll guide you through everything on the day.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.7;margin:0 0 20px;">Need to make a change? Please give us at least 48 hours notice. Email <a href="mailto:hello@something-blue-productions.com" style="color:#1B3A5C;">hello@something-blue-productions.com</a>.</p>
    </div>
    <div style="background:#0d1b2a;padding:20px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">Something Blue Productions · Papworth Everard, Cambridgeshire</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `Hi ${b.name.split(' ')[0] || b.name},`,
    ``,
    `Your session is confirmed.`,
    ``,
    `Session: ${label}`,
    `Date: ${dateFmt}`,
    `Time: ${timeFmt}`,
    `Duration: ${b.session_duration} minutes`,
    `Images included: ${imagesLabel}`,
    `Studio: Papworth Everard, CB23`,
    ``,
    `Please arrive a few minutes early.`,
    `Need to change? Email hello@something-blue-productions.com (48h notice).`,
    ``,
    `— Something Blue Productions`,
  ].join('\n');

  return {
    subject: `Your session is confirmed — ${dateFmt}`,
    html,
    text,
    toEmail: b.email,
    toName: b.name,
    fromName: 'Something Blue Productions',
  };
}

// ── Gift voucher — buyer confirmation + admin sale alert ─────────────

export interface VoucherData {
  id: number;
  code: string;
  occasion: string;
  session_type: string;             // 'family' | 'studio'
  session_duration: number;         // 30 | 60
  session_price: number;            // GBP
  buyer_name: string;
  buyer_email: string;
  recipient_name?: string | null;
  recipient_email?: string | null;
  message?: string | null;
  created_at?: string | null;
}

function voucherSessionLabel(v: VoucherData): string {
  return v.session_duration === 60
    ? 'Family Session (60 min · 10–20 images)'
    : 'Studio Session (30 min · 5–10 images)';
}

function formatVoucherTimestamp(created_at?: string | null): string {
  const d = created_at ? new Date(created_at) : new Date();
  return d.toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/London',
  });
}

/**
 * Admin sale alert (Model B): fires immediately after a successful voucher
 * purchase. Contains everything Samantha needs to verify the sale and manually
 * send the recipient voucher from the admin panel.
 */
export function composeVoucherSoldAlert(v: VoucherData): Message {
  const sessionLabel = voucherSessionLabel(v);
  const purchasedAt = formatVoucherTimestamp(v.created_at);
  const adminUrl = `${ADMIN_URL_BASE}/admin/bookings?tab=vouchers#voucher-${v.id}`;

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C8572A;margin:0 0 8px;">New gift voucher sale</p>
    <h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 20px;">${escapeHtml(v.buyer_name)}</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;width:120px;">Package</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(sessionLabel)} — £${v.session_price}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Occasion</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(v.occasion)}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Voucher code</td><td style="font-family:'Courier New',monospace;font-size:14px;color:#1B3A5C;font-weight:bold;letter-spacing:2px;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(v.code)}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Purchased</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(purchasedAt)}</td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Purchaser</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(v.buyer_name)} · <a href="mailto:${escapeHtml(v.buyer_email)}" style="color:#1B3A5C;">${escapeHtml(v.buyer_email)}</a></td></tr>
      <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Recipient</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${escapeHtml(v.recipient_name || '—')}${v.recipient_email ? ` · <a href="mailto:${escapeHtml(v.recipient_email)}" style="color:#1B3A5C;">${escapeHtml(v.recipient_email)}</a>` : ''}</td></tr>
      ${v.message ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;vertical-align:top;">Message</td><td style="font-family:Georgia,serif;font-size:14px;color:#2C2820;padding:8px 0;font-style:italic;white-space:pre-wrap;">"${escapeHtml(v.message)}"</td></tr>` : ''}
    </table>
    <div style="background:#F5F0E8;border-left:3px solid #C8572A;padding:14px 18px;margin:24px 0;">
      <p style="font-family:Georgia,serif;font-size:13px;color:#5c5550;margin:0;line-height:1.6;">The recipient has <strong>not</strong> been emailed. Use the admin panel to verify recipient details before sending the gift voucher email.</p>
    </div>
    <div style="margin-top:24px;">
      <a href="${adminUrl}" style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:12px 20px;text-decoration:none;display:inline-block;">Open voucher in admin</a>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `NEW GIFT VOUCHER SALE`,
    ``,
    `Package: ${sessionLabel} — £${v.session_price}`,
    `Occasion: ${v.occasion}`,
    `Voucher code: ${v.code}`,
    `Purchased: ${purchasedAt}`,
    ``,
    `Purchaser: ${v.buyer_name} <${v.buyer_email}>`,
    `Recipient: ${v.recipient_name || '—'}${v.recipient_email ? ` <${v.recipient_email}>` : ''}`,
    v.message ? `Personal message: "${v.message}"` : '',
    ``,
    `The recipient has NOT been emailed automatically.`,
    `Send the gift voucher manually from admin: ${adminUrl}`,
  ].filter(Boolean).join('\n');

  return {
    subject: `New gift voucher sold — ${v.code} · £${v.session_price}`,
    html,
    text,
    fromName: 'Something Blue Bookings',
  };
}

/**
 * Buyer confirmation (Model B): sent to the purchaser after their payment
 * clears. States plainly that Something Blue will arrange the gift voucher
 * delivery — makes no automated promise about timing.
 */
export function composeVoucherPurchaseConfirmation(v: VoucherData): Message {
  const sessionLabel = voucherSessionLabel(v);
  const firstName = v.buyer_name.split(' ')[0] || v.buyer_name;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:40px 40px 32px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:26px;color:#E8DDB5;margin:0 0 6px;">Payment received.</h1>
      <p style="font-family:Georgia,serif;font-size:13px;color:rgba(232,221,181,0.7);margin:0;">Thank you, ${escapeHtml(firstName)}.</p>
    </div>

    <div style="padding:32px 40px;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 20px;">Your gift voucher purchase is confirmed. Here are the details for your records:</p>

      <div style="background:#F5F0E8;border-left:3px solid #1B3A5C;padding:20px 24px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;width:110px;">Package</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(sessionLabel)}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Paid</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">£${v.session_price}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Voucher code</td><td style="font-family:'Courier New',monospace;font-size:14px;color:#1B3A5C;font-weight:bold;letter-spacing:2px;padding:6px 0;">${escapeHtml(v.code)}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Occasion</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(v.occasion)}</td></tr>
          ${v.recipient_name ? `<tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Recipient</td><td style="font-family:Georgia,serif;font-size:14px;color:#1B3A5C;padding:6px 0;">${escapeHtml(v.recipient_name)}</td></tr>` : ''}
        </table>
      </div>

      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 16px;">Something Blue will arrange delivery of the gift voucher${v.recipient_name ? ` to ${escapeHtml(v.recipient_name)}` : ''}. If you'd like to add anything, change the recipient details, or ask us to hold the voucher until a specific date, just reply to this email.</p>

      <p style="font-family:Georgia,serif;font-size:15px;color:#2C2820;line-height:1.7;margin:0 0 20px;">If you'd rather chat directly, you're welcome to reply to this email or call/WhatsApp us on 07765 253340.</p>

      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;line-height:1.7;margin:20px 0 0;">— Something Blue Productions<br/>Papworth Everard, Cambridgeshire</p>
    </div>

    <div style="background:#0d1b2a;padding:20px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">hello@something-blue-productions.com · something-blue-productions.com</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Payment received — thank you. Your gift voucher purchase is confirmed.`,
    ``,
    `Package: ${sessionLabel}`,
    `Paid: £${v.session_price}`,
    `Voucher code: ${v.code}`,
    `Occasion: ${v.occasion}`,
    v.recipient_name ? `Recipient: ${v.recipient_name}` : '',
    ``,
    `Something Blue will arrange delivery of the gift voucher${v.recipient_name ? ` to ${v.recipient_name}` : ''}.`,
    `If you'd like to change any details, hold the voucher for a specific date, or ask any questions — just reply to this email.`,
    ``,
    `Or call/WhatsApp us on 07765 253340.`,
    ``,
    `— Something Blue Productions`,
    `Papworth Everard, Cambridgeshire`,
    `hello@something-blue-productions.com`,
  ].filter(Boolean).join('\n');

  return {
    subject: `Gift voucher purchase confirmed — ${v.code}`,
    html,
    text,
    toEmail: v.buyer_email,
    toName: v.buyer_name,
    fromName: 'Something Blue Productions',
  };
}

/**
 * Bespoke recipient gift email — SENT MANUALLY from the admin panel only.
 * Not fired by the Stripe webhook. This keeps the attractive voucher design
 * while gating delivery behind explicit admin verification (Model B).
 */
export function composeVoucherGiftEmail(v: VoucherData): Message {
  const sessionLabel = voucherSessionLabel(v);
  const recipientName = (v.recipient_name && v.recipient_name.trim())
    ? v.recipient_name.trim()
    : v.buyer_name;
  const recipientEmail = (v.recipient_email && v.recipient_email.trim())
    ? v.recipient_email.trim()
    : v.buyer_email;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:28px;color:#E8DDB5;margin:0 0 8px;">A gift for you.</h1>
      <p style="font-family:Georgia,serif;font-size:14px;color:rgba(232,221,181,0.6);margin:0;">${escapeHtml(v.occasion)}</p>
    </div>

    ${v.message ? `
    <div style="background:#F5F0E8;padding:32px 40px;border-bottom:1px solid #DDD5C0;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;font-style:italic;margin:0;">"${escapeHtml(v.message)}"</p>
      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;margin:12px 0 0;">— ${escapeHtml(v.buyer_name)}</p>
    </div>` : ''}

    <div style="padding:40px;">
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 24px;">Dear ${escapeHtml(recipientName)},</p>
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 32px;">You've been gifted a photography session at Something Blue Productions studio in Papworth Everard, Cambridgeshire. Choose your own date and time when you're ready to book.</p>

      <div style="background:#0d1b2a;padding:32px;margin-bottom:32px;text-align:center;">
        <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A8CAEC;margin:0 0 16px;">Gift Voucher</p>
        <p style="font-family:'Courier New',monospace;font-size:24px;font-weight:bold;color:#E8DDB5;letter-spacing:4px;margin:0 0 16px;">${escapeHtml(v.code)}</p>
        <p style="font-family:Georgia,serif;font-size:13px;color:rgba(232,221,181,0.6);margin:0 0 8px;">${escapeHtml(sessionLabel)}</p>
        <p style="font-family:Georgia,serif;font-size:12px;color:rgba(232,221,181,0.4);margin:0;">Valid for 12 months · All images included</p>
      </div>

      <h2 style="font-family:Georgia,serif;font-weight:300;font-size:20px;color:#1B3A5C;margin:0 0 16px;">How to redeem</h2>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 8px;">1. Visit our booking page</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 8px;">2. Select <strong>Redeem a gift voucher</strong></p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 32px;">3. Enter your code <strong>${escapeHtml(v.code)}</strong> and choose your date</p>

      <div style="text-align:center;margin:40px 0;">
        <a href="${ADMIN_URL_BASE}/book" style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:16px 32px;text-decoration:none;display:inline-block;">Book your session</a>
      </div>

      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;line-height:1.7;margin:0;">Any questions? Email us at <a href="mailto:hello@something-blue-productions.com" style="color:#1B3A5C;">hello@something-blue-productions.com</a></p>
    </div>

    <div style="background:#0d1b2a;padding:24px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">Something Blue Productions · Papworth Everard, Cambridgeshire</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `A gift for you — ${v.occasion}`,
    ``,
    v.message ? `"${v.message}" — ${v.buyer_name}` : '',
    v.message ? `` : '',
    `Dear ${recipientName},`,
    ``,
    `You've been gifted a photography session at Something Blue Productions studio in Papworth Everard, Cambridgeshire. Choose your own date and time when you're ready to book.`,
    ``,
    `Voucher code: ${v.code}`,
    `Package: ${sessionLabel}`,
    `Valid: 12 months · All images included`,
    ``,
    `How to redeem:`,
    `1. Visit ${ADMIN_URL_BASE}/book`,
    `2. Select "Redeem a gift voucher"`,
    `3. Enter code ${v.code} and choose your date`,
    ``,
    `Any questions? hello@something-blue-productions.com`,
  ].filter(x => x !== null && x !== undefined).join('\n');

  return {
    subject: `Your gift voucher — Something Blue Productions`,
    html,
    text,
    toEmail: recipientEmail,
    toName: recipientName,
    fromName: 'Something Blue Productions',
  };
}

// ── Test alert ───────────────────────────────────────────────────────

export function composeTestAlert(kind: 'enquiry' | 'booking'): Message {
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:20px;background:#fff3cd;font-family:Georgia,serif;">
  <div style="max-width:500px;margin:0 auto;background:#fff;padding:24px;border:2px dashed #C8572A;">
    <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C8572A;margin:0 0 8px;">🧪 TEST — ${kind}</p>
    <h2 style="font-family:Georgia,serif;font-weight:300;font-size:22px;color:#1B3A5C;margin:0 0 16px;">Notification test — please ignore</h2>
    <p style="font-family:Georgia,serif;font-size:14px;color:#5c5550;line-height:1.7;margin:0 0 12px;">This is a test alert triggered manually via /api/notify/test.</p>
    <p style="font-family:Georgia,serif;font-size:14px;color:#5c5550;line-height:1.7;margin:0 0 12px;">No real ${kind} was created. The notification_log has a corresponding test row.</p>
    <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;margin:16px 0 0;">Sent at ${now}</p>
  </div>
</body></html>`;

  const text = [
    `🧪 TEST — ${kind}`,
    ``,
    `Notification test — please ignore.`,
    `No real ${kind} was created. Triggered manually via /api/notify/test.`,
    ``,
    `Sent at ${now}`,
  ].join('\n');

  return {
    subject: `🧪 TEST — Something Blue notification (${kind})`,
    html,
    text,
    fromName: 'Something Blue Test',
  };
}
