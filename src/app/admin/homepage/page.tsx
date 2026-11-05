'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  Eye, 
  ArrowUpRight, 
  ArrowDown, 
  ArrowUp,
  Sliders,
  Layers,
  Wrench,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings, ToolItem } from '@/lib/types';
import { DEFAULT_TOOLS, DEFAULT_HOMEPAGE_ORDER } from '@/lib/constants';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';
import { uploadMedia } from '@/lib/upload-client';

export default function AdminHomepageCMS() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleFileUpload = async (file: File, field: 'heroBgImage' | 'heroProfileImage' | 'heroMonogramUrl') => {
    if (!file || !settings) return;
    if (field === 'heroBgImage') setUploadingBg(true);
    else setUploadingProfile(true);

    try {
      const data = await uploadMedia(file);
      if (data.url) {
        setSettings({ ...settings, [field]: data.url });
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed. Please check file format.');
    } finally {
      setUploadingBg(false);
      setUploadingProfile(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setIsSuccess(false);

    try {
      const saved = await updateSiteSettings(settings);
      setSettings(saved);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save homepage settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const sectionMeta: Record<string, { label: string; desc: string }> = {
    hero: { label: 'Hero (Opening)', desc: 'Large headline, professional title & primary CTA buttons' },
    clients: { label: 'Our Clients', desc: '3 kinetic scroll-linked rows of client logos' },
    about: { label: 'About Me', desc: 'Editorial portrait, biography & resume download' },
    tools: { label: 'Tools I Use', desc: 'Software arsenal (Photoshop, Illustrator, Figma, etc.)' },
    motion: { label: 'Featured in Motion', desc: 'Horizontal moving project strip cards' },
    deliver: { label: 'What I Deliver', desc: 'Core capabilities & scope breakdown' },
    'selected-works': { label: 'Selected Works', desc: '3x3 editorial curated project showcase' },
    process: { label: 'Creative Process', desc: 'Workflow & rigor 4-step framework' },
    contact: { label: 'Project Inquiry CTA', desc: 'Direct brief form & channel coordinates' },
  };

  const currentOrder =
    settings && Array.isArray(settings.homepageSectionOrder) && settings.homepageSectionOrder.length > 0
      ? settings.homepageSectionOrder
      : DEFAULT_HOMEPAGE_ORDER;

  const currentTools =
    settings && Array.isArray(settings.toolsList) && settings.toolsList.length > 0
      ? settings.toolsList
      : DEFAULT_TOOLS;

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= currentOrder.length) return;
    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(target, 0, moved);
    setSettings({ ...settings, homepageSectionOrder: newOrder });
  };

  const handleResetSectionOrder = () => {
    if (!settings) return;
    setSettings({ ...settings, homepageSectionOrder: [...DEFAULT_HOMEPAGE_ORDER] });
  };

  const handleUpdateTool = (index: number, field: keyof ToolItem, value: any) => {
    if (!settings) return;
    const updated = [...currentTools];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, toolsList: updated });
  };

  const handleAddTool = () => {
    if (!settings) return;
    const newTool: ToolItem = {
      id: `tool-${Date.now()}`,
      name: 'New Tool',
      category: 'Design Tool',
      monogram: 'NT',
      accentColor: '#C4855A',
      sortOrder: currentTools.length + 1,
      isVisible: true,
    };
    setSettings({ ...settings, toolsList: [...currentTools, newTool] });
  };

  const handleRemoveTool = (index: number) => {
    if (!settings) return;
    const updated = currentTools.filter((_, i) => i !== index);
    setSettings({ ...settings, toolsList: updated });
  };

  if (!settings) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading Homepage CMS...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} noValidate className="space-y-10 font-sans max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            FRONTEND EDITORIAL CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight flex items-center gap-3">
            <Home className="w-7 h-7 text-copper" />
            Homepage Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage your opening headline, subtitle, section sequence, software arsenal, and background assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-copper animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live</span>
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            icon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* 1. Primary Typography & Headlines */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-copper" />
          Primary Typography &amp; Headlines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Main Headline (Line 1)"
            value={settings.heroHeadline || ''}
            onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
            placeholder="Designer that makes businesses stand out."
            helperText="Displays in giant oversized Space Grotesk font."
          />
          <Input
            label="Headline Line 2 (Optional Accent Line)"
            value={settings.heroHeadlineLine2 || ''}
            onChange={(e) => setSettings({ ...settings, heroHeadlineLine2: e.target.value })}
            placeholder="e.g. DESIGN STUDIO"
            helperText="Renders in burnt copper accent directly below Line 1."
          />
        </div>

        <Input
          label="Professional Title / Capability Subtitle"
          value={settings.heroSubtitle || settings.heroTitle || ''}
          onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value, heroTitle: e.target.value })}
          placeholder="CREATIVE DESIGNER & DIGITAL CREATIVE PARTNER"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Location Label"
            value={settings.heroLocationLabel || settings.location || ''}
            onChange={(e) => setSettings({ ...settings, heroLocationLabel: e.target.value })}
            placeholder="Coimbatore, Tamil Nadu, India"
          />
          <Input
            label="Highlighted Keywords"
            value={settings.heroHighlightedWords || ''}
            onChange={(e) => setSettings({ ...settings, heroHighlightedWords: e.target.value })}
            placeholder="Branding, UI/UX, Motion"
          />
        </div>
      </div>

      {/* 2. Narrative Introduction */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
          Hero Narrative Introduction
        </h2>

        <Textarea
          label="Primary Introduction Paragraph"
          rows={3}
          value={settings.heroSupportingCopy || ''}
          onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
          helperText="High contrast, prominent leading text (22px)."
        />

        <Textarea
          label="Secondary Introduction Narrative"
          rows={3}
          value={settings.heroIntroSecondary || ''}
          onChange={(e) => setSettings({ ...settings, heroIntroSecondary: e.target.value })}
          helperText="Supporting explanatory paragraph (15px)."
        />
      </div>

      {/* 3. Call-To-Action Destinations */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10 flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-copper" />
          Call-To-Action Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Primary CTA Button Label"
            value={settings.heroPrimaryCtaText || 'Initiate Brief'}
            onChange={(e) => setSettings({ ...settings, heroPrimaryCtaText: e.target.value })}
          />
          <Input
            label="Primary CTA Destination Link"
            value={settings.heroPrimaryCtaHref || '/contact'}
            onChange={(e) => setSettings({ ...settings, heroPrimaryCtaHref: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Secondary CTA Button Label"
            value={settings.heroSecondaryCtaText || 'View Selected Work'}
            onChange={(e) => setSettings({ ...settings, heroSecondaryCtaText: e.target.value })}
          />
          <Input
            label="Secondary CTA Destination Link"
            value={settings.heroSecondaryCtaHref || '/work'}
            onChange={(e) => setSettings({ ...settings, heroSecondaryCtaHref: e.target.value })}
          />
        </div>
      </div>

      {/* 4. Visual Backgrounds & Animation */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-copper" />
          Visual Backgrounds &amp; Monogram
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Monogram settings */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.heroMonogramVisible !== false}
                onChange={(e) => setSettings({ ...settings, heroMonogramVisible: e.target.checked })}
                className="rounded border-charcoal/30 text-copper focus:ring-copper"
              />
              <span className="text-xs font-sans font-bold text-charcoal">
                Display Oversized Background Monogram (&quot;a&quot;)
              </span>
            </label>

            <Input
              label="Monogram Asset URL"
              value={settings.heroMonogramUrl || '/brand/logo-monogram-light.png'}
              onChange={(e) => setSettings({ ...settings, heroMonogramUrl: e.target.value })}
              placeholder="/brand/logo-monogram-light.png"
            />
          </div>

          {/* Staggered animation toggle */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.heroAnimationEnabled !== false}
                onChange={(e) => setSettings({ ...settings, heroAnimationEnabled: e.target.checked })}
                className="rounded border-charcoal/30 text-copper focus:ring-copper"
              />
              <div>
                <span className="text-xs font-sans font-bold text-charcoal block">
                  Enable Opening Staggered Animations
                </span>
                <span className="text-[11px] text-charcoal-500 block">
                  Smooth typography entrance &amp; parallax scroll transforms on large displays.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 5. HOMEPAGE SECTION SEQUENCE & ORDER CONTROL */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-copper" />
            <h2 className="font-display font-bold text-lg text-charcoal">
              Homepage Section Sequence &amp; Reorder
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetSectionOrder}
            className="text-[11px] font-sans font-bold uppercase tracking-wider text-copper hover:underline"
          >
            Reset to Default Sequence
          </button>
        </div>

        <p className="text-xs text-charcoal-600 font-sans">
          Rearrange the order of sections on the live homepage. Use Move Up/Down to shift positions.
        </p>

        <div className="space-y-2">
          {currentOrder.map((secId, idx) => {
            const meta = sectionMeta[secId] || { label: secId, desc: 'Homepage section' };
            return (
              <div
                key={secId}
                className="flex items-center justify-between p-3.5 bg-ivory/60 border border-charcoal/15 hover:border-copper transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-charcoal text-ivory flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal">
                      {meta.label}
                    </h4>
                    <p className="text-[11px] font-sans text-charcoal-500">
                      {meta.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveSection(idx, 'up')}
                    className="p-1.5 border border-charcoal/20 bg-white hover:border-copper hover:text-copper disabled:opacity-30 text-charcoal transition-colors"
                    title="Move section up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === currentOrder.length - 1}
                    onClick={() => handleMoveSection(idx, 'down')}
                    className="p-1.5 border border-charcoal/20 bg-white hover:border-copper hover:text-copper disabled:opacity-30 text-charcoal transition-colors"
                    title="Move section down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. TOOLS I USE SOFTWARE ARSENAL */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-copper" />
            <h2 className="font-display font-bold text-lg text-charcoal">
              &quot;Tools I Use&quot; Software Arsenal
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAddTool}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Tool</span>
          </button>
        </div>

        <p className="text-xs text-charcoal-600 font-sans">
          Manage applications shown in the &quot;Tools I Use&quot; section on both Homepage and About page.
        </p>

        <div className="space-y-3">
          {currentTools.map((tool, idx) => (
            <div
              key={tool.id || idx}
              className="p-4 bg-ivory/60 border border-charcoal/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              <div className="sm:col-span-1 flex items-center justify-center">
                <div
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center font-bold text-sm bg-white"
                  style={{ color: tool.accentColor || '#C4855A' }}
                >
                  {tool.monogram || 'TL'}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] font-sans font-bold uppercase text-charcoal-500 block mb-1">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => handleUpdateTool(idx, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-charcoal/20 text-xs font-sans font-semibold focus:border-copper outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] font-sans font-bold uppercase text-charcoal-500 block mb-1">
                  Category / Discipline
                </label>
                <input
                  type="text"
                  value={tool.category}
                  onChange={(e) => handleUpdateTool(idx, 'category', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-charcoal/20 text-xs font-sans focus:border-copper outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-sans font-bold uppercase text-charcoal-500 block mb-1">
                  Monogram (2-3 Chars)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={tool.monogram}
                  onChange={(e) => handleUpdateTool(idx, 'monogram', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-charcoal/20 text-xs font-mono font-bold focus:border-copper outline-none text-center uppercase"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-sans font-bold uppercase text-charcoal-500 block mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={tool.accentColor || '#C4855A'}
                    onChange={(e) => handleUpdateTool(idx, 'accentColor', e.target.value)}
                    className="w-7 h-7 p-0.5 border border-charcoal/20 bg-white cursor-pointer"
                  />
                  <input
                    type="text"
                    value={tool.accentColor || '#C4855A'}
                    onChange={(e) => handleUpdateTool(idx, 'accentColor', e.target.value)}
                    className="w-full px-1.5 py-1.5 bg-white border border-charcoal/20 text-[11px] font-mono focus:border-copper outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-1 flex items-center justify-end gap-2">
                <label className="flex items-center gap-1 text-[11px] font-sans text-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tool.isVisible !== false}
                    onChange={(e) => handleUpdateTool(idx, 'isVisible', e.target.checked)}
                    className="rounded border-charcoal/30 text-copper focus:ring-copper"
                  />
                  <span>Show</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(idx)}
                  className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove tool"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-6 z-20 p-4 bg-charcoal text-ivory border border-charcoal-700 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-sans text-charcoal-300 hover:text-copper flex items-center gap-1"
          >
            <span>Preview Live Homepage</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save All Homepage Changes
        </Button>
      </div>
    </form>
  );
}
