import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Something Blue Productions | Wedding & Family Photography Cambridge",
    template: "%s | Something Blue Productions",
  },
  description:
    "Photography and videography studio in Cambridgeshire. Weddings, family, newborn, maternity, headshots and commercial. Studio sessions from £99. Papworth Everard & Waterbeach.",
  keywords: [
    "wedding photographer cambridge",
    "family photographer cambridge",
    "newborn photographer cambridge",
    "maternity photographer cambridgeshire",
    "wedding videography cambridge",
    "studio photography papworth everard",
    "studio photography waterbeach",
    "headshot photographer cambridge",
    "commercial photographer cambridgeshire",
    "photographer near me cambridgeshire",
  ],
  authors: [{ name: "Something Blue Productions" }],
  creator: "Something Blue Productions",
  metadataBase: new URL("https://something-blue-productions.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://something-blue-productions.com",
    siteName: "Something Blue Productions",
    title: "Something Blue Productions | Wedding & Family Photography Cambridge",
    description:
      "Photography and videography studio in Cambridgeshire. Weddings, family, newborn, maternity, headshots and commercial. Studio sessions from £99.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Something Blue Productions",
    description:
      "Photography and videography studio in Cambridgeshire. Studio sessions from £99. All images included.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://something-blue-productions.com/#organization',
  name: 'Something Blue Productions',
  url: 'https://something-blue-productions.com',
  logo: 'https://something-blue-productions.com/logo.png',
  image: 'https://something-blue-productions.com/logo.png',
  description: 'Photography and videography studio in Cambridgeshire specialising in weddings, family portraits, newborn, maternity, headshots and commercial photography.',
  telephone: '+447765253340',
  email: 'hello@something-blue-productions.com',
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Credit Card, Debit Card',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Papworth Everard',
      addressLocality: 'Cambridge',
      addressRegion: 'Cambridgeshire',
      postalCode: 'CB23',
      addressCountry: 'GB',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Waterbeach',
      addressLocality: 'Cambridge',
      addressRegion: 'Cambridgeshire',
      postalCode: 'CB25',
      addressCountry: 'GB',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.2394,
    longitude: -0.1146,
  },
  areaServed: [
    { '@type': 'City', name: 'Cambridge' },
    { '@type': 'City', name: 'Huntingdon' },
    { '@type': 'City', name: 'Peterborough' },
    { '@type': 'City', name: 'Bedford' },
    { '@type': 'City', name: 'Ely' },
    { '@type': 'City', name: 'St Neots' },
    { '@type': 'AdministrativeArea', name: 'Cambridgeshire' },
  ],
  sameAs: [
    'https://www.instagram.com/somethingblue.productions',
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday'], opens: '19:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Thursday', 'Friday'], opens: '09:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '22:00' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Photography Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Studio Session', description: '30 minute studio photography session. 5-10 images included. No per-image charges.' },
        price: '99',
        priceCurrency: 'GBP',
        url: 'https://something-blue-productions.com/book',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Family Session', description: '60 minute studio photography session for 3+ people. 10-20 images included.' },
        price: '199',
        priceCurrency: 'GBP',
        url: 'https://something-blue-productions.com/book',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Wedding Photography', description: 'Natural documentary-style wedding photography across Cambridgeshire.' },
        url: 'https://something-blue-productions.com/weddings',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Newborn Photography', description: 'Gentle newborn photography in our Papworth Everard studio.' },
        url: 'https://something-blue-productions.com/newborn',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Maternity Photography', description: 'Beautiful maternity photography sessions in studio or outdoors.' },
        url: 'https://something-blue-productions.com/maternity',
      },
    ],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Samantha Clark',
  jobTitle: 'Photographer & Founder',
  worksFor: { '@id': 'https://something-blue-productions.com/#organization' },
  url: 'https://something-blue-productions.com/about',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QJ0ER13SV"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QJ0ER13SV');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}