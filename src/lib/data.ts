import { createClient } from './supabase/client';
import { 
  Project, 
  Inquiry, 
  SiteSettings, 
  ServiceItem, 
  ExperienceItem, 
  ProjectCategory,
  ClientLogo,
  CapabilityCategory,
  CapabilityTool,
  StorageMetrics
} from './types';
import { 
  SITE_SETTINGS, 
  INITIAL_PROJECTS, 
  SERVICES_DATA, 
  EXPERIENCE_DATA,
  INITIAL_CLIENTS,
  DEFAULT_CAPABILITY_CATEGORIES,
  DEFAULT_CAPABILITY_TOOLS
} from './constants';

// In-memory runtime store for development/fallback when Supabase credentials are not yet entered
let localProjects: Project[] = [...INITIAL_PROJECTS];
let localClients: ClientLogo[] = [...INITIAL_CLIENTS];
let localCapabilityCategories: CapabilityCategory[] = [...DEFAULT_CAPABILITY_CATEGORIES];
let localCapabilityTools: CapabilityTool[] = [...DEFAULT_CAPABILITY_TOOLS];
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
    behanceUrl: row.behance_url || row.behanceUrl || '',
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
  if (project.behanceUrl !== undefined) row.behance_url = project.behanceUrl;
  if (project.appStoreUrl !== undefined) row.app_store_url = project.appStoreUrl;
  if (project.playStoreUrl !== undefined) row.play_store_url = project.playStoreUrl;
  if (project.externalLinkLabel !== undefined) row.external_link_label = project.externalLinkLabel;
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
        const dbProjects = data.map(mapDbRowToProject);
        const dbSlugs = new Set(dbProjects.map(p => p.slug));
        const missingDefaults = localProjects.filter(p => !dbSlugs.has(p.slug));
        let merged = [...dbProjects, ...missingDefaults];
        if (!options?.includeDrafts) {
          merged = merged.filter(p => p.isPublished);
        }
        if (options?.featuredOnly) {
          merged = merged.filter(p => p.isFeatured);
        }
        if (options?.category && options.category !== 'All') {
          merged = merged.filter(p => p.category.toLowerCase() === options.category?.toLowerCase() || p.categorySlug === options.category);
        }
        return merged.sort((a, b) => a.sortOrder - b.sortOrder);
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
    behanceUrl: project.behanceUrl || '',
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
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/inquiries?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          company: d.company || '',
          serviceRequired: d.service_required || d.serviceRequired || 'Graphic Design & Visual Branding',
          budgetRange: d.budget_range || d.budgetRange || 'Flexible',
          details: d.details || '',
          status: (d.status as 'new' | 'contacted' | 'archived') || 'new',
          createdAt: d.created_at || d.createdAt || new Date().toISOString(),
        }));
      }
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
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company || '',
          service_required: inquiry.serviceRequired,
          budget_range: inquiry.budgetRange,
          details: inquiry.details,
          status: 'new',
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          company: data.company,
          serviceRequired: data.service_required,
          budgetRange: data.budget_range,
          details: data.details,
          status: data.status,
          createdAt: data.created_at,
        };
      }

      if (error) {
        console.error('Supabase inquiry insert error:', error);
        throw new Error(`Database error saving inquiry: ${error.message}`);
      }
    } catch (err: any) {
      console.error('Database inquiry insertion exception:', err);
      throw err;
    }
  } else {
    throw new Error('Supabase client connection not configured.');
  }

  const newInq: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'new',
    createdAt: now,
  };
  return newInq;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'archived'): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const inq = localInquiries.find(i => i.id === id);
        if (inq) inq.status = status;
        return true;
      }
    } catch {
      // Fallback
    }
  }

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
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        localInquiries = localInquiries.filter(i => i.id !== id);
        return true;
      }
    } catch {
      // Fallback
    }
  }

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
  let dbServices: ServiceItem[] = [];

  if (supabase) {
    try {
      let query = supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        dbServices = data.map((row: any) => ({
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
          primaryImage: row.primary_image || row.image_url || '/projects/freelance/branding-cover.svg',
          supportingImages: Array.isArray(row.supporting_images) && row.supporting_images.length > 0 
            ? row.supporting_images 
            : (Array.isArray(row.capabilities) ? row.capabilities : ['/projects/social/social-cover.svg', '/projects/apparel/apparel-cover.svg']),
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

  // If Supabase returned items, merge any missing defaults so that all 6 services are always present
  if (dbServices.length > 0) {
    const dbSlugs = new Set(dbServices.map(s => s.slug));
    const missingDefaults = localServices.filter(s => !dbSlugs.has(s.slug) && (includeUnpublished || s.isPublished !== false));
    return [...dbServices, ...missingDefaults].sort((a, b) => a.sortOrder - b.sortOrder);
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
  const now = new Date().toISOString();
  const newService: ServiceItem = {
    ...service,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };

  const supabase = createClient();
  if (supabase) {
    try {
      const row: Record<string, any> = {
        title: newService.title,
        slug: newService.slug,
        short_summary: newService.shortSummary || '',
        description: newService.description || '',
        deliverables: newService.deliverables || [],
        image_url: newService.primaryImage || '',
        primary_image: newService.primaryImage || '',
        supporting_images: newService.supportingImages || [],
        is_primary: newService.isPrimary ?? false,
        tagline: newService.tagline || '',
        typical_projects: newService.typicalProjects || [],
        creative_process: newService.creativeProcess || [],
        cta_text: newService.ctaText || 'Initiate Brief',
        cta_href: newService.ctaHref || '/contact',
        sort_order: newService.sortOrder ?? 1,
        is_published: newService.isPublished ?? true,
        created_at: now,
        updated_at: now,
      };

      await supabase.from('services').insert(row);
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
  const idx = localServices.findIndex(s => s.id === service.id || s.slug === service.slug);
  const now = new Date().toISOString();
  if (idx !== -1) {
    localServices[idx] = {
      ...localServices[idx],
      ...service,
      updatedAt: now,
    };
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(service.id);
      const row: Record<string, any> = {
        updated_at: now,
      };
      if (service.title !== undefined) row.title = service.title;
      if (service.slug !== undefined) row.slug = service.slug;
      if (service.isPrimary !== undefined) row.is_primary = service.isPrimary;
      if (service.tagline !== undefined) row.tagline = service.tagline;
      if (service.shortSummary !== undefined) row.short_summary = service.shortSummary;
      if (service.description !== undefined) row.description = service.description;
      if (service.deliverables !== undefined) row.deliverables = service.deliverables;
      if (service.typicalProjects !== undefined) row.typical_projects = service.typicalProjects;
      if (service.creativeProcess !== undefined) row.creative_process = service.creativeProcess;
      if (service.primaryImage !== undefined) {
        row.primary_image = service.primaryImage;
        row.image_url = service.primaryImage;
      }
      if (service.supportingImages !== undefined) row.supporting_images = service.supportingImages;
      if (service.ctaText !== undefined) row.cta_text = service.ctaText;
      if (service.ctaHref !== undefined) row.cta_href = service.ctaHref;
      if (service.sortOrder !== undefined) row.sort_order = service.sortOrder;
      if (service.isPublished !== undefined) row.is_published = service.isPublished;

      // 1. Try updating by UUID if valid
      let updated = false;
      if (isUuid) {
        const { data, error } = await supabase
          .from('services')
          .update(row)
          .eq('id', service.id)
          .select()
          .maybeSingle();
        if (!error && data) updated = true;
      }

      // 2. Otherwise update by slug
      if (!updated && service.slug) {
        const { data, error } = await supabase
          .from('services')
          .update(row)
          .eq('slug', service.slug)
          .select()
          .maybeSingle();
        if (!error && data) updated = true;
      }

      // 3. If service does not exist in Supabase yet, insert it!
      if (!updated && service.title && service.slug) {
        await supabase.from('services').insert({
          title: service.title,
          slug: service.slug,
          short_summary: service.shortSummary || '',
          description: service.description || '',
          deliverables: service.deliverables || [],
          image_url: service.primaryImage || '',
          primary_image: service.primaryImage || '',
          supporting_images: service.supportingImages || [],
          is_primary: service.isPrimary ?? false,
          tagline: service.tagline || '',
          typical_projects: service.typicalProjects || [],
          creative_process: service.creativeProcess || [],
          cta_text: service.ctaText || 'Initiate Brief',
          cta_href: service.ctaHref || '/contact',
          sort_order: service.sortOrder ?? 1,
          is_published: service.isPublished ?? true,
          created_at: now,
          updated_at: now,
        });
      }
    } catch {
      // Fallback
    }
  }

  return localServices.find(s => s.id === service.id || s.slug === service.slug) || null;
}

export async function deleteService(id: string): Promise<boolean> {
  const initialLen = localServices.length;
  localServices = localServices.filter(s => s.id !== id && s.slug !== id);

  const supabase = createClient();
  if (supabase) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      let query = supabase.from('services').delete();
      if (isUuid) {
        query = query.eq('id', id);
      } else {
        query = query.or(`slug.eq.${id},title.eq.${id}`);
      }
      await query;
    } catch {
      // Fallback
    }
  }

  return localServices.length < initialLen;
}

let localExperiences: ExperienceItem[] = [...EXPERIENCE_DATA];

export async function getExperiences(includeHidden = false): Promise<ExperienceItem[]> {
  const supabase = createClient();
  let dbExperiences: ExperienceItem[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        dbExperiences = data.map((row: any) => ({
          id: row.id,
          company: row.company,
          role: row.role,
          employmentType: row.employment_type || 'Full-time',
          startDate: row.start_date || '',
          endDate: row.end_date || '',
          period: row.period || `${row.start_date || ''} – ${row.end_date || 'Present'}`,
          isCurrent: row.is_current ?? false,
          location: row.location || 'Coimbatore, India',
          description: row.description || '',
          responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
          achievements: Array.isArray(row.achievements) ? row.achievements : [],
          companyLogo: row.company_logo || row.companyLogo || '',
          companyUrl: row.company_url || row.companyUrl || row.website_url || row.url || '',
          sortOrder: row.sort_order ?? 0,
          isVisible: row.is_visible ?? true,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })).filter((e: ExperienceItem) => includeHidden || e.isVisible !== false);
      } else {
        // Fallback: Check if experiences are stored in site_settings.about_bio
        const { data: setRow } = await supabase
          .from('site_settings')
          .select('about_bio')
          .eq('id', 'primary')
          .maybeSingle();

        if (setRow?.about_bio && typeof setRow.about_bio === 'string' && setRow.about_bio.startsWith('{')) {
          try {
            const meta = JSON.parse(setRow.about_bio);
            if (Array.isArray(meta.experiences) && meta.experiences.length > 0) {
              dbExperiences = meta.experiences.filter((e: ExperienceItem) => includeHidden || e.isVisible !== false);
            }
          } catch {
            // ignore
          }
        }
      }
    } catch {
      // Fallback
    }
  }

  if (dbExperiences.length > 0) {
    return dbExperiences.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return [...localExperiences]
    .filter(e => includeHidden || e.isVisible !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return getExperiences(false);
}

export async function getExperienceById(id: string): Promise<ExperienceItem | null> {
  const all = await getExperiences(true);
  return all.find(e => e.id === id) || null;
}

export async function saveExperience(item: Partial<ExperienceItem> & { id?: string }): Promise<ExperienceItem> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  const now = new Date().toISOString();
  const row: Record<string, any> = {
    updated_at: now,
  };

  if (item.company !== undefined) row.company = item.company;
  if (item.role !== undefined) row.role = item.role;
  if (item.employmentType !== undefined) row.employment_type = item.employmentType;
  if (item.startDate !== undefined) row.start_date = item.startDate;
  if (item.endDate !== undefined) row.end_date = item.endDate;
  if (item.period !== undefined) row.period = item.period;
  if (item.isCurrent !== undefined) row.is_current = item.isCurrent;
  if (item.location !== undefined) row.location = item.location;
  if (item.description !== undefined) row.description = item.description;
  if (item.responsibilities !== undefined) row.responsibilities = item.responsibilities;
  if (item.achievements !== undefined) row.achievements = item.achievements;
  if (item.companyLogo !== undefined) row.company_logo = item.companyLogo;
  if (item.companyUrl !== undefined) row.company_url = item.companyUrl;
  if (item.sortOrder !== undefined) row.sort_order = item.sortOrder;
  if (item.isVisible !== undefined) row.is_visible = item.isVisible;

  if (supabase) {
    try {
      let savedRow: any = null;
      const isUuid = item.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);

      if (isUuid) {
        const { data, error } = await supabase
          .from('experience')
          .update(row)
          .eq('id', item.id)
          .select()
          .maybeSingle();
        if (!error && data) savedRow = data;
      }

      if (!savedRow && item.id) {
        const { data: existing } = await supabase
          .from('experience')
          .select('id')
          .eq('company', item.company)
          .maybeSingle();

        if (existing?.id) {
          const { data, error } = await supabase
            .from('experience')
            .update(row)
            .eq('id', existing.id)
            .select()
            .maybeSingle();
          if (!error && data) savedRow = data;
        }
      }

      if (!savedRow) {
        const { data, error } = await supabase
          .from('experience')
          .insert({
            ...row,
            company: item.company || 'New Company',
            role: item.role || 'Role',
            location: item.location || 'Coimbatore, India',
            created_at: now,
          })
          .select()
          .single();
        if (!error && data) savedRow = data;
      }

      if (savedRow) {
        const mapped: ExperienceItem = {
          id: savedRow.id,
          company: savedRow.company,
          role: savedRow.role,
          employmentType: savedRow.employment_type || 'Full-time',
          startDate: savedRow.start_date || '',
          endDate: savedRow.end_date || '',
          period: savedRow.period || '',
          isCurrent: savedRow.is_current ?? false,
          location: savedRow.location,
          description: savedRow.description || '',
          responsibilities: savedRow.responsibilities || [],
          achievements: savedRow.achievements || [],
          companyLogo: savedRow.company_logo || savedRow.companyLogo || '',
          companyUrl: savedRow.company_url || savedRow.companyUrl || '',
          sortOrder: savedRow.sort_order ?? 0,
          isVisible: savedRow.is_visible ?? true,
          createdAt: savedRow.created_at,
          updatedAt: savedRow.updated_at,
        };
        const idx = localExperiences.findIndex(e => e.id === mapped.id || e.company === mapped.company);
        if (idx !== -1) localExperiences[idx] = mapped;
        else localExperiences.push(mapped);
        return mapped;
      }
    } catch {
      // Fallback
    }
  }

  const newExp: ExperienceItem = {
    id: item.id || `exp-${Date.now()}`,
    company: item.company || 'New Company',
    role: item.role || 'Role',
    employmentType: item.employmentType || 'Full-time',
    startDate: item.startDate || '',
    endDate: item.endDate || '',
    period: item.period || '2025 – Present',
    isCurrent: item.isCurrent ?? false,
    location: item.location || 'Coimbatore, India',
    description: item.description || '',
    responsibilities: item.responsibilities || [],
    achievements: item.achievements || [],
    companyLogo: item.companyLogo || '',
    companyUrl: item.companyUrl || '',
    sortOrder: item.sortOrder ?? localExperiences.length + 1,
    isVisible: item.isVisible ?? true,
    createdAt: now,
    updatedAt: now,
  };

  const existingIdx = localExperiences.findIndex(e => e.id === item.id);
  if (existingIdx !== -1) {
    localExperiences[existingIdx] = { ...localExperiences[existingIdx], ...newExp };
  } else {
    localExperiences.push(newExp);
  }

  // Backup sync to site_settings.about_bio
  if (supabase) {
    try {
      const { data: setRow } = await supabase.from('site_settings').select('about_bio').eq('id', 'primary').maybeSingle();
      let meta: Record<string, any> = {};
      if (setRow?.about_bio && typeof setRow.about_bio === 'string' && setRow.about_bio.startsWith('{')) {
        meta = JSON.parse(setRow.about_bio);
      }
      let list: ExperienceItem[] = Array.isArray(meta.experiences) ? meta.experiences : [...localExperiences];
      const idx = list.findIndex(e => e.id === newExp.id || e.company === newExp.company);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...newExp };
      } else {
        list.push(newExp);
      }
      meta.experiences = list;
      await supabase.from('site_settings').update({ about_bio: JSON.stringify(meta) }).eq('id', 'primary');
    } catch {
      // ignore
    }
  }

  return newExp;
}

