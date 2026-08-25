import type { Metadata } from 'next';
import { GiftCategoryPage } from '../_shared';

export const metadata: Metadata = {
  title: "Newborn Photography Gift Voucher | Something Blue Productions",
  description:
    "Newborn photography gift voucher from £99 — a calm, unhurried studio session at our Papworth Everard studio. Perfect for baby showers and new-parent gifts.",
  alternates: { canonical: "/gift-vouchers/newborn" },
  openGraph: {
    title: "Newborn Photography Gift Voucher | Something Blue Productions",
    description:
      "Newborn photography gift voucher — studio session at our Papworth Everard studio in Cambridgeshire.",
    url: "https://something-blue-productions.com/gift-vouchers/newborn",
    type: "website",
    images: [
      {
        url: "https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images/services-newborn.jpg",
        width: 1200,
        height: 630,
        alt: "Newborn photography gift voucher",
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://something-blue-productions.com/gift-vouchers/newborn#product',
  name: 'Newborn Photography Gift Voucher',
  description: 'Studio newborn photography session at our Papworth Everard studio in Cambridgeshire.',
  brand: { '@id': 'https://something-blue-productions.com/#organization' },
  category: 'Photography Gift Voucher',
  offers: [
    {
      '@type': 'Offer',
      name: 'Mini Studio Session Voucher',
      price: '99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: 'https://something-blue-productions.com/book',
    },
    {
      '@type': 'Offer',
      name: 'Family Studio Experience Voucher',
      price: '199',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: 'https://something-blue-productions.com/book',
    },
  ],
};

export default function NewbornGiftPage() {
  return (
    <GiftCategoryPage
      slug="newborn"
      title="Newborn Photography Gift Voucher"
      subtitle="Newborn"
      heroImage="services-newborn.jpg"
      heroBg="#4a3830"
      heroKicker="Gift voucher · Newborn photography"
      headline={<>A gentle{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>gift for new parents.</span></>}
      intro="A calm, unhurried studio session for baby's first weeks. A meaningful gift for baby showers, new parents, or grandparents-to-be. Studio in Papworth Everard, Cambridgeshire."
      packageIntro="A newborn studio session in a warm, private space, entirely paced by baby. The recipient chooses their date once baby arrives — we hold flexible availability around due dates."
      packagePrice="£99"
      packageIncludes={[
        '30-minute studio session',
        '5–10 edited images',
        'All images included — no per-image charges',
        'Warm, private studio at Papworth Everard, Cambridgeshire',
        'Recipient books their own date after baby arrives',
      ]}
      whoFor={[
        'Baby shower gift',
        'For new parents',
        'From grandparents',
        'Sibling arriving',
        'First birthday',
      ]}
      serviceHref="/newborn"
      serviceName="newborn photography"
      faqs={[
        {
          q: 'How does the recipient use the voucher?',
          a: 'The voucher includes a code. Once their baby arrives (or when they\'re ready to book), they get in touch, share the code, and we set the date together.',
        },
        {
          q: "What if they'd prefer a longer session?",
          a: "The £199 Family Studio Experience is often chosen for newborn plus siblings and parents together — an hour, 15–20 images, and a free print of their choice. Both vouchers are available on the gift-vouchers page.",
        },
        {
          q: 'When should they book their session?',
          a: 'For newborn work, the ideal window is the first 5–14 days. Recipients get in touch to book once their baby arrives.',
        },
      ]}
      productSchema={productSchema}
    />
  );
}
