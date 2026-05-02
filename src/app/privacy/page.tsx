import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Something Blue Productions",
  description: "Privacy policy for Something Blue Productions — how we collect, use and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .priv-pad { padding: 3rem 1.5rem; }
        .priv-hero { padding: 8rem 1.5rem 4rem; }
        .priv-body { max-width: 720px; margin: 0 auto; }
        .priv-section { margin-bottom: 2.5rem; }
        .priv-h2 {
          font-family: 'Carose', sans-serif; font-weight: 300;
          font-size: 1rem; color: #1B3A5C; text-transform: none;
          margin-bottom: 0.8rem; letter-spacing: 0.03em;
        }
        .priv-p {
          font-family: 'Inter', sans-serif; font-weight: 300;
          font-size: 0.88rem; line-height: 1.85; color: #2C2820;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .priv-pad { padding: 3.5rem 2.5rem; }
          .priv-hero { padding: 10rem 2.5rem 4rem; }
        }
        @media (min-width: 900px) {
          .priv-pad { padding: 4rem 4rem; }
          .priv-hero { padding: 10rem 4rem 5rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="priv-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Legal</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)' }}>
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="priv-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="priv-body">

          <div className="priv-section">
            <p className="priv-p">
              Something Blue Productions (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights in relation to it.
            </p>
            <p className="priv-p">
              We are based in Cambridgeshire, United Kingdom. This policy applies to all personal data we collect through our website at something-blue-productions.com and through our enquiry and booking process.
            </p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">What information we collect</h2>
            <p className="priv-p">We collect the following types of personal information:</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Enquiry and booking information</strong> — when you contact us or book a session, we collect your name, email address, phone number, and details about the service you&apos;re interested in.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Payment information</strong> — when you pay for a session or gift voucher online, payment is processed securely by Stripe. We do not store your card details on our systems.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Website usage data</strong> — we may collect anonymised data about how you use our website, including pages visited and time spent, via Google Analytics.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Photography and images</strong> — when we photograph you or your family, the resulting images are personal data and are handled with the care and respect they deserve.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">How we use your information</h2>
            <p className="priv-p">We use your personal information to:</p>
            <p className="priv-p">— Respond to your enquiry and manage your booking</p>
            <p className="priv-p">— Deliver the photography services you have booked</p>
            <p className="priv-p">— Send you your images and any related communications</p>
            <p className="priv-p">— Process payments securely for bookings and gift vouchers</p>
            <p className="priv-p">— Improve our website and understand how visitors use it</p>
            <p className="priv-p">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">Your images and how they are used</h2>
            <p className="priv-p">Images taken during your session belong to Something Blue Productions. We may use images for portfolio, website, and social media purposes unless you specifically ask us not to at the time of booking. We will always handle images of children with particular care and will not publish images of minors without explicit parental consent.</p>
            <p className="priv-p">If you wish to opt out of your images being used for promotional purposes, please let us know in writing before or at the time of your session.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">Cookies</h2>
            <p className="priv-p">Our website uses cookies to improve your experience and to understand how the site is being used. These include essential cookies required for the site to function, and analytics cookies (via Google Analytics) that help us understand visitor behaviour.</p>
            <p className="priv-p">You can control cookie settings through your browser. Disabling cookies may affect the functionality of some parts of the site.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">How long we keep your data</h2>
            <p className="priv-p">We retain enquiry data for up to 2 years. Client booking information and images are retained for up to 5 years unless you request earlier deletion. You may request deletion of your personal data at any time by contacting us.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">Your rights</h2>
            <p className="priv-p">Under UK data protection law, you have the right to:</p>
            <p className="priv-p">— Access the personal information we hold about you</p>
            <p className="priv-p">— Request correction of inaccurate information</p>
            <p className="priv-p">— Request deletion of your personal data</p>
            <p className="priv-p">— Object to or restrict how we process your data</p>
            <p className="priv-p">— Withdraw consent at any time where processing is based on consent</p>
            <p className="priv-p">To exercise any of these rights, please contact us at hello@something-blue-productions.com.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">Third-party services</h2>
            <p className="priv-p">We use the following third-party services which may process your data:</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Stripe</strong> — processes payments for bookings and gift vouchers. Card details are handled directly by Stripe and never stored on our systems. Stripe is PCI-DSS compliant.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Brevo</strong> — sends transactional emails including booking confirmations, gift voucher delivery and enquiry alerts. Your email address is shared with Brevo solely for this purpose.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Supabase</strong> — stores enquiry and booking data securely on EU-based servers.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Google Analytics</strong> — anonymised website usage data.</p>
            <p className="priv-p"><strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Vercel</strong> — our website hosting provider.</p>
          </div>

          <div className="priv-section" style={{ paddingTop: '1.5rem', borderTop: '1px solid #DDD5C0' }}>
            <h2 className="priv-h2">Contact</h2>
            <p className="priv-p">If you have any questions about this privacy policy or how we handle your data, please contact us:</p>
            <p className="priv-p">
              <strong style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.78rem', letterSpacing: '0.05em' }}>Something Blue Productions</strong><br />
              Cambridgeshire, United Kingdom<br />
              hello@something-blue-productions.com
            </p>
            <p className="priv-p">If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</p>
          </div>

        </div>
      </section>
    </>
  );
}