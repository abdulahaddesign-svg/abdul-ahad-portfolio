-- ==============================================================================
-- ABDUL AHAD PORTFOLIO & CMS — COMPLETE ONE-CLICK DATABASE SETUP
-- Brand: Abdul Ahad J (Graphic Designer & Visual Branding Specialist)
-- Target: Supabase PostgreSQL (Run in Supabase Dashboard -> SQL Editor)
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

-- 2. Project Categories Table
create table if not exists public.project_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Projects Table (with modular narrative sections and external showcase links)
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  category text not null,
  category_slug text not null,
  short_description text not null,
  full_description text not null,
  sections jsonb default '[]'::jsonb,
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
  live_url text default '',
  behance_url text default '',
  dribbble_url text default '',
  github_url text default '',
  figma_url text default '',
  is_featured boolean default false,
  is_published boolean default true,
  sort_order integer default 0,
  seo_title text,
  seo_description text,
  social_share_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_category on public.projects(category_slug);

-- 4. Services Table (with capabilities checklist & 3D carousel showcase image)
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  short_summary text not null,
  description text not null,
  deliverables text[] default '{}',
  capabilities text[] default '{}',
  badge text default '',
  image_url text default '',
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Clients Table (Brand logos for homepage marquee)
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  website_url text default '',
  sort_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Site Settings Table (Global branding, bio, photo, contact, resume)
create table if not exists public.site_settings (
  id text primary key default 'primary',
  name text not null default 'Abdul Ahad J',
  title text not null default 'Graphic Designer | Visual Branding Specialist | Creative Designer',
  tagline text not null default 'Designed with intent. Made to matter.',
  email text not null default 'abdulahad.ofcl@gmail.com',
  phone text not null default '+91 9150037005',
  location text not null default 'Coimbatore, Tamil Nadu, India',
  behance_url text default 'https://www.behance.net/abdulahad438',
  linkedin_url text default 'https://www.linkedin.com/in/abdulahadj',
  hero_headline text default 'Design that makes businesses stand out.',
  hero_supporting_copy text default 'Thoughtful visual identities, digital experiences and motion-led content built with purpose and precision.',
  about_headline text default 'I create visual experiences that make ideas matter.',
  about_intro text default 'Abdul Ahad J is a creative designer based in Coimbatore, India, with 3+ years of experience in graphic design, visual branding and digital creative production.',
  about_philosophy text default 'Design is not decorative styling; it is clear thinking made visible. I combine visual harmony, typographic discipline, and strategic intent to craft brand experiences that command attention, build credibility, and inspire action.',
  about_description text default 'He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025.',
  about_bio text default 'He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025.',
  profile_photo_url text default '/profile/abdul-ahad.jpg',
  resume_url text default '/resume/abdul-ahad-resume.pdf',
  resume_label text default 'PDF · Updated Resume',
  resume_visible boolean default true,
  education_degree text default 'Bachelor of Science in Computer Science',
  education_institution text default 'Government Arts College (Autonomous), Coimbatore',
  education_year text default '2020 – 2023',
  education_aggregate text default '80% Aggregate',
  footer_appearance text default 'dark',
  footer_logo_light_url text default '/brand/logo-wordmark-clean-light.png',
  footer_logo_dark_url text default '/brand/logo-wordmark-clean-dark.png',
  footer_description text default 'Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India.',
  footer_copyright text default 'Abdul Ahad J. All rights reserved.',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Inquiries Table (Client project briefs submitted via /contact)
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text default '',
  service_required text not null,
  budget_range text default 'Flexible',
  details text not null,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.project_categories enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.site_settings enable row level security;
alter table public.inquiries enable row level security;

-- Public Read Policies
create policy "Public can view categories" on public.project_categories for select using (true);
create policy "Public can view published projects" on public.projects for select using (is_published = true or auth.role() = 'authenticated');
create policy "Public can view published services" on public.services for select using (is_published = true or auth.role() = 'authenticated');
create policy "Public can view visible clients" on public.clients for select using (is_visible = true or auth.role() = 'authenticated');
create policy "Public can view site settings" on public.site_settings for select using (true);

-- Public Insert for Inquiries
create policy "Public can submit inquiries" on public.inquiries for insert with check (true);

-- Admin Full Access Policies
create policy "Admins manage profiles" on public.profiles for all using (auth.role() = 'authenticated');
create policy "Admins manage categories" on public.project_categories for all using (auth.role() = 'authenticated');
create policy "Admins manage projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Admins manage services" on public.services for all using (auth.role() = 'authenticated');
create policy "Admins manage clients" on public.clients for all using (auth.role() = 'authenticated');
create policy "Admins manage site settings" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "Admins view and manage inquiries" on public.inquiries for all using (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE BUCKET FOR MEDIA UPLOADS
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public Access to portfolio-media" on storage.objects for select using ( bucket_id = 'portfolio-media' );
create policy "Admin upload access to portfolio-media" on storage.objects for insert with check ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );
create policy "Admin update access to portfolio-media" on storage.objects for update using ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );
create policy "Admin delete access to portfolio-media" on storage.objects for delete using ( bucket_id = 'portfolio-media' and auth.role() = 'authenticated' );

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
insert into public.project_categories (name, slug, sort_order) values
('Branding', 'branding', 1),
('Graphic Design', 'graphic-design', 2),
('Social Media', 'social-media', 3),
('UI/UX', 'ui-ux', 4),
('Motion Graphics', 'motion-graphics', 5),
('Video Editing', 'video-editing', 6),
('Web & App', 'web-app', 7),
('Packaging & Print', 'packaging-print', 8)
on conflict (slug) do nothing;

