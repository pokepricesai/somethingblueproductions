'use client';

import { useState } from 'react';

const supabaseUrl = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y';

const CONTACT = {
  email: 'hello@something-blue-productions.com',
  whatsapp: '+447765253340',
  whatsappLink: 'https://wa.me/447765253340',
  instagram: 'https://www.instagram.com/somethingblue.productions',
};

const services = [
  'Wedding Photography',
  'Wedding Videography',
  'Wedding Photography & Videography',
  'Family Photography',
  'Newborn Photography',
  'Maternity Photography',
  'Headshots',
  'Brand & Business Photography',
  'Performance & Show Photography',
  'Extended Studio Session',
  'Outdoor Session',
  'Multi-outfit Shoot',
  'Other',
];

export default function EnquirePage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');

      // Send email alert to Samantha
      await fetch('/api/send-enquiry-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      window.location.href = '/thank-you';
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <style>{`
        .eq-pad { padding: 3rem 1.5rem; }
        .eq-hero { padding: 8rem 1.5rem 4rem; }
        .eq-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; max-width: 1100px; margin: 0 auto; }
        .eq-contact-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.2rem 1.5rem;
          background: #FAF8F2; border: 1px solid #DDD5C0;
          text-decoration: none; margin-bottom: 0.75rem;
          transition: border-color 0.2s;
        }
        .eq-contact-card:hover { border-color: #1B3A5C; }
        .eq-input {
          width: 100%; padding: 0.85rem 1rem;
          font-family: 'Inter', sans-serif; font-size: 0.88rem;
          border: 1px solid #DDD5C0; background: #FAF8F2;
          color: #2C2820; outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .eq-input:focus { border-color: #1B3A5C; }
        .eq-label {
          font-family: 'Carose', sans-serif; font-size: 0.65rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #9E9282; display: block; margin-bottom: 0.4rem;
        }
        .eq-field { margin-bottom: 1.2rem; }
        .eq-submit {
          width: 100%; padding: 1rem;
          font-family: 'Carose', sans-serif; font-size: 0.68rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: #1B3A5C; color: #F5F0E8;
          border: none; cursor: pointer;
          transition: background 0.2s;
        }
        .eq-submit:hover { background: #0d1b2a; }
        .eq-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .eq-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (min-width: 640px) {
          .eq-pad { padding: 3.5rem 2.5rem; }
          .eq-hero { padding: 10rem 2.5rem 4rem; }
        }
        @media (min-width: 900px) {
          .eq-pad { padding: 4rem 4rem; }
          .eq-hero { padding: 10rem 4rem 5rem; }
          .eq-grid { grid-template-columns: 1fr 1.5fr; align-items: start; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="eq-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Get in touch</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Let&apos;s talk about your{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>session.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '480px' }}>
            Fill in the form and we&apos;ll come back to you within 24 hours — usually much sooner. Or reach out directly below.
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="eq-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="eq-grid">

          {/* Left — contact + studio info */}
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Reach us directly</p>

            <a href={`mailto:${CONTACT.email}`} className="eq-contact-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.2rem' }}>Email</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#2C2820' }}>{CONTACT.email}</p>
              </div>
            </a>

            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="eq-contact-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1B3A5C" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              <div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.2rem' }}>WhatsApp — click to chat</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#2C2820' }}>{CONTACT.whatsapp}</p>
              </div>
            </a>

            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="eq-contact-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.2rem' }}>Instagram</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#2C2820' }}>@somethingblue.productions</p>
              </div>
            </a>

            {/* Studio info */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Our studios</p>

              <div style={{ background: '#FAF8F2', border: '1px solid #DDD5C0', padding: '1.25rem 1.5rem', marginBottom: '2px' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.75rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.35rem' }}>Papworth Everard · CB23</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65 }}>
                  Our bookable studio — available for couple, maternity, newborn, family and headshot sessions. Book directly online from £99.
                </p>
                <a href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '1px', display: 'inline-block', marginTop: '0.75rem' }}>Book a session →</a>
              </div>

              <div style={{ background: '#FAF8F2', border: '1px solid #DDD5C0', padding: '1.25rem 1.5rem' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.75rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.35rem' }}>Waterbeach · CB25</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65 }}>
                  Available for larger, more in-depth shoots — extended sessions, multiple outfits, outdoor combinations, video and bespoke projects. Please enquire below.
                </p>
              </div>
            </div>

            {/* Quick book nudge */}
            <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: '#0d1b2a' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Want to book right now?</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
                Studio sessions at Papworth Everard can be booked and paid for instantly online.
              </p>
              <a href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: '#1B3A5C', color: '#E8DDB5', padding: '0.7rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a studio session →</a>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', padding: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Send us a message</p>

            <form onSubmit={handleSubmit}>
              <div className="eq-field">
                <label className="eq-label">Your name *</label>
                <input className="eq-input" type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name" />
              </div>

              <div className="eq-two-col">
                <div className="eq-field">
                  <label className="eq-label">Email *</label>
                  <input className="eq-input" type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com" />
                </div>
                <div className="eq-field">
                  <label className="eq-label">Phone</label>
                  <input className="eq-input" type="tel" value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Optional" />
                </div>
              </div>

              <div className="eq-field">
                <label className="eq-label">Service *</label>
                <select className="eq-input" required value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="eq-field">
                <label className="eq-label">Preferred date</label>
                <input className="eq-input" type="text" value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. June 2025, or flexible" />
              </div>

              <div className="eq-field">
                <label className="eq-label">Tell us more *</label>
                <textarea className="eq-input" required rows={5} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us a bit about what you're looking for..."
                  style={{ resize: 'vertical' }} />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#C8572A', marginBottom: '1rem' }}>
                  Something went wrong. Please email us directly at {CONTACT.email}
                </p>
              )}

              <button className="eq-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send enquiry →'}
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '1rem', textAlign: 'center', lineHeight: 1.6 }}>
                We read every message personally and respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}