import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand & Business Photography Cambridge | Something Blue Productions",
  description: "Product photography, brand visuals and small business content photography across Cambridge and Cambridgeshire. Professional images that represent your business properly.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function BrandPage() {
  return (
    <>
      <style>{`
        .b-pad { padding: 3rem 1.5rem; }
        .b-hero-content { padding: 0 1.5rem 6rem; }
        .b-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .b-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .b-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .b-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .b-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .b-pad { padding: 3.5rem 2.5rem; }
          .b-process-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .b-pad { padding: 4rem 4rem; }
          .b-hero-content { padding: 0 4rem 5rem; }
          .b-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .b-services-grid { grid-template-columns: repeat(3, 1fr); }
          .b-process-grid { grid-template-columns: repeat(3, 1fr); }
          .b-cta-buttons { flex-direction: row; justify-content: center; }
          .b-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#3a3020', minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>commercial-brand-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/commercial-brand-hero.jpg`} alt="Brand photography Cambridge" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="b-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Brand & Business Photography · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Images that represent your{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>business properly.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            Product photography, brand visuals and small business content. Professional quality without the agency price tag or the corporate feel.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Discuss your project →
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="b-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="b-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Who this is for</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                Small businesses, independent brands, and local businesses who need photography that actually represents what they do — not generic stock images or rushed phone shots.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                We work with product businesses, service businesses, hospitality, retail, creative studios, and anyone who needs consistent, professional images for their website, social media, or marketing. We can also use both studio spaces for product and brand work.
              </p>
            </div>
            <div style={{ aspectRatio: '4/3', backgroundColor: '#3a3020', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>commercial-brand-intro.jpg</span>
              </div>
              <img src={`${STORAGE}/commercial-brand-intro.jpg`} alt="Brand photography" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE SHOOT */}
      <section className="b-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What we offer</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Brand photography services</h2>
          </div>
          <div className="b-services-grid">
            {[
              { title: 'Product Photography', desc: 'Clean, consistent product images for e-commerce, websites and print. Studio or location-based.' },
              { title: 'Brand & Lifestyle', desc: 'Images that show your brand in context — how you work, what you make, who you are.' },
              { title: 'Social Media Content', desc: 'A library of images shot in a consistent style, ready to use across your social channels.' },
              { title: 'Team & People', desc: 'Individual and team portraits for websites, LinkedIn and marketing materials.' },
              { title: 'Studio Hire', desc: 'Use our Papworth Everard or Waterbeach studios for your own brand shoot.' },
              { title: 'Bespoke Projects', desc: "Have something specific in mind? Tell us what you need — if we can do it, we will." },
            ].map((s) => (
              <div key={s.title} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="b-pad" style={{ backgroundColor: '#2c2820' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Simple from start to finish</h2>
          </div>
          <div className="b-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Brief & quote', desc: "Tell us what you need — product types, usage, quantities, style references. We'll come back with a clear quote." },
              { num: '02', title: 'Plan & shoot', desc: "We plan the shoot together and execute it efficiently. Studio or location, we work to your timeline." },
              { num: '03', title: 'Edit & deliver', desc: "Edited images delivered to agreed specifications — web and print ready. Quick turnaround as standard." },
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

      {/* CTA */}
      <section className="b-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Start a project</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Tell us about your business</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            A brief description of what you do and what you need is enough to start. We&apos;ll come back to you with a clear, honest quote.
          </p>
          <div className="b-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Get a quote</Link>
            <Link href="/commercial" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>All commercial services</Link>
          </div>
        </div>
      </section>
    </>
  );
}