import { createClient } from './supabase/client';
import { 
  Project, 
  Inquiry, 
  SiteSettings, 
  ServiceItem, 
  ExperienceItem, 
  ProjectCategory,
  ClientLogo
} from './types';
import { 
  SITE_SETTINGS, 
  INITIAL_PROJECTS, 
  SERVICES_DATA, 
  EXPERIENCE_DATA,
  INITIAL_CLIENTS
} from './constants';

// In-memory runtime store for development/fallback when Supabase credentials are not yet entered
let localProjects: Project[] = [...INITIAL_PROJECTS];
let localClients: ClientLogo[] = [...INITIAL_CLIENTS];
let localInquiries: Inquiry[] = [
  {
    id: "inq-sample-1",
    name: "Vikram Sundaram",
    email: "vikram@novacrest.io",
    company: "NovaCrest Brands",
    serviceRequired: "Brand Identity Design",
    budgetRange: "₹50,000 - ₹1,00,000",
    details: "Looking for an end-to-end brand overhaul, logo suite, typography guidelines, and packaging dielines for our new wellness beverage line launching in Q3.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "inq-sample-2",
    name: "Pooja Menon",
    email: "pooja.menon@stridespace.com",
    company: "StrideSpace Co-working",
    serviceRequired: "UI/UX Design",
    budgetRange: "₹1,00,000+",
    details: "Need a complete mobile-first table & desk booking interface similar to the Reztro case study. Would love to review timeline and availability.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  }
];
let localSettings: SiteSettings = { ...SITE_SETTINGS };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function mapDbRowToProject(row: any): Project {
  return {
    id: row.id || `proj-${row.slug}`,
    slug: row.slug,
    title: row.title,
    category: (row.category || 'Graphic Design') as ProjectCategory,
    categorySlug: row.category_slug || row.categorySlug || 'graphic-design',
    shortDescription: row.short_description || row.shortDescription || '',
    fullDescription: row.full_description || row.fullDescription || '',
    sections: Array.isArray(row.sections) ? row.sections : [],
    clientName: row.client_name || row.clientName || '',
    projectYear: row.project_year || row.projectYear || new Date().getFullYear().toString(),
    role: row.role || 'Graphic Designer',
    toolsUsed: Array.isArray(row.tools_used) ? row.tools_used : (row.toolsUsed || []),
    challenge: row.challenge || '',
    approach: row.creative_process || row.approach || '',
    creativeProcess: row.creative_process || row.creativeProcess || '',
    solution: row.solution || '',
    results: Array.isArray(row.results) ? row.results : [],
    coverImage: row.cover_image || row.coverImage || '/projects/reztro/reztro-cover.svg',
    gallery: Array.isArray(row.gallery) && row.gallery.length > 0 ? row.gallery : [row.cover_image || '/projects/reztro/reztro-cover.svg'],
    videoUrl: row.video_url || row.videoUrl || '',
    liveWebsiteUrl: row.live_url || row.liveWebsiteUrl || '',
    appStoreUrl: row.app_store_url || row.appStoreUrl || '',
    playStoreUrl: row.play_store_url || row.playStoreUrl || '',
    externalLinkLabel: row.external_link_label || row.externalLinkLabel || '',
    isFeatured: row.is_featured ?? row.isFeatured ?? false,
    isPublished: row.is_published ?? row.isPublished ?? true,
    sortOrder: typeof row.sort_order === 'number' ? row.sort_order : (row.sortOrder ?? 0),
    seoTitle: row.seo_title || row.seoTitle || row.title,
    seoDescription: row.seo_description || row.seoDescription || row.short_description || '',
    socialShareImage: row.social_share_image || row.socialShareImage || '',
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

function mapProjectToDbRow(project: Partial<Project>): Record<string, any> {
  const row: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (project.slug !== undefined) row.slug = project.slug;
  if (project.title !== undefined) row.title = project.title;
  if (project.category !== undefined) row.category = project.category;
  if (project.categorySlug !== undefined) row.category_slug = project.categorySlug;
  if (project.shortDescription !== undefined) row.short_description = project.shortDescription;
  if (project.fullDescription !== undefined) row.full_description = project.fullDescription;
  if (project.sections !== undefined) row.sections = project.sections;
  if (project.clientName !== undefined) row.client_name = project.clientName;
  if (project.projectYear !== undefined) row.project_year = project.projectYear;
  if (project.role !== undefined) row.role = project.role;
  if (project.toolsUsed !== undefined) row.tools_used = project.toolsUsed;
  if (project.challenge !== undefined) row.challenge = project.challenge;
  if (project.approach !== undefined || project.creativeProcess !== undefined) {
    row.creative_process = project.creativeProcess || project.approach || '';
  }
  if (project.solution !== undefined) row.solution = project.solution;
  if (project.results !== undefined) row.results = project.results;
  if (project.coverImage !== undefined) row.cover_image = project.coverImage;
  if (project.gallery !== undefined) row.gallery = project.gallery;
  if (project.videoUrl !== undefined) row.video_url = project.videoUrl;
  if (project.liveWebsiteUrl !== undefined) row.live_url = project.liveWebsiteUrl;
  if (project.isFeatured !== undefined) row.is_featured = project.isFeatured;
  if (project.isPublished !== undefined) row.is_published = project.isPublished;
  if (project.sortOrder !== undefined) row.sort_order = project.sortOrder;
  if (project.seoTitle !== undefined) row.seo_title = project.seoTitle;
  if (project.seoDescription !== undefined) row.seo_description = project.seoDescription;
  if (project.socialShareImage !== undefined) row.social_share_image = project.socialShareImage;

  return row;
}

export async function getProjects(options?: {
  category?: string;
  featuredOnly?: boolean;
  includeDrafts?: boolean;
}): Promise<Project[]> {
  const supabase = createClient();

  if (supabase) {
    try {
      let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });

      if (!options?.includeDrafts) {
        query = query.eq('is_published', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (options?.category && options.category !== 'All') {
        query = query.eq('category', options.category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map(mapDbRowToProject);
      }
    } catch {
      // Fallback to local
    }
  }

  // Fallback to local store
  let filtered = [...localProjects];
  if (!options?.includeDrafts) {
    filtered = filtered.filter(p => p.isPublished);
  }
  if (options?.featuredOnly) {
    filtered = filtered.filter(p => p.isFeatured);
  }
  if (options?.category && options.category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === options.category?.toLowerCase() || p.categorySlug === options.category);
  }

  return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) return mapDbRowToProject(data);
    } catch {
      // Fallback
    }
  }

  const project = localProjects.find(p => p.slug === slug);
  return project || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient();

  if (supabase) {
    try {
      if (UUID_PATTERN.test(id)) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (!error && data) return mapDbRowToProject(data);
      } else {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', id)
          .maybeSingle();
        if (!error && data) return mapDbRowToProject(data);
      }
    } catch {
      // Fallback
    }
  }

  const project = localProjects.find(p => p.id === id || p.slug === id);
  return project || null;
}

