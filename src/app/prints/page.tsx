import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fine Art Prints & Framing | Something Blue Productions Cambridge",
  description: "Professional lustre prints and premium framing from your photography session. Produced by hand at our home studio in Cambridgeshire. Package deals available.",
  alternates: { canonical: "/prints" },
  openGraph: {
    title: "Fine Art Prints & Framing | Something Blue Productions",
    description: "Professional lustre prints and premium framing from your photography session.",
    url: "https://something-blue-productions.com/prints",
    type: "website",
  },
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function PrintsPage() {
  return (
    <>
      <style>{`
        .pr-pad { padding: 3rem 1.5rem; }
        .pr-hero-content { padding: 0 1.5rem 6rem; }
        .pr-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .pr-sizes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .pr-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pr-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pr-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .pr-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .pr-pad { padding: 3.5rem 2.5rem; }
          .pr-sizes-grid { grid-template-columns: repeat(3, 1fr); }
          .pr-process-grid { grid-template-columns: 1fr 1fr; }
          .pr-packages-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .pr-pad { padding: 4rem 4rem; }
          .pr-hero-content { padding: 0 4rem 5rem; }
          .pr-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .pr-sizes-grid { grid-template-columns: repeat(5, 1fr); }
          .pr-process-grid { grid-template-columns: repeat(4, 1fr); }
          .pr-packages-grid { grid-template-columns: repeat(3, 1fr); }
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
        <Image src={`${STORAGE}/prints-hero.jpg`} alt="Fine art photographic prints" fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="pr-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Prints &amp; Framing · Cambridgeshire</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Images made to{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>last.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Professional lustre prints and premium framing, produced by hand at our home studio. Package deals available — prints, frames, and digital files together.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about prints &amp; framing →
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
                We produce our prints ourselves at home, on professional lustre paper. Every print is made to order — checked and packed by hand before it leaves us. We also offer premium framing, so your images arrive ready to hang.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                Prints are available to all Something Blue clients after their session — studio, wedding, family, newborn and maternity.
              </p>
            </div>
            <div style={{ aspectRatio: '4/3', backgroundColor: '#2C2820', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>prints-intro.jpg</span>
              </div>
              <Image src={`${STORAGE}/prints-intro.jpg`} alt="Fine art print detail" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LUSTRE PAPER ── */}
      <section className="pr-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>The paper</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>Professional lustre</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', maxWidth: '680px', marginBottom: '1rem' }}>
              We print exclusively on professional lustre paper — a semi-gloss surface that brings out rich colour, deep contrast, and fine detail without the glare of a fully glossy finish. It handles beautifully, resists fingerprints, and looks exceptional behind glass or unframed.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', maxWidth: '680px' }}>
              Lustre is the industry standard for professional photographic printing. It works across all subject types — portraits, weddings, newborn — and holds up over decades.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2px' }}>
            {[
              { title: 'Semi-gloss finish', desc: 'Rich colour and contrast without glare' },
              { title: 'Fingerprint resistant', desc: 'Handles well without smudging' },
              { title: 'Long-life inks', desc: 'Archival pigment inks rated 100+ years' },
              { title: 'Professional grade', desc: 'Not a consumer lab print' },
            ].map((f) => (
              <div key={f.title} style={{ padding: '1.5rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0' }}>
                <div style={{ width: '18px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '0.8rem' }} />
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.8rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>{f.title}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', lineHeight: 1.6 }}>{f.desc}</p>
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
          <div className="pr-sizes-grid">
            {[
              { size: '5×7"', cm: '13×18cm', use: 'Desk or mantelpiece' },
              { size: '8×10"', cm: '20×25cm', use: 'Bedside or shelf' },
              { size: 'A4', cm: '21×29.7cm', use: 'Versatile — suits any room' },
              { size: 'A3', cm: '30×42cm', use: 'Statement bedroom wall' },
              { size: 'A2', cm: '42×59cm', use: 'Hallway or living room' },
            ].map((s) => (
              <div key={s.size} style={{ padding: '1.8rem 1.5rem', backgroundColor: '#F5F0E8' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.3rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.2rem' }}>{s.size}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>{s.cm}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550' }}>{s.use}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', marginTop: '1.5rem', lineHeight: 1.7 }}>
            Not sure which size to choose? Tell us which image you&apos;re printing and where it will hang and we&apos;ll recommend the right option.
          </p>
        </div>
      </section>

      {/* ── FRAMING ── */}
      <section className="pr-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Premium framing</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem' }}>Ready to hang</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: 'rgba(245,240,232,0.55)', maxWidth: '600px', marginBottom: '2rem' }}>
              We offer premium framing on all print sizes. Frames are selected to complement the image — classic black, natural oak, or white — with UV-protective glass to prevent fading. Your print arrives mounted and ready to hang.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', marginBottom: '1.5rem' }}>
            {[
              { title: 'Classic Black', desc: 'Clean, contemporary. Works with any interior style.' },
              { title: 'Natural Oak', desc: 'Warm and natural. Particularly suits family and lifestyle images.' },
              { title: 'White', desc: 'Light and airy. Perfect for nursery and newborn prints.' },
            ].map((f) => (
              <div key={f.title} style={{ padding: '1.8rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)' }}>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.4rem' }}>{f.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '1.5rem 2rem', backgroundColor: 'rgba(168,202,236,0.06)', borderLeft: '3px solid rgba(168,202,236,0.4)' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', color: '#A8CAEC', textTransform: 'none' }}>
              All framed prints include UV-protective glass, acid-free mount, and hanging hardware. Get in touch to discuss frame options for your image.
            </p>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="pr-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Save when you bundle</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Print packages</h2>
          </div>
          <div className="pr-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              {
                name: 'Starter',
                includes: ['3 lustre prints', 'Up to A4 size', 'Digital files included', 'Your choice of images'],
                highlight: false,
              },
              {
                name: 'Wall Collection',
                includes: ['5 lustre prints', 'Up to A3 size', '1 premium framed print', 'Digital files included', 'Sizing advice included'],
                highlight: true,
              },
              {
                name: 'Heirloom',
                includes: ['8 lustre prints', 'Mix of sizes up to A2', '2 premium framed prints', 'Digital files included', 'Presented in a keepsake box'],
                highlight: false,
              },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.highlight ? '#1B3A5C' : '#FAF8F2', border: pkg.highlight ? 'none' : '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '1rem' }}>{pkg.name}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.8rem' }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: pkg.highlight ? 'rgba(245,240,232,0.65)' : '#5c5550', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: pkg.highlight ? '#A8CAEC' : '#DDD5C0', flexShrink: 0, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.highlight ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${pkg.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '2px' }}>
                  Enquire about this package
                </Link>
              </div>
            ))}
          </div>
          <div style={{ padding: '1.5rem 2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', lineHeight: 1.7 }}>
              All packages are priced on enquiry — final cost depends on sizes and framing choices. Happy to put together a bespoke package if none of the above quite fits.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="pr-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>The process</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How to order</h2>
          </div>
          <div className="pr-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Get in touch', desc: "Tell us which session your images are from, which you'd like to print, and your preferred sizes. We'll come back with a quote." },
              { num: '02', title: 'Choose your finish', desc: "Confirm sizes, framing preference, and frame finish if applicable. We'll advise if you're unsure what works best." },
              { num: '03', title: 'We print by hand', desc: "Every print is produced at our home studio. We check each one before packing — if it's not right, we reprint it." },
              { num: '04', title: 'Delivered to your door', desc: 'Prints are packaged flat in rigid board mailers. Framed prints are individually wrapped and boxed. Tracked shipping included.' },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#F5F0E8' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pr-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Order prints</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Ready to put your images on the wall?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us which session your images are from, which you&apos;d like to print, and your preferred size and finish. We&apos;ll come back with a quote.
          </p>
          <div className="pr-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire about prints
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}