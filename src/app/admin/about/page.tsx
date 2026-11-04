'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Save, 
  CheckCircle2, 
  Upload, 
  User, 
  Sparkles, 
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, profilePhotoUrl: data.url });
      } else {
        alert(data.error || 'Photo upload failed');
      }
    } catch {
      alert('Upload failed. Please check network connection.');
    } finally {
      setUploadingPhoto(false);
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
    } catch (err: any) {
      alert(err.message || 'Failed to save About section.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading About CMS...
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
            EDITORIAL CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight">
            About &amp; Biography Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage your official portrait photo, positioning headline, narrative bio, and creative capabilities.
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
            Save Changes
          </Button>
        </div>
      </div>

      {/* 1. Official Portrait Photo */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-4">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <User className="w-4 h-4" />
          <span>Official Portrait Photo</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
          <div className="relative w-36 h-48 border border-charcoal/20 bg-charcoal-900 shrink-0 overflow-hidden">
            {settings.profilePhotoUrl ? (
              <SafeImage
                src={settings.profilePhotoUrl}
                fallback="/profile/abdul-ahad.jpg"
                alt={settings.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ivory/40 text-xs font-mono">
                No Photo
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1">
            <p className="text-xs text-charcoal-600 font-sans leading-relaxed">
              Upload high-resolution editorial portrait photo. Displays in the About section on the homepage and about page.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-copper transition-colors">
                <Upload className="w-3.5 h-3.5 text-copper" />
                <span>{uploadingPhoto ? 'Uploading to R2...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploadingPhoto}
                />
              </label>
              {settings.profilePhotoUrl && (
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, profilePhotoUrl: '' })}
                  className="px-3 py-2 text-xs font-sans text-red-600 hover:text-red-700 underline"
                >
                  Remove Photo
                </button>
              )}
            </div>
            <Input
              label="Photo URL Override"
              value={settings.profilePhotoUrl || ''}
              onChange={(e) => setSettings({ ...settings, profilePhotoUrl: e.target.value })}
              placeholder="https://media.abdulahad.design/uploads/portrait.jpg"
              className="text-xs font-mono"
            />
            <Input
              label="Photo Alternative Text"
              value={settings.profilePhotoAlt || ''}
              onChange={(e) => setSettings({ ...settings, profilePhotoAlt: e.target.value })}
              placeholder="Abdul Ahad J — Creative Designer"
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* 2. Core Identity & Positioning */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Professional Identity &amp; Title</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Professional Name"
            value={settings.name || ''}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            required
          />
          <Input
            label="Professional Title"
            value={settings.title || ''}
            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            placeholder="Graphic Designer & Visual Branding Specialist"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            value={settings.location || ''}
            onChange={(e) => setSettings({ ...settings, location: e.target.value })}
            placeholder="Coimbatore, Tamil Nadu, India"
          />
          <Input
            label="Editorial Subtitle / Tagline"
            value={settings.tagline || ''}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            placeholder="Designed with intent. Made to matter."
          />
        </div>
      </div>

      {/* 3. Editorial Biography & Narrative */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <Briefcase className="w-4 h-4" />
          <span>Editorial Narrative &amp; Story</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Section Label"
            value={settings.aboutSectionLabel || 'BIOGRAPHY & CAPABILITIES'}
            onChange={(e) => setSettings({ ...settings, aboutSectionLabel: e.target.value })}
            placeholder="BIOGRAPHY & CAPABILITIES"
          />
          <Input
            label="Headline Statement"
            value={settings.aboutHeadline || ''}
            onChange={(e) => setSettings({ ...settings, aboutHeadline: e.target.value })}
            placeholder="DISCIPLINE IN VISUAL IDENTITY, STRATEGY AND MOTION."
          />
        </div>

        <Textarea
          label="Intro Summary (Displays on Homepage & Case Study Headers)"
          value={settings.aboutIntro || ''}
          onChange={(e) => setSettings({ ...settings, aboutIntro: e.target.value })}
          rows={3}
        />

        <Textarea
          label="Design Philosophy Statement"
          value={settings.aboutPhilosophy || ''}
          onChange={(e) => setSettings({ ...settings, aboutPhilosophy: e.target.value })}
          rows={3}
          placeholder="Design is not decorative styling; it is clear thinking made visible..."
        />

        <Textarea
          label="Full Biography (Displays on Dedicated /about Page)"
          value={settings.aboutBio || settings.aboutDescription || ''}
          onChange={(e) => setSettings({ ...settings, aboutBio: e.target.value, aboutDescription: e.target.value })}
          rows={6}
        />
      </div>

      {/* Quick link to Work Experience */}
      <div className="p-6 border border-copper/30 bg-copper/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-charcoal flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-copper" />
            Manage Career Timeline &amp; Experience
          </h3>
          <p className="text-xs text-charcoal-600 mt-1">
            Add, edit, reorder or hide employment history, company logos and verified achievements.
          </p>
        </div>
        <Link
          href="/admin/experience"
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper transition-colors"
        >
          <span>Open Work Experience CMS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4. Credentials & Education */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="text-xs font-sans uppercase tracking-widest text-copper font-bold">
          EDUCATION &amp; RECOGNITION
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Degree & Major"
            value={settings.educationDegree || ''}
            onChange={(e) => setSettings({ ...settings, educationDegree: e.target.value })}
            placeholder="B.Sc. Visual Communication"
          />
          <Input
            label="Institution / University"
            value={settings.educationInstitution || ''}
            onChange={(e) => setSettings({ ...settings, educationInstitution: e.target.value })}
            placeholder="PSG College of Arts & Science, Coimbatore"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save All Changes
        </Button>
      </div>
    </form>
  );
}
