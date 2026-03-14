import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ─── RESPONSIVE STYLES ─── */}
      <style>{`
        .home-section-pad { padding: 3rem 1.5rem; }
        .home-brand-statement { font-size: clamp(1rem, 1.5vw, 1.2rem); }
        .home-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .home-service-card { aspect-ratio: 3/4; }
        .home-studios-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .home-testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        .home-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .home-journal-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .home-hero-content { padding: 0 1.5rem 6rem; }
        .home-commercial-strip { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        .home-commercial-label { display: none; }
        .home-studios-header { flex-direction: column; gap: 0.5rem; }
        .home-studios-subtitle { display: none; }
        .home-cta-buttons { flex-direction: column; }
        .home-cta-buttons a { text-align: center; }
        .home-portfolio-header { flex-direction: column; gap: 0.5rem; align-items: flex-start; }

        @media (min-width: 640px) {
          .home-section-pad { padding: 3.5rem 2.5rem; }
          .home-process-grid { grid-template-columns: 1fr 1fr; }
          .home-testimonials-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .home-section-pad { padding: 4rem 4rem; }
          .home-services-grid { grid-template-columns: repeat(4, 1fr); }
          .home-service-card { aspect-ratio: 2/3; }
          .home-studios-grid { grid-template-columns: 1fr 1fr; }
          .home-testimonials-grid { grid-template-columns: repeat(3, 1fr); }
          .home-process-grid { grid-template-columns: repeat(4, 1fr); }
          .home-journal-grid { grid-template-columns: repeat(3, 1fr); }
          .home-hero-content { padding: 0 4rem 5rem; }
          .home-commercial-strip { flex-direction: row; align-items: center; gap: 2rem; }
          .home-commercial-label { display: block; }
          .home-studios-header { flex-direction: row; gap: 2rem; }
          .home-studios-subtitle { display: block; }
          .home-cta-buttons { flex-direction: row; }
          .home-cta-buttons a { text-align: left; }
          .home-portfolio-header { flex-direction: row; align-items: flex-end; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', backgroundColor: '#0d1b2a', minHeight: '100svh' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.05) 40%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#1b3a5c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.2)', textAlign: 'center' }}>
            Hero Image Goes Here<br />Full Viewport · Wedding or Family Portrait
          </span>
        </div>
        <div className="home-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>
            Photography &amp; Video · Cambridge
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '0.02em', color: '#ffffff', marginBottom: '1.2rem', maxWidth: '700px', textTransform: 'none' }}>
            Made to be{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
              remembered.
            </span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(245,240,232,0.7)', marginBottom: '2rem', maxWidth: '400px' }}>
            Wedding and family photography rooted in Cambridgeshire. Quiet, honest work from two studio spaces.
          </p>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(245,240,232,0.35)', paddingBottom: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            See the work →
          </Link>
        </div>
      </section>

      {/* ─── BRAND STATEMENT ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p className="home-brand-statement" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, lineHeight: 1.9, color: '#2C2820', letterSpacing: '0.04em', textTransform: 'none' }}>
            Something Blue is a photography and video studio based between{' '}
            <span style={{ color: '#1B3A5C' }}>Cambridge</span> and Waterbeach.
            We shoot weddings, families, and the quieter moments — honestly, and without fuss.
          </p>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#DDD5C0', margin: '2rem auto 0' }} />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section style={{ padding: '0 1.5rem 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="home-services-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { label: 'Photography & Video', title: 'Weddings', href: '/weddings', color: '#5c3d30' },
            { label: 'Natural & Lifestyle', title: 'Families', href: '/families', color: '#3a4828' },
            { label: 'Newborn & Maternity', title: 'Early Days', href: '/newborn', color: '#4a3830' },
            { label: 'Papworth & Waterbeach', title: 'Studio Sessions', href: '/studio', color: '#1b3a5c' },
          ].map((service) => (
            <Link key={service.href} href={service.href} className="home-service-card" style={{ position: 'relative', display: 'block', backgroundColor: service.color, overflow: 'hidden', textDecoration: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.2rem' }}>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.3rem' }}>{service.label}</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '0.6rem', textTransform: 'none' }}>{service.title}</h2>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '14px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Commercial strip */}
        <Link href="/commercial" className="home-commercial-strip" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1400px', margin: '2px auto 0', backgroundColor: '#2C2820', padding: '1.4rem 1.5rem', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="home-commercial-label" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', whiteSpace: 'nowrap' }}>Also available</span>
            <div>
              <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', letterSpacing: '0.05em', textTransform: 'none' }}>Commercial Photography</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#9E9282', marginTop: '0.2rem' }}>Brand, performance &amp; small business · Cambridgeshire and beyond</p>
            </div>
          </div>
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.2rem', color: '#9E9282', alignSelf: 'center' }}>→</span>
        </Link>
      </section>

      {/* ─── PORTFOLIO STRIP ─── */}
      <section style={{ padding: '0 0 3rem', backgroundColor: '#F5F0E8' }}>
        <div className="home-portfolio-header" style={{ display: 'flex', marginBottom: '1.5rem', padding: '0 1.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Selected work</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>The portfolio</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px', alignSelf: 'flex-end' }}>View all work</Link>
        </div>
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingLeft: '1.5rem' }}>
          {[
            { w: '180px', aspect: '2/3', color: '#8a6848', label: 'Wedding Portrait' },
            { w: '280px', aspect: '3/2', color: '#a08870', label: 'Family Session' },
            { w: '180px', aspect: '2/3', color: '#6a9090', label: 'Newborn Studio' },
            { w: '230px', aspect: '4/3', color: '#b0a090', label: 'Maternity' },
            { w: '180px', aspect: '2/3', color: '#8090a0', label: 'Wedding Detail' },
            { w: '230px', aspect: '4/3', color: '#a09080', label: 'Family Outdoor' },
          ].map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, aspectRatio: item.aspect, backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)', textAlign: 'center' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STUDIOS ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#0d1b2a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="home-studios-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.5rem' }}>Two spaces, one county</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none' }}>Our studios</h2>
            </div>
            <p className="home-studios-subtitle" style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.1rem', color: '#9E9282', maxWidth: '280px', lineHeight: 1.7 }}>
              A warm, controlled indoor space changes what&apos;s possible.
            </p>
          </div>

          <div className="home-studios-grid">
            {[
              { tag: 'Studio · Cambridgeshire', name: 'Papworth Everard', desc: 'A warm, airy space ideal for newborn, family and maternity sessions. Accessible from Cambridge, Huntingdon and the A14 corridor.', href: '/studio/papworth-everard', color: '#1b3a5c' },
              { tag: 'Studio · Near Cambridge', name: 'Waterbeach', desc: 'Minutes from Cambridge city centre and the A10. Perfect for families, mini sessions and selected commercial work.', href: '/studio/waterbeach', color: '#162d4a' },
            ].map((studio) => (
              <Link key={studio.href} href={studio.href} style={{ position: 'relative', display: 'block', aspectRatio: '16/9', backgroundColor: studio.color, overflow: 'hidden', textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.3) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.8rem' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', display: 'block', marginBottom: '0.4rem' }}>{studio.tag}</span>
                  <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: '#E8DDB5', lineHeight: 1.2, marginBottom: '0.5rem', textTransform: 'none' }}>{studio.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.65, maxWidth: '300px', marginBottom: '0.8rem' }}>{studio.desc}</p>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '18px', height: '1px', backgroundColor: 'currentColor', display: 'inline-block' }} />
                    About this studio
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.2rem' }}>
            {['Newborn sessions', 'Family shoots', 'Maternity', 'Mini sessions', 'Headshots', 'Brand photography', 'Indoor assured'].map((tag) => (
              <span key={tag} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', border: '1px solid rgba(168,202,236,0.2)', padding: '0.3rem 0.75rem' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>From our clients</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Kind words</h2>
          </div>
          <div className="home-testimonials-grid">
            {[
              { quote: "We didn't want posed wedding photos and we couldn't be happier. Every single image feels like a real moment — not a performance.", name: 'Sarah & Tom', service: 'Wedding Photography · Cambridge' },
              { quote: "My daughter was six days old. The studio was so calm and the whole session felt gentle from start to finish. The images are extraordinary.", name: 'Emily R.', service: 'Newborn Session · Papworth Everard' },
              { quote: "Our kids are notoriously terrible in front of a camera. Two hours later we had photos I'll have on our walls for the rest of my life.", name: 'Jo & Marcus', service: 'Family Photography · Ely' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '4rem', color: '#DDD5C0', lineHeight: 0.8, display: 'block', marginBottom: '0.5rem' }}>&ldquo;</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.8, color: '#2C2820', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2C2820', fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282', marginTop: '0.2rem' }}>{t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Simple from start to finish</h2>
          </div>
          <div className="home-process-grid" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Send an enquiry', desc: "Tell us what you're looking for — a few sentences is enough. We'll come back to you within 24 hours." },
              { num: '02', title: 'Short conversation', desc: "We'll talk through what you want and make sure everything feels right before anything is confirmed." },
              { num: '03', title: 'The session', desc: "Relaxed and led by you. Outdoors, in studio, at a venue — wherever feels right. No awkward direction." },
              { num: '04', title: 'Your gallery', desc: "Edited, delivered, and yours. A private online gallery and your choice of print products and digital files." },
            ].map((step) => (
              <div key={step.num} style={{ padding: '2rem 1.5rem', backgroundColor: '#E8DDB5' }}>
                <div style={{ fontFamily: "'Stay Humble', cursive", fontSize: '2.8rem', color: '#DDD5C0', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNAL ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="home-portfolio-header" style={{ display: 'flex', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>Notes &amp; guides</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>From the journal</h2>
            </div>
            <Link href="/journal" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px', alignSelf: 'flex-end' }}>Read all posts</Link>
          </div>
          <div className="home-journal-grid">
            {[
              { href: '/journal/newborn-session', cat: 'Newborn', title: 'What to expect from your newborn photography session', excerpt: 'Everything you need to know before you come to the studio — timings, feeds, what to bring.', color: '#a08870' },
              { href: '/journal/family-cambridge', cat: 'Families · Cambridge', title: 'The best places for family photography around Cambridge', excerpt: 'From the Backs to Wicken Fen — our honest guide to outdoor locations across Cambridgeshire.', color: '#7a9878' },
              { href: '/journal/wedding-video', cat: 'Weddings', title: 'Is wedding videography worth it? Our honest answer', excerpt: "We're photographers and filmmakers. Here's what we actually think.", color: '#9088a8' },
            ].map((post) => (
              <Link key={post.href} href={post.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ aspectRatio: '3/2', backgroundColor: post.color, marginBottom: '1rem' }} />
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{post.cat}</p>
                <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: '#2C2820', lineHeight: 1.4, marginBottom: '0.5rem', textTransform: 'none' }}>{post.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9E9282', lineHeight: 1.65 }}>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENQUIRY CTA ─── */}
      <section className="home-section-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(27,58,92,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Get in touch</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Let&apos;s talk about what you need
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Whether it&apos;s a wedding date, a newborn session, or just an idea you&apos;re thinking through — drop us a message and we&apos;ll come back to you quickly.
          </p>
          <div className="home-cta-buttons" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              See the work first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}