export async function saveProject(project: Partial<Project> & { id?: string }): Promise<Project> {
  // 1. If running in browser, use API endpoint for server-side revalidation and persistence
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        const saved = await res.json();
        // Update localProjects cache in memory
        const idx = localProjects.findIndex(p => p.id === saved.id || p.slug === saved.slug);
        if (idx !== -1) {
          localProjects[idx] = saved;
        } else {
          localProjects.push(saved);
        }
        return saved;
      }
    } catch (apiErr) {
      console.warn('API /api/projects call failed, falling back:', apiErr);
    }
  }

  // 2. Direct Supabase save (server-side context)
  const supabase = createClient();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const row = mapProjectToDbRow(project);
      let dbData: any = null;

      if (project.id && UUID_PATTERN.test(project.id)) {
        const { data, error } = await supabase
          .from('projects')
          .update(row)
          .eq('id', project.id)
          .select()
          .maybeSingle();
        if (!error && data) dbData = data;
      }

      if (!dbData && project.slug) {
        const { data: existing } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', project.slug)
          .maybeSingle();

        if (existing?.id) {
          const { data, error } = await supabase
            .from('projects')
            .update(row)
            .eq('id', existing.id)
            .select()
            .single();
          if (!error && data) dbData = data;
        } else {
          const { data, error } = await supabase
            .from('projects')
            .insert({ ...row, created_at: now })
            .select()
            .single();
          if (!error && data) dbData = data;
        }
      }

      if (dbData) {
        return mapDbRowToProject(dbData);
      }
    } catch (supaErr) {
      console.warn('Direct Supabase save failed:', supaErr);
    }
  }

  // 3. Local fallback persistence
  if (project.id) {
    const index = localProjects.findIndex(p => p.id === project.id || p.slug === project.slug);
    if (index !== -1) {
      localProjects[index] = {
        ...localProjects[index],
        ...project,
        updatedAt: now,
      } as Project;
      return localProjects[index];
    }
  }

  const newProj: Project = {
    id: project.id || `proj-${Date.now()}`,
    slug: project.slug || `project-${Date.now()}`,
    title: project.title || 'Untitled Project',
    category: (project.category as ProjectCategory) || 'Graphic Design',
    categorySlug: project.categorySlug || 'graphic-design',
    shortDescription: project.shortDescription || '',
    fullDescription: project.fullDescription || '',
    sections: project.sections || [],
    clientName: project.clientName || '',
    projectYear: project.projectYear || '2025',
    role: project.role || 'Graphic Designer',
    toolsUsed: project.toolsUsed || ['Adobe Illustrator'],
    challenge: project.challenge || '',
    approach: project.approach || project.creativeProcess || '',
    creativeProcess: project.creativeProcess || project.approach || '',
    solution: project.solution || '',
    results: project.results || [],
    coverImage: project.coverImage || '/projects/reztro/reztro-cover.svg',
    gallery: project.gallery || [],
    videoUrl: project.videoUrl || '',
    liveWebsiteUrl: project.liveWebsiteUrl || '',
    appStoreUrl: project.appStoreUrl || '',
    playStoreUrl: project.playStoreUrl || '',
    externalLinkLabel: project.externalLinkLabel || '',
    isFeatured: project.isFeatured ?? false,
    isPublished: project.isPublished ?? true,
    sortOrder: project.sortOrder ?? (localProjects.length + 1),
    seoTitle: project.seoTitle || project.title,
    seoDescription: project.seoDescription || project.shortDescription,
    createdAt: now,
    updatedAt: now,
  };

  localProjects.push(newProj);
  return newProj;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        localProjects = localProjects.filter(p => p.id !== id && p.slug !== id);
        return true;
      }
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      let query = supabase.from('projects').delete();
      if (UUID_PATTERN.test(id)) {
        query = query.eq('id', id);
      } else {
        query = query.or(`id.eq.${id},slug.eq.${id}`);
      }
      const { error } = await query;
      if (!error) {
        localProjects = localProjects.filter(p => p.id !== id && p.slug !== id);
        return true;
      }
    } catch {
      // Fallback
    }
  }

  const initialLen = localProjects.length;
  localProjects = localProjects.filter(p => p.id !== id && p.slug !== id);
  return localProjects.length < initialLen;
}

