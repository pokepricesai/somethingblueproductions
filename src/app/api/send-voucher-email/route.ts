import { NextRequest, NextResponse } from 'next/server';
const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { meta, code } = await req.json();

    const sessionLabel = meta.duration === '60' || meta.duration === 60 ? 'Family Session (60 min · 10–20 images)' : 'Studio Session (30 min · 5–10 images)';
    const recipientEmail = meta.recipient_email || meta.buyer_email;
    const recipientName = meta.recipient_name || meta.buyer_name;

    const voucherHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#0d1b2a;padding:40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#A8CAEC;margin:0 0 8px;">Something Blue Productions</p>
      <h1 style="font-family:Georgia,serif;font-weight:300;font-size:28px;color:#E8DDB5;margin:0 0 8px;">A gift for you.</h1>
      <p style="font-family:Georgia,serif;font-size:14px;color:rgba(232,221,181,0.6);margin:0;">${meta.occasion}</p>
    </div>

    ${meta.message ? `
    <div style="background:#F5F0E8;padding:32px 40px;border-bottom:1px solid #DDD5C0;">
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;font-style:italic;margin:0;">"${meta.message}"</p>
      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;margin:12px 0 0;">— ${meta.buyer_name}</p>
    </div>` : ''}

    <div style="padding:40px;">
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 24px;">Dear ${recipientName},</p>
      <p style="font-family:Georgia,serif;font-size:16px;color:#2C2820;line-height:1.7;margin:0 0 32px;">You've been gifted a photography session at Something Blue Productions studio in Papworth Everard, Cambridgeshire. Choose your own date and time when you're ready to book.</p>

      <!-- Voucher card -->
      <div style="background:#0d1b2a;padding:32px;margin-bottom:32px;text-align:center;">
        <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A8CAEC;margin:0 0 16px;">Gift Voucher</p>
        <p style="font-family:'Courier New',monospace;font-size:24px;font-weight:bold;color:#E8DDB5;letter-spacing:4px;margin:0 0 16px;">${code}</p>
        <p style="font-family:Georgia,serif;font-size:13px;color:rgba(232,221,181,0.6);margin:0 0 8px;">${sessionLabel}</p>
        <p style="font-family:Georgia,serif;font-size:12px;color:rgba(232,221,181,0.4);margin:0;">Valid for 12 months · All images included</p>
      </div>

      <h2 style="font-family:Georgia,serif;font-weight:300;font-size:20px;color:#1B3A5C;margin:0 0 16px;">How to redeem</h2>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 8px;">1. Visit our booking page</p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 8px;">2. Select <strong>Redeem a gift voucher</strong></p>
      <p style="font-family:Georgia,serif;font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 32px;">3. Enter your code <strong>${code}</strong> and choose your date</p>

      <div style="text-align:center;margin:40px 0;">
        <a href="https://something-blue-productions.com/book" style="font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:16px 32px;text-decoration:none;display:inline-block;">Book your session</a>
      </div>

      <p style="font-family:Georgia,serif;font-size:13px;color:#9E9282;line-height:1.7;margin:0;">Any questions? Email us at <a href="mailto:hello@something-blue-productions.com" style="color:#1B3A5C;">hello@something-blue-productions.com</a></p>
    </div>

    <div style="background:#0d1b2a;padding:24px 40px;text-align:center;">
      <p style="font-family:Georgia,serif;font-size:12px;color:rgba(245,240,232,0.4);margin:0;">Something Blue Productions · Papworth Everard, Cambridgeshire</p>
    </div>
  </div>
</body>
</html>`;

    const buyerHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:500px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9E9282;margin:0 0 8px;">Purchase confirmed</p>
    <h2 style="font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 24px;">Gift voucher sent.</h2>
    <p style="font-size:15px;color:#5c5550;line-height:1.8;margin:0 0 16px;">Your gift voucher has been sent to ${recipientEmail}. Here are the details for your records:</p>
    <div style="background:#F5F0E8;padding:20px;margin:24px 0;border-left:3px solid #1B3A5C;">
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;margin:0 0 8px;">Voucher code</p>
      <p style="font-family:'Courier New',monospace;font-size:20px;color:#1B3A5C;font-weight:bold;letter-spacing:3px;margin:0 0 16px;">${code}</p>
      <p style="font-size:13px;color:#9E9282;margin:0;">${sessionLabel} · ${meta.occasion} · Valid 12 months</p>
    </div>
    <p style="font-size:13px;color:#9E9282;line-height:1.7;margin:0;">Questions? <a href="mailto:hello@something-blue-productions.com" style="color:#1B3A5C;">hello@something-blue-productions.com</a></p>
  </div>
</body>
</html>`;

    // Send to recipient
    await apiInstance.sendTransacEmail({
      sender: { name: 'Something Blue Productions', email: 'hello@something-blue-productions.com' },
      to: [{ email: recipientEmail, name: recipientName }],
      subject: `Your gift voucher — Something Blue Productions`,
      htmlContent: voucherHtml,
    });

    // Send receipt to buyer if different from recipient
    if (meta.buyer_email && meta.buyer_email !== recipientEmail) {
      await apiInstance.sendTransacEmail({
        sender: { name: 'Something Blue Productions', email: 'hello@something-blue-productions.com' },
        to: [{ email: meta.buyer_email, name: meta.buyer_name }],
        subject: `Gift voucher purchase confirmed — ${code}`,
        htmlContent: buyerHtml,
      });
    }

    // Notify Samantha
    await apiInstance.sendTransacEmail({
      sender: { name: 'Something Blue Bookings', email: 'hello@something-blue-productions.com' },
      to: [{ email: 'hello@something-blue-productions.com', name: 'Samantha' }],
      subject: `New gift voucher sold — ${code} · £${meta.price}`,
      htmlContent: `<div style="font-family:Georgia,serif;padding:24px;max-width:500px;"><h2 style="font-weight:300;color:#1B3A5C;">New voucher sold</h2><p><strong>Code:</strong> ${code}</p><p><strong>From:</strong> ${meta.buyer_name} (${meta.buyer_email})</p><p><strong>To:</strong> ${recipientName} (${recipientEmail})</p><p><strong>Session:</strong> ${sessionLabel}</p><p><strong>Occasion:</strong> ${meta.occasion}</p><p><strong>Paid:</strong> £${meta.price}</p></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Voucher email error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}