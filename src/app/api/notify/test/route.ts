import { NextRequest, NextResponse } from 'next/server';
import { notify, RECIPIENTS } from '@/lib/notify';
import { composeTestAlert } from '@/lib/notify-templates';

/**
 * Notification health-check endpoint.
 *
 * Auth: header `x-notify-test-secret` must match env `NOTIFY_TEST_SECRET`.
 *       If NOTIFY_TEST_SECRET is unset, endpoint returns 503 (fail closed).
 *
 * Usage:
 *   curl -X POST https://something-blue-productions.com/api/notify/test \
 *     -H "x-notify-test-secret: <NOTIFY_TEST_SECRET>" \
 *     -H "Content-Type: application/json" \
 *     -d '{"kind":"enquiry"}'
 *
 * Behaviour:
 *   - Sends a clearly-labelled TEST alert to the admin address
 *   - Never touches enquiries / bookings / vouchers tables
 *   - Writes a notification_log row with event_type = 'test_alert',
 *     entity_type = 'test' so successful runs are visible in logs
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const secret = process.env.NOTIFY_TEST_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'NOTIFY_TEST_SECRET not configured' },
      { status: 503 }
    );
  }

  const provided = req.headers.get('x-notify-test-secret');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const kind = ((body as { kind?: unknown }).kind === 'booking' ? 'booking' : 'enquiry') as
    | 'enquiry'
    | 'booking';

  const msg = composeTestAlert(kind);
  msg.toEmail = RECIPIENTS.admin.email;
  msg.toName = RECIPIENTS.admin.name;

  const result = await notify(
    {
      eventType: 'test_alert',
      entityType: 'test',
      entityId: null,
      recipientType: 'test',
    },
    msg,
    ['email', 'whatsapp']
  );

  return NextResponse.json({
    ok: result.anyOk,
    result,
    kind,
    note: 'Test alert dispatched. Check notification_log for the row.',
  });
}
