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

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#3a4828', minHeight: '90svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.65) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>families-hero.jpg</span>
        </div>
        <img src={`${STORAGE}/families-hero.jpg`} alt="Family photography Cambridgeshire" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="f-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Family Photography · Cambridge</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Your family,{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>as you really are.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Relaxed, natural family photography across Cambridgeshire. Outdoors in locations you love, or in our warm studio spaces. No awkward posing — just time together, beautifully documented.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about a family session →
          </Link>
        </div>
      </section>

      {/* ─── INTRO ─── */}
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
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>families-intro.jpg</span>
              </div>
              <img src={`${STORAGE}/families-intro.jpg`} alt="Family outdoor session" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUTDOOR / STUDIO SPLIT ─── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="f-split-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { color: '#3a4828', img: 'families-outdoor-card.jpg', label: 'Outdoors', title: 'Outdoor Sessions', desc: 'Parks, meadows, riversides, woodland. We know the best locations across Cambridgeshire — or we can shoot somewhere that means something to you.' },
            { color: '#1b3a5c', img: 'families-studio-card.jpg', label: 'Studio', title: 'Studio Sessions', desc: 'Our studios in Papworth Everard and Waterbeach offer beautiful controlled light, whatever the weather. Perfect for younger children and winter sessions.' },
          ].map((card) => (
            <div key={card.title} style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: card.color, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{card.img}</span>
              </div>
              <img src={`${STORAGE}/${card.img}`} alt={card.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.4rem' }}>{card.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>{card.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, maxWidth: '320px' }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PORTFOLIO STRIP ─── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="f-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem' }}>
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
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.img}</span>
              </div>
              <img src={`${STORAGE}/${item.img}`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
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

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="f-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How a session works</h2>
          </div>
          <div className="f-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'We talk first', desc: "We have a quick chat before your session — about your family, your kids' ages, what you want from the day, and which location or studio suits you best." },
              { num: '02', title: 'The session', desc: "Sessions last 1.5–2 hours. We arrive, get everyone comfortable, and just start — no warm-up time needed. Kids are usually our best assistants." },
              { num: '03', title: 'Your gallery', desc: "Your edited gallery is ready within 3 weeks. You choose your favourites for prints, canvases or digital files — we guide you through the options." },
              { num: '04', title: 'Prints & products', desc: "We offer a full range of wall art, albums and digital collections. Nothing is pressured — you take your time and choose what feels right." },
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

      {/* ─── PACKAGES ─── */}
      <section className="f-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Investment</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Family session packages</h2>
          </div>
          <div className="f-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              { name: 'Mini Session', price: 'From £195', includes: ['45 minutes', 'One location', 'Online gallery', '20+ edited images', 'Print release'], note: 'Perfect for a quick seasonal update', highlight: false },
              { name: 'Full Session', price: 'From £345', includes: ['90 minutes', 'One location or studio', 'Online gallery', '50+ edited images', 'Print release', 'Styling guide'], note: 'Our most popular option', highlight: true },
              { name: 'Extended Session', price: 'From £495', includes: ['2.5 hours', 'Multiple locations', 'Online gallery', '80+ edited images', 'Print release', 'Styling guide', 'Print credit included'], note: 'For larger families or multiple generations', highlight: false },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.highlight ? '#1B3A5C' : '#FAF8F2', border: pkg.highlight ? 'none' : '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.3rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.highlight ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.4rem' }}>{pkg.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: pkg.highlight ? 'rgba(168,202,236,0.7)' : '#9E9282', marginBottom: '1.2rem', fontStyle: 'italic' }}>{pkg.note}</p>
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
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', textAlign: 'center' }}>All packages can be adapted. Studio or outdoor, siblings only, grandparents included — just tell us what you need.</p>
        </div>
      </section>

      {/* ─── FAQs ─── */}
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
              { q: 'Indoor or outdoor — which is better?', a: "Both have their strengths. Outdoor sessions have more space and natural movement. Studio sessions give beautiful controlled light and are weather-proof. Many families do one of each over time." },
              { q: 'How long does a session take?', a: "Mini sessions are 45 minutes. Full sessions are 90 minutes. Extended sessions run to about 2.5 hours. We build in time for a slow start — no one needs to be ready the moment we arrive." },
              { q: 'What should we wear?', a: "We send all booked clients a full styling guide. Generally: coordinate rather than match, avoid large logos, and dress for comfort. Earth tones and blues work particularly well with our editing style." },
              { q: 'When will we get our photos?', a: "Your full edited gallery is delivered within 3 weeks of your session. We'll send a sneak peek of a few images within 48 hours." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="f-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to book?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Let&apos;s plan your family session</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us your family size, the ages of your children, whether you&apos;re thinking indoor or outdoor, and roughly when you&apos;d like to shoot. We&apos;ll come back to you quickly.
          </p>
          <div className="f-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire now</Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>See family portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}