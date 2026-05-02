import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: "Photography Locations | Something Blue Productions Cambridge",
  description: "Wedding, family, newborn and commercial photography across Cambridgeshire and surrounding areas. Based in Cambridge with studios in Papworth Everard and Waterbeach.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Photography Locations | Something Blue Productions",
    description: "Wedding, family, newborn and commercial photography across Cambridgeshire.",
    url: "https://something-blue-productions.com/locations",
    type: "website",
  },
};

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

export default async function LocationsPage() {
  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .order('name');

  return (
    <>
      <style>{`
        .loc-pad { padding: 3rem 1.5rem; }
        .loc-hero { padding: 8rem 1.5rem 4rem; }
        .loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .loc-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .loc-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .loc-cta-buttons a { text-align: center; }
        .loc-card { text-decoration: none; display: block; padding: 1.8rem; background: #FAF8F2; border: 1px solid #DDD5C0; transition: border-color 0.2s; }
        .loc-card:hover { border-color: #1B3A5C; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .loc-pad { padding: 3.5rem 2.5rem; }
          .loc-hero { padding: 10rem 2.5rem 4rem; }
          .loc-grid { grid-template-columns: repeat(3, 1fr); }
          .loc-services-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 900px) {
          .loc-pad { padding: 4rem 4rem; }
          .loc-hero { padding: 10rem 4rem 5rem; }
          .loc-grid { grid-template-columns: repeat(4, 1fr); }
          .loc-cta-buttons { flex-direction: row; justify-content: center; }
          .loc-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="loc-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Where we work</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Photography across{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>Cambridgeshire.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            We cover weddings, families, newborn and commercial photography across Cambridge, Cambridgeshire and the surrounding region. Two studio spaces available for indoor sessions.
          </p>
        </div>
      </section>

      {/* ── LOCATIONS GRID ── */}
      <section className="loc-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>All locations</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Areas we cover</h2>
          </div>
          <div className="loc-grid">
            {(locations || []).map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="loc-card">
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>{loc.county}</p>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{loc.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.6, marginBottom: '0.8rem' }}>{loc.character?.slice(0, 80)}...</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Family', 'Newborn', 'Weddings', 'Commercial'].map((s) => (
                    <span key={s} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', border: '1px solid #DDD5C0', padding: '0.2rem 0.5rem' }}>{s}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Book instantly · Papworth Everard Studio</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Studio sessions from £99 — all images included
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              Or enquire about outdoor, wedding and bespoke sessions anywhere in Cambridgeshire.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session →
            </Link>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
              See all packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES BY LOCATION ── */}
      <section className="loc-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Browse by service</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Find a photographer near you</h2>
          </div>
          <div className="loc-services-grid">
            {[
              { title: 'Family Photographer', href: '/families', color: '#3a4828', img: 'services-families.jpg', desc: 'Natural, relaxed family sessions outdoors or in studio' },
              { title: 'Newborn Photographer', href: '/newborn', color: '#4a3830', img: 'services-newborn.jpg', desc: 'Gentle studio newborn sessions in Papworth or Waterbeach' },
              { title: 'Wedding Photographer', href: '/weddings', color: '#5c3d30', img: 'services-weddings.jpg', desc: 'Natural wedding photography and videography' },
              { title: 'Commercial Photographer', href: '/commercial', color: '#2c2820', img: 'commercial-brand-card.jpg', desc: 'Brand, performance and headshot photography' },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="zoom-card" style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: s.color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{s.img}</span>
                </div>
                <Image src={`${STORAGE}/${s.img}`} alt={s.title} fill sizes="(max-width: 640px) 50vw, (max-width: 900px) 50vw, 25vw" className="zoom-img" style={{ objectFit: 'cover', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', zIndex: 2 }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#ffffff', textTransform: 'none', marginBottom: '0.3rem' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)' }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIOS ── */}
      <section className="loc-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Studio sessions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Two studios across Cambridgeshire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }}>
            {[
              { name: 'Papworth Everard Studio', location: 'CB23 · Near Cambridge & Huntingdon', desc: 'Our main studio. Warm, airy and accessible from Cambridge, Huntingdon and the A14.', href: '/studio/papworth-everard' },
              { name: 'Waterbeach Studio', location: 'CB25 · Minutes from Cambridge', desc: 'Close to Cambridge city centre via the A10. Ideal for Cambridge-based families and professionals.', href: '/studio/waterbeach' },
            ].map((studio) => (
              <Link key={studio.href} href={studio.href} style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.08)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>{studio.name}</h3>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>{studio.location}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)' }}>{studio.desc}</p>
                </div>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', borderBottom: '1px solid rgba(158,146,130,0.3)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>View studio →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="loc-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Get in touch</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Not sure if we cover your area?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Just ask. We travel widely and are always happy to discuss locations beyond our listed areas.
          </p>
          <div className="loc-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Get in touch</Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>See the work</Link>
          </div>
        </div>
      </section>
    </>
  );
}