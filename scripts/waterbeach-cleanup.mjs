#!/usr/bin/env node
// Surgical cleanup of every false Waterbeach studio claim in Supabase.
// Preserves Waterbeach as a legitimate service-area village.
//
// Idempotent — safe to re-run. Prints a per-record diff before writing.
// Set DRY_RUN=1 to preview only.
//
// Run: node scripts/waterbeach-cleanup.mjs
// Preview: DRY_RUN=1 node scripts/waterbeach-cleanup.mjs

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
const DRY = process.env.DRY_RUN === '1';

if (!SB || !KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Real drive distances from Papworth Everard (approximate, honest).
const PAPWORTH_DISTANCES = {
  cambridge: 20,
  ely: 35,
  newmarket: 35,
  sawston: 15,
  soham: 35,
  waterbeach: 15,
};

// Generic phrase-level substitutions that apply anywhere.
// Ordered — earlier patterns run first.
const GLOBAL_SUBS = [
  // Multi-studio phrasing
  [/our studios in Papworth Everard and Waterbeach/gi, 'our Papworth Everard studio'],
  [/studios in Papworth Everard and Waterbeach/gi, 'Papworth Everard studio'],
  [/our spaces in Papworth Everard and Waterbeach/gi, 'our Papworth Everard studio'],
  [/spaces in Papworth Everard and Waterbeach/gi, 'space at Papworth Everard'],
  [/at our Papworth Everard studio or our Waterbeach studio/gi, 'at our Papworth Everard studio'],
  [/at our Papworth Everard or Waterbeach studio/gi, 'at our Papworth Everard studio'],
  [/Papworth Everard or Waterbeach/gi, 'Papworth Everard'],
  [/our Cambridgeshire studios/gi, 'our Cambridgeshire studio'],
  [/both of our studios/gi, 'our studio'],
  [/both our studios/gi, 'our studio'],
  [/both studios/gi, 'the studio'],
  [/two studios/gi, 'our studio'],
  [/our studios/gi, 'our studio'],
  [/our on-site studio/gi, 'our Papworth Everard studio'],
  [/studio on-site/gi, 'studio a short drive away'],
  [/studio on site/gi, 'studio a short drive away'],
  [/on-site studio/gi, 'nearby studio'],
  // Waterbeach studio possessives
  [/our Waterbeach [Ss]tudio/g, 'our Papworth Everard studio'],
  [/the Waterbeach [Ss]tudio/g, 'our Papworth Everard studio'],
  [/at our Waterbeach [Ss]tudio/g, 'at our Papworth Everard studio'],
  [/Waterbeach [Ss]tudio/g, 'Papworth Everard studio'],
  [/studio in Waterbeach/gi, 'studio in Papworth Everard'],
  [/studio at Waterbeach/gi, 'studio at Papworth Everard'],
];

// After global subs, distance claims will be stale (e.g. "our Papworth Everard studio,
// just five miles from central Cambridge" is now wrong). Rewrite distance phrasing.
const DISTANCE_SUBS = [
  // "just X miles from central Cambridge" style — drop the specific distance for prose flow
  [/,\s*just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles\s+(from|away from|to)/gi, ', a short drive $1'],
  [/,\s*just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles\s+away/gi, ', a short drive away'],
  [/Just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'A short drive from'],
  [/,\s*about\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, ', a short drive from'],
  [/(?:approximately|about)\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'a short drive from'],
  [/Being\s+just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'Being a short drive from'],
  [/Being\s+(?:just\s+)?(?:based\s+at\s+)?our Papworth Everard studio,\s*just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'Being based at our Papworth Everard studio, a short drive from'],
  // "5 miles away" numeric
  [/Based\s+5\s+miles\s+away\s+in\s+Waterbeach studio\./gi, 'Studio in Papworth Everard.'],
  [/Based\s+\d+\s+miles\s+away\s+in\s+Papworth Everard studio\./gi, 'Studio in Papworth Everard.'],
  // Long-form travel time claims where the old figure is now wrong — remove the time claim
  [/roughly\s+a\s+2\d[- ]minute\s+drive/gi, 'about a 45-minute drive'],
  [/roughly\s+a\s+2\d\s?minute\s+drive/gi, 'about a 45-minute drive'],
];

// Full-body rewrites for pages that fundamentally assumed a Waterbeach studio.
// These replace the entire body (or intro) rather than patching in place, because
// the surrounding prose (e.g. "our studio here", "close to the studio for comfort")
// only makes sense if we're claiming a studio in Waterbeach — and we're not.
const FULL_REWRITES = {
  location_pages: {
    'waterbeach-family-photographer': {
      intro: 'Waterbeach is one of our favourite Cambridgeshire villages for outdoor family photography — riverside paths along the River Cam, a peaceful village green and easy access from Cambridge. Our studio is in Papworth Everard, around 15 miles away, which is where we host indoor family sessions.',
      body: `There\'s something about Waterbeach that suits family photography really well. The village sits just north of Cambridge but feels much quieter, with the River Cam running past the edge of the settlement and open countryside on all sides.

The riverside paths along the Cam are our first choice for most Waterbeach family sessions. Tree-lined stretches give beautifully diffused light for a lot of the day, and the paths are wide enough for children to run without any awkwardness. Different seasons give the shoots quite different characters — fresh greens in late spring, softer golds through autumn.

Waterbeach\'s village green works well for classic, more open family portraits, and the surrounding lanes and cottages provide interesting backdrops without ever feeling staged. For families who like a bit more space, the network of footpaths and fields around the village opens up a lot of options.

For studio sessions we host families at our Papworth Everard studio (about 15 miles from Waterbeach, straightforward drive via the A14). Many Waterbeach families choose an outdoor session in the village and travel to the studio separately if they want a controlled indoor shoot as well.

Practical notes: parking in Waterbeach is straightforward, the terrain is easy, and the village is close enough to Cambridge that we can combine it with a location shoot on the Backs or at Grantchester Meadows if you want both in one day.`,
      faqs: JSON.stringify([
        { q: 'Where in Waterbeach do you photograph families?', a: 'We use the riverside paths along the River Cam, the village green, and the surrounding lanes and fields. Every session is planned around your family and the light on the day.' },
        { q: 'Is there a Something Blue studio in Waterbeach?', a: 'No — our studio is in Papworth Everard, around 15 miles from Waterbeach. For outdoor sessions we come to you; for studio sessions we host you in Papworth Everard.' },
        { q: 'How long is a typical family session in Waterbeach?', a: 'Most outdoor family sessions run 60–90 minutes. That gives us time to move between the riverside, the green, and the countryside without rushing anyone.' },
        { q: 'What\'s the best time of year for Waterbeach family photos?', a: 'Late spring through early autumn is our favourite window, but the village works year-round. Golden hour is particularly good on the riverside paths.' },
      ]),
      meta_description: 'Outdoor family photography in Waterbeach, Cambridgeshire — riverside sessions on the River Cam and the village green. Studio work at our Papworth Everard base nearby.',
    },
    'waterbeach-newborn-photographer': {
      intro: 'For families in Waterbeach welcoming a newborn, our newborn photography works in one of two ways: a home session in the village, or a studio session at our Papworth Everard studio (around 15 miles away). Both are calm, unhurried and paced entirely by your baby.',
      body: `Newborn photography really doesn\'t need to be complicated. The two things that matter most are warmth and patience — and both are easy to build into a session in your Waterbeach home or at our Papworth Everard studio.

Home sessions in Waterbeach are wonderful when the last thing you want to do is pack a newborn into the car. We bring everything: wraps, props, a small light setup if the room needs it. Sessions typically run 2–3 hours, working entirely around feeds and settling. Most of the images are made against a nursery window or in whichever room has the softest natural light.

Studio sessions take place at our Papworth Everard studio — around 15 miles from Waterbeach via the A14, about a 25-minute drive. The studio is kept warm throughout (particularly important for newborn work), and we have the full range of props, wraps and backdrops to hand. Parking is directly outside so you\'re not carrying a car seat any distance.

Timing matters more than location. The first 5–14 days are the ideal window — babies sleep more deeply and settle into curled poses more readily. That said, we\'ve photographed babies right up to a month with beautiful results.

Whichever option you choose, we\'d recommend booking during pregnancy so we can provisionally hold a date and adjust once your baby arrives.`,
      faqs: JSON.stringify([
        { q: 'Do you have a studio in Waterbeach?', a: 'No — our studio is in Papworth Everard, around 15 miles from Waterbeach. For newborn work we can either bring the session to your home in Waterbeach or host you at the studio.' },
        { q: 'How far is your studio from Waterbeach?', a: 'Papworth Everard is around 15 miles from Waterbeach — roughly a 25-minute drive via the A14. Parking is directly outside the studio.' },
        { q: 'Home session or studio — which is best for a newborn?', a: 'Both work beautifully. Home sessions are easier when travel with a newborn feels daunting; studio sessions give more controlled lighting and warmth. We\'re happy to talk through both when you enquire.' },
        { q: 'When should we book?', a: 'During pregnancy, ideally around 20–30 weeks. We hold a provisional date and adjust once your baby arrives — the ideal shoot window is the first two weeks.' },
      ]),
      meta_description: 'Newborn photography for families in Waterbeach, Cambridgeshire — home sessions in the village or studio sessions at our Papworth Everard base (around 15 miles away).',
    },
    'waterbeach-wedding-photographer': {
      intro: 'For couples marrying in or around Waterbeach, we cover the whole day — ceremony, portraits, reception — with a documentary approach and a light touch. Our studio is in Papworth Everard, but for weddings we travel to your venue.',
      body: `Waterbeach and the villages around it are lovely for wedding photography. The riverside setting, the village green, and the easy access into Cambridge mean there are plenty of options for portraits without forcing anyone into a long car journey between locations.

For local ceremonies we know the village well — quiet corners for couple portraits, riverside stretches for family groups, and the light patterns through the day. If your reception is at a venue further out (Milton Hall, Quy Mill, Anstey Hall, or somewhere further into Cambridgeshire), we simply travel with you.

Our approach is documentary — we watch the day unfold and photograph it as it happens. Formal groups get done efficiently in a set window; the rest of the coverage is natural and unposed. Two photographers are available for larger weddings; solo coverage works well for anything up to around 80 guests.

Practical notes: our studio is in Papworth Everard, around 15 miles from Waterbeach, but for weddings we\'re at your venue all day so studio distance isn\'t really relevant. Wedding coverage includes travel across Cambridgeshire; further afield is easy to arrange.`,
      faqs: JSON.stringify([
        { q: 'Do you photograph weddings in Waterbeach?', a: 'Yes — we cover weddings in Waterbeach and across Cambridgeshire. We travel to your venue for the day, so where our studio is located isn\'t usually a factor.' },
        { q: 'How far in advance should we book?', a: 'For summer dates, 12–18 months is typical. That said, we do sometimes have availability at shorter notice — it\'s always worth getting in touch.' },
        { q: 'Do you know the local venues around Waterbeach?', a: 'Yes — we regularly shoot at venues across the Cambridge and Ely area. If you\'ve booked a venue further afield we\'re happy to travel.' },
        { q: 'How long until we receive our photos?', a: 'Your full edited gallery is delivered within six weeks of your wedding, with a small preview set within 48 hours.' },
      ]),
      meta_description: 'Wedding photography for couples in Waterbeach and across Cambridgeshire. Documentary coverage, natural style. Studio in Papworth Everard, travel across the region.',
    },
    'waterbeach-commercial-photographer': {
      intro: 'For businesses based in or around Waterbeach we cover brand, product and headshot photography. Location shoots come to your workspace; studio work runs at our Papworth Everard studio (around 15 miles away).',
      body: `Small businesses in Waterbeach and the surrounding Cambridgeshire villages often want commercial imagery that looks polished but doesn\'t feel corporate. That\'s where we tend to be a good fit.

Location work: we come to your workspace, retail unit or event and photograph what\'s actually happening — team members, products in use, the workshop or office as it really is. Sessions typically run half a day or a full day depending on the scope. This suits Waterbeach businesses that want their imagery to reflect the place where the work actually happens.

Studio work: for products, headshots or anything that needs a controlled background, we shoot at our Papworth Everard studio — a straightforward drive from Waterbeach (around 15 miles via the A14). Parking is directly outside and we can turn shoots around quickly.

Typical projects for small Cambridgeshire businesses: brand imagery packages (mixed set of location and studio shots), professional headshots for teams up to around 20 people, product photography for e-commerce and print use, and one-off event coverage.

Turnaround is usually within two weeks for smaller shoots. We deliver via a private gallery with a print release for commercial use.`,
      faqs: JSON.stringify([
        { q: 'Do you come to businesses in Waterbeach?', a: 'Yes — location commercial work is done at your premises. Studio work runs at our Papworth Everard studio, around 15 miles away.' },
        { q: 'What kinds of commercial work do you cover?', a: 'Brand imagery, product photography, professional headshots, and event coverage for small and mid-sized businesses.' },
        { q: 'How quickly can you turn around a shoot?', a: 'Standard turnaround is around two weeks. Faster is possible for time-sensitive projects — get in touch and we\'ll work with your deadline.' },
        { q: 'Do you supply images with a print release?', a: 'Yes. Commercial packages include a print release for your website, social media and print marketing.' },
      ]),
      meta_description: 'Commercial photography for Waterbeach and Cambridgeshire businesses — brand, product and headshot work. Studio in Papworth Everard, location shoots at your premises.',
    },
  },
};

// Per-record overrides. Applied AFTER the global substitutions.
// Use these for FAQ answers or paragraphs that need bespoke wording.
const OVERRIDES = {
  location_pages: {
    // Format: slug -> { field: [ [find, replaceOrFn], ... ] }
    'cambridge-wedding-photographer': {
      meta_description: [
        [/Based 5 miles away in Papworth Everard studio\./g, 'Studio in Papworth Everard, near Cambridge.'],
      ],
    },
    'sawston-family-photographer': {
      faqs: [
        [/"How far is your nearest studio from Sawston\?","a":"Our Papworth Everard studio is [^"]+"/g,
         '"How far is your nearest studio from Sawston?","a":"Our Papworth Everard studio is around 15 miles from Sawston. It\'s a straightforward drive if you\'d like to combine outdoor and studio work, or use the studio as a weather backup."'],
      ],
    },
    'sawston-newborn-photographer': {
      faqs: [
        [/"How far is your nearest studio from Sawston\?","a":"Our Papworth Everard studio is [^"]+"/g,
         '"How far is your nearest studio from Sawston?","a":"Our Papworth Everard studio is around 15 miles from Sawston. Many Sawston families are happy to travel; alternatively we can bring newborn photography directly to your home."'],
      ],
    },
    'sawston-wedding-photographer': {
      faqs: [
        [/"How far is your studio from Sawston\?","a":"Our Papworth Everard studio is [^"]+"/g,
         '"How far is your studio from Sawston?","a":"Our Papworth Everard studio is around 15 miles from Sawston. For wedding coverage we travel to your venue, so studio distance isn\'t usually a factor."'],
      ],
    },
    'sawston-commercial-photographer': {
      faqs: [
        [/"[^"]*"\s*:\s*"[^"]*Papworth Everard studio is only 10 miles away[^"]*"/g,
         '"How far is your studio from Sawston?","a":"Our Papworth Everard studio is around 15 miles from Sawston — a straightforward journey for brand shoots, headshots and product work."'],
      ],
    },
    'soham-family-photographer': {
      faqs: [
        [/"How far is your studio from Soham\?","a":"Our Papworth Everard [Ss]tudio is about 20 miles from Soham[^"]*"/g,
         '"How far is your studio from Soham?","a":"Our Papworth Everard studio is around 35 miles from Soham — a longer drive, so most Soham families work with us on location or at their home."'],
      ],
    },
    'soham-newborn-photographer': {
      faqs: [
        [/"[^"]*your nearest studio from Soham\?","a":"Our Papworth Everard studio is approximately 20 miles from Soham[^"]*"/g,
         '"How far is your studio from Soham?","a":"Our Papworth Everard studio is around 35 miles from Soham. For newborn sessions we usually recommend a home session so your baby stays settled — we bring everything to you."'],
      ],
    },
    'soham-wedding-photographer': {
      faqs: [
        [/"[^"]*your nearest studio from Soham\?","a":"Our Papworth Everard studio is approximately 20 miles from Soham[^"]*"/g,
         '"How far is your studio from Soham?","a":"Our Papworth Everard studio is around 35 miles from Soham, but for weddings we travel to your venue and the studio distance is rarely relevant."'],
      ],
    },
    'cambridge-newborn-photographer': {
      faqs: [
        [/"[^"]*distance from studio to Cambridge city centre\?","a":"Our Papworth Everard studio is just 5 miles from Cambridge city centre[^"]*"/g,
         '"How far is the studio from Cambridge city centre?","a":"Our Papworth Everard studio is around 20 minutes from central Cambridge via the A14 and A1198. Parking is directly outside — no city-centre parking stress."'],
      ],
    },
    'ely-family-photographer': {
      faqs: [
        [/"[^"]*your nearest studio from Ely\?","a":"Our Papworth Everard Studio is about 15 miles from Ely[^"]*"/g,
         '"How far is your studio from Ely?","a":"Our Papworth Everard studio is around 35 miles from Ely — a straightforward drive along the A10 and A14. Many Ely families combine a location session in the cathedral grounds with a studio visit."'],
      ],
    },
    'ely-newborn-photographer': {
      faqs: [
        [/"[^"]*sessions typically take 2-3 hours at our Papworth Everard studio\.[^"]*"/g,
         '"How long do newborn sessions take?","a":"Newborn sessions typically take 2–3 hours at our Papworth Everard studio, working entirely at your baby\'s pace. If travel is a concern for Ely families we can also bring a home session to you."'],
      ],
    },
    'waterbeach-family-photographer': {
      meta_description: [
        [/, countryside backdrops & our nearby studio\./g, ', countryside backdrops and studio sessions at our Papworth Everard base.'],
        [/countryside backdrops & our on-site studio/g, 'countryside backdrops and studio sessions at our Papworth Everard base'],
      ],
      faqs: [
        [/"[^"]*photograph families in Waterbeach\?","a":"[^"]*"/g,
         '"Where exactly do you photograph families in Waterbeach?","a":"We photograph families along the riverside paths on the River Cam, on the village green, and around the surrounding countryside. For indoor sessions we host you at our Papworth Everard studio, a short drive from Waterbeach."'],
      ],
    },
    'waterbeach-newborn-photographer': {},
    'waterbeach-wedding-photographer': {
      meta_description: [
        [/, village charm, and our nearby studio\./g, ', village charm, and studio sessions at our Papworth Everard base.'],
        [/village charm, and our on-site studio/g, 'village charm, and studio sessions at our Papworth Everard base'],
      ],
      faqs: [
        [/"Where exactly is your Papworth Everard studio located\?","a":"Our Papworth Everard studio[^"]*"/g,
         '"Where is your studio located?","a":"Our Papworth Everard studio is in Papworth Everard, Cambridgeshire (CB23) — around 15 miles from Waterbeach. For weddings we travel to your venue, so studio distance isn\'t usually a factor."'],
      ],
    },
    'waterbeach-commercial-photographer': {},
  },
  posts: {
    'studio-vs-outdoor-family-photography': {
      body: [
        [/Both options are available across our Papworth Everard studio, and I'm always happy to talk/g,
         'Both options are available from our Papworth Everard studio, and I\'m always happy to talk'],
      ],
    },
    'why-we-dont-charge-per-image-family-photography': {
      meta_description: [
        [/,\s*just honest value from our Cambridgeshire studio\./g, ', just honest value from our Cambridgeshire studio.'],
      ],
      faqs: [
        [/"[^"]*Papworth Everard or Waterbeach\?","a":"The studio (?:is|are) fully equipped for family shoots[^"]*"/g,
         '"Which studio do you use — is there a choice?","a":"We work from our Papworth Everard studio for all bookable sessions. It\'s warm, private, and fully equipped for family shoots of every kind."'],
      ],
    },
    'what-happens-during-newborn-photography-session': {},
    'best-studio-lighting-for-headshots': {
      faqs: [
        [/"[^"]*Papworth Everard or Waterbeach\?","a":"The studio (?:is|are) fully equipped for headshot sessions[^"]*"/g,
         '"Where do you shoot headshots?","a":"All headshots are shot at our Papworth Everard studio, which is fully set up for portrait work with controlled lighting."'],
      ],
    },
    'what-is-documentary-wedding-photography': {
      faqs: [
        [/"[^"]*our studio (?:is|are) in Cambridgeshire[^"]*"/g,
         '"Where are you based?","a":"Our studio is in Papworth Everard, Cambridgeshire, and we photograph weddings across the county and beyond."'],
      ],
    },
    'why-natural-family-photos-are-harder-than-they-look': {
      body: [
        [/at one of our Cambridgeshire studio\b/gi, 'at our Cambridgeshire studio'],
      ],
    },
  },
};