export async function duplicateProject(id: string): Promise<Project | null> {
  const existing = await getProjectById(id);
  if (!existing) return null;

  const duplicated: Partial<Project> = {
    ...existing,
    id: undefined,
    slug: `${existing.slug}-copy-${Math.floor(Math.random() * 1000)}`,
    title: `${existing.title} (Copy)`,
    isPublished: false,
    sortOrder: localProjects.length + 1,
  };

  return await saveProject(duplicated);
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Inquiry[];
    } catch {
      // Fallback
    }
  }

  return [...localInquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function submitInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company || '',
          service_required: inquiry.serviceRequired,
          budget_range: inquiry.budgetRange,
          details: inquiry.details,
          status: 'new',
        });

      if (!error) {
        return {
          ...inquiry,
          id: `inq-${Date.now()}`,
          status: 'new',
          createdAt: now,
        };
      }
    } catch {
      // Fallback
    }
  }

  const newInq: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'new',
    createdAt: now,
  };
  localInquiries.unshift(newInq);
  return newInq;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'archived'): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
      if (!error) return true;
    } catch {
      // Fallback
    }
  }

  const inq = localInquiries.find(i => i.id === id);
  if (inq) {
    inq.status = status;
    return true;
  }
  return false;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (!error) return true;
    } catch {
      // Fallback
    }
  }

  localInquiries = localInquiries.filter(i => i.id !== id);
  return true;
}

