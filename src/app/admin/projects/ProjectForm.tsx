'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Plus, 
  Trash2, 
  ExternalLink,
  Eye, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Project, ProjectCategory } from '@/lib/types';
import { saveProject } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const CATEGORIES = [
  { value: 'Branding', label: 'Branding' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'UI/UX', label: 'UI/UX' },
  { value: 'Motion Graphics', label: 'Motion Graphics' },
  { value: 'Video Editing', label: 'Video Editing' },
  { value: 'Web & App', label: 'Web & App' },
  { value: 'Packaging & Print', label: 'Packaging & Print' },
];

interface ProjectFormProps {
  initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Project>>({
    id: initialData?.id,
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Graphic Design',
    categorySlug: initialData?.categorySlug || 'graphic-design',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    clientName: initialData?.clientName || '',
    projectYear: initialData?.projectYear || new Date().getFullYear().toString(),
    role: initialData?.role || 'Graphic Designer',
    toolsUsed: initialData?.toolsUsed || ['Adobe Illustrator', 'Photoshop'],
    challenge: initialData?.challenge || '',
    creativeProcess: initialData?.creativeProcess || '',
    solution: initialData?.solution || '',
    results: initialData?.results || [],
    coverImage: initialData?.coverImage || '/projects/reztro/reztro-cover.svg',
    gallery: initialData?.gallery || ['/projects/reztro/reztro-cover.svg'],
    videoUrl: initialData?.videoUrl || '',
    isFeatured: initialData?.isFeatured ?? false,
    isPublished: initialData?.isPublished ?? true,
    sortOrder: initialData?.sortOrder ?? 1,
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const [toolsString, setToolsString] = useState(
    formData.toolsUsed?.join(', ') || ''
  );
  const [resultsString, setResultsString] = useState(
    formData.results?.join('\n') || ''
  );
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    formData.gallery || []
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if it was empty or matches old slug
      slug: prev.slug === slugify(prev.title || '') || !prev.slug ? slugify(val) : prev.slug,
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch {
      alert('Upload failed. Please check file format.');
    } finally {
      setIsUploading(false);
    }
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    const updated = [...galleryUrls, newGalleryUrl.trim()];
    setGalleryUrls(updated);
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (idx: number) => {
    const updated = galleryUrls.filter((_, i) => i !== idx);
    setGalleryUrls(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      setErrorMsg('Project title and slug are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload: Partial<Project> = {
        ...formData,
        categorySlug: slugify(formData.category || 'graphic-design'),
        toolsUsed: toolsString
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        results: resultsString
          .split('\n')
          .map((r) => r.trim())
          .filter(Boolean),
        gallery: galleryUrls,
      };

      await saveProject(payload);
      router.push('/admin/projects');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 border border-charcoal/20 hover:border-copper transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-charcoal" />
          </button>
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-0.5">
              Project CMS Editor
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              {initialData ? `Edit: ${initialData.title}` : 'Create New Project'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formData.slug && (
            <a
              href={`/work/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-charcoal/20 text-xs font-sans font-bold uppercase tracking-wider text-charcoal hover:border-copper"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </a>
          )}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            icon={<Save className="w-4 h-4" />}
          >
            Save Project
          </Button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-700 text-xs font-sans flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Basic Metadata */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              1. Project Core Details
            </h2>

            <div className="space-y-4">
              <Input
                label="Project Title"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Reztro — Digital Table Ordering System"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="URL Slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  helperText="Unique URL path: /work/[slug]"
                />

                <Select
                  label="Primary Category"
                  options={CATEGORIES}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as ProjectCategory,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Client Name"
                  placeholder="e.g. eClerx / Freelance Client"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
                <Input
                  label="Year"
                  value={formData.projectYear}
                  onChange={(e) => setFormData({ ...formData, projectYear: e.target.value })}
                />
                <Input
                  label="Your Role"
                  placeholder="e.g. Lead Brand & UI Designer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <Input
                label="Tools Used (comma-separated)"
                placeholder="Figma, Adobe Illustrator, After Effects, Photoshop"
                value={toolsString}
                onChange={(e) => setToolsString(e.target.value)}
              />
            </div>
          </div>

          {/* Section: Written Case Study */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              2. Case Study Narrative
            </h2>

            <div className="space-y-4">
              <Textarea
                label="Short Description (Card Summary)"
                required
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="A concise 1-2 sentence overview for cards and meta descriptions."
              />

              <Textarea
                label="Full Project Overview"
                required
                rows={4}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed context and objectives of the project."
              />

              <Textarea
                label="The Challenge / Problem Statement"
                rows={3}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What bottlenecks, friction points, or business hurdles were we solving?"
              />

              <Textarea
                label="Creative Process & Strategy"
                rows={3}
                value={formData.creativeProcess}
                onChange={(e) => setFormData({ ...formData, creativeProcess: e.target.value })}
                placeholder="Discovery, sketches, wireframing, typography, color iterations..."
              />

              <Textarea
                label="Execution & Final Solution"
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="The delivered brand system, UI components, packaging artwork..."
              />

              <Textarea
                label="Measurable Results & Outcomes (One per line)"
                rows={4}
                value={resultsString}
                onChange={(e) => setResultsString(e.target.value)}
                placeholder="40% reduction in order processing delays&#10;92% first-session completion rate&#10;Standardized brand visual guidelines"
              />
            </div>
          </div>

          {/* Section: Visual Media Management */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              3. Visual Assets & Media Gallery
            </h2>

            <div className="space-y-6">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                  Project Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="relative w-48 aspect-[16/10] bg-charcoal border border-charcoal/20 overflow-hidden shrink-0">
                    {formData.coverImage ? (
                      <Image
                        src={formData.coverImage}
                        alt="Cover Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-charcoal-400">
                        No Cover
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-ivory-50 border border-charcoal/20 text-xs font-sans"
                      placeholder="Image URL or upload below"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal text-ivory text-xs font-sans font-semibold cursor-pointer hover:bg-copper transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload New Cover File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Gallery URLs */}
              <div className="pt-4 border-t border-charcoal/10 space-y-3">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-700">
                  Project Gallery Images
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 bg-ivory-50 border border-charcoal/20 text-xs font-sans"
                    placeholder="Enter image URL to add to gallery..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="px-4 py-2 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider"
                  >
                    Add URL
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {galleryUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[16/10] bg-charcoal border border-charcoal/20 group overflow-hidden"
                    >
                      <Image src={url} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div className="pt-4 border-t border-charcoal/10">
                <Input
                  label="Video Embed URL (Optional)"
                  placeholder="https://www.youtube.com/embed/... or Vimeo link"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Publishing Controls & SEO */}
        <div className="lg:col-span-4 space-y-8">
          {/* Publishing Settings */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <h3 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              Publishing Status
            </h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-copper rounded-none focus:ring-copper"
                />
                <div>
                  <span className="text-xs font-sans font-bold text-charcoal block">
                    Published on Website
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-sans">
                    Visible to public visitors
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-copper rounded-none focus:ring-copper"
                />
                <div>
                  <span className="text-xs font-sans font-bold text-charcoal block">
                    Featured Project
                  </span>
                  <span className="text-[11px] text-charcoal-400 font-sans">
                    Highlighted on homepage & top banners
                  </span>
                </div>
              </label>

              <Input
                label="Sort Order Priority"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                helperText="Lower numbers appear first"
              />
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <h3 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              Search Engine Optimization
            </h3>

            <div className="space-y-4">
              <Input
                label="SEO Meta Title"
                placeholder="Custom title tag..."
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              />

              <Textarea
                label="SEO Meta Description"
                rows={3}
                placeholder="Google search summary..."
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              />
            </div>
          </div>

          {/* Final Submit Block */}
          <div className="p-6 bg-charcoal text-ivory space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              Save Project Changes
            </Button>
            <p className="text-[11px] font-sans text-charcoal-400 text-center">
              Changes update immediately in portfolio feeds.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
