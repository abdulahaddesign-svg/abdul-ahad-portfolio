import { ExperienceItem, ServiceItem, SkillCategory, Award, SiteSettings, Project, ClientLogo } from './types';

export const INITIAL_CLIENTS: ClientLogo[] = [
  {
    id: 'cli-reztro',
    name: 'Reztro Dining Tech',
    logoUrl: '/clients/client-reztro.svg',
    websiteUrl: 'https://reztro.tech',
    sortOrder: 1,
    isVisible: true,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'cli-falcon',
    name: 'Falcon Square',
    logoUrl: '/clients/client-falcon.svg',
    websiteUrl: '',
    sortOrder: 2,
    isVisible: true,
    createdAt: '2025-05-01T00:00:00Z',
  },
  {
    id: 'cli-apex',
    name: 'Apex Studios',
    logoUrl: '/clients/client-apex.svg',
    websiteUrl: '',
    sortOrder: 3,
    isVisible: true,
    createdAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 'cli-lumina',
    name: 'Lumina Creative Lab',
    logoUrl: '/clients/client-lumina.svg',
    websiteUrl: '',
    sortOrder: 4,
    isVisible: true,
    createdAt: '2024-08-01T00:00:00Z',
  },
  {
    id: 'cli-strata',
    name: 'Strata Architects',
    logoUrl: '/clients/client-strata.svg',
    websiteUrl: '',
    sortOrder: 5,
    isVisible: true,
    createdAt: '2024-04-01T00:00:00Z',
  },
  {
    id: 'cli-verve',
    name: 'Verve Botanicals',
    logoUrl: '/clients/client-verve.svg',
    websiteUrl: '',
    sortOrder: 6,
    isVisible: true,
    createdAt: '2023-11-01T00:00:00Z',
  },
  {
    id: 'cli-kuro',
    name: 'Kuro Roasters',
    logoUrl: '/clients/client-kuro.svg',
    websiteUrl: '',
    sortOrder: 7,
    isVisible: true,
    createdAt: '2023-09-01T00:00:00Z',
  },
  {
    id: 'cli-novacrest',
    name: 'NovaCrest Ventures',
    logoUrl: '/clients/client-novacrest.svg',
    websiteUrl: '',
    sortOrder: 8,
    isVisible: true,
    createdAt: '2023-05-01T00:00:00Z',
  },
];

export const SITE_SETTINGS: SiteSettings = {
  name: "Abdul Ahad J",
  title: "Graphic Designer | Visual Branding Specialist | Creative Designer",
  tagline: "Designed with intent. Made to matter.",
  email: "abdulahad.ofcl@gmail.com",
  phone: "+91 9150037005",
  location: "Coimbatore, Tamil Nadu, India",
  behanceUrl: "https://www.behance.net/abdulahad438",
  linkedinUrl: "https://www.linkedin.com/in/abdulahadj",
  heroHeadline: "Design that makes businesses stand out.",
  heroSupportingCopy: "Thoughtful visual identities, digital experiences and motion-led content built with purpose and precision.",
  aboutHeadline: "I create visual experiences that make ideas matter.",
  aboutIntro: "Abdul Ahad J is a creative designer based in Coimbatore, India, with 3+ years of experience in graphic design, visual branding and digital creative production.",
  aboutPhilosophy: "Design is not decorative styling; it is clear thinking made visible. I combine visual harmony, typographic discipline, and strategic intent to craft brand experiences that command attention, build credibility, and inspire action.",
  aboutDescription: "He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025. He works independently and collaborates with teams when projects require broader creative capabilities.",
  profilePhotoUrl: "/profile/abdul-ahad.jpg",
  profilePhotoAlt: "Abdul Ahad J — Creative Designer & Visual Specialist",
  experienceYears: "3+ Years",
  achievementsSummary: "Best Employee of the Year 2025 at eClerx · 50+ Freelance Clients",
  resumeUrl: "/resume/abdul-ahad-resume.pdf",
  resumeLabel: "PDF · Updated Resume",
  resumeVisible: true,
  educationDegree: "Bachelor of Science in Computer Science",
  educationInstitution: "Government Arts College (Autonomous), Coimbatore",
  educationYear: "2020 – 2023",
  educationAggregate: "80% Aggregate",
  footerAppearance: "dark",
  footerLogoLightUrl: "/brand/logo-wordmark-clean-light.png",
  footerLogoDarkUrl: "/brand/logo-wordmark-clean-dark.png",
  footerDescription: "Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India.",
  footerBrandStatement: "Abdul Ahad",
  footerNavVisible: true,
  footerCopyright: "Abdul Ahad J. All rights reserved.",
  ctaHeadline: "HAVE A PROJECT\nIN MIND?",
  ctaSupporting: "Let's create something meaningful together.",
  ctaAvailability: "Available for New Projects · Q1 / Q2",
};

