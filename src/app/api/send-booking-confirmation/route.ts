import { NextRequest, NextResponse } from 'next/server';
async function sendEmail(to: {email: string, name: string}[], subject: string, htmlContent: string, sender = { name: 'Something Blue Productions', email: 'hello@something-blue-productions.com' }, replyTo?: {email: string, name: string}) {
  const body: Record<string, unknown> = { sender, to, subject, htmlContent };
  if (replyTo) body.replyTo = replyTo;
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo error: ${err}`);
  }
  return res.json();
}

function formatTime(time: string) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}${m !== '00' ? ':' + m : ''}${ampm}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Europe/London',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { meta, sessionId } = await req.json();

    const sessionLabel = parseInt(meta.session_duration) === 60 ? 'Family Session' : 'Studio Session';
    const imagesLabel = parseInt(meta.session_duration) === 60 ? '10–20' : '5–10';
    const dateFormatted = formatDate(meta.slot_date);
    const timeFormatted = formatTime(meta.slot_time);

    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:40px 40px 32px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:32px;color:#E8DDB5;margin:0;">You're booked in.</h1>
    </div>
    <div style="padding:40px;">
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 24px;">Hi ${meta.name},</p>
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 32px;">We're looking forward to seeing you at the studio. Here are your booking details:</p>
      
      <div style="background:#F5F0E8;border-left:3px solid #1B3A5C;padding:24px;margin-bottom:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;width:120px;">Session</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">${sessionLabel}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Date</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">${dateFormatted}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Time</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">${timeFormatted}</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Duration</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">${meta.session_duration} minutes</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Images</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">${imagesLabel} included</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Studio</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">Papworth Everard, CB23</td></tr>
          <tr><td style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:6px 0;">Paid</td><td style="font-family:Georgia,serif;font-size:15px;color:#1B3A5C;padding:6px 0;">£${meta.session_price}</td></tr>
        </table>
      </div>

      <h2 style="font-family:Georgia,serif;font-weight:300;font-size:20px;color:#1B3A5C;margin:0 0 16px;">What to expect</h2>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 12px;">Please arrive a few minutes early so we can get started on time. The studio is relaxed and informal — we'll guide you through everything on the day.</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 32px;">All outfits and styling are arranged by you before your session. If you need any advice on what to wear, don't hesitate to get in touch.</p>

      <h2 style="font-family:Georgia,serif;font-weight:300;font-size:20px;color:#1B3A5C;margin:0 0 16px;">Need to make a change?</h2>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 32px;">Please give us at least 48 hours notice. Email us at <a href="mailto:hello@something-blue-productions.com" style="color:#1B3A5C;">hello@something-blue-productions.com</a> and we'll sort it out.</p>

      <div style="text-align:center;margin:40px 0;">
        <a href="https://something-blue-productions.com" style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:16px 32px;text-decoration:none;display:inline-block;">Visit our website</a>
      </div>
    </div>
    <div style="background:#0d1b2a;padding:24px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">Something Blue Productions · Papworth Everard, Cambridgeshire · hello@something-blue-productions.com</p>
    </div>
  </div>
</body>
</html>`;

    const samHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:500px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9E9282;margin:0 0 16px;">New Booking</p>
    <h2 style="font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 24px;">${meta.name}</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;width:100px;">Session</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${sessionLabel}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Date</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${dateFormatted}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Time</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${timeFormatted}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Service</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${meta.service_type}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">People</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${meta.people_count}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Email</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="mailto:${meta.email}" style="color:#1B3A5C;">${meta.email}</a></td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Phone</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="tel:${meta.phone}" style="color:#1B3A5C;">${meta.phone}</a></td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Paid</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">£${meta.session_price}</td></tr>
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;">Notes</td><td style="font-size:14px;color:#2C2820;padding:8px 0;">${meta.notes || 'None'}</td></tr>
    </table>
    <div style="margin-top:24px;">
      <a href="https://something-blue-productions.com/admin/bookings" style="font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:12px 24px;text-decoration:none;display:inline-block;">View in admin</a>
    </div>
  </div>
</body>
</html>`;

    // Send to client
    await sendEmail(
      [{ email: meta.email, name: meta.name }],
      `Your session is confirmed — ${dateFormatted}`,
      clientHtml
    );

    // Send to Samantha
    await sendEmail(
      [{ email: 'hello@something-blue-productions.com', name: 'Samantha' }],
      `New booking — ${meta.name} · ${dateFormatted} ${timeFormatted}`,
      samHtml,
      { name: 'Something Blue Bookings', email: 'hello@something-blue-productions.com' }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}