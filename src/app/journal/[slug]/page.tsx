import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  meta_description: string;
  category: string;
  excerpt: string;
  body: string;
  faqs: string;
  image_url: string | null;
  image_tag: string | null;
  published_at: string;
};

type FAQ = { q: string; a: string };

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?slug=eq.${slug}&published=eq.true&limit=1`,
      {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<Post[]> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?category=eq.${category}&slug=neq.${currentSlug}&published=eq.true&order=published_at.desc&limit=3`,
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | Something Blue Productions`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.category, slug);

  let faqs: FAQ[] = [];
  try {
    faqs = typeof post.faqs === 'string' ? JSON.parse(post.faqs) : (Array.isArray(post.faqs) ? post.faqs : []);
  } catch {
    faqs = [];
  }

  const bodyParagraphs = post.body
    ? post.body.split('\n\n').filter(p => p.trim().length > 0)
    : [];

  const heroColor = categoryColors[post.category] || '#2c2820';
  const readTime = Math.max(3, Math.ceil((post.body || '').split(' ').length / 200));
  const dateStr = new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <style>{`
        .post-pad { padding: 3rem 1.5rem; }
        .post-hero { padding: 8rem 1.5rem 3rem; }
        .post-body { max-width: 680px; margin: 0 auto; }
        .post-related-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .post-related-link { text-decoration: none; display: block; }
        .post-related-img { overflow: hidden; margin-bottom: 1rem; }
        .post-related-img-inner { width: 100%; height: 100%; transition: transform 0.5s; display: block; }
        .post-related-link:hover .post-related-img-inner { transform: scale(1.04); }
        .post-related-title { transition: color 0.2s; }
        .post-related-link:hover .post-related-title { color: #1B3A5C !important; }
        .post-cta-buttons { display: flex; flex-direction: column; gap: 0.75rem; align-items: center; }

        @media (min-width: 640px) {
          .post-pad { padding: 3.5rem 2.5rem; }
          .post-hero { padding: 10rem 2.5rem 4rem; }
          .post-related-grid { grid-template-columns: 1fr 1fr; }
          .post-cta-buttons { flex-direction: row; justify-content: center; }
        }
        @media (min-width: 900px) {
          .post-pad { padding: 4rem 4rem; }
          .post-hero { padding: 10rem 4rem 5rem; }
          .post-related-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#0d1b2a' }}>
        <div className="post-hero" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/journal" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.6)', textDecoration: 'none' }}>
              ← Journal
            </Link>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(168,202,236,0.3)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A8CAEC' }}>{post.category}</span>
          </div>
          <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.15, color: '#E8DDB5', textTransform: 'none', marginBottom: '1.5rem' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.45)' }}>{dateStr}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(245,240,232,0.2)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.45)' }}>{readTime} min read</span>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <div style={{ width: '100%', aspectRatio: '16/7', maxHeight: '500px', overflow: 'hidden', backgroundColor: heroColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>
            {post.image_tag ? `${post.image_tag}-hero.jpg` : 'journal-hero.jpg'}
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <section className="post-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="post-body">
          <p style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', lineHeight: 1.9, color: '#2C2820', textTransform: 'none', marginBottom: '2.5rem', borderLeft: '3px solid #1B3A5C', paddingLeft: '1.2rem' }}>
            {post.excerpt}
          </p>

          {bodyParagraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.85, color: '#2C2820', marginBottom: '1.5rem' }}>
              {para}
            </p>
          ))}

          {faqs.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #DDD5C0' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Common questions</p>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '1.2rem 0', borderBottom: '1px solid #DDD5C0' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.88rem', color: '#1B3A5C', textTransform: 'none', marginBottom: '0.5rem' }}>{faq.q}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Post footer */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #DDD5C0' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Something Blue Productions</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              Photography and video for weddings, families, newborn and maternity. Two studios in Cambridgeshire. Studio sessions from £99 — all images included.
            </p>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="post-pad" style={{ backgroundColor: '#E8DDB5' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Keep reading</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Related posts</h2>
            </div>
            <div className="post-related-grid">
              {related.map(rel => (
                <Link key={rel.slug} href={`/journal/${rel.slug}`} className="post-related-link">
                  <div className="post-related-img" style={{ aspectRatio: '3/2' }}>
                    {rel.image_url ? (
                      <img src={rel.image_url} alt={rel.title} className="post-related-img-inner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="post-related-img-inner" style={{ width: '100%', height: '100%', backgroundColor: categoryColors[rel.category] || '#2c2820', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>
                          {rel.image_tag ? `${rel.image_tag}-hero.jpg` : 'journal-hero.jpg'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{rel.category}</p>
                  <h3 className="post-related-title" style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none' }}>{rel.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="post-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem' }}>Ready to book?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Studio sessions from £99 — book instantly online. Or get in touch and we&apos;ll come back to you within 24 hours.
          </p>
          <div className="post-cta-buttons">
            <Link href="/book" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Book a session
            </Link>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.6)', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
              Start your enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}