export const BRAND_COLORS = {
  charcoal: "#25241F",
  warmIvory: "#F4EFE6",
  earthBrown: "#7C5C3E",
  burntCopper: "#C4855A",
  mutedSage: "#8A9E88",
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Falcon Square Private Limited",
    role: "Graphic Designer & Visual Content Specialist",
    period: "May 2025 – Present",
    isCurrent: true,
    location: "Coimbatore, India",
    responsibilities: [
      "Create high-converting posters, banners, social media creatives, digital advertisements, and promotional materials for enterprise and SaaS clients.",
      "Design comprehensive social media content calendars and maintain strict brand consistency across all digital touchpoints.",
      "Create web and mobile UI screens in Figma with design systems and responsive components.",
      "Produce engaging motion graphics, animated reels, and promotional video edits for multi-channel campaigns.",
      "Integrate AI creative tools to accelerate ideation and asset production workflows.",
      "Establish and maintain brand guidelines and visual identity systems for emerging products."
    ],
    sortOrder: 1,
  },
  {
    id: "exp-2",
    company: "eClerx",
    role: "Graphic Designer",
    period: "June 2023 – May 2025",
    isCurrent: false,
    location: "India",
    responsibilities: [
      "Produced campaign-ready visual assets for leading global enterprise clients across diverse industries.",
      "Created high-impact posters, flyers, social media creatives, coupons, magazines, brochures, and digital banners.",
      "Increased campaign engagement by 25% through visual design enhancements and strategic typographic hierarchy.",
      "Designed corporate communication collaterals and executive presentation layouts.",
      "Collaborated cross-functionally with marketing, product, and account management teams to meet tight production deadlines."
    ],
    achievements: [
      "Awarded Best Employee of the Year 2025 for design excellence, consistency, and measurable client impact."
    ],
    sortOrder: 2,
  },
  {
    id: "exp-3",
    company: "Freelance",
    role: "Graphic, UI/UX & Motion Designer",
    period: "August 2020 – Present",
    isCurrent: true,
    location: "Remote / Coimbatore",
    responsibilities: [
      "Delivered end-to-end branding and graphic design solutions for 50+ clients across India and international markets.",
      "Created logos, complete visual identity systems, packaging designs, social media marketing kits, and print materials.",
      "Designed responsive landing page mockups, interactive web concepts, and mobile application UI screens in Figma.",
      "Produced dynamic explainer videos, social media reels, and product demos.",
      "Created more than 20 hero-section concepts across distinct UI styles exploring typography, layout, and micro-interactions."
    ],
    sortOrder: 3,
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Graphic Design & Visual Branding",
    slug: "graphic-design-visual-branding",
    isPrimary: true,
    shortSummary: "Comprehensive visual branding, brand identity systems, and high-impact graphic design that position your business with authority.",
    description: "The core foundation of Abdul Ahad's creative practice. We develop cohesive visual languages that communicate your unique market positioning, instill trust, and maintain unmistakable consistency across digital and print mediums.",
    deliverables: [
      "Logo suite & custom wordmarks",
      "Comprehensive brand guidelines",
      "Typography & color systems",
      "Marketing collateral & sales decks",
      "Editorial & publication layouts",
      "Vector iconography & brand assets"
    ],
    typicalProjects: [
      "Complete brand identity overhauls",
      "Corporate rebranding & guideline manuals",
      "Product launch visual systems",
      "Investor pitch decks & whitepapers"
    ],
    creativeProcess: [
      { step: "01", title: "Brand Discovery & Audit", description: "Analyzing competitive landscape, target audience, and strategic objectives." },
      { step: "02", title: "Visual Direction & Moodboarding", description: "Exploring typographic themes, chromatic palettes, and design styles." },
      { step: "03", title: "Design Execution & Refinement", description: "Crafting identity marks, grid systems, and functional applications." },
      { step: "04", title: "Guidelines & Production Handoff", description: "Packaging master vector files, typography rules, and usage specifications." }
    ],
    sortOrder: 1,
  },
  {
    id: "srv-2",
    title: "Brand Identity Design",
    slug: "brand-identity-design",
    isPrimary: false,
    shortSummary: "Memorable logos, monograms, symbol marks, and complete brand identity design systems.",
    description: "Creating distinctive visual identities built on conceptual rigor. Each mark is engineered to scale seamlessly from a tiny 16px favicon to giant outdoor billboards.",
    deliverables: [
      "Primary & secondary logo variations",
      "Monograms, crests & emblem marks",
      "Brand color formulas (RGB, CMYK, Pantone)",
      "Typography pairings & typographic scale",
      "Brand application mockups"
    ],
    typicalProjects: [
      "Early-stage startup identities",
      "Luxury & boutique studio identities",
      "Product-line visual identities"
    ],
    creativeProcess: [
      { step: "01", title: "Conceptual Sketching", description: "Iterative exploration of geometric and organic concepts." },
      { step: "02", title: "Vector Precision", description: "Refining geometry, curve continuity, and optical balance." },
      { step: "03", title: "Contextual Testing", description: "Validating across light, dark, color, and monochrome substrates." }
    ],
    sortOrder: 2,
  },
  {
    id: "srv-3",
    title: "Social Media Design",
    slug: "social-media-design",
    isPrimary: false,
    shortSummary: "Scroll-stopping social graphics, carousel templates, and structured content calendars.",
    description: "High-engagement social media visuals engineered to halt the feed, deliver value instantly, and preserve strong brand recall across Instagram, LinkedIn, and X.",
    deliverables: [
      "Modular Instagram feed templates",
      "Multi-slide educational carousels",
      "LinkedIn banner & thought-leadership graphics",
      "Story templates & interactive stickers",
      "Custom highlights and cover graphics"
    ],
    typicalProjects: [
      "Monthly social media retainers",
      "Product launch campaign suites",
      "Executive personal brand visual packages"
    ],
    creativeProcess: [
      { step: "01", title: "Content Strategy Alignment", description: "Aligning visual format with informational hierarchy." },
      { step: "02", title: "Modular Template Design", description: "Crafting easily editable, structured Figma templates." },
      { step: "03", title: "Production Batching", description: "Outputting pixel-perfect exports tailored for platform algorithms." }
    ],
    sortOrder: 3,
  },
  {
    id: "srv-4",
    title: "Marketing & Advertising Creatives",
    slug: "marketing-advertising-creatives",
    isPrimary: false,
    shortSummary: "Performance-focused digital ad banners, promotional posters, and display campaigns.",
    description: "Ad creatives designed with conversion psychology. Clear call-to-actions, high contrast, and crisp visual storytelling maximize click-through rates.",
    deliverables: [
      "Google Display Network ad banner sets",
      "Meta (Facebook & Instagram) performance ad creatives",
      "Event & promotional print posters",
      "Direct mailers, coupons & promotional flyers",
      "Digital billboard & display ads"
    ],
    typicalProjects: [
      "Paid acquisition ad testing suites",
      "Trade show & event promotional graphics",
      "Seasonal sales and festive promotional campaigns"
    ],
    creativeProcess: [
      { step: "01", title: "Offer & Hook Clarity", description: "Defining the primary visual trigger and proposition." },
      { step: "02", title: "Multi-Format Adaptation", description: "Adapting across 1:1, 9:16, 16:9, and responsive ad dimensions." },
      { step: "03", title: "A/B Testing Variants", description: "Delivering color, headline, and imagery variations." }
    ],
    sortOrder: 4,
  },
  {
    id: "srv-5",
    title: "Packaging & Print Design",
    slug: "packaging-print-design",
    isPrimary: false,
    shortSummary: "Tangible packaging boxes, labels, editorial magazines, brochures, and retail collateral.",
    description: "Print-ready, precision-engineered artwork with deep understanding of paper stocks, die-lines, CMYK ink separation, spot UV, and foil finishes.",
    deliverables: [
      "Dieline-accurate product packaging",
      "Bottles, jars & pouch label designs",
      "Multi-page corporate brochures & magazines",
      "Stationery suites & business cards",
      "Print-ready preflight PDF packages"
    ],
    typicalProjects: [
      "FMCG and retail product box packaging",
      "Corporate annual reports and capabilities brochures",
      "Merchandise and luxury unboxing collateral"
    ],
    creativeProcess: [
      { step: "01", title: "Dieline & Substrate Review", description: "Verifying printer specifications, bleed, and safe zones." },
      { step: "02", title: "3D Mockup Visualizations", description: "Visualizing packaging in realistic 3D space." },
      { step: "03", title: "Preflight Production", description: "Color-separating, outlining, and verifying high-res assets." }
    ],
    sortOrder: 5,
  },
  {
    id: "srv-6",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    isPrimary: false,
    shortSummary: "Mobile-first digital products, design systems, and intuitive customer-facing interfaces.",
    description: "User interfaces rooted in human-centered design thinking. From user flows and wireframes to interactive Figma prototypes and scalable component libraries.",
    deliverables: [
      "Mobile app UX/UI design (iOS & Android)",
      "Design systems & component libraries",
      "Wireframing & user journey mapping",
      "Interactive Figma click-through prototypes",
      "Developer handoff specifications"
    ],
    typicalProjects: [
      "Reztro Table Ordering Platform (Case Study)",
      "SaaS dashboards & web portals",
      "Consumer mobile applications"
    ],
    creativeProcess: [
      { step: "01", title: "Research & Journey Mapping", description: "Identifying user friction points and key milestones." },
      { step: "02", title: "Wireframes & Prototyping", description: "Iterative low-fidelity layouts validated with stakeholders." },
      { step: "03", title: "High-Fidelity Interface", description: "Crafting the visual layer with responsive constraints." }
    ],
    sortOrder: 6,
  },
  {
    id: "srv-7",
    title: "Motion Graphics",
    slug: "motion-graphics",
    isPrimary: false,
    shortSummary: "Dynamic 2D animation, logo stings, UI micro-interactions, and kinetic typography.",
    description: "Bringing static graphics to life with purposeful motion design. Smooth easings, rhythmic timing, and brand-consistent movement that captivates audiences.",
    deliverables: [
      "Animated logo reveals & brand stings",
      "Kinetic typography reels & teasers",
      "UI micro-interactions & Lottie animations",
      "Social media animated title cards",
      "Explainer graphic motion sequences"
    ],
    typicalProjects: [
      "Brand identity launch stings",
      "SaaS product feature motion clips",
      "Social video motion graphics packages"
    ],
    creativeProcess: [
      { step: "01", title: "Storyboard & Timing", description: "Pacing key frames and motion rhythm." },
      { step: "02", title: "Asset Preparation & Rigging", description: "Layering vectors for After Effects." },
      { step: "03", title: "Animation & Polishing", description: "Fine-tuning graph-editor curves and export optimization." }
    ],
    sortOrder: 7,
  },
  {
    id: "srv-8",
    title: "Video Editing",
    slug: "video-editing",
    isPrimary: false,
    shortSummary: "Paced video storytelling, promotional social edits, Reels, and product showcase videos.",
    description: "End-to-end post-production editing combining tight narrative cuts, color correction, sound design, and custom graphic overlays.",
    deliverables: [
      "Instagram Reels & YouTube Shorts formatting",
      "Product showcase & demonstration edits",
      "Corporate event & interview highlight reels",
      "Color grading & audio sweetening",
      "Subtitle animations & lower thirds"
    ],
    typicalProjects: [
      "Campaign video teasers",
      "Brand commercial short-form edits",
      "Social video series editing"
    ],
    creativeProcess: [
      { step: "01", title: "Rough Cut & Story Assembly", description: "Establishing pacing, narrative arc, and music beat." },
      { step: "02", title: "Visual Polish & Graphics", description: "Integrating lower-thirds, callouts, and motion assets." },
      { step: "03", title: "Color & Audio Mastering", description: "Balancing dialogue, ambient audio, and color tones." }
    ],
    sortOrder: 8,
  },
  {
    id: "srv-9",
    title: "Web & App Design",
    slug: "web-app-design",
    isPrimary: false,
    shortSummary: "Modern responsive website designs, landing page concepts, and digital product layouts.",
    description: "Editorial-grade web design balancing bold visual direction with accessible information architecture and conversion-centric layout principles.",
    deliverables: [
      "Responsive web page designs (Desktop, Tablet, Mobile)",
      "High-converting landing page concepts",
      "Figma design tokens & style guides",
      "Asset export packages for engineers"
    ],
    typicalProjects: [
      "Creative studio & agency websites",
      "Product landing pages (over 20+ hero section concepts)",
      "E-commerce storefront UI designs"
    ],
    creativeProcess: [
      { step: "01", title: "Content Architecture", description: "Structuring page sections for logical reading hierarchy." },
      { step: "02", title: "Visual Concepting", description: "Deploying typography, spacing, and brand elements." },
      { step: "03", title: "Breakpoint Responsive Scaling", description: "Refining mobile, tablet, and widescreen layouts." }
    ],
    sortOrder: 9,
  },
  {
    id: "srv-10",
    title: "AI-Assisted Creative Production",
    slug: "ai-assisted-creative-production",
    isPrimary: false,
    shortSummary: "AI-powered ideation, generative visual concepting, and accelerated asset workflows.",
    description: "Leveraging state-of-the-art generative AI tooling to rapidly prototype visual directions, generate bespoke textural backdrops, and enhance production speed without sacrificing human creative judgment.",
    deliverables: [
      "Generative concept exploration decks",
      "Bespoke background textures & abstract assets",
      "AI-accelerated image upscaling & retouching",
      "Prompt-engineered visual iterations"
    ],
    typicalProjects: [
      "Rapid creative ideation sessions",
      "Conceptual campaign moodboards",
      "Hybrid AI-human production graphics"
    ],
    creativeProcess: [
      { step: "01", title: "Creative Brief & Parameterization", description: "Structuring prompt prompts and stylistic constraints." },
      { step: "02", title: "Generative Iteration", description: "Generating candidate visual concepts." },
      { step: "03", title: "Manual Compositing & Polish", description: "Refining in Photoshop and Illustrator for production fidelity." }
    ],
    sortOrder: 10,
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Design & Art Direction",
    items: [
      "Brand Identity Design",
      "Visual Branding Systems",
      "Typography & Layout",
      "Social Media Content Design",
      "Print & Packaging Design",
      "Marketing Collateral",
      "Poster & Billboard Design",
      "Editorial Design",
      "Color Theory & Composition"
    ]
  },
  {
    category: "UI/UX & Digital Product",
    items: [
      "Mobile-First UI Design",
      "Design Systems & Component Libraries",
      "Wireframing & Prototyping",
      "User Journey Mapping",
      "Design Thinking Methodology",
      "Responsive Web Design",
      "Interactive Prototyping"
    ]
  },
  {
    category: "Motion & Media",
    items: [
      "Motion Graphics",
      "2D Keyframe Animation",
      "Kinetic Typography",
      "Video Editing & Color Grading",
      "Reels & Short-form Video",
      "Logo Animation & Stings",
      "Sound Design & Audio Sync"
    ]
  },
  {
    category: "Tools & Software",
    items: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Adobe InDesign",
      "Figma",
      "Canva",
      "Midjourney / Generative AI Tools"
    ]
  }
];