insert into public.site_settings (id) values ('primary') on conflict (id) do nothing;

-- Initial Services
insert into public.services (slug, title, short_summary, description, deliverables, capabilities, badge, image_url, sort_order, is_published)
values
(
  'graphic-design-visual-branding',
  'Graphic Design & Visual Branding',
  'Conceptual wordmarks, brand style guides, marketing collateral, packaging, and high-impact visual design systems.',
  'A strategic approach to visual branding that unites logos, color theory, typography, and marketing assets into cohesive identities.',
  ARRAY['Logo System & Wordmark Variations', 'Brand Guidelines & Design Tokens', 'Packaging & Print Production Files', 'Marketing Collateral Suite'],
  ARRAY['Logo Design & Identity Systems', 'Packaging, Labels & Print Production', 'Marketing Collaterals & Social Media Kits', 'Brand Guidelines & Typographic Systems'],
  'Core Discipline',
  '/projects/branding-thumb.svg',
  1,
  true
),
(
  'brand-identity-design',
  'Brand Identity Design',
  'Complete end-to-end brand ecosystems engineered for recognition, memorability, and commercial differentiation.',
  'Comprehensive brand architecture engineered for growing businesses, startups, and creative ventures.',
  ARRAY['Primary, Secondary & Monogram Marks', 'Custom Brand Color Palettes', 'Typography Hierarchy Guide', 'Stationery & Digital Assets'],
  ARRAY['Custom Brand Mark Design', 'Corporate Stationery & Presentation Decks', 'Multi-Platform Asset Libraries', 'Visual Voice & Tone Specifications'],
  'Strategic',
  '/projects/reztro/reztro-brand.svg',
  2,
  true
),
(
  'ui-ux-design',
  'UI/UX Design',
  'Human-centered digital product design across web applications, responsive websites, and mobile apps.',
  'Design thinking methodology applied to user research, wireframing, high-fidelity UI design, and interactive Figma prototyping.',
  ARRAY['Figma Component Design Systems', 'Interactive Responsive Prototypes', 'User Journey Maps & Wireframes', 'Developer Handoff Specifications'],
  ARRAY['Mobile-First Web & App Interfaces', 'Figma Design Systems & Auto-Layout', 'UX Journey Audits & User Testing', 'Interactive Clickable Prototypes'],
  'Flagship',
  '/projects/reztro/reztro-mobile-flow.svg',
  3,
  true
),
(
  'motion-graphics',
  'Motion Graphics',
  'Dynamic animated brand marks, kinetic typography, promotional video animations, and interface micro-interactions.',
  'Transforming static visual identities into living, breathing motion narratives that capture attention across social feeds and web interfaces.',
  ARRAY['Animated Logo Reveals (Lottie & MP4)', 'Social Media Video Campaigns', 'Kinetic Typography Sequences', 'UI Micro-Interaction Prototypes'],
  ARRAY['Logo Stings & Brand Animation', 'Lottie Animation for Web & Apps', 'Social Ad Sequences & Title Cards', 'After Effects & Cinema 4D Pipelines'],
  'Motion',
  '/projects/motion-thumb.svg',
  4,
  true
),
(
  'video-editing',
  'Video Editing',
  'Pacing, narrative editing, color grading, sound design, and post-production for commercial and brand campaigns.',
  'Professional video post-production tailored for brand stories, promotional reels, client interviews, and social campaigns.',
  ARRAY['Commercial Video Cuts (4K / 1080p)', 'Social Reels & TikTok Short-Form', 'Color Grading & Sound Mastering', 'Multi-Format Aspect Ratio Deliverables'],
  ARRAY['High-Retention Pacing & Rhythm', 'Color Correction & Cinematic LUTs', 'Sound Design & Royalty-Free Audio', 'Vertical Reels & Landscape 16:9'],
  'Post-Production',
  '/projects/video-thumb.svg',
  5,
  true
),
(
  'web-app-design',
  'Web & App Design',
  'Modern, responsive digital experiences built for performance, accessibility, and high conversion.',
  'Digital design that bridges brand aesthetics and engineering reality, creating seamless web and mobile experiences.',
  ARRAY['Responsive Desktop & Mobile Layouts', 'Landing Page Wireframes & Mockups', 'Iconography & Design Tokens', 'Design System Documentation'],
  ARRAY['Modern Landing Pages & Dashboards', 'Tailwind & Next.js Layout Mapping', 'Accessibility & SEO Structural Design', 'Conversion-Optimized Wireframes'],
  'Digital',
  '/projects/reztro/reztro-admin.svg',
  6,
  true
)
on conflict (slug) do nothing;
