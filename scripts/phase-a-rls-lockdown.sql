-- Phase A — RLS lockdown for customer data
--
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard → SQL Editor
--
-- What this does:
--   1. Enables RLS on enquiries, bookings, vouchers, posts (idempotent).
--   2. Drops any existing anon policies on these tables.
--   3. Grants ONLY the minimum access the public site still needs:
--        - enquiries: anon can INSERT (Phase A keeps the enquiry form working
--          from the browser; Phase B will move this server-side too).
--        - bookings: NO anon access at all. All reads/writes go via the
--          service role from server routes.
--        - vouchers: NO anon access at all. Server routes look up specific
--          codes; browsers never enumerate.
--        - posts: anon SELECT only (blog is public). Writes are admin-only
--          via server routes.
--   4. availability_slots and slot_overrides keep anon SELECT (no PII) but
--      lose anon INSERT/UPDATE/DELETE. Admin manages them via server routes.
--
-- Rollback: to fully undo, DROP the policies below and either disable RLS
-- or add "USING (true)" policies. Do this via the same SQL editor.

-- ────────────────────────────────────────────────────────────────────
-- enquiries
-- ────────────────────────────────────────────────────────────────────
alter table public.enquiries enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='enquiries' loop
    execute format('drop policy if exists %I on public.enquiries', p.policyname);
  end loop;
end $$;

-- Anon can INSERT enquiries but NOT read/update/delete them.
create policy "enquiries_anon_insert" on public.enquiries
  for insert to anon
  with check (true);

-- ────────────────────────────────────────────────────────────────────
-- bookings
-- ────────────────────────────────────────────────────────────────────
alter table public.bookings enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='bookings' loop
    execute format('drop policy if exists %I on public.bookings', p.policyname);
  end loop;
end $$;

-- No anon policies. All access via service_role (which bypasses RLS).

-- ────────────────────────────────────────────────────────────────────
-- vouchers
-- ────────────────────────────────────────────────────────────────────
alter table public.vouchers enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='vouchers' loop
    execute format('drop policy if exists %I on public.vouchers', p.policyname);
  end loop;
end $$;

-- No anon policies. Voucher lookup goes through /api/vouchers/validate.

-- ────────────────────────────────────────────────────────────────────
-- posts (blog / journal — public read, admin-only write)
-- ────────────────────────────────────────────────────────────────────
alter table public.posts enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='posts' loop
    execute format('drop policy if exists %I on public.posts', p.policyname);
  end loop;
end $$;

create policy "posts_anon_select" on public.posts
  for select to anon
  using (true);

-- ────────────────────────────────────────────────────────────────────
-- availability_slots (studio config — public read, admin-only write)
-- ────────────────────────────────────────────────────────────────────
alter table public.availability_slots enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='availability_slots' loop
    execute format('drop policy if exists %I on public.availability_slots', p.policyname);
  end loop;
end $$;

create policy "availability_slots_anon_select" on public.availability_slots
  for select to anon
  using (true);

-- ────────────────────────────────────────────────────────────────────
-- slot_overrides (per-date open/close overrides — public read, admin-only write)
-- ────────────────────────────────────────────────────────────────────
alter table public.slot_overrides enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='slot_overrides' loop
    execute format('drop policy if exists %I on public.slot_overrides', p.policyname);
  end loop;
end $$;

create policy "slot_overrides_anon_select" on public.slot_overrides
  for select to anon
  using (true);

-- ────────────────────────────────────────────────────────────────────
-- Verification
-- ────────────────────────────────────────────────────────────────────
-- After running, verify from a browser DevTools console or curl WITHOUT
-- any auth header (the anon key is enough):
--
--   curl -H "apikey: <ANON_KEY>" \
--        "https://knwyfoqmlwbxtfhvkbmc.supabase.co/rest/v1/enquiries?select=id"
--   → should return [] (empty array — anon has no SELECT on enquiries)
--
--   curl -H "apikey: <ANON_KEY>" \
--        "https://knwyfoqmlwbxtfhvkbmc.supabase.co/rest/v1/bookings?select=id"
--   → should return []
--
--   curl -H "apikey: <ANON_KEY>" \
--        "https://knwyfoqmlwbxtfhvkbmc.supabase.co/rest/v1/vouchers?select=id"
--   → should return []
