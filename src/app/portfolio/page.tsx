'use client';

import Link from "next/link";
import { useState } from "react";

const portfolioItems = [
  { id: 1, category: 'weddings', label: 'Wedding', location: 'Cambridge', color: '#5c3d30', img: 'portfolio-featured-weddings.jpg', aspect: '2/3' },
  { id: 2, category: 'families', label: 'Family', location: 'Ely', color: '#3a4828', img: 'portfolio-featured-families.jpg', aspect: '3/2' },
  { id: 3, category: 'newborn', label: 'Newborn', location: 'Papworth Everard Studio', color: '#4a3830', img: 'portfolio-featured-newborn.jpg', aspect: '2/3' },
  { id: 4, category: 'weddings', label: 'Wedding', location: 'Huntingdon', color: '#6a4838', img: 'weddings-portfolio-01.jpg', aspect: '3/2' },
  { id: 5, category: 'maternity', label: 'Maternity', location: 'Waterbeach Studio', color: '#4a3c50', img: 'portfolio-featured-maternity.jpg', aspect: '2/3' },
  { id: 6, category: 'families', label: 'Family', location: 'Cambridge', color: '#3a5030', img: 'families-portfolio-02.jpg', aspect: '3/2' },
  { id: 7, category: 'weddings', label: 'Wedding', location: 'St Ives', color: '#503828', img: 'weddings-portfolio-02.jpg', aspect: '2/3' },
  { id: 8, category: 'commercial', label: 'Headshots', location: 'Papworth Everard Studio', color: '#2a2030', img: 'portfolio-featured-commercial.jpg', aspect: '3/2' },
  { id: 9, category: 'newborn', label: 'Newborn', location: 'Waterbeach Studio', color: '#c8b0a0', img: 'newborn-gallery-02.jpg', aspect: '2/3' },
  { id: 10, category: 'families', label: 'Family', location: 'Huntingdon', color: '#4a5838', img: 'families-portfolio-03.jpg', aspect: '3/2' },
  { id: 11, category: 'weddings', label: 'Wedding', location: 'Newmarket', color: '#483020', img: 'weddings-portfolio-03.jpg', aspect: '2/3' },
  { id: 12, category: 'commercial', label: 'Performance', location: 'Cambridge', color: '#1b2a3a', img: 'performance-gallery-01.jpg', aspect: '3/2' },
  { id: 13, category: 'maternity', label: 'Maternity', location: 'Papworth Everard Studio', color: '#503848', img: 'maternity-gallery-03.jpg', aspect: '2/3' },
  { id: 14, category: 'families', label: 'Family', location: 'Peterborough', color: '#405038', img: 'families-portfolio-04.jpg', aspect: '3/2' },
  { id: 15, category: 'weddings', label: 'Wedding', location: 'Ely', color: '#402818', img: 'weddings-portfolio-04.jpg', aspect: '2/3' },
  { id: 16, category: 'newborn', label: 'Newborn', location: 'Papworth Everard Studio', color: '#b8a090', img: 'newborn-gallery-04.jpg', aspect: '3/2' },
  { id: 17, category: 'weddings', label: 'Wedding', location: 'Cambridge', color: '#5a3828', img: 'weddings-portfolio-05.jpg', aspect: '2/3' },
  { id: 18, category: 'commercial', label: 'Brand', location: 'Waterbeach Studio', color: '#3a3020', img: 'commercial-brand-01.jpg', aspect: '3/2' },
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

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <>
      <style>{`
        .port-pad { padding: 3rem 1.5rem; }
        .port-hero { padding: 8rem 1.5rem 4rem; }
        .port-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .port-item {
          position: relative;
          overflow: hidden;
          background: #2c2820;
          cursor: pointer;
        }
        .port-item-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .port-item:hover .port-item-inner {
          transform: scale(1.05);
        }
        .port-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .port-item:hover .port-item-overlay {
          opacity: 1;
        }
        .port-item-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.2rem 1.4rem;
          transform: translateY(8px);
          opacity: 0;
          transition: all 0.3s;
        }
        .port-item:hover .port-item-label {
          transform: translateY(0);
          opacity: 1;
        }
        .port-filter-btn {
          font-family: 'Carose', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.5rem 1.1rem;
          border: 1px solid #DDD5C0;
          background: transparent;
          color: #9E9282;
          cursor: pointer;
          transition: all 0.2s;
        }
        .port-filter-btn:hover {
          border-color: #1B3A5C;
          color: #1B3A5C;
        }
        .port-filter-btn.active {
          background: #1B3A5C;
          border-color: #1B3A5C;
          color: #F5F0E8;
        }
        .port-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .port-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .port-pad { padding: 3.5rem 2.5rem; }
          .port-hero { padding: 10rem 2.5rem 4rem; }
          .port-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 900px) {
          .port-pad { padding: 4rem 4rem; }
          .port-hero { padding: 10rem 4rem 5rem; }
          .port-grid { grid-template-columns: repeat(4, 1fr); }
          .port-cta-buttons { flex-direction: row; justify-content: center; }
          .port-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="port-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>
            The portfolio
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Selected work from{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>across the studio.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            Weddings, families, newborn, maternity, and commercial work across Cambridge and Cambridgeshire. Every image is a real session, with real people.
          </p>
        </div>
      </section>

      {/* ─── PORTFOLIO GRID ─── */}
      <section className="port-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Filters */}
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

          {/* Count */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', marginBottom: '1.5rem' }}>
            {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
            {activeFilter !== 'all' ? ` · ${filters.find(f => f.key === activeFilter)?.label}` : ''}
          </p>

          {/* Grid */}
          <div className="port-grid">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="port-item"
                style={{ aspectRatio: item.aspect }}
              >
                <div
                  className="port-item-inner"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: "'Carose', sans-serif",
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.2)',
                    textAlign: 'center',
                    padding: '0 1rem',
                  }}>{item.img}</span>
                </div>
                <div className="port-item-overlay" />
                <div className="port-item-label">
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.75)', marginBottom: '0.2rem' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.5)' }}>{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE PORTFOLIOS ─── */}
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

      {/* ─── CTA ─── */}
      <section className="port-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Like what you see?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s work together
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you&apos;re looking for and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="port-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              View packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}