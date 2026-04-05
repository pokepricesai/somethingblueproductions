import { createClient } from '@supabase/supabase-js';
import type { MetadataRoute } from 'next';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

const BASE = 'https://something-blue-productions.com';

const LOCATION_SLUGS = [
  'cambridge', 'st-neots', 'huntingdon', 'st-ives', 'ely',
  'newmarket', 'peterborough', 'bedford', 'cambourne', 'waterbeach',
  'papworth-everard', 'soham', 'royston', 'biggleswade', 'sawston',
];

const SERVICE_PAGE_SLUGS = [
  'bedford-family-photographer', 'bedford-newborn-photographer', 'bedford-wedding-photographer', 'bedford-commercial-photographer',
  'biggleswade-family-photographer', 'biggleswade-newborn-photographer', 'biggleswade-wedding-photographer', 'biggleswade-commercial-photographer',
  'cambourne-family-photographer', 'cambourne-newborn-photographer', 'cambourne-wedding-photographer', 'cambourne-commercial-photographer',
  'cambridge-family-photographer', 'cambridge-newborn-photographer', 'cambridge-wedding-photographer', 'cambridge-commercial-photographer',
  'ely-family-photographer', 'ely-newborn-photographer', 'ely-wedding-photographer', 'ely-commercial-photographer',
  'huntingdon-family-photographer', 'huntingdon-newborn-photographer', 'huntingdon-wedding-photographer', 'huntingdon-commercial-photographer',
  'newmarket-family-photographer', 'newmarket-newborn-photographer', 'newmarket-wedding-photographer', 'newmarket-commercial-photographer',
  'papworth-everard-family-photographer', 'papworth-everard-newborn-photographer', 'papworth-everard-wedding-photographer', 'papworth-everard-commercial-photographer',
  'peterborough-family-photographer', 'peterborough-newborn-photographer', 'peterborough-wedding-photographer', 'peterborough-commercial-photographer',
  'royston-family-photographer', 'royston-newborn-photographer', 'royston-wedding-photographer', 'royston-commercial-photographer',
  'sawston-family-photographer', 'sawston-newborn-photographer', 'sawston-wedding-photographer', 'sawston-commercial-photographer',
  'soham-family-photographer', 'soham-newborn-photographer', 'soham-wedding-photographer', 'soham-commercial-photographer',
  'st-ives-family-photographer', 'st-ives-newborn-photographer', 'st-ives-wedding-photographer', 'st-ives-commercial-photographer',
  'st-neots-family-photographer', 'st-neots-newborn-photographer', 'st-neots-wedding-photographer', 'st-neots-commercial-photographer',
  'waterbeach-family-photographer', 'waterbeach-newborn-photographer', 'waterbeach-wedding-photographer', 'waterbeach-commercial-photographer',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const locationPages: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${BASE}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = SERVICE_PAGE_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
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
