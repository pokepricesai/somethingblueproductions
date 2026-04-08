'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Metadata } from 'next'

// ── DATA ─────────────────────────────────────────────────────────────────────

const studioSessions = [
  {
    name: 'Mini Studio Session',
    price: '£99',
    duration: '30 minutes',
    people: '1–2 people',
    images: '5–10 edited images',
    extras: [] as string[],
    highlight: false,
    description:
      'A relaxed, beautifully lit shoot in our Papworth Everard studio. Perfect for couples, individuals, or a quick portrait session.',
  },
  {
    name: 'Family Studio Experience',
    price: '£199',
    duration: '60 minutes',
    people: '3+ people',
    images: '15–20 edited images',
    extras: ['One A3 or A4 print of your choice'],
    highlight: true,
    description:
      'Our most popular studio session. Plenty of time for the whole family — relaxed, fun and full of real moments. Includes a beautiful print to take home.',
  },
]

type Package = {
  name: string
  price: string
  priceSub?: string
  includes: string[]
  description: string
  popular?: boolean
  featured?: boolean
}

type BespokeTab = {
  id: string
  label: string
  intro: string
  packages: Package[]
  enquireOnly?: boolean
}

const bespokeTabs: BespokeTab[] = [
  {
    id: 'family',
    label: 'Family',
    intro:
      'Our family sessions can take place in our Papworth Everard studio or on location — whichever suits your family best. Studio sessions offer a clean, timeless look; outdoor sessions bring in natural light and the beauty of Cambridgeshire.',
    packages: [
      {
        name: 'Package 1',
        price: '£250',
        includes: ['1–2 hour shoot', 'Studio or on location', '20 edited images', 'Online gallery', 'Print release'],
        description: 'A relaxed shoot wherever suits you best. Ideal for families of any size.',
      },
      {
        name: 'Package 2',
        price: '£350',
        includes: ['1–2 hour shoot', 'Studio or on location', 'Cinematic video (1–3 minutes)', '20 edited images', 'Online gallery'],
        description: 'Photography and a beautiful short film — a full record of your family as they are right now.',
        popular: true,
      },
      {
        name: 'Event & Party',
        price: '£300',
        includes: ['2–3 hours event coverage', 'All photos lightly edited', 'Optional cinematic video +£100', 'Optional backdrop & lighting +£50'],
        description: "Birthdays, parties and family gatherings. We capture the moments you're too busy enjoying to photograph yourself.",
      },
    ],
  },
  {
    id: 'bumptobaby',
    label: 'Bump to Baby',
    intro:
      'From the last weeks of pregnancy through to those tiny first days and beyond — our Bump to Baby sessions capture this extraordinary chapter. All sessions take place in our warm, relaxed studio in Papworth Everard.',
    packages: [
      {
        name: 'Package 1',
        price: '£250',
        includes: ['1–2 hour shoot', 'Maternity or Newborn', '20 edited images', 'Online gallery', 'Print release'],
        description: 'A single session — choose maternity or newborn. Beautiful, timeless and unhurried.',
      },
      {
        name: 'Package 2',
        price: '£350',
        includes: ['Two 1–2 hour shoots', 'Maternity + Newborn', '20 edited images per shoot', 'Online gallery', 'Print release'],
        description: 'Capture both milestones — the bump and the baby. Two sessions, 40 images total.',
        popular: true,
      },
      {
        name: 'The Full Journey',
        price: '£450',
        includes: ['Three shoots across your first year', 'Maternity + Newborn + 1 Year', '20 edited images per shoot', 'Online gallery', 'Print release'],
        description: "The complete story — from bump to first birthday. A truly special keepsake of your child's first year.",
        featured: true,
      },
    ],
  },
  {
    id: 'weddings',
    label: 'Weddings',
    intro:
      'Your wedding day, beautifully documented. Samantha captures every emotion and detail through natural, storytelling photography — while Luke creates cinematic video that brings the whole day back to life. Photography and video are available separately or together.',
    packages: [
      {
        name: 'Half Day',
        price: 'From £600',
        priceSub: 'Photos only £600 · Photos + Video £800',
        includes: ['Up to 5 hours coverage', 'Fully edited photos', 'Free engagement shoot', 'Optional cinematic video'],
        description: 'Perfect for intimate ceremonies and smaller celebrations.',
      },
      {
        name: 'Full Day',
        price: 'From £900',
        priceSub: 'Photos only £900 · Photos + Video £1,200',
        includes: ['Getting ready to first dance', 'Fully edited photos', 'Optional cinematic video', 'Free engagement shoot'],
        description: 'Full day coverage from morning preparations right through to the evening.',
        popular: true,
      },
      {
        name: 'Full Day with Film',
        price: '£2,000',
        priceSub: 'Photos + Video included',
        includes: ['Getting ready to first dance', 'Fully edited photos', '10-minute cinematic feature film', '1-minute social media highlight reel', 'Free engagement shoot'],
        description: 'The complete package — stunning photography paired with a full cinematic film.',
        featured: true,
      },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    intro:
      'From headshots and personal branding to product photography and brand campaigns — we create imagery that works as hard as your business does. Every commercial project is quoted individually based on your brief.',
    packages: [],
    enquireOnly: true,
  },
]

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState('family')
  const activeCategory = bespokeTabs.find((t) => t.id === activeTab)!

  return (
    <>
      <style>{`
        .pkg-pad { padding: 3rem 1.5rem; }
        .pkg-studio-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pkg-bespoke-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pkg-trust-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .pkg-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .pkg-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .pkg-studio-grid { grid-template-columns: 1fr 1fr; }
          .pkg-bespoke-grid { grid-template-columns: 1fr 1fr; }
          .pkg-trust-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .pkg-pad { padding: 4rem 4rem; }
          .pkg-bespoke-grid { grid-template-columns: repeat(3, 1fr); }
          .pkg-trust-grid { grid-template-columns: repeat(4, 1fr); }
          .pkg-cta-buttons { flex-direction: row; justify-content: center; }
          .pkg-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: 'clamp(4rem, 8vw, 7rem) 1.5rem clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.7)', marginBottom: '1rem' }}>
          Pricing &amp; Packages
        </p>
        <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#F5F0E8', textTransform: 'none', maxWidth: '680px', margin: '0 auto 1.2rem' }}>
          Two ways to{' '}
          <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)' }}>work with us.</span>
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.65)', maxWidth: '440px', margin: '0 auto' }}>
          Book a studio session online from £99 — instantly, no waiting. Or enquire for a fully bespoke shoot built around your story.
        </p>
      </section>

      {/* ── STUDIO SESSIONS ── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Book instantly online</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Studio Sessions</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.8, color: '#5c5550', maxWidth: '560px', marginTop: '0.75rem' }}>
              Fixed price, no surprises. Pick your session, choose a date and you&apos;re in the diary — our Papworth Everard studio, ready and waiting. Style guide sent with every confirmation.
            </p>
          </div>

          <div className="pkg-studio-grid" style={{ marginBottom: '1rem' }}>
            {studioSessions.map((s) => (
              <div key={s.name} style={{ padding: '2rem 1.8rem', backgroundColor: s.highlight ? '#1B3A5C' : '#FAF8F2', border: s.highlight ? 'none' : '1px solid #DDD5C0', position: 'relative' }}>
                {s.highlight && (
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.3rem' }}>Most popular</p>
                )}
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: s.highlight ? 'rgba(168,202,236,0.6)' : '#9E9282', marginBottom: '0.3rem' }}>{s.name}</p>
                <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2rem', color: s.highlight ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0.25rem' }}>{s.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: s.highlight ? 'rgba(232,221,181,0.45)' : '#9E9282', marginBottom: '1.2rem' }}>fixed price · all images included</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.8, color: s.highlight ? 'rgba(245,240,232,0.65)' : '#5c5550', marginBottom: '1.4rem' }}>
                  {s.description}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.8rem' }}>
                  {[s.duration, s.people, s.images, ...s.extras, 'Style guide included'].map((item) => (
                    <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: s.highlight ? 'rgba(245,240,232,0.65)' : '#5c5550', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: s.highlight ? '#A8CAEC' : '#DDD5C0', flexShrink: 0, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: s.highlight ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${s.highlight ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '2px' }}>
                  Book this session →
                </Link>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282' }}>
            Studio sessions at Papworth Everard, Cambridgeshire (CB23).{' '}
            <Link href="/studio/papworth-everard" style={{ color: '#1B3A5C', textDecoration: 'underline' }}>About the studio →</Link>
          </p>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="pkg-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="pkg-trust-grid">
            {[
              { title: 'All images included', desc: 'No per-image charges. Ever. Every edited image from your session is yours.' },
              { title: 'Style guide sent', desc: 'We send our full style guide with every booking confirmation so you arrive prepared.' },
              { title: 'Photo & video in-house', desc: 'Samantha shoots photography, Luke shoots video. One team, one vision, one day.' },
              { title: 'Valid 12 months', desc: 'Gift vouchers are valid for a full year — plenty of time to find the perfect date.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#1B3A5C', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE INTRO BAND ── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Bespoke sessions</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Looking for something more tailored?
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              Family, Bump to Baby, Weddings, Commercial — all built around your brief.
            </p>
          </div>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
            Enquire about a session →
          </Link>
        </div>
      </section>

      {/* ── BESPOKE SESSIONS (TABBED) ── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Tailored to you</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Bespoke Sessions</h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {bespokeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.4rem',
                  fontFamily: "'Carose', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? '#1B3A5C' : '#E8DDB5',
                  color: activeTab === tab.id ? '#F5F0E8' : '#5c5550',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab intro */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', maxWidth: '620px', marginBottom: '2rem' }}>
            {activeCategory.intro}
          </p>

          {/* Commercial enquire-only */}
          {activeCategory.enquireOnly ? (
            <div style={{ padding: '2.5rem 2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', maxWidth: '520px' }}>
              <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.8rem', color: '#2C2820', marginBottom: '0.75rem' }}>every project is different</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Tell us about your brand, your brief and what you&apos;re trying to achieve — we&apos;ll put together a bespoke quote. Headshots, product photography, brand campaigns and more.
              </p>
              <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>
                Get in touch →
              </Link>
            </div>
          ) : (
            <div className="pkg-bespoke-grid">
              {activeCategory.packages.map((pkg) => (
                <div key={pkg.name} style={{ padding: '2rem 1.8rem', backgroundColor: pkg.featured ? '#1B3A5C' : '#FAF8F2', border: pkg.featured ? 'none' : pkg.popular ? '2px solid #1B3A5C' : '1px solid #DDD5C0', position: 'relative' }}>
                  {pkg.popular && !pkg.featured && (
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1B3A5C', marginBottom: '0.3rem' }}>Most popular</p>
                  )}
                  {pkg.featured && (
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.3rem' }}>✦ Our recommendation</p>
                  )}
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: pkg.featured ? 'rgba(168,202,236,0.6)' : '#9E9282', marginBottom: '0.3rem' }}>{pkg.name}</p>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.5rem', color: pkg.featured ? '#E8DDB5' : '#2C2820', textTransform: 'none', marginBottom: '0' }}>{pkg.price}</p>
                  {pkg.priceSub && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: pkg.featured ? 'rgba(232,221,181,0.45)' : '#9E9282', marginBottom: '1rem' }}>{pkg.priceSub}</p>
                  )}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.8, color: pkg.featured ? 'rgba(245,240,232,0.65)' : '#5c5550', margin: '1rem 0 1.2rem' }}>
                    {pkg.description}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.8rem' }}>
                    {pkg.includes.map((item) => (
                      <li key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: pkg.featured ? 'rgba(245,240,232,0.65)' : '#5c5550', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: pkg.featured ? '#A8CAEC' : '#DDD5C0', flexShrink: 0, display: 'inline-block' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.featured ? '#E8DDB5' : '#1B3A5C', textDecoration: 'none', borderBottom: `1px solid ${pkg.featured ? 'rgba(232,221,181,0.3)' : 'rgba(27,58,92,0.3)'}`, paddingBottom: '2px' }}>
                    Enquire about this package →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="pkg-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center', borderTop: '1px solid #DDD5C0' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Let&apos;s get started</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#2C2820', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready to book?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', lineHeight: 1.8, marginBottom: '2rem' }}>
            Book a studio session instantly online, or drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="pkg-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#1B3A5C', color: '#F5F0E8', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a studio session
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(27,58,92,0.3)', color: '#1B3A5C', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}