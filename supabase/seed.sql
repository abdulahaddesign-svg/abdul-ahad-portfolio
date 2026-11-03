-- ==============================================================================
-- Portfolio & Admin CMS Seed Data
-- ==============================================================================

-- 1. Insert Project Categories
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

-- 2. Insert Key Reztro Project and Authentic Resume Projects
insert into public.projects (
  slug, title, category, category_slug, short_description, full_description,
  client_name, project_year, role, tools_used,
  challenge, creative_process, solution, results,
  cover_image, gallery, is_featured, is_published, sort_order,
  seo_title, seo_description
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
  ARRAY[
    '40% measurable reduction in average customer order placement delays',
    'Zero app installation required, yielding a 92% first-session completion rate',
    'Designed full customer web app, waiter tablet view, and kitchen display system (KDS)',
    'Engineered comprehensive brand identity, packaging collaterals, and QR table standees'
  ],
  '/projects/reztro/reztro-cover.svg',
  ARRAY[
    '/projects/reztro/reztro-cover.svg',
    '/projects/reztro/reztro-brand.svg',
    '/projects/reztro/reztro-mobile-flow.svg',
    '/projects/reztro/reztro-admin.svg'
  ],
  true,
  true,
  1,
  'Reztro Digital Table Ordering System — UI/UX & Branding Case Study',
  'Case study for Reztro: A mobile-first restaurant ordering platform designed by Abdul Ahad J. Delivered brand identity, Figma UI/UX, and 40% reduction in order delays.'
) on conflict (slug) do nothing;
