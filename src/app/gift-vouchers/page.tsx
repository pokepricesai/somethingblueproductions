import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SUPABASE_URL } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Photography Gift Vouchers | Something Blue Productions Cambridge",
  description:
    "Photography gift vouchers from £99 — newborn, family and engagement studio sessions. Sent by email. Something Blue Productions, Papworth Everard studio in Cambridgeshire.",
  alternates: { canonical: "/gift-vouchers" },
  openGraph: {
    title: "Photography Gift Vouchers | Something Blue Productions",
    description:
      "Photography gift vouchers from £99 — newborn, family and engagement sessions at our Papworth Everard studio.",
    url: "https://something-blue-productions.com/gift-vouchers",
    type: "website",
    images: [
      {
        url: "https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Something Blue Productions — photography gift vouchers",
      },
    ],
  },
};

const STORAGE = `${SUPABASE_URL}/storage/v1/object/public/site-images`;

const CATEGORIES = [
  {
    slug: 'newborn',
    title: 'Newborn Photography Gift',
    subtitle: 'For expectant parents & new arrivals',
    desc: "A gentle, unhurried studio session for baby's first weeks. A meaningful gift for baby showers, new parents, or grandparents-to-be.",
    href: '/gift-vouchers/newborn',
    color: '#4a3830',
    img: 'services-newborn.jpg',
  },
  {
    slug: 'family',
    title: 'Family Photography Gift',
    subtitle: 'For growing families',
    desc: 'An hour in the studio with beautifully controlled light — perfect for family birthdays, Christmas, or a milestone worth marking.',
    href: '/gift-vouchers/family',
    color: '#3a4828',
    img: 'services-families.jpg',
  },
  {
    slug: 'engagement',
    title: 'Engagement / Couples Gift',
    subtitle: 'For couples & the newly engaged',
    desc: 'A relaxed studio session for two — great for engagements, anniversaries, or as a wedding gift.',
    href: '/gift-vouchers/engagement',
    color: '#4a3c50',
    img: 'services-weddings.jpg',
  },
];

const giftHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://something-blue-productions.com/gift-vouchers#service',
  serviceType: 'Photography Gift Vouchers',
  name: 'Photography Gift Vouchers — Something Blue Productions',
  description:
    'Photography gift vouchers for newborn, family and engagement studio sessions from £99. Sent by email. Papworth Everard studio in Cambridgeshire.',
  provider: { '@id': 'https://something-blue-productions.com/#organization' },
  url: 'https://something-blue-productions.com/gift-vouchers',
};

export default function GiftVouchersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(giftHubSchema) }}
      />
      <style>{`
        .g-pad { padding: 3rem 1.5rem; }
        .g-hero { padding: 8rem 1.5rem 4rem; }
        .g-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .g-price-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .g-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .g-pad { padding: 3.5rem 2.5rem; }
          .g-hero { padding: 10rem 2.5rem 4rem; }
          .g-price-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .g-pad { padding: 4rem 4rem; }
          .g-hero { padding: 10rem 4rem 5rem; }
          .g-grid { grid-template-columns: repeat(3, 1fr); }
          .g-cta-buttons { flex-direction: row; justify-content: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="g-hero" style={{ maxWidth: '760px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Gift vouchers</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            <span aria-hidden="true">Give the gift of a{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>session.</span></span>
            <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Photography Gift Vouchers — Cambridge &amp; Cambridgeshire</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '520px' }}>
            Photography gift vouchers from £99. Newborn, family and engagement studio sessions with Something Blue Productions in Papworth Everard, Cambridgeshire. All images included — no per-image charges, ever.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="g-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Choose a voucher</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Three types of session</h2>
          </div>
          <div className="g-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={cat.href} className="zoom-card" style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: cat.color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', textDecoration: 'none', overflow: 'hidden' }}>
                <Image src={`${STORAGE}/${cat.img}`} alt={`${cat.title} — Something Blue Productions`} fill sizes="(max-width: 900px) 100vw, 33vw" className="zoom-img" style={{ objectFit: 'cover', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)', zIndex: 2 }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.4rem' }}>{cat.subtitle}</p>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '0.6rem', textTransform: 'none' }}>{cat.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.65, marginBottom: '0.8rem' }}>{cat.desc}</p>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8DDB5', borderBottom: '1px solid rgba(232,221,181,0.4)', paddingBottom: '2px' }}>
                    See voucher →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="g-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Three simple steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px' }}>
            {[
              { num: '01', title: 'Choose', desc: 'Pick the type of session that suits the recipient — newborn, family or couples.' },
              { num: '02', title: 'Buy online', desc: 'Complete the purchase securely online. The voucher is delivered by email.' },
              { num: '03', title: 'They book', desc: 'The recipient chooses their own date and books their session directly with us using the voucher code.' },
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

      {/* ── SESSION OPTIONS ── */}
      <section className="g-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What&apos;s included</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Session options</h2>
          </div>
          <div className="g-price-grid">
            <div style={{ padding: '2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Mini Studio Session</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '1rem' }}>£99</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, padding: 0 }}>
                {['30-minute studio session', '5–10 edited images', 'All images included'].map((item) => (
                  <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#DDD5C0', display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '2rem', backgroundColor: '#1B3A5C' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Family Studio Experience</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem' }}>£199</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, padding: 0 }}>
                {['60-minute session', 'Suitable for 3+ people', '15–20 edited images', 'One free print of your choice'].map((item) => (
                  <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.7)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A8CAEC', display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="g-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to give</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Give a photography session</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Pick a voucher category, buy online, and the voucher is delivered by email.
          </p>
          <div className="g-cta-buttons">
            <Link href="/gift-vouchers/newborn" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block' }}>Newborn gift</Link>
            <Link href="/gift-vouchers/family" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#A8CAEC', color: '#0d1b2a', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block' }}>Family gift</Link>
            <Link href="/gift-vouchers/engagement" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.85)', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block' }}>Couples gift</Link>
          </div>
        </div>
      </section>
    </>
  );
}
