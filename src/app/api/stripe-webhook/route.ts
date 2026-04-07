import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
  } catch {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    if (meta.type === 'booking') {
      await supabase.from('bookings').insert({
        name: meta.name,
        email: meta.email,
        phone: meta.phone,
        service_type: meta.service_type,
        people_count: parseInt(meta.people_count),
        session_duration: parseInt(meta.session_duration),
        session_price: parseInt(meta.session_price),
        slot_date: meta.slot_date,
        slot_time: meta.slot_time,
        notes: meta.notes,
        stripe_payment_id: session.id,
        status: 'confirmed',
      });

      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-booking-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, sessionId: session.id }),
      });

    } else if (meta.type === 'gift') {
      const code = generateVoucherCode();

      await supabase.from('vouchers').insert({
        code,
        occasion: meta.occasion,
        session_type: meta.service_type,
        session_duration: parseInt(meta.duration),
        session_price: parseInt(meta.price),
        buyer_name: meta.buyer_name,
        buyer_email: meta.buyer_email,
        recipient_name: meta.recipient_name,
        recipient_email: meta.recipient_email,
        stripe_payment_id: session.id,
        status: 'unused',
      });

      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-voucher-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, code }),
      });
    }
  }

  return NextResponse.json({ received: true });
}