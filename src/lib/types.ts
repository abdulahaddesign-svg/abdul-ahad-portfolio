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

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  clientName: string;
  projectYear: string;
  role: string;
  toolsUsed: string[];
  challenge?: string;
  creativeProcess?: string;
  solution?: string;
  results?: string[];
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
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
  period: string;
  isCurrent: boolean;
  location: string;
  responsibilities: string[];
  achievements?: string[];
  sortOrder: number;
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

export interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  behanceUrl: string;
  linkedinUrl: string;
  heroHeadline: string;
  heroSupportingCopy: string;
  aboutHeadline?: string;
  aboutIntro: string;
  aboutPhilosophy: string;
  aboutDescription?: string;
  profilePhotoUrl?: string;
  profilePhotoAlt?: string;
  experienceYears?: string;
  achievementsSummary?: string;
  resumeUrl?: string;
  resumeLabel?: string;
  resumeVisible?: boolean;
  educationDegree: string;
  educationInstitution: string;
  educationYear: string;
  educationAggregate: string;
  footerAppearance?: 'light' | 'dark';
  footerLogoLightUrl?: string;
  footerLogoDarkUrl?: string;
  footerDescription?: string;
  footerBrandStatement?: string;
  footerNavVisible?: boolean;
  footerCopyright?: string;
  ctaHeadline?: string;
  ctaSupporting?: string;
  ctaAvailability?: string;
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

