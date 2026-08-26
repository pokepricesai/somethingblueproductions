import Link from "next/link";
import type { Metadata } from "next";
import { breadcrumbList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Photography Studio in Papworth Everard, Cambridgeshire",
  description: "Our photography studio in Papworth Everard (CB23) — facilities, parking, access from Cambridge and the A14, and the session types we host here. Book from £99.",
  alternates: { canonical: "/studio/papworth-everard" },
  openGraph: {
    title: "Photography Studio in Papworth Everard, Cambridgeshire | Something Blue Productions",
    description: "Facilities, parking, access, and studio session types at our Papworth Everard photography studio.",
    url: "https://something-blue-productions.com/studio/papworth-everard",
    type: "website",
  },
};


const papworthLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PhotographyBusiness',
  '@id': 'https://something-blue-productions.com/studio/papworth-everard#localbusiness',
  name: 'Something Blue Productions — Papworth Everard Studio',
  parentOrganization: { '@id': 'https://something-blue-productions.com/#organization' },
  url: 'https://something-blue-productions.com/studio/papworth-everard',
  image: 'https://something-blue-productions.com/logo.png',
  telephone: '+447765253340',
  email: 'hello@something-blue-productions.com',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Papworth Everard',
    addressLocality: 'Cambridge',
    addressRegion: 'Cambridgeshire',
    postalCode: 'CB23',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.2436,
    longitude: -0.1088,
  },
  areaServed: [
    { '@type': 'City', name: 'Cambridge' },
    { '@type': 'City', name: 'Huntingdon' },
    { '@type': 'City', name: 'St Neots' },
    { '@type': 'AdministrativeArea', name: 'Cambridgeshire' },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday'], opens: '19:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Thursday', 'Friday'], opens: '09:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '22:00' },
  ],
};

const papworthBreadcrumbs = breadcrumbList([
  { name: 'Studio', path: '/studio' },
  { name: 'Papworth Everard', path: '/studio/papworth-everard' },
]);

