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
import { Project, ProjectCategory, ProjectCaseStudySection } from '@/lib/types';
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

function getInitialSections(data?: Project): ProjectCaseStudySection[] {
  if (data?.sections && data.sections.length > 0) {
    return [...data.sections];
  }
  const list: ProjectCaseStudySection[] = [];
  if (data?.fullDescription) {
    list.push({ id: 'sec-overview', heading: 'Project Overview', body: data.fullDescription });
  }
  if (data?.challenge) {
    list.push({ id: 'sec-challenge', heading: 'The Challenge', body: data.challenge });
  }
  if (data?.approach || data?.creativeProcess) {
    list.push({ id: 'sec-approach', heading: 'The Approach', body: data.approach || data.creativeProcess || '' });
  }
  if (data?.solution) {
    list.push({ id: 'sec-solution', heading: 'The Solution', body: data.solution });
  }
  if (list.length === 0) {
    list.push({ id: `sec-${Date.now()}-1`, heading: 'Project Overview', body: '' });
  }
  return list;
}

interface ProjectFormProps {
  initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();

  const [sections, setSections] = useState<ProjectCaseStudySection[]>(() =>
    getInitialSections(initialData)
  );

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
    approach: initialData?.approach || initialData?.creativeProcess || '',
    creativeProcess: initialData?.creativeProcess || initialData?.approach || '',
    solution: initialData?.solution || '',
    results: initialData?.results || [],
    coverImage: initialData?.coverImage || '/projects/reztro/reztro-cover.svg',
    gallery: initialData?.gallery || ['/projects/reztro/reztro-cover.svg'],
    videoUrl: initialData?.videoUrl || '',
    liveWebsiteUrl: initialData?.liveWebsiteUrl || '',
    appStoreUrl: initialData?.appStoreUrl || '',
    playStoreUrl: initialData?.playStoreUrl || '',
    externalLinkLabel: initialData?.externalLinkLabel || '',
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

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setGalleryUrls((prev) => [...prev, data.url]);
      }
    } catch {
      alert('Gallery image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const moveGalleryImage = (idx: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= galleryUrls.length) return;
    const updated = [...galleryUrls];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    setGalleryUrls(updated);
  };

  const removeGalleryImage = (idx: number) => {
    const updated = galleryUrls.filter((_, i) => i !== idx);
    setGalleryUrls(updated);
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: `sec-${Date.now()}`,
        heading: `Section ${prev.length + 1}`,
        body: '',
      },
    ]);
  };

  const handleUpdateSection = (
    index: number,
    field: 'heading' | 'body',
    value: string
  ) => {
    setSections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    setSections((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
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
        sections,
        fullDescription: sections[0]?.body || formData.fullDescription || '',
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

          {/* Section: Dynamic Case Study Narrative Sections */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <div className="pb-3 border-b border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display font-bold text-lg text-charcoal">
                  2. Case Study Narrative Sections
                </h2>
                <p className="text-xs text-charcoal-500 font-sans mt-0.5">
                  Customize headings, add custom body sections, reorder, or remove any section.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleAddSection}
                variant="outline"
                size="sm"
                className="inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Section</span>
              </Button>
            </div>

            {/* Short Description: Card summary for homepage and archive index */}
            <Textarea
              label="Short Description (Card Summary) *"
              required
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="A concise 1-2 sentence overview for cards and meta descriptions."
            />

            {/* Dynamic Modular Sections */}
            <div className="space-y-6 pt-2">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="p-5 bg-charcoal/5 border border-charcoal/15 space-y-4 relative group"
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-charcoal/10">
                    <span className="font-mono text-xs font-bold text-copper uppercase tracking-wider">
                      Section 0{idx + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSection(idx, 'up')}
                        className="px-2 py-1 border border-charcoal/20 bg-white text-charcoal hover:border-copper hover:text-copper disabled:opacity-30 text-xs font-bold"
                        title="Move section up"
                      >
                        &uarr; Up
                      </button>
                      <button
                        type="button"
                        disabled={idx === sections.length - 1}
                        onClick={() => handleMoveSection(idx, 'down')}
                        className="px-2 py-1 border border-charcoal/20 bg-white text-charcoal hover:border-copper hover:text-copper disabled:opacity-30 text-xs font-bold"
                        title="Move section down"
                      >
                        &darr; Down
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        className="p-1.5 border border-red-300 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs ml-1"
                        title="Remove section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Editable Heading */}
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      Section Heading *
                    </label>
                    <input
                      type="text"
                      required
                      value={sec.heading}
                      onChange={(e) => handleUpdateSection(idx, 'heading', e.target.value)}
                      placeholder="e.g. Context & Purpose, The Creative Challenge, User Research..."
                      className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm font-sans font-semibold focus:border-copper outline-none"
                    />
                  </div>

                  {/* Editable Body */}
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      Section Narrative Content (Body)
                    </label>
                    <textarea
                      rows={4}
                      value={sec.body}
                      onChange={(e) => handleUpdateSection(idx, 'body', e.target.value)}
                      placeholder="Enter detailed narrative, process, design decisions, or insights for this section..."
                      className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm font-sans font-light leading-relaxed focus:border-copper outline-none whitespace-pre-line"
                    />
                  </div>
                </div>
              ))}

              {sections.length === 0 && (
                <div className="p-8 text-center border border-dashed border-charcoal/30 bg-white space-y-3">
                  <p className="text-xs text-charcoal-500 font-sans">
                    No narrative sections added yet. Click below to add your first custom section.
                  </p>
                  <Button type="button" onClick={handleAddSection} variant="outline" size="sm">
                    + Add First Section
                  </Button>
                </div>
              )}

              <Button
                type="button"
                onClick={handleAddSection}
                variant="outline"
                className="w-full py-3 border-dashed border-charcoal/30 hover:border-copper hover:text-copper flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Case Study Section</span>
              </Button>
            </div>

            {/* Measurable Outcomes */}
            <div className="pt-4 border-t border-charcoal/10">
              <Textarea
                label="Measurable Results & Outcomes (Optional, one per line)"
                rows={3}
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

              {/* Gallery URLs & Upload */}
              <div className="pt-4 border-t border-charcoal/10 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-700">
                    Project Gallery Images (Visual Showcase Plates)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-ivory text-xs font-sans font-semibold cursor-pointer hover:bg-copper transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={handleGalleryUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 bg-ivory-50 border border-charcoal/20 text-xs font-sans"
                    placeholder="Or enter image URL to add..."
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

                {galleryUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {galleryUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] bg-charcoal border border-charcoal/20 group overflow-hidden"
                      >
                        <Image src={url} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                        
                        {/* Quick Action Overlay: Reorder & Delete */}
                        <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveGalleryImage(idx, 'left')}
                            className="p-1.5 bg-charcoal text-ivory hover:text-copper disabled:opacity-30 text-xs font-bold"
                            title="Move left"
                          >
                            &larr;
                          </button>

                          <span className="text-[10px] font-mono text-copper font-bold">
                            0{idx + 1}
                          </span>

                          <button
                            type="button"
                            disabled={idx === galleryUrls.length - 1}
                            onClick={() => moveGalleryImage(idx, 'right')}
                            className="p-1.5 bg-charcoal text-ivory hover:text-copper disabled:opacity-30 text-xs font-bold"
                            title="Move right"
                          >
                            &rarr;
                          </button>

                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="p-1.5 bg-red-600 text-white hover:bg-red-700"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

          {/* Section: External Project Links */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-6">
            <div className="pb-3 border-b border-charcoal/10 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-charcoal">
                  4. Live Destinations &amp; App Store Links
                </h2>
                <p className="text-xs text-charcoal-500 font-sans mt-0.5">
                  Configure external URLs for website deployments and mobile app listings.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-copper" />
            </div>

            <div className="space-y-4">
              <Input
                label="Live Website / Production URL"
                placeholder="https://example.com"
                value={formData.liveWebsiteUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveWebsiteUrl: e.target.value })}
                helperText="If provided, an external link arrow will appear on project cards."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Apple App Store URL"
                  placeholder="https://apps.apple.com/app/..."
                  value={formData.appStoreUrl || ''}
                  onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                />

                <Input
                  label="Google Play Store URL"
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  value={formData.playStoreUrl || ''}
                  onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                />
              </div>

              <Input
                label="Custom External Button Label"
                placeholder="e.g. Launch Live App, Visit Storefront, View Prototype"
                value={formData.externalLinkLabel || ''}
                onChange={(e) => setFormData({ ...formData, externalLinkLabel: e.target.value })}
              />
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
