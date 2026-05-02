import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/book/success', '/thank-you'],
      },
    ],
    sitemap: 'https://something-blue-productions.com/sitemap.xml',
    host: 'https://something-blue-productions.com',
  };
}
