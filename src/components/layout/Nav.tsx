'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Weddings', href: '/weddings' },
  { label: 'Families', href: '/families' },
  { label: 'Newborn', href: '/newborn' },
  { label: 'Studio', href: '/studio' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Journal', href: '/journal' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── MAIN NAV ─── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.8rem 4rem' : '1.4rem 4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(245,240,232,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(221,213,192,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Stay Humble', cursive",
            fontSize: '1.3rem',
            color: scrolled ? '#1B3A5C' : '#ffffff',
            textDecoration: 'none',
            transition: 'color 0.3s',
            letterSpacing: '0.05em',
          }}
        >
          Something Blue
        </Link>

        {/* Desktop links — hidden on mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Carose', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: scrolled ? '#2C2820' : '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enquire"
              style={{
                fontFamily: "'Carose', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: scrolled ? '#1B3A5C' : '#ffffff',
                textDecoration: 'none',
                border: scrolled ? '1px solid #1B3A5C' : '1px solid rgba(255,255,255,0.5)',
                padding: '0.55rem 1.3rem',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = scrolled ? '#1B3A5C' : 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = scrolled ? '#F5F0E8' : '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = scrolled ? '#1B3A5C' : '#ffffff';
              }}
            >
              Enquire
            </Link>
          </nav>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{
              display: 'block', width: '24px', height: '1px',
              backgroundColor: scrolled ? '#2C2820' : '#ffffff',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1px',
              backgroundColor: scrolled ? '#2C2820' : '#ffffff',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1px',
              backgroundColor: scrolled ? '#2C2820' : '#ffffff',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </button>
        )}
      </header>

      {/* ─── MOBILE OVERLAY ─── */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: '#0d1b2a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.8rem',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Stay Humble', cursive",
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                color: '#F5F0E8',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/enquire"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Carose', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A8CAEC',
              border: '1px solid rgba(168,202,236,0.35)',
              padding: '0.9rem 2.5rem',
              marginTop: '1rem',
              textDecoration: 'none',
            }}
          >
            Enquire Now
          </Link>
          <div style={{ position: 'absolute', bottom: '2rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Carose', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#3D6080',
            }}>
              Studios in Papworth Everard &amp; Waterbeach
            </p>
          </div>
        </div>
      )}

      {/* ─── MOBILE STICKY CTA ─── */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
            backgroundColor: 'rgba(13,27,42,0.96)',
            borderTop: '1px solid rgba(168,202,236,0.1)',
            padding: '0.75rem 1.5rem',
          }}
        >
          <Link
            href="/enquire"
            style={{
              display: 'block',
              textAlign: 'center',
              fontFamily: "'Carose', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              backgroundColor: '#1B3A5C',
              padding: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Get in touch →
          </Link>
        </div>
      )}
    </>
  );
}