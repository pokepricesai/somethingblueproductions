import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

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

const serviceLinks: Record<string, string> = {
  family: '/families',
  newborn: '/newborn',
  wedding: '/weddings',
  commercial: '/commercial',
};

type FAQ = { q: string; a: string };

export async function generateMetadata({ params }: { params: Promise<{ locationservice: string }> }): Promise<Metadata> {
  const { locationservice } = await params;
  const { data: page } = await supabase
    .from('location_pages')
    .select('title, meta_description')
    .eq('slug', locationservice)
    .single();
  if (!page) return { title: 'Page not found' };
  return {
    title: page.title,
    description: page.meta_description,
  };
}

export default async function LocationServicePage({ params }: { params: Promise<{ locationservice: string }> }) {
  const { locationservice } = await params;

  const { data: page } = await supabase
    .from('location_pages')
    .select('*')
    .eq('slug', locationservice)
    .eq('published', true)
    .single();

  if (!page) notFound();

  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', page.location_slug)
    .single();

  if (!location) notFound();

  const { data: relatedPages } = await supabase
    .from('location_pages')
    .select('slug, service')
    .eq('location_slug', page.location_slug)
    .neq('slug', locationservice)
    .eq('published', true);

  const { data: nearbyPages } = await supabase
    .from('location_pages')
    .select('slug, location_slug')
    .eq('service', page.service)
    .neq('location_slug', page.location_slug)
    .eq('published', true)
    .limit(4);

  const nearbySlugs = (nearbyPages || []).map((p: { location_slug: string }) => p.location_slug);

  const { data: nearbyLocations } = nearbySlugs.length > 0
    ? await supabase.from('locations').select('name, slug').in('slug', nearbySlugs)
    : { data: [] };

  let faqs: FAQ[] = [];
  try {
    const raw = page.faqs;
    faqs = typeof raw === 'string' ? JSON.parse(raw) : (Array.isArray(raw) ? raw : []);
  } catch {
    faqs = [];
  }

  const serviceLabel = serviceLabels[page.service as string] || 'Photography';
  const heroColor = serviceColors[page.service as string] || '#2c2820';
  const serviceLink = serviceLinks[page.service as string] || '/';

  const bodyParagraphs: string[] = typeof page.body === 'string'
    ? page.body.split('\n\n').filter((p: string) => p.trim().length > 0)
    : [];

  const shootSpots: string[] = location.shoot_spots
    ? location.shoot_spots.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <style>{`
        .lsp-pad { padding: 3rem 1.5rem; }
        .lsp-hero-content { padding: 0 1.5rem 6rem; }
        .lsp-related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .lsp-nearby-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .lsp-faqs { max-width: 100%; }
        .lsp-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .lsp-cta-buttons a { text-align: center; }

        @media (min-width: 640px) {
          .lsp-pad { padding: 3.5rem 2.5rem; }
          .lsp-hero-content { padding: 0 2.5rem 6rem; }
          .lsp-related-grid { grid-template-columns: repeat(3, 1fr); }
          .lsp-nearby-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (min-width: 900px) {
          .lsp-pad { padding: 4rem 4rem; }
          .lsp-hero-content { padding: 0 4rem 5rem; }
          .lsp-faqs { max-width: 780px; margin: 0 auto; }
          .lsp-cta-buttons { flex-direction: row; justify-content: center; }
          .lsp-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: heroColor, minHeight: '80svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: heroColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.15)', textAlign: 'center' }}>
            {page.service}-hero.jpg
          </span>
        </div>
        <div className="lsp-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link href={`/locations/${location.slug}`} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', textDecoration: 'none' }}>
              {location.name}
            </Link>
            <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.7rem' }}>·</span>
            <Link href={serviceLink} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', textDecoration: 'none' }}>
              {serviceLabel}
            </Link>
          </div>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '700px' }}>
            {page.title}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '440px' }}>
            {page.intro}
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire about a session →
          </Link>
        </div>
      </section>

      {/* ─── STUDIO DISTANCE ─── */}
      {location.nearest_studio && (
        <section style={{ backgroundColor: '#1B3A5C', padding: '1.2rem 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A8CAEC' }}>Studio</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(168,202,236,0.4)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.8)' }}>
              Our {location.nearest_studio} studio is just {location.distance_miles} {location.distance_miles === 1 ? 'mile' : 'miles'} away — perfect for indoor sessions whatever the weather.
            </span>
            <Link href={`/studio/${location.nearest_studio.toLowerCase().replace(/ /g, '-')}`} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)', paddingBottom: '1px', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
              View studio →
            </Link>
          </div>
        </section>
      )}

      {/* ─── BODY CONTENT ─── */}
      <section className="lsp-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {bodyParagraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#2C2820', marginBottom: '1.5rem' }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ─── SHOOT SPOTS ─── */}
      {shootSpots.length > 0 && (
        <section className="lsp-pad" style={{ backgroundColor: '#E8DDB5' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>
              Great locations in {location.name}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {shootSpots.map((spot) => (
                <span key={spot} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#2C2820', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', padding: '0.5rem 1rem' }}>
                  {spot}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQs ─── */}
      {faqs.length > 0 && (
        <section className="lsp-pad" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="lsp-faqs">
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Questions</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>
                {serviceLabel} in {location.name} — FAQs
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── OTHER SERVICES IN THIS LOCATION ─── */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="lsp-pad" style={{ backgroundColor: '#0d1b2a' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Also in {location.name}</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Other services we offer here</h2>
            </div>
            <div className="lsp-related-grid">
              {relatedPages.map((rel: { slug: string; service: string }) => {
                const relLabel = serviceLabels[rel.service] || rel.service;
                const relColor = serviceColors[rel.service] || '#2c2820';
                return (
                  <Link key={rel.slug} href={`/${rel.slug}`} style={{ padding: '1.8rem', backgroundColor: relColor, textDecoration: 'none', display: 'block' }}>
                    <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: '#ffffff', textTransform: 'none', marginBottom: '0.3rem' }}>{relLabel}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.55)' }}>in {location.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── SAME SERVICE NEARBY ─── */}
      {nearbyLocations && nearbyLocations.length > 0 && (
        <section className="lsp-pad" style={{ backgroundColor: '#E8DDB5' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Nearby areas</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>{serviceLabel} near {location.name}</h2>
            </div>
            <div className="lsp-nearby-grid">
              {(nearbyLocations as { name: string; slug: string }[]).map((loc) => {
                const nearbySlug = (nearbyPages || []).find((p: { location_slug: string; slug: string }) => p.location_slug === loc.slug)?.slug;
                return (
                  <Link key={loc.slug} href={nearbySlug ? `/${nearbySlug}` : `/locations/${loc.slug}`} style={{ padding: '1.2rem', backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', textDecoration: 'none', display: 'block' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.2rem' }}>{loc.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{serviceLabel}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="lsp-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>
            Book a session in {location.name}
          </p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s talk about your session
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Tell us what you&apos;re looking for and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="lsp-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href={serviceLink} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              About {serviceLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}