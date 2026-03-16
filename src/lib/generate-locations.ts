// ============================================================
// SOMETHING BLUE — LOCATION PAGE GENERATOR
// Run with: npx tsx src/lib/generate-locations.ts
// Requires ANTHROPIC_API_KEY in .env.local
// ============================================================

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        if (!process.env[key]) process.env[key] = value;
      }
    }
  });
} catch {
  console.log('No .env.local found, using existing environment variables');
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const services = [
  {
    key: 'family',
    pageLabel: 'Family Photography',
    urlPattern: (slug: string) => `${slug}-family-photographer`,
  },
  {
    key: 'newborn',
    pageLabel: 'Newborn Photography',
    urlPattern: (slug: string) => `${slug}-newborn-photographer`,
  },
  {
    key: 'wedding',
    pageLabel: 'Wedding Photography',
    urlPattern: (slug: string) => `${slug}-wedding-photographer`,
  },
  {
    key: 'commercial',
    pageLabel: 'Commercial Photography',
    urlPattern: (slug: string) => `${slug}-commercial-photographer`,
  },
];

type Location = {
  name: string;
  slug: string;
  county: string;
  nearest_studio: string;
  distance_miles: number;
  character: string;
  shoot_spots: string;
  venues: string;
};

type Service = typeof services[0];

async function generatePageContent(location: Location, service: Service) {
  const prompt = `You are writing a page for Something Blue Productions, a premium photography studio based in Cambridgeshire with studios in Papworth Everard and Waterbeach.

Write a complete, high-quality SEO page for:
Service: ${service.pageLabel}
Location: ${location.name}, ${location.county}

Location details:
- Character: ${location.character}
- Good shoot spots: ${location.shoot_spots}
- Nearby venues: ${location.venues}
- Nearest studio: ${location.nearest_studio} Studio (${location.distance_miles} miles away)

Brand voice: Warm, honest, premium but not pretentious. No clichés like "capturing memories" or "timeless moments". Specific to the location. Human and conversational.

Return ONLY a valid JSON object with these exact fields, no other text:
{
  "title": "SEO page title under 60 chars",
  "meta_description": "Meta description under 155 chars",
  "intro": "Opening paragraph 2-3 sentences, location-specific and warm",
  "body": "Main body 400-600 words. Include local area context, why this location works for this service, specific shoot spots by name, studio proximity note, what clients can expect. Natural paragraphs, no markdown.",
  "faqs": [{"q": "question", "a": "answer"}, {"q": "question", "a": "answer"}, {"q": "question", "a": "answer"}, {"q": "question", "a": "answer"}]
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();

  if (!data.content || !data.content[0] || !data.content[0].text) {
    throw new Error(`Unexpected API response: ${JSON.stringify(data)}`);
  }

  const text = data.content[0].text;

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    throw new Error(`Failed to parse JSON: ${text.slice(0, 200)}`);
  }
}

async function run() {
  console.log('Fetching locations from Supabase...');

  const { data: locations, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');

  if (error || !locations) {
    console.error('Failed to fetch locations:', error);
    process.exit(1);
  }

  console.log(`Found ${locations.length} locations`);
  console.log(`Generating up to ${locations.length * services.length} pages...\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const location of locations) {
    for (const service of services) {
      const slug = service.urlPattern(location.slug);

      const { data: existing } = await supabase
        .from('location_pages')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existing) {
        console.log(`⏭  Skipping ${slug} (already exists)`);
        skipCount++;
        continue;
      }

      console.log(`⚙  Generating: ${slug}...`);

      try {
        const content = await generatePageContent(location as Location, service);

        const { error: insertError } = await supabase
          .from('location_pages')
          .insert({
            location_slug: location.slug,
            service: service.key,
            slug,
            title: content.title,
            meta_description: content.meta_description,
            intro: content.intro,
            body: content.body,
            faqs: JSON.stringify(content.faqs),
            published: true,
          });

        if (insertError) {
          console.error(`✗ Failed to save ${slug}:`, insertError.message);
          errorCount++;
        } else {
          console.log(`✓ Saved: ${slug}`);
          successCount++;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        console.error(`✗ Error on ${slug}:`, err instanceof Error ? err.message : err);
        errorCount++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Done!`);
  console.log(`✓ Generated: ${successCount}`);
  console.log(`⏭  Skipped:   ${skipCount}`);
  console.log(`✗ Errors:    ${errorCount}`);
  console.log(`========================================`);
}

run();