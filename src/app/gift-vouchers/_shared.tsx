import Link from 'next/link';
import Image from 'next/image';
import { SUPABASE_URL } from '@/lib/supabase';

export const STORAGE = `${SUPABASE_URL}/storage/v1/object/public/site-images`;

export type GiftCategoryProps = {
  slug: 'newborn' | 'family' | 'engagement';
  title: string;
  subtitle: string;
  heroImage: string;
  heroBg: string;
  heroKicker: string;
  headline: React.ReactNode;
  intro: string;
  packageIntro: string;
  packagePrice: '£99' | '£199';
  packageIncludes: string[];
  whoFor: string[];
  serviceHref: string;
  serviceName: string;
  faqs: { q: string; a: string }[];
  productSchema: object;
};

export function GiftCategoryPage(p: GiftCategoryProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(p.productSchema) }}
      />
      <style>{`
        .gc-pad { padding: 3rem 1.5rem; }
        .gc-hero-content { padding: 0 1.5rem 5rem; }
        .gc-grid-2 { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .gc-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .gc-cta-buttons a { text-align: center; }
        @media (min-width: 640px) { .gc-pad { padding: 3.5rem 2.5rem; } }
        @media (min-width: 900px) {
          .gc-pad { padding: 4rem 4rem; }
          .gc-hero-content { padding: 0 4rem 5rem; }
          .gc-grid-2 { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .gc-cta-buttons { flex-direction: row; justify-content: center; }
          .gc-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: p.heroBg, minHeight: '75svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <Image src={`${STORAGE}/${p.heroImage}`} alt={`${p.title} — Something Blue Productions`} fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="gc-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>{p.heroKicker}</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            <span aria-hidden="true">{p.headline}</span>
            <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>{p.title}</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '460px' }}>
            {p.intro}
          </p>
          <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
            Buy this voucher →
          </Link>
        </div>
      </section>

      {/* PACKAGE */}
      <section className="gc-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="gc-grid-2">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>What&apos;s included</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                {p.packageIntro}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                All sessions run at our Papworth Everard studio (CB23), a short drive from Cambridge, Huntingdon and the A14. Full session details are on our <Link href={p.serviceHref} style={{ color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)' }}>{p.serviceName} page</Link>.
              </p>
            </div>
            <div style={{ padding: '2.5rem', backgroundColor: '#1B3A5C' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>The voucher</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2.5rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '1.5rem', lineHeight: 1 }}>{p.packagePrice}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0, padding: 0, marginBottom: '1.8rem' }}>
                {p.packageIncludes.map((item) => (
                  <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: 'rgba(245,240,232,0.75)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A8CAEC', display: 'inline-block', marginTop: '0.55rem', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.9rem 1.8rem', textDecoration: 'none', display: 'inline-block' }}>
                Buy voucher →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO FOR */}
      <section className="gc-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.75rem' }}>Who it&apos;s for</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>Occasions to give this voucher</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {p.whoFor.map((occ) => (
              <span key={occ} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B3A5C', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', padding: '0.4rem 0.9rem' }}>{occ}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="gc-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Three simple steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px' }}>
            {[
              { num: '01', title: 'Buy online', desc: 'Complete the purchase securely online. The voucher is delivered by email — to you, or straight to the recipient.' },
              { num: '02', title: 'They book', desc: 'The recipient chooses a date and time that suits them, and books their session directly with us.' },
              { num: '03', title: 'The session', desc: 'They come to our Papworth Everard studio. Relaxed, unhurried, and led entirely by them and the session.' },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#F5F0E8' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.5rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gc-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Voucher FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {p.faqs.map((f, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{f.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gc-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to give</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Buy a {p.subtitle.toLowerCase()} voucher</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Vouchers are purchased and delivered by email. The recipient books their session directly with us.
          </p>
          <div className="gc-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Buy this voucher</Link>
            <Link href="/gift-vouchers" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>See all vouchers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
