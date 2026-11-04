'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  PanelTop, 
  Save, 
  CheckCircle2, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export default function AdminHeaderFooterCMS() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleFileUpload = async (file: File, field: keyof SiteSettings) => {
    if (!file || !settings) return;
    setUploadingField(field);

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
      setUploadingField(null);
    }
  };

  const handleAddNavLink = () => {
    if (!settings) return;
    const current = settings.headerNavLinks || [];
    const nextIndex = `0${current.length + 1}`;
    const newLinks = [
      ...current,
      { label: 'New Link', href: '/custom', index: nextIndex }
    ];
    setSettings({ ...settings, headerNavLinks: newLinks });
  };

  const handleUpdateNavLink = (idx: number, key: 'label' | 'href', value: string) => {
    if (!settings) return;
    const updated = [...(settings.headerNavLinks || [])];
    if (updated[idx]) {
      updated[idx] = { ...updated[idx], [key]: value };
      setSettings({ ...settings, headerNavLinks: updated });
    }
  };

  const handleRemoveNavLink = (idx: number) => {
    if (!settings) return;
    const updated = (settings.headerNavLinks || []).filter((_, i) => i !== idx);
    setSettings({ ...settings, headerNavLinks: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setIsSuccess(false);

    try {
      await updateSiteSettings(settings);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      alert('Failed to save header and footer settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading Header &amp; Footer CMS...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-10 font-sans max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            GLOBAL SHELL CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight flex items-center gap-3">
            <PanelTop className="w-7 h-7 text-copper" />
            Header &amp; Footer Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage your navigation bar, logos, availability beacon, call-to-actions, and footer branding.
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
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: HEADER & NAVIGATION
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Sparkles className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Header Branding &amp; Logo Variants
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Light Logo (for dark background) */}
          <div className="space-y-3 p-4 border border-charcoal/15 bg-charcoal text-ivory">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-copper block">
              Light Logo (Used on Dark Theme)
            </span>
            <div className="h-16 flex items-center justify-center p-2 border border-charcoal-700 bg-charcoal-900">
              <SafeImage
                src={settings.headerLogoLightUrl || '/brand/logo-wordmark-clean-light.png'}
                alt="Light Logo"
                width={180}
                height={34}
                className="max-h-10 object-contain"
              />
            </div>
            <Input
              value={settings.headerLogoLightUrl || ''}
              onChange={(e) => setSettings({ ...settings, headerLogoLightUrl: e.target.value })}
              placeholder="/brand/logo-wordmark-clean-light.png"
            />
            <label className="inline-block px-3 py-1.5 bg-copper text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper/90">
              {uploadingField === 'headerLogoLightUrl' ? 'Uploading...' : 'Upload Light Logo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'headerLogoLightUrl')}
              />
            </label>
          </div>

          {/* Dark Logo (for light background) */}
          <div className="space-y-3 p-4 border border-charcoal/15 bg-ivory text-charcoal">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Dark Logo (Used on Light Theme)
            </span>
            <div className="h-16 flex items-center justify-center p-2 border border-charcoal/20 bg-charcoal/5">
              <SafeImage
                src={settings.headerLogoDarkUrl || '/brand/logo-wordmark-clean-dark.png'}
                alt="Dark Logo"
                width={180}
                height={34}
                className="max-h-10 object-contain"
              />
            </div>
            <Input
              value={settings.headerLogoDarkUrl || ''}
              onChange={(e) => setSettings({ ...settings, headerLogoDarkUrl: e.target.value })}
              placeholder="/brand/logo-wordmark-clean-dark.png"
            />
            <label className="inline-block px-3 py-1.5 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper">
              {uploadingField === 'headerLogoDarkUrl' ? 'Uploading...' : 'Upload Dark Logo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'headerLogoDarkUrl')}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Logo Alternative Text (Accessibility &amp; SEO)
            </label>
            <Input
              value={settings.logoAltText || ''}
              onChange={(e) => setSettings({ ...settings, logoAltText: e.target.value })}
              placeholder="Abdul Ahad J — Creative Designer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Location &amp; Time Text
            </label>
            <Input
              value={settings.locationTimeText || ''}
              onChange={(e) => setSettings({ ...settings, locationTimeText: e.target.value })}
              placeholder="Coimbatore, IN"
            />
            <p className="text-[11px] text-charcoal-500">Live Indian Standard Time (IST) is appended automatically.</p>
          </div>
        </div>

        {/* Availability Beacon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-charcoal/10 bg-sage/5">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Availability Beacon Status
            </label>
            <Input
              value={settings.availabilityStatus || ''}
              onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
              placeholder="Available for New Projects"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Detailed Availability Note
            </label>
            <Input
              value={settings.availabilityMessage || ''}
              onChange={(e) => setSettings({ ...settings, availabilityMessage: e.target.value })}
              placeholder="Taking select visual branding retainers & Q1 briefs"
            />
          </div>
        </div>

        {/* Header Action Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-charcoal/10 bg-charcoal-50/50">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Header CTA Button Text
            </label>
            <Input
              value={settings.headerCtaText || ''}
              onChange={(e) => setSettings({ ...settings, headerCtaText: e.target.value })}
              placeholder="Initiate Brief"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Header CTA Destination Link
            </label>
            <Input
              value={settings.headerCtaHref || ''}
              onChange={(e) => setSettings({ ...settings, headerCtaHref: e.target.value })}
              placeholder="/contact"
            />
          </div>
        </div>

        {/* Navigation Links List */}
        <div className="space-y-3 pt-4 border-t border-charcoal/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Header Navigation Links
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddNavLink}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Link
            </Button>
          </div>

          <div className="space-y-2">
            {(settings.headerNavLinks || []).map((link, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 border border-charcoal/15 bg-white">
                <span className="font-mono text-xs text-charcoal-400 w-8">{link.index || `0${idx + 1}`}</span>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={link.label}
                    onChange={(e) => handleUpdateNavLink(idx, 'label', e.target.value)}
                    placeholder="Link Label (e.g. Work)"
                  />
                  <Input
                    value={link.href}
                    onChange={(e) => handleUpdateNavLink(idx, 'href', e.target.value)}
                    placeholder="Destination (e.g. /work)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveNavLink(idx)}
                  className="p-2 text-charcoal-400 hover:text-red-600 transition-colors"
                  title="Remove Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: FOOTER MANAGEMENT
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-ivory border border-charcoal/15 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Sparkles className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Footer Details &amp; Contact Coordinates
          </h2>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Footer Bio Description
          </label>
          <Textarea
            rows={3}
            value={settings.footerDescription || ''}
            onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
            placeholder="Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Email Address
            </label>
            <Input
              type="email"
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              WhatsApp Direct Number
            </label>
            <Input
              value={settings.whatsappNumber || settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              placeholder="+91 9150037005"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Behance Profile URL
            </label>
            <Input
              value={settings.behanceUrl || ''}
              onChange={(e) => setSettings({ ...settings, behanceUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              LinkedIn Profile URL
            </label>
            <Input
              value={settings.linkedinUrl || ''}
              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Instagram Profile URL (Optional)
            </label>
            <Input
              value={settings.instagramUrl || ''}
              onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Dribbble Profile URL (Optional)
            </label>
            <Input
              value={settings.dribbbleUrl || ''}
              onChange={(e) => setSettings({ ...settings, dribbbleUrl: e.target.value })}
              placeholder="https://dribbble.com/..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Oversized Brand Statement / Logo Wordmark
            </label>
            <Input
              value={settings.footerBrandStatement || ''}
              onChange={(e) => setSettings({ ...settings, footerBrandStatement: e.target.value })}
              placeholder="Abdul Ahad"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Copyright Text
            </label>
            <Input
              value={settings.footerCopyright || ''}
              onChange={(e) => setSettings({ ...settings, footerCopyright: e.target.value })}
              placeholder="Abdul Ahad J. All rights reserved."
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-6 z-20 p-4 bg-charcoal text-ivory border border-charcoal-700 flex items-center justify-between shadow-2xl">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-sans text-charcoal-300 hover:text-copper flex items-center gap-1"
        >
          <span>Preview Live Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save Header &amp; Footer Changes
        </Button>
      </div>
    </form>
  );
}
