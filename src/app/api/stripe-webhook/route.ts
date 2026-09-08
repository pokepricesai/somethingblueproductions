import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { notify, RECIPIENTS } from '@/lib/notify';
import {
  composeBookingAlert,
  composeBookingConfirmation,
  composeVoucherPurchaseConfirmation,
  composeVoucherSoldAlert,
  type BookingData,
  type VoucherData,
} from '@/lib/notify-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [4, 4, 4].map(() =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  return 'SBP-' + segments.join('-');
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    if (meta.type === 'booking') {
      const { data: inserted, error: bErr } = await supabaseAdmin
        .from('bookings')
        .insert({
          name: meta.name,
          email: meta.email,
          phone: meta.phone,
          service_type: meta.service_type,
          people_count: parseInt(meta.people_count),
          session_duration: parseInt(meta.session_duration),
          session_price: parseInt(meta.session_price),
          slot_date: meta.slot_date,
          slot_time: meta.slot_time,
          notes: meta.notes || null,
          stripe_payment_id: session.id,
          status: 'confirmed',
        })
        .select('id')
        .single();

      if (bErr) {
        console.error('[stripe-webhook] booking insert failed', bErr);
        return NextResponse.json({ error: 'Booking insert failed' }, { status: 500 });
      }

      const bookingData: BookingData = {
        id: inserted?.id,
        name: meta.name,
        email: meta.email,
        phone: meta.phone,
        service_type: meta.service_type,
        people_count: parseInt(meta.people_count),
        session_duration: parseInt(meta.session_duration),
        session_price: parseInt(meta.session_price),
        slot_date: meta.slot_date,
        slot_time: meta.slot_time,
        notes: meta.notes || null,
      };

      const adminMsg = composeBookingAlert(bookingData);
      adminMsg.toEmail = RECIPIENTS.admin.email;
      adminMsg.toName = RECIPIENTS.admin.name;
      const customerMsg = composeBookingConfirmation(bookingData);

      await Promise.all([
        notify(
          { eventType: 'booking_alert', entityType: 'booking', entityId: inserted?.id, recipientType: 'admin' },
          adminMsg,
          ['email', 'whatsapp']
        ),
        notify(
          { eventType: 'booking_confirmation', entityType: 'booking', entityId: inserted?.id, recipientType: 'customer' },
          customerMsg,
          ['email']
        ),
      ]);

    } else if (meta.type === 'gift') {
      // Model B: persist voucher FIRST, then fire independent notifications.
      // We do NOT email the recipient automatically — that is a manual admin
      // action from /admin/bookings. Notification failures never affect the
      // saved voucher row, and never affect Stripe's view of the webhook.
      const code = generateVoucherCode();

      const { data: inserted, error: vErr } = await supabaseAdmin
        .from('vouchers')
        .insert({
          code,
          occasion: meta.occasion,
          session_type: meta.service_type,
          session_duration: parseInt(meta.duration),
          session_price: parseInt(meta.price),
          buyer_name: meta.buyer_name,
          buyer_email: meta.buyer_email,
          recipient_name: meta.recipient_name || null,
          recipient_email: meta.recipient_email || null,
          stripe_payment_id: session.id,
          status: 'unused',
        })
        .select('id, created_at')
        .single();

      if (vErr) {
        console.error('[stripe-webhook] voucher insert failed', vErr);
        return NextResponse.json({ error: 'Voucher insert failed' }, { status: 500 });
      }

      const voucher: VoucherData = {
        id: inserted.id,
        code,
        occasion: meta.occasion,
        session_type: meta.service_type,
        session_duration: parseInt(meta.duration),
        session_price: parseInt(meta.price),
        buyer_name: meta.buyer_name,
        buyer_email: meta.buyer_email,
        recipient_name: meta.recipient_name || null,
        recipient_email: meta.recipient_email || null,
        message: meta.message || null,
        created_at: inserted.created_at,
      };

      const adminMsg = composeVoucherSoldAlert(voucher);
      adminMsg.toEmail = RECIPIENTS.admin.email;
      adminMsg.toName = RECIPIENTS.admin.name;
      const buyerMsg = composeVoucherPurchaseConfirmation(voucher);

      // Independent Promise.all — one channel/notify failing must not block
      // the other. notify() never throws; each call writes its own log rows.
      await Promise.all([
        notify(
          { eventType: 'voucher_sold', entityType: 'voucher', entityId: inserted.id, recipientType: 'admin' },
          adminMsg,
          ['email', 'whatsapp'],
        ),
        notify(
          { eventType: 'voucher_sold', entityType: 'voucher', entityId: inserted.id, recipientType: 'customer' },
          buyerMsg,
          ['email'],
        ),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
