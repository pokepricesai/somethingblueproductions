import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Photography Cambridge | Something Blue Productions",
  description: "Brand photography, performance & show photography, and creative headshots across Cambridge and Cambridgeshire. Professional results for businesses, performers and creatives.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: "Commercial Photography Cambridge | Something Blue Productions",
    description: "Brand, performance and headshot photography across Cambridge and Cambridgeshire.",
    url: "https://something-blue-productions.com/commercial",
    type: "website",
  },
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function CommercialPage() {
  return (
    <>
      <style>{`
        .c-pad { padding: 3rem 1.5rem; }
        .c-hero-content { padding: 0 1.5rem 6rem; }
        .c-services-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .c-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .c-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .c-cta-buttons a { text-align: center; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .c-pad { padding: 3.5rem 2.5rem; }
          .c-services-grid { grid-template-columns: 1fr 1fr; }
          .c-process-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .c-pad { padding: 4rem 4rem; }
          .c-hero-content { padding: 0 4rem 5rem; }
          .c-services-grid { grid-template-columns: repeat(3, 1fr); }
          .c-process-grid { grid-template-columns: repeat(3, 1fr); }
          .c-cta-buttons { flex-direction: row; justify-content: center; }
          .c-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#2c2820', minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>commercial-hero.jpg</span>
        </div>
        <Image src={`${STORAGE}/commercial-hero.jpg`} alt="Commercial photography Cambridge" fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="c-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Commercial Photography · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Photography that{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>works.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            Brand photography, performance and show photography, and creative headshots for performers, models and creatives across Cambridge and Cambridgeshire.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Discuss your project →
          </Link>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="c-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Commercial work</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
            Our commercial work sits alongside our family and wedding photography — different in tone, identical in quality. Clean, capable, and delivered on time.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
            We work with small businesses, local brands, performers, theatre companies, dancers, musicians, and creatives who need photography that does a job. No fuss, no overcomplication — just images that work.
          </p>
        </div>
      </section>

      {/* ── PRICING NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Investment</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Every commercial project is quoted individually
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              Tell us your brief and we'll come back with a clear, itemised quote. No surprises.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Discuss your project →
            </Link>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
              See all packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── THREE SERVICES ── */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#F5F0E8' }}>
        <div className="c-services-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { label: 'For businesses & brands', title: 'Brand & Business Photography', desc: 'Product photography, brand visuals, social content and small business photography. Consistent, commercial-quality images that represent your business properly.', href: '/commercial/brand', color: '#3a3020', img: 'commercial-brand-card.jpg' },
            { label: 'For performers & companies', title: 'Performance & Show Photography', desc: 'Theatre, dance, music, events and live performance photography. Fast, discreet, and designed to capture energy and emotion in difficult lighting conditions.', href: '/commercial/performance', color: '#1b2a3a', img: 'commercial-performance-card.jpg' },
            { label: 'For performers, models & creatives', title: 'Creative Headshots', desc: 'Headshots for actors, performers, models and creatives. Not corporate — personal, characterful, and shot with the same editorial eye as our personal work.', href: '/commercial/headshots', color: '#2a2030', img: 'commercial-headshots-card.jpg' },
          ].map((service) => (
            <Link key={service.href} href={service.href} className="zoom-card" style={{ position: 'relative', display: 'block', aspectRatio: '3/4', backgroundColor: service.color, textDecoration: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{service.img}</span>
              </div>
              <Image src={`${STORAGE}/${service.img}`} alt={service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" className="zoom-img" style={{ objectFit: 'cover', zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem 2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', marginBottom: '0.5rem' }}>{service.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem', lineHeight: 1.2 }}>{service.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, marginBottom: '1.2rem' }}>{service.desc}</p>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '16px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />Find out more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WORK STRIP ── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', padding: '0 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Selected work</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Commercial portfolio</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '220px', aspect: '2/3', color: '#3a3020', img: 'commercial-portfolio-01.jpg' },
            { w: '320px', aspect: '3/2', color: '#1b2a3a', img: 'commercial-portfolio-02.jpg' },
            { w: '220px', aspect: '2/3', color: '#2a2030', img: 'commercial-portfolio-03.jpg' },
            { w: '260px', aspect: '4/3', color: '#302820', img: 'commercial-portfolio-04.jpg' },
            { w: '220px', aspect: '2/3', color: '#1a2838', img: 'commercial-portfolio-05.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.img}</span>
              </div>
              <Image src={`${STORAGE}/${item.img}`} alt={`Commercial photography Cambridge ${i + 1}`} fill sizes="320px" style={{ objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="c-pad" style={{ backgroundColor: '#2c2820' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '0.5rem' }}>The process</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>How commercial projects work</h2>
          </div>
          <div className="c-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Tell us what you need', desc: "A brief message is enough to start. We'll discuss your project, your timeline, and what you need the images to do." },
              { num: '02', title: 'We plan together', desc: "We put together a clear plan — what we'll shoot, when, where, and what you'll receive. No surprises, no hidden extras." },
              { num: '03', title: 'Shoot and deliver', desc: "We shoot efficiently and deliver edited images on time. Commercial clients receive web-ready files as standard, with print-ready files available." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,240,232,0.06)' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: 'rgba(245,240,232,0.15)', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.92rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="c-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Start a project</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Tell us what you need</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            A brief description of your project is enough to start a conversation. We respond quickly and keep things straightforward.
          </p>
          <div className="c-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Discuss your project</Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>View commercial work</Link>
          </div>
        </div>
      </section>
    </>
  );
}