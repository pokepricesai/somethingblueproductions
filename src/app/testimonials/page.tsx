import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials | Something Blue Productions Cambridge",
  description: "Read what our wedding, family, newborn and maternity clients say about Something Blue Productions. Real reviews from real people across Cambridge and Cambridgeshire.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials | Something Blue Productions",
    description: "Real reviews from wedding, family, newborn and maternity clients across Cambridgeshire.",
    url: "https://something-blue-productions.com/testimonials",
    type: "website",
  },
};

const testimonials = [
  {
    quote: "We didn't want posed wedding photos and we couldn't be happier. Every single image feels like a real moment — not a performance. We've looked at them a hundred times and they still feel exactly right.",
    name: "Sarah & Tom",
    service: "Wedding Photography",
    location: "Cambridge",
    category: "weddings",
  },
  {
    quote: "Completely unobtrusive on the day — we genuinely forgot there was a photographer there. The results are beyond anything we hoped for. Emotional doesn't cover it.",
    name: "Priya & James",
    service: "Wedding Photography",
    location: "Ely",
    category: "weddings",
  },
  {
    quote: "We'd been let down by a photographer before and were nervous. From the first message it was clear this was different — professional, warm, and completely reassuring. The photos are extraordinary.",
    name: "Kate & Ben",
    service: "Wedding Photography & Videography",
    location: "Huntingdon",
    category: "weddings",
  },
  {
    quote: "Our kids are notoriously terrible in front of a camera. Two hours later we had photos I'll have on our walls for the rest of my life. Genuinely couldn't recommend more.",
    name: "Jo & Marcus",
    service: "Family Photography",
    location: "Ely",
    category: "families",
  },
  {
    quote: "I was worried it would feel awkward and staged. It was the opposite — the kids were running around, we were laughing, and somehow every single photo is perfect.",
    name: "Rachel T.",
    service: "Family Photography",
    location: "Cambridge",
    category: "families",
  },
  {
    quote: "We've done family photos before and they always look stiff. These feel like us. Our youngest is only 18 months and you'd never know — she looks completely natural.",
    name: "Dan & Sophie",
    service: "Family Photography",
    location: "Huntingdon",
    category: "families",
  },
  {
    quote: "My daughter was six days old. I was nervous about the whole thing. The studio was so calm and the whole session felt gentle from start to finish. The images are extraordinary.",
    name: "Emily R.",
    service: "Newborn Photography",
    location: "Papworth Everard Studio",
    category: "newborn",
  },
  {
    quote: "We were exhausted new parents and I genuinely wasn't sure we'd manage it. But the whole thing was so easy — no pressure, no rushing, just a lovely couple of hours. The photos made me cry.",
    name: "Hannah & Will",
    service: "Newborn Photography",
    location: "Waterbeach Studio",
    category: "newborn",
  },
  {
    quote: "Booked during pregnancy and they held our date perfectly. When our son arrived early they were completely flexible. The images are the most treasured thing we have from his first week.",
    name: "Gemma & Chris",
    service: "Newborn Photography",
    location: "Papworth Everard Studio",
    category: "newborn",
  },
  {
    quote: "I felt so self-conscious about being photographed during pregnancy. Within ten minutes of arriving at the studio I completely forgot to feel that way. The images are the most beautiful photographs I've ever had taken.",
    name: "Claire M.",
    service: "Maternity Photography",
    location: "Papworth Everard Studio",
    category: "maternity",
  },
  {
    quote: "We did both maternity and newborn with Something Blue. Having the same photographer for both made everything feel connected. The two sets of images together are something really special.",
    name: "Amy & Rob",
    service: "Maternity & Newborn",
    location: "Waterbeach Studio",
    category: "maternity",
  },
  {
    quote: "Used the Waterbeach studio for our family session in January. The light was beautiful, the kids were warm and comfortable, and we got photos I'll have on the wall forever.",
    name: "Dan & Sophie",
    service: "Studio Family Session",
    location: "Waterbeach Studio",
    category: "studio",
  },
  {
    quote: "Needed headshots quickly for a casting call. Got in touch Monday, shot Wednesday, images delivered Friday. Exactly what I needed and genuinely the best headshots I've ever had.",
    name: "Marcus O.",
    service: "Creative Headshots",
    location: "Papworth Everard Studio",
    category: "commercial",
  },
  {
    quote: "Shot our dance show two years running now. Always discreet, always gets the moments that matter. The images go straight onto our website and social media and they always generate comments.",
    name: "Cambridge Dance Academy",
    service: "Performance Photography",
    location: "Cambridge",
    category: "commercial",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <style>{`
        .t-pad { padding: 3rem 1.5rem; }
        .t-hero { padding: 8rem 1.5rem 4rem; }
        .t-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .t-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .t-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .t-pad { padding: 3.5rem 2.5rem; }
          .t-hero { padding: 10rem 2.5rem 4rem; }
          .t-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .t-pad { padding: 4rem 4rem; }
          .t-hero { padding: 10rem 4rem 5rem; }
          .t-grid { grid-template-columns: repeat(3, 1fr); }
          .t-cta-buttons { flex-direction: row; justify-content: center; }
          .t-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="t-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>From our clients</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            What our clients{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>say.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            Real words from real clients — weddings, families, newborn, maternity, and commercial work across Cambridge and Cambridgeshire.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="t-pad" style={{ backgroundColor: '#1B3A5C' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2px' }}>
          {[
            { num: '5★', label: 'Average rating' },
            { num: '200+', label: 'Sessions completed' },
            { num: '2020', label: 'Established' },
            { num: '2', label: 'Studio locations' },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.5rem', color: '#E8DDB5', lineHeight: 1, marginBottom: '0.5rem' }}>{stat.num}</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.6)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WEDDINGS ── */}
      <section className="t-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Weddings</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>From our couples</h2>
          </div>
          <div className="t-grid">
            {testimonials.filter(t => t.category === 'weddings').map((t, i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '3rem', color: '#DDD5C0', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic', flex: 1 }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.15rem' }}>{t.service} · {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAMILIES ── */}
      <section className="t-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Families</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>From our families</h2>
          </div>
          <div className="t-grid">
            {testimonials.filter(t => t.category === 'families').map((t, i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '3rem', color: '#DDD5C0', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic', flex: 1 }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.15rem' }}>{t.service} · {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWBORN & MATERNITY ── */}
      <section className="t-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Newborn & Maternity</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>From new parents</h2>
          </div>
          <div className="t-grid">
            {testimonials.filter(t => t.category === 'newborn' || t.category === 'maternity').map((t, i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '3rem', color: '#DDD5C0', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic', flex: 1 }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.15rem' }}>{t.service} · {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL & STUDIO ── */}
      <section className="t-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Studio & Commercial</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>From studio & commercial clients</h2>
          </div>
          <div className="t-grid">
            {testimonials.filter(t => t.category === 'studio' || t.category === 'commercial').map((t, i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '3rem', color: 'rgba(168,202,236,0.2)', lineHeight: 0.8 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.75)', fontStyle: 'italic', flex: 1 }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(168,202,236,0.12)' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8DDB5', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.15rem' }}>{t.service} · {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="t-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Ready to get started?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s make something worth keeping
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Studio sessions from £99 — book instantly online. Or get in touch and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="t-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a studio session
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}