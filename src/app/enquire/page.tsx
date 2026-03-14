'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const services = [
  'Wedding Photography',
  'Wedding Videography',
  'Wedding Photography & Videography',
  'Family Photography',
  'Newborn Photography',
  'Maternity Photography',
  'Studio Session',
  'Commercial Photography',
  'Performance & Show Photography',
  'Not sure yet',
];

export default function EnquirePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    const { error } = await supabase.from('enquiries').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', date: '', message: '' });
    }
  };

  const inputStyle = {
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 300,
    color: '#2C2820',
    backgroundColor: '#FAF8F2',
    border: '1px solid #DDD5C0',
    padding: '0.85rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none' as const,
  };

  const labelStyle = {
    fontFamily: "'Carose', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#9E9282',
    display: 'block',
    marginBottom: '0.4rem',
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '10rem 4rem 5rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>
            Get in touch
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#E8DDB5', lineHeight: 1.2, letterSpacing: '0.02em', textTransform: 'none', marginBottom: '1.2rem' }}>
            Tell us about what you&apos;re looking for
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.8 }}>
            A few sentences is enough. We read every message personally and come back to you within 24 hours — usually much sooner.
          </p>
        </div>
      </section>

      {/* ─── FORM + SIDEBAR ─── */}
      <section style={{ backgroundColor: '#F5F0E8', padding: '4rem 4rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '5rem', alignItems: 'start' }}>

          {/* Form */}
          <div>
            {status === 'success' ? (
              <div style={{ padding: '3rem', backgroundColor: '#E8DDB5', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2rem', color: '#1B3A5C', marginBottom: '1rem' }}>Thank you</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#2C2820', lineHeight: 1.8 }}>
                  We&apos;ve received your message and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Your name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Sarah & Tom"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Phone number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="07700 000000"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>What are you looking for?</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239E9282' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                    >
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label style={labelStyle}>When are you thinking? (date or timeframe)</label>
                  <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="e.g. June 2025, or flexible"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Tell us a little more *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Anything you'd like us to know — your venue, location, style preferences, how you found us, or just a general hello."
                    rows={6}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#1B3A5C')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#DDD5C0')}
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    style={{
                      fontFamily: "'Carose', sans-serif",
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      backgroundColor: status === 'sending' ? '#9E9282' : '#1B3A5C',
                      color: '#F5F0E8',
                      border: 'none',
                      padding: '1.1rem 3rem',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.backgroundColor = '#2A5280'; }}
                    onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.backgroundColor = '#1B3A5C'; }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send your enquiry'}
                  </button>
                  {status === 'error' && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#C8572A', marginTop: '0.75rem' }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', marginTop: '0.75rem', lineHeight: 1.6 }}>
                    * Required fields. We&apos;ll never share your details with anyone.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Response time */}
            <div style={{ padding: '1.8rem', backgroundColor: '#E8DDB5' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Response time</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.5rem' }}>Within 24 hours</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.7 }}>Usually much sooner. We read every message personally.</p>
            </div>

            {/* Studios */}
            <div style={{ padding: '1.8rem', border: '1px solid #DDD5C0' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Our studios</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.2rem' }}>Papworth Everard</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.6 }}>Cambridgeshire · CB23<br />Accessible from Cambridge, Huntingdon &amp; the A14</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#DDD5C0' }} />
                <div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.2rem' }}>Waterbeach</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.6 }}>Near Cambridge · CB25<br />Minutes from the city centre &amp; A10</p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div style={{ padding: '1.8rem', border: '1px solid #DDD5C0' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>What happens next</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  'We read your message and come back to you within 24 hours.',
                  'We have a short conversation to make sure everything feels right.',
                  'Once you\'re happy, we confirm your booking.',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.2rem', color: '#DDD5C0', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{i + 1}</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}