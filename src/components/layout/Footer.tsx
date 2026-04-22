import Link from 'next/link';

const CONTACT = {
  email: 'hello@something-blue-productions.com',
  whatsapp: '+447765253340',
  whatsappLink: 'https://wa.me/447765253340',
  instagram: 'https://www.instagram.com/somethingblue.productions',
  facebook: 'https://www.facebook.com/somethingblueproductions',
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1B2A', color: '#E8DDB5', padding: '4rem 1.5rem 2rem' }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto 3rem;
        }
        .footer-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: rgba(245,240,232,0.5);
          text-decoration: none;
          display: block;
          margin-bottom: 0.6rem;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #E8DDB5; }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Carose', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-social-link:hover { color: #E8DDB5; }
        .footer-contact-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: rgba(245,240,232,0.6);
          text-decoration: none;
          margin-bottom: 0.9rem;
          transition: color 0.2s;
        }
        .footer-contact-link:hover { color: #E8DDB5; }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          footer { padding: 4rem 2.5rem 2rem; }
        }
        @media (min-width: 900px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
          footer { padding: 4rem 4rem 2rem; }
        }
      `}</style>

      {/* ── BOOKING BAND ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 3rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,202,236,0.1)', padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Book instantly online</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>Studio sessions from £99 · All images included</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)' }}>Papworth Everard studio · Couple, maternity, newborn, family, headshots</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
            Book a session →
          </Link>
          <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
            Buy a gift voucher →
          </Link>
        </div>
      </div>

      <div className="footer-grid">

        {/* ── Brand + contact ── */}
        <div>
          <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.5rem', color: '#E8DDB5', marginBottom: '1rem' }}>
            Something Blue
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.75, marginBottom: '1.8rem', maxWidth: '260px' }}>
            Photography and video for weddings, families, newborn and maternity. Based in Cambridgeshire with studios in Papworth Everard and Waterbeach.
          </p>

          <a href={`mailto:${CONTACT.email}`} className="footer-contact-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            {CONTACT.email}
          </a>

          <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, color: 'rgba(245,240,232,0.6)' }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            {CONTACT.whatsapp}
          </a>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>

        {/* ── Services ── */}
        <div>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginBottom: '1.2rem' }}>Services</p>
          <Link href="/weddings" className="footer-link">Wedding Photography</Link>
          <Link href="/families" className="footer-link">Family Photography</Link>
          <Link href="/newborn" className="footer-link">Newborn Photography</Link>
          <Link href="/maternity" className="footer-link">Maternity Photography</Link>
          <Link href="/studio" className="footer-link">Studio Sessions</Link>
          <Link href="/commercial" className="footer-link">Commercial</Link>
          <Link href="/commercial/headshots" className="footer-link">Headshots</Link>
          <Link href="/commercial/performance" className="footer-link">Performance Photography</Link>
          <Link href="/prints" className="footer-link">Prints</Link>
        </div>

        {/* ── Book & Information ── */}
        <div>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginBottom: '1.2rem' }}>Book Online</p>
          <Link href="/book" className="footer-link" style={{ color: '#A8CAEC' }}>Book a studio session</Link>
          <Link href="/book" className="footer-link" style={{ color: '#A8CAEC' }}>Buy a gift voucher</Link>
          <Link href="/book" className="footer-link" style={{ color: '#A8CAEC' }}>Redeem a voucher</Link>
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginBottom: '1.2rem' }}>Information</p>
            <Link href="/about" className="footer-link">About us</Link>
            <Link href="/packages" className="footer-link">Packages & pricing</Link>
            <Link href="/portfolio" className="footer-link">Portfolio</Link>
            <Link href="/testimonials" className="footer-link">Testimonials</Link>
            <Link href="/journal" className="footer-link">Journal</Link>
            <Link href="/locations" className="footer-link">Locations</Link>
            <Link href="/enquire" className="footer-link">Enquire</Link>
          </div>
        </div>

        {/* ── Studios + locations ── */}
        <div>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginBottom: '1.2rem' }}>Studios</p>
          <Link href="/studio/papworth-everard" className="footer-link">Papworth Everard — Book online</Link>
          <Link href="/studio/waterbeach" className="footer-link">Waterbeach — Enquire</Link>
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', marginBottom: '1.2rem' }}>Locations</p>
            <Link href="/locations/cambridge" className="footer-link">Cambridge</Link>
            <Link href="/locations/huntingdon" className="footer-link">Huntingdon</Link>
            <Link href="/locations/ely" className="footer-link">Ely</Link>
            <Link href="/locations/peterborough" className="footer-link">Peterborough</Link>
            <Link href="/locations" className="footer-link">All locations →</Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', borderTop: '1px solid rgba(245,240,232,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)' }}>
          © {new Date().getFullYear()} Something Blue Productions. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/enquire" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', textDecoration: 'none' }}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}