import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — SERVER ONLY.
 *
 * This client bypasses RLS. Never import this from a client component or
 * expose the key to the browser.
 *
 * Use for:
 *   - Admin data reads (/api/admin/*)
 *   - Trusted server writes (booking/voucher creation, notification lookups)
 *   - Anything that must run without anon-key restrictions
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
