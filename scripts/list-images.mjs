#!/usr/bin/env node
// List all objects in the site-images Supabase bucket.
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
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

async function listAll(bucket, prefix = '', out = []) {
  const res = await fetch(`${SB}/storage/v1/object/list/${bucket}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ prefix, limit: 1000, offset: 0, sortBy: { column: 'name', order: 'asc' } }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const items = await res.json();
  for (const it of items) {
    if (it.id) {
      out.push(`${prefix}${it.name}`);
    } else if (it.name) {
      // Folder — recurse
      await listAll(bucket, `${prefix}${it.name}/`, out);
    }
  }
  return out;
}

const files = await listAll('site-images');
console.log(files.sort().join('\n'));
console.log(`\n--- ${files.length} object(s) ---`);
