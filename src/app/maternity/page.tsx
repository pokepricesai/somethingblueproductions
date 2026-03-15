import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity Photography Cambridge & Cambridgeshire | Something Blue Productions",
  description: "Beautiful, elegant maternity photography at our studios in Papworth Everard and Waterbeach, or outdoors across Cambridgeshire. Book between 28–36 weeks for the best results.",
};

export default function MaternityPage() {
  return (
    <>
      <style>{`
        .m-pad { padding: 3rem 1.5rem; }
        .m-hero-content { padding: 0 1.5rem 6rem; }
        .m-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .m-split-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .m-gallery-strip-header { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .m-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .m-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .m-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .m-faqs { max-width: 100%; }
        .m-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .m-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .m-pad { padding: 3.5rem 2.5rem; }
          .m-split-grid { grid-template-columns: 1fr 1fr; }
          .m-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .m-packages-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .m-pad { padding: 4rem 4rem; }
          .m-hero-content { padding: 0 4rem 5rem; }
          .m-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .m-process-grid { grid-template-columns: repeat(3, 1fr); }
          .m-packages-grid { grid-template-columns: repeat(3, 1fr); }
          .m-faqs { max-width: 780px; margin: 0 auto; }
          .m-gallery-strip-header { flex-direction: row; align-items: flex-end; }
          .m-cta-buttons { flex-direction: row; justify-content: center; }
          .m-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#4a3c50', minHeight: '90svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.65) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#4a3c50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.15)', textAlign: 'center' }}>maternity-hero.jpg</span>
        </div>
        <div className="m-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>
            Maternity Photography · Cambridgeshire
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Before they{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>arrive.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Elegant, unhurried maternity photography in studio or outdoors. A document of this chapter — beautiful, personal, and entirely yours.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about a maternity session →
          </Link>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="m-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="m-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
                Pregnancy is one of the most significant things a body can do. We think it deserves to be photographed with the same care and attention as any other milestone.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
                Maternity sessions are calm, flexible, and led entirely by you. We&apos;ll discuss what you want from the session beforehand — whether that&apos;s something soft and intimate, something outdoors and natural, or a combination of both.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                Partners and children are always welcome. Some of the most beautiful maternity images we&apos;ve made have involved the whole family.
              </p>
            </div>
            <div style={{ aspectRatio: '3/4', backgroundColor: '#c0a8b0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', textAlign: 'center' }}>maternity-gallery-01.jpg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STUDIO / OUTDOOR SPLIT ─── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="m-split-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#1b3a5c', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>maternity-gallery-01.jpg</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.4rem' }}>Studio</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>Studio Maternity</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, maxWidth: '320px' }}>
                Beautiful controlled light, warm temperature, and complete privacy. Our studios in Papworth Everard and Waterbeach are set up specifically to flatter and celebrate.
              </p>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#3a4828', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>maternity-gallery-02.jpg</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.4rem' }}>Outdoors</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>Outdoor Maternity</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, maxWidth: '320px' }}>
                Cambridgeshire has beautiful natural settings for maternity sessions — meadows, woodland, riverside. Golden hour outdoor sessions have a warmth that&apos;s hard to replicate indoors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="m-gallery-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Recent sessions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Maternity work</h2>
          </div>
          <Link href="/newborn-maternity/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all maternity sessions</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '200px', aspect: '3/4', color: '#c0a8b0', label: 'maternity-gallery-01.jpg' },
            { w: '300px', aspect: '4/3', color: '#b0a8b8', label: 'maternity-gallery-02.jpg' },
            { w: '200px', aspect: '3/4', color: '#c8b0b8', label: 'maternity-gallery-03.jpg' },
            { w: '260px', aspect: '4/3', color: '#a8b0b8', label: 'maternity-gallery-04.jpg' },
            { w: '200px', aspect: '3/4', color: '#b8a8b0', label: 'maternity-gallery-05.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(74,60,80,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMING GUIDE ─── */}
      <section className="m-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>When to book</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none', marginBottom: '0.8rem' }}>Timing your maternity session</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#5c5550', lineHeight: 1.75, maxWidth: '600px' }}>
              The sweet spot for maternity photography is 28–36 weeks. The bump is beautifully rounded but you&apos;re still comfortable enough to move freely and enjoy the session.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { weeks: '20–27 weeks', label: 'Early', desc: 'The bump is showing but still small. Can work beautifully for intimate portraits but may feel less dramatic.' },
              { weeks: '28–32 weeks', label: 'Ideal', desc: 'Our most recommended window. Comfortable, mobile, and the bump is beautifully defined. Plenty of time to receive your images before baby arrives.' },
              { weeks: '33–36 weeks', label: 'Late ideal', desc: 'Still great, especially for a fuller bump. We recommend booking no later than 36 weeks to give you time to receive your images.' },
              { weeks: '37+ weeks', label: 'Last chance', desc: "Still possible and sometimes the most dramatic results. Let us know your due date and we'll see what we can arrange." },
            ].map((item) => (
              <div key={item.weeks} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>{item.label}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 400, fontSize: '1.1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{item.weeks}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="m-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How a session works</h2>
          </div>
          <div className="m-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'We plan together', desc: "Before your session we talk through what you want — studio or outdoor, the mood you're after, whether to include a partner or children, and what to wear. We send a styling guide to all clients." },
              { num: '02', title: 'The session', desc: "Sessions run 1.5–2 hours and are entirely at your pace. We guide you gently through different positions and setups — nothing uncomfortable, nothing forced. Most clients tell us it felt much more relaxed than they expected." },
              { num: '03', title: 'Your gallery', desc: "Delivered within 3 weeks. A carefully edited set of images ready to print, share, or frame. We recommend having a selection printed — these images are for your walls, not just your phone." },
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

      {/* ─── TESTIMONIALS ─── */}
      <section className="m-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>From our clients</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>What they said</h2>
          </div>
          <div className="m-testimonials-grid">
            {[
              { quote: "I felt so self-conscious about being photographed during pregnancy. Within ten minutes of arriving at the studio I completely forgot to feel that way. The images are the most beautiful photographs I've ever had taken.", name: 'Claire M.', detail: 'Maternity session · Papworth Everard Studio' },
              { quote: "We did both maternity and newborn with Something Blue. Having the same photographer for both made everything feel connected. The two sets of images together are something really special.", name: 'Amy & Rob', detail: 'Maternity & Newborn · Waterbeach Studio' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: 'rgba(168,202,236,0.2)', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.75)', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(168,202,236,0.15)' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8DDB5', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', marginTop: '0.2rem' }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="m-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Investment</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Maternity packages</h2>
          </div>
          <div className="m-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              { name: 'Studio Session', price: 'From £245', includes: ['90 minute session', 'Studio in Papworth or Waterbeach', 'Solo or with partner', 'Online gallery', '25+ edited images', 'Print release'], highlight: false },
              { name: 'Extended Studio', price: 'From £345', includes: ['2 hour session', 'Multiple setups & outfits', 'Partner & family included', 'Online gallery', '40+ edited images', 'Print release', 'Styling guide'], highlight: true },
              { name: 'Outdoor Session', price: 'From £295', includes: ['90 minute session', 'Location of your choice', 'Golden hour preferred', 'Online gallery', '30+ edited images', 'Print release'], highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.highlight ? '#1B3A5C' : '#FAF8F2', border: pkg.highlight ? 'none' : '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.3rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.highlight ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>{pkg.price}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.8rem' }}>
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
          <div style={{ padding: '1.5rem 2rem', backgroundColor: '#E8DDB5', borderLeft: '3px solid #1B3A5C' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>Combined maternity & newborn packages available</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65 }}>
              Book both sessions together and save. Many families choose to document the whole journey — from pregnancy through to those first precious days. Ask us about combined pricing when you enquire.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="m-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div className="m-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Maternity FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: 'When is the best time to book?', a: "We recommend booking between 20–28 weeks to secure your preferred date and give us time to plan properly. Sessions themselves work best at 28–36 weeks." },
              { q: 'What should I wear?', a: "We send all clients a full styling guide when they book. In general: flowing fabrics, neutral tones, and anything that makes you feel confident and comfortable. Many clients choose to hire maternity gowns for studio sessions — we can recommend suppliers." },
              { q: 'Can my partner and children be included?', a: "Absolutely. We always recommend including your partner if you have one — couple portraits during pregnancy are beautiful and often under-appreciated. Children can be included for part of the session if they are old enough to cooperate briefly." },
              { q: 'Studio or outdoor — which do you recommend?', a: "Both produce stunning results. Studio gives you more control and is weather-proof. Outdoor has a natural, seasonal feel that many clients love. If you're unsure, we're happy to discuss what would suit you best." },
              { q: 'Do you offer maternity and newborn together?', a: "Yes — and we recommend it. Booking both together saves money, and having the same photographer for both sessions creates a beautifully consistent set of images from this whole chapter of your family's life." },
              { q: 'How will I receive my images?', a: "Via a private online gallery, usually within 3 weeks. From there you can download your files, share with family, and order prints directly if you wish. We're also happy to guide you through print options." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWBORN CROSSLINK ─── */}
      <section className="m-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '16/7', backgroundColor: '#4a3830', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>newborn-hero.jpg</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>What comes next</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.8rem' }}>Newborn Photography</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Once your baby arrives, we&apos;re here for that too. Gentle, unhurried newborn sessions in our warm studios — ideally within the first two weeks. Book both together and save.
            </p>
            <Link href="/newborn" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8DDB5', textDecoration: 'none', borderBottom: '1px solid rgba(232,221,181,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              See newborn photography →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="m-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Book your session</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s document this chapter
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us how many weeks you are, your preferred studio or outdoor, and whether you&apos;d like to include a partner or children. We&apos;ll come back to you quickly.
          </p>
          <div className="m-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire now
            </Link>
            <Link href="/newborn-maternity/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See maternity portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}