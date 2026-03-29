'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

const portfolioItems = [
  { id: 1, category: 'weddings', label: 'Wedding', location: 'Cambridge', color: '#5c3d30', img: 'weddings-portfolio-01.jpg', aspect: '2/3' },
  { id: 2, category: 'families', label: 'Family', location: 'Ely', color: '#3a4828', img: 'families-portfolio-01.jpg', aspect: '3/2' },
  { id: 3, category: 'newborn', label: 'Newborn', location: 'Papworth Everard Studio', color: '#4a3830', img: 'newborn-portfolio-01.jpg', aspect: '2/3' },
  { id: 4, category: 'weddings', label: 'Wedding', location: 'Huntingdon', color: '#6a4838', img: 'weddings-portfolio-02.jpg', aspect: '3/2' },
  { id: 5, category: 'maternity', label: 'Maternity', location: 'Waterbeach Studio', color: '#4a3c50', img: 'maternity-portfolio-01.jpg', aspect: '2/3' },
  { id: 6, category: 'families', label: 'Family', location: 'Cambridge', color: '#3a5030', img: 'families-portfolio-02.jpg', aspect: '3/2' },
  { id: 7, category: 'weddings', label: 'Wedding', location: 'St Ives', color: '#503828', img: 'weddings-portfolio-03.jpg', aspect: '2/3' },
  { id: 8, category: 'commercial', label: 'Headshots', location: 'Papworth Everard Studio', color: '#2a2030', img: 'commercial-portfolio-01.jpg', aspect: '3/2' },
  { id: 9, category: 'newborn', label: 'Newborn', location: 'Waterbeach Studio', color: '#c8b0a0', img: 'newborn-portfolio-02.jpg', aspect: '2/3' },
  { id: 10, category: 'families', label: 'Family', location: 'Huntingdon', color: '#4a5838', img: 'families-portfolio-03.jpg', aspect: '3/2' },
  { id: 11, category: 'weddings', label: 'Wedding', location: 'Newmarket', color: '#483020', img: 'weddings-portfolio-04.jpg', aspect: '2/3' },
  { id: 12, category: 'commercial', label: 'Performance', location: 'Cambridge', color: '#1b2a3a', img: 'commercial-portfolio-02.jpg', aspect: '3/2' },
  { id: 13, category: 'maternity', label: 'Maternity', location: 'Papworth Everard Studio', color: '#503848', img: 'maternity-portfolio-02.jpg', aspect: '2/3' },
  { id: 14, category: 'families', label: 'Family', location: 'Peterborough', color: '#405038', img: 'families-portfolio-04.jpg', aspect: '3/2' },
  { id: 15, category: 'weddings', label: 'Wedding', location: 'Ely', color: '#402818', img: 'weddings-portfolio-05.jpg', aspect: '2/3' },
  { id: 16, category: 'newborn', label: 'Newborn', location: 'Papworth Everard Studio', color: '#b8a090', img: 'newborn-portfolio-03.jpg', aspect: '3/2' },
  { id: 17, category: 'weddings', label: 'Wedding', location: 'Cambridge', color: '#5a3828', img: 'weddings-portfolio-06.jpg', aspect: '2/3' },
  { id: 18, category: 'commercial', label: 'Brand', location: 'Waterbeach Studio', color: '#3a3020', img: 'commercial-portfolio-03.jpg', aspect: '3/2' },
];

