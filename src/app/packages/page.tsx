import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography Packages & Pricing | Something Blue Productions Cambridge",
  description: "Wedding, family, newborn, maternity, studio and commercial photography packages across Cambridge and Cambridgeshire. Transparent pricing, no hidden extras.",
};

export default function PackagesPage() {
  return (
    <>
      <style>{`
        .pkg-pad { padding: 3rem 1.5rem; }
        .pkg-hero { padding: 8rem 1.5rem 4rem; }
        .pkg-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pkg-cards { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pkg-faq { max-width: 100%; }
        .pkg-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .pkg-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .pkg-pad { padding: 3.5rem 2.5rem; }
          .pkg-hero { padding: 10rem 2.5rem 5rem; }
          .pkg-cards { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .pkg-pad { padding: 4rem 4rem; }
          .pkg-hero { padding: 10rem 4rem 5rem; }
          .pkg-grid { grid-template-columns: 1fr 1fr; }
          .pkg-cards { grid-template-columns: repeat(3, 1fr); }
          .pkg-faq { max-width: 780px; margin: 0 auto; }
          .pkg-cta-buttons { flex-direction: row; justify-content: center; }
          .pkg-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="pkg-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>
            Packages & Investment
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Straightforward pricing.{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>No surprises.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            All our packages are listed below with starting prices. Every package can be tailored — these are starting points, not rigid menus. If something doesn&apos;t quite fit, get in touch and we&apos;ll work something out.
          </p>
        </div>
      </section>

      {/* ─── WEDDINGS ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Wedding Photography & Videography</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Weddings</h2>
            </div>
            <Link href="/weddings" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>Full details →</Link>
          </div>
          <div className="pkg-cards" style={{ marginBottom: '1rem' }}>
            {[
              { name: 'Essential', price: 'From £1,200', desc: '6 hours · One photographer · 300+ images · Online gallery · Print release', highlight: false },
              { name: 'Full Day', price: 'From £1,800', desc: 'Full day · One photographer · 500+ images · Engagement session · Online gallery', highlight: true },
              { name: 'Complete', price: 'From £2,600', desc: 'Full day · Two photographers · Wedding film · 600+ images · Engagement session', highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem', backgroundColor: pkg.highlight ? '#1B3A5C' : '#FAF8F2', border: pkg.highlight ? 'none' : '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.4rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.highlight ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.8rem' }}>{pkg.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: pkg.highlight ? 'rgba(245,240,232,0.55)' : '#9E9282', lineHeight: 1.65, marginBottom: '1.5rem' }}>{pkg.desc}</p>
                <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.highlight ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${pkg.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '2px' }}>
                  Enquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAMILIES ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Natural lifestyle sessions</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Family Photography</h2>
            </div>
            <Link href="/families" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>Full details →</Link>
          </div>
          <div className="pkg-cards">
            {[
              { name: 'Mini Session', price: 'From £195', desc: '45 mins · One location · 20+ images · Print release', highlight: false },
              { name: 'Full Session', price: 'From £345', desc: '90 mins · Studio or outdoor · 50+ images · Styling guide · Print release', highlight: true },
              { name: 'Extended', price: 'From £495', desc: '2.5 hours · Multiple locations · 80+ images · Print credit included', highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem', backgroundColor: pkg.highlight ? '#1B3A5C' : '#FAF8F2', border: pkg.highlight ? 'none' : '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.4rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.highlight ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.8rem' }}>{pkg.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: pkg.highlight ? 'rgba(245,240,232,0.55)' : '#9E9282', lineHeight: 1.65, marginBottom: '1.5rem' }}>{pkg.desc}</p>
                <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.highlight ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${pkg.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '2px' }}>
                  Enquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWBORN & MATERNITY ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="pkg-grid">

            {/* Newborn */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Gentle studio sessions</p>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#2C2820', textTransform: 'none' }}>Newborn Photography</h2>
                </div>
                <Link href="/newborn" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>Full details →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { name: 'Studio Session', price: 'From £295', desc: '2–3 hours · Baby + parent portraits · 30+ images' },
                  { name: 'Studio + Siblings', price: 'From £345', desc: '2–3 hours · Baby + sibling + family portraits · 40+ images' },
                  { name: 'Home Session', price: 'From £345', desc: '2–3 hours · In your home · Natural lifestyle feel · 35+ images' },
                ].map((pkg, i) => (
                  <div key={pkg.name} style={{ padding: '1.5rem', backgroundColor: i === 1 ? '#1B3A5C' : '#FAF8F2', border: i === 1 ? 'none' : '1px solid #DDD5C0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 1 ? '#A8CAEC' : '#9E9282', marginBottom: '0.2rem' }}>{pkg.name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: i === 1 ? 'rgba(245,240,232,0.55)' : '#9E9282' }}>{pkg.desc}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: i === 1 ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.4rem' }}>{pkg.price}</p>
                      <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 1 ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${i === 1 ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '1px' }}>Enquire</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maternity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Studio & outdoor</p>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#2C2820', textTransform: 'none' }}>Maternity Photography</h2>
                </div>
                <Link href="/maternity" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>Full details →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { name: 'Studio Session', price: 'From £245', desc: '90 mins · Studio · Solo or with partner · 25+ images' },
                  { name: 'Extended Studio', price: 'From £345', desc: '2 hours · Multiple setups · Family included · 40+ images' },
                  { name: 'Outdoor Session', price: 'From £295', desc: '90 mins · Location of your choice · 30+ images' },
                ].map((pkg, i) => (
                  <div key={pkg.name} style={{ padding: '1.5rem', backgroundColor: i === 1 ? '#1B3A5C' : '#FAF8F2', border: i === 1 ? 'none' : '1px solid #DDD5C0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 1 ? '#A8CAEC' : '#9E9282', marginBottom: '0.2rem' }}>{pkg.name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: i === 1 ? 'rgba(245,240,232,0.55)' : '#9E9282' }}>{pkg.desc}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: i === 1 ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.4rem' }}>{pkg.price}</p>
                      <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 1 ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${i === 1 ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '1px' }}>Enquire</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Combined upsell */}
          <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', backgroundColor: '#E8DDB5', borderLeft: '3px solid #1B3A5C' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>Combined maternity & newborn packages available</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', lineHeight: 1.65 }}>Book both sessions together and save. Ask about combined pricing when you enquire.</p>
          </div>
        </div>
      </section>

      {/* ─── COMMERCIAL ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#2c2820' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '0.5rem' }}>Brand, performance & headshots</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Commercial Photography</h2>
            </div>
            <Link href="/commercial" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid rgba(158,146,130,0.3)', paddingBottom: '2px' }}>Full details →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }} className="pkg-grid">
            {[
              { service: 'Brand & Business Photography', price: 'POA', desc: 'Product, brand, social content and team photography. Quoted per project based on scope and usage.', href: '/commercial/brand' },
              { service: 'Performance & Show Photography', price: 'From £195', desc: 'Theatre, dance, music and live events. Half day and full coverage options available.', href: '/commercial/performance' },
              { service: 'Creative Headshots', price: 'From £145', desc: 'For actors, performers, models and creatives. Multiple packages from 60 minutes to full day.', href: '/commercial/headshots' },
            ].map((s) => (
              <div key={s.service} style={{ padding: '1.8rem 2rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,240,232,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.4rem' }}>{s.service}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.5rem' }}>{s.price}</p>
                  <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid rgba(158,146,130,0.3)', paddingBottom: '1px' }}>Enquire</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="pkg-faq">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Pricing questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Common questions about packages</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: 'Are prices negotiable?', a: "The prices listed are starting points. We're always happy to discuss what's possible within a specific budget — just be upfront when you enquire and we'll do our best to make it work." },
              { q: 'What deposit is required to book?', a: "We take a 25% deposit to secure your date, with the balance due 4 weeks before your session or event. For weddings, the balance is due 6 weeks before the date." },
              { q: 'What payment methods do you accept?', a: "Bank transfer and most major debit and credit cards. Payment plans are available for larger packages — ask when you enquire." },
              { q: 'Are travel costs included?', a: "Sessions within Cambridgeshire are included in the package price. Travel beyond Cambridgeshire is charged at a standard rate, discussed transparently at enquiry stage." },
              { q: 'What if I need to cancel or reschedule?', a: "We understand things change. We ask for as much notice as possible. Deposits are non-refundable but are transferable to a new date in most circumstances." },
              { q: 'Do you offer gift vouchers?', a: "Yes — gift vouchers are available for all session types. A popular choice for baby showers, birthdays and Christmas gifts. Get in touch to arrange." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pkg-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to book?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s talk about what you need
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Every enquiry gets a personal response. Tell us what you&apos;re looking for and we&apos;ll come back with the right package for you.
          </p>
          <div className="pkg-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See the work first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}