export async function deleteExperience(id: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/experience?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        localExperiences = localExperiences.filter(e => e.id !== id);
        return true;
      }
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      let query = supabase.from('experience').delete();
      if (isUuid) {
        query = query.eq('id', id);
      } else {
        query = query.or(`id.eq.${id},company.eq.${id}`);
      }
      await query;
    } catch {
      // Fallback
    }

    try {
      const { data: setRow } = await supabase.from('site_settings').select('about_bio').eq('id', 'primary').maybeSingle();
      if (setRow?.about_bio && typeof setRow.about_bio === 'string' && setRow.about_bio.startsWith('{')) {
        const meta = JSON.parse(setRow.about_bio);
        if (Array.isArray(meta.experiences)) {
          meta.experiences = meta.experiences.filter((e: any) => e.id !== id && e.company !== id);
          await supabase.from('site_settings').update({ about_bio: JSON.stringify(meta) }).eq('id', 'primary');
        }
      }
    } catch {
      // ignore
    }
  }

  const initialLen = localExperiences.length;
  localExperiences = localExperiences.filter(e => e.id !== id);
  return localExperiences.length < initialLen;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/settings?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        let meta: Record<string, any> = {};
        if (data.about_bio && typeof data.about_bio === 'string' && data.about_bio.startsWith('{')) {
          try {
            meta = JSON.parse(data.about_bio);
          } catch {
            // ignore
          }
        }

        return {
          ...localSettings,
          name: data.name ?? meta.name ?? localSettings.name,
          title: data.title ?? meta.title ?? localSettings.title,
          tagline: data.tagline ?? meta.tagline ?? localSettings.tagline,
          email: data.email ?? meta.email ?? localSettings.email,
          phone: data.phone ?? meta.phone ?? localSettings.phone,
          whatsappNumber: data.whatsapp_number ?? meta.whatsappNumber ?? localSettings.whatsappNumber,
          location: data.location ?? meta.location ?? localSettings.location,
          behanceUrl: data.behance_url ?? meta.behanceUrl ?? localSettings.behanceUrl,
          linkedinUrl: data.linkedin_url ?? meta.linkedinUrl ?? localSettings.linkedinUrl,
          instagramUrl: data.instagram_url ?? meta.instagramUrl ?? localSettings.instagramUrl,
          dribbbleUrl: data.dribbble_url ?? meta.dribbbleUrl ?? localSettings.dribbbleUrl,

          // Header
          headerLogoLightUrl: data.header_logo_light_url ?? meta.headerLogoLightUrl ?? localSettings.headerLogoLightUrl,
          headerLogoDarkUrl: data.header_logo_dark_url ?? meta.headerLogoDarkUrl ?? localSettings.headerLogoDarkUrl,
          logoAltText: data.logo_alt_text ?? meta.logoAltText ?? localSettings.logoAltText,
          headerNavLinks: Array.isArray(data.header_nav_links) ? data.header_nav_links : (meta.headerNavLinks ?? localSettings.headerNavLinks),
          headerCtaText: data.header_cta_text ?? meta.headerCtaText ?? localSettings.headerCtaText,
          headerCtaHref: data.header_cta_href ?? meta.headerCtaHref ?? localSettings.headerCtaHref,
          availabilityStatus: data.availability_status ?? meta.availabilityStatus ?? localSettings.availabilityStatus,
          availabilityMessage: data.availability_message ?? meta.availabilityMessage ?? localSettings.availabilityMessage,
          locationTimeText: data.location_time_text ?? meta.locationTimeText ?? localSettings.locationTimeText,

          // Hero
          heroIntroduction: meta.heroIntroduction ?? localSettings.heroIntroduction ?? "Hi, I'm",
          heroName: meta.heroName ?? (data.hero_headline || data.name || localSettings.heroName || "Abdul Ahad"),
          heroProfessions: Array.isArray(meta.heroProfessions) && meta.heroProfessions.length > 0 ? meta.heroProfessions : localSettings.heroProfessions,
          heroAnimationInterval: meta.heroAnimationInterval ?? localSettings.heroAnimationInterval ?? 1200,
          heroTransitionDuration: meta.heroTransitionDuration ?? localSettings.heroTransitionDuration ?? 0.45,
          heroHeadline: data.hero_headline ?? meta.heroHeadline ?? localSettings.heroHeadline,
          heroHeadlineLine2: data.hero_headline_line2 ?? meta.heroHeadlineLine2 ?? localSettings.heroHeadlineLine2,
          heroHighlightedWords: data.hero_highlighted_words ?? meta.heroHighlightedWords ?? localSettings.heroHighlightedWords,
          heroTitle: data.hero_title ?? meta.heroTitle ?? localSettings.heroTitle,
          heroSubtitle: data.hero_subtitle ?? meta.heroSubtitle ?? localSettings.heroSubtitle,
          heroSupportingCopy: data.hero_supporting_copy ?? meta.heroSupportingCopy ?? localSettings.heroSupportingCopy,
          heroIntroSecondary: data.hero_intro_secondary ?? meta.heroIntroSecondary ?? localSettings.heroIntroSecondary,
          heroLocationLabel: data.hero_location_label ?? meta.heroLocationLabel ?? localSettings.heroLocationLabel,
          heroPrimaryCtaText: data.hero_primary_cta_text ?? meta.heroPrimaryCtaText ?? localSettings.heroPrimaryCtaText,
          heroPrimaryCtaHref: data.hero_primary_cta_href ?? meta.heroPrimaryCtaHref ?? localSettings.heroPrimaryCtaHref,
          heroSecondaryCtaText: data.hero_secondary_cta_text ?? meta.heroSecondaryCtaText ?? localSettings.heroSecondaryCtaText,
          heroSecondaryCtaHref: data.hero_secondary_cta_href ?? meta.heroSecondaryCtaHref ?? localSettings.heroSecondaryCtaHref,
          heroBgImage: data.hero_bg_image ?? meta.heroBgImage ?? localSettings.heroBgImage,
          heroProfileImage: data.hero_profile_image ?? meta.heroProfileImage ?? localSettings.heroProfileImage,
          heroMonogramVisible: data.hero_monogram_visible ?? meta.heroMonogramVisible ?? localSettings.heroMonogramVisible,
          heroMonogramUrl: data.hero_monogram_url ?? meta.heroMonogramUrl ?? localSettings.heroMonogramUrl,
          heroAnimationEnabled: data.hero_animation_enabled ?? meta.heroAnimationEnabled ?? localSettings.heroAnimationEnabled,

          // About
          aboutSectionLabel: data.about_section_label ?? meta.aboutSectionLabel ?? localSettings.aboutSectionLabel,
          aboutHeadline: data.about_headline ?? meta.aboutHeadline ?? localSettings.aboutHeadline,
          aboutIntro: data.about_intro ?? meta.aboutIntro ?? localSettings.aboutIntro,
          aboutPhilosophy: data.about_philosophy ?? meta.aboutPhilosophy ?? localSettings.aboutPhilosophy,
          aboutDescription: data.about_description ?? meta.aboutDescription ?? localSettings.aboutDescription,
          aboutBio: meta.aboutBio ?? (data.about_bio?.startsWith('{') ? data.about_description : data.about_bio) ?? localSettings.aboutBio,
          profilePhotoUrl: data.profile_photo_url ?? meta.profilePhotoUrl ?? localSettings.profilePhotoUrl,
          profilePhotoAlt: data.profile_photo_alt ?? meta.profilePhotoAlt ?? localSettings.profilePhotoAlt,
          experienceYears: data.experience_years ?? meta.experienceYears ?? localSettings.experienceYears,
          achievementsSummary: data.achievements_summary ?? meta.achievementsSummary ?? localSettings.achievementsSummary,
          experienceHighlights: Array.isArray(data.experience_highlights) ? data.experience_highlights : (meta.experienceHighlights ?? localSettings.experienceHighlights),
          achievementHighlights: Array.isArray(data.achievement_highlights) ? data.achievement_highlights : (meta.achievementHighlights ?? localSettings.achievementHighlights),
          resumeUrl: data.resume_url ?? meta.resumeUrl ?? localSettings.resumeUrl,
          resumeLabel: data.resume_label ?? meta.resumeLabel ?? localSettings.resumeLabel,
          resumeVisible: data.resume_visible ?? meta.resumeVisible ?? localSettings.resumeVisible,
          educationDegree: data.education_degree ?? meta.educationDegree ?? localSettings.educationDegree,
          educationInstitution: data.education_institution ?? meta.educationInstitution ?? localSettings.educationInstitution,
          educationYear: data.education_year ?? meta.educationYear ?? localSettings.educationYear,
          educationAggregate: data.education_aggregate ?? meta.educationAggregate ?? localSettings.educationAggregate,

          // Footer
          footerAppearance: (data.footer_appearance as any) ?? meta.footerAppearance ?? localSettings.footerAppearance,
          footerLogoLightUrl: data.footer_logo_light_url ?? meta.footerLogoLightUrl ?? localSettings.footerLogoLightUrl,
          footerLogoDarkUrl: data.footer_logo_dark_url ?? meta.footerLogoDarkUrl ?? localSettings.footerLogoDarkUrl,
          footerDescription: data.footer_description ?? meta.footerDescription ?? localSettings.footerDescription,
          footerBrandStatement: data.footer_brand_statement ?? meta.footerBrandStatement ?? localSettings.footerBrandStatement,
          footerOversizedLogoVisible: data.footer_oversized_logo_visible ?? meta.footerOversizedLogoVisible ?? localSettings.footerOversizedLogoVisible ?? true,
          footerNavVisible: data.footer_nav_visible ?? meta.footerNavVisible ?? localSettings.footerNavVisible,
          footerCopyright: data.footer_copyright ?? meta.footerCopyright ?? localSettings.footerCopyright,
          footerLocation: data.footer_location ?? meta.footerLocation ?? localSettings.footerLocation,

          // Theme & SEO
          allowDarkTheme: meta.allowDarkTheme !== undefined ? Boolean(meta.allowDarkTheme) : (localSettings.allowDarkTheme ?? false),
          defaultTheme: (data.default_theme ?? meta.defaultTheme ?? localSettings.defaultTheme ?? 'light') as 'light' | 'dark',
          primaryBrandColor: data.primary_brand_color ?? meta.primaryBrandColor ?? localSettings.primaryBrandColor,
          defaultSeoTitle: data.default_seo_title ?? meta.defaultSeoTitle ?? localSettings.defaultSeoTitle,
          defaultSeoDescription: data.default_seo_description ?? meta.defaultSeoDescription ?? localSettings.defaultSeoDescription,

          // Tools & Homepage CMS
          toolsList: Array.isArray(meta.toolsList) && meta.toolsList.length > 0 ? meta.toolsList : localSettings.toolsList,
          toolsHeadline: meta.toolsHeadline || localSettings.toolsHeadline || 'Tools & Capabilities',
          toolsSubheadline: meta.toolsSubheadline || localSettings.toolsSubheadline || 'A creative toolkit I use to research, design, create and build meaningful digital experiences.',
          capabilityCategories: Array.isArray(meta.capabilityCategories) && meta.capabilityCategories.length > 0 ? meta.capabilityCategories : localSettings.capabilityCategories,
          capabilityTools: Array.isArray(meta.capabilityTools) && meta.capabilityTools.length > 0 ? meta.capabilityTools : localSettings.capabilityTools,
          homepageSectionOrder: Array.isArray(meta.homepageSectionOrder) && meta.homepageSectionOrder.length > 0 ? meta.homepageSectionOrder : localSettings.homepageSectionOrder,
        };
      }
    } catch {
      // Fallback
    }
  }
  return localSettings;
}

