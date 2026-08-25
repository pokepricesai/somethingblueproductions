import type { Metadata } from 'next';
import { GiftCategoryPage } from '../_shared';

export const metadata: Metadata = {
  title: "Engagement & Couples Photography Gift Voucher | Something Blue Productions",
  description:
    "Engagement and couples photography gift voucher from £99 — a relaxed studio session at our Papworth Everard studio. Perfect for engagements, anniversaries and wedding gifts.",
  alternates: { canonical: "/gift-vouchers/engagement" },
  openGraph: {
    title: "Engagement & Couples Photography Gift Voucher | Something Blue Productions",
    description:
      "Engagement and couples photography gift voucher — studio session at our Papworth Everard studio in Cambridgeshire.",
    url: "https://something-blue-productions.com/gift-vouchers/engagement",
    type: "website",
    images: [
      {
        url: "https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images/services-weddings.jpg",
        width: 1200,
        height: 630,
        alt: "Engagement and couples photography gift voucher",
      },
    ],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://something-blue-productions.com/gift-vouchers/engagement#product',
  name: 'Engagement & Couples Photography Gift Voucher',
  description: 'Studio couples or engagement photography session at our Papworth Everard studio in Cambridgeshire.',
  brand: { '@id': 'https://something-blue-productions.com/#organization' },
  category: 'Photography Gift Voucher',
  offers: {
    '@type': 'Offer',
    name: 'Mini Studio Session Voucher',
    price: '99',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    url: 'https://something-blue-productions.com/book',
  },
};

export default function EngagementGiftPage() {
  return (
    <GiftCategoryPage
      slug="engagement"
      title="Engagement & Couples Photography Gift Voucher"
      subtitle="Couples"
      heroImage="services-weddings.jpg"
      heroBg="#4a3c50"
      heroKicker="Gift voucher · Couples & engagement"
      headline={<>The two of them,{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>photographed properly.</span></>}
      intro="A relaxed studio session for two. Perfect for engagements, anniversaries, or as a wedding gift. Studio in Papworth Everard, Cambridgeshire — the recipient chooses their own date."
      packageIntro="A 30-minute studio session for two, in a private space with beautifully controlled light. Great for save-the-dates, anniversary portraits, or just because."
      packagePrice="£99"
      packageIncludes={[
        '30-minute studio session',
        'For two people',
        '5–10 edited images',
        'All images included — no per-image charges',
        'Warm, private studio at Papworth Everard, Cambridgeshire',
        'Recipient chooses their own date',
      ]}
      whoFor={[
        'Engagement gift',
        'Wedding gift',
        'Anniversary',
        "Valentine's Day",
        'Just because',
      ]}
      serviceHref="/engagement"
      serviceName="engagement & couples photography"
      faqs={[
        {
          q: 'Can they use it as an engagement session before a wedding?',
          a: "Yes — this is one of the most common uses. Images work well for save-the-dates and give the couple a chance to feel comfortable with us before their wedding day.",
        },
        {
          q: 'Can they have an outdoor session instead?',
          a: "The voucher covers a studio session. If the recipient would prefer an outdoor engagement session, get in touch and we can talk through options.",
        },
        {
          q: "What if they're already booking us for their wedding?",
          a: "Both our Half Day and Full Day wedding packages include a complimentary engagement session, so vouchers are usually kept for couples who aren't booking a full wedding with us.",
        },
        {
          q: 'Are the images suitable for save-the-dates?',
          a: "Yes — all edited images are delivered with a full print release, so recipients can use them for save-the-dates, prints, socials or anything else.",
        },
      ]}
      productSchema={productSchema}
    />
  );
}
