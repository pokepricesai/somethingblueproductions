import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Papworth Everard Photography Studio | Something Blue Productions",
  description: "Our warm, professional photography studio in Papworth Everard, Cambridgeshire. Newborn, family, maternity, headshots and brand photography. Easy access from Cambridge, Huntingdon and the A14.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function PapworthStudioPage() {
  return (
    <>
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

      {/* HERO */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#1b3a5c', minHeight: '75svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>studio-papworth-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/studio-papworth-hero.jpg`} alt="Papworth Everard photography studio" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="pe-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Studio · Papworth Everard · CB23</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Papworth Everard{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>Studio.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            Our main studio in Cambridgeshire. Warm, airy, and set up for newborn, family and maternity sessions. Accessible from Cambridge, Huntingdon and the A14 corridor.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Book this studio →
          </Link>
        </div>
      </section>

      {/* INTRO */}
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
              {['studio-papworth-room-01.jpg', 'studio-papworth-room-02.jpg'].map((img) => (
                <div key={img} style={{ aspectRatio: '4/3', backgroundColor: '#1b3a5c', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{img}</span>
                  </div>
                  <img src={`${STORAGE}/${img}`} alt="Studio interior" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOOKING BAND ─── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Papworth Everard — Book instantly online</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>Studio sessions from £99 · All images included · No per-image charges</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>Couple, maternity, newborn, family and headshot sessions. Also available as gift vouchers — perfect for birthdays, baby showers and Christmas.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a session →</a>
            <a href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Buy a gift voucher →</a>
          </div>
        </div>
      </section>

      {/* ─── WATERBEACH NOTE ─── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '2rem 1.5rem', borderTop: '1px solid rgba(168,202,236,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Waterbeach Studio · Larger & bespoke shoots</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>Extended sessions, multiple outfits, video & commercial work</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', maxWidth: '500px' }}>Our Waterbeach studio is available for longer, more in-depth shoots — multiple outfit changes, video, bespoke commercial projects and extended family sessions. Please enquire to discuss.</p>
          </div>
          <a href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid rgba(168,202,236,0.3)', color: '#A8CAEC', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>Enquire about Waterbeach →</a>
        </div>
      </section>

      {/* FEATURES */}
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

      {/* LOCATION */}
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
            <div style={{ aspectRatio: '16/9', backgroundColor: '#a8b8c8', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(27,58,92,0.4)', textAlign: 'center' }}>studio-papworth-location.jpg</span>
              </div>
              <img src={`${STORAGE}/studio-papworth-location.jpg`} alt="Papworth Everard location" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* SESSION TYPES */}
      <section className="pe-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>What we offer here</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Sessions at Papworth Everard</h2>
          </div>
          <div className="pe-sessions-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Newborn Photography', desc: 'Baby-led sessions in our warm studio. Most popular use of this space.', href: '/newborn' },
              { title: 'Family Photography', desc: 'Beautiful indoor family sessions. Great for winter and younger children.', href: '/families' },
              { title: 'Maternity Photography', desc: 'Elegant maternity portraits in a private, comfortable space.', href: '/maternity' },
              { title: 'Headshots', desc: 'Professional headshots for individuals and small teams.', href: '/commercial/headshots' },
              { title: 'Brand Photography', desc: 'Product and brand photography for local businesses.', href: '/commercial/brand' },
              { title: 'Mini Sessions', desc: 'Seasonal shorter sessions at a reduced rate.', href: '/enquire' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ padding: '1.8rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)', textDecoration: 'none', display: 'block' }}>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pe-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Book the Papworth studio</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready to book your session?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what type of session you&apos;re looking for and we&apos;ll come back to you with availability at our Papworth Everard studio.
          </p>
          <div className="pe-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire now</Link>
            <Link href="/studio/waterbeach" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>See Waterbeach studio</Link>
          </div>
        </div>
      </section>
    </>
  );
}