import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y';

const CATEGORIES = ['Weddings', 'Families', 'Newborn', 'Maternity', 'Studio', 'Commercial', 'Locations'];

const POST_BRIEFS = [
  { category: 'Families', brief: 'Write about the best seasons for outdoor family photography in Cambridgeshire. Mention specific locations like Grantchester Meadows, Hinchingbrooke Country Park, Wicken Fen. Give practical advice on timing and weather.' },
  { category: 'Weddings', brief: 'Write about how to choose between a wedding photographer and videographer, or both. Be honest about the trade-offs. Mention what couples most regret not capturing.' },
  { category: 'Newborn', brief: 'Write about the ideal timing for newborn photography — the first two weeks, why it matters, and how to prepare. Address common anxieties new parents have.' },
  { category: 'Maternity', brief: 'Write about what to wear for a maternity photography session. Cover studio and outdoor options. Give honest, practical styling advice.' },
  { category: 'Families', brief: 'Write about how to get natural-looking family photos — why posed shots often fail, what makes candid photography work, and how to choose a photographer whose style suits you.' },
  { category: 'Weddings', brief: 'Write about Cambridge and Cambridgeshire wedding venues from a photographer perspective. Mention Ely Cathedral, Hinchingbrooke House, college venues. What works photographically and why.' },
  { category: 'Studio', brief: 'Write about the difference between studio and outdoor photography sessions for families. Cover light, weather, young children, and which to choose in different circumstances.' },
  { category: 'Newborn', brief: 'Write about what happens during a newborn photography session — timeline, pace, baby-led approach, what parents can expect. Reassure anxious new parents.' },
  { category: 'Locations', brief: 'Write about family photography locations around Huntingdon — Hinchingbrooke Country Park, riverside meadows, Portholme. Specific, local, useful.' },
  { category: 'Locations', brief: 'Write about photography locations around Ely — the cathedral grounds, riverside, Jubilee Gardens. What works for weddings, families and maternity.' },
  { category: 'Families', brief: 'Write about what to wear for a family photography session. Cover colour coordination, avoiding busy patterns, dressing for the location, and what to avoid.' },
  { category: 'Commercial', brief: 'Write about creative headshots for performers and actors — what makes a good headshot, how to prepare, what to wear, studio vs location.' },
  { category: 'Weddings', brief: 'Write about documentary wedding photography — what it means, how it differs from traditional wedding photography, and why it suits modern couples.' },
  { category: 'Maternity', brief: 'Write about combining maternity and newborn photography sessions — the benefits, the savings, how the images complement each other.' },
  { category: 'Locations', brief: 'Write about photography locations around Cambridge — the Backs, Grantchester, Cherry Hinton Hall. Specific locations, best times of day, what works for different session types.' },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function getExistingSlugs(): Promise<string[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/posts?select=slug`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    },
  });
  const data = await res.json();
  return (data || []).map((p: { slug: string }) => p.slug);
}

async function generatePost(brief: typeof POST_BRIEFS[0]) {
  console.log('API KEY:', process.env.ANTHROPIC_API_KEY?.slice(0, 20) + '...');
  const prompt = `You are writing a journal post for Something Blue Productions, a premium photography studio based in Cambridgeshire with studios in Papworth Everard and Waterbeach.

Category: ${brief.category}
Brief: ${brief.brief}

Brand voice: Warm, honest, premium but not pretentious. No clichés like "capturing memories" or "timeless moments". Specific and practical. Human and conversational. Write as the photographer speaking directly to the client.

Return ONLY a valid JSON object with these exact fields, no other text:
{
  "title": "Post title — specific, useful, under 65 chars",
  "slug": "url-friendly-slug-from-title",
  "meta_description": "Meta description under 155 chars",
  "excerpt": "One sentence summary of the post, under 120 chars",
  "body": "Full post body, 600-800 words. Write in natural paragraphs. No markdown headers or bullet points — just flowing prose. Include specific local references where relevant. End with a soft call to action linking to the relevant service.",
  "faqs": [{"q": "question", "a": "answer"}, {"q": "question", "a": "answer"}, {"q": "question", "a": "answer"}],
  "image_tag": "one of: weddings, families, newborn, maternity, studio, commercial"
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
  const data = await res.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

async function savePost(post: Record<string, unknown>) {
  const res = await fetch(`${supabaseUrl}/rest/v1/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      slug: post.slug,
      title: post.title,
      meta_description: post.meta_description,
      category: post.category,
      excerpt: post.excerpt,
      body: post.body,
      faqs: JSON.stringify(post.faqs),
      image_tag: post.image_tag,
      published: true,
      published_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }
  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { brief: customBrief, category: customCategory, publish = true } = body;

    // Get existing slugs to avoid duplicates
    const existingSlugs = await getExistingSlugs();

    let selectedBrief;

    if (customBrief) {
      // Custom brief from admin
      selectedBrief = { category: customCategory || 'General', brief: customBrief };
    } else {
      // Pick a brief we haven't used recently
      const unused = POST_BRIEFS.filter(b => {
        const slug = generateSlug(b.brief.split(' ').slice(0, 6).join(' '));
        return !existingSlugs.some(s => s.includes(slug.slice(0, 10)));
      });
      selectedBrief = unused.length > 0
        ? unused[Math.floor(Math.random() * unused.length)]
        : POST_BRIEFS[Math.floor(Math.random() * POST_BRIEFS.length)];
    }

    const generated = await generatePost(selectedBrief);
    generated.category = selectedBrief.category;

    // Ensure unique slug
    let slug = generated.slug || generateSlug(generated.title);
    if (existingSlugs.includes(slug)) {
      slug = `${slug}-${Date.now()}`;
    }
    generated.slug = slug;

    if (publish) {
      await savePost(generated);
    }

    return NextResponse.json({ success: true, post: generated });

  } catch (err) {
    console.error('Generate post error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST to this endpoint to generate a journal post' });
}