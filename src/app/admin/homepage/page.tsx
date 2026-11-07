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
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings, HeroProfessionItem } from '@/lib/types';
import { DEFAULT_HOMEPAGE_ORDER, DEFAULT_HERO_PROFESSIONS } from '@/lib/constants';
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
    hero: { label: 'Hero (Opening)', desc: 'Minimal centered typography, animated profession sequence & CTAs' },
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

  const currentProfessions =
    settings && Array.isArray(settings.heroProfessions) && settings.heroProfessions.length > 0
      ? settings.heroProfessions
      : DEFAULT_HERO_PROFESSIONS;

  const handleAddProfession = () => {
    if (!settings) return;
    const newProf: HeroProfessionItem = {
      id: `prof-${Date.now()}`,
      text: 'New Profession',
      enabled: true,
    };
    setSettings({
      ...settings,
      heroProfessions: [...currentProfessions, newProf],
    });
  };

  const handleUpdateProfession = (index: number, field: keyof HeroProfessionItem, value: any) => {
    if (!settings) return;
    const updated = [...currentProfessions];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, heroProfessions: updated });
  };

  const handleMoveProfession = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= currentProfessions.length) return;
    const list = [...currentProfessions];
    const [moved] = list.splice(index, 1);
    list.splice(target, 0, moved);
    setSettings({ ...settings, heroProfessions: list });
  };

  const handleRemoveProfession = (index: number) => {
    if (!settings) return;
    const list = currentProfessions.filter((_, i) => i !== index);
    setSettings({ ...settings, heroProfessions: list });
  };

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
            Manage your opening headline, subtitle, section sequence, and background assets.
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

      {/* 1. Typography & Opening Identity */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-copper" />
          Minimal Typography-Led Hero Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Introduction Label"
            value={settings.heroIntroduction ?? "Hi, I'm"}
            onChange={(e) => setSettings({ ...settings, heroIntroduction: e.target.value })}
            placeholder="Hi, I'm"
            helperText="Renders above the main name in 18–20px Manrope font."
          />
          <Input
            label="Main Name"
            value={settings.heroName ?? settings.heroHeadline ?? 'Abdul Ahad'}
            onChange={(e) => setSettings({ ...settings, heroName: e.target.value, heroHeadline: e.target.value })}
            placeholder="Abdul Ahad"
            helperText="Displays in oversized Space Grotesk font (strongest element of first viewport)."
          />
        </div>

        <Textarea
          label="Supporting Description"
          rows={3}
          value={settings.heroSupportingCopy ?? 'I create thoughtful visual identities, digital experiences and creative solutions that help ambitious brands stand out.'}
          onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
          placeholder="I create thoughtful visual identities, digital experiences and creative solutions that help ambitious brands stand out."
          helperText="Centered editorial paragraph with comfortable line length (max-width ~650px)."
        />
      </div>

      {/* 2. Animated Rotating Professions Sequence */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-charcoal/10">
          <div>
            <h2 className="font-display font-bold text-lg text-charcoal flex items-center gap-2">
              <Sliders className="w-4 h-4 text-copper" />
              Animated Profession Sequence
            </h2>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Sequence of titles cycling below the name in Burnt Copper (#C4855A). One title displayed at a time with smooth vertical text-mask slide.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddProfession}
            icon={<Plus className="w-3.5 h-3.5 text-copper" />}
          >
            Add Profession
          </Button>
        </div>

        {/* List of Professions */}
        <div className="space-y-2.5">
          {currentProfessions.map((prof, index) => (
            <div
              key={prof.id || index}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 border transition-colors ${
                prof.enabled !== false
                  ? 'bg-ivory/50 border-charcoal/15'
                  : 'bg-charcoal/5 border-charcoal/10 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-charcoal text-ivory text-xs font-mono font-bold">
                  {index + 1}
                </span>
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-charcoal">
                  <input
                    type="checkbox"
                    checked={prof.enabled !== false}
                    onChange={(e) => handleUpdateProfession(index, 'enabled', e.target.checked)}
                    className="rounded border-charcoal/30 text-copper focus:ring-copper"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={prof.text}
                  onChange={(e) => handleUpdateProfession(index, 'text', e.target.value)}
                  placeholder="e.g. Graphic Designer"
                  className="w-full px-3 py-1.5 text-sm font-sans bg-white border border-charcoal/20 focus:border-copper focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-1 self-end sm:self-auto">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMoveProfession(index, 'up')}
                  className="p-1.5 text-charcoal-500 hover:text-charcoal hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Up"
                  aria-label="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === currentProfessions.length - 1}
                  onClick={() => handleMoveProfession(index, 'down')}
                  className="p-1.5 text-charcoal-500 hover:text-charcoal hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Down"
                  aria-label="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={currentProfessions.length <= 1}
                  onClick={() => handleRemoveProfession(index)}
                  className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Delete"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Animation Timing & Controls */}
        <div className="pt-4 border-t border-charcoal/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Display Hold Interval (ms)"
            type="number"
            value={settings.heroAnimationInterval ?? 1200}
            onChange={(e) => setSettings({ ...settings, heroAnimationInterval: parseInt(e.target.value) || 1200 })}
            helperText="Default: 1200ms (~1 sec hold per title)."
          />
          <Input
            label="Transition Duration (sec)"
            type="number"
            step="0.05"
            value={settings.heroTransitionDuration ?? 0.45}
            onChange={(e) => setSettings({ ...settings, heroTransitionDuration: parseFloat(e.target.value) || 0.45 })}
            helperText="Default: 0.45s smooth vertical mask reveal."
          />
          <div className="flex flex-col justify-center pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={settings.heroAnimationEnabled !== false}
                onChange={(e) => setSettings({ ...settings, heroAnimationEnabled: e.target.checked })}
                className="rounded border-charcoal/30 text-copper focus:ring-copper"
              />
              <div>
                <span className="text-xs font-sans font-bold text-charcoal block">
                  Enable Profession Cycling
                </span>
                <span className="text-[11px] text-charcoal-500 block">
                  Continuous loop across enabled titles.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Call-To-Action Buttons */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10 flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-copper" />
          Hero Call-To-Action Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Primary CTA Label"
            value={settings.heroPrimaryCtaText ?? 'Explore My Work'}
            onChange={(e) => setSettings({ ...settings, heroPrimaryCtaText: e.target.value })}
            placeholder="Explore My Work"
          />
          <Input
            label="Primary CTA Destination Link"
            value={settings.heroPrimaryCtaHref ?? '#selected-works'}
            onChange={(e) => setSettings({ ...settings, heroPrimaryCtaHref: e.target.value })}
            placeholder="#selected-works or /work"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Secondary CTA Label"
            value={settings.heroSecondaryCtaText ?? 'Start a Project'}
            onChange={(e) => setSettings({ ...settings, heroSecondaryCtaText: e.target.value })}
            placeholder="Start a Project"
          />
          <Input
            label="Secondary CTA Destination Link"
            value={settings.heroSecondaryCtaHref ?? '/contact'}
            onChange={(e) => setSettings({ ...settings, heroSecondaryCtaHref: e.target.value })}
            placeholder="/contact or #contact"
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
