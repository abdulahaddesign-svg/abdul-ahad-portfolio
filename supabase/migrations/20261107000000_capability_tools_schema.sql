-- ==============================================================================
-- CAPABILITY CATEGORIES & TOOLS SCHEMA MIGRATION
-- Supports dynamic 4-group Tools & Capabilities section in Abdul Ahad Portfolio
-- ==============================================================================

create table if not exists public.capability_categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text default '',
  position text not null default 'top' check (position in ('top', 'left', 'right', 'bottom')),
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.capability_tools (
  id text primary key,
  category_id text not null references public.capability_categories(id) on delete cascade,
  name text not null,
  slug text not null,
  icon_url text default '',
  description text default '',
  website_url text default '',
  alt_text text default '',
  is_software boolean not null default true,
  proficiency text default 'Advanced',
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Performance Indexes
create index if not exists idx_capability_categories_order on public.capability_categories (display_order);
create index if not exists idx_capability_categories_pos on public.capability_categories (position);
create index if not exists idx_capability_tools_cat_order on public.capability_tools (category_id, display_order);

-- Enable Row Level Security (RLS)
alter table public.capability_categories enable row level security;
alter table public.capability_tools enable row level security;

-- Public read policies
drop policy if exists "Public can view visible capability categories" on public.capability_categories;
create policy "Public can view visible capability categories" on public.capability_categories
  for select using (is_visible = true or auth.role() = 'authenticated');

drop policy if exists "Public can view visible capability tools" on public.capability_tools;
create policy "Public can view visible capability tools" on public.capability_tools
  for select using (is_visible = true or auth.role() = 'authenticated');

-- Admin full access policies
drop policy if exists "Admins can manage capability categories" on public.capability_categories;
create policy "Admins can manage capability categories" on public.capability_categories
  for all using (auth.role() = 'authenticated');

drop policy if exists "Admins can manage capability tools" on public.capability_tools;
create policy "Admins can manage capability tools" on public.capability_tools
  for all using (auth.role() = 'authenticated');