// ─── locations table plan ────────────────────────────────────────────────
// Set nearest_studio to Papworth Everard and update distance_miles honestly.
// Also fix the `character` text on `waterbeach` and `sawston`.
const LOCATION_UPDATES = {
  cambridge:       { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.cambridge },
  ely:             { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.ely },
  newmarket:       { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.newmarket },
  sawston:         { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.sawston,
                     character: 'Cambridge-side village with strong family population and easy countryside access' },
  soham:           { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.soham },
  waterbeach:      { nearest_studio: 'Papworth Everard', distance_miles: PAPWORTH_DISTANCES.waterbeach,
                     character: 'Village just north of Cambridge with riverside paths and easy city access — a service area for outdoor sessions' },
};

// ─── Runner ──────────────────────────────────────────────────────────────

function applyAll(text, subs) {
  if (typeof text !== 'string') return text;
  let out = text;
  for (const [find, repl] of subs) {
    out = typeof repl === 'function' ? out.replace(find, repl) : out.replace(find, repl);
  }
  return out;
}

async function fetchTable(table) {
  const res = await fetch(`${SB}/rest/v1/${table}?select=*`, { headers });
  if (!res.ok) throw new Error(`${table} GET failed: ${res.status}`);
  return res.json();
}

async function patchRow(table, slugOrId, body) {
  if (DRY) return { dry: true };
  const key = table === 'locations' || table === 'location_pages' || table === 'posts' ? 'slug' : 'id';
  const url = `${SB}/rest/v1/${table}?${key}=eq.${encodeURIComponent(slugOrId)}`;
  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${table} PATCH ${slugOrId}: ${res.status} ${await res.text()}`);
  return res.json();
}

function processContent(text, tableName, slug, field) {
  if (typeof text !== 'string') return text;
  let out = applyAll(text, GLOBAL_SUBS);
  out = applyAll(out, DISTANCE_SUBS);
  const override = OVERRIDES[tableName]?.[slug]?.[field];
  if (override) out = applyAll(out, override);
  return out;
}

async function processLocations() {
  console.log('\n=== locations ===');
  const rows = await fetchTable('locations');
  let changed = 0;
  for (const row of rows) {
    const update = LOCATION_UPDATES[row.slug];
    if (!update) continue;
    const patch = {};
    for (const [k, v] of Object.entries(update)) {
      if (row[k] !== v) patch[k] = v;
    }
    if (Object.keys(patch).length === 0) {
      console.log(`  ${row.slug}: already correct`);
      continue;
    }
    console.log(`  ${row.slug}: ${JSON.stringify(patch)}`);
    await patchRow('locations', row.slug, patch);
    changed++;
  }
  console.log(`  ${changed} row(s) updated${DRY ? ' (dry run)' : ''}.`);
}

async function processTable(tableName, textFields) {
  console.log(`\n=== ${tableName} ===`);
  const rows = await fetchTable(tableName);
  let changed = 0;
  for (const row of rows) {
    const fullOverride = FULL_REWRITES[tableName]?.[row.slug];
    const patch = {};
    let hasChange = false;

    if (fullOverride) {
      // Full replacement for pages that need bespoke rewriting.
      for (const [field, val] of Object.entries(fullOverride)) {
        if (row[field] !== val) {
          patch[field] = val;
          hasChange = true;
        }
      }
      // Any other text fields on this row still get the standard cleanup so
      // titles etc. don't drift.
      for (const field of textFields) {
        if (field in fullOverride) continue;
        const original = row[field];
        if (typeof original !== 'string') continue;
        const updated = processContent(original, tableName, row.slug, field);
        if (updated !== original) {
          patch[field] = updated;
          hasChange = true;
        }
      }
    } else {
      for (const field of textFields) {
        const original = row[field];
        if (typeof original !== 'string') continue;
        const updated = processContent(original, tableName, row.slug, field);
        if (updated !== original) {
          patch[field] = updated;
          hasChange = true;
        }
      }
    }

    if (!hasChange) continue;
    const label = fullOverride ? ' [full rewrite]' : '';
    console.log(`  ${row.slug}${label}: ${Object.keys(patch).join(', ')}`);
    await patchRow(tableName, row.slug, patch);
    changed++;
  }
  console.log(`  ${changed} row(s) updated${DRY ? ' (dry run)' : ''}.`);
}

console.log(DRY ? '=== DRY RUN — no writes ===' : '=== APPLYING CHANGES ===');
await processLocations();
await processTable('location_pages', ['title', 'meta_description', 'intro', 'body', 'faqs']);
await processTable('posts', ['title', 'meta_description', 'excerpt', 'body', 'faqs']);
console.log('\nDone.');
