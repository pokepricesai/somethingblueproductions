'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d1b2a', padding: '4rem 4rem 2rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* ─── TOP ROW ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(168,202,236,0.1)', marginBottom: '2rem' }}>

          {/* Brand col */}
          <div>
            <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.4rem', color: '#E8DDB5', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Something Blue
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '280px' }}>
              Photography and video for weddings, families, newborn and maternity. Two studio spaces in Cambridgeshire, serving the wider region.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '0.2rem' }}>Papworth Everard Studio</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282' }}>Cambridgeshire · CB23</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '0.2rem' }}>Waterbeach Studio</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282' }}>Near Cambridge · CB25</p>
              </div>
            </div>
          </div>

          {/* Services col */}
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '1.2rem' }}>Services</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Wedding Photography', href: '/weddings/photography' },
                { label: 'Wedding Videography', href: '/weddings/videography' },
                { label: 'Family Photography', href: '/families' },
                { label: 'Newborn Photography', href: '/newborn' },
                { label: 'Maternity Photography', href: '/maternity' },
                { label: 'Studio Sessions', href: '/studio' },
                { label: 'Commercial', href: '/commercial' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8DDB5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9E9282')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations col */}
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '1.2rem' }}>Locations</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Cambridge', href: '/locations/cambridge' },
                { label: 'Ely', href: '/locations/ely' },
                { label: 'Huntingdon', href: '/locations/huntingdon' },
                { label: 'St Ives', href: '/locations/st-ives' },
                { label: 'Newmarket', href: '/locations/newmarket' },
                { label: 'Peterborough', href: '/locations/peterborough' },
                { label: 'All locations', href: '/locations' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8DDB5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9E9282')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info col */}
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: '1.2rem' }}>Information</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'About', href: '/about' },
                { label: 'Packages', href: '/packages' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Journal', href: '/journal' },
                { label: 'Studio Sessions', href: '/studio' },
                { label: 'Enquire', href: '/enquire' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8DDB5')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9E9282')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── BOTTOM ROW ─── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(168,202,236,0.25)', letterSpacing: '0.03em' }}>
            © {new Date().getFullYear()} Something Blue Productions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Cookies', href: '/cookies' },
              { label: 'Sitemap', href: '/sitemap.xml' },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(168,202,236,0.25)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9E9282')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(168,202,236,0.25)')}
              >{link.label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}