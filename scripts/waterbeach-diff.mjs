#!/usr/bin/env node
// Show before/after for specific records
import { readFileSync } from 'node:fs';
try {
  const raw = readFileSync('.env.local', 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const { default: cleanup } = await import('./waterbeach-cleanup.mjs').catch(() => ({}));

// Re-import subs — easier: duplicate here for isolated preview
const GLOBAL_SUBS = [
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
  [/our Waterbeach [Ss]tudio/g, 'our Papworth Everard studio'],
  [/the Waterbeach [Ss]tudio/g, 'our Papworth Everard studio'],
  [/at our Waterbeach [Ss]tudio/g, 'at our Papworth Everard studio'],
  [/Waterbeach [Ss]tudio/g, 'Papworth Everard studio'],
  [/studio in Waterbeach/gi, 'studio in Papworth Everard'],
  [/studio at Waterbeach/gi, 'studio at Papworth Everard'],
];
const DISTANCE_SUBS = [
  [/,\s*just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles\s+(from|away from|to)/gi, ', a short drive $1'],
  [/,\s*just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles\s+away/gi, ', a short drive away'],
  [/Just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'A short drive from'],
  [/,\s*about\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, ', a short drive from'],
  [/(?:approximately|about)\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'a short drive from'],
  [/Being\s+just\s+(?:five|5|ten|10|15|fifteen|20|twenty)\s+miles from/gi, 'Being a short drive from'],
  [/Based\s+5\s+miles\s+away\s+in\s+Waterbeach studio\./gi, 'Studio in Papworth Everard.'],
];

function apply(s, subs) { let o=s; for (const [f,r] of subs) o=o.replace(f,r); return o; }

const SB = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const [table, slug, field] = process.argv.slice(2);
if (!table || !slug || !field) { console.error('Usage: node waterbeach-diff.mjs <table> <slug> <field>'); process.exit(1); }

const res = await fetch(`${SB}/rest/v1/${table}?slug=eq.${slug}&select=${field}`, { headers });
const [row] = await res.json();
const before = row[field];
const after = apply(apply(before, GLOBAL_SUBS), DISTANCE_SUBS);

console.log('\n=== BEFORE ===\n');
console.log(before);
console.log('\n=== AFTER ===\n');
console.log(after);
