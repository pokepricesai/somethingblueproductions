import type { Metadata } from 'next';
import { GiftCategoryPage } from '../_shared';

export const metadata: Metadata = {
  title: "Family Photography Gift Voucher",
  description:
    "Family photography gift voucher — £199 for a 60-minute studio session for 3+ people, 15–20 edited images and a free print. Papworth Everard studio, Cambridgeshire.",
  alternates: { canonical: "/gift-vouchers/family" },
  openGraph: {
    title: "Family Photography Gift Voucher | Something Blue Productions",
    description:
      "Family photography gift voucher — 60-minute studio session at our Papworth Everard studio in Cambridgeshire.",
    url: "https://something-blue-productions.com/gift-vouchers/family",
    type: "website",
    images: [
      {
        url: "https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images/services-families.jpg",
        width: 1200,
        height: 630,
        alt: "Family photography gift voucher",
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://something-blue-productions.com/gift-vouchers/family#product',
  name: 'Family Photography Gift Voucher',
  description: 'Family studio photography session for 3+ people at our Papworth Everard studio in Cambridgeshire.',
  brand: { '@id': 'https://something-blue-productions.com/#organization' },
  category: 'Photography Gift Voucher',
  offers: [
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

export default function FamilyGiftPage() {
  return (
    <GiftCategoryPage
      slug="family"
      title="Family Photography Gift Voucher"
      subtitle="Family"
      heroImage="services-families.jpg"
      heroBg="#3a4828"
      heroKicker="Gift voucher · Family photography"
      headline={<>An hour together{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>in the studio.</span></>}
      intro="An hour in our Papworth Everard studio with beautifully controlled light — perfect for family birthdays, Christmas, or a milestone worth marking. Designed for three or more people."
      packageIntro="A full hour in the studio, with time and space for the whole family. Designed for three or more people. Includes a free print of your choice — perfect for hanging or gifting on again."
      packagePrice="£199"
      packageIncludes={[
        '60-minute studio session',
        'For 3 or more people',
        '15–20 edited images',
        'One free print of your choice',
        'All images included — no per-image charges',
        'Warm, private studio at Papworth Everard, Cambridgeshire',
      ]}
      whoFor={[
        'Family birthdays',
        'Christmas gift',
        "Mother's Day",
        "Father's Day",
        'Grandparent milestones',
        'From adult children',
      ]}
      serviceHref="/families"
      serviceName="family photography"
      faqs={[
        {
          q: 'Does it work for families of five or six?',
          a: "Yes — the £199 session is designed for 3 or more people, and works well for larger families. Get in touch if you have a very large group and we'll advise.",
        },
        {
          q: 'Can we include grandparents or extended family?',
          a: "Absolutely. Multi-generational sessions are lovely and the studio has plenty of space.",
        },
        {
          q: "What if we'd prefer outdoors?",
          a: "The voucher covers a studio session. If the recipient would prefer an outdoor session, get in touch and we'll talk through options.",
        },
        {
          q: "How does the free print work?",
          a: "After the session the recipient chooses their favourite image and we produce a professional print for them to take home or keep at home.",
        },
      ]}
      productSchema={productSchema}
    />
  );
}