export const AWARDS_DATA: Award[] = [
  {
    id: "award-1",
    title: "Best Employee of the Year",
    issuer: "eClerx",
    year: "2025",
    description: "Awarded in recognition of exceptional design quality, high client engagement impact (25% lift), and outstanding dedication to creative excellence across global enterprise accounts."
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-reztro",
    slug: "reztro-digital-table-ordering",
    title: "Reztro — Digital Table Ordering System",
    category: "UI/UX",
    categorySlug: "ui-ux",
    shortDescription: "A mobile-first restaurant ordering platform combining full brand identity, responsive customer and admin interfaces, and a frictionless QR-code ordering flow.",
    fullDescription: "Reztro was created to solve severe order delay bottlenecks in busy dining environments. The project encompassed complete brand identity design, intuitive QR-code-activated table ordering interfaces, and a streamlined kitchen-order-ticket (KOT) admin dashboard. Designed using design thinking methodology, the project achieved a measurable 40% reduction in order processing delays.",
    clientName: "Reztro Hospitality Tech",
    projectYear: "2025",
    role: "Lead Brand, UI/UX & Motion Designer",
    toolsUsed: ["Figma", "Adobe Illustrator", "Adobe After Effects", "Photoshop"],
    challenge: "Busy casual dining restaurants face chronic order-taking delays, staff shortages during peak hours, and order inaccuracies caused by verbal relay between floor staff and kitchen. Existing digital solutions suffered from cluttered interfaces that disoriented customers and overwhelmed kitchen operators.",
    creativeProcess: "Employing human-centered design thinking, we mapped the guest ordering journey from table seated to bill payment. We conducted comparative audits of existing QR-code menu experiences, identified cognitive friction in category browsing, and created rapid wireframes for both customer-facing mobile web screens and tablet-based kitchen displays.",
    solution: "A mobile-first, zero-install web application accessed instantly via high-contrast table QR codes. The interface features high-appetite food photography, clear dietary indicators, one-tap customization options, real-time order status tracking, and split-bill calculation. We designed a clean, cohesive visual system with custom iconography, warm gastronomic color palettes, and branded loading animations.",
    results: [
      "40% measurable reduction in average customer order placement delays",
      "Zero app installation required, yielding a 92% first-session completion rate",
      "Designed full customer web app, waiter tablet view, and kitchen display system (KDS)",
      "Engineered comprehensive brand identity, packaging collaterals, and QR table standees"
    ],
    coverImage: "/projects/reztro/reztro-cover.svg",
    gallery: [
      "/projects/reztro/reztro-cover.svg",
      "/projects/reztro/reztro-brand.svg",
      "/projects/reztro/reztro-mobile-flow.svg",
      "/projects/reztro/reztro-admin.svg"
    ],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
    seoTitle: "Reztro Digital Table Ordering System — UI/UX & Branding Case Study",
    seoDescription: "Case study for Reztro: A mobile-first restaurant ordering platform designed by Abdul Ahad J. Delivered brand identity, Figma UI/UX, and 40% reduction in order delays.",
    createdAt: "2025-07-15T10:00:00Z",
    updatedAt: "2025-07-20T14:30:00Z"
  },
  {
    id: "proj-falcon-creatives",
    slug: "falcon-square-enterprise-campaigns",
    title: "Falcon Square — Enterprise Brand & Campaign Collaterals",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    shortDescription: "High-impact visual content, digital banners, social media marketing calendars, and promotional campaigns for enterprise SaaS clients.",
    fullDescription: "As Graphic Designer & Visual Content Specialist at Falcon Square, designed multi-channel marketing campaigns, promotional posters, event banners, and social content calendars for enterprise clients. The designs established strong brand consistency across both digital advertising channels and physical event presences.",
    clientName: "Falcon Square Enterprise Clients",
    projectYear: "2025",
    role: "Graphic Designer & Visual Content Specialist",
    toolsUsed: ["Adobe Illustrator", "Photoshop", "Figma", "After Effects"],
    challenge: "Enterprise SaaS products often struggle with visual differentiation, resulting in dry, monotonous marketing materials that fail to capture attention in competitive feeds.",
    creativeProcess: "Created a modular visual design system with bold typographic contrast, isometric technology motifs, and custom badge iconography that translates complex software capabilities into digestible visual narratives.",
    solution: "Designed comprehensive digital advertising campaigns across LinkedIn, Google Display, and Meta, complemented by print banners, exhibition backdrops, and weekly social media calendars.",
    results: [
      "Standardized brand visual guidelines across 10+ enterprise digital touchpoints",
      "Produced 60+ campaign-ready marketing creatives per quarter with high turnaround speed",
      "Maintained consistent brand visual identity across global SaaS audiences"
    ],
    coverImage: "/projects/falcon/falcon-cover.svg",
    gallery: [
      "/projects/falcon/falcon-cover.svg",
      "/projects/falcon/falcon-posters.svg",
      "/projects/falcon/falcon-social.svg"
    ],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 2,
    seoTitle: "Falcon Square Enterprise Campaign Collateral — Abdul Ahad",
    seoDescription: "Enterprise marketing collaterals, digital banners, and social media design by Abdul Ahad J for Falcon Square.",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-10-01T14:30:00Z"
  },
  {
    id: "proj-eclerx-campaigns",
    slug: "eclerx-global-brand-campaigns",
    title: "eClerx — Global Client Visual Campaigns",
    category: "Branding",
    categorySlug: "branding",
    shortDescription: "Award-winning campaign visual assets, editorial brochures, digital advertising, and corporate presentations for global enterprise brands.",
    fullDescription: "Produced campaign-ready visual assets for premier global enterprise clients. Created posters, corporate flyers, digital magazines, brochures, coupons, and interactive banners. Visual design enhancements directly generated a 25% increase in audience campaign engagement, culminating in the prestigious Best Employee of the Year 2025 award.",
    clientName: "eClerx Global Client Accounts",
    projectYear: "2024",
    role: "Graphic Designer",
    toolsUsed: ["Adobe InDesign", "Photoshop", "Illustrator", "Figma"],
    challenge: "Delivering strictly compliant creative assets for multinational brands operating across strict corporate brand guidelines and fast-turnaround deadlines.",
    creativeProcess: "Formulated rigorous typographic hierarchy grids and reusable master templates to expedite design turnarounds while elevating visual engagement through strategic whitespace and focal point prioritization.",
    solution: "Created an expansive library of campaign collateral spanning high-finish digital magazines, customer-facing brochures, social creatives, and corporate presentations.",
    results: [
      "Directly increased campaign engagement metrics by 25% through optimized visual design",
      "Honored with Best Employee of the Year 2025 for design excellence and client impact",
      "Executed 100+ production-grade print and digital design deliverables"
    ],
    coverImage: "/projects/eclerx/eclerx-cover.svg",
    gallery: [
      "/projects/eclerx/eclerx-cover.svg",
      "/projects/eclerx/eclerx-brochure.svg",
      "/projects/eclerx/eclerx-magazine.svg"
    ],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 3,
    seoTitle: "eClerx Global Brand Campaigns & Collateral — Abdul Ahad",
    seoDescription: "Award-winning visual campaigns and editorial design by Abdul Ahad J at eClerx, yielding 25% campaign engagement lift.",
    createdAt: "2024-11-10T10:00:00Z",
    updatedAt: "2025-05-15T12:00:00Z"
  },
  {
    id: "proj-freelance-brand-identity",
    slug: "independent-brand-identities-collection",
    title: "Visual Identity Systems & Packaging Collection",
    category: "Branding",
    categorySlug: "branding",
    shortDescription: "Bespoke logos, complete brand identity manuals, product packaging, and stationery systems created for independent businesses and startups.",
    fullDescription: "A curated collection of visual identity systems created for 50+ freelance clients across retail, food & beverage, tech startups, and professional services. Each project features conceptual wordmarks, custom color theory, print-ready packaging, and comprehensive brand guidelines.",
    clientName: "Curated Freelance Clients",
    projectYear: "2023",
    role: "Brand Identity Designer",
    toolsUsed: ["Adobe Illustrator", "Photoshop", "InDesign"],
    challenge: "New ventures needed distinct market positioning on modest budgets without looking generic or derivative.",
    creativeProcess: "Conducted brand archetype discovery, explored custom typographic letterforms, and rigorously tested marks across digital screens, signage, and packaging dielines.",
    solution: "Delivered distinct visual identities including custom marks, packaging boxes, label designs, and clear brand guideline books.",
    results: [
      "Successfully launched 50+ client identities with 100% positive brand adoption",
      "Delivered production-ready dieline packaging for retail products",
      "Created scalable design assets allowing clients to self-manage their collateral"
    ],
    coverImage: "/projects/freelance/branding-cover.svg",
    gallery: [
      "/projects/freelance/branding-cover.svg",
      "/projects/freelance/packaging-mockups.svg",
      "/projects/freelance/stationery-suite.svg"
    ],
    videoUrl: "",
    isFeatured: false,
    isPublished: true,
    sortOrder: 4,
    seoTitle: "Visual Identity & Packaging Collection — Abdul Ahad",
    seoDescription: "Curated brand identity design, logo suites, and product packaging by freelance designer Abdul Ahad J.",
    createdAt: "2023-12-05T09:00:00Z",
    updatedAt: "2024-03-10T11:00:00Z"
  },
  {
    id: "proj-motion-reel-social",
    slug: "motion-graphics-kinetic-typography-reels",
    title: "Kinetic Motion & Social Promotional Reel Series",
    category: "Motion Graphics",
    categorySlug: "motion-graphics",
    shortDescription: "Dynamic 2D animated sequences, kinetic typography, promotional video edits, and logo reveals designed for social media engagement.",
    fullDescription: "A series of high-energy motion design pieces, animated logo reveals, and kinetic typography promotional reels engineered for digital advertising and social feeds. Focuses on seamless easing curves, rhythmic audio synchronization, and visual retention.",
    clientName: "Agency & Social Media Campaigns",
    projectYear: "2025",
    role: "Motion Designer & Video Editor",
    toolsUsed: ["Adobe After Effects", "Premiere Pro", "Illustrator"],
    challenge: "Modern social feeds have sub-2-second attention windows; content must instantly hook the viewer while communicating the core value proposition.",
    creativeProcess: "Choreographed motion using custom speed-graph curves, energetic typography reveals, and crisp sound-effect layering.",
    solution: "Produced short-form promotional reels, animated logo stings, and UI interaction walkthroughs that maximize viewer watch-time.",
    results: [
      "Consistent 80%+ audience retention across 15-30 second reels",
      "Created reusable After Effects motion graphics templates (MOGRTs)",
      "Integrated motion into brand identities for digital-first presence"
    ],
    coverImage: "/projects/motion/motion-cover.svg",
    gallery: [
      "/projects/motion/motion-cover.svg",
      "/projects/motion/motion-frames.svg"
    ],
    videoUrl: "",
    isFeatured: false,
    isPublished: true,
    sortOrder: 5,
    seoTitle: "Motion Graphics & Kinetic Reels — Abdul Ahad",
    seoDescription: "Motion graphics, kinetic typography, and promotional video editing work by Abdul Ahad J.",
    createdAt: "2025-04-12T10:00:00Z",
    updatedAt: "2025-06-18T16:00:00Z"
  },
  {
    id: "proj-hero-exploration-collection",
    slug: "web-hero-sections-design-exploration",
    title: "20+ Hero Section UI & Typography Explorations",
    category: "Web & App",
    categorySlug: "web-app",
    shortDescription: "An intensive conceptual exploration of 20+ responsive web hero sections investigating distinct visual languages, layout grids, and typographic pacing.",
    fullDescription: "A self-driven design research initiative exploring the anatomy of high-impact landing page hero sections. Tested modern brutalism, editorial minimalism, neo-grotesque, dark luxury, and tech-minimalist aesthetic directions in Figma.",
    clientName: "Independent Design Exploration",
    projectYear: "2024",
    role: "Digital Product Designer",
    toolsUsed: ["Figma", "Photoshop", "Illustrator"],
    challenge: "Exploring how varying typographic hierarchies, grid densities, and visual focal points shift user perception and brand demeanor.",
    creativeProcess: "Established strict grid constraints and experimented with micro-interactions, asymmetrical layouts, and high-contrast color systems.",
    solution: "Delivered 20+ fully responsive hero designs with responsive tablet and mobile views, documented token styles, and component variants.",
    results: [
      "Constructed a repository of 20+ production-ready hero architectures in Figma",
      "Explored diverse typographic pairings with Space Grotesk, Manrope, and Serif styles",
      "Directly informed subsequent commercial client web designs"
    ],
    coverImage: "/projects/web/hero-collection-cover.svg",
    gallery: [
      "/projects/web/hero-collection-cover.svg",
      "/projects/web/hero-collection-grid.svg"
    ],
    videoUrl: "",
    isFeatured: false,
    isPublished: true,
    sortOrder: 6,
    seoTitle: "20+ Web Hero Section UI Explorations — Abdul Ahad",
    seoDescription: "Exploration of 20+ responsive web hero section designs and typography layouts by Abdul Ahad J.",
    createdAt: "2024-08-20T11:00:00Z",
    updatedAt: "2024-10-15T15:00:00Z"
  },
  {
    id: "proj-social-campaigns",
    slug: "hyperion-high-converting-social-creatives",
    title: "Hyperion — High-Converting Social Ad Creatives",
    category: "Social Media",
    categorySlug: "social-media",
    shortDescription: "Data-informed paid acquisition ad suites, promotional carousel kits, and Instagram stories designed to maximize click-through rates.",
    fullDescription: "Engineered scalable social media content design suites and performance marketing ad creatives. Focused on high-contrast typographic hierarchy, visual thumb-stoppers, and consistent multi-platform branding across Meta, LinkedIn, and X.",
    clientName: "Hyperion Growth Labs",
    projectYear: "2025",
    role: "Visual Content Designer",
    toolsUsed: ["Photoshop", "Illustrator", "Figma", "After Effects"],
    challenge: "Low CTRs on generic stock ad creatives across competitive digital acquisition feeds.",
    creativeProcess: "Tested 15+ visual layouts, customized typographic hooks, and implemented high-contrast focal points that communicate key value props in under 2 seconds.",
    solution: "A complete library of 40+ modular social media templates, animated stories, and campaign banners with verified +140% CTR improvement.",
    results: [
      "+140% measurable lift in creative click-through rates (CTR)",
      "Designed 40+ modular multi-ratio creatives (1:1, 4:5, 9:16)",
      "Standardized brand visual design rules for continuous paid media scale"
    ],
    coverImage: "/projects/social/social-cover.svg",
    gallery: ["/projects/social/social-cover.svg"],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 7,
    seoTitle: "Hyperion High-Converting Social Ad Creatives — Abdul Ahad",
    seoDescription: "Performance social media creative suites and ad banners by Abdul Ahad J.",
    createdAt: "2025-02-10T10:00:00Z",
    updatedAt: "2025-04-15T12:00:00Z"
  },
  {
    id: "proj-packaging-dielines",
    slug: "verve-botanical-sustainable-packaging",
    title: "Verve Botanical — Cosmetic Packaging & Dielines",
    category: "Packaging & Print",
    categorySlug: "packaging-print",
    shortDescription: "Sustainable carton architecture, dieline engineering, embossed foil finishes, and minimalist apothecary cosmetic vessel labels.",
    fullDescription: "Complete packaging architecture and brand application for an organic skincare line. Engineered custom folding box dielines, tactile embossing plates, metallic copper foil accents, and cosmetic regulatory label layouts.",
    clientName: "Verve Botanical Care",
    projectYear: "2024",
    role: "Packaging & Brand Designer",
    toolsUsed: ["Adobe Illustrator", "InDesign", "Photoshop"],
    challenge: "Creating an understated luxury experience using 100% post-consumer recycled paperboard without compromising shelf presence.",
    creativeProcess: "Prototyped 1:1 physical mockups, calculated exact dieline tolerances, and conducted print-run color calibration tests with master printers.",
    solution: "A distinctive packaging identity system with tactile paper stocks, restrained Space Grotesk typography, and warm copper foil stamps.",
    results: [
      "Zero-plastic packaging architecture deployed across 6 SKUs",
      "Production-ready vector dielines delivered to manufacturer with 0 tolerance errors",
      "Featured on curated packaging design design blogs"
    ],
    coverImage: "/projects/packaging/packaging-cover.svg",
    gallery: ["/projects/packaging/packaging-cover.svg"],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 8,
    seoTitle: "Verve Botanical Cosmetic Packaging & Dielines — Abdul Ahad",
    seoDescription: "Sustainable cosmetic packaging architecture, dielines, and labels by Abdul Ahad J.",
    createdAt: "2024-06-15T10:00:00Z",
    updatedAt: "2024-09-01T14:00:00Z"
  },
  {
    id: "proj-apparel-merchandise",
    slug: "kuro-apparel-corporate-merchandise",
    title: "Kuro — Apparel & Merchandise Identity",
    category: "Branding",
    categorySlug: "branding",
    shortDescription: "Corporate apparel design, bespoke polo uniforms, embroidered chest wordmarks, back technical prints, and merchandise identity guidelines.",
    fullDescription: "Designed premium corporate apparel, staff uniform programs, and capsule merchandise for Kuro Tech. Engineered technical polo shirt dielines, embroidered logo badges, precision typography layouts, and merchandise packaging.",
    clientName: "Kuro Techwear & Studio",
    projectYear: "2025",
    role: "Brand & Apparel Designer",
    toolsUsed: ["Adobe Illustrator", "Photoshop", "InDesign"],
    challenge: "Elevating standard corporate uniforms into modern, minimalist streetwear-inspired apparel that team members want to wear outside work.",
    creativeProcess: "Mapped optical weight for chest embroidery and engineered breathable technical back-print typography with custom vector iconography.",
    solution: "Delivered complete front-and-back garment production sheets, colorway specifications, and embroidery digitizing files.",
    results: [
      "Produced technical tech-packs for commercial garment manufacturers",
      "Created complete corporate merchandise capsule spanning polos, caps, and tote kits",
      "100% positive adoption across employee and executive teams"
    ],
    coverImage: "/projects/apparel/apparel-cover.svg",
    gallery: ["/projects/apparel/apparel-cover.svg"],
    videoUrl: "",
    isFeatured: true,
    isPublished: true,
    sortOrder: 9,
    seoTitle: "Kuro Apparel & Corporate Merchandise Identity — Abdul Ahad",
    seoDescription: "Corporate apparel, uniform design, and merchandise identity by Abdul Ahad J.",
    createdAt: "2025-05-18T10:00:00Z",
    updatedAt: "2025-07-22T14:00:00Z"
  }
];
