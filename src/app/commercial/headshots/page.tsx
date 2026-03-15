import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Headshots Cambridge | Performers, Models & Creatives | Something Blue Productions",
  description: "Creative headshots for actors, performers, models and creatives in Cambridge and Cambridgeshire. Personal, characterful portraits — not corporate.",
};

export default function HeadshotsPage() {
  return (
    <>
      <style>{`
        .h-pad { padding: 3rem 1.5rem; }
        .h-hero-content { padding: 0 1.5rem 6rem; }
        .h-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .h-who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .h-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .h-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .h-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .h-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .h-pad { padding: 3.5rem 2.5rem; }
          .h-process-grid { grid-template-columns: 1fr 1fr; }
          .h-packages-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .h-pad { padding: 4rem 4rem; }
          .h-hero-content { padding: 0 4rem 5rem; }
          .h-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .h-who-grid { grid-template-columns: repeat(4, 1fr); }
          .h-process-grid { grid-template-columns: repeat(3, 1fr); }
          .h-packages-grid { grid-template-columns: repeat(3, 1fr); }
          .h-cta-buttons { flex-direction: row; justify-content: center; }
          .h-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#2a2030', minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#2a2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.15)', textAlign: 'center' }}>commercial-headshot-01.jpg</span>
        </div>
        <div className="h-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>
            Creative Headshots · Cambridge
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Headshots that look like{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>you.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            For actors, performers, models and creatives. Not corporate, not stiff — personal, characterful portraits that show who you are and get you noticed.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Book your headshot session →
          </Link>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="h-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="h-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                A headshot should look like the best version of you — not a stranger in formal clothes trying to look professional. We shoot with the same editorial eye we bring to all our work.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
                Sessions are relaxed and conversational. We take time to warm up before we start shooting properly, so the images don&apos;t look like someone who was nervous in front of a camera — because by that point you won&apos;t be.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                Studio or location. Multiple looks if needed. Fast turnaround available for performers with casting calls or auditions coming up.
              </p>
            </div>
            <div style={{ aspectRatio: '3/4', backgroundColor: '#2a2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>commercial-headshot-01.jpg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section className="h-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Who we work with</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Creative headshots for</h2>
          </div>
          <div className="h-who-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Actors & Performers', desc: "Casting headshots, showreel stills, and promotional portraits for stage and screen." },
              { title: 'Models', desc: "Portfolio headshots and character shots for model cards, agencies and self-promotion." },
              { title: 'Dancers', desc: "Performance portraits, audition headshots and promotional images for dancers of all disciplines." },
              { title: 'Creatives & Artists', desc: "Personal branding portraits for artists, musicians, writers, designers and other creatives." },
            ].map((w) => (
              <div key={w.title} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{w.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <section style={{ padding: '3rem 0', backgroundColor: '#F5F0E8' }}>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '200px', aspect: '3/4', color: '#2a2030' },
            { w: '200px', aspect: '3/4', color: '#302830' },
            { w: '200px', aspect: '3/4', color: '#281828' },
            { w: '320px', aspect: '4/3', color: '#1b2a3a' },
            { w: '200px', aspect: '3/4', color: '#2a2838' },
            { w: '200px', aspect: '3/4', color: '#282030' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>commercial-headshot-0{i + 1}.jpg</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="h-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Investment</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Headshot packages</h2>
          </div>
          <div className="h-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              { name: 'Essential', price: 'From £145', includes: ['60 minute session', 'Studio or location', 'One look', 'Online gallery', '10+ edited selects', 'Web-ready files'], highlight: false },
              { name: 'Standard', price: 'From £225', includes: ['90 minute session', 'Studio or location', 'Two looks', 'Online gallery', '20+ edited selects', 'Web-ready files', 'Print-ready files'], highlight: true },
              { name: 'Extended', price: 'From £345', includes: ['2.5 hour session', 'Studio + location', 'Three or more looks', 'Online gallery', '35+ edited selects', 'All file formats', 'Rush turnaround available'], highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.highlight ? '#1B3A5C' : 'rgba(255,255,255,0.04)', border: pkg.highlight ? 'none' : '1px solid rgba(168,202,236,0.1)' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.3rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.highlight ? '#E8DDB5' : '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>{pkg.price}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.8rem' }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A8CAEC', flexShrink: 0, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.highlight ? '#E8DDB5' : '#9E9282', textDecoration: 'none', borderBottom: `1px solid ${pkg.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(158,146,130,0.3)'}`, paddingBottom: '2px' }}>
                  Book this package
                </Link>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.35)', textAlign: 'center' }}>
            Rush turnaround available for casting calls and auditions. Ask when enquiring.
          </p>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="h-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How a headshot session works</h2>
          </div>
          <div className="h-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'We talk first', desc: "Before the session we discuss what you need the images for, your style, and what you want to communicate. This shapes everything." },
              { num: '02', title: 'Warm up, then shoot', desc: "We never start shooting immediately. We spend time getting comfortable first — the images are always better for it." },
              { num: '03', title: 'Fast delivery', desc: "Edited selects delivered within a week as standard. Rush turnaround available within 24–48 hours if you have something urgent." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#F5F0E8' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.92rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="h-pad" style={{ backgroundColor: '#2a2030', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '1rem' }}>Book your session</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Ready for new headshots?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you need the images for and we&apos;ll put together the right session for you. Rush turnaround available if you have something coming up.
          </p>
          <div className="h-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#2a2030', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book now
            </Link>
            <Link href="/commercial" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.55)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              All commercial services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}