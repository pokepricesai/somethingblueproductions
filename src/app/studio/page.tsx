import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Photography Sessions Cambridge | Something Blue Productions",
  description: "Two warm, professional photography studios in Papworth Everard and Waterbeach. Newborn, family, maternity, headshots and brand photography — indoors, whatever the weather.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function StudioPage() {
  return (
    <>
      <style>{`
        .s-pad { padding: 3rem 1.5rem; }
        .s-hero-content { padding: 0 1.5rem 6rem; }
        .s-studios-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .s-sessions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .s-features-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .s-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .s-faqs { max-width: 100%; }
        .s-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .s-cta-buttons a { text-align: center; }
        .s-strip-header { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .s-pad { padding: 3.5rem 2.5rem; }
          .s-features-grid { grid-template-columns: 1fr 1fr; }
          .s-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .s-sessions-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .s-pad { padding: 4rem 4rem; }
          .s-hero-content { padding: 0 4rem 5rem; }
          .s-studios-grid { grid-template-columns: 1fr 1fr; }
          .s-features-grid { grid-template-columns: repeat(4, 1fr); }
          .s-faqs { max-width: 780px; margin: 0 auto; }
          .s-strip-header { flex-direction: row; align-items: flex-end; }
          .s-cta-buttons { flex-direction: row; justify-content: center; }
          .s-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#1b3a5c', minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>studio-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/studio-hero.jpg`} alt="Studio photography Cambridge" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="s-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Studio Photography · Cambridgeshire</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Two studios.{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>One county.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            Warm, professional studio spaces in Papworth Everard and Waterbeach. Newborn, family, maternity, headshots and brand photography — indoors, whatever the weather.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about a studio session →
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="s-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Why studio?</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
            A controlled indoor space changes what&apos;s possible. Beautiful light regardless of the weather. A warm, calm environment for newborns. Space to move freely for families. Privacy for headshots and brand work.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
            Both studios are set up with the same care and attention to detail. Whichever location works best for you, you&apos;ll find the same quality of light, warmth, and environment.
          </p>
        </div>
      </section>

      {/* TWO STUDIOS */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="s-studios-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { tag: 'Studio One', name: 'Papworth Everard', desc: 'Our main studio space in Cambridgeshire. Warm, airy, and set up for newborn, family and maternity sessions. Accessible from Cambridge, Huntingdon and the A14 corridor.', href: '/studio/papworth-everard', color: '#1b3a5c', img: 'studio-papworth-interior-01.jpg', features: ['Heated for newborn sessions', 'Natural and artificial lighting', 'Parking directly outside', 'Accessible from A14 and Cambridge', 'Props and backdrops provided'] },
            { tag: 'Studio Two', name: 'Waterbeach', desc: 'Minutes from Cambridge city centre and the A10. Perfect for families based in or around Cambridge, and for headshot and commercial sessions close to the city.', href: '/studio/waterbeach', color: '#162d4a', img: 'studio-waterbeach-interior-01.jpg', features: ['Minutes from Cambridge city centre', 'Natural and artificial lighting', 'Easy A10 access', 'Suitable for all session types', 'Props and backdrops provided'] },
          ].map((studio) => (
            <div key={studio.name} style={{ backgroundColor: '#0d1b2a', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4/3', backgroundColor: studio.color, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{studio.img}</span>
                </div>
                <img src={`${STORAGE}/${studio.img}`} alt={studio.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
              </div>
              <div style={{ padding: '2rem' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>{studio.tag}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.7rem' }}>{studio.name}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.75, marginBottom: '1.2rem' }}>{studio.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {studio.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A8CAEC', flexShrink: 0, display: 'inline-block' }} />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.55)' }}>{f}</p>
                    </div>
                  ))}
                </div>
                <Link href={studio.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  About this studio →
                </Link>
              </div>
            </div>
          ))}
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

      {/* SESSION TYPES */}
      <section className="s-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What we offer</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Studio session types</h2>
          </div>
          <div className="s-sessions-grid">
            {[
              { title: 'Newborn', desc: 'Baby-led sessions in our warm, calm studio. The most popular use of our studio spaces.', href: '/newborn', color: '#c8b8a0', img: 'studio-session-newborn.jpg' },
              { title: 'Family', desc: 'Indoor family sessions with beautiful controlled light. Great for winter and younger children.', href: '/families', color: '#a0b0a0', img: 'studio-session-family.jpg' },
              { title: 'Maternity', desc: 'Elegant maternity portraits. Studio light flatters beautifully and sessions are private and comfortable.', href: '/maternity', color: '#b0a8b8', img: 'studio-session-maternity.jpg' },
              { title: 'Headshots', desc: 'Professional headshots for individuals and teams. Clean, modern results in a relaxed environment.', href: '/commercial/headshots', color: '#a8b8c8', img: 'studio-session-headshots.jpg' },
              { title: 'Brand & Small Business', desc: 'Product, brand and business photography. Consistent, commercial-quality results.', href: '/commercial/brand', color: '#b8a898', img: 'studio-session-brand.jpg' },
              { title: 'Mini Sessions', desc: 'Shorter, seasonal sessions at a reduced rate. Perfect for quick updates or gifts.', href: '/enquire', color: '#c0b8a8', img: 'studio-session-mini.jpg' },
            ].map((session) => (
              <Link key={session.title} href={session.href} className="zoom-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ aspectRatio: '3/2', backgroundColor: session.color, marginBottom: '1rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{session.img}</span>
                  </div>
                  <img src={`${STORAGE}/${session.img}`} alt={session.title} className="zoom-img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                </div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.4rem' }}>{session.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65 }}>{session.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="s-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>From the studios</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Studio work</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all studio work</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '180px', aspect: '3/4', color: '#c8b0a0', img: 'studio-portfolio-01.jpg' },
            { w: '280px', aspect: '4/3', color: '#a8b8c8', img: 'studio-portfolio-02.jpg' },
            { w: '180px', aspect: '3/4', color: '#b0a8b8', img: 'studio-portfolio-03.jpg' },
            { w: '280px', aspect: '4/3', color: '#c0b8a8', img: 'studio-portfolio-04.jpg' },
            { w: '180px', aspect: '3/4', color: '#a0b0a0', img: 'studio-portfolio-05.jpg' },
            { w: '280px', aspect: '4/3', color: '#b8a898', img: 'studio-portfolio-06.jpg' },
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

      {/* FEATURES */}
      <section className="s-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Studio features</h2>
          </div>
          <div className="s-features-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Heated throughout', desc: "Both studios are kept warm — especially important for newborn sessions. You'll be comfortable from the moment you arrive." },
              { title: 'Natural & studio lighting', desc: "We have both large windows for soft natural light and professional studio lighting for complete control in any conditions." },
              { title: 'Props & backdrops', desc: "A full range of props, wraps, backdrops and accessories are provided. You don't need to bring anything beyond yourselves." },
              { title: 'Private & relaxed', desc: "Both studios are private spaces. No other clients, no rushing between bookings. Your session is yours from start to finish." },
            ].map((item) => (
              <div key={item.title} style={{ padding: '2rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)' }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#A8CAEC', marginBottom: '1.2rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="s-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>From studio clients</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>What they said</h2>
          </div>
          <div className="s-testimonials-grid">
            {[
              { quote: "My daughter was six days old. I was nervous about the whole thing. The studio was so calm and the session felt gentle from start to finish. The images are extraordinary.", name: 'Emily R.', detail: 'Newborn session · Papworth Everard Studio' },
              { quote: "We used the Waterbeach studio for our family session in January. The light was beautiful, the kids were warm and comfortable, and we got photos I'll have on the wall forever.", name: 'Dan & Sophie', detail: 'Family session · Waterbeach Studio' },
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

      {/* FAQs */}
      <section className="s-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div className="s-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Studio FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: 'Which studio should I choose?', a: "Choose whichever is most convenient for you — both offer the same quality and environment. Papworth Everard is better for those coming from Huntingdon or the A14. Waterbeach is closer to Cambridge city centre and the A10." },
              { q: 'Is there parking?', a: "Yes — both studios have parking directly outside or very nearby. No need to worry about town centre parking." },
              { q: 'What should we bring?', a: "Just yourselves. All props, wraps, backdrops and accessories are provided. For newborn sessions, bring whatever you need for feeding and nappy changes. We have everything else." },
              { q: 'How warm are the studios?', a: "Both studios are kept warm throughout — especially important for newborn sessions. Babies are comfortable from arrival to departure." },
              { q: 'Can I visit the studio before booking?', a: "Yes — we can arrange a quick visit if you'd like to see the space before committing. Just mention it when you enquire." },
              { q: 'Are the studios suitable for commercial work?', a: "Yes. Both studios are suitable for headshots, product photography, and small brand shoots. For larger commercial productions, get in touch and we'll discuss what works best." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="s-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Book a studio session</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready to book your studio session?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what type of session you&apos;re looking for and which studio location works best for you. We&apos;ll come back to you quickly with availability.
          </p>
          <div className="s-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire now</Link>
            <Link href="/studio/papworth-everard" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>View Papworth studio</Link>
          </div>
        </div>
      </section>
    </>
  );
}