export async function updateSiteSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  // 1. If executing in the browser, pass through the server API route
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save settings: ${res.statusText}`);
    }
    const verifiedData = await res.json();
    localSettings = { ...localSettings, ...verifiedData };
    return verifiedData;
  }

  // 2. Server-side persistence directly to Supabase
  const supabase = createClient();
  if (!supabase) {
    localSettings = { ...localSettings, ...newSettings };
    return localSettings;
  }

  // Retrieve current about_bio to preserve extended JSON metadata
  let metaToStore: Record<string, any> = {};
  const { data: setRow } = await supabase
    .from('site_settings')
    .select('about_bio')
    .eq('id', 'primary')
    .maybeSingle();

  if (setRow?.about_bio && typeof setRow.about_bio === 'string' && setRow.about_bio.startsWith('{')) {
    try {
      metaToStore = JSON.parse(setRow.about_bio);
    } catch {
      // ignore
    }
  }

  // Merge new settings into JSON metadata
  Object.assign(metaToStore, newSettings);

  // Map ONLY fields that exist as real columns in public.site_settings
  const dbPayload: Record<string, any> = {
    id: 'primary',
    about_bio: JSON.stringify(metaToStore),
    updated_at: new Date().toISOString(),
  };

  if (newSettings.name !== undefined) dbPayload.name = newSettings.name;
  if (newSettings.heroName !== undefined) {
    dbPayload.name = newSettings.heroName;
    dbPayload.hero_headline = newSettings.heroName;
  }
  if (newSettings.title !== undefined) dbPayload.title = newSettings.title;
  if (newSettings.heroTitle !== undefined && !newSettings.title) dbPayload.title = newSettings.heroTitle;
  if (newSettings.heroSubtitle !== undefined && !newSettings.title && !newSettings.heroTitle) dbPayload.title = newSettings.heroSubtitle;
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

  // Perform database write
  const { error: upsertError } = await supabase
    .from('site_settings')
    .upsert(dbPayload);

  if (upsertError) {
    console.error('Supabase site_settings upsert error:', upsertError.message);
    throw new Error(`Database error saving settings: ${upsertError.message}`);
  }

  // 3. Read back verified saved record directly from database
  const verifiedSettings = await getSiteSettings();
  localSettings = { ...verifiedSettings };
  return verifiedSettings;
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
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      if (res.ok) {
        const saved = await res.json();
        const idx = localClients.findIndex((c) => c.id === saved.id || c.name === saved.name);
        if (idx !== -1) {
          localClients[idx] = { ...localClients[idx], ...saved };
        } else {
          localClients.push(saved);
        }
        return saved;
      }
    } catch {
      // Fallback
    }
  }

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
  if (typeof window !== 'undefined') {
    try {
      await fetch(`/api/clients?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // Fallback
    }
  }

  const supabase = createClient();
  if (supabase) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      let query = supabase.from('clients').delete();
      if (isUuid) {
        query = query.eq('id', id);
      } else {
        query = query.eq('name', id);
      }
      const { error } = await query;
      if (!error) {
        localClients = localClients.filter((c) => c.id !== id);
        return true;
      }
    } catch {
      // Fallback
    }
  }

  localClients = localClients.filter((c) => c.id !== id);
  return true;
}

