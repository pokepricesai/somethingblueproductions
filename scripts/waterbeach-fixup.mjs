#!/usr/bin/env node
// Targeted fixes for records where the earlier substitution left broken text.
import { readFileSync } from 'node:fs';
try {
  const raw = readFileSync('.env.local', 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const SB = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' };

const FIXES = [
  {
    table: 'posts',
    slug: 'why-we-dont-charge-per-image-family-photography',
    field: 'faqs',
    value: JSON.stringify([
      { q: "What does all-inclusive pricing actually mean for a family session?", a: "It means you pay one set price that covers both your studio time and your final images. There's no separate viewing appointment, no per-image fees, and no upsells after the shoot. What you see on our pricing page is what you pay." },
      { q: "How many photos will we receive from a family session?", a: "Because we don't charge per image, we're not putting an artificial limit on your gallery. You'll receive the best shots from your session — we don't hold images back to sell them to you individually." },
      { q: "Where is your family studio?", a: "Our studio is in Papworth Everard, Cambridgeshire (CB23). It's a short drive from Cambridge, Huntingdon, St Neots and St Ives — with parking directly outside. Get in touch and we'll help you plan the day." },
    ]),
  },
  {
    table: 'posts',
    slug: 'best-studio-lighting-for-headshots',
    field: 'faqs',
    value: JSON.stringify([
      { q: "How long does a headshot session at Something Blue take?", a: "Most headshot sessions run between 60 and 90 minutes. That gives us enough time to try a couple of different setups, swap outfits if you want to, and make sure you're relaxed rather than feeling rushed. We'd rather take the time to get it right than hurry through it." },
      { q: "Do I need to do anything to prepare for studio lighting?", a: "Not much, honestly. Wear colours and styles that feel like you — avoid very busy patterns if you want a clean result. If you wear makeup, come with your usual look rather than going heavier than normal. Studio lighting is bright and detailed, so natural and considered always reads better than overdone. We'll guide you through the rest on the day." },
      { q: "Where do you shoot headshots?", a: "All headshots are shot at our Papworth Everard studio (CB23) — a short drive from Cambridge, Huntingdon, St Neots and St Ives. Parking is directly outside and the studio is set up for portrait work with controlled lighting." },
    ]),
  },
  // Also address the body of why-we-dont-charge that likely still has a similar issue.
  // Check body content.
];

// First fetch and inspect body of why-we-dont-charge to know if the same issue exists
async function fetchField(table, slug, field) {
  const res = await fetch(`${SB}/rest/v1/${table}?slug=eq.${slug}&select=${field}`, { headers });
  const [row] = await res.json();
  return row?.[field];
}

const body = await fetchField('posts', 'why-we-dont-charge-per-image-family-photography', 'body');
if (body && /Papworth Everard is well-placed|Waterbeach is easy to reach from/i.test(body)) {
  const fixed = body
    .replace(/Papworth Everard is well-placed if you're coming from the west of Cambridge, while Waterbeach is easy to reach from the north and east\.?/gi,
             "Our studio is in Papworth Everard, easy to reach from Cambridge, Huntingdon, St Neots and St Ives.")
    .replace(/Papworth Everard or Waterbeach/gi, "Papworth Everard");
  if (fixed !== body) FIXES.push({ table: 'posts', slug: 'why-we-dont-charge-per-image-family-photography', field: 'body', value: fixed });
}

const body2 = await fetchField('posts', 'best-studio-lighting-for-headshots', 'body');
if (body2 && /Waterbeach — and why|in the Papworth Everard studio where the light is|Waterbeach studio where the light is/i.test(body2)) {
  const fixed = body2
    .replace(/(in|at) the Papworth Everard studio where the light is/gi, "at the studio where the light is")
    .replace(/particularly in the Papworth Everard studio/gi, "particularly at the studio")
    .replace(/particularly in the Waterbeach studio/gi, "particularly at the studio")
    .replace(/we actually do at the studio — both in Papworth Everard and Waterbeach/gi, "we actually do at our Papworth Everard studio");
  if (fixed !== body2) FIXES.push({ table: 'posts', slug: 'best-studio-lighting-for-headshots', field: 'body', value: fixed });
}

// Apply
for (const f of FIXES) {
  console.log(`Fixing ${f.table}.${f.slug}.${f.field}`);
  const url = `${SB}/rest/v1/${f.table}?slug=eq.${encodeURIComponent(f.slug)}`;
  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify({ [f.field]: f.value }) });
  if (!res.ok) console.error('  FAILED', res.status, await res.text());
  else console.log('  ok');
}

console.log(`\n${FIXES.length} fix(es) applied.`);