let localServices: ServiceItem[] = [...SERVICES_DATA];

export async function getServices(includeUnpublished = false): Promise<ServiceItem[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      let query = supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          isPrimary: row.is_primary ?? false,
          tagline: row.tagline,
          shortSummary: row.short_summary,
          description: row.description,
          deliverables: row.deliverables ?? [],
          typicalProjects: row.typical_projects ?? [],
          creativeProcess: row.creative_process ?? [],
          primaryImage: row.primary_image || '/projects/freelance/branding-cover.svg',
          supportingImages: row.supporting_images ?? [],
          ctaText: row.cta_text || 'Initiate Brief',
          ctaHref: row.cta_href || '/contact',
          sortOrder: row.sort_order ?? 0,
          isPublished: row.is_published ?? true,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })).filter((s: ServiceItem) => includeUnpublished || s.isPublished !== false);
      }
    } catch {
      // Fallback to local
    }
  }

  return [...localServices]
    .filter(s => includeUnpublished || s.isPublished !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const services = await getServices(true);
  return services.find(s => s.id === id) || null;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices(false);
  return services.find(s => s.slug === slug) || null;
}

export async function createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const newId = `srv-${Date.now()}`;
  const newService: ServiceItem = {
    ...service,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('services').insert({
        title: newService.title,
        slug: newService.slug,
        is_primary: newService.isPrimary,
        tagline: newService.tagline,
        short_summary: newService.shortSummary,
        description: newService.description,
        deliverables: newService.deliverables,
        typical_projects: newService.typicalProjects,
        creative_process: newService.creativeProcess,
        primary_image: newService.primaryImage,
        supporting_images: newService.supportingImages,
        cta_text: newService.ctaText,
        cta_href: newService.ctaHref,
        sort_order: newService.sortOrder,
        is_published: newService.isPublished,
      });
    } catch {
      // Fallback
    }
  }

  localServices.push(newService);
  return newService;
}

export async function updateService(
  service: Partial<ServiceItem> & { id: string }
): Promise<ServiceItem | null> {
  const idx = localServices.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    localServices[idx] = {
      ...localServices[idx],
      ...service,
      updatedAt: new Date().toISOString(),
    };
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase
        .from('services')
        .update({
          title: service.title,
          slug: service.slug,
          is_primary: service.isPrimary,
          tagline: service.tagline,
          short_summary: service.shortSummary,
          description: service.description,
          deliverables: service.deliverables,
          typical_projects: service.typicalProjects,
          creative_process: service.creativeProcess,
          primary_image: service.primaryImage,
          supporting_images: service.supportingImages,
          cta_text: service.ctaText,
          cta_href: service.ctaHref,
          sort_order: service.sortOrder,
          is_published: service.isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq('id', service.id);
    } catch {
      // Fallback
    }
  }

  return localServices.find(s => s.id === service.id) || null;
}

