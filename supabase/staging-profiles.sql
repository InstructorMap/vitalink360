-- VITALINK 360 staging ONLY. Apply to a NEW independent Supabase project.
-- Run after enabling Supabase Auth. Never use production EMP credentials.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '',
 role text not null default 'socio' check (role in ('admin','operador','socio')),
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;
-- Self read only. No browser writes or role escalation.
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select to authenticated using (id=(select auth.uid()));
-- Create profiles / assign roles only through a trusted server/service-role workflow.
-- Never expose service_role in client code, HTML or GitHub.
