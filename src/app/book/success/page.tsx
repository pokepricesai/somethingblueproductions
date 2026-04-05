'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const type = params.get('type');

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1rem' }}>
          {type === 'gift' ? 'Voucher sent.' : 'You\'re booked in.'}
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
          {type === 'gift'
            ? 'Payment confirmed. The voucher code has been emailed. It\'s valid for 12 months and can be used to book any available slot.'
            : 'Payment confirmed. A confirmation email is on its way with everything you need. We\'ll also include our style guide so you\'re prepared. To make any changes, email hello@something-blue-productions.com.'}
        </p>
        <Link href="/" style={{
          fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', background: '#1B3A5C', color: '#F5F0E8',
          padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block',
        }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