export async function deleteService(id: string): Promise<boolean> {
  const initialLen = localServices.length;
  localServices = localServices.filter(s => s.id !== id);

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }

  return localServices.length < initialLen;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return EXPERIENCE_DATA;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return {
          ...localSettings,
          name: data.name ?? localSettings.name,
          title: data.title ?? localSettings.title,
          tagline: data.tagline ?? localSettings.tagline,
          email: data.email ?? localSettings.email,
          phone: data.phone ?? localSettings.phone,
          location: data.location ?? localSettings.location,
          behanceUrl: data.behance_url ?? localSettings.behanceUrl,
          linkedinUrl: data.linkedin_url ?? localSettings.linkedinUrl,
          heroHeadline: data.hero_headline ?? localSettings.heroHeadline,
          heroSupportingCopy: data.hero_supporting_copy ?? localSettings.heroSupportingCopy,
          aboutHeadline: data.about_headline ?? localSettings.aboutHeadline,
          aboutIntro: data.about_intro ?? localSettings.aboutIntro,
          aboutPhilosophy: data.about_philosophy ?? localSettings.aboutPhilosophy,
          aboutDescription: data.about_description ?? localSettings.aboutDescription,
          aboutBio: data.about_bio ?? localSettings.aboutBio,
          profilePhotoUrl: data.profile_photo_url ?? localSettings.profilePhotoUrl,
          resumeUrl: data.resume_url ?? localSettings.resumeUrl,
          resumeLabel: data.resume_label ?? localSettings.resumeLabel,
          resumeVisible: data.resume_visible ?? localSettings.resumeVisible,
          educationDegree: data.education_degree ?? localSettings.educationDegree,
          educationInstitution: data.education_institution ?? localSettings.educationInstitution,
          educationYear: data.education_year ?? localSettings.educationYear,
          educationAggregate: data.education_aggregate ?? localSettings.educationAggregate,
          footerAppearance: (data.footer_appearance as any) ?? localSettings.footerAppearance,
          footerLogoLightUrl: data.footer_logo_light_url ?? localSettings.footerLogoLightUrl,
          footerLogoDarkUrl: data.footer_logo_dark_url ?? localSettings.footerLogoDarkUrl,
          footerDescription: data.footer_description ?? localSettings.footerDescription,
          footerCopyright: data.footer_copyright ?? localSettings.footerCopyright,
        };
      }
    } catch {
      // Fallback
    }
  }
  return localSettings;
}

export async function updateSiteSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  localSettings = { ...localSettings, ...newSettings };

  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const data = await res.json();
        return { ...localSettings, ...data };
      }
    } catch {
      // Continue to direct Supabase update
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const dbPayload: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (newSettings.name !== undefined) dbPayload.name = newSettings.name;
      if (newSettings.title !== undefined) dbPayload.title = newSettings.title;
      if (newSettings.tagline !== undefined) dbPayload.tagline = newSettings.tagline;
      if (newSettings.email !== undefined) dbPayload.email = newSettings.email;
      if (newSettings.phone !== undefined) dbPayload.phone = newSettings.phone;
      if (newSettings.location !== undefined) dbPayload.location = newSettings.location;
      if (newSettings.behanceUrl !== undefined) dbPayload.behance_url = newSettings.behanceUrl;
      if (newSettings.linkedinUrl !== undefined) dbPayload.linkedin_url = newSettings.linkedinUrl;
      if (newSettings.heroHeadline !== undefined) dbPayload.hero_headline = newSettings.heroHeadline;
      if (newSettings.heroSupportingCopy !== undefined) dbPayload.hero_supporting_copy = newSettings.heroSupportingCopy;
      if (newSettings.aboutHeadline !== undefined) dbPayload.about_headline = newSettings.aboutHeadline;
      if (newSettings.aboutIntro !== undefined) dbPayload.about_intro = newSettings.aboutIntro;
      if (newSettings.aboutPhilosophy !== undefined) dbPayload.about_philosophy = newSettings.aboutPhilosophy;
      if (newSettings.aboutDescription !== undefined) dbPayload.about_description = newSettings.aboutDescription;
      if (newSettings.aboutBio !== undefined) dbPayload.about_bio = newSettings.aboutBio;
      if (newSettings.profilePhotoUrl !== undefined) dbPayload.profile_photo_url = newSettings.profilePhotoUrl;
      if (newSettings.resumeUrl !== undefined) dbPayload.resume_url = newSettings.resumeUrl;
      if (newSettings.resumeLabel !== undefined) dbPayload.resume_label = newSettings.resumeLabel;
      if (newSettings.resumeVisible !== undefined) dbPayload.resume_visible = newSettings.resumeVisible;
      if (newSettings.educationDegree !== undefined) dbPayload.education_degree = newSettings.educationDegree;
      if (newSettings.educationInstitution !== undefined) dbPayload.education_institution = newSettings.educationInstitution;
      if (newSettings.educationYear !== undefined) dbPayload.education_year = newSettings.educationYear;
      if (newSettings.educationAggregate !== undefined) dbPayload.education_aggregate = newSettings.educationAggregate;
      if (newSettings.footerAppearance !== undefined) dbPayload.footer_appearance = newSettings.footerAppearance;
      if (newSettings.footerLogoLightUrl !== undefined) dbPayload.footer_logo_light_url = newSettings.footerLogoLightUrl;
      if (newSettings.footerLogoDarkUrl !== undefined) dbPayload.footer_logo_dark_url = newSettings.footerLogoDarkUrl;
      if (newSettings.footerDescription !== undefined) dbPayload.footer_description = newSettings.footerDescription;
      if (newSettings.footerCopyright !== undefined) dbPayload.footer_copyright = newSettings.footerCopyright;

      await supabase
        .from('site_settings')
        .update(dbPayload)
        .eq('id', 'primary');
    } catch {
      // Fallback
    }
  }
  return localSettings;
}

