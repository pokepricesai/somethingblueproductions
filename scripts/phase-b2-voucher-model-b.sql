-- Phase B2 — Model B gift-voucher workflow
--
-- Adds voucher_gift_sent_at so we can track and prevent duplicate sends of the
-- recipient-facing gift email. Recipient delivery is now MANUAL from the admin
-- panel; automatic sends stop at Stripe webhook (buyer confirmation + admin alert).
--
-- Idempotent — safe to re-run.

alter table public.vouchers
  add column if not exists voucher_gift_sent_at timestamptz;

-- Optional: index for admin dashboard queries filtering unsent gifts.
create index if not exists idx_vouchers_gift_sent_at
  on public.vouchers(voucher_gift_sent_at);

-- Verification:
--   select column_name from information_schema.columns
--   where table_schema='public' and table_name='vouchers'
--     and column_name='voucher_gift_sent_at';
