import Link from "next/link";
import Image from "next/image";

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

function Img({ src, alt, zoom = false, priority = false }: { src: string; alt: string; zoom?: boolean; priority?: boolean }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
        <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '0 1rem' }}>{src.split('/').pop()}</span>
      </div>
      <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className={zoom ? 'zoom-img' : undefined} style={{ objectFit: 'cover', zIndex: 1 }} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        .home-section-pad { padding: 3rem 1.5rem; }
        .home-brand-statement { font-size: clamp(1rem, 1.5vw, 1.2rem); }
        .home-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .home-service-card { aspect-ratio: 3/4; }
        .home-studios-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .home-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .home-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .home-journal-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .home-hero-content { padding: 0 1.5rem 6rem; }
        .home-commercial-strip { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        .home-commercial-label { display: none; }
        .home-studios-header { flex-direction: column; gap: 0.5rem; }
        .home-studios-subtitle { display: none; }
        .home-cta-buttons { flex-direction: column; }
        .home-cta-buttons a { text-align: center; }
        .home-portfolio-header { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .home-about-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
        .home-gifts-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; }
        .zoom-card:hover .zoom-img { transform: scale(1.025) !important; }

        .mobile-float {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          display: flex; gap: 1px;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.18);
        }
        .mobile-float a {
          flex: 1; padding: 1rem 0.5rem; text-align: center;
          font-family: 'Carose', sans-serif; font-size: 0.6rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; display: block;
        }
        .mobile-float-book { background: #1B3A5C; color: #E8DDB5; }
        .mobile-float-gift { background: #A8CAEC; color: #0d1b2a; }
        .mobile-float-enquire { background: #E8DDB5; color: #1B3A5C; }

        @media (min-width: 640px) {
          .home-section-pad { padding: 3.5rem 2.5rem; }
          .home-process-grid { grid-template-columns: 1fr 1fr; }
          .home-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .mobile-float { display: none; }
        }
        @media (min-width: 900px) {
          .home-section-pad { padding: 4rem 4rem; }
          .home-services-grid { grid-template-columns: repeat(4, 1fr); }
          .home-service-card { aspect-ratio: 2/3; }
          .home-studios-grid { grid-template-columns: 1fr 1fr; }
          .home-testimonials-grid { grid-template-columns: repeat(3, 1fr); }
          .home-process-grid { grid-template-columns: repeat(4, 1fr); }
          .home-journal-grid { grid-template-columns: repeat(3, 1fr); }
          .home-hero-content { padding: 0 4rem 5rem; }
          .home-commercial-strip { flex-direction: row; align-items: center; gap: 2rem; }
          .home-commercial-label { display: block; }
          .home-studios-header { flex-direction: row; gap: 2rem; }
          .home-studios-subtitle { display: block; }
          .home-cta-buttons { flex-direction: row; }
          .home-cta-buttons a { text-align: left; }
          .home-portfolio-header { flex-direction: row; align-items: flex-end; }
          .home-about-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
          .home-gifts-grid { grid-template-columns: 1fr 1fr; }
          .mobile-float { display: none; }
        }
      `}</style>

      {/* ── FLOATING MOBILE CTA ── */}
      <div className="mobile-float">
        <Link href="/book" className="mobile-float-book">Book session</Link>
        <Link href="/book" className="mobile-float-gift">Gift voucher</Link>
        <Link href="/enquire" className="mobile-float-enquire">Enquire</Link>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#0d1b2a', minHeight: '100svh' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, backgroundImage: 'linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.75) 100%)' }} />
        <Img src={`${STORAGE}/hero-main.jpg`} alt="Something Blue Productions — wedding and family photography Cambridge" priority />
        <div className="home-hero-content" style={{ position: 'relative', zIndex: 3 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Photography &amp; Video · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '0.02em', color: '#ffffff', marginBottom: '1.2rem', maxWidth: '700px', textTransform: 'none' }}>
            Made to be{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>remembered.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.7)', marginBottom: '2rem', maxWidth: '400px' }}>
            Wedding and family photography rooted in Cambridgeshire. Quiet, honest work from two studio spaces.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', border: '1px solid rgba(245,240,232,0.35)', padding: '0.85rem 2rem', display: 'inline-block' }}>
              See the work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p className="home-brand-statement" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, lineHeight: 1.9, color: '#2C2820', letterSpacing: '0.04em', textTransform: 'none' }}>
            Something Blue is a photography and video studio based between{' '}
            <span style={{ color: '#1B3A5C' }}>Cambridge</span> and Waterbeach.
            We shoot weddings, families, and the quieter moments — honestly, and without fuss.
          </p>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#DDD5C0', margin: '2rem auto 0' }} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="home-services-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { label: 'Photography & Video', title: 'Weddings', href: '/weddings', color: '#5c3d30', img: 'services-weddings.jpg' },
            { label: 'Natural & Lifestyle', title: 'Families', href: '/families', color: '#3a4828', img: 'services-families.jpg' },
            { label: 'Newborn & Maternity', title: 'Early Days', href: '/newborn', color: '#4a3830', img: 'services-newborn.jpg' },
            { label: 'Papworth & Waterbeach', title: 'Studio Sessions', href: '/studio', color: '#1b3a5c', img: 'services-studio.jpg' },
          ].map((service) => (
            <Link key={service.href} href={service.href} className="home-service-card zoom-card" style={{ position: 'relative', display: 'block', backgroundColor: service.color, textDecoration: 'none' }}>
              <Img src={`${STORAGE}/${service.img}`} alt={`${service.title} photography Cambridgeshire`} zoom />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.3rem' }}>{service.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '0.6rem', textTransform: 'none' }}>{service.title}</h2>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '14px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/commercial" className="home-commercial-strip" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1400px', margin: '2px auto 0', backgroundColor: '#2C2820', padding: '1.4rem 1.5rem', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="home-commercial-label" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', whiteSpace: 'nowrap' }}>Also available</span>
            <div>
              <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', letterSpacing: '0.05em', textTransform: 'none' }}>Commercial Photography</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', marginTop: '0.2rem' }}>Brand, performance &amp; small business · Cambridgeshire and beyond</p>
            </div>
          </div>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.2rem', color: '#9E9282', alignSelf: 'center' }}>→</span>
        </Link>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="home-about-grid">
            <div style={{ aspectRatio: '4/3', backgroundColor: '#1b3a5c', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>about-samantha-luke.jpg</span>
              </div>
              <Image src={`${STORAGE}/about-samantha-luke.jpg`} alt="Samantha and Luke — Something Blue Productions" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', zIndex: 1 }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Behind the camera</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                Something Blue is Samantha and Luke — a photographer and videographer based in Cambridgeshire.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1.8rem' }}>
                Samantha shoots photography across weddings, families, newborn and maternity. Luke covers videography and commercial work. Together they run two studio spaces — one bookable online from £99, one available for larger projects.
              </p>
              <Link href="/about" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>
                Meet Samantha &amp; Luke →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO BOOKING CTA ── */}
      <section style={{ backgroundColor: '#1B3A5C' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.75rem' }}>Book instantly online</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Studio sessions from <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>£99.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(232,221,181,0.55)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '420px' }}>
            Couple, maternity, newborn, family and headshot sessions at our Papworth Everard studio. All images included — we never charge per image. Pick your date and pay securely online.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.9rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session →
            </Link>
            <Link href="/studio/papworth-everard" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(232,221,181,0.25)', color: 'rgba(232,221,181,0.6)', padding: '0.9rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              About the studio
            </Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(168,202,236,0.1)', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { label: 'Studio Session', desc: '30 min · 1–2 people · 5–10 images', price: '£99' },
            { label: 'Family Session', desc: '60 min · 3+ people · 10–20 images', price: '£199' },
            { label: 'Gift Vouchers', desc: 'Perfect for birthdays, baby showers & Christmas', price: 'From £99' },
          ].map((s, i) => (
            <Link key={i} href="/book" style={{ flex: '1', minWidth: '200px', padding: '1.5rem 2rem', borderRight: '1px solid rgba(168,202,236,0.08)', textDecoration: 'none', display: 'block' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.7rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>{s.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(232,221,181,0.4)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{s.desc}</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#A8CAEC', fontWeight: 300 }}>{s.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── GIFT VOUCHERS ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="home-gifts-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>The perfect gift</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem', lineHeight: 1.2 }}>
                Give the gift of a{' '}
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>session.</span>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '480px' }}>
                Gift vouchers for birthdays, baby showers, engagements, weddings or Christmas. The recipient chooses their own date and time — valid for 12 months. All images included, no per-image charges.
              </p>
              <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.9rem 2rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
                Buy a gift voucher →
              </Link>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Birthday', 'Baby Shower', 'Engagement', 'Wedding gift', 'Christmas', "Mother's Day", 'Just Because'].map(o => (
                  <span key={o} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.5)', border: '1px solid rgba(168,202,236,0.15)', padding: '0.25rem 0.6rem' }}>{o}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.1)', padding: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1.5rem' }}>What&apos;s included</p>
              {[
                { title: 'Studio Session', desc: '30 min · 1–2 people · 5–10 images', price: '£99' },
                { title: 'Family Session', desc: '60 min · 3+ people · 10–20 images', price: '£199' },
              ].map(s => (
                <div key={s.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid rgba(168,202,236,0.08)' }}>
                  <div>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>{s.title}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.35)' }}>{s.desc}</p>
                  </div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.2rem', color: '#A8CAEC', fontWeight: 300 }}>{s.price}</p>
                </div>
              ))}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.3)', marginTop: '1rem', lineHeight: 1.7 }}>
                Vouchers are emailed instantly. Valid for 12 months. Recipient books their own date online — no chasing needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO STRIP ── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="home-portfolio-header" style={{ display: 'flex', marginBottom: '1.5rem', padding: '3rem 1.5rem 0' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Selected work</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>The portfolio</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px', alignSelf: 'flex-end' }}>View all work</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '180px', aspect: '2/3', color: '#8a6848', img: 'portfolio-strip-01.jpg', sizes: '180px' },
            { w: '280px', aspect: '3/2', color: '#a08870', img: 'portfolio-strip-02.jpg', sizes: '280px' },
            { w: '180px', aspect: '2/3', color: '#6a9090', img: 'portfolio-strip-03.jpg', sizes: '180px' },
            { w: '230px', aspect: '4/3', color: '#b0a090', img: 'portfolio-strip-04.jpg', sizes: '230px' },
            { w: '180px', aspect: '2/3', color: '#8090a0', img: 'portfolio-strip-05.jpg', sizes: '180px' },
            { w: '230px', aspect: '4/3', color: '#a09080', img: 'portfolio-strip-06.jpg', sizes: '230px' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
              <Image src={`${STORAGE}/${item.img}`} alt="Something Blue Productions portfolio" fill sizes={item.sizes} style={{ objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── STUDIOS ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="home-studios-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Two spaces, one county</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Our studios</h2>
            </div>
            <p className="home-studios-subtitle" style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.1rem', color: '#9E9282', maxWidth: '280px', lineHeight: 1.7 }}>
              A warm, controlled indoor space changes what&apos;s possible.
            </p>
          </div>
          <div className="home-studios-grid">
            {[
              { tag: 'Book online · From £99', name: 'Papworth Everard', desc: 'Our bookable studio for couple, maternity, newborn, family and headshot sessions. Choose your date and pay instantly online.', color: '#1b3a5c', img: 'studio-papworth-hero.jpg', cta: 'Book a session →', ctaHref: '/book' },
              { tag: 'Enquire · Larger projects', name: 'Waterbeach', desc: 'Available for extended shoots, multiple outfits, outdoor combinations, video and bespoke commercial projects. Please get in touch to discuss.', color: '#162d4a', img: 'studio-waterbeach-hero.jpg', cta: 'Enquire about Waterbeach →', ctaHref: '/enquire' },
            ].map((studio) => (
              <div key={studio.name} className="zoom-card" style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: studio.color }}>
                <Img src={`${STORAGE}/${studio.img}`} alt={`${studio.name} photography studio`} zoom />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.3) 60%, transparent 100%)', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.8rem', zIndex: 3 }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', display: 'block', marginBottom: '0.4rem' }}>{studio.tag}</span>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: '#E8DDB5', lineHeight: 1.2, marginBottom: '0.5rem', textTransform: 'none' }}>{studio.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.65, maxWidth: '300px', marginBottom: '1rem' }}>{studio.desc}</p>
                  <Link href={studio.ctaHref} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: studio.ctaHref === '/book' ? '#E8DDB5' : 'transparent', color: studio.ctaHref === '/book' ? '#0d1b2a' : 'rgba(232,221,181,0.6)', border: studio.ctaHref === '/book' ? 'none' : '1px solid rgba(232,221,181,0.25)', padding: '0.6rem 1.25rem', textDecoration: 'none', display: 'inline-block' }}>
                    {studio.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>From our clients</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Kind words</h2>
          </div>
          <div className="home-testimonials-grid">
            {[
              { quote: "We didn't want posed wedding photos and we couldn't be happier. Every single image feels like a real moment — not a performance.", name: 'Sarah & Tom', service: 'Wedding Photography · Cambridge' },
              { quote: "My daughter was six days old. The studio was so calm and the whole session felt gentle from start to finish. The images are extraordinary.", name: 'Emily R.', service: 'Newborn Session · Papworth Everard' },
              { quote: "Our kids are notoriously terrible in front of a camera. Two hours later we had photos I'll have on our walls for the rest of my life.", name: 'Jo & Marcus', service: 'Family Photography · Ely' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: '#DDD5C0', lineHeight: 0.8, display: 'block', marginBottom: '0.5rem' }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', marginTop: '0.2rem' }}>{t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Simple from start to finish</h2>
          </div>
          <div className="home-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Book or enquire', desc: 'Studio sessions can be booked and paid for online in minutes. For weddings, outdoor shoots or larger projects, send us a message.' },
              { num: '02', title: 'Short conversation', desc: "We'll talk through what you want and make sure everything feels right before anything is confirmed." },
              { num: '03', title: 'The session', desc: "Relaxed and led by you. Outdoors, in studio, at a venue — wherever feels right. No awkward direction." },
              { num: '04', title: 'Your gallery', desc: "Delivered within 3 weeks for studio sessions, 6 weeks for weddings. All images included — yours to download and keep." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#1B3A5C', color: '#E8DDB5', padding: '0.9rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a studio session →
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(44,40,32,0.2)', color: '#5c5550', padding: '0.9rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="home-portfolio-header" style={{ display: 'flex', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Notes &amp; guides</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>From the journal</h2>
            </div>
            <Link href="/journal" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px', alignSelf: 'flex-end' }}>Read all posts</Link>
          </div>
          <div className="home-journal-grid">
            {[
              { href: '/journal/what-to-expect-newborn-session', cat: 'Newborn', title: 'What to expect from your newborn photography session', excerpt: 'Everything you need to know before you come to the studio — timings, feeds, what to bring.', color: '#a08870', img: 'journal-hero-newborn-guide.jpg' },
              { href: '/journal/best-places-family-photos-cambridge', cat: 'Families · Cambridge', title: 'The best places for family photography around Cambridge', excerpt: 'From the Backs to Wicken Fen — our honest guide to outdoor locations across Cambridgeshire.', color: '#7a9878', img: 'journal-hero-cambridge-locations.jpg' },
              { href: '/journal/wedding-videography-worth-it', cat: 'Weddings', title: 'Is wedding videography worth it? Our honest answer', excerpt: "We're photographers and filmmakers. Here's what we actually think.", color: '#9088a8', img: 'journal-hero-wedding-video.jpg' },
            ].map((post) => (
              <Link key={post.href} href={post.href} className="zoom-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ aspectRatio: '3/2', backgroundColor: post.color, marginBottom: '1rem', position: 'relative' }}>
                  <Image src={`${STORAGE}/${post.img}`} alt={post.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="zoom-img" style={{ objectFit: 'cover', zIndex: 1 }} />
                </div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{post.cat}</p>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: '#2C2820', lineHeight: 1.4, marginBottom: '0.5rem', textTransform: 'none' }}>{post.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', lineHeight: 1.65 }}>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINTS ── */}
      <section style={{ backgroundColor: '#2C2820', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Prints &amp; framing</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>
              Put your images on the wall
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(232,221,181,0.4)', maxWidth: '480px', lineHeight: 1.65 }}>
              Professional lustre prints and premium framing, produced by hand at our home studio. Package deals available — prints, frames, and digital files together. Available to all Something Blue clients after their session.
            </p>
          </div>
          <Link href="/prints" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.7)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Find out more →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="home-section-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(27,58,92,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready when you are</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Book a session or send us a message
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Studio sessions from £99, bookable online. Gift vouchers available for any occasion. For weddings, outdoor shoots and larger projects — drop us a message.
          </p>
          <div className="home-cta-buttons" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session
            </Link>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#A8CAEC', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Buy a gift voucher
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}