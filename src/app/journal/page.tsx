import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | Something Blue Productions · Photography Tips & Guides",
  description: "Photography guides, location ideas, wedding planning tips and session advice from Something Blue Productions. Based in Cambridge and Cambridgeshire.",
};

const posts = [
  {
    slug: "what-to-expect-newborn-session",
    category: "Newborn",
    title: "What to expect from your newborn photography session",
    excerpt: "Everything you need to know before you come to the studio — timings, feeds, what to bring, and why none of it needs to be perfect.",
    date: "March 2025",
    readTime: "5 min read",
    color: "#a08870",
    img: "journal-hero-newborn-guide.jpg",
  },
  {
    slug: "best-places-family-photos-cambridge",
    category: "Families · Cambridge",
    title: "The best places for family photography around Cambridge",
    excerpt: "From the Backs to Wicken Fen — our honest guide to outdoor locations across Cambridgeshire that photograph beautifully in every season.",
    date: "February 2025",
    readTime: "7 min read",
    color: "#7a9878",
    img: "journal-hero-cambridge-locations.jpg",
  },
  {
    slug: "wedding-videography-worth-it",
    category: "Weddings",
    title: "Is wedding videography worth it? Our honest answer",
    excerpt: "We're photographers and filmmakers. Here's what we actually think — and the one thing most couples tell us they regret not capturing.",
    date: "January 2025",
    readTime: "4 min read",
    color: "#9088a8",
    img: "journal-hero-wedding-video.jpg",
  },
  {
    slug: "what-to-wear-family-session",
    category: "Families",
    title: "What to wear for your family photography session",
    excerpt: "The styling questions we get asked most often, answered honestly. Spoiler: coordinating is better than matching, and comfort matters more than you think.",
    date: "December 2024",
    readTime: "5 min read",
    color: "#a09070",
    img: "journal-hero-what-to-wear.jpg",
  },
  {
    slug: "studio-vs-outdoor-sessions",
    category: "Studio",
    title: "Studio vs outdoor photography sessions — which is right for you?",
    excerpt: "Both have their strengths. Here's how we help families decide between our studio spaces and outdoor locations across Cambridgeshire.",
    date: "November 2024",
    readTime: "6 min read",
    color: "#708090",
    img: "journal-hero-studio-vs-outdoor.jpg",
  },
  {
    slug: "maternity-photography-timing",
    category: "Maternity",
    title: "When to book your maternity photography session",
    excerpt: "The sweet spot is 28–36 weeks — but there's more to it than just the number. Here's what we tell every expectant client.",
    date: "October 2024",
    readTime: "4 min read",
    color: "#b0a0b0",
    img: "journal-hero-maternity-timing.jpg",
  },
  {
    slug: "wedding-morning-preparation",
    category: "Weddings",
    title: "How to make the most of your wedding morning photography",
    excerpt: "The getting-ready shots are some of the most requested images from any wedding. Here's how a little preparation makes a big difference.",
    date: "September 2024",
    readTime: "5 min read",
    color: "#907060",
    img: "journal-hero-wedding-prep.jpg",
  },
  {
    slug: "cambridge-wedding-venues",
    category: "Weddings · Cambridge",
    title: "Our favourite wedding venues in and around Cambridge",
    excerpt: "A photographer's guide to the venues we love most in Cambridgeshire — what makes them special and what to keep in mind for your photography.",
    date: "August 2024",
    readTime: "8 min read",
    color: "#6878a0",
    img: "journal-hero-cambridge-venues.jpg",
  },
  {
    slug: "newborn-session-preparation",
    category: "Newborn",
    title: "How to prepare for your newborn photography session",
    excerpt: "A calm, well-prepared session makes for better images. Here's everything we recommend in the days leading up to your studio visit.",
    date: "July 2024",
    readTime: "5 min read",
    color: "#c0a890",
    img: "journal-hero-newborn-prep.jpg",
  },
];