export async function getClientLogos(includeHidden = false): Promise<ClientLogo[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      let query = supabase.from('clients').select('*').order('sort_order', { ascending: true });
      if (!includeHidden) {
        query = query.eq('is_visible', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          logoUrl: d.logo_url || d.logoUrl,
          websiteUrl: d.website_url || d.websiteUrl,
          sortOrder: d.sort_order || d.sortOrder,
          isVisible: d.is_visible ?? d.isVisible,
          createdAt: d.created_at || d.createdAt,
        })) as ClientLogo[];
      }
    } catch {
      // Fallback
    }
  }

  let list = [...localClients];
  if (!includeHidden) {
    list = list.filter((c) => c.isVisible);
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveClientLogo(client: Partial<ClientLogo> & { id?: string }): Promise<ClientLogo> {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      if (client.id && !client.id.startsWith('cli-temp-')) {
        const { data, error } = await supabase
          .from('clients')
          .update({
            name: client.name,
            logo_url: client.logoUrl,
            website_url: client.websiteUrl || '',
            sort_order: client.sortOrder ?? 1,
            is_visible: client.isVisible ?? true,
          })
          .eq('id', client.id)
          .select()
          .single();
        if (!error && data) {
          return {
            id: data.id,
            name: data.name,
            logoUrl: data.logo_url,
            websiteUrl: data.website_url,
            sortOrder: data.sort_order,
            isVisible: data.is_visible,
            createdAt: data.created_at,
          };
        }
      } else {
        const { id, ...newClientData } = client;
        const { data, error } = await supabase
          .from('clients')
          .insert({
            name: newClientData.name,
            logo_url: newClientData.logoUrl,
            website_url: newClientData.websiteUrl || '',
            sort_order: newClientData.sortOrder ?? 1,
            is_visible: newClientData.isVisible ?? true,
            created_at: now,
          })
          .select()
          .single();
        if (!error && data) {
          return {
            id: data.id,
            name: data.name,
            logoUrl: data.logo_url,
            websiteUrl: data.website_url,
            sortOrder: data.sort_order,
            isVisible: data.is_visible,
            createdAt: data.created_at,
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  if (client.id) {
    const idx = localClients.findIndex((c) => c.id === client.id);
    if (idx !== -1) {
      localClients[idx] = {
        ...localClients[idx],
        ...client,
      } as ClientLogo;
      return localClients[idx];
    }
  }

  const created: ClientLogo = {
    id: client.id || `cli-${Date.now()}`,
    name: client.name || 'Untitled Client',
    logoUrl: client.logoUrl || '/clients/client-reztro.svg',
    websiteUrl: client.websiteUrl || '',
    sortOrder: client.sortOrder ?? (localClients.length + 1),
    isVisible: client.isVisible ?? true,
    createdAt: now,
  };
  localClients.push(created);
  return created;
}

export async function deleteClientLogo(id: string): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (!error) return true;
    } catch {
      // Fallback
    }
  }

  localClients = localClients.filter((c) => c.id !== id);
  return true;
}

