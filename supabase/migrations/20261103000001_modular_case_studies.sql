-- ==============================================================================
-- Migration: Modular Case Study Narratives & Cloudflare R2 Media Integration
-- ==============================================================================

-- 1. Add modular case study sections and external links to projects table
alter table public.projects 
  add column if not exists sections jsonb default '[]'::jsonb,
  add column if not exists live_url text default '',
  add column if not exists behance_url text default '',
  add column if not exists dribbble_url text default '',
  add column if not exists github_url text default '',
  add column if not exists figma_url text default '';

-- 2. Ensure services table has capabilities list and 3D visual showcase image
alter table public.services
  add column if not exists capabilities text[] default '{}',
  add column if not exists image_url text default '',
  add column if not exists badge text default '';

-- 3. Confirm RLS is enabled on all tables
alter table if exists public.projects enable row level security;
alter table if exists public.services enable row level security;
alter table if exists public.clients enable row level security;
alter table if exists public.site_settings enable row level security;
alter table if exists public.inquiries enable row level security;
