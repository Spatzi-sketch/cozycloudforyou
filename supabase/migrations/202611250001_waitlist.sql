-- Cozy Cloud – Warteliste (Double Opt-in)
-- Erstellt am: 25.11.2026

-- Extension für UUIDs
create extension if not exists "pgcrypto";

-- Tabelle: Wartelisten-Anmeldungen
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),

  -- Normalisierte E-Mail-Adresse (kleingeschrieben, ohne Leerzeichen)
  email text not null,

  -- Zugehöriges Produkt (Slug)
  product_slug text not null,

  -- Restock-Runde, für die sich die Person eingetragen hat
  restock_round integer not null default 1,

  -- Status der Anmeldung
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'notified', 'unsubscribed')),

  -- Double Opt-in: Hash des Bestätigungstokens (einmalig, zeitlich begrenzt)
  confirmation_token_hash text,
  confirmation_token_expires_at timestamptz,

  -- Abmeldung: Hash des Abmeldetokens
  unsubscribe_token_hash text,

  -- Einwilligung
  consent_at timestamptz,
  consent_version text,

  -- Zeitstempel
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  notified_at timestamptz
);

-- Index für Produkt-Suche und Filterung im Admin-Bereich
create index if not exists idx_waitlist_signups_product_slug
  on public.waitlist_signups (product_slug);

create index if not exists idx_waitlist_signups_status
  on public.waitlist_signups (status);

create index if not exists idx_waitlist_signups_created_at
  on public.waitlist_signups (created_at desc);

-- Verhindere doppelte aktive Einträge für dieselbe E-Mail, dasselbe Produkt
-- und dieselbe Restock-Runde (nur aktive Statuswerte berücksichtigen)
create unique index if not exists idx_waitlist_signups_unique_active
  on public.waitlist_signups (email, product_slug, restock_round)
  where status in ('pending', 'confirmed', 'notified');

-- Row Level Security aktivieren
alter table public.waitlist_signups enable row level security;

-- Richtlinien
-- 1. Jeder darf neue Anmeldungen erstellen (Wartelisten-Formular)
create policy if not exists "Öffentliche Einträge können erstellt werden"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

-- 2. Nur authentifizierte Admins dürfen alle Einträge lesen
create policy if not exists "Nur Admins können Einträge lesen"
  on public.waitlist_signups
  for select
  to authenticated
  using (auth.uid() is not null);

-- 3. Nur authentifizierte Admins dürfen Einträge aktualisieren
--    (z. B. Status auf notified setzen nach Restock-Versand)
create policy if not exists "Nur Admins können Einträge aktualisieren"
  on public.waitlist_signups
  for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Kommentare
comment on table public.waitlist_signups is
  'Wartelisten-Anmeldungen für Produkt-Restocks mit Double Opt-in';
comment on column public.waitlist_signups.email is
  'Normalisierte E-Mail-Adresse (kleingeschrieben, ohne führende/nachfolgende Leerzeichen)';
comment on column public.waitlist_signups.confirmation_token_hash is
  'BCrypt/Argon2-Hash des einmaligen Bestätigungstokens (nicht der Rohtoken)';
comment on column public.waitlist_signups.unsubscribe_token_hash is
  'Hash des Abmeldetokens';
