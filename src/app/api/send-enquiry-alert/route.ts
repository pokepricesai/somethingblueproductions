import { NextRequest, NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:500px;margin:0 auto;background:#fff;padding:32px;border:1px solid #DDD5C0;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C8572A;margin:0 0 8px;">New enquiry</p>
    <h2 style="font-weight:300;font-size:24px;color:#1B3A5C;margin:0 0 24px;">${name}</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${service ? `<tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;width:80px;">Service</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;">${service}</td></tr>` : ''}
      <tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Email</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="mailto:${email}" style="color:#1B3A5C;">${email}</a></td></tr>
      ${phone ? `<tr><td style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E9282;padding:8px 0;border-bottom:1px solid #F5F0E8;">Phone</td><td style="font-size:14px;color:#2C2820;padding:8px 0;border-bottom:1px solid #F5F0E8;"><a href="tel:${phone}" style="color:#1B3A5C;">${phone}</a></td></tr>` : ''}
    </table>
    <div style="background:#F5F0E8;padding:20px;margin:24px 0;border-left:3px solid #C8572A;">
      <p style="font-size:15px;color:#2C2820;line-height:1.8;margin:0;white-space:pre-wrap;">${message}</p>
    </div>
    <a href="mailto:${email}?subject=Re: Your enquiry — Something Blue Productions" style="font-size:11px;letter-spacing:2px;text-transform:uppercase;background:#1B3A5C;color:#E8DDB5;padding:12px 24px;text-decoration:none;display:inline-block;">Reply to ${name.split(' ')[0]}</a>
    <p style="font-size:12px;color:#9E9282;margin:16px 0 0;"><a href="https://something-blue-productions.com/admin/enquiries" style="color:#1B3A5C;">View in admin →</a></p>
  </div>
</body>
</html>`;

    await apiInstance.sendTransacEmail({
      sender: { name: 'Something Blue Website', email: 'hello@something-blue-productions.com' },
      to: [{ email: 'hello@something-blue-productions.com', name: 'Samantha' }],
      replyTo: { email, name },
      subject: `New enquiry from ${name}${service ? ' — ' + service : ''}`,
      htmlContent: html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry email error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}