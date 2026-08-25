import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://something-blue-productions.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only block routes that must never be crawled. /thank-you and
        // /book/success carry meta robots noindex — leaving them crawlable
        // lets Google actually read that directive and drop them cleanly.
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
