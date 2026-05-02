'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Weddings', href: '/weddings' },
  {
    label: 'Family',
    href: '/families',
    dropdown: [
      { label: 'Family Photography', href: '/families' },
      { label: 'Newborn Photography', href: '/newborn' },
      { label: 'Maternity Photography', href: '/maternity' },
    ],
  },
  {
    label: 'Studios',
    href: '/studio',
    dropdown: [
      { label: 'Papworth Everard — Book online', href: '/studio/papworth-everard' },
      { label: 'Waterbeach — Enquire', href: '/studio/waterbeach' },
    ],
  },
  {
    label: 'Commercial',
    href: '/commercial',
    dropdown: [
      { label: 'Brand & Business', href: '/commercial/brand' },
      { label: 'Performance & Show', href: '/commercial/performance' },
      { label: 'Headshots', href: '/commercial/headshots' },
    ],
  },
  { label: 'Packages', href: '/packages' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

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

  const textColor = scrolled ? '#2C2820' : '#ffffff';

  return (
    <>
      <style>{`
        .nav-dropdown-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nav-dropdown-wrap::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 1.2rem;
          background: transparent;
        }
        .nav-dropdown-wrap:hover .nav-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 1.2rem);
          left: 0;
          transform: translateY(-6px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          min-width: 240px;
          background: #FAF8F2;
          border: 1px solid #DDD5C0;
          padding: 0.4rem 0;
          z-index: 200;
          box-shadow: 0 8px 24px rgba(13,27,42,0.12);
        }
        .nav-dropdown a {
          display: block;
          padding: 0.75rem 1.4rem;
          font-family: 'Carose', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2C2820 !important;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .nav-dropdown a:hover {
          background: #F5F0E8;
          color: #1B3A5C !important;
        }
        .nav-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 1.4rem;
          width: 10px;
          height: 6px;
          background: #FAF8F2;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .nav-logo {
          height: 36px;
          width: auto;
          display: block;
          transition: opacity 0.3s;
        }
        .nav-logo:hover { opacity: 0.75; }
        .nav-logo-top { filter: brightness(0) invert(1); }
        .nav-logo-scrolled { filter: none; }
        .nav-chevron {
          display: inline-block;
          width: 0; height: 0;
          border-left: 3.5px solid transparent;
          border-right: 3.5px solid transparent;
          border-top: 4px solid currentColor;
          opacity: 0.6;
          margin-left: 4px;
          flex-shrink: 0;
          position: relative;
          top: 1px;
        }
        .nav-book-btn {
          font-family: 'Carose', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.55rem 1.2rem;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
      `}</style>

      {/* ── MAIN NAV ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '0.8rem 2.5rem' : '1.4rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(245,240,232,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(221,213,192,0.4)' : 'none',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'block', lineHeight: 0 }}>
          <Image src="/logo.png" alt="Something Blue Productions" width={180} height={36} priority className={`nav-logo ${scrolled ? 'nav-logo-scrolled' : 'nav-logo-top'}`} />
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.href} className="nav-dropdown-wrap">
                  <Link href={link.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    {link.label}
                    <span className="nav-chevron" style={{ borderTopColor: textColor }} />
                  </Link>
                  <div className="nav-dropdown">
                    {link.dropdown.map((item) => (
                      <Link key={item.href} href={item.href}>{item.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* Divider */}
            <span style={{ width: '1px', height: '16px', background: scrolled ? 'rgba(44,40,32,0.15)' : 'rgba(255,255,255,0.2)', display: 'inline-block' }} />

            {/* Book button */}
            <Link href="/book" className="nav-book-btn" style={{
              background: scrolled ? '#1B3A5C' : 'rgba(232,221,181,0.9)',
              color: scrolled ? '#E8DDB5' : '#0d1b2a',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Book a session
            </Link>

            {/* Enquire */}
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: scrolled ? '#1B3A5C' : '#ffffff', textDecoration: 'none', border: scrolled ? '1px solid #1B3A5C' : '1px solid rgba(255,255,255,0.5)', padding: '0.55rem 1.3rem', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = scrolled ? '#1B3A5C' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = scrolled ? '#F5F0E8' : '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = scrolled ? '#1B3A5C' : '#ffffff'; }}
            >
              Enquire
            </Link>
          </nav>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"
            style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: scrolled ? '#2C2820' : '#ffffff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: scrolled ? '#2C2820' : '#ffffff', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: scrolled ? '#2C2820' : '#ffffff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        )}
      </header>

      {/* ── MOBILE OVERLAY ── */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          backgroundColor: '#0d1b2a',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}>
          {navLinks.map((link) => (
            <div key={link.href} style={{ textAlign: 'center' }}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileExpandedItem(mobileExpandedItem === link.label ? null : link.label)}
                    style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#F5F0E8', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {link.label}
                    <span style={{ display: 'inline-block', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid rgba(245,240,232,0.5)', transition: 'transform 0.2s', transform: mobileExpandedItem === link.label ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
                  </button>
                  {mobileExpandedItem === link.label && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.6rem', marginBottom: '0.6rem' }}>
                      {link.dropdown.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => { setMenuOpen(false); setMobileExpandedItem(null); }}
                          style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', textDecoration: 'none' }}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#F5F0E8', textDecoration: 'none', display: 'block', padding: '0.3rem 0' }}>
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile menu CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', width: '220px' }}>
            <Link href="/book" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0d1b2a', background: '#E8DDB5', padding: '0.9rem', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Book a session
            </Link>
            <Link href="/book" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0d1b2a', background: '#A8CAEC', padding: '0.9rem', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Buy a gift voucher
            </Link>
            <Link href="/enquire" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8CAEC', border: '1px solid rgba(168,202,236,0.35)', padding: '0.9rem', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Enquire
            </Link>
          </div>

          <div style={{ position: 'absolute', bottom: '6rem', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3D6080' }}>
              Studios in Papworth Everard &amp; Waterbeach
            </p>
          </div>
        </div>
      )}

      {/* ── MOBILE STICKY BAR ── */}
      {isMobile && !menuOpen && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
          display: 'flex', gap: '1px',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.2)',
        }}>
          <Link href="/book" style={{ flex: 1, padding: '1rem 0.5rem', textAlign: 'center', fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', background: '#1B3A5C', color: '#E8DDB5', display: 'block' }}>
            Book session
          </Link>
          <Link href="/book" style={{ flex: 1, padding: '1rem 0.5rem', textAlign: 'center', fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', background: '#A8CAEC', color: '#0d1b2a', display: 'block' }}>
            Gift voucher
          </Link>
          <Link href="/enquire" style={{ flex: 1, padding: '1rem 0.5rem', textAlign: 'center', fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', background: '#E8DDB5', color: '#1B3A5C', display: 'block' }}>
            Enquire
          </Link>
        </div>
      )}
    </>
  );
}