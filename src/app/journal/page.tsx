import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | Something Blue Productions · Photography Tips & Guides",
  description: "Photography guides, location ideas, wedding planning tips and session advice from Something Blue Productions. Based in Cambridge and Cambridgeshire.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal | Something Blue Productions",
    description: "Photography guides, location ideas, wedding planning tips and session advice.",
    url: "https://something-blue-productions.com/journal",
    type: "website",
  },
};

const supabaseUrl = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y';

const categoryColors: Record<string, string> = {
  Weddings: '#5c3d30',
  Families: '#3a4828',
  Newborn: '#4a3830',
  Maternity: '#4a3c50',
  Studio: '#1b3a5c',
  Commercial: '#2c2820',
  Locations: '#3a4838',
};

type Post = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  published_at: string;
  image_url: string | null;
  image_tag: string | null;
  body: string | null;
};

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?select=*&published=eq.true&order=published_at.desc`,
      {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function readTime(body: string | null): string {
  const words = (body || '').split(' ').length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

function PostImage({ post, aspectRatio, featured = false }: { post: Post; aspectRatio: string; featured?: boolean }) {
  const color = categoryColors[post.category] || '#2c2820';
  return (
    <div style={{ aspectRatio, overflow: 'hidden', marginBottom: featured ? '1.2rem' : '1rem', position: 'relative' }}>
      {post.image_url ? (
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          sizes={featured ? "(max-width: 900px) 100vw, 800px" : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"}
          style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          className="post-img-inner"
        />
      ) : (
        <div
          className="post-img-inner"
          style={{ width: '100%', height: '100%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center', padding: '0 1rem' }}>
            {post.image_tag ? `${post.image_tag}-hero.jpg` : 'journal-hero.jpg'}
          </span>
        </div>
      )}
    </div>
  );
}

export default async function JournalPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const secondary = posts.slice(1, 3);
  const rest = posts.slice(3);

  return (
    <>
      <style>{`
        .j-pad { padding: 3rem 1.5rem; }
        .j-hero { padding: 8rem 1.5rem 4rem; }
        .j-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .j-featured-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .j-post-link { text-decoration: none; display: block; }
        .j-post-link:hover .post-img-inner { transform: scale(1.04); }
        .j-post-title { transition: color 0.2s; }
        .j-post-link:hover .j-post-title { color: #1B3A5C !important; }
        .j-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .j-cta-buttons a { text-align: center; }

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

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="j-hero" style={{ maxWidth: '700px' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Notes & guides</p>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.2rem' }}>
            From the{' '}
            <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}>journal.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: '500px' }}>
            Practical guides, location ideas, session tips and honest advice — for clients preparing for a session and couples planning their wedding.
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured && (
        <section className="j-pad" style={{ backgroundColor: '#F5F0E8' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Latest post</p>
            <div className="j-featured-grid">
              <Link href={`/journal/${featured.slug}`} className="j-post-link">
                <PostImage post={featured} aspectRatio="16/10" featured />
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.6rem' }}>{featured.category}</p>
                <h2 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#2C2820', lineHeight: 1.3, textTransform: 'none', marginBottom: '0.8rem' }}>{featured.title}</h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#9E9282', lineHeight: 1.7, marginBottom: '1rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{formatDate(featured.published_at)}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#DDD5C0', display: 'inline-block' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{readTime(featured.body)}</span>
                </div>
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {secondary.map(post => (
                  <Link key={post.slug} href={`/journal/${post.slug}`} className="j-post-link" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '90px', flexShrink: 0, aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.title} fill sizes="90px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: categoryColors[post.category] || '#2c2820' }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>{post.category}</p>
                      <h3 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none', marginBottom: '0.3rem' }}>{post.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{formatDate(post.published_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BOOKING NUDGE ── */}
      <section style={{ backgroundColor: '#1B3A5C', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.4rem' }}>Ready to book?</p>
            <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.2rem' }}>
              Studio sessions from £99 — book instantly online
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(232,221,181,0.45)' }}>
              Or enquire about weddings, outdoor sessions and bespoke shoots.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: '#E8DDB5', color: '#0d1b2a', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session →
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(232,221,181,0.6)', padding: '0.75rem 1.5rem', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(232,221,181,0.2)' }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ALL POSTS ── */}
      {rest.length > 0 && (
        <section className="j-pad" style={{ backgroundColor: '#E8DDB5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>All posts</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Browse the journal</h2>
            </div>
            <div className="j-grid">
              {rest.map(post => (
                <Link key={post.slug} href={`/journal/${post.slug}`} className="j-post-link">
                  <PostImage post={post} aspectRatio="3/2" />
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{post.category}</p>
                  <h3 className="j-post-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none', marginBottom: '0.5rem' }}>{post.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#5c5550', lineHeight: 1.65, marginBottom: '0.8rem' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{formatDate(post.published_at)}</span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#DDD5C0', display: 'inline-block' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{readTime(post.body)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="j-pad" style={{ backgroundColor: '#F5F0E8', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#9E9282' }}>No posts yet — check back soon.</p>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="j-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '1rem' }}>Ready to book?</p>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#E8DDB5', lineHeight: 1.25, textTransform: 'none', marginBottom: '1rem' }}>Get in touch</h2>
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