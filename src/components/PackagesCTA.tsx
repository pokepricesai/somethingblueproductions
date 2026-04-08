'use client'

import Link from 'next/link'

interface PackagesCTAProps {
  headline?: string
  subtext?: string
  hasStudioSession?: boolean
}

/**
 * Mid-page CTA block — drop into any service page.
 *
 * Usage:
 *   <PackagesCTA hasStudioSession />                          // studio pages
 *   <PackagesCTA headline="Ready to book your wedding?" />    // bespoke pages
 */
export default function PackagesCTA({
  headline = 'Ready to book?',
  subtext,
  hasStudioSession = false,
}: PackagesCTAProps) {
  const defaultSubtext = hasStudioSession
    ? 'Studio sessions from £99 — book your date instantly online. For outdoor, newborn or bespoke sessions, enquire for a tailored quote.'
    : "Enquire today and we'll put together a bespoke quote around your vision and your story."

  return (
    <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>
            {hasStudioSession ? 'Book instantly · Papworth Everard Studio' : 'Get in touch'}
          </p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
            {headline}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
            {subtext ?? defaultSubtext}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {hasStudioSession && (
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book now — from £99 →
            </Link>
          )}
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
            {hasStudioSession ? 'Or enquire →' : 'Enquire now →'}
          </Link>
          <Link href="/packages" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
            See all packages →
          </Link>
        </div>
      </div>
    </section>
  )
}