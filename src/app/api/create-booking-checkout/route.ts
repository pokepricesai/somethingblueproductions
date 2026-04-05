import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  const { booking } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `${booking.service.charAt(0).toUpperCase() + booking.service.slice(1)} Studio Session`,
          description: `${booking.duration} minutes · ${booking.duration === 30 ? '5–10' : '10–20'} images · Papworth Everard Studio · ${new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at ${booking.time}`,
        },
        unit_amount: booking.price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}&type=booking`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
    customer_email: booking.email,
    metadata: {
      type: 'booking',
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      service_type: booking.service,
      people_count: String(booking.peopleCount),
      session_duration: String(booking.duration),
      session_price: String(booking.price),
      slot_date: booking.date,
      slot_time: booking.time,
      notes: booking.notes || '',
    },
  });

  return NextResponse.json({ url: session.url });
}
