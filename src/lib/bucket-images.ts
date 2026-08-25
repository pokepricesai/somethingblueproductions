import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/site-images`;

// Generic fallback shown when a per-location hero image doesn't exist in the
// bucket. Must be a real image that already ships with the site.
const GENERIC_LOCATION_FALLBACK = 'services-families.jpg';

type StorageItem = { name: string; id?: string | null };

async function listWithPrefix(prefix: string): Promise<string[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/site-images`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prefix,
        limit: 200,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const items = (await res.json()) as StorageItem[];
    // Storage list returns files (with id) and folders (id null). Keep files only.
    return items.filter((i) => i.id).map((i) => i.name);
  } catch {
    return [];
  }
}

/**
 * Returns the hero image URL + alt text for a given location slug.
 *
 * If `location-{slug}.jpg` exists in the site-images bucket, the genuine
 * per-location image is used. Otherwise a generic fallback is used with a
 * generic alt string that does not claim the photograph depicts the town.
 *
 * When a real image is later uploaded to the bucket, it will replace the
 * fallback automatically on the next revalidation (1h) — no code changes.
 */
export async function getLocationHeroImage(
  slug: string,
  locationName: string
): Promise<{ src: string; alt: string; isGeneric: boolean }> {
  const files = await listWithPrefix('location-');
  const expected = `location-${slug}.jpg`;
  if (files.includes(expected)) {
    return {
      src: `${STORAGE_BASE}/${expected}`,
      alt: `Photography in ${locationName}`,
      isGeneric: false,
    };
  }
  return {
    src: `${STORAGE_BASE}/${GENERIC_LOCATION_FALLBACK}`,
    alt: 'Something Blue Productions photography across Cambridgeshire',
    isGeneric: true,
  };
}
