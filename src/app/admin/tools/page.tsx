'use client';

import React, { useEffect, useState } from 'react';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Upload,
  X,
  Check,
  Search,
  Sparkles,
  Layers,
  Palette,
  Film,
  RefreshCw,
  Save,
} from 'lucide-react';
import { CapabilityCategory, CapabilityTool } from '@/lib/types';
import { uploadMedia } from '@/lib/upload-client';
import { TOOL_ICON_MAP, GenericCapabilityIcon } from '@/components/icons/ToolIcons';

export default function AdminToolsPage() {
  const [categories, setCategories] = useState<CapabilityCategory[]>([]);
  const [tools, setTools] = useState<CapabilityTool[]>([]);
  const [headline, setHeadline] = useState('Tools & Capabilities');
  const [subheadline, setSubheadline] = useState(
    'A creative toolkit I use to research, design, create and build meaningful digital experiences.'
  );
  const [loading, setLoading] = useState(true);
  const [savingHeadline, setSavingHeadline] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [catForm, setCatForm] = useState<Partial<CapabilityCategory>>({
    name: '',
    slug: '',
    description: '',
    position: 'top',
    displayOrder: 1,
    isVisible: true,
  });

  // Tool Modal State
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [toolForm, setToolForm] = useState<Partial<CapabilityTool>>({
    name: '',
    slug: '',
    categoryId: '',
    iconUrl: '',
    description: '',
    websiteUrl: '',
    altText: '',
    isSoftware: true,
    proficiency: 'Advanced',
    displayOrder: 1,
    isVisible: true,
  });
  const [uploadingIcon, setUploadingIcon] = useState(false);

  // Fetch full capabilities state
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/capabilities?all=true&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch capabilities');
      const data = await res.json();
      setCategories(data.categories || []);
      setTools(data.tools || []);
      if (data.headline) setHeadline(data.headline);
      if (data.subheadline) setSubheadline(data.subheadline);
    } catch (err: any) {
      showNotice(err.message || 'Error loading capabilities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // ==============================================================================
  // Section Headline & Subtitle Save
  // ==============================================================================
  const handleSaveHeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHeadline(true);
    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'headline',
          action: 'update',
          data: { headline, subheadline },
        }),
      });
      if (!res.ok) throw new Error('Failed to save headline settings');
      showNotice('Section headline & subtitle updated in database.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to save section content', 'error');
    } finally {
      setSavingHeadline(false);
    }
  };

  // ==============================================================================
  // Category Management Handlers
  // ==============================================================================
  const handleOpenAddCategory = () => {
    setCatForm({
      name: '',
      slug: '',
      description: '',
      position: 'top',
      displayOrder: categories.length + 1,
      isVisible: true,
    });
    setIsCatModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CapabilityCategory) => {
    setCatForm({ ...cat });
    setIsCatModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) {
      alert('Category name is required');
      return;
    }

    const payload = {
      ...catForm,
      slug: catForm.slug || catForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'category',
          action: catForm.id ? 'update' : 'create',
          data: payload,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to save category');

      setCategories(data.categories || []);
      setTools(data.tools || []);
      setIsCatModalOpen(false);
      showNotice(catForm.id ? 'Category updated successfully.' : 'New category created successfully.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to save category', 'error');
    }
  };

  const handleDeleteCategory = async (cat: CapabilityCategory) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}" and all its tools?`)) {
      return;
    }

    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'category',
          action: 'delete',
          data: { id: cat.id },
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to delete category');

      setCategories(data.categories || []);
      setTools(data.tools || []);
      showNotice('Category and associated tools deleted.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to delete category', 'error');
    }
  };

  const handleToggleCategoryVisibility = async (cat: CapabilityCategory) => {
    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'category',
          action: 'update',
          data: { id: cat.id, isVisible: !cat.isVisible },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to toggle category');
      setCategories(data.categories || []);
      showNotice(`Category marked as ${!cat.isVisible ? 'Published' : 'Hidden'}.`);
    } catch (err: any) {
      showNotice(err.message || 'Failed to update visibility', 'error');
    }
  };

  const handleMoveCategoryOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newOrder = [...categories];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    const orderedIds = newOrder.map((c) => c.id);
    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'category',
          action: 'reorder',
          data: { orderedIds },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to reorder categories');
      setCategories(data.categories || []);
      showNotice('Category order updated.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to reorder', 'error');
    }
  };

  // ==============================================================================
  // Tool Management Handlers
  // ==============================================================================
  const handleOpenAddTool = (presetCatId?: string) => {
    const targetCatId = presetCatId || (categories[0]?.id ?? 'cat-ai');
    const existingInCat = tools.filter((t) => t.categoryId === targetCatId);

    setToolForm({
      name: '',
      slug: '',
      categoryId: targetCatId,
      iconUrl: '',
      description: '',
      websiteUrl: '',
      altText: '',
      isSoftware: true,
      proficiency: 'Advanced',
      displayOrder: existingInCat.length + 1,
      isVisible: true,
    });
    setIsToolModalOpen(true);
  };

  const handleOpenEditTool = (tool: CapabilityTool) => {
    setToolForm({ ...tool });
    setIsToolModalOpen(true);
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIcon(true);
    try {
      const res = await uploadMedia(file);
      if (res.url) {
        setToolForm((prev) => ({
          ...prev,
          iconUrl: res.url,
          altText: prev.altText || prev.name || file.name.replace(/\.[^.]+$/, ''),
        }));
        showNotice('Custom icon uploaded to storage.');
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed. Ensure file is PNG, SVG, or WebP.');
    } finally {
      setUploadingIcon(false);
      e.target.value = '';
    }
  };

  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolForm.name) {
      alert('Tool name is required');
      return;
    }
    if (!toolForm.categoryId) {
      alert('Please select a category for this tool');
      return;
    }

    const payload = {
      ...toolForm,
      slug: toolForm.slug || toolForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      altText: toolForm.altText || `${toolForm.name} icon`,
    };

    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'tool',
          action: toolForm.id ? 'update' : 'create',
          data: payload,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to save tool');

      setCategories(data.categories || []);
      setTools(data.tools || []);
      setIsToolModalOpen(false);
      showNotice(toolForm.id ? 'Tool updated successfully.' : 'New tool added successfully.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to save tool', 'error');
    }
  };

  const handleDeleteTool = async (tool: CapabilityTool) => {
    if (!confirm(`Are you sure you want to delete "${tool.name}"?`)) return;

    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'tool',
          action: 'delete',
          data: { id: tool.id },
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to delete tool');

      setCategories(data.categories || []);
      setTools(data.tools || []);
      showNotice('Tool deleted from database.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to delete tool', 'error');
    }
  };

  const handleToggleToolVisibility = async (tool: CapabilityTool) => {
    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'tool',
          action: 'update',
          data: { id: tool.id, isVisible: !tool.isVisible },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to toggle tool');
      setCategories(data.categories || []);
      setTools(data.tools || []);
      showNotice(`Tool marked as ${!tool.isVisible ? 'Enabled' : 'Disabled'}.`);
    } catch (err: any) {
      showNotice(err.message || 'Failed to update visibility', 'error');
    }
  };

  const handleMoveToolOrder = async (
    tool: CapabilityTool,
    direction: 'up' | 'down',
    siblingTools: CapabilityTool[]
  ) => {
    const curIdx = siblingTools.findIndex((t) => t.id === tool.id);
    const targetIdx = direction === 'up' ? curIdx - 1 : curIdx + 1;
    if (targetIdx < 0 || targetIdx >= siblingTools.length) return;

    const reordered = [...siblingTools];
    const temp = reordered[curIdx];
    reordered[curIdx] = reordered[targetIdx];
    reordered[targetIdx] = temp;

    const orderedIds = reordered.map((t) => t.id);

    try {
      const res = await fetch('/api/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'tool',
          action: 'reorder',
          data: { categoryId: tool.categoryId, orderedIds },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to reorder tools');
      setCategories(data.categories || []);
      setTools(data.tools || []);
      showNotice('Tool order updated.');
    } catch (err: any) {
      showNotice(err.message || 'Failed to reorder tools', 'error');
    }
  };

  // Icon preview renderer for table & modal live preview
  const renderPreviewIcon = (tool: Partial<CapabilityTool>, size = 28) => {
    if (tool.iconUrl && tool.iconUrl.trim().length > 0) {
      return (
        <img
          src={tool.iconUrl}
          alt={tool.altText || tool.name || 'Icon'}
          className="w-7 h-7 object-contain rounded-xs"
        />
      );
    }
    const slug = (tool.slug || tool.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const Mapped = TOOL_ICON_MAP[slug] || TOOL_ICON_MAP[tool.slug || ''] || TOOL_ICON_MAP[tool.name?.toLowerCase() || ''];
    if (Mapped) {
      return <Mapped size={size} />;
    }
    return <GenericCapabilityIcon label={tool.name || 'CP'} size={size} />;
  };

  // Filter tools based on search and selected category
  const filteredTools = tools.filter((t) => {
    const matchCat = selectedCatFilter === 'all' || t.categoryId === selectedCatFilter;
    const matchSearch =
      searchTerm === '' ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-copper" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-copper">
              Arsenal CMS
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-tight">
            Tools & Capabilities
          </h1>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 mt-1">
            Manage the 4-quadrant orbital composition, categories, software logos, and design capabilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-charcoal hover:bg-charcoal/5 border border-charcoal/20 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-copper' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAddCategory}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-charcoal text-ivory hover:bg-charcoal-900 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-copper" />
            <span>New Category</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenAddTool()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-copper text-ivory hover:bg-copper-600 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tool</span>
          </button>
        </div>
      </div>

      {/* Floating Notification Banner */}
      {feedback && (
        <div
          className={`p-4 text-xs font-sans font-semibold flex items-center justify-between border transition-all ${
            feedback.type === 'success'
              ? 'bg-[#EBFBF0] border-[#D0F5DC] text-[#16A34A]'
              : 'bg-red-50 border-red-200 text-red-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{feedback.message}</span>
          </div>
          <button type="button" onClick={() => setFeedback(null)}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ======================================================================== */}
      {/* 1. Section Title & Subhead Editor */}
      {/* ======================================================================== */}
      <form
        onSubmit={handleSaveHeadline}
        className="p-6 bg-white border border-charcoal/10 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-charcoal/5 pb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-charcoal">
              Section Headline & Subhead
            </h3>
            <p className="text-[11px] text-charcoal-500 font-sans">
              Configures the central title and supporting copy rendered in the center of the orbital layout.
            </p>
          </div>
          <button
            type="submit"
            disabled={savingHeadline}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-copper text-ivory text-xs font-bold hover:bg-copper-600 transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingHeadline ? 'Saving...' : 'Save Section Content'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
              Main Heading
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-charcoal/20 focus:border-copper focus:outline-none"
              placeholder="e.g. Tools & Capabilities"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
              Supporting Subtitle
            </label>
            <input
              type="text"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-charcoal/20 focus:border-copper focus:outline-none"
              placeholder="e.g. A creative toolkit I use to research, design, create and build..."
              required
            />
          </div>
        </div>
      </form>

      {/* ======================================================================== */}
      {/* 2. Four-Category Spatial Management Cards */}
      {/* ======================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-charcoal">
              Spatial Category Groups ({categories.length})
            </h2>
            <p className="text-xs text-charcoal-500 font-sans">
              Categories correspond to the 4 directional nodes around the central heading: Top, Left, Right, Bottom.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const catTools = tools.filter((t) => t.categoryId === cat.id);
            const isTop = cat.position === 'top';
            const isLeft = cat.position === 'left';
            const isRight = cat.position === 'right';
            const isBottom = cat.position === 'bottom';

            return (
              <div
                key={cat.id}
                className={`p-5 bg-white border transition-all flex flex-col justify-between ${
                  cat.isVisible ? 'border-charcoal/15 shadow-xs' : 'border-dashed border-charcoal/20 opacity-70'
                }`}
              >
                <div>
                  {/* Position Badge & Order */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-charcoal/5 text-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                      {cat.position.toUpperCase()} NODE
                    </span>
                    <span className="text-[10px] font-mono text-charcoal-400">
                      #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-charcoal">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-charcoal-500 font-sans mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-charcoal/5 flex items-center justify-between text-xs text-charcoal-600 font-sans">
                    <span>
                      <strong>{catTools.length}</strong> items active
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleCategoryVisibility(cat)}
                      className="text-xs font-semibold text-charcoal-500 hover:text-copper flex items-center gap-1"
                    >
                      {cat.isVisible ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-charcoal-400" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveCategoryOrder(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 text-charcoal-400 hover:text-charcoal hover:bg-charcoal/5 disabled:opacity-20"
                      title="Move Category Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveCategoryOrder(idx, 'down')}
                      disabled={idx === categories.length - 1}
                      className="p-1.5 text-charcoal-400 hover:text-charcoal hover:bg-charcoal/5 disabled:opacity-20"
                      title="Move Category Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAddTool(cat.id)}
                      className="p-1 text-xs text-copper hover:underline font-bold"
                      title="Add tool to this category"
                    >
                      + Tool
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategory(cat)}
                      className="p-1.5 text-charcoal-500 hover:text-charcoal hover:bg-charcoal/5"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================================== */}
      {/* 3. Comprehensive Tool & Capability Inventory */}
      {/* ======================================================================== */}
      <div className="space-y-4 pt-6 border-t border-charcoal/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-lg text-charcoal">
              Tools & Capabilities Inventory ({tools.length})
            </h2>
            <p className="text-xs text-charcoal-500 font-sans">
              Individual circular icon holders, official vector brand logos, and conceptual design capabilities.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools & capabilities..."
                className="pl-8 pr-3 py-1.5 text-xs border border-charcoal/20 focus:border-copper focus:outline-none w-[200px] sm:w-[240px]"
              />
            </div>

            <select
              value={selectedCatFilter}
              onChange={(e) => setSelectedCatFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-charcoal/20 bg-white focus:border-copper focus:outline-none"
            >
              <option value="all">All Categories ({tools.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({tools.filter((t) => t.categoryId === c.id).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Inventory */}
        <div className="bg-white border border-charcoal/15 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-charcoal/10 text-[11px] font-bold uppercase tracking-wider text-charcoal-600">
                <th className="py-3 px-4">Icon / Disc</th>
                <th className="py-3 px-4">Tool / Capability</th>
                <th className="py-3 px-4">Category Group</th>
                <th className="py-3 px-4">Type & Proficiency</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {filteredTools.map((tool, idx) => {
                const cat = categories.find((c) => c.id === tool.categoryId);
                const siblingTools = tools.filter((t) => t.categoryId === tool.categoryId);
                const isFirst = siblingTools[0]?.id === tool.id;
                const isLast = siblingTools[siblingTools.length - 1]?.id === tool.id;

                return (
                  <tr
                    key={tool.id}
                    className={`hover:bg-[#FCFAF7] transition-colors ${
                      !tool.isVisible ? 'opacity-50' : ''
                    }`}
                  >
                    {/* 54px Disc Icon Preview */}
                    <td className="py-3 px-4">
                      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white border border-charcoal/10 shadow-[0_2px_8px_rgba(37,36,31,0.06)]">
                        {renderPreviewIcon(tool, 28)}
                      </div>
                    </td>

                    {/* Name & Description */}
                    <td className="py-3 px-4 max-w-[260px]">
                      <div className="font-bold text-sm text-charcoal font-display">
                        {tool.name}
                      </div>
                      {tool.description && (
                        <div className="text-[11px] text-charcoal-500 truncate mt-0.5">
                          {tool.description}
                        </div>
                      )}
                      {tool.websiteUrl && (
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-copper hover:underline mt-1"
                        >
                          <span>Official Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAE4D9] text-charcoal border border-charcoal/10">
                        {cat?.name || 'Unassigned'}
                      </span>
                    </td>

                    {/* Type & Proficiency */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                            tool.isSoftware
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {tool.isSoftware ? 'Software' : 'Capability'}
                        </span>
                        {tool.proficiency && (
                          <div className="text-[10px] text-copper font-mono font-bold">
                            {tool.proficiency}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Reorder in Category */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveToolOrder(tool, 'up', siblingTools)}
                          disabled={isFirst}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-[11px] w-5 text-center">
                          {tool.displayOrder}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMoveToolOrder(tool, 'down', siblingTools)}
                          disabled={isLast}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Visibility */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleToolVisibility(tool)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      >
                        {tool.isVisible ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-charcoal-400" />
                            <span className="text-charcoal-400">Disabled</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditTool(tool)}
                          className="p-1.5 text-charcoal-600 hover:text-charcoal hover:bg-charcoal/5 transition-all"
                          title="Edit Tool"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTool(tool)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all"
                          title="Delete Tool"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredTools.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-charcoal-500">
                    No tools found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================================== */}
      {/* CATEGORY MODAL */}
      {/* ======================================================================== */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full border border-charcoal/20 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsCatModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-bold text-lg text-charcoal mb-4">
              {catForm.id ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={catForm.name || ''}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. AI, Research & Productivity"
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={catForm.slug || ''}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  placeholder="auto-generated from name"
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Spatial Node Position *
                </label>
                <select
                  value={catForm.position || 'top'}
                  onChange={(e) =>
                    setCatForm({
                      ...catForm,
                      position: e.target.value as 'top' | 'left' | 'right' | 'bottom',
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none bg-white"
                >
                  <option value="top">Top Node (North) — Label above icons</option>
                  <option value="left">Left Node (West) — Label above icons</option>
                  <option value="right">Right Node (East) — Icons above label</option>
                  <option value="bottom">Bottom Node (South) — Icons above label</option>
                </select>
                <p className="text-[10px] text-charcoal-500 mt-1">
                  Controls where this category group sits in the 4-direction orbital composition.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Description
                </label>
                <textarea
                  value={catForm.description || ''}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  rows={2}
                  placeholder="Short description of this capability cluster..."
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catVisible"
                  checked={catForm.isVisible ?? true}
                  onChange={(e) => setCatForm({ ...catForm, isVisible: e.target.checked })}
                  className="rounded text-copper focus:ring-copper"
                />
                <label htmlFor="catVisible" className="text-xs font-sans text-charcoal font-semibold">
                  Publish Category on Live Website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-charcoal/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-copper text-ivory hover:bg-copper-600 transition-all"
                >
                  {catForm.id ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* TOOL MODAL (With Live Icon Disc Preview) */}
      {/* ======================================================================== */}
      {isToolModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full border border-charcoal/20 shadow-2xl p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsToolModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-bold text-lg text-charcoal mb-4">
              {toolForm.id ? 'Edit Tool / Capability' : 'Add Tool or Capability'}
            </h3>

            {/* LIVE PREVIEW OF CIRCULAR DISC */}
            <div className="mb-6 p-4 rounded-xl bg-[#FAF7F2] border border-charcoal/10 flex items-center gap-4">
              <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center bg-white border border-charcoal/10 shadow-[0_2px_8px_rgba(37,36,31,0.06)] shrink-0">
                {renderPreviewIcon(toolForm, 30)}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-copper">
                  Live Disc Preview
                </span>
                <div className="font-display font-bold text-sm text-charcoal">
                  {toolForm.name || 'Untitled Tool'}
                </div>
                <div className="text-[11px] text-charcoal-500">
                  {toolForm.description || 'Description will appear in hover tooltip'}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveTool} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Tool / Capability Name *
                  </label>
                  <input
                    type="text"
                    value={toolForm.name || ''}
                    onChange={(e) =>
                      setToolForm({
                        ...toolForm,
                        name: e.target.value,
                        altText: toolForm.altText || `${e.target.value} icon`,
                      })
                    }
                    placeholder="e.g. Adobe Illustrator"
                    className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Category Group *
                  </label>
                  <select
                    value={toolForm.categoryId || ''}
                    onChange={(e) => setToolForm({ ...toolForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select category...
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.position})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Icon Configuration: Custom Upload or Official Preset */}
              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Tool Icon (SVG / PNG / WebP)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={toolForm.iconUrl || ''}
                    onChange={(e) => setToolForm({ ...toolForm, iconUrl: e.target.value })}
                    placeholder="Auto-matches built-in SVG, or enter custom URL / upload..."
                    className="flex-1 px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none font-mono"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-charcoal text-ivory text-xs font-semibold hover:bg-charcoal-900 transition-all">
                    <Upload className="w-3.5 h-3.5 text-copper" />
                    <span>{uploadingIcon ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/svg+xml,image/png,image/webp"
                      onChange={handleIconUpload}
                      className="hidden"
                      disabled={uploadingIcon}
                    />
                  </label>
                </div>
                <p className="text-[10px] text-charcoal-500 mt-1">
                  Leave empty to automatically render the built-in official vector SVG for recognized software brands.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Type
                  </label>
                  <select
                    value={toolForm.isSoftware ? 'software' : 'capability'}
                    onChange={(e) =>
                      setToolForm({ ...toolForm, isSoftware: e.target.value === 'software' })
                    }
                    className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none bg-white"
                  >
                    <option value="software">Software Tool (App / Platform)</option>
                    <option value="capability">Design Capability (Methodology / Deliverable)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Proficiency
                  </label>
                  <select
                    value={toolForm.proficiency || 'Advanced'}
                    onChange={(e) =>
                      setToolForm({
                        ...toolForm,
                        proficiency: e.target.value as 'Expert' | 'Advanced' | 'Intermediate',
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none bg-white"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Short Description (Shown in Tooltip)
                </label>
                <input
                  type="text"
                  value={toolForm.description || ''}
                  onChange={(e) => setToolForm({ ...toolForm, description: e.target.value })}
                  placeholder="e.g. Vector Graphics & Brand Identity"
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Official Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={toolForm.websiteUrl || ''}
                  onChange={(e) => setToolForm({ ...toolForm, websiteUrl: e.target.value })}
                  placeholder="https://www.adobe.com/products/illustrator.html"
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Image Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  value={toolForm.altText || ''}
                  onChange={(e) => setToolForm({ ...toolForm, altText: e.target.value })}
                  placeholder="e.g. Adobe Illustrator vector branding suite"
                  className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-copper focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="toolVisible"
                  checked={toolForm.isVisible ?? true}
                  onChange={(e) => setToolForm({ ...toolForm, isVisible: e.target.checked })}
                  className="rounded text-copper focus:ring-copper"
                />
                <label htmlFor="toolVisible" className="text-xs font-sans text-charcoal font-semibold">
                  Enable Tool on Public Website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setIsToolModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-charcoal/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-copper text-ivory hover:bg-copper-600 transition-all"
                >
                  {toolForm.id ? 'Save Tool Changes' : 'Add to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
