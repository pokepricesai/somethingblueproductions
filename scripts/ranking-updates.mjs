#!/usr/bin/env node
// Ranking-sprint DB updates: Cambridge newborn spoke + St Neots newborn spoke.
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
const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// ── Cambridge newborn spoke ─────────────────────────────────────────
const CAMBRIDGE_NEWBORN = {
  slug: 'cambridge-newborn-photographer',
  title: 'Newborn & Baby Photographer Cambridge | Something Blue',
  meta_description:
    "Newborn and baby photography for families in Cambridge. Sessions at our Papworth Everard studio (a short drive from the city) or in your home. Baby-led, unhurried, warm.",
  intro:
    "Cambridge has beautiful spots for outdoor family imagery, but for your newborn, comfort and warmth come first. We host most newborn sessions for Cambridge families at our Papworth Everard studio — a short drive from the city — with home sessions available if you'd rather stay put.",
  body: [
    // Remove the invented academics/students demographic entirely.
    "Our approach to newborn photography for Cambridge families centres around your baby's needs above all else. Most sessions run at our Papworth Everard studio — a short drive from the city — where we can control the light, warmth and pace. Home sessions in Cambridge are also available if you'd prefer not to travel with a newborn.",

    "If you'd like to include some of Cambridge's character alongside a studio or home session, we can add a short location visit — the quieter corners near The Backs, Cherry Hinton Hall for spring and summer sessions, or a family portrait somewhere that means something to you. Outdoor time with a newborn is always brief and weather-dependent; we prioritise your baby's comfort throughout.",

    "The studio is warm year-round (particularly important for newborn work), private (no other clients during your session), and set up with everything we need — soft blankets, wraps, backdrops and a professional lighting setup. Parking is directly outside, which matters when you're travelling with a young baby and a car seat.",

    "We keep sessions genuinely unhurried. Typical sessions run 2–3 hours and are paced entirely by your baby — feeds, changes, and settling time all built in. We're not chasing a checklist; we're waiting for the moments that actually matter and photographing them as they happen.",

    "For families combining maternity and newborn as a single bump-to-baby journey, having the same photographer for both means we already know you and your family before baby arrives. Full details of our approach, packages and timing are on our newborn photography page: https://something-blue-productions.com/newborn",
  ].join('\n\n'),
  faqs: JSON.stringify([
    {
      q: "How far is your studio from Cambridge city centre?",
      a: "Our Papworth Everard studio (CB23) is a short drive from Cambridge city centre — around 20 minutes via the A14/A1198. Parking is directly outside, so you're not carrying a car seat any distance.",
    },
    {
      q: "Can we have a newborn home session in Cambridge instead?",
      a: "Yes. If you'd rather not travel with a newborn, we can bring the session to your home in Cambridge. We provide the props, wraps and light setup — you provide the space and the baby.",
    },
    {
      q: "Do you photograph newborns outdoors in Cambridge?",
      a: "Very briefly, if you'd like a family portrait somewhere meaningful. Outdoor time with a newborn is short and weather-dependent, so most of the session runs in a warm, controlled space — either the studio or your home.",
    },
    {
      q: "When is the best time to book?",
      a: "During pregnancy, ideally around 20–30 weeks. We hold a provisional date and confirm the actual session once your baby arrives. The ideal shoot window is the first 5–14 days.",
    },
  ]),
};

// ── St Neots newborn spoke ─────────────────────────────────────────
const ST_NEOTS_NEWBORN = {
  slug: 'st-neots-newborn-photographer',
  // Title stays clean; template H1 now renders "St Neots Newborn Photography".
  title: 'Newborn Photographer St Neots | Something Blue',
  meta_description:
    "Newborn photography for families in St Neots. Studio sessions at our Papworth Everard studio, or a home session in St Neots — from £99. Unhurried, warm, baby-led.",
  // Keep the existing intro/body — they're strong and use real local venues.
  // Only modify the meta and title above.
};

// ── Runner ──────────────────────────────────────────────────────────
async function patchRow(slug, patch) {
  const url = `${SB}/rest/v1/location_pages?slug=eq.${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`${slug}: ${res.status} ${await res.text()}`);
  return res.json();
}

const CAMBRIDGE_PATCH = {
  title: CAMBRIDGE_NEWBORN.title,
  meta_description: CAMBRIDGE_NEWBORN.meta_description,
  intro: CAMBRIDGE_NEWBORN.intro,
  body: CAMBRIDGE_NEWBORN.body,
  faqs: CAMBRIDGE_NEWBORN.faqs,
};

const ST_NEOTS_PATCH = {
  title: ST_NEOTS_NEWBORN.title,
  meta_description: ST_NEOTS_NEWBORN.meta_description,
};

console.log('Applying updates…');
await patchRow('cambridge-newborn-photographer', CAMBRIDGE_PATCH);
console.log('  cambridge-newborn-photographer: title, meta, intro, body, faqs updated');
await patchRow('st-neots-newborn-photographer', ST_NEOTS_PATCH);
console.log('  st-neots-newborn-photographer: title, meta updated');
console.log('Done.');
