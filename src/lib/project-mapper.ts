import { Project, ProjectCategory } from './types';

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function mapRowToProject(row: any): Project {
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

export function mapProjectToRow(project: Partial<Project>): Record<string, any> {
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
  row.project_year = project.projectYear || new Date().getFullYear().toString();
  row.role = project.role || 'Creative Designer';
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
