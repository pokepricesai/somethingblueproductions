import { createClient } from '@supabase/supabase-js';
import type { MetadataRoute } from 'next';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

const BASE = 'https://something-blue-productions.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/weddings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/families`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/newborn`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/maternity`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio/papworth-everard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/studio/waterbeach`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/commercial`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/commercial/brand`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/commercial/performance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/commercial/headshots`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/locations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/enquire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Location pages from Supabase
  const { data: locations } = await supabase
    .from('locations')
    .select('slug, updated_at');

  const locationPages: MetadataRoute.Sitemap = (locations || []).map((loc) => ({
    url: `${BASE}/locations/${loc.slug}`,
    lastModified: loc.updated_at ? new Date(loc.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Location service pages from Supabase
  const { data: locationServicePages } = await supabase
    .from('location_pages')
    .select('slug, updated_at');

  const serviceLocationPages: MetadataRoute.Sitemap = (locationServicePages || []).map((page) => ({
    url: `${BASE}/locations/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Journal posts from Supabase
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('published', true);

  const journalPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${BASE}/journal/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...locationPages, ...serviceLocationPages, ...journalPages];
}
