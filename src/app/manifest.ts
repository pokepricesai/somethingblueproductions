import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Something Blue Productions',
    short_name: 'Something Blue',
    description:
      'Wedding, family, newborn and maternity photography in Papworth Everard, Cambridgeshire.',
    start_url: '/',
    display: 'browser',
    background_color: '#F5F0E8',
    theme_color: '#234D6C',
    icons: [
      {
        src: '/brand/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