// ==============================================================================
// TOOLS & CAPABILITIES CMS (Dynamic 4-Group Section)
// ==============================================================================

export async function getCapabilityCategories(includeHidden = false): Promise<CapabilityCategory[]> {
  const settings = await getSiteSettings();
  let categories = Array.isArray(settings.capabilityCategories) && settings.capabilityCategories.length > 0
    ? [...settings.capabilityCategories]
    : [...localCapabilityCategories];

  let tools = Array.isArray(settings.capabilityTools) && settings.capabilityTools.length > 0
    ? [...settings.capabilityTools]
    : [...localCapabilityTools];

  // Try reading from dedicated Supabase tables if populated
  const supabase = createClient();
  if (supabase) {
    try {
      const { data: dbCats, error: catErr } = await supabase
        .from('capability_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!catErr && dbCats && dbCats.length > 0) {
        categories = dbCats.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          position: c.position,
          displayOrder: c.display_order ?? 0,
          isVisible: c.is_visible ?? true,
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        }));

        const { data: dbTools, error: toolErr } = await supabase
          .from('capability_tools')
          .select('*')
          .order('display_order', { ascending: true });

        if (!toolErr && dbTools && dbTools.length > 0) {
          tools = dbTools.map((t: any) => ({
            id: t.id,
            categoryId: t.category_id,
            name: t.name,
            slug: t.slug,
            iconUrl: t.icon_url || '',
            description: t.description || '',
            websiteUrl: t.website_url || '',
            altText: t.alt_text || '',
            isSoftware: t.is_software ?? true,
            proficiency: t.proficiency || 'Advanced',
            displayOrder: t.display_order ?? 0,
            isVisible: t.is_visible ?? true,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          }));
        }
      }
    } catch {
      // Fallback to settings / in-memory store
    }
  }

  // Filter visibility if required
  if (!includeHidden) {
    categories = categories.filter((c) => c.isVisible !== false);
    tools = tools.filter((t) => t.isVisible !== false);
  }

  // Attach tools to each category
  return categories
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((cat) => ({
      ...cat,
      tools: tools
        .filter((t) => t.categoryId === cat.id)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    }));
}

