'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Save, 
  CheckCircle2, 
  Upload, 
  FileText, 
  User, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ExternalLink 
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminContentPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'photo' | 'resume'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    if (type === 'photo') setUploadingPhoto(true);
    if (type === 'resume') setUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (type === 'photo') {
          setSettings({ ...settings, profilePhotoUrl: data.url });
        } else {
          setSettings({ ...settings, resumeUrl: data.url });
        }
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed. Please check network connection.');
    } finally {
      if (type === 'photo') setUploadingPhoto(false);
      if (type === 'resume') setUploadingResume(false);
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
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="py-20 text-center text-xs font-sans text-charcoal-400">
        Loading site content...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-10 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Global Content Management
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            About &amp; Site Configuration CMS
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Edit profile photo, editorial headlines, bio, experience summaries, and resume download.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-sage-700 bg-sage/10 px-3 py-1.5">
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
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dedicated About & Editorial Narrative (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section: Editorial About Headline & Narrative */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-charcoal/10 text-charcoal">
              <User className="w-5 h-5 text-copper" />
              <h2 className="font-display font-bold text-lg">
                1. Editorial About Narrative &amp; Bio
              </h2>
            </div>

            <Input
              label="About Section Headline *"
              value={settings.aboutHeadline || ''}
              onChange={(e) => setSettings({ ...settings, aboutHeadline: e.target.value })}
              placeholder="e.g. I create visual experiences that make ideas matter."
            />

            <Textarea
              label="Short Professional Introduction *"
              rows={3}
              value={settings.aboutIntro || ''}
              onChange={(e) => setSettings({ ...settings, aboutIntro: e.target.value })}
              placeholder="e.g. Abdul Ahad J is a creative designer based in Coimbatore..."
            />

            <Textarea
              label="Professional Description / Career Scope *"
              rows={4}
              value={settings.aboutDescription || ''}
              onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
              placeholder="Detailed background across enterprise, SaaS, freelance, and awards..."
            />

            <Textarea
              label="Creative Philosophy Quote"
              rows={3}
              value={settings.aboutPhilosophy || ''}
              onChange={(e) => setSettings({ ...settings, aboutPhilosophy: e.target.value })}
              placeholder="e.g. Design is not decorative styling; it is clear thinking made visible..."
            />
          </div>

          {/* Section: Profile Portrait Image */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-5">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              2. Profile Portrait Image
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Profile Photo Asset
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.profilePhotoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, profilePhotoUrl: e.target.value })}
                  placeholder="/profile/abdul-ahad-portrait.svg or https://..."
                  className="flex-1 px-3 py-2 border border-charcoal/20 bg-ivory text-xs font-mono focus:outline-none focus:border-copper"
                />
                <label className="px-4 py-2 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper transition-colors flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingPhoto ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                </label>
              </div>
            </div>

            {settings.profilePhotoUrl && (
              <div className="p-3 bg-ivory border border-charcoal/10 flex items-center gap-4">
                <div className="relative w-16 h-20 bg-charcoal shrink-0 border border-charcoal/20 overflow-hidden">
                  <Image
                    src={settings.profilePhotoUrl}
                    alt="Current portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-bold text-charcoal block">Current Portrait Preview</span>
                  <span className="text-charcoal-500 font-mono text-[11px] truncate max-w-xs block">
                    {settings.profilePhotoUrl}
                  </span>
                </div>
              </div>
            )}

            <Input
              label="Photo Alt Text"
              value={settings.profilePhotoAlt || ''}
              onChange={(e) => setSettings({ ...settings, profilePhotoAlt: e.target.value })}
              placeholder="e.g. Abdul Ahad J — Creative Designer & Visual Specialist"
            />
          </div>

          {/* Section: Resume PDF Management */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-charcoal/10 text-charcoal">
              <FileText className="w-5 h-5 text-copper" />
              <h2 className="font-display font-bold text-lg">
                3. Resume PDF Download Management
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Resume PDF File URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.resumeUrl || ''}
                  onChange={(e) => setSettings({ ...settings, resumeUrl: e.target.value })}
                  placeholder="/resume/abdul-ahad-resume.pdf or https://..."
                  className="flex-1 px-3 py-2 border border-charcoal/20 bg-ivory text-xs font-mono focus:outline-none focus:border-copper"
                />
                <label className="px-4 py-2 bg-charcoal text-ivory text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-copper transition-colors flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingResume ? 'Uploading...' : 'Upload PDF'}</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'resume')}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Download Button Label"
                value={settings.resumeLabel || 'PDF · Updated Resume'}
                onChange={(e) => setSettings({ ...settings, resumeLabel: e.target.value })}
              />

              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={settings.resumeVisible ?? true}
                    onChange={(e) =>
                      setSettings({ ...settings, resumeVisible: e.target.checked })
                    }
                    className="w-4 h-4 accent-copper"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                    Display Resume Button on Site
                  </span>
                </label>
              </div>
            </div>

            {settings.resumeUrl && (
              <div className="p-3 bg-ivory border border-charcoal/10 flex items-center justify-between text-xs">
                <span className="text-charcoal font-medium truncate max-w-[70%]">
                  Active Resume: {settings.resumeUrl}
                </span>
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-copper font-bold hover:underline"
                >
                  Test PDF <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Experience Highlights, Brand Identity & Contact (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Section: Experience & Highlights Summary */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              4. Experience &amp; Highlights Summary
            </h2>

            <Input
              label="Years of Experience"
              value={settings.experienceYears || '3+ Years'}
              onChange={(e) => setSettings({ ...settings, experienceYears: e.target.value })}
            />

            <Input
              label="Key Honors &amp; Achievements"
              value={settings.achievementsSummary || 'Best Employee 2025 at eClerx · 50+ Clients'}
              onChange={(e) => setSettings({ ...settings, achievementsSummary: e.target.value })}
            />
          </div>

          {/* Section: Brand & Contact Coordinates */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              5. Contact &amp; Channels
            </h2>

            <Input
              label="Professional Name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />

            <Input
              label="Professional Title"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            />

            <Input
              label="Contact Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />

            <Input
              label="Contact Phone / WhatsApp"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />

            <Input
              label="Location"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
            />

            <Input
              label="Behance Profile URL"
              value={settings.behanceUrl}
              onChange={(e) => setSettings({ ...settings, behanceUrl: e.target.value })}
            />

            <Input
              label="LinkedIn Profile URL"
              value={settings.linkedinUrl}
              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
            />
          </div>

          {/* Section: Academic Background */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              6. Academic Background
            </h2>

            <Input
              label="Degree Title"
              value={settings.educationDegree}
              onChange={(e) => setSettings({ ...settings, educationDegree: e.target.value })}
            />

            <Input
              label="Institution"
              value={settings.educationInstitution}
              onChange={(e) => setSettings({ ...settings, educationInstitution: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Timeline / Year"
                value={settings.educationYear}
                onChange={(e) => setSettings({ ...settings, educationYear: e.target.value })}
              />

              <Input
                label="Aggregate Score"
                value={settings.educationAggregate}
                onChange={(e) => setSettings({ ...settings, educationAggregate: e.target.value })}
              />
            </div>
          </div>

          {/* Save Action Box */}
          <div className="p-6 bg-charcoal text-ivory space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSaving}
            >
              Publish Updates to Live Site
            </Button>
            <p className="text-[11px] font-sans text-charcoal-400 text-center">
              Updates take effect immediately on public pages without rebuilding code.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}