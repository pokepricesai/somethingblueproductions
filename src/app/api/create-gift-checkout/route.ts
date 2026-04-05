import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { gift } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `Something Blue Productions — Gift Voucher`,
          description: `${gift.serviceType === 'family' ? 'Family Session (60 min)' : 'Studio Session (30 min)'} · ${gift.occasion} · Valid 12 months · All images included`,
        },
        unit_amount: gift.price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}&type=gift`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
    customer_email: gift.buyerEmail,
    metadata: {
      type: 'gift',
      occasion: gift.occasion,
      service_type: gift.serviceType,
      duration: String(gift.duration),
      price: String(gift.price),
      buyer_name: gift.buyerName,
      buyer_email: gift.buyerEmail,
      recipient_name: gift.recipientName || '',
      recipient_email: gift.recipientEmail || '',
      message: gift.message || '',
    },
  });

  return NextResponse.json({ url: session.url });
}