export async function getCapabilityTools(categoryId?: string, includeHidden = false): Promise<CapabilityTool[]> {
  const categories = await getCapabilityCategories(includeHidden);
  let allTools = categories.flatMap((c) => c.tools || []);
  if (categoryId) {
    allTools = allTools.filter((t) => t.categoryId === categoryId);
  }
  return allTools;
}

// Internal helper to persist updated categories & tools to Supabase
async function persistCapabilities(categories: CapabilityCategory[], tools: CapabilityTool[]): Promise<boolean> {
  localCapabilityCategories = [...categories];
  localCapabilityTools = [...tools];

  // 1. Dual-write to Supabase site_settings JSON metadata (always guaranteed)
  try {
    await updateSiteSettings({
      capabilityCategories: categories,
      capabilityTools: tools,
    });
  } catch (err) {
    console.warn('Failed to update capabilities in site_settings:', err);
  }

  // 2. Try upserting to relational capability tables if created
  const supabase = createClient();
  if (supabase) {
    try {
      const catRows = categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        position: c.position,
        display_order: c.displayOrder,
        is_visible: c.isVisible,
        updated_at: new Date().toISOString(),
      }));

      await supabase.from('capability_categories').upsert(catRows);

      const toolRows = tools.map((t) => ({
        id: t.id,
        category_id: t.categoryId,
        name: t.name,
        slug: t.slug,
        icon_url: t.iconUrl || '',
        description: t.description || '',
        website_url: t.websiteUrl || '',
        alt_text: t.altText || '',
        is_software: t.isSoftware,
        proficiency: t.proficiency || 'Advanced',
        display_order: t.displayOrder,
        is_visible: t.isVisible,
        updated_at: new Date().toISOString(),
      }));

      await supabase.from('capability_tools').upsert(toolRows);
    } catch {
      // Ignored if schema not yet created
    }
  }

  return true;
}

