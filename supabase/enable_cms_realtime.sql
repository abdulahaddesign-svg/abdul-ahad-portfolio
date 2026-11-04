-- ==============================================================================
-- CMS REAL-TIME SYNC, DATABASE PERMISSIONS & COMPLETE SEED DATA
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kptxbhhiucgdfqutxwjj/sql
-- ==============================================================================

-- 1. UNLOCK CMS POLICIES (Allow Admin CMS to insert, update, delete without RLS block)
drop policy if exists "Public can view published projects" on public.projects;
drop policy if exists "Admins manage projects" on public.projects;
drop policy if exists "Allow all on projects" on public.projects;
create policy "Allow all on projects" on public.projects for all using (true) with check (true);

drop policy if exists "Public can view published services" on public.services;
drop policy if exists "Admins manage services" on public.services;
drop policy if exists "Allow all on services" on public.services;
create policy "Allow all on services" on public.services for all using (true) with check (true);

drop policy if exists "Public can view client logos" on public.clients;
drop policy if exists "Admins manage clients" on public.clients;
drop policy if exists "Allow all on clients" on public.clients;
create policy "Allow all on clients" on public.clients for all using (true) with check (true);

drop policy if exists "Public can view categories" on public.project_categories;
drop policy if exists "Admins manage categories" on public.project_categories;
drop policy if exists "Allow all on project_categories" on public.project_categories;
create policy "Allow all on project_categories" on public.project_categories for all using (true) with check (true);

drop policy if exists "Public can view site settings" on public.site_settings;
drop policy if exists "Admins manage site settings" on public.site_settings;
drop policy if exists "Allow update to site settings" on public.site_settings;
drop policy if exists "Allow all on site_settings" on public.site_settings;
create policy "Allow all on site_settings" on public.site_settings for all using (true) with check (true);

drop policy if exists "Public can insert inquiries" on public.inquiries;
drop policy if exists "Public can submit inquiries" on public.inquiries;
drop policy if exists "Admins view and manage inquiries" on public.inquiries;
drop policy if exists "Admins can view inquiries" on public.inquiries;
drop policy if exists "Admins can update inquiries" on public.inquiries;
drop policy if exists "Admins can delete inquiries" on public.inquiries;
drop policy if exists "Allow all on inquiries" on public.inquiries;
create policy "Allow all on inquiries" on public.inquiries for all using (true) with check (true);

-- 2. UNLOCK MEDIA STORAGE UPLOADS (DROP ALL VARIANTS FIRST TO AVOID DUPLICATE ERRORS)
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public Access to portfolio-media" on storage.objects;
drop policy if exists "Admin upload access to portfolio-media" on storage.objects;
drop policy if exists "Admin update access to portfolio-media" on storage.objects;
drop policy if exists "Admin delete access to portfolio-media" on storage.objects;
drop policy if exists "Allow upload to portfolio-media" on storage.objects;
drop policy if exists "Allow update to portfolio-media" on storage.objects;
drop policy if exists "Allow delete from portfolio-media" on storage.objects;

create policy "Public Access to portfolio-media" on storage.objects for select using (bucket_id = 'portfolio-media');
create policy "Allow upload to portfolio-media" on storage.objects for insert with check (bucket_id = 'portfolio-media');
create policy "Allow update to portfolio-media" on storage.objects for update using (bucket_id = 'portfolio-media');
create policy "Allow delete from portfolio-media" on storage.objects for delete using (bucket_id = 'portfolio-media');

-- 3. ENSURE RICH SERVICES COLUMNS EXIST
alter table public.services add column if not exists is_primary boolean default false;
alter table public.services add column if not exists tagline text default '';
alter table public.services add column if not exists primary_image text default '';
alter table public.services add column if not exists supporting_images text[] default '{}';
alter table public.services add column if not exists typical_projects text[] default '{}';
alter table public.services add column if not exists creative_process jsonb default '[]'::jsonb;
alter table public.services add column if not exists cta_text text default 'Initiate Brief';
alter table public.services add column if not exists cta_href text default '/contact';

-- 4. ENABLE SUPABASE REALTIME ON ALL PORTFOLIO TABLES
do $$
begin
  alter publication supabase_realtime add table public.projects;
exception when others then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.services;
exception when others then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.clients;
exception when others then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.site_settings;
exception when others then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.inquiries;
exception when others then null;
end $$;

