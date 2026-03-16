import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Something Blue Productions",
  description: "Thank you for your enquiry — we'll be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <>
      <style>{`
        .ty-pad { padding: 3rem 1.5rem; }
        .ty-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .ty-cta-buttons a { text-align: center; }
        @media (min-width: 640px) {
          .ty-pad { padding: 3.5rem 2.5rem; }
        }
        @media (min-width: 900px) {
          .ty-pad { padding: 4rem 4rem; }
          .ty-cta-buttons { flex-direction: row; justify-content: center; }
          .ty-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a', minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="ty-pad" style={{ maxWidth: '600px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1.5rem' }}>
            Enquiry received
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.5rem' }}>
            Thank you for{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>getting in touch.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>
            We&apos;ve received your message and will come back to you within 24 hours — usually much sooner.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', marginBottom: '2.5rem' }}>
            While you wait, take a look at our portfolio or read a little more about how we work.
          </p>
          <div className="ty-cta-buttons">
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              View the portfolio
            </Link>
            <Link href="/about" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              About us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT HAPPENS NEXT ─── */}
      <section className="ty-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '2rem' }}>What happens next</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { num: '01', title: 'We read your message', desc: 'Every enquiry is read personally — not by a bot. We take a look at what you need and put together a thoughtful response.' },
              { num: '02', title: 'We come back to you', desc: 'Usually within a few hours, always within 24. We\'ll answer your questions, confirm availability, and discuss next steps.' },
              { num: '03', title: 'We get it booked', desc: 'Once you\'re happy, we lock in your date with a deposit. From there, we handle everything — all you need to do is show up.' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.2rem', color: '#DDD5C0', lineHeight: 1, flexShrink: 0 }}>{step.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.4rem' }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}