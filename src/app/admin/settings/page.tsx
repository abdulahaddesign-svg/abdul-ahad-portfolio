'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  Share2,
  Sparkles,
  ArrowRight,
  Shield,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingFooterLight, setUploadingFooterLight] = useState(false);
  const [uploadingFooterDark, setUploadingFooterDark] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    variant: 'light' | 'dark'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    if (variant === 'light') setUploadingFooterLight(true);
    if (variant === 'dark') setUploadingFooterDark(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (variant === 'light') {
          setSettings({ ...settings, footerLogoLightUrl: data.url });
        } else {
          setSettings({ ...settings, footerLogoDarkUrl: data.url });
        }
      } else {
        alert(data.error || 'Logo upload failed');
      }
    } catch {
      alert('Upload failed. Please check network connection.');
    } finally {
      if (variant === 'light') setUploadingFooterLight(false);
      if (variant === 'dark') setUploadingFooterDark(false);
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
      alert(err.message || 'Failed to save website settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading Website Settings...
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
            CONFIGURATION CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight flex items-center gap-3">
            <Settings className="w-7 h-7 text-copper" />
            Website Settings &amp; SEO
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Configure global website metadata, search engine optimization (SEO), brand identity colors, and contact info.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-sage bg-sage/10 px-3 py-1.5 border border-sage/30">
              <CheckCircle2 className="w-4 h-4 text-sage" /> Saved Successfully!
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
            Save All Settings
          </Button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/homepage"
          className="p-4 border border-charcoal/15 bg-white hover:border-copper transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-sans font-bold uppercase text-copper block">Content CMS</span>
            <span className="font-display font-bold text-base text-charcoal">Homepage Hero &amp; Headlines</span>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/header-footer"
          className="p-4 border border-charcoal/15 bg-white hover:border-copper transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-sans font-bold uppercase text-copper block">Layout CMS</span>
            <span className="font-display font-bold text-base text-charcoal">Header Navigation &amp; Footer</span>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* 1. Global Identity & SEO */}
      <div className="p-6 sm:p-8 border border-charcoal/15 bg-ivory space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Globe className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Global Search Engine Optimization (SEO) &amp; Metadata
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Website Owner Name
            </label>
            <Input
              value={settings.name || ''}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Default Theme
            </label>
            <select
              value={settings.defaultTheme || 'dark'}
              onChange={(e) => setSettings({ ...settings, defaultTheme: e.target.value as 'light' | 'dark' })}
              className="w-full px-3 py-2.5 border border-charcoal/20 bg-white text-xs font-sans font-bold uppercase focus:outline-none focus:border-copper"
            >
              <option value="dark">Dark Theme (Charcoal / Ivory Accent)</option>
              <option value="light">Light Theme (Ivory / Charcoal Accent)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Default SEO Page Title
          </label>
          <Input
            value={settings.defaultSeoTitle || settings.title || ''}
            onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
            placeholder="Abdul Ahad J — Graphic Designer & Visual Branding Specialist | Coimbatore"
          />
          <p className="text-[11px] text-charcoal-500">Appears in Google search snippets and browser tab titles.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Default SEO Meta Description
          </label>
          <Textarea
            rows={3}
            value={settings.defaultSeoDescription || ''}
            onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
            placeholder="Portfolio of Abdul Ahad J, a multidisciplinary creative designer in Coimbatore, Tamil Nadu, India. Specializing in brand identity, marketing collateral, UI/UX design, and motion graphics."
          />
        </div>

        {/* Primary Brand Color */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Palette className="w-4 h-4 text-copper" />
              Primary Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryBrandColor || '#C4855A'}
                onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                className="w-10 h-10 border border-charcoal/20 cursor-pointer p-0.5 bg-white"
              />
              <Input
                value={settings.primaryBrandColor || '#C4855A'}
                onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                className="font-mono text-xs uppercase"
              />
            </div>
            <p className="text-[11px] text-charcoal-500">Default Burnt Copper: #C4855A</p>
          </div>
        </div>
      </div>

      {/* 2. Contact & Client Inquiry Channels */}
      <div className="p-6 sm:p-8 border border-charcoal/15 bg-ivory space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Mail className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Contact &amp; Client Inquiry Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Direct Contact Email
            </label>
            <Input
              type="email"
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Phone / WhatsApp Number
            </label>
            <Input
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value, whatsappNumber: e.target.value })}
              placeholder="+91 9150037005"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
            Physical Location
          </label>
          <Input
            value={settings.location || ''}
            onChange={(e) => setSettings({ ...settings, location: e.target.value })}
            placeholder="Coimbatore, Tamil Nadu, India"
          />
        </div>
      </div>

      {/* 3. Professional Social Profiles */}
      <div className="p-6 sm:p-8 border border-charcoal/15 bg-ivory space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-charcoal/10">
          <Share2 className="w-4 h-4 text-copper" />
          <h2 className="font-display font-bold text-lg text-charcoal">
            Social Networks &amp; Portfolio Handles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Behance Portfolio URL
            </label>
            <Input
              value={settings.behanceUrl || ''}
              onChange={(e) => setSettings({ ...settings, behanceUrl: e.target.value })}
              placeholder="https://www.behance.net/abdulahad438"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              LinkedIn Profile URL
            </label>
            <Input
              value={settings.linkedinUrl || ''}
              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
              placeholder="https://www.linkedin.com/in/abdulahadj"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Instagram Profile URL
            </label>
            <Input
              value={settings.instagramUrl || ''}
              onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
              placeholder="https://www.instagram.com/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Dribbble Profile URL
            </label>
            <Input
              value={settings.dribbbleUrl || ''}
              onChange={(e) => setSettings({ ...settings, dribbbleUrl: e.target.value })}
              placeholder="https://dribbble.com/..."
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-6 z-20 p-4 bg-charcoal text-ivory border border-charcoal-700 flex items-center justify-between shadow-2xl">
        <div className="text-xs font-sans text-charcoal-300">
          All changes apply dynamically to public site via Next.js on-demand cache revalidation.
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save All Settings
        </Button>
      </div>
    </form>
  );
}