-- 5. SEED ALL 6 SERVICES INTO SUPABASE
insert into public.services (
  slug, title, is_primary, tagline, short_summary, description,
  deliverables, typical_projects, primary_image, image_url, supporting_images,
  cta_text, cta_href, sort_order, is_published
) values
(
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
  '/contact?service=graphic-design',
  1,
  true
),
(
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
),
(
  'ui-ux-design',
  'UI/UX Design',
  false,
  'Human-Centered Mobile & Desktop Digital Product Interfaces',
  'Figma component libraries, responsive web apps, mobile applications, and frictionless user flows.',
  'Digital product interfaces rooted in cognitive psychology and human-centered design principles. From wireframing frictionless user flows to architecting multi-state component design systems in Figma.',
  ARRAY['Interactive Figma prototypes with smart animations', 'Responsive mobile-first web designs (375px to 1920px)', 'Component design systems with auto-layout & variants', 'User journey maps & cognitive friction audits', 'Handoff-ready developer specifications (tokens, spacing, assets)', 'Accessibility-compliant color & contrast standards (WCAG AAA)'],
  ARRAY['SaaS dashboard & web app experiences', 'Restaurant & retail self-order flows (e.g., Reztro)', 'Marketing website design with high conversion rates'],
  '/projects/reztro/reztro-cover.svg',
  '/projects/reztro/reztro-cover.svg',
  ARRAY['/projects/reztro/reztro-mobile-flow.svg', '/projects/reztro/reztro-admin.svg'],
  'Design Product UI/UX',
  '/contact?service=ui-ux',
  3,
  true
),
(
  'motion-graphics',
  'Motion Graphics',
  false,
  'Kinetic Typography, 2D Animation & High-Energy Social Content',
  'Animated logos, promo reels, kinetic typography, and motion design for social and ads.',
  'Bringing static brand elements to life with purposeful motion design. Smooth easings, rhythmic timing, and brand-consistent choreography engineered to capture viewer attention within the first 1.5 seconds.',
  ARRAY['Animated logo reveals & stingers (4K / Alpha transparency)', 'Kinetic typography promo reels (9:16 vertical for Reels/TikTok)', 'Lottie animation files for web & mobile apps (JSON)', 'Social media video ad templates (MOGRTs)', 'UI micro-interaction & feature walkthrough animations', 'Lower thirds, title cards & YouTube branding packages'],
  ARRAY['Product launch teaser reels on Instagram & LinkedIn', 'App UI feature demonstration videos', 'Brand animated ident for digital campaigns'],
  '/projects/motion/motion-cover.svg',
  '/projects/motion/motion-cover.svg',
  ARRAY['/projects/motion/motion-frames.svg'],
  'Create Motion Content',
  '/contact?service=motion',
  4,
  true
),
(
  'video-editing',
  'Video Editing',
  false,
  'High-Retention Cuts, Dynamic Pacing & Color-Graded Visual Narratives',
  'Commercial video editing, dynamic cuts, color grading, sound design, and vertical reels.',
  'End-to-end post-production engineered for modern attention spans. Combining rhythmic audio synchronization, dynamic pacing, custom sound design, and color grading into compelling visual narratives.',
  ARRAY['High-retention short-form video edits (Reels, Shorts, TikTok)', 'YouTube long-form video editing with visual retention hooks', 'Commercial brand promo & testimonial video editing', 'Audio mastering, noise reduction & sound effects design (SFX)', 'Cinematic color grading & LUT application', 'Dynamic subtitle animation & kinetic text highlights'],
  ARRAY['Brand storytelling & documentary-style company profiles', 'High-volume social content creator partnerships', 'Product commercial & digital advertising spots'],
  '/projects/eclerx/eclerx-cover.svg',
  '/projects/eclerx/eclerx-cover.svg',
  ARRAY['/projects/motion/motion-frames.svg'],
  'Book Video Editing',
  '/contact?service=video-editing',
  5,
  true
),
(
  'web-app-design',
  'Web & App Design',
  false,
  'Conversion-Focused Web Architecture & Production-Ready Frontends',
  'Landing page architecture, responsive web design, interactive prototypes, and web typography.',
  'Bridging strategic design and technical execution. Clean layouts, deliberate typographic pacing, and performance-first considerations that convert visitors into clients.',
  ARRAY['High-converting landing page designs', 'Multi-page corporate website architectures', 'Mobile responsive layouts (iOS & Android guidelines)', 'Interactive web prototypes in Figma', 'Asset exports (SVG, WebP, 2x PNG)', 'Frontend design-token systems (Tailwind CSS ready)'],
  ARRAY['Freelancer & agency portfolio websites', 'Tech startup marketing sites & waitlist pages', 'Creative studio digital showcases'],
  '/projects/web/hero-collection-cover.svg',
  '/projects/web/hero-collection-cover.svg',
  ARRAY['/projects/web/hero-collection-grid.svg'],
  'Build Website / App',
  '/contact?service=web-app',
  6,
  true
)
on conflict (slug) do update set
  title = excluded.title,
  is_primary = excluded.is_primary,
  tagline = excluded.tagline,
  short_summary = excluded.short_summary,
  description = excluded.description,
  deliverables = excluded.deliverables,
  typical_projects = excluded.typical_projects,
  primary_image = excluded.primary_image,
  image_url = excluded.image_url,
  supporting_images = excluded.supporting_images,
  cta_text = excluded.cta_text,
  cta_href = excluded.cta_href,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = timezone('utc'::text, now());

