import Link from "next/link";
import type { Metadata } from "next";

const posts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  img: string;
  color: string;
  content: string[];
  related: string[];
}> = {
  "what-to-expect-newborn-session": {
    title: "What to expect from your newborn photography session",
    category: "Newborn",
    date: "March 2025",
    readTime: "5 min read",
    excerpt: "Everything you need to know before you come to the studio — timings, feeds, what to bring, and why none of it needs to be perfect.",
    img: "journal-hero-newborn-guide.jpg",
    color: "#a08870",
    content: [
      "The most common thing new parents say when they arrive at our studio is that they were worried about getting it right. The feeds, the timing, whether their baby would sleep. Whether it would all go smoothly.",
      "Here's what we tell every client before a newborn session: there is no 'going smoothly'. There is just the session, and we work around whatever the session brings. That's the whole point.",
      "Newborn sessions at our Papworth Everard and Waterbeach studios are completely baby-led. We don't have a schedule. We don't have a list of shots we need to get through. We have time — usually 2–3 hours — and we use all of it, at your baby's pace.",
      "**The best time to arrive**\n\nIf you can, try to arrive when your baby has recently been fed and is starting to drift off. That sleepy, milk-drunk window is golden. But don't stress if the timing doesn't work out — we've photographed wide-awake babies, unsettled babies, colicky babies. They all produce beautiful images.",
      "**What to bring**\n\nFor feeding — whatever you normally use. We have a feeding area set up and there's no rush. The studio is warm so your baby won't need much clothing during the session itself. For sentimental items — a special toy, a blanket, a letter — these are very welcome and often become some of the most treasured images.",
      "**What we provide**\n\nEverything else. Wraps, props, backdrops, accessories — all provided. The studio is heated. You just need to bring yourselves.",
      "**Siblings**\n\nIf you have older children joining us, we build sibling time into every session. We manage it — you don't need to.",
      "**After the session**\n\nYour edited gallery is usually ready within 3 weeks. We'll send a few preview images within 48 hours. The full gallery arrives via a private online link — easy to download, share, and order prints from.",
    ],
    related: ["newborn-session-preparation", "studio-vs-outdoor-sessions", "what-to-wear-family-session"],
  },
  "best-places-family-photos-cambridge": {
    title: "The best places for family photography around Cambridge",
    category: "Families · Cambridge",
    date: "February 2025",
    readTime: "7 min read",
    excerpt: "From the Backs to Wicken Fen — our honest guide to outdoor locations across Cambridgeshire that photograph beautifully in every season.",
    img: "journal-hero-cambridge-locations.jpg",
    color: "#7a9878",
    content: [
      "Cambridgeshire has more beautiful photography locations than most people realise. If you've grown up here you might not notice anymore — but as photographers we notice constantly.",
      "Here are our honest recommendations for family photography locations across the region.",
      "**Grantchester Meadows, Cambridge**\n\nOur most-used outdoor location. The meadows stretch along the River Cam south of the city and offer open space, interesting light, and a relaxed feel that works brilliantly for families. Golden hour here is exceptional.",
      "**The Backs, Cambridge**\n\nYes, it's a tourist destination — but for good reason. The combination of the river, the college architecture, and the open green space creates something genuinely unique. Best in early morning when it's quieter.",
      "**Wicken Fen, near Ely**\n\nOne of the most underrated locations in Cambridgeshire. The flat landscape, reeds, and wide skies create images that feel completely different from anything else in the region. Beautiful at sunset.",
      "**Hinchingbrooke Country Park, Huntingdon**\n\nA brilliant family location — enough variety to keep a session interesting, woodland areas, open fields, and a lake. Great for families with younger children who need space to run.",
      "**Devil's Dyke, near Newmarket**\n\nThe ancient earthwork creates a dramatic, elevated backdrop. The surrounding countryside is gentle and accessible. Less well-known than most of our other locations, which means fewer people.",
      "Questions about any of these locations, or want to suggest somewhere that means something to your family? Just let us know when you enquire.",
    ],
    related: ["what-to-wear-family-session", "studio-vs-outdoor-sessions", "what-to-expect-newborn-session"],
  },
  "wedding-videography-worth-it": {
    title: "Is wedding videography worth it? Our honest answer",
    category: "Weddings",
    date: "January 2025",
    readTime: "4 min read",
    excerpt: "We're photographers and filmmakers. Here's what we actually think — and the one thing most couples tell us they regret not capturing.",
    img: "journal-hero-wedding-video.jpg",
    color: "#9088a8",
    content: [
      "We're asked this question a lot. Usually by couples who are weighing up budget, trying to decide if video is worth the additional investment when they're already spending on photography.",
      "We're photographers and filmmakers, so we have a stake in the answer. We'll be honest anyway.",
      "**What photography can't do**\n\nPhotography captures moments. The look on your face. The tears. The quiet details. But photography can't capture sound. It can't capture movement. It can't play back your vows in your partner's voice, or the song that played for your first dance.",
      "**The thing couples most often regret**\n\nIn our experience, the most common regret we hear from couples is not having video of the ceremony. Specifically, the vows. You say the most important words of your lives to each other — a photograph shows that it happened. A film lets you hear it again.",
      "**Our honest assessment**\n\nIf your budget is tight, prioritise photography. Full stop. A wedding film without good photographs is a gap you'll feel. Good photographs without a film is completely fine. If you have the budget for both — get both. They do different things and both things are worth doing.",
      "Any questions about how we handle combined photography and video packages — just get in touch.",
    ],
    related: ["cambridge-wedding-venues", "wedding-morning-preparation", "best-places-family-photos-cambridge"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Something Blue Productions`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <section style={{ padding: '10rem 4rem', textAlign: 'center', backgroundColor: '#F5F0E8', minHeight: '60vh' }}>
        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>Post not found</p>
        <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '2rem', color: '#2C2820', textTransform: 'none', marginBottom: '1.5rem' }}>This post doesn&apos;t exist yet</h1>
        <Link href="/journal" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px' }}>
          Back to journal →
        </Link>
      </section>
    );
  }

  return (
    <>
      <style>{`
        .post-pad { padding: 3rem 1.5rem; }
        .post-hero { padding: 8rem 1.5rem 3rem; }
        .post-body { max-width: 680px; margin: 0 auto; }
        .post-related-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .post-related-link { text-decoration: none; display: block; }
        .post-related-img { overflow: hidden; margin-bottom: 1rem; }
        .post-related-img-inner { width: 100%; height: 100%; transition: transform 0.5s; }
        .post-related-link:hover .post-related-img-inner { transform: scale(1.04); }

        @media (min-width: 640px) {
          .post-pad { padding: 3.5rem 2.5rem; }
          .post-hero { padding: 10rem 2.5rem 4rem; }
          .post-related-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 900px) {
          .post-pad { padding: 4rem 4rem; }
          .post-hero { padding: 10rem 4rem 5rem; }
          .post-related-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* ─── HERO ─── */}
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
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.45)' }}>{post.date}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(245,240,232,0.2)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.45)' }}>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ─── HERO IMAGE ─── */}
      <div style={{
        width: '100%',
        aspectRatio: '16/7',
        maxHeight: '500px',
        overflow: 'hidden',
        backgroundColor: post.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>{post.img}</span>
      </div>

      {/* ─── CONTENT ─── */}
      <section className="post-pad" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="post-body">

          {/* Excerpt pull quote */}
          <p style={{
            fontFamily: "'Carose', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
            lineHeight: 1.9,
            color: '#2C2820',
            textTransform: 'none',
            marginBottom: '2.5rem',
            borderLeft: '3px solid #1B3A5C',
            paddingLeft: '1.2rem',
          }}>
            {post.excerpt}
          </p>

          {/* Body content */}
          {post.content.map((block, i) => {
            if (block.includes('\n\n') && block.startsWith('**')) {
              const firstBreak = block.indexOf('\n\n');
              const heading = block.slice(2, block.indexOf('**', 2));
              const body = block.slice(firstBreak + 2);
              return (
                <div key={i} style={{ marginBottom: '2rem' }}>
                  <h2 style={{
                    fontFamily: "'Carose', sans-serif",
                    fontSize: '1rem',
                    color: '#1B3A5C',
                    textTransform: 'none',
                    marginBottom: '0.7rem',
                    letterSpacing: '0.03em',
                  }}>{heading}</h2>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.92rem',
                    lineHeight: 1.85,
                    color: '#2C2820',
                  }}>{body}</p>
                </div>
              );
            }
            return (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '0.92rem',
                lineHeight: 1.85,
                color: '#2C2820',
                marginBottom: '1.5rem',
              }}>
                {block}
              </p>
            );
          })}

          {/* Author */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #DDD5C0' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Something Blue Productions</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              Photography and video for weddings, families, newborn and maternity. Two studios in Cambridgeshire.
            </p>
            <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── RELATED POSTS ─── */}
      {post.related.some(s => posts[s]) && (
        <section className="post-pad" style={{ backgroundColor: '#E8DDB5' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.5rem' }}>Keep reading</p>
              <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#2C2820', textTransform: 'none' }}>Related posts</h2>
            </div>
            <div className="post-related-grid">
              {post.related.map((relSlug) => {
                const rel = posts[relSlug];
                if (!rel) return null;
                return (
                  <Link key={relSlug} href={`/journal/${relSlug}`} className="post-related-link">
                    <div className="post-related-img" style={{ aspectRatio: '3/2' }}>
                      <div className="post-related-img-inner" style={{ width: '100%', height: '100%', backgroundColor: rel.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', textAlign: 'center' }}>{rel.img}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.4rem' }}>{rel.category}</p>
                    <h3 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: '#2C2820', lineHeight: 1.4, textTransform: 'none' }}>{rel.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="post-pad" style={{ backgroundColor: '#0d1b2a', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#E8DDB5', textTransform: 'none', marginBottom: '1rem' }}>
            Ready to book?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Get in touch and we&apos;ll come back to you within 24 hours.
          </p>
          <Link href="/enquire" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', backgroundColor: '#E8DDB5', color: '#0d1b2a', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
            Start your enquiry
          </Link>
        </div>
      </section>
    </>
  );
}