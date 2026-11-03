'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  Share2,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
      await updateSiteSettings(settings);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      alert('Failed to save website settings.');
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
    <form onSubmit={handleSave} className="space-y-10 font-sans max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            CONFIGURATION CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight">
            Website Settings &amp; SEO
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Configure global website metadata, contact channels, social profiles, and brand assets.
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
          >
            Save All Settings
          </Button>
        </div>
      </div>

      {/* 1. Contact & Communication Channels */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <Mail className="w-4 h-4" />
          <span>Contact &amp; Client Inquiry Channels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Direct Email Address"
            type="email"
            value={settings.email || ''}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            required
          />
          <Input
            label="WhatsApp / Phone Number"
            value={settings.phone || ''}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            placeholder="+91 9150037005"
            required
          />
        </div>
      </div>

      {/* 2. Professional Social Profiles */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <Share2 className="w-4 h-4" />
          <span>Social Media &amp; Portfolio Networks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Behance Profile URL"
            value={settings.behanceUrl || ''}
            onChange={(e) => setSettings({ ...settings, behanceUrl: e.target.value })}
            placeholder="https://www.behance.net/abdulahad438"
          />
          <Input
            label="LinkedIn Profile URL"
            value={settings.linkedinUrl || ''}
            onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
            placeholder="https://www.linkedin.com/in/abdulahadj"
          />
          <Input
            label="Instagram Profile URL"
            value={settings.instagramUrl || ''}
            onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
            placeholder="https://www.instagram.com/abdulahad"
          />
          <Input
            label="Dribbble Profile URL"
            value={settings.dribbbleUrl || ''}
            onChange={(e) => setSettings({ ...settings, dribbbleUrl: e.target.value })}
            placeholder="https://dribbble.com/abdulahad"
          />
        </div>
      </div>

      {/* 3. Official Wordmark Logos (Light & Dark Mode) */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <ImageIcon className="w-4 h-4" />
          <span>Official Footer Wordmark Brand Logos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Light Mode Wordmark */}
          <div className="p-5 border border-charcoal/15 bg-ivory space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Light Mode Wordmark (Dark Text on Ivory)
            </span>
            <div className="h-20 bg-ivory-100 border border-charcoal/10 flex items-center justify-center p-3">
              <Image
                src={settings.footerLogoLightUrl || '/brand/logo-wordmark-clean-light.png'}
                alt="Light Wordmark Preview"
                width={200}
                height={50}
                className="max-h-12 w-auto object-contain"
                unoptimized
              />
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-copper transition-colors">
              <Upload className="w-3 h-3 text-copper" />
              <span>{uploadingFooterLight ? 'Uploading...' : 'Replace Light Logo'}</span>
              <input
                type="file"
                accept="image/png,image/svg+xml,image/webp"
                onChange={(e) => handleLogoUpload(e, 'light')}
                className="hidden"
                disabled={uploadingFooterLight}
              />
            </label>
          </div>

          {/* Dark Mode Wordmark */}
          <div className="p-5 border border-charcoal/15 bg-charcoal text-ivory space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-ivory block">
              Dark Mode Wordmark (Ivory Text on Dark)
            </span>
            <div className="h-20 bg-charcoal-900 border border-charcoal-800 flex items-center justify-center p-3">
              <Image
                src={settings.footerLogoDarkUrl || '/brand/logo-wordmark-clean-dark.png'}
                alt="Dark Wordmark Preview"
                width={200}
                height={50}
                className="max-h-12 w-auto object-contain"
                unoptimized
              />
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-copper-600 transition-colors">
              <Upload className="w-3 h-3 text-ivory" />
              <span>{uploadingFooterDark ? 'Uploading...' : 'Replace Dark Logo'}</span>
              <input
                type="file"
                accept="image/png,image/svg+xml,image/webp"
                onChange={(e) => handleLogoUpload(e, 'dark')}
                className="hidden"
                disabled={uploadingFooterDark}
              />
            </label>
          </div>
        </div>
      </div>

      {/* 4. Footer Narrative & Copyright */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-4">
        <div className="text-xs font-sans uppercase tracking-widest text-copper font-bold">
          FOOTER EDITORIAL COPY &amp; COPYRIGHT
        </div>
        <Textarea
          label="Footer Editorial Description"
          value={settings.footerDescription || ''}
          onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
          rows={3}
        />
        <Input
          label="Copyright Notice"
          value={settings.footerCopyright || ''}
          onChange={(e) => setSettings({ ...settings, footerCopyright: e.target.value })}
          placeholder="Abdul Ahad J. All rights reserved."
        />
      </div>

      {/* Save Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save All Settings
        </Button>
      </div>
    </form>
  );
}
