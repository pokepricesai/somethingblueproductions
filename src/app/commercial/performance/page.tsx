import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance & Show Photography Cambridge | Something Blue Productions",
  description: "Theatre, dance, music and live performance photography across Cambridge and Cambridgeshire. Fast, discreet, and designed to capture energy and emotion.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function PerformancePage() {
  return (
    <>
      <style>{`
        .p-pad { padding: 3rem 1.5rem; }
        .p-hero-content { padding: 0 1.5rem 6rem; }
        .p-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .p-types-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .p-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .p-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .p-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .p-pad { padding: 3.5rem 2.5rem; }
          .p-process-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .p-pad { padding: 4rem 4rem; }
          .p-hero-content { padding: 0 4rem 5rem; }
          .p-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .p-types-grid { grid-template-columns: repeat(4, 1fr); }
          .p-process-grid { grid-template-columns: repeat(3, 1fr); }
          .p-cta-buttons { flex-direction: row; justify-content: center; }
          .p-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#1b2a3a', minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>commercial-performance-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/commercial-performance-hero.jpg`} alt="Performance photography Cambridge" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="p-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Performance & Show Photography · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            The energy of live{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>performance.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            Theatre, dance, music, events and live performance photography. Fast, discreet, and built to capture what makes live performance worth watching.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Discuss your show →
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="p-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="p-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                Performance photography is a different discipline. The light is difficult, the action is fast, and you can&apos;t ask anyone to repeat a moment. You have to be ready before it happens.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
                We work discreetly and efficiently — never interrupting a performance, always positioned to capture what matters. The results are images that show an audience what they missed, and remind performers what they achieved.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                We work with theatre companies, dance schools, music acts, event organisers and performing arts venues across Cambridgeshire and beyond.
              </p>
            </div>
            <div style={{ aspectRatio: '3/4', backgroundColor: '#1b2a3a', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>commercial-performance-intro.jpg</span>
              </div>
              <img src={`${STORAGE}/commercial-performance-intro.jpg`} alt="Performance photography" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE TYPES */}
      <section className="p-pad" style={{ backgroundColor: '#1b2a3a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.5)', marginBottom: '0.5rem' }}>What we cover</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Performance types</h2>
          </div>
          <div className="p-types-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Theatre', desc: 'Stage productions, amateur dramatics, professional theatre. Dress rehearsal and live performance coverage.', color: '#243040' },
              { title: 'Dance', desc: 'Classical, contemporary, street and social dance. Shows, recitals, competitions and rehearsals.', color: '#1e2838' },
              { title: 'Music', desc: 'Gigs, concerts, recitals, festivals and studio sessions. Any genre, any venue size.', color: '#202830' },
              { title: 'Events & Shows', desc: 'Corporate events, award ceremonies, public shows, graduation performances and special events.', color: '#1a2230' },
            ].map((t) => (
              <div key={t.title} style={{ padding: '2rem 1.5rem', backgroundColor: t.color }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#A8CAEC', marginBottom: '1rem', opacity: 0.4 }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.5rem' }}>{t.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section style={{ padding: '3rem 0', backgroundColor: '#F5F0E8' }}>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '220px', aspect: '2/3', color: '#1b2a3a', img: 'commercial-performance-portfolio-01.jpg' },
            { w: '320px', aspect: '3/2', color: '#243040', img: 'commercial-performance-portfolio-02.jpg' },
            { w: '220px', aspect: '2/3', color: '#1e2838', img: 'commercial-performance-portfolio-03.jpg' },
            { w: '260px', aspect: '4/3', color: '#202830', img: 'commercial-performance-portfolio-04.jpg' },
            { w: '220px', aspect: '2/3', color: '#1a2230', img: 'commercial-performance-portfolio-05.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.img}</span>
              </div>
              <img src={`${STORAGE}/${item.img}`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="p-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Working with us on your show</h2>
          </div>
          <div className="p-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Tell us about your show', desc: "Send us the basics — type of performance, venue, date, and what you need the images for. We'll confirm availability and discuss coverage." },
              { num: '02', title: 'We arrive prepared', desc: "We scout the venue where possible, discuss key moments with directors or organisers, and arrive with the right equipment for the lighting conditions." },
              { num: '03', title: 'Images delivered quickly', desc: "Performance clients often need images fast. We offer quick turnaround as standard — typically 48–72 hours for a selection of edited highlights." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.92rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Book for your show</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Tell us about your performance</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Send us the date, venue, and type of performance. We&apos;ll confirm availability and come back with a clear quote.
          </p>
          <div className="p-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Discuss your show</Link>
            <Link href="/commercial" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>All commercial services</Link>
          </div>
        </div>
      </section>
    </>
  );
}