import { createClient } from '@supabase/supabase-js';
import type { MetadataRoute } from 'next';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

const BASE = 'https://something-blue-productions.com';

// Bump when the static page in question is meaningfully updated.
// Honest lastModified dates help Google's freshness signal — generating
// `new Date()` on every build looks like spam and slows crawl.
const PAGE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-05-09',
  '/weddings': '2026-05-09',
  '/packages': '2026-05-09',
  '/families': '2026-05-01',
  '/newborn': '2026-05-01',
  '/maternity': '2026-05-01',
  '/studio': '2026-05-01',
  '/studio/papworth-everard': '2026-05-01',
  '/studio/waterbeach': '2026-05-01',
  '/commercial': '2026-05-01',
  '/commercial/brand': '2026-05-01',
  '/commercial/performance': '2026-05-01',
  '/commercial/headshots': '2026-05-01',
  '/portfolio': '2026-05-01',
  '/about': '2026-05-01',
  '/journal': '2026-05-01',
  '/locations': '2026-05-01',
  '/enquire': '2026-05-01',
  '/prints': '2026-05-01',
  '/testimonials': '2026-05-01',
};

const lm = (path: string) => new Date(PAGE_LAST_MODIFIED[path] ?? '2026-05-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: lm('/'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/weddings`, lastModified: lm('/weddings'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/families`, lastModified: lm('/families'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/newborn`, lastModified: lm('/newborn'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/maternity`, lastModified: lm('/maternity'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio`, lastModified: lm('/studio'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio/papworth-everard`, lastModified: lm('/studio/papworth-everard'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio/waterbeach`, lastModified: lm('/studio/waterbeach'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/commercial`, lastModified: lm('/commercial'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/commercial/brand`, lastModified: lm('/commercial/brand'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/commercial/performance`, lastModified: lm('/commercial/performance'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/commercial/headshots`, lastModified: lm('/commercial/headshots'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portfolio`, lastModified: lm('/portfolio'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: lm('/about'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: lm('/journal'), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/locations`, lastModified: lm('/locations'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/enquire`, lastModified: lm('/enquire'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/packages`, lastModified: lm('/packages'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/prints`, lastModified: lm('/prints'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/testimonials`, lastModified: lm('/testimonials'), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const fallback = new Date('2026-05-01');

  const { data: locations } = await supabase.from('locations').select('slug');
  const locationPages: MetadataRoute.Sitemap = (locations || []).map(
    (loc: { slug: string }) => ({
      url: `${BASE}/locations/${loc.slug}`,
      lastModified: fallback,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  );

  const { data: locationServicePages } = await supabase
    .from('location_pages')
    .select('slug')
    .eq('published', true);
  const serviceLocationPages: MetadataRoute.Sitemap = (locationServicePages || []).map(
    (p: { slug: string }) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: fallback,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  );

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('published', true);

  const journalPages: MetadataRoute.Sitemap = (posts || []).map(
    (post: { slug: string; published_at?: string | null }) => ({
      url: `${BASE}/journal/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : fallback,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...locationPages, ...serviceLocationPages, ...journalPages];
}
