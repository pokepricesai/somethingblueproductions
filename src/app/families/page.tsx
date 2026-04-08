import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family Photography Cambridge & Cambridgeshire | Something Blue Productions",
  description: "Natural, relaxed family photography across Cambridge and Cambridgeshire. Outdoor lifestyle sessions and studio shoots. No stiff poses — just your family as they really are.",
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function FamiliesPage() {
  return (
    <>
      <style>{`
        .f-pad { padding: 3rem 1.5rem; }
        .f-hero-content { padding: 0 1.5rem 6rem; }
        .f-split-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .f-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .f-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .f-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .f-locations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .f-faqs { max-width: 100%; }
        .f-strip-header { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .f-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .f-cta-buttons a { text-align: center; }
        .f-intro-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .f-location-link { padding: 1.2rem; background-color: #F5F0E8; text-decoration: none; display: block; border-bottom: 2px solid #DDD5C0; transition: border-color 0.2s; }
        .f-location-link:hover { border-bottom-color: #1B3A5C; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .f-pad { padding: 3.5rem 2.5rem; }
          .f-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .f-packages-grid { grid-template-columns: 1fr 1fr; }
          .f-split-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .f-pad { padding: 4rem 4rem; }
          .f-hero-content { padding: 0 4rem 5rem; }
          .f-process-grid { grid-template-columns: repeat(4, 1fr); }
          .f-testimonials-grid { grid-template-columns: repeat(3, 1fr); }
          .f-packages-grid { grid-template-columns: repeat(3, 1fr); }
          .f-faqs { max-width: 780px; margin: 0 auto; }
          .f-strip-header { flex-direction: row; align-items: flex-end; }
          .f-cta-buttons { flex-direction: row; justify-content: center; }
          .f-cta-buttons a { text-align: left; }
          .f-intro-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
          .f-locations-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#3a4828', minHeight: '90svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.65) 100%)', zIndex: 1 }} />
        <img src={`${STORAGE}/families-hero.jpg`} alt="Family photography Cambridgeshire" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="f-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Family Photography · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Your family,{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>as you really are.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Relaxed, natural family photography across Cambridgeshire. Outdoors in locations you love, or in our warm studio spaces. No awkward posing — just time together, beautifully documented.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>Book a studio session</Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', border: '1px solid rgba(245,240,232,0.35)', padding: '0.85rem 2rem', display: 'inline-block' }}>Enquire about outdoor →</Link>
          </div>
        </div>
      </section>

      {/* ── STUDIO BOOKING BAND ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Book instantly · Papworth Everard Studio</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>Family Session — £199 · 60 min · 15–20 images</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>All images included. No per-image charges. Choose your date and pay securely online. Also makes a wonderful birthday or anniversary gift.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a session →</Link>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Buy as a gift →</Link>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="f-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="f-intro-grid">
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
                Family sessions work best when everyone forgets there&apos;s a camera. We&apos;re not here to line you up and say cheese — we&apos;re here to spend a couple of hours with your family while you just get on with being yourselves.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
                Kids run, parents chase. Babies stare at leaves. Teenagers pretend they don&apos;t want to be there and then end up laughing. That&apos;s the stuff worth keeping — and it&apos;s what we look for.
              </p>
            </div>
            <div style={{ aspectRatio: '4/3', backgroundColor: '#a08870', overflow: 'hidden', position: 'relative' }}>
              <img src={`${STORAGE}/families-intro.jpg`} alt="Family outdoor session" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Pricing</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Studio from £199 · Bespoke outdoor & video packages from £250
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              See all family packages — including outdoor sessions, event coverage and combined photo & video.
            </p>
          </div>
          <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
            See all packages →
          </Link>
        </div>
      </section>

      {/* ── OUTDOOR / STUDIO SPLIT ── */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#F5F0E8' }}>
        <div className="f-split-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { color: '#3a4828', img: 'families-outdoor-card.jpg', label: 'Outdoors · Enquire', title: 'Outdoor Sessions', desc: 'Parks, meadows, riversides, woodland. We know the best locations across Cambridgeshire — or we can shoot somewhere that means something to you.', href: '/enquire', cta: 'Enquire →' },
            { color: '#1b3a5c', img: 'families-studio-card.jpg', label: 'Studio · Book online from £199', title: 'Studio Sessions', desc: 'Our Papworth Everard studio offers beautiful controlled light, whatever the weather. Book a 60 min family session online and pay securely.', href: '/book', cta: 'Book a session →' },
          ].map((card) => (
            <div key={card.title} style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: card.color, overflow: 'hidden' }}>
              <img src={`${STORAGE}/${card.img}`} alt={card.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.4rem' }}>{card.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>{card.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '1rem' }}>{card.desc}</p>
                <Link href={card.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: card.href === '/book' ? '#E8DDB5' : 'transparent', color: card.href === '/book' ? '#0d1b2a' : 'rgba(232,221,181,0.7)', border: card.href === '/book' ? 'none' : '1px solid rgba(232,221,181,0.35)', padding: '0.6rem 1.2rem', textDecoration: 'none', display: 'inline-block' }}>{card.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO STRIP ── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="f-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem', maxWidth: '1100px', margin: '0 auto 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Recent sessions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Family work</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all family sessions</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '200px', aspect: '2/3', color: '#8a7060', img: 'families-portfolio-01.jpg' },
            { w: '320px', aspect: '3/2', color: '#a09070', img: 'families-portfolio-02.jpg' },
            { w: '200px', aspect: '2/3', color: '#7a8870', img: 'families-portfolio-03.jpg' },
            { w: '260px', aspect: '4/3', color: '#909880', img: 'families-portfolio-04.jpg' },
            { w: '200px', aspect: '2/3', color: '#887868', img: 'families-portfolio-05.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
              <img src={`${STORAGE}/${item.img}`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── GIFT VOUCHER CALLOUT ── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>The perfect gift</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.4rem' }}>Give a family session as a gift</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.65, maxWidth: '500px' }}>
              Family sessions make a beautiful gift for birthdays, anniversaries, baby showers or Christmas. The recipient chooses their own date — valid for 12 months. From £199.
            </p>
          </div>
          <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.85rem 1.75rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>Buy a gift voucher →</Link>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="f-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Where we shoot</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none', marginBottom: '0.8rem' }}>Great spots across Cambridgeshire</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#5c5550', lineHeight: 1.75, maxWidth: '600px' }}>We know Cambridgeshire well. Here are some of our favourite locations for family sessions — though we&apos;re always happy to shoot somewhere that means something to you.</p>
          </div>
          <div className="f-locations-grid">
            {[
              { name: 'Cambridge', detail: 'The Backs, Grantchester Meadows, Cherry Hinton', href: '/cambridge-family-photographer' },
              { name: 'Ely', detail: 'Jubilee Gardens, riverside walks, Cathedral grounds', href: '/ely-family-photographer' },
              { name: 'Huntingdon', detail: 'Hinchingbrooke Country Park, riverside', href: '/huntingdon-family-photographer' },
              { name: 'St Ives', detail: 'Holt Island, riverside meadows, town bridge', href: '/st-ives-family-photographer' },
              { name: 'Newmarket', detail: "The Heath, Devil's Dyke, surrounding countryside", href: '/newmarket-family-photographer' },
              { name: 'Peterborough', detail: 'Ferry Meadows, Nene Valley, Flag Fen', href: '/peterborough-family-photographer' },
              { name: 'Waterbeach', detail: 'Riverside paths, local countryside', href: '/waterbeach-family-photographer' },
              { name: 'Papworth Everard', detail: 'Village green, surrounding fields', href: '/papworth-everard-family-photographer' },
            ].map((loc) => (
              <Link key={loc.href} href={loc.href} className="f-location-link">
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>{loc.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', lineHeight: 1.5 }}>{loc.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="f-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How a session works</h2>
          </div>
          <div className="f-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'We talk first', desc: "We have a quick chat before your session — about your family, your kids' ages, what you want from the day, and which location or studio suits you best." },
              { num: '02', title: 'The session', desc: "Sessions last 1–2 hours. We arrive, get everyone comfortable, and just start — no warm-up time needed. Kids are usually our best assistants." },
              { num: '03', title: 'Your gallery', desc: "Your edited gallery is ready within 3 weeks. All images are included — no selecting a limited set, no per-image charges. Every edited image is yours." },
              { num: '04', title: 'Style guide', desc: "We send a full style guide with your booking confirmation so you arrive prepared — what to wear, what to bring, and how to get the most from your session." },
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

      {/* ── TESTIMONIALS ── */}
      <section className="f-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>From our families</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>What they said</h2>
          </div>
          <div className="f-testimonials-grid">
            {[
              { quote: "Our kids are notoriously terrible in front of a camera. Two hours later we had photos I'll have on our walls for the rest of my life.", name: 'Jo & Marcus', detail: 'Family session · Ely' },
              { quote: "I was worried it would feel awkward and staged. It was the opposite — the kids were running around, we were laughing, and somehow every single photo is perfect.", name: 'Rachel T.', detail: 'Family session · Cambridge' },
              { quote: "We've done family photos before and they always look stiff. These feel like us. Our youngest is only 18 months and you'd never know — she looks completely natural.", name: 'Dan & Sophie', detail: 'Family session · Huntingdon' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: 'rgba(168,202,236,0.2)', lineHeight: 0.8, display: 'block' }}>&ldquo;</span>
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

      {/* ── FAQs ── */}
      <section className="f-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div className="f-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Family session FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: "What if my kids won't cooperate?", a: "They almost always do — eventually. We're used to it. The uncooperative moments often make the best images. We never force anything and we never rush." },
              { q: 'What age works best for family sessions?', a: "All ages work well. Newborns are a special case (see our newborn page). For family sessions with young children, 18 months+ is generally easiest, but we've successfully photographed every age." },
              { q: 'Indoor or outdoor — which is better?', a: "Both have their strengths. Outdoor sessions have more space and natural movement. Studio sessions give beautiful controlled light and are weather-proof. Our Papworth Everard studio can be booked online from £199 for 3+ people." },
              { q: 'How long does a session take?', a: "Studio family sessions are 60 minutes. Outdoor sessions typically run 90 minutes to 2 hours. We build in time for a slow start — no one needs to be ready the moment we arrive." },
              { q: 'What should we wear?', a: "We send all booked clients a full styling guide with their confirmation. Generally: coordinate rather than match, avoid large logos, and dress for comfort. Earth tones and blues work particularly well with our editing style." },
              { q: 'When will we get our photos?', a: "Your full edited gallery is delivered within 3 weeks of your session. All images included — no choosing a limited set, no per-image charges." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="f-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Book or enquire today</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Studio family sessions can be booked and paid for online instantly — from £199 for 60 minutes. For outdoor sessions, get in touch and we&apos;ll plan it together.
          </p>
          <div className="f-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a studio session</Link>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#A8CAEC', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Buy as a gift</Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire about outdoor</Link>
          </div>
        </div>
      </section>
    </>
  );
}