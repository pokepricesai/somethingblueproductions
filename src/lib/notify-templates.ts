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
