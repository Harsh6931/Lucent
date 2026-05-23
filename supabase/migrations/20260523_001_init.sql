create extension if not exists "pgcrypto";

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  team_size integer not null check (team_size > 0),
  primary_use_case text not null,
  total_monthly_spend numeric(12,2) not null default 0,
  total_monthly_savings numeric(12,2) not null default 0,
  total_annual_savings numeric(12,2) not null default 0,
  audit_payload_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.audits(id) on delete cascade,
  email text not null,
  company_name text,
  role text,
  team_size integer check (team_size is null or team_size > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete set null,
  event_name text not null,
  event_payload_json jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audits_public_id on public.audits(public_id);
create index if not exists idx_audits_created_at on public.audits(created_at desc);
create index if not exists idx_leads_audit_id on public.leads(audit_id);
create index if not exists idx_leads_email on public.leads(email);
create index if not exists idx_events_audit_id on public.events(audit_id);
create index if not exists idx_events_created_at on public.events(created_at desc);