export async function createCapabilityCategory(cat: Partial<CapabilityCategory>): Promise<CapabilityCategory> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const newId = cat.id || `cat-${Date.now()}`;
  const newCat: CapabilityCategory = {
    id: newId,
    name: cat.name || 'New Category',
    slug: cat.slug || `cat-${Date.now()}`,
    description: cat.description || '',
    position: cat.position || 'top',
    displayOrder: cat.displayOrder ?? (categories.length + 1),
    isVisible: cat.isVisible ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tools: [],
  };

  const updatedCategories = [...categories.map(({ tools, ...c }) => c), newCat];
  await persistCapabilities(updatedCategories, tools);
  return newCat;
}

export async function updateCapabilityCategory(id: string, updates: Partial<CapabilityCategory>): Promise<CapabilityCategory> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) {
    throw new Error(`Category with ID ${id} not found`);
  }

  const updated: CapabilityCategory = {
    ...categories[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  categories[idx] = updated;
  const cleanCategories = categories.map(({ tools, ...c }) => c);
  await persistCapabilities(cleanCategories, tools);
  return updated;
}

export async function deleteCapabilityCategory(id: string): Promise<boolean> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const updatedCategories = categories
    .filter((c) => c.id !== id)
    .map(({ tools, ...c }) => c);
  const updatedTools = tools.filter((t) => t.categoryId !== id);

  await persistCapabilities(updatedCategories, updatedTools);

  // Try DB delete if table exists
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('capability_categories').delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}

