import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography & Videography Cambridge | Something Blue Productions",
  description: "Beautiful, natural wedding photography and videography across Cambridge, Cambridgeshire and beyond. Honest, unposed, and made to last.",
  alternates: { canonical: "/weddings" },
  openGraph: {
    title: "Wedding Photography & Videography Cambridge | Something Blue Productions",
    description: "Beautiful, natural wedding photography and videography across Cambridge and Cambridgeshire.",
    url: "https://something-blue-productions.com/weddings",
    type: "website",
  },
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

export default function WeddingsPage() {
  return (
    <>
      <style>{`
        .w-pad { padding: 3rem 1.5rem; }
        .w-services-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .w-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .w-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .w-packages-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .w-faqs { max-width: 100%; }
        .w-hero-content { padding: 0 1.5rem 6rem; }
        .w-strip-header { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .w-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .w-cta-buttons a { text-align: center; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .w-pad { padding: 3.5rem 2.5rem; }
          .w-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .w-packages-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .w-pad { padding: 4rem 4rem; }
          .w-services-grid { grid-template-columns: 1fr 1fr; }
          .w-process-grid { grid-template-columns: repeat(3, 1fr); }
          .w-testimonials-grid { grid-template-columns: 1fr 1fr; }
          .w-packages-grid { grid-template-columns: repeat(3, 1fr); }
          .w-faqs { max-width: 780px; margin: 0 auto; }
          .w-hero-content { padding: 0 4rem 5rem; }
          .w-strip-header { flex-direction: row; align-items: flex-end; }
          .w-cta-buttons { flex-direction: row; justify-content: center; }
          .w-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#5c3d30', minHeight: '90svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>weddings-hero.jpg</span>
        </div>
        <Image src={`${STORAGE}/weddings-hero.jpg`} alt="Wedding photography Cambridge" fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="w-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Wedding Photography &amp; Video</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            Your day, honestly{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>captured.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '420px' }}>
            Natural, unposed wedding photography and film across Cambridge and Cambridgeshire. We follow your day as it happens — no awkward line-ups, no forced smiles.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about your wedding →
          </Link>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="w-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>
            We don&apos;t direct your wedding day — we observe it. The look between you when you see each other for the first time. The quiet moment before you walk in. Your grandmother laughing at the speeches.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
            These are the things that matter, and they&apos;re the things we&apos;re looking for. We work quietly and unobtrusively, so your guests don&apos;t feel like they&apos;re at a photoshoot — they feel like they&apos;re at your wedding.
          </p>
        </div>
      </section>

      {/* ── PHOTOGRAPHY / VIDEO SPLIT ── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="w-services-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { href: '/enquire', color: '#5c3d30', img: 'weddings-photography-card.jpg', label: 'Still images', title: 'Wedding Photography', desc: 'Full day coverage, edited gallery, and a collection of images that genuinely feel like your day.' },
            { href: '/enquire', color: '#3d2820', img: 'weddings-videography-card.jpg', label: 'Film', title: 'Wedding Videography', desc: "A short film of your day — the voices, the music, the moments that a photograph alone can't hold." },
          ].map((card) => (
            <Link key={card.title} href={card.href} className="zoom-card" style={{ position: 'relative', display: 'block', aspectRatio: '4/3', backgroundColor: card.color, textDecoration: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{card.img}</span>
              </div>
              <Image src={`${STORAGE}/${card.img}`} alt={card.title} fill sizes="(max-width: 900px) 100vw, 50vw" className="zoom-img" style={{ objectFit: 'cover', zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.4rem' }}>{card.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>{card.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '320px' }}>{card.desc}</p>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '18px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />Enquire
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO STRIP ── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="w-strip-header" style={{ marginBottom: '1.5rem', padding: '0 1.5rem', maxWidth: '1100px', margin: '0 auto 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Selected weddings</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Recent work</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>View all weddings</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '200px', aspect: '2/3', color: '#8a6848', img: 'weddings-portfolio-01.jpg' },
            { w: '320px', aspect: '3/2', color: '#a08070', img: 'weddings-portfolio-02.jpg' },
            { w: '200px', aspect: '2/3', color: '#7a5848', img: 'weddings-portfolio-03.jpg' },
            { w: '260px', aspect: '4/3', color: '#906858', img: 'weddings-portfolio-04.jpg' },
            { w: '200px', aspect: '2/3', color: '#8a7060', img: 'weddings-portfolio-05.jpg' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '0 0.5rem' }}>{item.img}</span>
              </div>
              <Image src={`${STORAGE}/${item.img}`} alt={`Wedding photography ${i + 1}`} fill sizes="320px" style={{ objectFit: 'cover', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT & GIFT ── */}
      <section style={{ backgroundColor: '#E8DDB5', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', backgroundColor: '#fff', border: '1px solid #DDD5C0' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>Before the wedding</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.05rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>Engagement sessions</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.65, maxWidth: '400px' }}>Get comfortable in front of the camera before your wedding day. Engagement sessions are included in our Full Day and Full Day with Film packages, or available to add to any package.</p>
            </div>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#1B3A5C', color: '#E8DDB5', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>Enquire about an engagement shoot →</Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', backgroundColor: '#fff', border: '1px solid #DDD5C0' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>The perfect wedding present</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.05rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.3rem' }}>Gift a studio session</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.65, maxWidth: '400px' }}>Give the newlyweds a couple portrait session as a wedding gift. They choose their own date — a beautiful, lasting present from £99.</p>
            </div>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>Buy a gift voucher →</Link>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="w-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How we work on your day</h2>
          </div>
          <div className="w-process-grid">
            {[
              { num: '01', title: 'Before the day', desc: "We have a proper conversation before anything is confirmed. We want to understand your day, your style, and what matters most to you." },
              { num: '02', title: 'On the day', desc: "We arrive early, stay late, and work quietly throughout. You won't feel managed or directed. We follow your day and find the moments worth keeping." },
              { num: '03', title: 'After the day', desc: "Your edited gallery is delivered within 6 weeks. Every image is carefully selected and edited to feel consistent, warm, and true to the day." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="w-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>From our couples</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>What they said</h2>
          </div>
          <div className="w-testimonials-grid">
            {[
              { quote: "We didn't want posed wedding photos and we couldn't be happier. Every single image feels like a real moment — not a performance.", name: 'Sarah & Tom', detail: 'Cambridge · Summer wedding' },
              { quote: "Completely unobtrusive on the day — we genuinely forgot there was a photographer there. The results are beyond anything we hoped for.", name: 'Priya & James', detail: 'Ely · Autumn wedding' },
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

      {/* ── PACKAGES ── */}
      <section className="w-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Investment</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Wedding packages</h2>
          </div>
          <div className="w-packages-grid" style={{ marginBottom: '1.5rem' }}>
            {[
              {
                name: 'Half Day',
                price: 'From £600',
                priceSub: 'Photos only £600 · Photos + Video £800',
                includes: ['Up to 5 hours coverage', 'Fully edited photos', 'Free engagement shoot', 'Optional cinematic video'],
                highlight: false,
              },
              {
                name: 'Full Day',
                price: 'From £900',
                priceSub: 'Photos only £900 · Photos + Video £1,200',
                includes: ['Getting ready to first dance', 'Fully edited photos', 'Optional cinematic video', 'Free engagement shoot'],
                highlight: true,
              },
              {
                name: 'Full Day with Film',
                price: '£2,000',
                priceSub: 'Photos + Video included',
                includes: ['Getting ready to first dance', 'Fully edited photos', '10-minute cinematic film', '1-minute social media cut', 'Free engagement shoot'],
                highlight: false,
              },
            ].map((pkg) => (
              <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.highlight ? '#1B3A5C' : 'rgba(255,255,255,0.04)', border: pkg.highlight ? 'none' : '1px solid rgba(168,202,236,0.1)' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.highlight ? '#A8CAEC' : '#9E9282', marginBottom: '0.3rem' }}>{pkg.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0' }}>{pkg.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)', marginBottom: '1.5rem', marginTop: '0.2rem' }}>{pkg.priceSub}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.8rem' }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A8CAEC', flexShrink: 0, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.highlight ? '#E8DDB5' : '#9E9282', textDecoration: 'none', borderBottom: `1px solid ${pkg.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(158,146,130,0.3)'}`, paddingBottom: '2px' }}>
                  Enquire about this package
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.35)', marginBottom: '0.75rem' }}>
              All packages can be tailored. Get in touch and we&apos;ll put something together that fits your day.
            </p>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)', paddingBottom: '2px' }}>
              See full pricing on the packages page →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="w-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="w-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Wedding FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: 'How far in advance should we book?', a: "Most couples book 9–18 months in advance, particularly for summer dates. That said, we do sometimes have availability at shorter notice — it's always worth getting in touch." },
              { q: 'Do you travel outside Cambridgeshire?', a: "Yes. We cover weddings across the UK and occasionally internationally. Travel costs are discussed transparently at enquiry stage — there are no surprises." },
              { q: 'How long until we receive our photos?', a: "Your full edited gallery is delivered within 6 weeks of your wedding. We also send a small selection of highlights within 48 hours so you have something to share straight away." },
              { q: 'Can we have both photography and video?', a: "Yes — Samantha shoots photography and Luke shoots video. We offer combined packages that work out better value than booking separately, and mean both work as a coordinated team on the day." },
              { q: 'Do you do engagement or pre-wedding shoots?', a: "Yes, and we recommend them. It's a chance to get comfortable with us before the wedding day — and they're included free with our Full Day and Full Day with Film packages." },
              { q: 'Are you insured?', a: "Yes. We carry full professional indemnity and public liability insurance. Venue documentation available on request." },
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
      <section className="w-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to talk?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s talk about your wedding
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us your date, your venue, and a little about what you&apos;re looking for. We&apos;ll come back to you within 24 hours.
          </p>
          <div className="w-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Enquire now
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See wedding portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}