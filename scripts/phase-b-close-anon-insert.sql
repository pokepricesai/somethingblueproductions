-- Phase B closure: drop the temporary anon INSERT policy on enquiries.
--
-- Context:
--   During Phase A (emergency security lockdown) we kept `enquiries_anon_insert`
--   in place so the browser-side /enquire form (which still wrote directly to
--   Supabase with the anon key) would not break for real customers before we
--   could ship the server-side endpoint.
--
--   Phase B replaced the browser-side write with a server-side POST to
--   /api/enquiries, which uses the service-role key and enforces spam
--   protection, rate limiting, and notification dispatch. That endpoint is now
--   verified end-to-end in production (enquiry #24, notification_log ids 6+7).
--
--   With the server path proven, the anon INSERT policy is no longer needed
--   and represents a spam / abuse vector (any attacker with the anon key
--   could POST directly to PostgREST bypassing rate limits and spam checks).
--
-- Effect after this migration:
--   - anon role: cannot INSERT into enquiries
--   - anon role: cannot SELECT / UPDATE / DELETE enquiries (unchanged)
--   - authenticated role: unchanged (still cannot touch enquiries)
--   - service_role: unchanged (full access — used by /api/enquiries)
--
-- Rollback: recreate the policy with
--   CREATE POLICY "enquiries_anon_insert" ON public.enquiries
--     FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "enquiries_anon_insert" ON public.enquiries;

-- Verify: list remaining policies on enquiries.
-- Expected output: no INSERT policy for anon.
SELECT
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'enquiries'
ORDER BY policyname;
