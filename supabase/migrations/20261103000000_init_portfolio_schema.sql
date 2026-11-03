-- ==============================================================================
-- Portfolio & Admin CMS Database Schema
-- Brand: Abdul Ahad J (Graphic Designer & Visual Branding Specialist)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Admin profiles linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text default 'Abdul Ahad J',
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Project Categories
create table if not exists public.project_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Projects Table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  category text not null,
  category_slug text not null,
  short_description text not null,
  full_description text not null,
  client_name text default '',
  project_year text not null,
  role text not null,
  tools_used text[] default '{}',
  challenge text default '',
  creative_process text default '',
  solution text default '',
  results text[] default '{}',
  cover_image text not null,
  gallery text[] default '{}',
  video_url text default '',
  is_featured boolean default false,
  is_published boolean default true,
  sort_order integer default 0,
  seo_title text,
  seo_description text,
  social_share_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index frequently searched fields
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_category on public.projects(category_slug);
create index if not exists idx_projects_published on public.projects(is_published);
create index if not exists idx_projects_featured on public.projects(is_featured);

-- 4. Project Media Table (For fine-grained gallery and media management)
create table if not exists public.project_media (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  url text not null,
  alt text default '',
  caption text default '',
  media_type text default 'image',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_project_media_project_id on public.project_media(project_id);

-- 5. Services Table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  is_primary boolean default false,
  short_summary text not null,
  description text not null,
  deliverables text[] default '{}',
  typical_projects text[] default '{}',
  creative_process jsonb default '[]'::jsonb,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Experience Table
create table if not exists public.experience (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  role text not null,
  period text not null,
  is_current boolean default false,
  location text not null,
  responsibilities text[] default '{}',
  achievements text[] default '{}',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Skills Table
create table if not exists public.skills (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  items text[] default '{}',
  sort_order integer default 0
);

-- 8. Certifications Table
create table if not exists public.certifications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  issuer text not null,
  year text not null,
  url text default ''
);

-- 9. Awards Table
create table if not exists public.awards (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  issuer text not null,
  year text not null,
  description text not null
);

-- 10. Site Settings Table (Single-row configuration storage)
create table if not exists public.site_settings (
  id text primary key default 'global',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Inquiries Table (Client Contact & Project Leads)
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text default '',
  service_required text default '',
  budget_range text default '',
  details text not null,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);

-- 12. Clients Table (Client Logos & Partners Showcase)
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  website_url text default '',
  sort_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.project_categories enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.services enable row level security;
alter table public.experience enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.awards enable row level security;
alter table public.site_settings enable row level security;
alter table public.inquiries enable row level security;

-- Profiles: Admin only
create policy "Admins can view profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Admins can update profile" on public.profiles
  for update using (auth.uid() = id);

-- Projects: Public can read published projects; Authenticated admin can read/write all
create policy "Public can view published projects" on public.projects
  for select using (is_published = true or auth.role() = 'authenticated');

create policy "Admins can insert projects" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Admins can update projects" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Admins can delete projects" on public.projects
  for delete using (auth.role() = 'authenticated');

-- Project Categories: Public can view; Admin can write
create policy "Public can view categories" on public.project_categories
  for select using (true);
create policy "Admins can manage categories" on public.project_categories
  for all using (auth.role() = 'authenticated');

-- Project Media: Public can view; Admin can write
create policy "Public can view media" on public.project_media
  for select using (true);
create policy "Admins can manage media" on public.project_media
  for all using (auth.role() = 'authenticated');

-- Services: Public can view; Admin can write
create policy "Public can view services" on public.services
  for select using (true);
create policy "Admins can manage services" on public.services
  for all using (auth.role() = 'authenticated');

-- Experience: Public can view; Admin can write
create policy "Public can view experience" on public.experience
  for select using (true);
create policy "Admins can manage experience" on public.experience
  for all using (auth.role() = 'authenticated');

-- Skills: Public can view; Admin can write
create policy "Public can view skills" on public.skills
  for select using (true);
create policy "Admins can manage skills" on public.skills
  for all using (auth.role() = 'authenticated');

-- Certifications: Public can view; Admin can write
create policy "Public can view certifications" on public.certifications
  for select using (true);
create policy "Admins can manage certifications" on public.certifications
  for all using (auth.role() = 'authenticated');

-- Awards: Public can view; Admin can write
create policy "Public can view awards" on public.awards
  for select using (true);
create policy "Admins can manage awards" on public.awards
  for all using (auth.role() = 'authenticated');

-- Site Settings: Public can view; Admin can write
create policy "Public can view site settings" on public.site_settings
  for select using (true);
create policy "Admins can update site settings" on public.site_settings
  for all using (auth.role() = 'authenticated');

-- Inquiries: Public can insert; Only authenticated admin can view/manage
create policy "Public can insert inquiries" on public.inquiries
  for insert with check (true);

create policy "Admins can view inquiries" on public.inquiries
  for select using (auth.role() = 'authenticated');

create policy "Admins can update inquiries" on public.inquiries
  for update using (auth.role() = 'authenticated');

create policy "Admins can delete inquiries" on public.inquiries
  for delete using (auth.role() = 'authenticated');

-- Clients: Public can view visible; Admin can manage
alter table public.clients enable row level security;
create policy "Public can view visible clients" on public.clients
  for select using (is_visible = true or auth.role() = 'authenticated');
create policy "Admins can manage clients" on public.clients
  for all using (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE BUCKET SETUP
-- ==============================================================================
-- Insert the public bucket for portfolio media
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public Access to portfolio-media"
on storage.objects for select
using ( bucket_id = 'portfolio-media' );

create policy "Admin upload access to portfolio-media"
on storage.objects for insert
with check ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );

create policy "Admin update access to portfolio-media"
on storage.objects for update
using ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );

create policy "Admin delete access to portfolio-media"
on storage.objects for delete
using ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );
