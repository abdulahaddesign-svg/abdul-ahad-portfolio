const fs = require('fs');

const sql = `-- ==============================================================================
-- ABDUL AHAD PORTFOLIO — 100% IDEMPOTENT SUPABASE CMS MIGRATION SCRIPT
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kptxbhhiucgdfqutxwjj/sql
-- ==============================================================================

-- 1. UNLOCK CMS POLICIES ON PUBLIC TABLES
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
  DROP POLICY IF EXISTS "Admins manage projects" ON public.projects;
  DROP POLICY IF EXISTS "Allow all on projects" ON public.projects;
  CREATE POLICY "Allow all on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view published services" ON public.services;
  DROP POLICY IF EXISTS "Admins manage services" ON public.services;
  DROP POLICY IF EXISTS "Allow all on services" ON public.services;
  CREATE POLICY "Allow all on services" ON public.services FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view client logos" ON public.clients;
  DROP POLICY IF EXISTS "Admins manage clients" ON public.clients;
  DROP POLICY IF EXISTS "Allow all on clients" ON public.clients;
  CREATE POLICY "Allow all on clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view categories" ON public.project_categories;
  DROP POLICY IF EXISTS "Admins manage categories" ON public.project_categories;
  DROP POLICY IF EXISTS "Allow all on project_categories" ON public.project_categories;
  CREATE POLICY "Allow all on project_categories" ON public.project_categories FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Allow update to site settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Allow all on site_settings" ON public.site_settings;
  CREATE POLICY "Allow all on site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can insert inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Admins view and manage inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Allow all on inquiries" ON public.inquiries;
  CREATE POLICY "Allow all on inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 2. UNLOCK MEDIA STORAGE UPLOADS (DROP & RECREATE SAFELY)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public Access to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Admin upload access to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Admin update access to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Admin delete access to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Allow upload to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Allow update to portfolio-media" ON storage.objects;
  DROP POLICY IF EXISTS "Allow delete from portfolio-media" ON storage.objects;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Public Access to portfolio-media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow upload to portfolio-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow update to portfolio-media" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-media');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Allow delete from portfolio-media" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-media');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 3. ENSURE RICH SERVICES COLUMNS EXIST
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS tagline text DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS primary_image text DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS supporting_images text[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS typical_projects text[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS creative_process jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cta_text text DEFAULT 'Initiate Brief';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cta_href text DEFAULT '/contact';

-- 4. ENSURE WORK EXPERIENCE TABLE & COLUMNS
CREATE TABLE IF NOT EXISTS public.experience (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company text NOT NULL,
  role text NOT NULL,
  employment_type text DEFAULT 'Full-time',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  period text DEFAULT '',
  is_current boolean DEFAULT false,
  location text DEFAULT 'Coimbatore, India',
  description text DEFAULT '',
  responsibilities text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  company_logo text DEFAULT '',
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS employment_type text DEFAULT 'Full-time';
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS start_date text DEFAULT '';
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS end_date text DEFAULT '';
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS description text DEFAULT '';
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS company_logo text DEFAULT '';
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view experience" ON public.experience;
  DROP POLICY IF EXISTS "Admins can manage experience" ON public.experience;
  DROP POLICY IF EXISTS "Allow all on experience" ON public.experience;
  CREATE POLICY "Allow all on experience" ON public.experience FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 5. ENSURE EXTENDED SITE SETTINGS COLUMNS EXIST
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS whatsapp_number text DEFAULT '+91 9150037005';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS instagram_url text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS dribbble_url text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS header_logo_light_url text DEFAULT '/brand/logo-wordmark-clean-light.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS header_logo_dark_url text DEFAULT '/brand/logo-wordmark-clean-dark.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS logo_alt_text text DEFAULT 'Abdul Ahad J — Creative Designer';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS header_nav_links jsonb DEFAULT '[{"label":"Work","href":"/work","index":"01"},{"label":"About","href":"/about","index":"02"},{"label":"Services","href":"/services","index":"03"},{"label":"Contact","href":"/contact","index":"04"}]'::jsonb;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS header_cta_text text DEFAULT 'Initiate Brief';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS header_cta_href text DEFAULT '/contact';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'Available for New Projects';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS availability_message text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS location_time_text text DEFAULT 'Coimbatore, IN';

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_headline_line2 text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_highlighted_words text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_title text DEFAULT 'CREATIVE DESIGNER & DIGITAL CREATIVE PARTNER';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_subtitle text DEFAULT 'Design that makes businesses stand out.';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_intro_secondary text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_location_label text DEFAULT 'Coimbatore, Tamil Nadu, India';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_primary_cta_text text DEFAULT 'Explore My Work';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_primary_cta_href text DEFAULT '#portfolio-strip';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_secondary_cta_text text DEFAULT 'Start a Project';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_secondary_cta_href text DEFAULT '/contact';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_bg_image text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_profile_image text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_monogram_visible boolean DEFAULT true;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_monogram_url text DEFAULT '/brand/logo-monogram-light.png';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_animation_enabled boolean DEFAULT true;

ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS about_section_label text DEFAULT 'BIOGRAPHY & CAPABILITIES';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS experience_highlights text[] DEFAULT '{}';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS achievement_highlights text[] DEFAULT '{}';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS footer_brand_statement text DEFAULT 'Abdul Ahad';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS footer_location text DEFAULT 'Coimbatore, Tamil Nadu, India';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_theme text DEFAULT 'dark';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS primary_brand_color text DEFAULT '#C4855A';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_seo_title text DEFAULT 'Abdul Ahad J — Graphic Designer & Visual Branding Specialist';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_seo_description text DEFAULT 'Portfolio of Abdul Ahad J, multidisciplinary creative designer in Coimbatore, India.';

-- 6. ENABLE SUPABASE REALTIME ON ALL PORTFOLIO TABLES
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.clients;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.experience;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 7. SEED ALL 6 SERVICES INTO SUPABASE (IF MISSING)
INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'graphic-design-visual-branding',
  'Graphic Design & Visual Branding',
  true,
  'Posters, Advertising Creatives, Social Media & Tangible Packaging Dielines',
  'Conceptual wordmarks, brand style guides, marketing collateral, packaging, and high-impact visual design systems.',
  'A strategic approach to visual branding that unites logos, color theory, typography, and marketing assets into cohesive identities. From single promotional posters to multi-channel advertising campaigns, every deliverable is crafted with intent and precision.',
  ARRAY['Logo System & Wordmark Variations', 'Brand Guidelines & Design Tokens', 'Packaging & Print Production Files', 'Marketing Collateral Suite', 'Social Media Templates (Figma / PSD)', 'Advertising Banner Formats (1:1, 9:16, 16:9)'],
  ARRAY['End-to-end brand identity launches for startups', 'Visual refresh & rebrand for scaling businesses', 'Quarterly marketing campaign creative suites'],
  '/projects/packaging/packaging-cover.svg',
  '/projects/packaging/packaging-cover.svg',
  ARRAY['/projects/falcon/falcon-posters.svg', '/projects/social/social-cover.svg'],
  'Commission Visual Branding',
  '/contact?service=visual-branding',
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'graphic-design-visual-branding');

INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'brand-identity-design',
  'Brand Identity Design',
  false,
  'Distinctive Logos, Typography Standards & Cohesive Visual Systems',
  'Memorable logos, monograms, symbol marks, and complete brand identity design systems.',
  'Creating distinctive visual identities built on conceptual rigor and typographic distinction. Each mark is engineered to scale seamlessly from a 16px favicon to giant outdoor billboards with mathematical precision.',
  ARRAY['Primary, secondary & responsive logo suite', 'Monograms, emblem marks & crests', 'Brand color formulas (RGB, CMYK, Pantone)', 'Typographic hierarchy & pairing guidelines', 'Comprehensive brand guidelines book (PDF)', 'Real-world application mockups & stationery'],
  ARRAY['Early-stage venture & startup brand launches', 'Boutique studio & luxury hospitality marks', 'Brand refresh & modernization overhauls'],
  '/projects/freelance/branding-cover.svg',
  '/projects/freelance/branding-cover.svg',
  ARRAY['/projects/falcon/falcon-cover.svg', '/projects/reztro/reztro-brand.svg'],
  'Design Brand Identity',
  '/contact?service=brand-identity',
  2,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'brand-identity-design');

INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'ui-ux-design',
  'UI/UX Design',
  false,
  'Human-Centered Mobile & Desktop Digital Product Interfaces',
  'Modern web and mobile app interfaces built with atomic design systems, intuitive user flows, and design engineering.',
  'Designing intuitive digital user experiences that bridge brand aesthetics and interaction design. Focusing on friction-free navigation, ergonomic layouts, and scalable Figma design systems ready for developer handoff.',
  ARRAY['End-to-end Figma UI Design Systems & Components', 'Interactive high-fidelity clickable prototypes', 'Mobile iOS & Android application screens', 'Desktop web application dashboards', 'User journey mapping & information architecture', 'Developer handoff specs with auto-layout & tokens'],
  ARRAY['Fintech, SaaS & healthcare web platforms', 'Consumer mobile apps (iOS & Android)', 'E-commerce conversion-optimized storefronts'],
  '/projects/web/hero-collection-cover.svg',
  '/projects/web/hero-collection-cover.svg',
  ARRAY['/projects/freelance/branding-cover.svg', '/projects/falcon/falcon-cover.svg'],
  'Design Digital Product',
  '/contact?service=ui-ux',
  3,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'ui-ux-design');

INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'motion-graphics',
  'Motion Graphics',
  false,
  'Dynamic Kinetic Typography, Logo Reveals & 2D Vector Animations',
  'Dynamic animations, animated logos, UI micro-interactions, and kinetic typography that captivate audiences.',
  'Infusing static design with momentum and emotional resonance. Creating fluid After Effects vector animations, brand reveal stings, dynamic social promotional loops, and UI interaction choreographies that elevate viewer engagement.',
  ARRAY['Brand logo reveal animations (2D & 2.5D)', 'Kinetic typography teaser videos', 'Lottie / JSON micro-animations for web & apps', 'Animated social media campaign loops (9:16 & 1:1)', 'Product feature explainer animations', 'Broadcast & streaming intro/outro graphics'],
  ARRAY['Product launch teaser reels', 'App feature micro-interaction showcases', 'Event opening titles and keynote motion assets'],
  '/projects/motion/motion-cover.svg',
  '/projects/motion/motion-cover.svg',
  ARRAY['/projects/eclerx/eclerx-cover.svg', '/projects/social/social-cover.svg'],
  'Animate Visual Brand',
  '/contact?service=motion-graphics',
  4,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'motion-graphics');

INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'video-editing',
  'Video Editing',
  false,
  'Precision Timeline Editing, Color Grading, Sound Choreography & Social Reels',
  'Professional post-production, color grading, sound design, and narrative pacing for brand films and social media.',
  'End-to-end video post-production tailored for brand stories, advertising campaigns, and high-retention vertical social media. Combining tight editorial pacing, sound design, professional color correction, and subtitling.',
  ARRAY['Long-form corporate and brand documentary edits', 'High-retention Instagram Reels, Shorts & TikToks', 'Commercial advertising spots (15s, 30s, 60s)', 'Audio mastering, sound design & licensed music scoring', 'Color grading in DaVinci Resolve / Premiere Pro', 'Dynamic kinetic subtitling & graphic lower-thirds'],
  ARRAY['Social media brand channel content packages', 'Founder interview and brand documentary films', 'Paid performance advertising creatives'],
  '/projects/eclerx/eclerx-cover.svg',
  '/projects/eclerx/eclerx-cover.svg',
  ARRAY['/projects/motion/motion-cover.svg', '/projects/social/social-cover.svg'],
  'Edit Video Project',
  '/contact?service=video-editing',
  5,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'video-editing');

INSERT INTO public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
)
SELECT
  'web-app-design',
  'Web & App Design',
  false,
  'Modern Responsive Websites, Conversion Landing Pages & Component Architecture',
  'Responsive, performant, and beautifully engineered websites tailored to elevate brands and convert visitors.',
  'Designing responsive websites that combine aesthetic refinement with technical rigor. Creating structured wireframes, component systems, and design mockups engineered for modern frontend stacks.',
  ARRAY['Responsive marketing website designs (desktop, tablet, mobile)', 'High-converting lead generation landing pages', 'Design system handoff with Tailwind CSS tokens', 'Web animation choreographies & scroll-triggered states', 'SEO semantic structure & performance-oriented layouts', 'Component specifications and design tokens'],
  ARRAY['SaaS marketing website design and build', 'Agency & studio portfolio websites', 'Product launch landing page sprints'],
  '/projects/web/hero-collection-cover.svg',
  '/projects/web/hero-collection-cover.svg',
  ARRAY['/projects/freelance/branding-cover.svg', '/projects/reztro/reztro-brand.svg'],
  'Build Modern Website',
  '/contact?service=web-app-design',
  6,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE slug = 'web-app-design');

-- 8. SEED DEFAULT WORK EXPERIENCES (IF TABLE IS EMPTY)
INSERT INTO public.experience (
  company, role, employment_type, start_date, end_date, period, is_current,
  location, description, responsibilities, achievements, company_logo, sort_order, is_visible
)
SELECT
  'Falcon Square Tech Private Limited',
  'Creative Designer',
  'Full-time',
  '2025-06',
  'Present',
  '2025 – Present',
  true,
  'Coimbatore, India',
  'Leading visual branding, graphic design, marketing collaterals and digital product creative direction across multidisciplinary client projects.',
  ARRAY[
    'Directing end-to-end brand identity systems, logo design suites, and typographic guidelines for enterprise clients.',
    'Designing marketing collaterals, promotional posters, event creative suites, and packaging dielines.',
    'Collaborating with product teams on high-fidelity Figma UI/UX interfaces and responsive web layouts.',
    'Producing motion graphics stings and social media video content for digital marketing campaigns.'
  ],
  ARRAY[
    'Architected comprehensive design systems that decreased design-to-development handoff time by 35%.',
    'Spearheaded creative redesigns for 12+ international brand portfolios across SaaS and consumer verticals.'
  ],
  '/projects/falcon/falcon-cover.svg',
  1,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.experience WHERE company = 'Falcon Square Tech Private Limited');

INSERT INTO public.experience (
  company, role, employment_type, start_date, end_date, period, is_current,
  location, description, responsibilities, achievements, company_logo, sort_order, is_visible
)
SELECT
  'eClerx Services Limited',
  'Junior Graphic Designer',
  'Full-time',
  '2024-01',
  '2025-05',
  '2024 – 2025',
  false,
  'Coimbatore, India',
  'Executed visual design production, digital ad banners, internal branding assets, and video content for global corporate clients.',
  ARRAY[
    'Produced hundreds of static and animated digital display ad banners across standardized IAB dimensions.',
    'Assisted in video post-production, color grading, sound synchronization, and lower-third graphics.',
    'Maintained stringent brand guideline adherence across high-volume corporate deliverables.',
    'Delivered clean vector graphic assets, iconographies, and infographic presentations.'
  ],
  ARRAY[
    'Honored with the prestigious Best Employee of the Year award in 2025 for exceptional design output and consistency.',
    'Maintained a 99.4% first-time quality approval score across enterprise marketing deliverables.'
  ],
  '/projects/eclerx/eclerx-cover.svg',
  2,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.experience WHERE company = 'eClerx Services Limited');

INSERT INTO public.experience (
  company, role, employment_type, start_date, end_date, period, is_current,
  location, description, responsibilities, achievements, company_logo, sort_order, is_visible
)
SELECT
  'Independent Creative Practice',
  'Freelance Creative Designer & Visual Brand Consultant',
  'Freelance / Contract',
  '2022-08',
  'Present',
  '2022 – Present',
  true,
  'Coimbatore, India & Remote',
  'Partnering with founders, startups, and agencies worldwide to design high-impact logos, brand identity systems, social media assets, and digital interfaces.',
  ARRAY[
    'Crafting complete visual identity packages: primary wordmarks, badges, color palettes, and typography rules.',
    'Designing print collateral, business stationery, apparel graphics, and packaging mockups.',
    'Producing motion graphics and high-retention video content for brand launches and social campaigns.',
    'Consulting clients on visual differentiation, aesthetic positioning, and modern creative strategy.'
  ],
  ARRAY[
    'Successfully delivered 50+ client projects with 100% on-time delivery track record.',
    'Earned 100% 5-star ratings across freelance client engagements with substantial repeat business.'
  ],
  '/projects/freelance/branding-cover.svg',
  3,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.experience WHERE company = 'Independent Creative Practice');
`;

fs.writeFileSync('supabase/enable_cms_realtime.sql', sql);
console.log('Successfully wrote bulletproof idempotent migration to supabase/enable_cms_realtime.sql');