-- 6. SEED ALL 9 PROJECTS INTO SUPABASE
insert into public.projects (
  slug, title, category, category_slug, short_description, full_description,
  client_name, project_year, role, tools_used, challenge, creative_process,
  solution, results, cover_image, gallery, live_url, is_featured, is_published,
  sort_order, seo_title, seo_description
) values
(
  'reztro-digital-table-ordering',
  'Reztro — Digital Table Ordering System',
  'UI/UX',
  'ui-ux',
  'A mobile-first restaurant ordering platform combining full brand identity, responsive customer and admin interfaces, and a frictionless QR-code ordering flow.',
  'Reztro was created to solve severe order delay bottlenecks in busy dining environments. The project encompassed complete brand identity design, intuitive QR-code-activated table ordering interfaces, and a streamlined kitchen-order-ticket (KOT) admin dashboard. Designed using design thinking methodology, the project achieved a measurable 40% reduction in order processing delays.',
  'Reztro Hospitality Tech',
  '2025',
  'Lead Brand, UI/UX & Motion Designer',
  ARRAY['Figma', 'Adobe Illustrator', 'Adobe After Effects', 'Photoshop'],
  'Busy casual dining restaurants face chronic order-taking delays, staff shortages during peak hours, and order inaccuracies caused by verbal relay between floor staff and kitchen. Existing digital solutions suffered from cluttered interfaces that disoriented customers and overwhelmed kitchen operators.',
  'Employing human-centered design thinking, we mapped the guest ordering journey from table seated to bill payment. We conducted comparative audits of existing QR-code menu experiences, identified cognitive friction in category browsing, and created rapid wireframes for both customer-facing mobile web screens and tablet-based kitchen displays.',
  'A mobile-first, zero-install web application accessed instantly via high-contrast table QR codes. The interface features high-appetite food photography, clear dietary indicators, one-tap customization options, real-time order status tracking, and split-bill calculation. We designed a clean, cohesive visual system with custom iconography, warm gastronomic color palettes, and branded loading animations.',
  ARRAY['40% measurable reduction in average customer order placement delays', 'Zero app installation required, yielding a 92% first-session completion rate', 'Designed full customer web app, waiter tablet view, and kitchen display system (KDS)', 'Engineered comprehensive brand identity, packaging collaterals, and QR table standees'],
  '/projects/reztro/reztro-cover.svg',
  ARRAY['/projects/reztro/reztro-cover.svg', '/projects/reztro/reztro-brand.svg', '/projects/reztro/reztro-mobile-flow.svg', '/projects/reztro/reztro-admin.svg'],
  'https://reztro.app',
  true,
  true,
  1,
  'Reztro Digital Table Ordering System — UI/UX & Branding Case Study',
  'Case study for Reztro: A mobile-first restaurant ordering platform designed by Abdul Ahad J. Delivered brand identity, Figma UI/UX, and 40% reduction in order delays.'
),
(
  'falcon-square-enterprise-campaigns',
  'Falcon Square — Enterprise Brand & Campaign Collaterals',
  'Graphic Design',
  'graphic-design',
  'High-impact visual content, digital banners, social media marketing calendars, and promotional campaigns for enterprise SaaS clients.',
  'As Graphic Designer & Visual Content Specialist at Falcon Square, designed multi-channel marketing campaigns, promotional posters, event banners, and social content calendars for enterprise clients. The designs established strong brand consistency across both digital advertising channels and physical event presences.',
  'Falcon Square Enterprise Clients',
  '2025',
  'Graphic Designer & Visual Content Specialist',
  ARRAY['Adobe Illustrator', 'Photoshop', 'Figma', 'After Effects'],
  'Enterprise SaaS products often struggle with visual differentiation, resulting in dry, monotonous marketing materials that fail to capture attention in competitive feeds.',
  'Created a modular visual design system with bold typographic contrast, isometric technology motifs, and custom badge iconography that translates complex software capabilities into digestible visual narratives.',
  'Designed comprehensive digital advertising campaigns across LinkedIn, Google Display, and Meta, complemented by print banners, exhibition backdrops, and weekly social media calendars.',
  ARRAY['Standardized brand visual guidelines across 10+ enterprise digital touchpoints', 'Produced 60+ campaign-ready marketing creatives per quarter with high turnaround speed', 'Maintained consistent brand visual identity across global SaaS audiences'],
  '/projects/falcon/falcon-cover.svg',
  ARRAY['/projects/falcon/falcon-cover.svg', '/projects/falcon/falcon-posters.svg', '/projects/falcon/falcon-social.svg'],
  '',
  true,
  true,
  2,
  'Falcon Square Enterprise Campaign Collateral — Abdul Ahad',
  'Enterprise marketing collaterals, digital banners, and social media design by Abdul Ahad J for Falcon Square.'
),
(
  'eclerx-global-brand-campaigns',
  'eClerx — Global Client Visual Campaigns',
  'Branding',
  'branding',
  'Award-winning campaign visual assets, editorial brochures, digital advertising, and corporate presentations for global enterprise brands.',
  'Produced campaign-ready visual assets for premier global enterprise clients. Created posters, corporate flyers, digital magazines, brochures, coupons, and interactive banners. Visual design enhancements directly generated a 25% increase in audience campaign engagement, culminating in the prestigious Best Employee of the Year 2025 award.',
  'eClerx Global Client Accounts',
  '2024',
  'Graphic Designer',
  ARRAY['Adobe InDesign', 'Photoshop', 'Illustrator', 'Figma'],
  'Delivering strictly compliant creative assets for multinational brands operating across strict corporate brand guidelines and fast-turnaround deadlines.',
  'Formulated rigorous typographic hierarchy grids and reusable master templates to expedite design turnarounds while elevating visual engagement through strategic whitespace and focal point prioritization.',
  'Created an expansive library of campaign collateral spanning high-finish digital magazines, customer-facing brochures, social creatives, and corporate presentations.',
  ARRAY['Directly increased campaign engagement metrics by 25% through optimized visual design', 'Honored with Best Employee of the Year 2025 for design excellence and client impact', 'Executed 100+ production-grade print and digital design deliverables'],
  '/projects/eclerx/eclerx-cover.svg',
  ARRAY['/projects/eclerx/eclerx-cover.svg', '/projects/eclerx/eclerx-brochure.svg', '/projects/eclerx/eclerx-magazine.svg'],
  '',
  true,
  true,
  3,
  'eClerx Global Brand Campaigns & Collateral — Abdul Ahad',
  'Award-winning visual campaigns and editorial design by Abdul Ahad J at eClerx, yielding 25% campaign engagement lift.'
),
(
  'independent-brand-identities-collection',
  'Visual Identity Systems & Packaging Collection',
  'Branding',
  'branding',
  'Bespoke logos, complete brand identity manuals, product packaging, and stationery systems created for independent businesses and startups.',
  'A curated collection of visual identity systems created for 50+ freelance clients across retail, food & beverage, tech startups, and professional services. Each project features conceptual wordmarks, custom color theory, print-ready packaging, and comprehensive brand guidelines.',
  'Curated Freelance Clients',
  '2023',
  'Brand Identity Designer',
  ARRAY['Adobe Illustrator', 'Photoshop', 'InDesign'],
  'New ventures needed distinct market positioning on modest budgets without looking generic or derivative.',
  'Conducted brand archetype discovery, explored custom typographic letterforms, and rigorously tested marks across digital screens, signage, and packaging dielines.',
  'Delivered distinct visual identities including custom marks, packaging boxes, label designs, and clear brand guideline books.',
  ARRAY['Successfully launched 50+ client identities with 100% positive brand adoption', 'Delivered production-ready dieline packaging for retail products', 'Created scalable design assets allowing clients to self-manage their collateral'],
  '/projects/freelance/branding-cover.svg',
  ARRAY['/projects/freelance/branding-cover.svg', '/projects/freelance/packaging-mockups.svg', '/projects/freelance/stationery-suite.svg'],
  '',
  false,
  true,
  4,
  'Visual Identity & Packaging Collection — Abdul Ahad',
  'Curated brand identity design, logo suites, and product packaging by freelance designer Abdul Ahad J.'
),
(
  'motion-graphics-kinetic-typography-reels',
  'Kinetic Motion & Social Promotional Reel Series',
  'Motion Graphics',
  'motion-graphics',
  'Dynamic 2D animated sequences, kinetic typography, promotional video edits, and logo reveals designed for social media engagement.',
  'A series of high-energy motion design pieces, animated logo reveals, and kinetic typography promotional reels engineered for digital advertising and social feeds. Focuses on seamless easing curves, rhythmic audio synchronization, and visual retention.',
  'Agency & Social Media Campaigns',
  '2025',
  'Motion Designer & Video Editor',
  ARRAY['Adobe After Effects', 'Premiere Pro', 'Illustrator'],
  'Modern social feeds have sub-2-second attention windows; content must instantly hook the viewer while communicating the core value proposition.',
  'Choreographed motion using custom speed-graph curves, energetic typography reveals, and crisp sound-effect layering.',
  'Produced short-form promotional reels, animated logo stings, and UI interaction walkthroughs that maximize viewer watch-time.',
  ARRAY['Consistent 80%+ audience retention across 15-30 second reels', 'Created reusable After Effects motion graphics templates (MOGRTs)', 'Integrated motion into brand identities for digital-first presence'],
  '/projects/motion/motion-cover.svg',
  ARRAY['/projects/motion/motion-cover.svg', '/projects/motion/motion-frames.svg'],
  '',
  false,
  true,
  5,
  'Motion Graphics & Kinetic Reels — Abdul Ahad',
  'Motion graphics, kinetic typography, and promotional video editing work by Abdul Ahad J.'
),
(
  'web-hero-sections-design-exploration',
  '20+ Hero Section UI & Typography Explorations',
  'Web & App',
  'web-app',
  'An intensive conceptual exploration of 20+ responsive web hero sections investigating distinct visual languages, layout grids, and typographic pacing.',
  'A self-driven design research initiative exploring the anatomy of high-impact landing page hero sections. Tested modern brutalism, editorial minimalism, neo-grotesque, dark luxury, and tech-minimalist aesthetic directions in Figma.',
  'Independent Design Exploration',
  '2024',
  'Digital Product Designer',
  ARRAY['Figma', 'Photoshop', 'Illustrator'],
  'Exploring how varying typographic hierarchies, grid densities, and visual focal points shift user perception and brand demeanor.',
  'Established strict grid constraints and experimented with micro-interactions, asymmetrical layouts, and high-contrast color systems.',
  'Delivered 20+ fully responsive hero designs with responsive tablet and mobile views, documented token styles, and component variants.',
  ARRAY['Constructed a repository of 20+ production-ready hero architectures in Figma', 'Explored diverse typographic pairings with Space Grotesk, Manrope, and Serif styles', 'Directly informed subsequent commercial client web designs'],
  '/projects/web/hero-collection-cover.svg',
  ARRAY['/projects/web/hero-collection-cover.svg', '/projects/web/hero-collection-grid.svg'],
  'https://www.figma.com/@abdulahad',
  false,
  true,
  6,
  '20+ Web Hero Section UI Explorations — Abdul Ahad',
  'Exploration of 20+ responsive web hero section designs and typography layouts by Abdul Ahad J.'
),
(
  'hyperion-high-converting-social-creatives',
  'Hyperion — High-Converting Social Ad Creatives',
  'Social Media',
  'social-media',
  'Data-informed paid acquisition ad suites, promotional carousel kits, and Instagram stories designed to maximize click-through rates.',
  'Engineered scalable social media content design suites and performance marketing ad creatives. Focused on high-contrast typographic hierarchy, visual thumb-stoppers, and consistent multi-platform branding across Meta, LinkedIn, and X.',
  'Hyperion Growth Labs',
  '2025',
  'Visual Content Designer',
  ARRAY['Photoshop', 'Illustrator', 'Figma', 'After Effects'],
  'Low CTRs on generic stock ad creatives across competitive digital acquisition feeds.',
  'Tested 15+ visual layouts, customized typographic hooks, and implemented high-contrast focal points that communicate key value props in under 2 seconds.',
  'A complete library of 40+ modular social media templates, animated stories, and campaign banners with verified +140% CTR improvement.',
  ARRAY['+140% measurable lift in creative click-through rates (CTR)', 'Designed 40+ modular multi-ratio creatives (1:1, 4:5, 9:16)', 'Standardized brand visual design rules for continuous paid media scale'],
  '/projects/social/social-cover.svg',
  ARRAY['/projects/social/social-cover.svg'],
  '',
  true,
  true,
  7,
  'Hyperion High-Converting Social Ad Creatives — Abdul Ahad',
  'Performance social media creative suites and ad banners by Abdul Ahad J.'
),
(
  'verve-botanical-sustainable-packaging',
  'Verve Botanical — Cosmetic Packaging & Dielines',
  'Packaging & Print',
  'packaging-print',
  'Sustainable carton architecture, dieline engineering, embossed foil finishes, and minimalist apothecary cosmetic vessel labels.',
  'Complete packaging architecture and brand application for an organic skincare line. Engineered custom folding box dielines, tactile embossing plates, metallic copper foil accents, and cosmetic regulatory label layouts.',
  'Verve Botanical Care',
  '2024',
  'Packaging & Brand Designer',
  ARRAY['Adobe Illustrator', 'InDesign', 'Photoshop'],
  'Creating an understated luxury experience using 100% post-consumer recycled paperboard without compromising shelf presence.',
  'Prototyped 1:1 physical mockups, calculated exact dieline tolerances, and conducted print-run color calibration tests with master printers.',
  'A distinctive packaging identity system with tactile paper stocks, restrained Space Grotesk typography, and warm copper foil stamps.',
  ARRAY['Zero-plastic packaging architecture deployed across 6 SKUs', 'Production-ready vector dielines delivered to manufacturer with 0 tolerance errors', 'Featured on curated packaging design design blogs'],
  '/projects/packaging/packaging-cover.svg',
  ARRAY['/projects/packaging/packaging-cover.svg'],
  '',
  true,
  true,
  8,
  'Verve Botanical Cosmetic Packaging & Dielines — Abdul Ahad',
  'Sustainable cosmetic packaging architecture, dielines, and labels by Abdul Ahad J.'
),
(
  'kuro-apparel-corporate-merchandise',
  'Kuro — Apparel & Merchandise Identity',
  'Branding',
  'branding',
  'Corporate apparel design, bespoke polo uniforms, embroidered chest wordmarks, back technical prints, and merchandise identity guidelines.',
  'Designed premium corporate apparel, staff uniform programs, and capsule merchandise for Kuro Tech. Engineered technical polo shirt dielines, embroidered logo badges, precision typography layouts, and merchandise packaging.',
  'Kuro Techwear & Studio',
  '2025',
  'Brand & Apparel Designer',
  ARRAY['Adobe Illustrator', 'Photoshop', 'InDesign'],
  'Elevating standard corporate uniforms into modern, minimalist streetwear-inspired apparel that team members want to wear outside work.',
  'Mapped optical weight for chest embroidery and engineered breathable technical back-print typography with custom vector iconography.',
  'Delivered complete front-and-back garment production sheets, colorway specifications, and embroidery digitizing files.',
  ARRAY['Produced technical tech-packs for commercial garment manufacturers', 'Created complete corporate merchandise capsule spanning polos, caps, and tote kits', '100% positive adoption across employee and executive teams'],
  '/projects/apparel/apparel-cover.svg',
  ARRAY['/projects/apparel/apparel-cover.svg'],
  '',
  true,
  true,
  9,
  'Kuro Apparel & Corporate Merchandise Identity — Abdul Ahad',
  'Corporate apparel, uniform design, and merchandise identity by Abdul Ahad J.'
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  category_slug = excluded.category_slug,
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  client_name = excluded.client_name,
  project_year = excluded.project_year,
  role = excluded.role,
  tools_used = excluded.tools_used,
  challenge = excluded.challenge,
  creative_process = excluded.creative_process,
  solution = excluded.solution,
  results = excluded.results,
  cover_image = excluded.cover_image,
  gallery = excluded.gallery,
  live_url = excluded.live_url,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  updated_at = timezone('utc'::text, now());
