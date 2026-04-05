'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { loadStripe } from '@stripe/stripe-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SERVICES = [
  { key: 'couple', label: 'Couple', icon: '◎', people: '1–2 people', duration: 30, price: 99 },
  { key: 'maternity', label: 'Maternity', icon: '◎', people: '1–2 people', duration: 30, price: 99 },
  { key: 'newborn', label: 'Newborn', icon: '◎', people: '1–2 people', duration: 30, price: 99 },
  { key: 'family', label: 'Family', icon: '◎', people: '3+ people', duration: 60, price: 199 },
  { key: 'headshots', label: 'Headshots', icon: '◎', people: '1 person', duration: 30, price: 99 },
];

const OCCASIONS = [
  'Birthday', 'Baby Shower', 'Engagement', 'Wedding', 'Christmas', 'Mother\'s Day', 'Just Because',
];

type Mode = 'choose' | 'book' | 'gift';
type BookingStep = 'service' | 'datetime' | 'details' | 'payment' | 'confirm';
type GiftStep = 'occasion' | 'details' | 'payment' | 'confirm';

interface Slot {
  id: number;
  slot_time: string;
  day_of_week: string;
}

interface BookingForm {
  service: string;
  peopleCount: number;
  duration: number;
  price: number;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  voucherCode: string;
  voucherValid: boolean;
}

interface GiftForm {
  occasion: string;
  serviceType: string;
  duration: number;
  price: number;
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  recipientEmail: string;
  message: string;
}

// ── UK timezone helpers ──────────────────────────────────────────────────────
// All dates are treated as Europe/London (handles GMT and BST automatically)

function toUKDateStr(date: Date): string {
  // Format date as YYYY-MM-DD in UK local time (not UTC)
  return date.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
  // en-CA gives YYYY-MM-DD format
}

function getUKDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'Europe/London' }).toLowerCase();
}