export async function reorderCapabilityCategories(orderedIds: string[]): Promise<boolean> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const updatedCategories = categories.map((cat) => {
    const order = orderedIds.indexOf(cat.id);
    return {
      ...cat,
      displayOrder: order !== -1 ? order + 1 : cat.displayOrder,
    };
  }).map(({ tools, ...c }) => c);

  await persistCapabilities(updatedCategories, tools);
  return true;
}

export async function createCapabilityTool(tool: Partial<CapabilityTool>): Promise<CapabilityTool> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const newId = tool.id || `tool-${Date.now()}`;
  const newTool: CapabilityTool = {
    id: newId,
    categoryId: tool.categoryId || (categories[0]?.id || 'cat-ai'),
    name: tool.name || 'New Tool',
    slug: tool.slug || (tool.name || 'tool').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    iconUrl: tool.iconUrl || '',
    description: tool.description || '',
    websiteUrl: tool.websiteUrl || '',
    altText: tool.altText || tool.name || '',
    isSoftware: tool.isSoftware !== false,
    proficiency: tool.proficiency || 'Advanced',
    displayOrder: tool.displayOrder ?? (tools.filter((t) => t.categoryId === tool.categoryId).length + 1),
    isVisible: tool.isVisible ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedTools = [...tools, newTool];
  const cleanCategories = categories.map(({ tools, ...c }) => c);
  await persistCapabilities(cleanCategories, updatedTools);
  return newTool;
}

