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
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

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
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, [field]: data.url });
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed. Please check network.');
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
            Homepage Hero Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage your opening headline, subtitle, professional credentials, call-to-actions, and background monogram.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-sage bg-sage/10 px-3 py-1.5 border border-sage/30">
              <CheckCircle2 className="w-4 h-4 text-sage" /> Saved to Production!
            </span>
          )}
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            icon={<Save className="w-4 h-4" />}
            onClick={(e) => handleSave(e)}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Section 1: Main Typography Headlines */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Sparkles className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Primary Typography &amp; Headlines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Main Headline (Line 1)
            </label>
            <Input
              value={settings.heroHeadline || ''}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
              placeholder="e.g. ABDUL AHAD"
              required
            />
            <p className="text-[11px] text-charcoal-500">Displays in giant oversized Space Grotesk font.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Headline Line 2 (Optional Accent Line)
            </label>
            <Input
              value={settings.heroHeadlineLine2 || ''}
              onChange={(e) => setSettings({ ...settings, heroHeadlineLine2: e.target.value })}
              placeholder="e.g. DESIGN STUDIO"
            />
            <p className="text-[11px] text-charcoal-500">Renders in burnt copper accent directly below Line 1.</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Professional Title / Capability Subtitle
          </label>
          <Input
            value={settings.heroTitle || settings.title || ''}
            onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value, title: e.target.value })}
            placeholder="CREATIVE DESIGNER & DIGITAL CREATIVE PARTNER"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Location Label
            </label>
            <Input
              value={settings.heroLocationLabel || settings.location || ''}
              onChange={(e) => setSettings({ ...settings, heroLocationLabel: e.target.value })}
              placeholder="Coimbatore, Tamil Nadu, India"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Highlighted Keywords
            </label>
            <Input
              value={settings.heroHighlightedWords || ''}
              onChange={(e) => setSettings({ ...settings, heroHighlightedWords: e.target.value })}
              placeholder="Branding, UI/UX, Motion"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Narrative Introduction Copy */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-4 border-b border-charcoal/10">
          Hero Narrative Introduction
        </h2>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Primary Introduction Paragraph
          </label>
          <Textarea
            rows={3}
            value={settings.heroSupportingCopy || ''}
            onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
            placeholder="I create thoughtful visual identities, digital experiences, and motion-led content for brands that want to stand out."
          />
          <p className="text-[11px] text-charcoal-500">High-contrast, prominent leading text (22px).</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Secondary Supporting Description
          </label>
          <Textarea
            rows={3}
            value={settings.heroIntroSecondary || ''}
            onChange={(e) => setSettings({ ...settings, heroIntroSecondary: e.target.value })}
            placeholder="Combining visual design, typography, and human-centered design thinking to deliver precise creative solutions..."
          />
        </div>
      </div>

      {/* Section 3: Call-to-Actions (Buttons) */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-4 border-b border-charcoal/10">
          Hero Action CTAs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 border border-charcoal/10 bg-charcoal-50/50">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-copper block">
              Primary Button (Solid Dark)
            </span>
            <div>
              <label className="text-[11px] font-sans font-semibold text-charcoal-700">Button Label</label>
              <Input
                value={settings.heroPrimaryCtaText || 'Explore My Work'}
                onChange={(e) => setSettings({ ...settings, heroPrimaryCtaText: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-sans font-semibold text-charcoal-700">Destination Link / Anchor</label>
              <Input
                value={settings.heroPrimaryCtaHref || '#portfolio-strip'}
                onChange={(e) => setSettings({ ...settings, heroPrimaryCtaHref: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3 p-4 border border-charcoal/10 bg-charcoal-50/50">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Secondary Button (Bordered Outlined)
            </span>
            <div>
              <label className="text-[11px] font-sans font-semibold text-charcoal-700">Button Label</label>
              <Input
                value={settings.heroSecondaryCtaText || 'Start a Project'}
                onChange={(e) => setSettings({ ...settings, heroSecondaryCtaText: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-sans font-semibold text-charcoal-700">Destination Link</label>
              <Input
                value={settings.heroSecondaryCtaHref || '/contact'}
                onChange={(e) => setSettings({ ...settings, heroSecondaryCtaHref: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Visuals & Watermark Monogram */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <h2 className="font-display font-bold text-lg text-charcoal pb-4 border-b border-charcoal/10">
          Visual Assets &amp; Motion Controls
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {/* Monogram Watermark */}
          <div className="space-y-3">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Hero Monogram Watermark
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.heroMonogramVisible !== false}
                  onChange={(e) => setSettings({ ...settings, heroMonogramVisible: e.target.checked })}
                  className="rounded border-charcoal/30 text-copper focus:ring-copper"
                />
                <span className="text-xs font-sans font-semibold text-charcoal">
                  Display subtle monogram watermark in background
                </span>
              </label>
            </div>

            <div className="relative w-36 h-28 border border-charcoal/20 bg-charcoal/5 flex items-center justify-center p-2">
              <SafeImage
                src={settings.heroMonogramUrl || '/brand/logo-monogram-light.png'}
                alt="Monogram"
                width={120}
                height={80}
                className="max-h-full object-contain"
              />
            </div>

            <Input
              value={settings.heroMonogramUrl || ''}
              onChange={(e) => setSettings({ ...settings, heroMonogramUrl: e.target.value })}
              placeholder="/brand/logo-monogram-light.png"
            />
          </div>

          {/* Hero Background Texture */}
          <div className="space-y-3">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Optional Background Overlay Image
            </label>
            {settings.heroBgImage ? (
              <div className="relative w-full aspect-video border border-charcoal/20 overflow-hidden bg-charcoal-900">
                <SafeImage
                  src={settings.heroBgImage}
                  alt="Hero Background"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, heroBgImage: '' })}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-6 border-2 border-dashed border-charcoal/20 text-center space-y-2">
                <ImageIcon className="w-6 h-6 text-charcoal-400 mx-auto" />
                <p className="text-xs text-charcoal-500">No background image active (uses clean ivory aesthetic)</p>
                <label className="inline-block px-3 py-1.5 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper">
                  {uploadingBg ? 'Uploading...' : 'Upload Background'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'heroBgImage')}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Animation toggle */}
        <div className="pt-4 border-t border-charcoal/10">
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

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-6 z-20 p-4 bg-charcoal text-ivory border border-charcoal-700 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-sans text-charcoal-300 hover:text-copper flex items-center gap-1"
          >
            <span>Preview Live Homepage</span>
            <ExternalLink className="w-3.5 h-3.5" />
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

function ExternalLink(props: any) {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}