const categories = ['All', 'Weddings', 'Families', 'Newborn', 'Maternity', 'Studio'];

export default function JournalPage() {
  return (
    <>
      <style>{`
        .j-pad { padding: 3rem 1.5rem; }
        .j-hero { padding: 8rem 1.5rem 4rem; }
        .j-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .j-featured-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .j-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .j-cta-buttons a { text-align: center; }
        .j-post-link { text-decoration: none; display: block; }
        .j-post-img { overflow: hidden; margin-bottom: 1.2rem; }
        .j-post-img-inner { width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .j-post-link:hover .j-post-img-inner { transform: scale(1.04); }
        .j-post-title { transition: color 0.2s; }
        .j-post-link:hover .j-post-title { color: #1B3A5C !important; }

        @media (min-width: 640px) {
          .j-pad { padding: 3.5rem 2.5rem; }
          .j-hero { padding: 10rem 2.5rem 4rem; }
          .j-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .j-featured-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .j-pad { padding: 4rem 4rem; }
          .j-hero { padding: 10rem 4rem 5rem; }
          .j-grid { grid-template-columns: repeat(3, 1fr); }
          .j-featured-grid { grid-template-columns: 2fr 1fr; gap: 3rem; }
          .j-cta-buttons { flex-direction: row; justify-content: center; }
          .j-cta-buttons a { text-align: left; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="j-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>
            Notes & guides
          </p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            From the{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>journal.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            Practical guides, location ideas, session tips and honest advice — for clients preparing for a session and couples planning their wedding.
          </p>
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      <section className="j-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Latest post</p>
          <div className="j-featured-grid">
            <Link href={`/journal/${posts[0].slug}`} className="j-post-link">
              <div className="j-post-img" style={{ aspectRatio: '16/10' }}>
                <div className="j-post-img-inner" style={{ width: '100%', height: '100%', backgroundColor: posts[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', textAlign: 'center' }}>{posts[0].img}</span>
                </div>
              </div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.6rem' }}>{posts[0].category}</p>
              <h2 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#2C2820', lineHeight: 1.3, textTransform: 'none', marginBottom: '0.8rem' }}>{posts[0].title}</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#9E9282', lineHeight: 1.7, marginBottom: '1rem' }}>{posts[0].excerpt}</p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{posts[0].date}</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#DDD5C0', display: 'inline-block' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{posts[0].readTime}</span>
              </div>
            </Link>

            {/* Secondary featured */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {posts.slice(1, 3).map((post) => (
                <Link key={post.slug} href={`/journal/${post.slug}`} className="j-post-link" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '100px', flexShrink: 0, aspectRatio: '1/1', backgroundColor: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div className="j-post-img-inner" style={{ width: '100%', height: '100%', backgroundColor: post.color }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>{post.category}</p>
                    <h3 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none', marginBottom: '0.3rem' }}>{post.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ALL POSTS ─── */}
      <section className="j-pad" style={{ backgroundColor: '#E8DDB5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>All posts</p>
            <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Browse the journal</h2>
          </div>

          {/* Category tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
            {categories.map((cat) => (
              <span key={cat} style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', border: '1px solid #DDD5C0', padding: '0.35rem 0.85rem', cursor: 'pointer' }}>
                {cat}
              </span>
            ))}
          </div>

          <div className="j-grid">
            {posts.slice(3).map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="j-post-link">
                <div className="j-post-img" style={{ aspectRatio: '3/2' }}>
                  <div className="j-post-img-inner" style={{ width: '100%', height: '100%', backgroundColor: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', textAlign: 'center', padding: '0 1rem' }}>{post.img}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{post.category}</p>
                <h3 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none', marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65, marginBottom: '0.8rem' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{post.date}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#DDD5C0', display: 'inline-block' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="j-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to book?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>
            Get in touch
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Whether you&apos;re ready to book or just have a question — we&apos;re always happy to chat.
          </p>
          <div className="j-cta-buttons">
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
            <Link href="/portfolio" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              View the portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}