const filters = [
  { key: 'all', label: 'All work' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'families', label: 'Families' },
  { key: 'newborn', label: 'Newborn' },
  { key: 'maternity', label: 'Maternity' },
  { key: 'commercial', label: 'Commercial' },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<{ src: string; label: string; location: string } | null>(null);

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const preload = (src: string) => {
    const img = new window.Image();
    img.src = src;
  };

  const openLightbox = (item: typeof portfolioItems[0], index: number) => {
    setLightbox({ src: `${STORAGE}/${item.img}`, label: item.label, location: item.location });
    if (filtered[index + 1]) preload(`${STORAGE}/${filtered[index + 1].img}`);
    if (filtered[index - 1]) preload(`${STORAGE}/${filtered[index - 1].img}`);
  };

  const closeLightbox = () => setLightbox(null);

  const currentIndex = lightbox
    ? filtered.findIndex(i => `${STORAGE}/${i.img}` === lightbox.src)
    : -1;

  const goNext = () => {
    if (currentIndex < filtered.length - 1) {
      const next = filtered[currentIndex + 1];
      setLightbox({ src: `${STORAGE}/${next.img}`, label: next.label, location: next.location });
      if (filtered[currentIndex + 2]) preload(`${STORAGE}/${filtered[currentIndex + 2].img}`);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prev = filtered[currentIndex - 1];
      setLightbox({ src: `${STORAGE}/${prev.img}`, label: prev.label, location: prev.location });
      if (filtered[currentIndex - 2]) preload(`${STORAGE}/${filtered[currentIndex - 2].img}`);
    }
  };

  return (
    <>
      <style>{`
        .port-pad { padding: 3rem 1.5rem; }
        .port-hero { padding: 8rem 1.5rem 4rem; }
        .port-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .port-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: block;
          width: 100%;
        }
        .port-item-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .port-item:hover .port-item-inner { transform: scale(1.025); }
        .port-item-label-bg {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s;
        }
        .port-item:hover .port-item-label-bg { opacity: 1; }
        .port-item-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.2rem 1.4rem; z-index: 3;
          transform: translateY(8px); opacity: 0; transition: all 0.3s;
        }
        .port-item:hover .port-item-label { transform: translateY(0); opacity: 1; }
        .port-filter-btn {
          font-family: 'Carose', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.5rem 1.1rem; border: 1px solid #DDD5C0;
          background: transparent; color: #9E9282; cursor: pointer; transition: all 0.2s;
        }
        .port-filter-btn:hover { border-color: #1B3A5C; color: #1B3A5C; }
        .port-filter-btn.active { background: #1B3A5C; border-color: #1B3A5C; color: #F5F0E8; }
        .port-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .port-cta-buttons a { text-align: center; }
        .lightbox-btn {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: white; width: 48px; height: 48px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; font-size: 1.2rem;
          transition: background 0.2s; flex-shrink: 0;
        }
        .lightbox-btn:hover { background: rgba(255,255,255,0.2); }
        .lightbox-btn:disabled { opacity: 0.2; cursor: default; }

        @media (min-width: 640px) {
          .port-pad { padding: 3.5rem 2.5rem; }
          .port-hero { padding: 10rem 2.5rem 4rem; }
        
        }
        @media (min-width: 900px) {
          .port-pad { padding: 4rem 4rem; }
          .port-hero { padding: 10rem 4rem 5rem; }
        
          .port-cta-buttons { flex-direction: row; justify-content: center; }
          .port-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            backgroundColor: 'rgba(13,27,42,0.97)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(245,240,232,0.6)', fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1, padding: '0.5rem' }}
          >
            ×
          </button>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', width: '90vw', height: '80vh', maxWidth: '1200px' }}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.label}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Controls */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}
          >
            <button className="lightbox-btn" onClick={goPrev} disabled={currentIndex <= 0}>←</button>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', marginBottom: '0.2rem' }}>{lightbox.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)' }}>{lightbox.location} · {currentIndex + 1} / {filtered.length}</p>
            </div>
            <button className="lightbox-btn" onClick={goNext} disabled={currentIndex >= filtered.length - 1}>→</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="port-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>The portfolio</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Selected work from{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>across the studio.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            Weddings, families, newborn, maternity, and commercial work across Cambridge and Cambridgeshire. Every image is a real session, with real people.
          </p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="port-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`port-filter-btn${activeFilter === f.key ? ' active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', marginBottom: '1.5rem' }}>
            {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
            {activeFilter !== 'all' ? ` · ${filters.find(f => f.key === activeFilter)?.label}` : ''}
          </p>
          <div className="port-grid">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="port-item"
                style={{ aspectRatio: '1/1', backgroundColor: item.color }}
                onClick={() => openLightbox(item, index)}
              >
                <div className="port-item-inner">
                  <Image
                    src={`${STORAGE}/${item.img}`}
                    alt={`${item.label} photography ${item.location}`}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 900px) 25vw, 22vw"
                    quality={85}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="port-item-label-bg" />
                <div className="port-item-label">
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.75)', marginBottom: '0.2rem' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE PORTFOLIOS */}
      <section className="port-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Browse by service</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Explore our services</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { title: 'Wedding Photography', sub: 'Photography & videography', href: '/weddings', color: '#5c3d30' },
              { title: 'Family Photography', sub: 'Natural lifestyle sessions', href: '/families', color: '#3a4828' },
              { title: 'Newborn & Maternity', sub: 'Studio & home sessions', href: '/newborn', color: '#4a3830' },
              { title: 'Commercial', sub: 'Brand, performance & headshots', href: '/commercial', color: '#2c2820' },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: s.color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', textDecoration: 'none', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#ffffff', textTransform: 'none', marginBottom: '0.25rem' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)' }}>{s.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="port-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Like what you see?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Let&apos;s work together</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you&apos;re looking for and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="port-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Start your enquiry</Link>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>View packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