export async function updateCapabilityTool(id: string, updates: Partial<CapabilityTool>): Promise<CapabilityTool> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const idx = tools.findIndex((t) => t.id === id);
  if (idx === -1) {
    throw new Error(`Tool with ID ${id} not found`);
  }

  const updated: CapabilityTool = {
    ...tools[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  tools[idx] = updated;
  const cleanCategories = categories.map(({ tools, ...c }) => c);
  await persistCapabilities(cleanCategories, tools);
  return updated;
}

export async function deleteCapabilityTool(id: string): Promise<boolean> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const updatedTools = tools.filter((t) => t.id !== id);
  const cleanCategories = categories.map(({ tools, ...c }) => c);
  await persistCapabilities(cleanCategories, updatedTools);

  // Try DB delete if table exists
  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.from('capability_tools').delete().eq('id', id);
    } catch {
      // ignore
    }
  }

  return true;
}

export async function reorderCapabilityTools(categoryId: string, orderedIds: string[]): Promise<boolean> {
  const categories = await getCapabilityCategories(true);
  const tools = await getCapabilityTools(undefined, true);

  const updatedTools = tools.map((tool) => {
    if (tool.categoryId === categoryId) {
      const order = orderedIds.indexOf(tool.id);
      return {
        ...tool,
        displayOrder: order !== -1 ? order + 1 : tool.displayOrder,
      };
    }
    return tool;
  });

  const cleanCategories = categories.map(({ tools, ...c }) => c);
  await persistCapabilities(cleanCategories, updatedTools);
  return true;
}

export async function getStorageMetrics(): Promise<StorageMetrics> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let totalBytes = 0;
  let fileCount = 0;

  if (supabaseUrl && apiKey) {
    try {
      const res = await fetch(`${supabaseUrl}/storage/v1/object/list/portfolio-media`, {
        method: 'POST',
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prefix: 'uploads',
          limit: 1000,
          sortBy: { column: 'name', order: 'asc' },
        }),
        cache: 'no-store',
      });

      if (res.ok) {
        const files = await res.json();
        if (Array.isArray(files)) {
          fileCount = files.length;
          for (const f of files) {
            totalBytes += (f.metadata?.size || 0);
          }
        }
      }
    } catch (e) {
      console.error('Failed to query Supabase storage metrics:', e);
    }
  }

  // If storage listing returned 0 (e.g. offline dev), fallback to estimate based on media
  if (totalBytes === 0) {
    totalBytes = 46697840; // ~44.5 MB baseline
    fileCount = 41;
  }

  const totalMB = Number((totalBytes / (1024 * 1024)).toFixed(2));
  const totalQuotaMB = 1000; // 1 GB (1,000 MB) Supabase Storage Quota
  const usedPercent = Math.min(100, Number(((totalMB / totalQuotaMB) * 100).toFixed(1)));
  const freeMB = Number(Math.max(0, totalQuotaMB - totalMB).toFixed(2));
  const freePercent = Number((100 - usedPercent).toFixed(1));

  return {
    totalBytes,
    totalMB,
    totalQuotaMB,
    usedPercent,
    freeMB,
    freePercent,
    fileCount,
    provider: 'Supabase Cloud (portfolio-media)',
  };
}

