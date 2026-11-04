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
  whatsappNumber: "+91 9150037005",
  location: "Coimbatore, Tamil Nadu, India",
  behanceUrl: "https://www.behance.net/abdulahad438",
  linkedinUrl: "https://www.linkedin.com/in/abdulahadj",

  // Header & Navigation CMS
  headerLogoLightUrl: "/brand/logo-wordmark-clean-light.png",
  headerLogoDarkUrl: "/brand/logo-wordmark-clean-dark.png",
  logoAltText: "Abdul Ahad J — Creative Designer",
  headerNavLinks: [
    { label: "Work", href: "/work", index: "01" },
    { label: "About", href: "/about", index: "02" },
    { label: "Services", href: "/services", index: "03" },
    { label: "Contact", href: "/contact", index: "04" },
  ],
  headerCtaText: "Initiate Brief",
  headerCtaHref: "/contact",
  availabilityStatus: "Available for New Projects",
  availabilityMessage: "Available for select brand identity, product design and creative retainer engagements.",
  locationTimeText: "Coimbatore, IN",

  // Homepage Hero CMS
  heroHeadline: "ABDUL AHAD",
  heroHeadlineLine2: "",
  heroHighlightedWords: "",
  heroTitle: "CREATIVE DESIGNER & DIGITAL CREATIVE PARTNER",
  heroSubtitle: "Design that makes businesses stand out.",
  heroSupportingCopy: "I create thoughtful visual identities, digital experiences, and motion-led content for brands that want to stand out.",
  heroIntroSecondary: "Combining visual design, typography, and human-centered design thinking to deliver precise creative solutions that command attention and build credibility.",
  heroLocationLabel: "Coimbatore, Tamil Nadu, India",
  heroPrimaryCtaText: "Initiate Brief",
  heroPrimaryCtaHref: "/contact",
  heroSecondaryCtaText: "View Selected Work",
  heroSecondaryCtaHref: "/work",
  heroBgImage: "",
  heroProfileImage: "",
  heroMonogramVisible: true,
  heroMonogramUrl: "/brand/logo-monogram-light.png",
  heroAnimationEnabled: true,

  // About CMS
  aboutSectionLabel: "BIOGRAPHY & CAPABILITIES",
  aboutHeadline: "I create visual experiences that make ideas matter.",
  aboutIntro: "Abdul Ahad J is a creative designer based in Coimbatore, India, with 3+ years of experience in graphic design, visual branding and digital creative production.",
  aboutPhilosophy: "Design is not decorative styling; it is clear thinking made visible. I combine visual harmony, typographic discipline, and strategic intent to craft brand experiences that command attention, build credibility, and inspire action.",
  aboutDescription: "He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025. He works independently and collaborates with teams when projects require broader creative capabilities.",
  aboutBio: "He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025. He works independently and collaborates with teams when projects require broader creative capabilities.",
  profilePhotoUrl: "/profile/abdul-ahad.jpg",
  profilePhotoAlt: "Abdul Ahad J — Creative Designer & Visual Specialist",
  experienceYears: "3+ Years",
  achievementsSummary: "Best Employee of the Year 2025 at eClerx · 50+ Freelance Clients",
  experienceHighlights: [
    "3+ Years of multidisciplinary design experience across enterprise, SaaS, and boutique brands",
    "Best Employee of the Year 2025 at eClerx for high-retention creative delivery",
    "50+ Successful freelance client projects delivered globally"
  ],
  achievementHighlights: [
    "Best Employee of the Year 2025 (eClerx)",
    "Reztro Table Ordering UI/UX with 40% reduced order friction",
    "50+ Global Brand Identity Deliveries"
  ],
  resumeUrl: "/resume/abdul-ahad-resume.pdf",
  resumeLabel: "PDF · Updated Resume",
  resumeVisible: true,
  educationDegree: "Bachelor of Science in Computer Science",
  educationInstitution: "Government Arts College (Autonomous), Coimbatore",
  educationYear: "2020 – 2023",
  educationAggregate: "80% Aggregate",

  // Footer CMS
  footerAppearance: "dark",
  footerLogoLightUrl: "/brand/logo-wordmark-clean-light.png",
  footerLogoDarkUrl: "/brand/logo-wordmark-clean-dark.png",
  footerDescription: "Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India.",
  footerBrandStatement: "Abdul Ahad",
  footerNavVisible: true,
  footerCopyright: "Abdul Ahad J. All rights reserved.",
  footerLocation: "Coimbatore, Tamil Nadu, India",

  // Call to Action
  ctaHeadline: "HAVE A PROJECT\nIN MIND?",
  ctaSupporting: "Let's create something meaningful together.",
  ctaAvailability: "Available for New Projects · Q1 / Q2",

  // Theme & SEO
  defaultTheme: "dark",
  primaryBrandColor: "#C4855A",
  defaultSeoTitle: "Abdul Ahad J — Graphic Designer & Visual Branding Specialist",
  defaultSeoDescription: "Multidisciplinary creative portfolio of Abdul Ahad J. Brand identity design, UI/UX mobile product design, motion graphics and high-impact digital collateral in Coimbatore, India."
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
    employmentType: "Full-time",
    startDate: "May 2025",
    endDate: "Present",
    period: "May 2025 – Present",
    isCurrent: true,
    location: "Coimbatore, India",
    description: "Leading visual design and digital creative campaigns for enterprise SaaS products.",
    companyLogo: "/clients/client-falcon.svg",
    isVisible: true,
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
    employmentType: "Full-time",
    startDate: "June 2023",
    endDate: "May 2025",
    period: "June 2023 – May 2025",
    isCurrent: false,
    location: "India",
    description: "Campaign-ready visual design production for global enterprise brands with high typographic discipline.",
    companyLogo: "/clients/client-apex.svg",
    isVisible: true,
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
    employmentType: "Independent",
    startDate: "August 2020",
    endDate: "Present",
    period: "August 2020 – Present",
    isCurrent: true,
    location: "Remote / Coimbatore",
    description: "Direct brand identity, digital product design and motion consultation for 50+ clients globally.",
    companyLogo: "/clients/client-reztro.svg",
    isVisible: true,
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
    tagline: "Posters, Advertising Creatives, Social Media & Tangible Packaging Dielines",
    shortSummary: "Comprehensive visual branding, brand identity systems, and high-impact graphic design that position your business with authority.",
    description: "The core foundation of Abdul Ahad's creative practice. Developing cohesive visual languages that communicate your unique market positioning, command attention in crowded feeds, and maintain unmistakable consistency across digital and print mediums.",
    deliverables: [
      "Custom posters & campaign collaterals",
      "High-engagement social media creative sets",
      "Conversion-focused ad banners & flyers",
      "Packaging boxes, labels & dielines",
      "Editorial publications & sales pitch decks",
      "Vector iconography & brand assets"
    ],
    typicalProjects: [
      "Retail product box & label packaging",
      "Multi-channel paid acquisition ad suites",
      "Monthly social media creative retainers",
      "Corporate event & conference promotional assets"
    ],
    creativeProcess: [
      { step: "01", title: "Brand Discovery & Audit", description: "Analyzing competitive landscape, target audience, and strategic objectives." },
      { step: "02", title: "Visual Direction & Moodboarding", description: "Exploring typographic themes, chromatic palettes, and design styles." },
      { step: "03", title: "Design Execution & Refinement", description: "Crafting identity marks, grid systems, and functional applications." },
      { step: "04", title: "Guidelines & Production Handoff", description: "Packaging master vector files, typography rules, and usage specifications." }
    ],
    primaryImage: "/projects/packaging/packaging-cover.svg",
    supportingImages: [
      "/projects/social/social-cover.svg",
      "/projects/apparel/apparel-cover.svg"
    ],
    ctaText: "Initiate Branding Brief",
    ctaHref: "/contact?service=graphic-design",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "srv-2",
    title: "Brand Identity Design",
    slug: "brand-identity-design",
    isPrimary: false,
    tagline: "Distinctive Logos, Typography Standards & Cohesive Visual Systems",
    shortSummary: "Memorable logos, monograms, symbol marks, and complete brand identity design systems.",
    description: "Creating distinctive visual identities built on conceptual rigor and typographic distinction. Each mark is engineered to scale seamlessly from a 16px favicon to giant outdoor billboards with mathematical precision.",
    deliverables: [
      "Primary, secondary & responsive logo suite",
      "Monograms, emblem marks & crests",
      "Brand color formulas (RGB, CMYK, Pantone)",
      "Typographic hierarchy & pairing guidelines",
      "Comprehensive brand guidelines book (PDF)",
      "Real-world application mockups & stationery"
    ],
    typicalProjects: [
      "Early-stage venture & startup brand launches",
      "Boutique studio & luxury hospitality marks",
      "Brand refresh & modernization overhauls"
    ],
    creativeProcess: [
      { step: "01", title: "Conceptual Sketching", description: "Iterative exploration of geometric and organic concepts." },
      { step: "02", title: "Vector Precision", description: "Refining geometry, curve continuity, and optical balance." },
      { step: "03", title: "Contextual Testing", description: "Validating across light, dark, color, and monochrome substrates." }
    ],
    primaryImage: "/projects/freelance/branding-cover.svg",
    supportingImages: [
      "/projects/falcon/falcon-cover.svg",
      "/projects/reztro/reztro-brand.svg"
    ],
    ctaText: "Design Brand Identity",
    ctaHref: "/contact?service=brand-identity",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "srv-3",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    isPrimary: false,
    tagline: "Human-Centered Mobile & Desktop Digital Product Interfaces",
    shortSummary: "Mobile-first digital products, design systems, and intuitive customer-facing interfaces.",
    description: "Digital product interfaces rooted in cognitive psychology and human-centered design principles. From wireframing frictionless user flows to architecting multi-state component design systems in Figma.",
    deliverables: [
      "Mobile app UX/UI design (iOS & Android)",
      "Scalable Figma design systems & component libraries",
      "Wireframing, user persona & journey mapping",
      "High-fidelity interactive click-through prototypes",
      "Micro-interaction states & responsive grid constraints",
      "Developer handoff documentation & tokens"
    ],
    typicalProjects: [
      "Reztro Table Ordering Platform (-40% wait times)",
      "SaaS analytics dashboards & administrative portals",
      "Consumer mobile iOS & Android applications"
    ],
    creativeProcess: [
      { step: "01", title: "Research & Journey Mapping", description: "Identifying user friction points and key milestones." },
      { step: "02", title: "Wireframes & Prototyping", description: "Iterative low-fidelity layouts validated with stakeholders." },
      { step: "03", title: "High-Fidelity Interface", description: "Crafting the visual layer with responsive constraints." }
    ],
    primaryImage: "/projects/reztro/reztro-cover.svg",
    supportingImages: [
      "/projects/reztro/reztro-mobile-flow.svg",
      "/projects/reztro/reztro-admin.svg"
    ],
    ctaText: "Discuss UI/UX Project",
    ctaHref: "/contact?service=ui-ux",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "srv-4",
    title: "Motion Graphics",
    slug: "motion-graphics",
    isPrimary: false,
    tagline: "Kinetic Typography, 2D Animation, Logo Stings & Micro-Interactions",
    shortSummary: "Dynamic 2D animation, logo stings, UI micro-interactions, and kinetic typography.",
    description: "Bringing static brand elements to life with purposeful motion design. Smooth easings, rhythmic timing, and brand-consistent choreography engineered to capture viewer attention within the first 1.5 seconds.",
    deliverables: [
      "Animated brand logo reveals & stings",
      "Kinetic typography sequences & campaign teasers",
      "UI micro-interactions & Lottie vector animations",
      "Broadcast lower-thirds & title motion graphics",
      "Product feature explainer motion walkthroughs"
    ],
    typicalProjects: [
      "Brand identity launch animated stings",
      "Product feature social announcement teasers",
      "High-converting video advertising graphics"
    ],
    creativeProcess: [
      { step: "01", title: "Storyboard & Timing", description: "Pacing key frames and motion rhythm." },
      { step: "02", title: "Asset Preparation & Rigging", description: "Layering vectors for After Effects." },
      { step: "03", title: "Animation & Polishing", description: "Fine-tuning graph-editor curves and export optimization." }
    ],
    primaryImage: "/projects/motion/motion-cover.svg",
    supportingImages: [
      "/projects/social/social-cover.svg",
      "/projects/eclerx/eclerx-cover.svg"
    ],
    ctaText: "Commission Motion Work",
    ctaHref: "/contact?service=motion-graphics",
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "srv-5",
    title: "Video Editing",
    slug: "video-editing",
    isPrimary: false,
    tagline: "Paced Short-Form Social Edits, Reels & Cinematic Commercial Cuts",
    shortSummary: "Paced video storytelling, promotional social edits, Reels, and product showcase videos.",
    description: "End-to-end post-production editing combining tight narrative cuts, cinematic pacing, color grading, audio sweetening, and custom graphic overlays tailored for high retention.",
    deliverables: [
      "Instagram Reels & YouTube Shorts high-retention cuts",
      "Product showcase & dynamic demo edits",
      "Corporate event & interview highlight reels",
      "Color grading & LUT application",
      "Dynamic animated subtitles & sound design"
    ],
    typicalProjects: [
      "Viral promotional social video campaigns",
      "Brand commercial short-form edits",
      "Founder interview & thought-leadership sequences"
    ],
    creativeProcess: [
      { step: "01", title: "Rough Cut & Story Assembly", description: "Establishing pacing, narrative arc, and music beat." },
      { step: "02", title: "Visual Polish & Graphics", description: "Integrating lower-thirds, callouts, and motion assets." },
      { step: "03", title: "Color & Audio Mastering", description: "Balancing dialogue, ambient audio, and color tones." }
    ],
    primaryImage: "/projects/eclerx/eclerx-cover.svg",
    supportingImages: [
      "/projects/motion/motion-cover.svg",
      "/projects/falcon/falcon-cover.svg"
    ],
    ctaText: "Book Video Production",
    ctaHref: "/contact?service=video-editing",
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: "srv-6",
    title: "Web & App Design",
    slug: "web-app-design",
    isPrimary: false,
    tagline: "Responsive Modern Websites, Landing Pages & Accessible Systems",
    shortSummary: "Modern responsive website designs, landing page concepts, and digital product layouts.",
    description: "Editorial-grade web design balancing bold typography, asymmetric layouts, and conversion-centric UX. Crafted in Figma and architected with modern frontend paradigms in mind.",
    deliverables: [
      "Responsive web page designs (Desktop, Tablet, Mobile)",
      "High-converting promotional landing pages",
      "Interactive Figma prototypes & tokens",
      "Web accessibility & WCAG-compliant design",
      "Design systems & developer handoff specs"
    ],
    typicalProjects: [
      "Independent studio & agency portfolio websites",
      "SaaS and startup conversion landing pages",
      "Modern e-commerce boutique storefronts"
    ],
    creativeProcess: [
      { step: "01", title: "Content Architecture", description: "Structuring page sections for logical reading hierarchy." },
      { step: "02", title: "Visual Concepting", description: "Deploying typography, spacing, and brand elements." },
      { step: "03", title: "Breakpoint Responsive Scaling", description: "Refining mobile, tablet, and widescreen layouts." }
    ],
    primaryImage: "/projects/web/hero-collection-cover.svg",
    supportingImages: [
      "/projects/reztro/reztro-cover.svg",
      "/projects/reztro/reztro-mobile-flow.svg"
    ],
    ctaText: "Start Web Collaboration",
    ctaHref: "/contact?service=web-app",
    sortOrder: 6,
    isPublished: true,
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
    liveWebsiteUrl: "https://reztro.app",
    appStoreUrl: "https://apps.apple.com/app/reztro",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.reztro",
    externalLinkLabel: "Launch Live App",
    approach: "Employing human-centered design thinking, we mapped the guest ordering journey from table seated to bill payment. We conducted comparative audits of existing QR-code menu experiences, identified cognitive friction in category browsing, and created rapid wireframes for both customer-facing mobile web screens and tablet-based kitchen displays.",
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
    liveWebsiteUrl: "https://www.figma.com/@abdulahad",
    externalLinkLabel: "View Figma Prototype",
    approach: "Established strict grid constraints and experimented with micro-interactions, asymmetrical layouts, and high-contrast color systems.",
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
