import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SUPABASE_URL } from "@/lib/supabase";
import { breadcrumbList } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engagement & Couples Photography Cambridge",
  description:
    "Relaxed, natural engagement and couples photography across Cambridge and Cambridgeshire. Studio sessions from £99 or outdoor shoots — unhurried, unposed, honest.",
  alternates: { canonical: "/engagement" },
  openGraph: {
    title: "Engagement & Couples Photography Cambridge | Something Blue Productions",
    description:
      "Relaxed, natural engagement and couples photography across Cambridge and Cambridgeshire.",
    url: "https://something-blue-productions.com/engagement",
    type: "website",
    images: [
      {
        url: "https://knwyfoqmlwbxtfhvkbmc.supabase.co/storage/v1/object/public/site-images/weddings-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Engagement and couples photography Cambridgeshire",
      },
    ],
  },
};

const STORAGE = `${SUPABASE_URL}/storage/v1/object/public/site-images`;

const ENGAGEMENT_FAQS = [
  {
    q: "How long is an engagement session?",
    a: "Our £99 Mini Studio Session is 30 minutes — plenty for a couple. If you'd like a longer session or an outdoor shoot, get in touch and we'll tailor something for you.",
  },
  {
    q: "Studio or outdoors — which is better?",
    a: "Both work beautifully. Studio sessions are quicker, weather-proof and give a clean editorial look. Outdoor sessions have more space and a stronger sense of place — Cambridgeshire has some lovely locations for couples. If you're unsure, ask us.",
  },
  {
    q: "What should we wear?",
    a: "Coordinate rather than match. Comfortable clothes you feel yourselves in. For studio sessions, avoid large logos or busy patterns. For outdoor sessions, dress for the weather — layers help. We're happy to send more detailed styling notes once you book.",
  },
  {
    q: "Can we use the images for save-the-dates?",
    a: "Yes — that's one of the most common uses. All edited images are included with no per-image charges, and you get a full print release.",
  },
  {
    q: "Do you do engagement shoots as part of a wedding booking?",
    a: "Yes. Engagement sessions are included free with both our Half Day and Full Day wedding packages. It's the easiest way to feel comfortable with us before the wedding day itself.",
  },
  {
    q: "How quickly will we receive our images?",
    a: "Your full edited gallery is delivered within three weeks of the session. All images are included — no selecting a limited set, no per-image charges.",
  },
];

const engagementServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://something-blue-productions.com/engagement#service",
  serviceType: "Engagement & Couples Photography",
  name: "Engagement Photography Cambridge & Cambridgeshire",
  description:
    "Relaxed, natural engagement and couples photography across Cambridge and Cambridgeshire. Studio sessions from £99 or bespoke outdoor sessions.",
  provider: { "@id": "https://something-blue-productions.com/#organization" },
  areaServed: [
    { "@type": "City", name: "Cambridge" },
    { "@type": "City", name: "Ely" },
    { "@type": "City", name: "Huntingdon" },
    { "@type": "City", name: "St Neots" },
    { "@type": "AdministrativeArea", name: "Cambridgeshire" },
  ],
  url: "https://something-blue-productions.com/engagement",
  offers: [
    {
      "@type": "Offer",
      name: "Couples Studio Session",
      price: "99",
      priceCurrency: "GBP",
      url: "https://something-blue-productions.com/book",
    },
    {
      "@type": "Offer",
      name: "Outdoor Engagement Session",
      priceCurrency: "GBP",
      url: "https://something-blue-productions.com/enquire",
    },
  ],
};

const engagementBreadcrumbs = breadcrumbList([
  { name: 'Engagement', path: '/engagement' },
]);

const engagementFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ENGAGEMENT_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EngagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(engagementServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(engagementFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(engagementBreadcrumbs) }}
      />
      <style>{`
        .e-pad { padding: 3rem 1.5rem; }
        .e-hero-content { padding: 0 1.5rem 6rem; }
        .e-split-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .e-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .e-faqs { max-width: 100%; }
        .e-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .e-cta-buttons a { text-align: center; }
        .zoom-card { overflow: hidden; }
        .zoom-img { transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .zoom-card:hover .zoom-img { transform: scale(1.025); }

        @media (min-width: 640px) {
          .e-pad { padding: 3.5rem 2.5rem; }
          .e-split-grid { grid-template-columns: 1fr 1fr; }
          .e-process-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .e-pad { padding: 4rem 4rem; }
          .e-hero-content { padding: 0 4rem 5rem; }
          .e-process-grid { grid-template-columns: repeat(3, 1fr); }
          .e-faqs { max-width: 780px; margin: 0 auto; }
          .e-cta-buttons { flex-direction: row; justify-content: center; }
          .e-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#4a3c50', minHeight: '85svh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.7) 100%)', zIndex: 1 }} />
        <Image src={`${STORAGE}/weddings-hero.jpg`} alt="Engagement and couples photography Cambridgeshire" fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div className="e-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Engagement &amp; Couples Photography</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.2rem', textTransform: 'none', maxWidth: '760px' }}>
            <span aria-hidden="true">Just{' '}<span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>the two of you.</span></span>
            <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>Engagement &amp; Couples Photography in Cambridge &amp; Cambridgeshire</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.72)', marginBottom: '2rem', maxWidth: '460px' }}>
            Relaxed, natural engagement and couples photography across Cambridge and Cambridgeshire. Studio sessions from £99 or bespoke outdoor shoots. Unhurried, unposed — the two of you, honestly.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.85rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a studio session
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', border: '1px solid rgba(245,240,232,0.35)', padding: '0.85rem 2rem', display: 'inline-block' }}>
              Enquire about outdoor
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="e-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Our approach</p>
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '1.2rem' }}>
            No stiff poses, no awkward direction. We just let you be the two of you and photograph what happens.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#5c5550' }}>
            Whether it&apos;s an engagement session before your wedding, a couples portrait to mark an anniversary, or just because — we keep it relaxed, unhurried and honest. Sessions run in our Papworth Everard studio or outdoors somewhere in Cambridgeshire that means something to you.
          </p>
        </div>
      </section>

      {/* ── STUDIO / OUTDOOR SPLIT ── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="e-split-grid" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { color: '#1b3a5c', label: 'Studio', title: 'Studio Couples Session', desc: 'A relaxed studio session in Papworth Everard. Beautifully controlled light and a private space — 30 minutes for £99, all images included.', href: '/book', cta: 'Book studio session' },
            { color: '#3a4828', label: 'Outdoors', title: 'Outdoor Engagement Session', desc: 'Bespoke outdoor sessions at a Cambridgeshire location that means something to you — Grantchester Meadows, the Cam, wherever suits.', href: '/enquire', cta: 'Enquire about outdoor' },
          ].map((card) => (
            <div key={card.title} style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: card.color, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 100%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem', zIndex: 3 }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.4rem' }}>{card.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#ffffff', textTransform: 'none', marginBottom: '0.7rem' }}>{card.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '1rem' }}>{card.desc}</p>
                <Link href={card.href} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.9)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.4)', paddingBottom: '2px' }}>
                  {card.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING BAND ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Studio couples sessions</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>30 minutes · £99 · 5–10 edited images · All included</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>Also makes an excellent engagement or anniversary gift — vouchers are available.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Book now →</Link>
            <Link href="/gift-vouchers/engagement" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#A8CAEC', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>Gift a session →</Link>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="e-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>What to expect</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>How a session works</h2>
          </div>
          <div className="e-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'A short chat', desc: "Before the session we agree on studio or outdoor, timing, and anything you want to include or avoid. No forms, no fuss." },
              { num: '02', title: 'The session', desc: "Studio sessions run 30 minutes. Outdoor sessions run 45–90 minutes depending on locations. Both are gently led — we suggest, you do what feels natural." },
              { num: '03', title: 'Your gallery', desc: "Delivered within three weeks via a private online gallery. All edited images are included — download, print, share, and use however you like." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.95rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEDDING TIE-IN ── */}
      <section style={{ backgroundColor: '#0d1b2a', padding: '2rem 1.5rem', borderTop: '1px solid rgba(168,202,236,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Getting married?</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.3rem' }}>Engagement sessions are free with our wedding packages</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', maxWidth: '500px' }}>Both our Half Day and Full Day wedding packages include a complimentary engagement session — a chance to get comfortable with us before the wedding day itself.</p>
          </div>
          <Link href="/weddings" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid rgba(168,202,236,0.3)', color: '#A8CAEC', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', flexShrink: 0 }}>See wedding packages →</Link>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="e-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="e-faqs">
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Common questions</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Engagement FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ENGAGEMENT_FAQS.map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid #DDD5C0' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.6rem' }}>{faq.q}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="e-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Book your session</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Ready when you are</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            £99 studio couples sessions bookable online. For outdoor engagement shoots or something bespoke, get in touch.
          </p>
          <div className="e-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Book a studio session</Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>Enquire about outdoor</Link>
          </div>
        </div>
      </section>
    </>
  );
}
