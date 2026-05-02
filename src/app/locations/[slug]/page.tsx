import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

const STORAGE = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images';

const serviceColors: Record<string, string> = {
  family: '#3a4828',
  newborn: '#4a3830',
  wedding: '#5c3d30',
  commercial: '#2c2820',
};

const serviceLabels: Record<string, string> = {
  family: 'Family Photography',
  newborn: 'Newborn Photography',
  wedding: 'Wedding Photography',
  commercial: 'Commercial Photography',
};

const serviceHeroImages: Record<string, string> = {
  family: 'services-families.jpg',
  newborn: 'services-newborn.jpg',
  wedding: 'services-weddings.jpg',
  commercial: 'commercial-brand-card.jpg',
};

export async function generateStaticParams() {
  const { data } = await supabase.from('locations').select('slug');
  return (data || []).map((l: { slug: string }) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: location } = await supabase.from('locations').select('*').eq('slug', slug).single();
  if (!location) return { title: 'Location not found' };
  const url = `https://something-blue-productions.com/locations/${slug}`;
  const description = `Wedding, family, newborn and commercial photography in ${location.name}, ${location.county}. Something Blue Productions — based in Cambridgeshire.`;
  return {
    title: `Photography in ${location.name} | Something Blue Productions`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Photography in ${location.name} | Something Blue Productions`,
      description,
      url,
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: location } = await supabase.from('locations').select('*').eq('slug', slug).single();
  if (!location) notFound();

  const { data: pages } = await supabase
    .from('location_pages')
    .select('*')
    .eq('location_slug', slug)
    .eq('published', true);

  const { data: allLocations } = await supabase
    .from('locations')
    .select('name, slug')
    .neq('slug', slug)
    .order('name')
    .limit(8);

  const locationHeroImg = `${STORAGE}/location-${location.slug}.jpg`;

  const locationUrl = `https://something-blue-productions.com/locations/${slug}`;
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.county || 'Cambridgeshire',
      addressCountry: 'GB',
    },
    url: locationUrl,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://something-blue-productions.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://something-blue-productions.com/locations' },
      { '@type': 'ListItem', position: 3, name: location.name, item: locationUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style>{`
        .lp-pad { padding: 3rem 1.5rem; }
        .lp-hero { padding: 8rem 1.5rem 4rem; }
        .lp-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .lp-nearby-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .lp-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .lp-cta-buttons a { text-align: center; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; }
        .zoom-card:hover .zoom-img { transform: scale(1.025) !important; }

        @media (min-width: 640px) {
          .lp-pad { padding: 3.5rem 2.5rem; }
          .lp-hero { padding: 10rem 2.5rem 4rem; }
          .lp-nearby-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 900px) {
          .lp-pad { padding: 4rem 4rem; }
          .lp-hero { padding: 10rem 4rem 5rem; }
          .lp-services-grid { grid-template-columns: repeat(4, 1fr); }
          .lp-cta-buttons { flex-direction: row; justify-content: center; }
          .lp-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="lp-hero" style={{ maxWidth: '700px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <Link href="/locations" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.6)', textDecoration: 'none' }}>← Locations</Link>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(168,202,236,0.3)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A8CAEC' }}>{location.county}</span>
          </div>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            Photography in{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>{location.name}.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            {location.character}. Something Blue Productions covers {location.name} for weddings, family, newborn and commercial photography.
          </p>
        </div>
      </section>

      {/* ── LOCATION IMAGE ── */}
      <div style={{ width: '100%', aspectRatio: '16/6', maxHeight: '400px', overflow: 'hidden', backgroundColor: '#1b3a5c', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.3)', textAlign: 'center' }}>location-{location.slug}.jpg</span>
        </div>
        <Image src={locationHeroImg} alt={`Photography in ${location.name}`} fill sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>

      {/* ── INTRO ── */}
      <section className="lp-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>About this area</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
            {location.character}.
          </p>
          {location.shoot_spots && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550', marginBottom: '1rem' }}>
              <strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.75rem', color: '#2C2820', letterSpacing: '0.05em' }}>Great shoot locations: </strong>
              {location.shoot_spots}
            </p>
          )}
          {location.nearest_studio && (
            <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', backgroundColor: '#E8DDB5', borderLeft: '3px solid #1B3A5C' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', color: '#1B3A5C', textTransform: 'none' }}>
                Our {location.nearest_studio} studio is {location.distance_miles} {location.distance_miles === 1 ? 'mile' : 'miles'} away — ideal for newborn, family and maternity sessions whatever the weather.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── PRICING NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Book instantly · Papworth Everard Studio</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Studio sessions from £99 — all images included
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              Or enquire about outdoor and bespoke sessions in {location.name}.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session →
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
              Enquire →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE PAGES ── */}
      <section className="lp-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Services in {location.name}</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>What we offer here</h2>
          </div>
          <div className="lp-services-grid">
            {(pages || []).map((page) => (
              <Link key={page.slug} href={`/${page.slug}`} className="zoom-card" style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: serviceColors[page.service] || '#2c2820', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{serviceHeroImages[page.service]}</span>
                </div>
                <Image src={`${STORAGE}/${serviceHeroImages[page.service] || 'services-families.jpg'}`} alt={`${serviceLabels[page.service]} in ${location.name}`} fill className="zoom-img" sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', zIndex: 2 }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.5vw, 1.1rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.3rem' }}>{serviceLabels[page.service]}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.6)' }}>in {location.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEARBY LOCATIONS ── */}
      {allLocations && allLocations.length > 0 && (
        <section className="lp-pad" style={{ backgroundColor: '#F5F0E8' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Also available</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Nearby areas we cover</h2>
            </div>
            <div className="lp-nearby-grid">
              {allLocations.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} style={{ padding: '1.2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', textDecoration: 'none', display: 'block' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none' }}>{loc.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="lp-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Book a session in {location.name}</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s work together
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you&apos;re looking for and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="lp-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}