export default function PapworthStudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(papworthLocalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(papworthBreadcrumbs) }}
      />
      <style>{`
        .pe-pad { padding: 3rem 1.5rem; }
        .pe-hero-content { padding: 0 1.5rem 6rem; }
        .pe-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .pe-sessions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .pe-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .pe-cta-buttons a { text-align: center; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .pe-pad { padding: 3.5rem 2.5rem; }
        }
        @media (min-width: 900px) {
          .pe-pad { padding: 4rem 4rem; }
          .pe-hero-content { padding: 0 4rem 5rem; }
          .pe-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .pe-sessions-grid { grid-template-columns: repeat(3, 1fr); }
          .pe-cta-buttons { flex-direction: row; justify-content: center; }
          .pe-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#1b3a5c', minHeight: '75svh', backgroundImage: 'radial-gradient(ellipse at 25% 35%, rgba(168,202,236,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(232,221,181,0.08) 0%, transparent 55%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div className="pe-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>The studio · Papworth Everard · CB23</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '760px' }}>
            <span aria-hidden="true">Papworth Everard{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>Studio.</span></span>
            <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Photography studio in Papworth Everard, Cambridgeshire</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '480px' }}>
            Our photography studio in Papworth Everard, Cambridgeshire — a warm, private, purpose-built space for newborn, family, maternity, couples and headshot sessions. Easy access from Cambridge, Huntingdon and the A14.
          </p>
          <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Book a session →
          </Link>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pe-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="pe-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>About the studio</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                Our Papworth Everard studio is a warm, comfortable space designed specifically for photography. Large windows bring in beautiful natural light, and our full studio lighting setup means we can shoot in any conditions.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1.2rem' }}>
                The studio is kept heated throughout — particularly important for newborn sessions. There&apos;s parking directly outside, and easy access from Cambridge, Huntingdon, St Ives, and the A14 corridor.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                A full range of props, wraps, backdrops and accessories are available. You don&apos;t need to bring anything beyond yourselves.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'Natural light', tag: 'Large windows' },
                { label: 'Studio lighting', tag: 'Full setup available' },
              ].map((tile) => (
                <div key={tile.label} style={{ aspectRatio: '4/3', backgroundColor: '#1b3a5c', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backgroundImage: 'radial-gradient(ellipse at 30% 30%, rgba(232,221,181,0.10) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(168,202,236,0.10) 0%, transparent 55%)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.7)', marginBottom: '0.6rem' }}>{tile.label}</p>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,221,181,0.55)' }}>{tile.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING BAND ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Papworth Everard — Book instantly online</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>Studio sessions from £99 · All images included · No per-image charges</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>Couple, maternity, newborn, family and headshot sessions. Also available as gift vouchers — perfect for birthdays, baby showers and Christmas.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a session →</Link>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Buy a gift voucher →</Link>
          </div>
        </div>
      </section>

      {/* ── BESPOKE NOTE ── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '2rem 1.5rem', borderTop: '1px solid rgba(168,202,236,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Larger &amp; bespoke shoots</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>Extended sessions, multiple outfits, video &amp; commercial work</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', maxWidth: '500px' }}>For longer, more in-depth shoots — multiple outfit changes, video, bespoke commercial projects and extended family sessions — get in touch and we&apos;ll tailor a session for you.</p>
          </div>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid rgba(168,202,236,0.3)', color: '#A8CAEC', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>Enquire about a bespoke shoot →</Link>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="pe-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What&apos;s included</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Studio features</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { title: 'Heated throughout', desc: 'Kept warm for newborn and family sessions. Comfortable all year round.' },
              { title: 'Natural light', desc: 'Large windows providing beautiful soft natural light throughout the day.' },
              { title: 'Studio lighting', desc: 'Professional lighting setup for complete control in any conditions.' },
              { title: 'Props & backdrops', desc: 'Full range provided. Wraps, props, backdrops and accessories included.' },
              { title: 'Free parking', desc: 'Parking directly outside the studio. No town centre parking stress.' },
              { title: 'Private space', desc: 'No other clients during your session. The studio is yours completely.' },
            ].map((f) => (
              <div key={f.title} style={{ padding: '1.8rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.4rem' }}>{f.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="pe-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Getting here</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none', marginBottom: '1rem' }}>Location & travel</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#5c5550', lineHeight: 1.8, marginBottom: '1.2rem' }}>
                Papworth Everard is a village in Cambridgeshire, easily accessible from multiple directions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  { from: 'Cambridge city centre', time: '20 minutes via A14/A1198' },
                  { from: 'Huntingdon', time: '15 minutes via A14' },
                  { from: 'St Ives', time: '20 minutes via A14' },
                  { from: 'Ely', time: '35 minutes via A10 and A14' },
                  { from: 'Peterborough', time: '40 minutes via A14' },
                  { from: 'Newmarket', time: '35 minutes via A14' },
                ].map((loc) => (
                  <div key={loc.from} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #DDD5C0' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.82rem', color: '#2C2820', textTransform: 'none' }}>{loc.from}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282' }}>{loc.time}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', padding: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.8rem' }}>Address · CB23</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1.5rem' }}>Papworth Everard, Cambridgeshire</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Full address, postcode and directions are shared by email when your session is confirmed. Parking is directly outside the studio.
              </p>
              <div style={{ borderTop: '1px solid #DDD5C0', paddingTop: '1.5rem' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.6rem' }}>Good to know</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {['Free parking directly outside', 'Kept warm year-round', 'Private — no other clients during your session', 'Props, wraps and backdrops provided'].map((item) => (
                    <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#1B3A5C', display: 'inline-block', marginTop: '0.55rem', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SESSION TYPES ── */}
      <section className="pe-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>What we offer here</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Sessions at Papworth Everard</h2>
          </div>
          <div className="pe-sessions-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Newborn Photography', desc: 'Baby-led sessions in the warm studio. Most popular use of this space.', href: '/newborn' },
              { title: 'Family Photography', desc: 'Beautiful indoor family sessions. Great for winter and younger children.', href: '/families' },
              { title: 'Maternity Photography', desc: 'Elegant maternity portraits in a private, comfortable space.', href: '/maternity' },
              { title: 'Couples & Engagement', desc: 'Relaxed studio portraits for couples and engagement sessions.', href: '/engagement' },
              { title: 'Headshots', desc: 'Professional headshots for individuals and small teams.', href: '/commercial/headshots' },
              { title: 'Brand Photography', desc: 'Product and brand photography for local businesses.', href: '/commercial/brand' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ padding: '1.8rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)', textDecoration: 'none', display: 'block' }}>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pe-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Book the Papworth studio</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready to book your session?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Studio sessions from £99 — book instantly online. Or get in touch and we&apos;ll come back to you with availability.
          </p>
          <div className="pe-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a session</Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire about a bespoke shoot</Link>
          </div>
        </div>
      </section>
    </>
  );
}