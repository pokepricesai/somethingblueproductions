'use client'

import Link from 'next/link'
import { useState } from 'react'

// ── DATA ─────────────────────────────────────────────────────────────────────

const studioSessions = [
  {
    name: 'Mini Studio Session',
    duration: '30 minutes',
    people: '1–2 people',
    images: '5–10 edited images',
    extras: [] as string[],
    price: 99,
    highlight: false,
    description:
      'Perfect for couples, individuals, or a small portrait session. A relaxed, beautifully lit shoot in our Papworth Everard studio — in and out in half an hour.',
  },
  {
    name: 'Family Studio Experience',
    duration: '60 minutes',
    people: '3+ people',
    images: '15–20 edited images',
    extras: ['One A3 or A4 print of your choice'],
    price: 199,
    highlight: true,
    description:
      'Our most popular studio session. Plenty of time for the whole family — relaxed, fun and full of real moments. Includes a beautiful print to take home.',
  },
]

type Package = {
  name: string
  price: string
  priceSub?: string
  highlights: string[]
  description: string
  popular: boolean
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
      'Our family sessions can take place in our Papworth Everard studio or on location — whichever suits your family best. Studio sessions offer a clean, timeless look; outdoor sessions bring in natural light and the beauty of Cambridgeshire. Both are relaxed, unhurried and full of real moments.',
    packages: [
      {
        name: 'Package 1',
        price: '£250',
        highlights: ['1–2 hour shoot', 'Studio or on location', '20 edited images'],
        description:
          'A relaxed shoot wherever suits you best. Ideal for families of any size — in our studio or out in the Cambridgeshire countryside.',
        popular: false,
      },
      {
        name: 'Package 2',
        price: '£350',
        highlights: ['1–2 hour shoot', 'Studio or on location', 'Cinematic video (1–3 minutes)', '20 edited images'],
        description:
          'Photography and a beautiful short film — a full record of your family as they are right now.',
        popular: true,
      },
      {
        name: 'Event & Party',
        price: '£300',
        highlights: [
          '2–3 hours event coverage',
          'All photos lightly edited',
          'Optional cinematic video +£100',
          'Optional backdrop & lighting +£50',
        ],
        description:
          "Birthdays, parties and family gatherings. We capture the moments you're too busy enjoying to photograph yourself.",
        popular: false,
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
        highlights: ['1–2 hour shoot', 'Maternity or Newborn', '20 edited images'],
        description:
          'A single session — choose maternity or newborn. Beautiful, timeless and unhurried.',
        popular: false,
      },
      {
        name: 'Package 2',
        price: '£350',
        highlights: ['Two 1–2 hour shoots', 'Maternity + Newborn', '20 edited images per shoot'],
        description:
          'Capture both milestones — the bump and the baby. Two sessions, 40 images total.',
        popular: true,
      },
      {
        name: 'The Full Journey',
        price: '£450',
        highlights: [
          'Three shoots across your first year',
          'Maternity + Newborn + 1 Year',
          '20 edited images per shoot',
        ],
        description:
          "The complete story — from bump to first birthday. A truly special keepsake of your child's first year.",
        popular: false,
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
        highlights: [
          'Up to 5 hours coverage',
          'Fully edited photos',
          'Free engagement shoot',
          'Optional cinematic video',
        ],
        description:
          'Perfect for intimate ceremonies and smaller celebrations. All the key moments, beautifully captured.',
        popular: false,
      },
      {
        name: 'Full Day',
        price: 'From £900',
        priceSub: 'Photos only £900 · Photos + Video £1,200',
        highlights: [
          'Getting ready to first dance',
          'Fully edited photos',
          'Optional cinematic video',
          'Free engagement shoot',
        ],
        description:
          'Full day coverage from the morning preparations right through to the evening celebrations.',
        popular: true,
      },
      {
        name: 'Full Day with Film',
        price: '£2,000',
        priceSub: 'Photos + Video included',
        highlights: [
          'Getting ready to first dance',
          'Fully edited photos',
          '10-minute cinematic feature film',
          '1-minute social media highlight reel',
          'Free engagement shoot',
        ],
        description:
          'The complete package — stunning photography paired with a full cinematic film. A 10-minute feature and a shareable 1-minute cut.',
        popular: false,
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
    <main style={{ backgroundColor: '#F5F0E8', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0D1B2A' }}>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.4rem', color: '#A8CAEC', marginBottom: '12px' }}>
          pricing &amp; packages
        </p>
        <h1
          style={{
            fontFamily: "'Carose', sans-serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: '#F5F0E8',
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '720px',
            margin: '0 auto 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Two ways to work with us
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#A8CAEC', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
          Book a studio session online from £99 — instantly, no waiting. Or enquire for a fully bespoke shoot built around your story.
        </p>
      </section>

      <div style={{ height: '4px', background: 'linear-gradient(90deg, #C8572A 0%, #A8CAEC 100%)' }} />

      {/* ══ STUDIO SESSIONS ══ */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', backgroundColor: '#C8572A', color: '#F5F0E8',
            fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '6px 20px', borderRadius: '2px', marginBottom: '20px',
          }}>
            Book instantly online
          </span>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1B3A5C', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Studio Sessions
          </h2>
          <p style={{ color: '#1B3A5C', opacity: 0.7, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Fixed price, no surprises. Pick your session, choose a date and you&apos;re booked — our Papworth Everard studio, ready and waiting. Style guide sent with every confirmation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {studioSessions.map((s) => (
            <div key={s.name} style={{
              backgroundColor: s.highlight ? '#1B3A5C' : '#fff',
              borderRadius: '4px', padding: '40px 36px',
              border: s.highlight ? 'none' : '1px solid #E8DDB5',
              display: 'flex', flexDirection: 'column', position: 'relative',
              boxShadow: s.highlight ? '0 20px 60px rgba(27,58,92,0.2)' : '0 4px 20px rgba(27,58,92,0.06)',
            }}>
              {s.highlight && (
                <span style={{
                  position: 'absolute', top: '-13px', left: '36px',
                  backgroundColor: '#C8572A', color: '#fff',
                  fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', padding: '5px 16px', borderRadius: '2px',
                }}>Most popular</span>
              )}
              <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: s.highlight ? '#F5F0E8' : '#1B3A5C', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                {s.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '2.8rem', fontWeight: 700, color: s.highlight ? '#A8CAEC' : '#C8572A', lineHeight: 1 }}>
                  £{s.price}
                </span>
                <span style={{ fontSize: '0.85rem', color: s.highlight ? '#A8CAEC' : '#1B3A5C', opacity: 0.65 }}>fixed price</span>
              </div>
              <p style={{ fontSize: '0.93rem', lineHeight: 1.7, color: s.highlight ? '#A8CAEC' : '#1B3A5C', opacity: 0.85, marginBottom: '24px', flex: 1 }}>
                {s.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {[s.duration, s.people, s.images, ...s.extras, 'Style guide included'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: s.highlight ? '#E8DDB5' : '#1B3A5C', lineHeight: 1.4 }}>
                    <span style={{ color: s.highlight ? '#A8CAEC' : '#C8572A', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book" style={{
                display: 'block', textAlign: 'center', padding: '14px 24px',
                backgroundColor: s.highlight ? '#C8572A' : '#1B3A5C', color: '#F5F0E8',
                fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px',
              }}>
                Book Now
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#1B3A5C', opacity: 0.55 }}>
          Studio sessions at Papworth Everard, Cambridgeshire (CB23).{' '}
          <Link href="/studio/papworth-everard" style={{ color: '#C8572A', textDecoration: 'underline' }}>About the studio →</Link>
        </p>
      </section>

      {/* ── SECTION BREAK ── */}
      <div style={{
        background: 'linear-gradient(135deg, #E8DDB5 0%, #F5F0E8 100%)',
        borderTop: '1px solid #E0D5A8', borderBottom: '1px solid #E0D5A8',
        padding: '52px 24px', textAlign: 'center',
      }}>
        <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.6rem', color: '#1B3A5C', marginBottom: '10px' }}>
          looking for something more bespoke?
        </p>
        <p style={{ fontSize: '0.95rem', color: '#1B3A5C', opacity: 0.7, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Our bespoke sessions are built around you — your story, your people, your vision. Explore the options below and get in touch for a tailored quote.
        </p>
      </div>

      {/* ══ BESPOKE — TABBED ══ */}
      <section style={{ padding: '72px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', backgroundColor: '#A8CAEC', color: '#1B3A5C',
            fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '6px 20px', borderRadius: '2px', marginBottom: '20px',
          }}>
            Bespoke &amp; tailored
          </span>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1B3A5C', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Bespoke Sessions
          </h2>
        </div>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          {bespokeTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '10px 24px',
              fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              border: activeTab === tab.id ? 'none' : '1px solid #1B3A5C',
              backgroundColor: activeTab === tab.id ? '#1B3A5C' : 'transparent',
              color: activeTab === tab.id ? '#F5F0E8' : '#1B3A5C',
              borderRadius: '2px', cursor: 'pointer',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab intro */}
        <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: '#1B3A5C', opacity: 0.75, maxWidth: '620px', margin: '0 auto 40px', textAlign: 'center' }}>
          {activeCategory.intro}
        </p>

        {/* Commercial — enquire only */}
        {activeCategory.enquireOnly ? (
          <div style={{ backgroundColor: '#fff', border: '1px solid #E8DDB5', borderRadius: '4px', padding: '56px 40px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            <p style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.5rem', color: '#1B3A5C', marginBottom: '16px' }}>
              every project is different
            </p>
            <p style={{ fontSize: '0.93rem', color: '#1B3A5C', opacity: 0.7, lineHeight: 1.7, marginBottom: '32px' }}>
              Tell us about your brand, your brief and what you&apos;re trying to achieve — we&apos;ll put together a bespoke quote. Headshots, product photography, brand campaigns and more.
            </p>
            <Link href="/enquire" style={{
              display: 'inline-block', padding: '14px 36px', backgroundColor: '#1B3A5C', color: '#F5F0E8',
              fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px',
            }}>
              Get in Touch
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {activeCategory.packages.map((pkg) => (
              <div key={pkg.name} style={{
                backgroundColor: pkg.featured ? '#1B3A5C' : '#fff',
                border: pkg.featured ? 'none' : pkg.popular ? '2px solid #1B3A5C' : '1px solid #E8DDB5',
                borderRadius: '4px', padding: '32px 28px',
                display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative',
                boxShadow: pkg.featured ? '0 20px 60px rgba(27,58,92,0.18)' : 'none',
              }}>
                {pkg.popular && !pkg.featured && (
                  <span style={{
                    position: 'absolute', top: '-12px', left: '24px',
                    backgroundColor: '#1B3A5C', color: '#F5F0E8',
                    fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '4px 14px', borderRadius: '2px',
                  }}>Most popular</span>
                )}
                {pkg.featured && (
                  <span style={{
                    position: 'absolute', top: '-12px', left: '24px',
                    backgroundColor: '#C8572A', color: '#F5F0E8',
                    fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '4px 14px', borderRadius: '2px',
                  }}>✦ Our recommendation</span>
                )}

                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: pkg.featured ? '#F5F0E8' : '#1B3A5C', letterSpacing: '-0.01em' }}>
                  {pkg.name}
                </h3>

                <div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: pkg.featured ? '#A8CAEC' : '#C8572A', margin: 0 }}>
                    {pkg.price}
                  </p>
                  {pkg.priceSub && (
                    <p style={{ fontSize: '0.78rem', color: pkg.featured ? '#A8CAEC' : '#1B3A5C', opacity: 0.65, margin: '3px 0 0' }}>
                      {pkg.priceSub}
                    </p>
                  )}
                </div>

                <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: pkg.featured ? '#A8CAEC' : '#1B3A5C', opacity: 0.85, flex: 1 }}>
                  {pkg.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pkg.highlights.map((h) => (
                    <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '0.85rem', color: pkg.featured ? '#E8DDB5' : '#1B3A5C', lineHeight: 1.4 }}>
                      <span style={{ color: pkg.featured ? '#A8CAEC' : '#C8572A', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href="/enquire" style={{
                  display: 'block', textAlign: 'center', marginTop: '8px', padding: '12px 20px',
                  backgroundColor: pkg.featured ? '#C8572A' : 'transparent',
                  border: pkg.featured ? 'none' : '1px solid #1B3A5C',
                  color: pkg.featured ? '#F5F0E8' : '#1B3A5C',
                  fontFamily: "'Carose', sans-serif", fontSize: '0.8rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px',
                }}>
                  Enquire About This Package
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── REASSURANCE STRIP ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '56px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px', textAlign: 'center' }}>
          {[
            { icon: '✓', label: 'All images included', sub: 'No per-image charges. Ever.' },
            { icon: '✓', label: 'Style guide sent', sub: 'With every booking confirmation' },
            { icon: '12', label: 'Months validity', sub: 'Gift vouchers valid a full year' },
            { icon: '✓', label: 'Photo & video in-house', sub: 'Shot by Samantha & Luke' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.8rem', color: '#C8572A', fontWeight: 700, marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#F5F0E8', fontWeight: 700, marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '0.82rem', color: '#A8CAEC', lineHeight: 1.5 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '72px 24px', textAlign: 'center', backgroundColor: '#F5F0E8' }}>
        <h2 style={{ fontFamily: "'Carose', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#1B3A5C', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: '1rem', color: '#1B3A5C', opacity: 0.7, maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Book a studio session instantly, or drop us a message and we&apos;ll get back to you within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/book" style={{
            padding: '15px 36px', backgroundColor: '#C8572A', color: '#F5F0E8',
            fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px',
          }}>
            Book a Studio Session
          </Link>
          <Link href="/enquire" style={{
            padding: '15px 36px', border: '1px solid #1B3A5C', color: '#1B3A5C',
            fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px',
          }}>
            Send an Enquiry
          </Link>
        </div>
      </section>

    </main>
  )
}