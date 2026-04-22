import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fine Art Prints | Something Blue Productions Cambridge",
  description: "Museum-quality fine art prints from your photography session. Produced by hand at our home studio in Cambridgeshire — giclée prints on premium archival paper.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function PrintsPage() {
  return (
    <>
      <style>{`
        .pr-pad { padding: 3rem 1.5rem; }
        .pr-hero-content { padding: 0 1.5rem 6rem; }
        .pr-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .pr-types-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pr-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pr-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .pr-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .pr-pad { padding: 3.5rem 2.5rem; }
          .pr-types-grid { grid-template-columns: 1fr 1fr; }
          .pr-process-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .pr-pad { padding: 4rem 4rem; }
          .pr-hero-content { padding: 0 4rem 5rem; }
          .pr-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .pr-types-grid { grid-template-columns: repeat(3, 1fr); }
          .pr-process-grid { grid-template-columns: repeat(4, 1fr); }
          .pr-cta-buttons { flex-direction: row; justify-content: center; }
          .pr-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#2C2820', minHeight: '75svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>prints-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/prints-hero.jpg`} alt="Fine art photographic prints" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="pr-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Fine Art Prints · Cambridgeshire</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Images made to{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>last.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Museum-quality fine art prints, produced by hand at our home studio in Cambridgeshire. Giclée printing on premium archival papers — made to be framed, displayed, and kept.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about prints →
          </Link>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pr-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="pr-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Why prints matter</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
                A photograph on your phone is easy to forget. A print on your wall is something your children will grow up looking at.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
                We produce our prints ourselves, at home, using a professional giclée printer and archival-grade pigment inks. Every print is made to order — checked, trimmed and packed by hand before it leaves us.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                We only print images we&apos;ve taken — these are available to clients after their session, and are not sold separately.
              </p>
            </div>
            <div style={{ aspectRatio: '4/3', backgroundColor: '#2C2820', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>prints-intro.jpg</span>
              </div>
              <img src={`${STORAGE}/prints-intro.jpg`} alt="Fine art print detail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINT TYPES ── */}
      <section className="pr-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What we offer</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Print options</h2>
          </div>
          <div className="pr-types-grid">
            {[
              {
                title: 'Fine Art Giclée',
                desc: 'Printed on heavyweight fine art paper with a smooth matte surface. Exceptional tonal range and shadow detail. Our most popular choice for portraits and newborn images.',
                detail: 'Hahnemühle Photo Rag · 308gsm · Archival',
              },
              {
                title: 'Lustre Print',
                desc: 'A semi-gloss surface that brings out rich colour and contrast. Particularly well suited to wedding and outdoor photography where vibrancy matters.',
                detail: 'Fujifilm Crystal Archive · Semi-gloss · Long-life',
              },
              {
                title: 'Canvas Print',
                desc: 'Stretched over a solid wooden frame, ready to hang. A substantial, tactile finish that works beautifully with lifestyle and family images.',
                detail: 'Gallery-wrapped · Solid pine frame · Ready to hang',
              },
            ].map((type) => (
              <div key={type.title} style={{ padding: '2rem 1.8rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0' }}>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.8rem' }}>{type.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75, marginBottom: '1.2rem' }}>{type.desc}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282' }}>{type.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIZES ── */}
      <section className="pr-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Sizing</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Available sizes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2px' }}>
            {[
              { size: '5×7"', cm: '13×18cm', use: 'Desk or mantelpiece' },
              { size: '8×10"', cm: '20×25cm', use: 'Bedside or shelf' },
              { size: 'A3', cm: '30×42cm', use: 'Statement bedroom wall' },
              { size: 'A2', cm: '42×59cm', use: 'Hallway or living room' },
              { size: 'A1', cm: '59×84cm', use: 'Feature wall' },
              { size: 'Bespoke', cm: 'Custom', use: 'Any size on request' },
            ].map((s) => (
              <div key={s.size} style={{ padding: '1.8rem 1.5rem', backgroundColor: '#F5F0E8' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.3rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.2rem' }}>{s.size}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>{s.cm}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550' }}>{s.use}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', marginTop: '1.5rem', lineHeight: 1.7 }}>
            Not sure which size to choose? We&apos;re happy to advise — tell us which image you&apos;re printing and where it will hang and we&apos;ll recommend the right option.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="pr-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>The process</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>How to order</h2>
          </div>
          <div className="pr-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Book your session', desc: 'Prints are available to all Something Blue clients after their session. Studio, wedding, family, newborn and maternity sessions all qualify.' },
              { num: '02', title: 'Choose your images', desc: 'Once your gallery is delivered, browse your edited images and choose which you\'d like to print. We\'ll help you narrow it down if needed.' },
              { num: '03', title: 'We print by hand', desc: 'Every print is produced at our home studio on a professional giclée printer. We check, trim and package each print ourselves before it leaves.' },
              { num: '04', title: 'Delivered to your door', desc: 'Prints are packaged flat in rigid board mailers for small sizes, or rolled in tubes for large format. Tracked shipping included.' },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: 'rgba(168,202,236,0.2)', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY NOTE ── */}
      <section className="pr-pad" style={{ backgroundColor: '#1B3A5C' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1.5rem' }}>Our commitment</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            We use archival pigment inks rated to last over 100 years without fading under normal display conditions.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(232,221,181,0.55)' }}>
            These are not consumer lab prints. Every sheet goes through our printer once — we don&apos;t batch-produce or outsource. If a print isn&apos;t right, we reprint it. That&apos;s the standard we hold ourselves to.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pr-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Order prints</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Ready to put your images on the wall?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Get in touch and tell us which session your images are from, which you&apos;d like to print, and your preferred size and finish. We&apos;ll come back to you with a quote.
          </p>
          <div className="pr-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire about prints
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}