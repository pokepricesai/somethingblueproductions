-- Phase B — notification logging + spam classification + enquiry metadata
--
-- Run this in the Supabase SQL editor: Dashboard → SQL Editor → New query.
-- Idempotent (safe to re-run).

-- ────────────────────────────────────────────────────────────────────
-- notification_log
-- ────────────────────────────────────────────────────────────────────
-- Records every notification dispatch attempt (email, WhatsApp, etc.)
-- No PII beyond entity references so we can drop it aggressively later
-- without losing audit trail on message CONTENT.
create table if not exists public.notification_log (
  id             bigserial primary key,
  created_at     timestamptz not null default now(),
  event_type     text not null,     -- enquiry_alert | enquiry_confirmation | booking_alert | booking_confirmation | redeem_alert | test_alert | voucher_sold
  entity_type    text,              -- 'enquiry' | 'booking' | 'voucher' | 'test' | null
  entity_id      bigint,            -- id of the related row (not a real FK — no cascade)
  channel        text not null,     -- 'email' | 'whatsapp'
  recipient_type text,              -- 'admin' | 'customer' | 'test'
  ok             boolean not null,
  status_code    int,               -- HTTP status from provider
  provider_ref   text,              -- provider message id (Brevo messageId / WhatsApp wamid) — truncated to 200 chars
  error          text               -- truncated error message on failure (max 500 chars, no bodies)
);

alter table public.notification_log enable row level security;

-- No anon policies. Read via service role only.
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='notification_log' loop
    execute format('drop policy if exists %I on public.notification_log', p.policyname);
  end loop;
end $$;

create index if not exists idx_notification_log_entity
  on public.notification_log(entity_type, entity_id);
create index if not exists idx_notification_log_created
  on public.notification_log(created_at desc);

-- ────────────────────────────────────────────────────────────────────
-- enquiries — add spam/notification/audit columns
-- ────────────────────────────────────────────────────────────────────
alter table public.enquiries
  add column if not exists spam_status text not null default 'genuine';   -- genuine | suspected_spam | blocked_obvious_bot

alter table public.enquiries
  add column if not exists notification_status text default 'pending';    -- pending | sent | partial | failed | skipped_spam

alter table public.enquiries
  add column if not exists source_page text;

alter table public.enquiries
  add column if not exists ip text;

alter table public.enquiries
  add column if not exists user_agent text;

create index if not exists idx_enquiries_spam_status on public.enquiries(spam_status);
create index if not exists idx_enquiries_ip_created on public.enquiries(ip, created_at desc);

-- ────────────────────────────────────────────────────────────────────
-- enquiries RLS — remove anon INSERT once server route is live
-- ────────────────────────────────────────────────────────────────────
-- After the /api/enquiries server route is deployed AND you've verified
-- the /enquire form works end-to-end via it, run this to remove the
-- last remaining anon write:
--
--   drop policy if exists "enquiries_anon_insert" on public.enquiries;
--
-- Do NOT drop until the server route is verified — otherwise enquiries
-- fail if a cached browser hits the old client-side code path.
-- (This drop is intentionally NOT included above so it doesn't run
-- automatically.)

-- ────────────────────────────────────────────────────────────────────
-- Verification
-- ────────────────────────────────────────────────────────────────────
-- Confirm new table exists:
--   select * from public.notification_log limit 1;   -- returns nothing but doesn't error
--
-- Confirm columns added:
--   select column_name from information_schema.columns
--   where table_schema='public' and table_name='enquiries'
--     and column_name in ('spam_status','notification_status','source_page','ip','user_agent');