function getNext6Months(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  // Start from tomorrow
  const start = new Date(today);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  // Go up to 6 months ahead
  const end = new Date(today);
  end.setMonth(end.getMonth() + 6);

  const cursor = new Date(start);
  while (cursor <= end) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export default function BookPage() {
  const [mode, setMode] = useState<Mode>('choose');
  const [bookStep, setBookStep] = useState<BookingStep>('service');
  const [giftStep, setGiftStep] = useState<GiftStep>('occasion');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [voucherChecking, setVoucherChecking] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [dateSlotCache, setDateSlotCache] = useState<Record<string, boolean>>({});
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [booking, setBooking] = useState<BookingForm>({
    service: '', peopleCount: 1, duration: 30, price: 99,
    date: '', time: '', name: '', email: '', phone: '',
    notes: '', voucherCode: '', voucherValid: false,
  });

  const [gift, setGift] = useState<GiftForm>({
    occasion: '', serviceType: 'studio', duration: 30, price: 99,
    buyerName: '', buyerEmail: '', recipientName: '', recipientEmail: '', message: '',
  });

  const allDays = getNext6Months();

  useEffect(() => {
    if (booking.date) {
      fetchSlots(booking.date);
    }
  }, [booking.date]);

  // Pre-fetch availability for all days in visible month
  useEffect(() => {
    async function prefetchMonth() {
      const year = calendarMonth.getFullYear();
      const month = calendarMonth.getMonth();
      const daysInMonth: string[] = [];
      const cursor = new Date(year, month, 1);
      while (cursor.getMonth() === month) {
        daysInMonth.push(toUKDateStr(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }

      // Get all default slots
      const { data: defaults } = await supabase
        .from('availability_slots')
        .select('day_of_week, slot_time')
        .eq('is_active', true)
        .is('specific_date', null);

      // Get all overrides for this month
      const monthStart = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      const monthEnd = `${year}-${String(month + 1).padStart(2, '0')}-31`;
      const { data: overrides } = await supabase
        .from('slot_overrides')
        .select('slot_date, slot_time, type')
        .gte('slot_date', monthStart)
        .lte('slot_date', monthEnd);

      // Get all bookings this month
      const { data: bookings } = await supabase
        .from('bookings')
        .select('slot_date, slot_time')
        .gte('slot_date', monthStart)
        .lte('slot_date', monthEnd)
        .eq('status', 'confirmed');

      const cache: Record<string, boolean> = {};
      for (const dateStr of daysInMonth) {
        const dow = getUKDayOfWeek(new Date(dateStr + 'T12:00:00'));
        const defaultTimes = new Set(
          (defaults || []).filter(s => s.day_of_week === dow).map(s => s.slot_time)
        );
        const dayOverrides = (overrides || []).filter(o => o.slot_date === dateStr);
        for (const o of dayOverrides) {
          if (o.type === 'blocked') defaultTimes.delete(o.slot_time);
          if (o.type === 'added') defaultTimes.add(o.slot_time);
        }
        const bookedTimes = new Set(
          (bookings || []).filter(b => b.slot_date === dateStr).map(b => b.slot_time)
        );
        for (const t of bookedTimes) defaultTimes.delete(t);
        cache[dateStr] = defaultTimes.size > 0;
      }
      setDateSlotCache(cache);
    }
    prefetchMonth();
  }, [calendarMonth]);

  async function fetchSlots(date: string) {
    const d = new Date(date + 'T12:00:00Z'); // noon UTC avoids any BST boundary issues
    const dow = getUKDayOfWeek(new Date(date + 'T12:00:00'));

    // 1. Get default recurring slots for this day
    const { data: defaults } = await supabase
      .from('availability_slots')
      .select('slot_time')
      .eq('day_of_week', dow)
      .eq('is_active', true)
      .is('specific_date', null);

    // 2. Get overrides for this specific date
    const { data: overrideData } = await supabase
      .from('slot_overrides')
      .select('slot_time, type')
      .eq('slot_date', date);

    // 3. Get already booked slots
    const { data: existing } = await supabase
      .from('bookings')
      .select('slot_time')
      .eq('slot_date', date)
      .eq('status', 'confirmed');

    // 4. Apply same logic as admin calendar
    const finalTimes = new Set((defaults || []).map((s: {slot_time: string}) => s.slot_time));
    for (const o of (overrideData || [])) {
      if (o.type === 'blocked') finalTimes.delete(o.slot_time);
      if (o.type === 'added') finalTimes.add(o.slot_time);
    }

    const bookedTimes = new Set((existing || []).map((b: {slot_time: string}) => b.slot_time));
    for (const t of bookedTimes) finalTimes.delete(t);

    const sortedSlots = Array.from(finalTimes)
      .sort()
      .map((slot_time, id) => ({ id, slot_time, day_of_week: dow }));

    setAvailableSlots(sortedSlots);
    setBookedSlots(Array.from(bookedTimes));
  }

  async function checkVoucher() {
    if (!booking.voucherCode) return;
    setVoucherChecking(true);
    const { data } = await supabase
      .from('vouchers')
      .select('*')
      .eq('code', booking.voucherCode.toUpperCase())
      .eq('status', 'unused')
      .single();

    if (data && new Date(data.expires_at) > new Date()) {
      setBooking(prev => ({ ...prev, voucherValid: true, price: 0 }));
      setError('');
    } else {
      setBooking(prev => ({ ...prev, voucherValid: false }));
      setError('This voucher code is invalid or has already been used.');
    }
    setVoucherChecking(false);
  }

  async function handleBookingPayment() {
    setLoading(true);
    setError('');
    try {
      if (booking.voucherValid) {
        // Book directly without payment
        const { error: dbError } = await supabase.from('bookings').insert({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          service_type: booking.service,
          people_count: booking.peopleCount,
          session_duration: booking.duration,
          session_price: booking.price,
          slot_date: booking.date,
          slot_time: booking.time,
          voucher_code: booking.voucherCode,
          status: 'confirmed',
        });
        if (dbError) throw dbError;

        // Mark voucher as used
        await supabase
          .from('vouchers')
          .update({ status: 'used', redeemed_at: new Date().toISOString() })
          .eq('code', booking.voucherCode.toUpperCase());

        // Send confirmation email
        await fetch('/api/send-booking-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking }),
        });

        setBookStep('confirm');
      } else {
        // Stripe checkout
        const res = await fetch('/api/create-booking-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking }),
        });
        const { url } = await res.json();
        window.location.href = url;
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  async function handleGiftPayment() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create-gift-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gift }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const selectedService = SERVICES.find(s => s.key === booking.service);
  const isSlotAvailable = (time: string) => !bookedSlots.includes(time);

  return (
    <>
      <style>{`
        .book-wrap { min-height: 100vh; background: #F5F0E8; padding-top: 80px; }
        .book-inner { max-width: 680px; margin: 0 auto; padding: 3rem 1.5rem 6rem; }
        .book-card { background: #fff; border: 1px solid #DDD5C0; padding: 2.5rem; margin-bottom: 2px; }
        .book-btn-primary {
          font-family: 'Carose', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em;
          text-transform: uppercase; background: #1B3A5C; color: #F5F0E8;
          padding: 1rem 2.5rem; border: none; cursor: pointer; width: 100%;
          transition: opacity 0.2s; display: block; text-align: center;
        }
        .book-btn-primary:hover { opacity: 0.85; }
        .book-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .book-btn-secondary {
          font-family: 'Carose', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em;
          text-transform: uppercase; background: transparent; color: #1B3A5C;
          padding: 1rem 2.5rem; border: 1px solid #1B3A5C; cursor: pointer; width: 100%;
          transition: all 0.2s; display: block; text-align: center;
        }
        .book-btn-secondary:hover { background: #1B3A5C; color: #F5F0E8; }
        .book-input {
          width: 100%; padding: 0.85rem 1rem; border: 1px solid #DDD5C0;
          background: #FAF8F2; font-family: 'Inter', sans-serif; font-size: 0.88rem;
          color: #2C2820; outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .book-input:focus { border-color: #1B3A5C; }
        .book-input::placeholder { color: #9E9282; }
        .book-label {
          font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #9E9282; display: block; margin-bottom: 0.5rem;
        }
        .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 1.5rem; }
        .service-card {
          padding: 1.5rem 1rem; border: 1px solid #DDD5C0; cursor: pointer;
          background: #FAF8F2; transition: all 0.2s; text-align: center;
        }
        .service-card:hover { border-color: #1B3A5C; }
        .service-card.selected { border-color: #1B3A5C; background: #1B3A5C; }
        .service-card.selected h3 { color: #E8DDB5; }
        .service-card.selected p { color: rgba(232,221,181,0.6); }
        .date-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 1.5rem; }
        .date-btn {
          padding: 0.85rem 0.5rem; border: 1px solid #DDD5C0; cursor: pointer;
          background: #FAF8F2; transition: all 0.2s; text-align: center;
        }
        .date-btn:hover { border-color: #1B3A5C; }
        .date-btn.selected { border-color: #1B3A5C; background: #1B3A5C; color: #E8DDB5; }
        .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 1.5rem; }
        .time-btn {
          padding: 0.85rem; border: 1px solid #DDD5C0; cursor: pointer;
          background: #FAF8F2; transition: all 0.2s; text-align: center;
          font-family: 'Carose', sans-serif; font-size: 0.72rem; letter-spacing: 0.1em;
        }
        .time-btn:hover:not(:disabled) { border-color: #1B3A5C; }
        .time-btn.selected { border-color: #1B3A5C; background: #1B3A5C; color: #E8DDB5; }
        .time-btn:disabled { opacity: 0.35; cursor: not-allowed; background: #EDE8E0; }
        .mode-card {
          padding: 2.5rem 2rem; border: 1px solid #DDD5C0; cursor: pointer;
          background: #FAF8F2; transition: all 0.25s; text-align: left;
        }
        .mode-card:hover { border-color: #1B3A5C; background: #fff; }
        .voucher-row { display: flex; gap: 2px; }
        .voucher-row .book-input { flex: 1; }
        .voucher-check-btn {
          font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.15em;
          text-transform: uppercase; background: #E8DDB5; color: #1B3A5C;
          padding: 0 1.2rem; border: none; cursor: pointer; white-space: nowrap;
          transition: opacity 0.2s;
        }
        .voucher-check-btn:hover { opacity: 0.8; }
        .error-msg { background: #fef2f2; border: 1px solid #fca5a5; padding: 0.85rem 1rem; margin-bottom: 1rem; }
        .success-msg { background: #f0fdf4; border: 1px solid #86efac; padding: 0.85rem 1rem; margin-bottom: 1rem; }
        .occasion-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 1.5rem; }
        .occasion-btn {
          padding: 1rem; border: 1px solid #DDD5C0; cursor: pointer;
          background: #FAF8F2; transition: all 0.2s; text-align: center;
          font-family: 'Carose', sans-serif; font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #2C2820;
        }
        .occasion-btn:hover { border-color: #1B3A5C; }
        .occasion-btn.selected { border-color: #1B3A5C; background: #1B3A5C; color: #E8DDB5; }
        .step-indicator { display: flex; gap: 4px; margin-bottom: 2rem; }
        .step-dot { width: 24px; height: 2px; background: #DDD5C0; transition: background 0.2s; }
        .step-dot.active { background: #1B3A5C; }
        .price-summary {
          background: #0d1b2a; padding: 1.5rem; margin-bottom: 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .back-link {
          font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #9E9282; background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 1.5rem; display: inline-block;
        }
        .back-link:hover { color: #1B3A5C; }
        .confirm-icon { font-size: 3rem; margin-bottom: 1rem; }
        textarea.book-input { resize: vertical; min-height: 80px; }
        @media (min-width: 640px) {
          .book-inner { padding: 4rem 2rem 6rem; }
          .date-grid { grid-template-columns: repeat(7, 1fr); }
          .service-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="book-wrap">
        <div className="book-inner">

          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <Link href="/" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              ← Something Blue Productions
            </Link>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0d1b2a', textTransform: 'none', lineHeight: 1.1, marginBottom: '0.75rem' }}>
              {mode === 'choose' ? <>Book a session or <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>give one.</span></> : mode === 'book' ? <>Studio <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>booking.</span></> : <>Gift <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>voucher.</span></>}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#9E9282', lineHeight: 1.7 }}>
              Papworth Everard Studio · CB23 · {mode === 'choose' ? 'Book your session or buy a voucher as a gift.' : mode === 'book' ? 'Choose your session, pick a time, pay securely.' : 'A thoughtful gift for someone special.'}
            </p>
          </div>

          {/* ── CHOOSE MODE ── */}
          {mode === 'choose' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="mode-card" onClick={() => setMode('book')}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>For you</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.4rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>Book a studio session</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.65, marginBottom: '1rem' }}>
                  Choose your session type, pick a date and time, and pay securely online. From £99.
                </p>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>Book now →</span>
              </div>
              <div className="mode-card" onClick={() => setMode('gift')}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>For someone special</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.4rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>Buy a gift voucher</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.65, marginBottom: '1rem' }}>
                  The perfect gift for a birthday, baby shower, engagement or Christmas. They choose their own date. From £99.
                </p>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>Buy a voucher →</span>
              </div>
              {/* Trust signals */}
              <div style={{ padding: '1.5rem', background: '#0d1b2a', marginTop: '2px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {['All images included — no per-image charges', 'Instant confirmation', 'Secure payment via Stripe', 'Free cancellation 48hrs notice'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A8CAEC', flexShrink: 0, display: 'inline-block' }} />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.6)' }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── BOOKING FLOW ── */}
          {mode === 'book' && (
            <div>
              <button className="back-link" onClick={() => { setMode('choose'); setBookStep('service'); }}>← Back</button>

              {/* Step indicators */}
              <div className="step-indicator">
                {['service', 'datetime', 'details', 'payment'].map((s, i) => (
                  <div key={s} className={`step-dot ${['service', 'datetime', 'details', 'payment', 'confirm'].indexOf(bookStep) >= i ? 'active' : ''}`} />
                ))}
              </div>

              {/* Step 1: Service */}
              {bookStep === 'service' && (
                <div className="book-card">
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>What are you coming in for?</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', marginBottom: '1.5rem', lineHeight: 1.65 }}>Select your session type. Family sessions (3+ people) are 60 minutes.</p>
                  <div className="service-grid">
                    {SERVICES.map(s => (
                      <div
                        key={s.key}
                        className={`service-card ${booking.service === s.key ? 'selected' : ''}`}
                        onClick={() => setBooking(prev => ({ ...prev, service: s.key, duration: s.duration, price: s.price }))}
                      >
                        <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>{s.label}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{s.people}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.2rem' }}>{s.duration} min</p>
                      </div>
                    ))}
                  </div>

                  {booking.service && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label className="book-label">Number of people</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={booking.peopleCount}
                        onChange={e => {
                          const n = parseInt(e.target.value);
                          const needsHour = n >= 3 || booking.service === 'family';
                          setBooking(prev => ({ ...prev, peopleCount: n, duration: needsHour ? 60 : 30, price: needsHour ? 199 : 99 }));
                        }}
                        className="book-input"
                        style={{ maxWidth: '120px' }}
                      />
                    </div>
                  )}

                  {/* Styling note */}
                  <div style={{ background: '#F5F0E8', padding: '1rem 1.2rem', marginBottom: '1.5rem', borderLeft: '3px solid #DDD5C0' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#5c5550', lineHeight: 1.7 }}>
                      All outfits and styling are arranged by you before your session — this keeps your time focused and your images consistent. Not sure what to wear? We'll send our style guide with your confirmation.
                    </p>
                  </div>

                  {/* Upsell */}
                  <div style={{ background: '#E8DDB5', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#5c5550', lineHeight: 1.7 }}>
                      Need something more? For extended shoots, multiple outfits, outdoor sessions or video, <Link href="/enquire" style={{ color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)' }}>get in touch</Link> and we'll put together something just for you.
                    </p>
                  </div>

                  {booking.service && (
                    <div className="price-summary">
                      <div>
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.2rem' }}>{selectedService?.label} · {booking.duration} min</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>{booking.duration === 30 ? '5–10' : '10–20'} images included · No per-image charges</p>
                      </div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.5rem', color: '#E8DDB5', fontWeight: 300 }}>£{booking.price}</p>
                    </div>
                  )}

                  <button
                    className="book-btn-primary"
                    disabled={!booking.service}
                    onClick={() => setBookStep('datetime')}
                  >
                    Choose date & time →
                  </button>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {bookStep === 'datetime' && (
                <div className="book-card">
                  <button className="back-link" onClick={() => setBookStep('service')}>← Back</button>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.25rem' }}>Choose your date</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', marginBottom: '1.5rem' }}>All times shown in UK time (GMT/BST).</p>

                  {/* Month navigation */}
                  {(() => {
                    const year = calendarMonth.getFullYear();
                    const month = calendarMonth.getMonth();
                    const today = new Date(); today.setHours(0,0,0,0);
                    const maxMonth = new Date(); maxMonth.setMonth(maxMonth.getMonth() + 6);
                    const canGoPrev = calendarMonth > new Date(today.getFullYear(), today.getMonth(), 1);
                    const canGoNext = calendarMonth < new Date(maxMonth.getFullYear(), maxMonth.getMonth(), 1);

                    // Build calendar grid — start on Monday
                    const firstDay = new Date(year, month, 1);
                    const startDow = (firstDay.getDay() + 6) % 7; // 0=Mon
                    const daysInMonth = new Date(year, month + 1, 0).getDate();

                    const cells: (Date | null)[] = [];
                    for (let i = 0; i < startDow; i++) cells.push(null);
                    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

                    return (
                      <div>
                        {/* Month header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <button
                            onClick={() => { const d = new Date(calendarMonth); d.setMonth(d.getMonth() - 1); setCalendarMonth(d); setBooking(prev => ({ ...prev, date: '', time: '' })); }}
                            disabled={!canGoPrev}
                            style={{ background: 'none', border: '1px solid #DDD5C0', color: canGoPrev ? '#1B3A5C' : '#DDD5C0', cursor: canGoPrev ? 'pointer' : 'default', padding: '0.4rem 0.75rem', fontFamily: "'Carose', sans-serif", fontSize: '0.7rem' }}
                          >←</button>
                          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C' }}>
                            {firstDay.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                          </p>
                          <button
                            onClick={() => { const d = new Date(calendarMonth); d.setMonth(d.getMonth() + 1); setCalendarMonth(d); setBooking(prev => ({ ...prev, date: '', time: '' })); }}
                            disabled={!canGoNext}
                            style={{ background: 'none', border: '1px solid #DDD5C0', color: canGoNext ? '#1B3A5C' : '#DDD5C0', cursor: canGoNext ? 'pointer' : 'default', padding: '0.4rem 0.75rem', fontFamily: "'Carose', sans-serif", fontSize: '0.7rem' }}
                          >→</button>
                        </div>

                        {/* Day of week headers */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
                          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                            <p key={d} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E9282', textAlign: 'center', padding: '0.3rem 0' }}>{d}</p>
                          ))}
                        </div>

                        {/* Calendar grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '1.5rem' }}>
                          {cells.map((d, i) => {
                            if (!d) return <div key={`empty-${i}`} />;
                            const dateStr = toUKDateStr(d);
                            const isPast = d < today;
                            const hasSlots = dateSlotCache[dateStr] === true;
                            const isSelected = booking.date === dateStr;
                            const isToday = toUKDateStr(d) === toUKDateStr(today);

                            return (
                              <div
                                key={dateStr}
                                onClick={() => {
                                  if (isPast || !hasSlots) return;
                                  setBooking(prev => ({ ...prev, date: dateStr, time: '' }));
                                  fetchSlots(dateStr);
                                }}
                                style={{
                                  padding: '0.5rem 0.25rem',
                                  textAlign: 'center',
                                  cursor: isPast || !hasSlots ? 'default' : 'pointer',
                                  background: isSelected ? '#1B3A5C' : 'transparent',
                                  border: isToday ? '1px solid #1B3A5C' : '1px solid transparent',
                                  opacity: isPast ? 0.3 : 1,
                                  position: 'relative',
                                  transition: 'background 0.15s',
                                }}
                              >
                                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: isSelected ? '#E8DDB5' : isPast || !hasSlots ? '#9E9282' : '#1B3A5C', fontWeight: 300, lineHeight: 1 }}>{d.getDate()}</p>
                                {hasSlots && !isPast && (
                                  <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: isSelected ? '#A8CAEC' : '#16a34a', margin: '3px auto 0' }} />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Inline time picker — drops down when date selected */}
                        {booking.date && booking.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`) && (
                          <div style={{ borderTop: '1px solid #DDD5C0', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B3A5C', marginBottom: '0.75rem' }}>
                              {new Date(booking.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London' })}
                            </p>
                            {availableSlots.length === 0 ? (
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282' }}>No times available — please choose another date.</p>
                            ) : (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {availableSlots.map(slot => {
                                  const [h, m] = slot.slot_time.split(':');
                                  const hour = parseInt(h);
                                  const ampm = hour >= 12 ? 'pm' : 'am';
                                  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                                  const label = `${displayHour}${m !== '00' ? ':' + m : ''}${ampm}`;
                                  const isTimeSelected = booking.time === slot.slot_time;
                                  return (
                                    <button
                                      key={slot.slot_time}
                                      onClick={() => setBooking(prev => ({ ...prev, time: slot.slot_time }))}
                                      style={{
                                        fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.1em',
                                        padding: '0.6rem 1rem', border: 'none', cursor: 'pointer',
                                        background: isTimeSelected ? '#1B3A5C' : '#F5F0E8',
                                        color: isTimeSelected ? '#E8DDB5' : '#1B3A5C',
                                        outline: isTimeSelected ? 'none' : '1px solid #DDD5C0',
                                        transition: 'all 0.15s',
                                      }}
                                    >
                                      {label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginBottom: '1.25rem' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                    Green dot = availability on this date
                  </p>

                  <button
                    className="book-btn-primary"
                    disabled={!booking.date || !booking.time}
                    onClick={() => setBookStep('details')}
                  >
                    Enter your details →
                  </button>
                </div>
              )}

              {/* Step 3: Details */}
              {bookStep === 'details' && (
                <div className="book-card">
                  <button className="back-link" onClick={() => setBookStep('datetime')}>← Back</button>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1.5rem' }}>Your details</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label className="book-label">Full name</label>
                      <input className="book-input" placeholder="Your name" value={booking.name} onChange={e => setBooking(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Email address</label>
                      <input className="book-input" type="email" placeholder="your@email.com" value={booking.email} onChange={e => setBooking(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Phone number</label>
                      <input className="book-input" type="tel" placeholder="07700 000000" value={booking.phone} onChange={e => setBooking(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Anything we should know? (optional)</label>
                      <textarea className="book-input" placeholder="Young children, accessibility needs, anything else..." value={booking.notes} onChange={e => setBooking(prev => ({ ...prev, notes: e.target.value }))} />
                    </div>
                  </div>

                  {/* Voucher code */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="book-label">Have a gift voucher?</label>
                    <div className="voucher-row">
                      <input
                        className="book-input"
                        placeholder="Enter voucher code"
                        value={booking.voucherCode}
                        onChange={e => setBooking(prev => ({ ...prev, voucherCode: e.target.value, voucherValid: false }))}
                        style={{ textTransform: 'uppercase' }}
                      />
                      <button className="voucher-check-btn" onClick={checkVoucher} disabled={voucherChecking}>
                        {voucherChecking ? '...' : 'Apply'}
                      </button>
                    </div>
                    {booking.voucherValid && (
                      <div className="success-msg" style={{ marginTop: '0.5rem' }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#166534' }}>✓ Voucher applied — your session is covered.</p>
                      </div>
                    )}
                    {error && (
                      <div className="error-msg" style={{ marginTop: '0.5rem' }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#991b1b' }}>{error}</p>
                      </div>
                    )}
                  </div>

                  <div className="price-summary">
                    <div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.2rem' }}>{selectedService?.label} · {booking.duration} min</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.5)' }}>
                        {new Date(booking.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London' })} · {booking.time}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {booking.voucherValid ? (
                        <>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)', textDecoration: 'line-through' }}>£{selectedService?.price}</p>
                          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.3rem', color: '#A8CAEC', fontWeight: 300 }}>£0</p>
                        </>
                      ) : (
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.5rem', color: '#E8DDB5', fontWeight: 300 }}>£{booking.price}</p>
                      )}
                    </div>
                  </div>

                  <button
                    className="book-btn-primary"
                    disabled={!booking.name || !booking.email || !booking.phone || loading}
                    onClick={handleBookingPayment}
                  >
                    {loading ? 'Processing...' : booking.voucherValid ? 'Confirm booking →' : `Pay £${booking.price} & confirm →`}
                  </button>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', textAlign: 'center', marginTop: '0.75rem' }}>
                    Secure payment via Stripe · Free cancellation with 48hrs notice · To change your slot, email hello@something-blue-productions.com
                  </p>
                </div>
              )}

              {/* Confirm */}
              {bookStep === 'confirm' && (
                <div className="book-card" style={{ textAlign: 'center' }}>
                  <div className="confirm-icon">✓</div>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.4rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.75rem' }}>You&apos;re booked in.</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    A confirmation has been sent to {booking.email}. We&apos;ll also send your style guide so you&apos;re prepared for the session.<br /><br />
                    To make any changes, email us at <a href="mailto:hello@something-blue-productions.com" style={{ color: '#1B3A5C' }}>hello@something-blue-productions.com</a>.
                  </p>
                  <Link href="/" className="book-btn-secondary" style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2rem' }}>Back to home</Link>
                </div>
              )}
            </div>
          )}

          {/* ── GIFT FLOW ── */}
          {mode === 'gift' && (
            <div>
              <button className="back-link" onClick={() => { setMode('choose'); setGiftStep('occasion'); }}>← Back</button>

              <div className="step-indicator">
                {['occasion', 'details', 'payment'].map((s, i) => (
                  <div key={s} className={`step-dot ${['occasion', 'details', 'payment', 'confirm'].indexOf(giftStep) >= i ? 'active' : ''}`} />
                ))}
              </div>

              {/* Step 1: Occasion + Session */}
              {giftStep === 'occasion' && (
                <div className="book-card">
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>What&apos;s the occasion?</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', marginBottom: '1.5rem' }}>We&apos;ll add this to the voucher.</p>

                  <div className="occasion-grid">
                    {OCCASIONS.map(o => (
                      <div
                        key={o}
                        className={`occasion-btn ${gift.occasion === o ? 'selected' : ''}`}
                        onClick={() => setGift(prev => ({ ...prev, occasion: o }))}
                      >
                        {o}
                      </div>
                    ))}
                  </div>

                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1rem' }}>Choose the session</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '1.5rem' }}>
                    {[
                      { key: 'studio', label: 'Studio Session', desc: '30 minutes · 1–2 people · 5–10 images', duration: 30, price: 99 },
                      { key: 'family', label: 'Family Session', desc: '60 minutes · 3+ people · 10–20 images', duration: 60, price: 199 },
                    ].map(s => (
                      <div
                        key={s.key}
                        className={`mode-card ${gift.serviceType === s.key ? 'selected' : ''}`}
                        style={{ border: gift.serviceType === s.key ? '1px solid #1B3A5C' : '1px solid #DDD5C0', background: gift.serviceType === s.key ? '#1B3A5C' : '#FAF8F2' }}
                        onClick={() => setGift(prev => ({ ...prev, serviceType: s.key, duration: s.duration, price: s.price }))}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: gift.serviceType === s.key ? '#E8DDB5' : '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>{s.label}</h3>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: gift.serviceType === s.key ? 'rgba(232,221,181,0.6)' : '#9E9282' }}>{s.desc}</p>
                          </div>
                          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.3rem', color: gift.serviceType === s.key ? '#E8DDB5' : '#1B3A5C', fontWeight: 300 }}>£{s.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#0d1b2a', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.7 }}>
                      All images are included — we never charge per image. The recipient chooses their own date and time when they&apos;re ready to book. Vouchers are valid for 12 months.
                    </p>
                  </div>

                  <button
                    className="book-btn-primary"
                    disabled={!gift.occasion || !gift.serviceType}
                    onClick={() => setGiftStep('details')}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2: Details */}
              {giftStep === 'details' && (
                <div className="book-card">
                  <button className="back-link" onClick={() => setGiftStep('occasion')}>← Back</button>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1.5rem' }}>Your details</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label className="book-label">Your name</label>
                      <input className="book-input" placeholder="Your name" value={gift.buyerName} onChange={e => setGift(prev => ({ ...prev, buyerName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Your email</label>
                      <input className="book-input" type="email" placeholder="your@email.com" value={gift.buyerEmail} onChange={e => setGift(prev => ({ ...prev, buyerEmail: e.target.value }))} />
                    </div>
                  </div>

                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1rem' }}>Recipient details <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', textTransform: 'none', letterSpacing: 0 }}>(optional — we can send it direct)</span></h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label className="book-label">Recipient&apos;s name</label>
                      <input className="book-input" placeholder="Their name" value={gift.recipientName} onChange={e => setGift(prev => ({ ...prev, recipientName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Recipient&apos;s email (to send directly)</label>
                      <input className="book-input" type="email" placeholder="their@email.com" value={gift.recipientEmail} onChange={e => setGift(prev => ({ ...prev, recipientEmail: e.target.value }))} />
                    </div>
                    <div>
                      <label className="book-label">Personal message (optional)</label>
                      <textarea className="book-input" placeholder="A personal note to include with the voucher..." value={gift.message} onChange={e => setGift(prev => ({ ...prev, message: e.target.value }))} />
                    </div>
                  </div>

                  <div className="price-summary">
                    <div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.2rem' }}>{gift.serviceType === 'family' ? 'Family Session' : 'Studio Session'} · Gift Voucher</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.5)' }}>{gift.occasion} · Valid 12 months</p>
                    </div>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.5rem', color: '#E8DDB5', fontWeight: 300 }}>£{gift.price}</p>
                  </div>

                  {error && <div className="error-msg"><p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#991b1b' }}>{error}</p></div>}

                  <button
                    className="book-btn-primary"
                    disabled={!gift.buyerName || !gift.buyerEmail || loading}
                    onClick={handleGiftPayment}
                  >
                    {loading ? 'Processing...' : `Pay £${gift.price} & send voucher →`}
                  </button>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', textAlign: 'center', marginTop: '0.75rem' }}>
                    Secure payment via Stripe · Voucher emailed instantly
                  </p>
                </div>
              )}

              {/* Gift Confirm */}
              {giftStep === 'confirm' && (
                <div className="book-card" style={{ textAlign: 'center' }}>
                  <div className="confirm-icon">✓</div>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.4rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.75rem' }}>Voucher sent.</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    The voucher has been emailed to {gift.recipientEmail || gift.buyerEmail}. They can use the code to book their session at any time — valid for 12 months.
                  </p>
                  <Link href="/" className="book-btn-secondary" style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2rem' }}>Back to home</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}