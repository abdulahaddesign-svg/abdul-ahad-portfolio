export type ProjectCategory = 
  | 'Branding'
  | 'Graphic Design'
  | 'Social Media'
  | 'UI/UX'
  | 'Motion Graphics'
  | 'Video Editing'
  | 'Web & App'
  | 'Packaging & Print';

export interface ProjectMedia {
  id: string;
  projectId: string;
  url: string;
  alt: string;
  caption?: string;
  mediaType: 'image' | 'video';
  sortOrder: number;
}

export interface ProjectCaseStudySection {
  id: string;
  heading: string;
  body: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  sections?: ProjectCaseStudySection[];
  clientName: string;
  projectYear: string;
  role: string;
  toolsUsed: string[];
  challenge?: string;
  approach?: string;
  creativeProcess?: string;
  solution?: string;
  results?: string[];
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  liveWebsiteUrl?: string;
  behanceUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  externalLinkLabel?: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  socialShareImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  period: string;
  isCurrent: boolean;
  location: string;
  description?: string;
  responsibilities: string[];
  achievements?: string[];
  companyLogo?: string;
  companyUrl?: string;
  sortOrder: number;
  isVisible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  isPrimary: boolean;
  tagline?: string;
  shortSummary: string;
  description: string;
  deliverables: string[];
  typicalProjects?: string[];
  creativeProcess?: { step: string; title: string; description: string }[];
  primaryImage: string;
  supportingImages: string[];
  ctaText?: string;
  ctaHref?: string;
  sortOrder: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  monogram: string;
  accentColor?: string;
  iconUrl?: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface CapabilityCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  position: 'top' | 'left' | 'right' | 'bottom';
  displayOrder: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
  tools?: CapabilityTool[];
}

export interface CapabilityTool {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  iconUrl?: string;
  description?: string;
  websiteUrl?: string;
  altText?: string;
  isSoftware: boolean;
  proficiency?: 'Expert' | 'Advanced' | 'Intermediate';
  displayOrder: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  serviceRequired: string;
  budgetRange: string;
  details: string;
  status: 'new' | 'contacted' | 'archived';
  createdAt: string;
}

export interface StorageMetrics {
  totalBytes: number;
  totalMB: number;
  totalQuotaMB: number;
  usedPercent: number;
  freeMB: number;
  freePercent: number;
  fileCount: number;
  provider: string;
}

export interface HeroProfessionItem {
  id: string;
  text: string;
  enabled: boolean;
}

export interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  location: string;
  behanceUrl: string;
  linkedinUrl: string;
  instagramUrl?: string;
  dribbbleUrl?: string;

  // Header & Navigation CMS
  headerLogoLightUrl?: string;
  headerLogoDarkUrl?: string;
  logoAltText?: string;
  headerNavLinks?: { label: string; href: string; index?: string }[];
  headerCtaText?: string;
  headerCtaHref?: string;
  availabilityStatus?: string;
  availabilityMessage?: string;
  locationTimeText?: string;

  // Homepage Hero CMS
  heroIntroduction?: string;
  heroName?: string;
  heroProfessions?: HeroProfessionItem[];
  heroAnimationInterval?: number;
  heroTransitionDuration?: number;
  heroHeadline: string;
  heroHeadlineLine2?: string;
  heroHighlightedWords?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroSupportingCopy: string;
  heroIntroSecondary?: string;
  heroLocationLabel?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaHref?: string;
  heroBgImage?: string;
  heroProfileImage?: string;
  heroMonogramVisible?: boolean;
  heroMonogramUrl?: string;
  heroAnimationEnabled?: boolean;

  // About CMS
  aboutSectionLabel?: string;
  aboutHeadline?: string;
  aboutIntro: string;
  aboutPhilosophy: string;
  aboutDescription?: string;
  aboutBio?: string;
  profilePhotoUrl?: string;
  profilePhotoAlt?: string;
  experienceYears?: string;
  achievementsSummary?: string;
  experienceHighlights?: string[];
  achievementHighlights?: string[];
  resumeUrl?: string;
  resumeLabel?: string;
  resumeVisible?: boolean;
  educationDegree: string;
  educationInstitution: string;
  educationYear: string;
  educationAggregate: string;

  // Footer CMS
  footerAppearance?: 'light' | 'dark';
  footerLogoLightUrl?: string;
  footerLogoDarkUrl?: string;
  footerDescription?: string;
  footerBrandStatement?: string;
  footerOversizedLogoVisible?: boolean;
  footerNavVisible?: boolean;
  footerCopyright?: string;
  footerLocation?: string;

  // Call to Action
  ctaHeadline?: string;
  ctaSupporting?: string;
  ctaAvailability?: string;

  // Theme & SEO
  allowDarkTheme?: boolean;
  defaultTheme?: 'light' | 'dark';
  primaryBrandColor?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;

  // Tools CMS
  toolsList?: ToolItem[];
  toolsHeadline?: string;
  toolsSubheadline?: string;
  capabilityCategories?: CapabilityCategory[];
  capabilityTools?: CapabilityTool[];

  // Homepage Dynamic Section Order
  homepageSectionOrder?: string[];
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string;
}

