import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newborn Photography Cambridge & Cambridgeshire | Something Blue Productions",
  description: "Gentle, unhurried newborn photography at our studios in Papworth Everard and Waterbeach, or in your home. Baby-led sessions in a calm, warm environment.",
};

export default function NewbornPage() {
  return (
    <>
      <style>{`
        .n-pad { padding: 3rem 1.5rem; }
        .n-hero-content { padding: 0 1.5rem 6rem; }
        .n-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .n-options-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .n-gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .n-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .n-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .n-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .n-faqs { max-width: 100%; }
        .n-strip-header { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .n-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .n-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .n-pad { padding: 3.5rem 2.5rem; }
          .n-options-grid { grid-template-columns: 1fr 1fr; }
          .n-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .n-packages-grid { grid-template-columns: 1fr 1fr; }
          .n-gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 900px) {
          .n-pad { padding: 4rem 4rem; }
          .n-hero-content { padding: 0 4rem 5rem; }
          .n-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .n-options-grid { grid-template-columns: repeat(3, 1fr); }
          .n-gallery-grid { grid-template-columns: repeat(6, 1fr); }
          .n-process-grid { grid-template-columns: repeat(4, 1fr); }
          .n-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .n-packages-grid { grid-template-columns: repeat(3, 1fr); }
          .n-faqs { max-width: 780px; margin: 0 auto; }
          .n-strip-header { flex-direction: row; align-items: flex-end; }
          .n-cta-buttons { flex-direction: row; justify-content: center; }
          .n-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#4a3830', minHeight: '90svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.65) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#4a3830', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.15)', textAlign: 'center' }}>newborn-hero.jpg</span>
        </div>
        <div className="n-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>
            Newborn Photography · Cambridgeshire
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            The very{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>first days.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Gentle, unhurried newborn sessions in our warm studios or in your home. Baby-led, calm, and completely at your pace. No rushing, no rigid poses — just your new family, documented with care.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about a newborn session →
          </Link>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="n-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="n-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
                Newborn sessions are completely baby-led. We don&apos;t work to a rigid timeline — we work to your baby&apos;s. If they need feeding, we stop. If they need settling, we wait. There is no rush.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
                Sessions are kept warm and calm throughout. Our studios are heated to a comfortable temperature for newborns and we keep noise and disruption to a minimum. Most sessions run 2–3 hours, but we never clock-watch.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                We also capture parent and sibling portraits during every session — these are often the images families treasure most.
              </p>
            </div>
            <div style={{ aspectRatio: '3/4', backgroundColor: '#c8b8a0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', textAlign: 'center' }}>newborn-gallery-01.jpg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="n-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { title: 'Baby-led timing', desc: 'Sessions follow your baby\'s lead entirely. Feeds, nappy changes, settling — all built in naturally.' },
              { title: 'Heated studios', desc: 'Both studios are kept warm throughout. Your baby will be comfortable from the moment you arrive.' },
              { title: 'Best within 14 days', desc: 'Newborn sessions work best in the first two weeks. We recommend booking during pregnancy to secure your date.' },
              { title: 'No rigid poses', desc: 'We create natural, gentle images. Nothing forced, nothing uncomfortable. Safety is always our first priority.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SESSION OPTIONS ─── */}
      <section className="n-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Where we shoot</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Session options</h2>
          </div>
          <div className="n-options-grid" style={{ marginBottom: '1rem' }}>
            {[
              {
                title: 'Papworth Everard Studio',
                sub: 'Cambridgeshire · CB23',
                desc: 'Our warm, airy studio space near Cambridge. Accessible from Huntingdon, the A14 corridor, and Cambridge city. The most popular option for newborn sessions.',
                href: '/studio/papworth-everard',
                color: '#1b3a5c',
              },
              {
                title: 'Waterbeach Studio',
                sub: 'Near Cambridge · CB25',
                desc: 'Minutes from Cambridge city centre. Ideal for families based in Cambridge or the A10 corridor. Same warm, calm environment as our Papworth studio.',
                href: '/studio/waterbeach',
                color: '#162d4a',
              },
              {
                title: 'Your Home',
                sub: 'Cambridgeshire & surrounding areas',
                desc: 'Prefer to stay at home? We can come to you. Home sessions have a beautiful natural feel — your own light, your own surroundings. Available within Cambridgeshire.',
                href: '/enquire',
                color: '#4a3830',
              },
            ].map((opt) => (
              <Link key={opt.href} href={opt.href} style={{ position: 'relative', display: 'block', aspectRatio: '4/3', backgroundColor: opt.color, overflow: 'hidden', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.7)', marginBottom: '0.3rem' }}>{opt.sub}</p>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.6rem' }}>{opt.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.65, marginBottom: '0.8rem' }}>{opt.desc}</p>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '16px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />
                    Find out more
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="n-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Recent sessions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Newborn work</h2>
          </div>
          <Link href="/newborn-maternity/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all newborn sessions</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '180px', aspect: '3/4', color: '#c8b0a0', label: 'newborn-gallery-01.jpg' },
            { w: '180px', aspect: '3/4', color: '#b8a898', label: 'newborn-gallery-02.jpg' },
            { w: '280px', aspect: '4/3', color: '#d0c0b0', label: 'newborn-gallery-03.jpg' },
            { w: '180px', aspect: '3/4', color: '#c0b0a8', label: 'newborn-gallery-04.jpg' },
            { w: '280px', aspect: '4/3', color: '#b8c0b8', label: 'newborn-gallery-05.jpg' },
            { w: '180px', aspect: '3/4', color: '#c8b8b0', label: 'newborn-gallery-06.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(74,56,48,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="n-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>On the day</h2>
          </div>
          <div className="n-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Arrive and settle', desc: "Come when your baby is fed and sleepy if possible, but don't stress if the timing isn't perfect. We have everything you need and we're in no rush." },
              { num: '02', title: 'Baby portraits', desc: "We capture your baby wrapped, in props, and in natural positions. Nothing forced — we follow what your baby is comfortable with throughout." },
              { num: '03', title: 'Family portraits', desc: "Once we have the baby portraits, we bring you in for family images. Parent and baby, siblings, the whole family together — these are always our most requested." },
              { num: '04', title: 'Your gallery', desc: "Delivered within 3 weeks. A curated set of edited images including baby portraits, detail shots, and family images — all ready to print and share." },
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

      {/* ─── TESTIMONIALS ─── */}
      <section className="n-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>From new parents</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>What they said</h2>
          </div>
          <div className="n-testimonials-grid">
            {[
              { quote: "My daughter was six days old. I was nervous about the whole thing. The studio was so calm and the whole session felt gentle from start to finish. The images are extraordinary.", name: 'Emily R.', detail: 'Newborn session · Papworth Everard Studio' },
              { quote: "We were exhausted new parents and I genuinely wasn't sure we'd manage it. But the whole thing was so easy — no pressure, no rushing, just a lovely couple of hours. The photos made me cry.", name: 'Hannah & Will', detail: 'Newborn session · Waterbeach Studio' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: '#DDD5C0', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', marginTop: '0.2rem' }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="n-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Investment</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Newborn packages</h2>
          </div>
          <div className="n-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              { name: 'Studio Session', price: 'From £295', includes: ['2–3 hour session', 'Studio in Papworth or Waterbeach', 'Baby portraits', 'Parent & baby portraits', 'Online gallery', '30+ edited images', 'Print release'], highlight: false },
              { name: 'Studio + Siblings', price: 'From £345', includes: ['2–3 hour session', 'Baby portraits', 'Sibling introduction portraits', 'Family portraits', 'Online gallery', '40+ edited images', 'Print release'], highlight: true },
              { name: 'Home Session', price: 'From £345', includes: ['2–3 hour session', 'In your home', 'Baby portraits', 'Family portraits', 'Natural lifestyle feel', 'Online gallery', '35+ edited images'], highlight: false },
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
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', textAlign: 'center' }}>
            We recommend booking during pregnancy to secure your preferred date. We hold provisional dates and confirm once baby arrives.
          </p>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="n-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="n-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Newborn photography FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: 'When should we book?', a: "During pregnancy, ideally around 20–30 weeks. We provisionally hold your date and confirm the actual session time once your baby arrives. This ensures you get the best timing — ideally within the first two weeks." },
              { q: 'What is the best age for newborn photos?', a: "The first 5–14 days are ideal. Babies sleep more deeply at this age which makes the session calmer. That said, we have photographed babies up to 4 weeks with beautiful results — it's always worth getting in touch." },
              { q: 'How long does a session take?', a: "Allow 2–3 hours. There's no fixed end time — we work at your baby's pace. Feeds, nappy changes, and settling time are all built in naturally." },
              { q: 'Is it safe?', a: "Safety is our absolute first priority. We never place babies in positions they're not comfortable with. All posing is gentle, natural, and checked throughout. We have experience with babies of all sizes and temperaments." },
              { q: 'What should we bring?', a: "Just yourselves and your baby. We provide all props, wraps, and accessories. If you have a special item you'd like to include — a toy, a blanket, a letter — you're very welcome to bring it." },
              { q: 'Can siblings be included?', a: "Absolutely — and we recommend it. Sibling introduction portraits are some of the most treasured images from a newborn session. We allocate time for these in all our packages." },
              { q: 'Do you offer combined newborn and maternity packages?', a: "Yes. Booking both together saves money and means we already know you before your baby arrives. Ask about our combined packages when you enquire." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MATERNITY CROSSLINK ─── */}
      <section className="n-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ aspectRatio: '16/7', backgroundColor: '#4a3830', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>maternity-hero.jpg</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Also available</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.8rem' }}>Maternity Photography</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Many families choose to document the pregnancy too. Maternity and newborn sessions booked together save money and create a beautiful full story of this chapter.
            </p>
            <Link href="/maternity" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8DDB5', textDecoration: 'none', borderBottom: '1px solid rgba(232,221,181,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              See maternity photography →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="n-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Book your session</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Ready to secure your date?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            We recommend booking during pregnancy. Send us a message with your due date and preferred studio location and we&apos;ll provisionally hold a date for you.
          </p>
          <div className="n-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire now
            </Link>
            <Link href="/newborn-maternity/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See newborn portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}