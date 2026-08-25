#!/usr/bin/env node
// One-off exhaustive audit of Waterbeach studio claims in Supabase.
// Run: node scripts/waterbeach-audit.mjs
import 'dotenv/config';
import { readFileSync } from 'node:fs';

// dotenv doesn't auto-load .env.local; parse manually
try {
  const raw = readFileSync('.env.local', 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const SB = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SB || !KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const INVALID_STUDIO_PATTERNS = [
  /Waterbeach studio/i,
  /Waterbeach studios/i,
  /studio in Waterbeach/i,
  /studio at Waterbeach/i,
  /our Waterbeach/i,
  /studios in Papworth Everard and Waterbeach/i,
  /studios in Papworth and Waterbeach/i,
  /Papworth Everard and Waterbeach studios/i,
  /two studios/i,
  /both studios/i,
  /our studios/i,
  /our spaces in Papworth/i,
  /our Cambridgeshire studios/i,
  /studios in Cambridgeshire/i,
  /between our studios/i,
  /on-site studio/i,
  /on site studio/i,
  /studio on site/i,
  /studio on-site/i,
  /studio right here in Waterbeach/i,
  /studio nearby.*Waterbeach/i,
  /Waterbeach.*studio nearby/i,
  /the Waterbeach studio/i,
  /at our Waterbeach/i,
  /our on-site studio/i,
];

function matchAll(text) {
  if (!text || typeof text !== 'string') return [];
  const hits = [];
  for (const re of INVALID_STUDIO_PATTERNS) {
    const m = text.match(re);
    if (m) hits.push({ pattern: re.source, snippet: text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40) });
  }
  return hits;
}

async function fetchAll(table, select = '*') {
  const res = await fetch(`${SB}/rest/v1/${table}?select=${encodeURIComponent(select)}`, { headers });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

function report(rows, tableName, textFields) {
  const findings = [];
  for (const row of rows) {
    for (const field of textFields) {
      const val = row[field];
      const scan = typeof val === 'string' ? val : (val == null ? '' : JSON.stringify(val));
      const hits = matchAll(scan);
      if (hits.length) {
        findings.push({
          table: tableName,
          slug: row.slug || row.id || 'unknown',
          field,
          hits,
        });
      }
    }
    // Special: check nearest_studio equality on locations
    if (tableName === 'locations' && row.nearest_studio && /waterbeach/i.test(row.nearest_studio)) {
      findings.push({
        table: 'locations',
        slug: row.slug,
        field: 'nearest_studio',
        hits: [{ pattern: 'field_equals_waterbeach', snippet: row.nearest_studio }],
      });
    }
  }
  return findings;
}

const locations = await fetchAll('locations');
const locationPages = await fetchAll('location_pages');
const posts = await fetchAll('posts');

const findings = [
  ...report(locations, 'locations', ['name', 'character', 'shoot_spots', 'nearest_studio']),
  ...report(locationPages, 'location_pages', ['title', 'meta_description', 'intro', 'body', 'faqs']),
  ...report(posts, 'posts', ['title', 'meta_description', 'excerpt', 'body', 'faqs']),
];

const grouped = {};
for (const f of findings) {
  const key = `${f.table}:${f.slug}`;
  if (!grouped[key]) grouped[key] = { table: f.table, slug: f.slug, fields: {} };
  if (!grouped[key].fields[f.field]) grouped[key].fields[f.field] = [];
  grouped[key].fields[f.field].push(...f.hits);
}

console.log(`\n=== Total records with false studio claims: ${Object.keys(grouped).length} ===\n`);
for (const [key, g] of Object.entries(grouped)) {
  console.log(`\n--- ${key} ---`);
  for (const [field, hits] of Object.entries(g.fields)) {
    console.log(`  [${field}] ${hits.length} hit(s)`);
    for (const h of hits) {
      console.log(`    ${h.pattern}`);
      console.log(`      "…${h.snippet.replace(/\n/g, ' ')}…"`);
    }
  }
}

console.log(`\n=== Summary ===`);
const byTable = {};
for (const g of Object.values(grouped)) byTable[g.table] = (byTable[g.table] || 0) + 1;
for (const [t, n] of Object.entries(byTable)) console.log(`  ${t}: ${n} records affected`);
