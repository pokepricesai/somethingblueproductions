import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Something Blue Productions · Cambridge Wedding & Family Photographer",
  description: "Something Blue Productions is a photography and video studio based in Cambridgeshire. We shoot weddings, families, newborn and maternity — honestly, and without fuss.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Something Blue Productions",
    description: "Photography and video studio based in Cambridgeshire — Samantha and Luke.",
    url: "https://something-blue-productions.com/about",
    type: "profile",
  },
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function AboutPage() {
  return (
    <>
      <style>{`
        .a-pad { padding: 3rem 1.5rem; }
        .a-hero-content { padding: 8rem 1.5rem 4rem; }
        .a-intro-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .a-values-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .a-bts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .a-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .a-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .a-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .a-pad { padding: 3.5rem 2.5rem; }
          .a-hero-content { padding: 10rem 2.5rem 5rem; }
          .a-values-grid { grid-template-columns: 1fr 1fr; }
          .a-bts-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 900px) {
          .a-pad { padding: 4rem 4rem; }
          .a-hero-content { padding: 10rem 4rem 5rem; }
          .a-intro-grid { grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
          .a-values-grid { grid-template-columns: repeat(4, 1fr); }
          .a-services-grid { grid-template-columns: repeat(4, 1fr); }
          .a-cta-buttons { flex-direction: row; justify-content: center; }
          .a-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>about-hero.jpg</span>
        </div>
        <Image src={`${STORAGE}/about-hero.jpg`} alt="Something Blue Productions Cambridge photographer" fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.4 }} />
        <div className="a-hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>About Something Blue</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.5rem' }}>
            Photography and video for the moments that{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>matter most.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.6)', maxWidth: '500px' }}>
            Something Blue Productions is a photography and video studio based in Cambridgeshire. We shoot weddings, families, newborn and maternity — and selected commercial work for local businesses and performers.
          </p>
        </div>
      </section>

      {/* ── MAIN INTRO ── */}
      <section className="a-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="a-intro-grid">

            {/* Photos */}
            <div>
              <div style={{ aspectRatio: '3/4', backgroundColor: '#4a6070', overflow: 'hidden', position: 'relative', marginBottom: '2px' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>about-samantha.jpg</span>
                </div>
                <Image src={`${STORAGE}/about-samantha.jpg`} alt="Samantha Clark, photographer at Something Blue Productions" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', zIndex: 1 }} />
              </div>
              <div style={{ aspectRatio: '16/9', backgroundColor: '#3a5060', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>about-behind-scenes-01.jpg</span>
                </div>
                <Image src={`${STORAGE}/about-behind-scenes-01.jpg`} alt="Behind the scenes of a Something Blue photography session" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', zIndex: 1 }} />
              </div>
            </div>

            {/* Text */}
            <div style={{ paddingTop: '0.5rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Who we are</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)' }}>Samantha &amp; Luke.</span>
              </h2>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
                Photographer and videographer. Partners behind the lens and in life.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1.2rem' }}>
                Samantha is the founder and photographer behind Something Blue Productions. Before photography, she spent years in the performing arts — on stage and behind it. That background shapes everything about how she works: the patience to wait for a moment rather than force it, the instinct for what&apos;s about to happen, and a genuine ease with people who feel awkward in front of a camera.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1.2rem' }}>
                She moved into photography in 2020 and founded Something Blue Productions shortly after. She&apos;s a mother of two — which means she&apos;s spent a lot of time in exactly the kind of glorious chaos that a family session involves, and she wouldn&apos;t have it any other way.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1.2rem' }}>
                Luke is a professional videographer and Samantha&apos;s partner. For weddings and larger projects requiring both photography and film, they work as a coordinated team — two people who actually know how to work together, not two photographers doing their own thing.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                Between them, they cover everything: weddings, newborns, families, maternity, commercial. The performing arts background also makes Samantha particularly well-suited to performance photography and creative headshots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="a-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How we work</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>What matters to us</h2>
          </div>
          <div className="a-values-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Honesty over performance', desc: "We don't manufacture emotion or engineer moments. We look for what's already there — and there's always something there." },
              { title: 'Unhurried work', desc: "We never rush a session. If something needs more time, we take more time. The images are worth it and you deserve the space." },
              { title: 'Real communication', desc: "We reply quickly, we're direct about what we can and can't do, and we make sure there are no surprises. Before or after." },
              { title: 'Work that lasts', desc: "We edit for longevity — not for trends. The images we make should look as good in twenty years as they do today." },
            ].map((v) => (
              <div key={v.title} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1.2rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.92rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.7rem' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEHIND THE SCENES ── */}
      <section className="a-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Behind the lens</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>On location and in studio</h2>
          </div>
          <div className="a-bts-grid" style={{ marginBottom: '2rem' }}>
            {[
              { img: 'about-behind-scenes-01.jpg', color: '#4a6070' },
              { img: 'about-behind-scenes-02.jpg', color: '#3a5060' },
              { img: 'about-behind-scenes-03.jpg', color: '#506070' },
            ].map((item, i) => (
              <div key={i} style={{ aspectRatio: '4/3', backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.img}</span>
                </div>
                <Image src={`${STORAGE}/${item.img}`} alt={`Behind the scenes ${i + 1} — Something Blue Productions`} fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectFit: 'cover', zIndex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIOS ── */}
      <section className="a-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Our spaces</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Two studios in Cambridgeshire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }}>
            {[
              { name: 'Papworth Everard Studio', location: 'Cambridgeshire · CB23', desc: 'Our main studio space. Warm, airy, and accessible from Cambridge, Huntingdon and the A14. The go-to for newborn, family and maternity sessions — and bookable online from £99.', href: '/studio/papworth-everard' },
              { name: 'Waterbeach Studio', location: 'Near Cambridge · CB25', desc: 'Minutes from Cambridge city centre via the A10. Perfect for Cambridge-based families, professionals needing headshots, and local brand work.', href: '/studio/waterbeach' },
            ].map((studio) => (
              <div key={studio.name} style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>{studio.name}</h3>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC' }}>{studio.location}</p>
                  </div>
                  <Link href={studio.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid rgba(158,146,130,0.3)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
                    View studio →
                  </Link>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.75 }}>{studio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Pricing</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Studio sessions from £99 · Bespoke packages from £250
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              All images included — no per-image charges. Ever.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See all packages →
            </Link>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
              Book a studio session →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT WE SHOOT ── */}
      <section className="a-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What we do</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Our services</h2>
          </div>
          <div className="a-services-grid" style={{ gap: '2px' }}>
            {[
              { title: 'Weddings', sub: 'Photography & videography', href: '/weddings', color: '#5c3d30' },
              { title: 'Families', sub: 'Natural lifestyle sessions', href: '/families', color: '#3a4828' },
              { title: 'Newborn', sub: 'Gentle studio sessions', href: '/newborn', color: '#4a3830' },
              { title: 'Maternity', sub: 'Studio & outdoor', href: '/maternity', color: '#4a3c50' },
              { title: 'Studio Sessions', sub: 'Papworth & Waterbeach', href: '/studio', color: '#1b3a5c' },
              { title: 'Commercial', sub: 'Brand, headshots & performance', href: '/commercial', color: '#2c2820' },
              { title: 'Packages & Pricing', sub: 'See what\'s included', href: '/packages', color: '#3a3020' },
              { title: 'Enquire', sub: 'Get in touch', href: '/enquire', color: '#1B3A5C' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: s.color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.2rem', textDecoration: 'none', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#ffffff', textTransform: 'none', marginBottom: '0.2rem' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)' }}>{s.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="a-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: '#DDD5C0', lineHeight: 0.8, display: 'block', marginBottom: '1.5rem' }}>&ldquo;</span>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: 1.85, color: '#2C2820', fontStyle: 'italic', marginBottom: '2rem' }}>
            Completely unobtrusive on the day — we genuinely forgot there was a photographer there. The results are beyond anything we hoped for. We&apos;ve recommended Something Blue to everyone who&apos;s asked.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>Priya &amp; James</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282' }}>Wedding · Ely</p>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>
              See our portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="a-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Work with us</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready to get in touch?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you&apos;re looking for. We read every message personally and come back to you within 24 hours — usually much sooner.
          </p>
          <div className="a-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Get in touch</Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>See the work first</Link>
          </div>
        </div>
      </section>
    </>
  );
}