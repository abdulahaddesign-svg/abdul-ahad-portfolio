'use client';

import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, RefreshCw } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminContentPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

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
    <form onSubmit={handleSave} className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Global Configuration
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            Site Content & Profile CMS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-sage-700">
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
            Save Site Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Homepage & Brand Settings */}
        <div className="lg:col-span-6 space-y-8">
          {/* Brand & Hero Typography */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              1. Brand Identity & Homepage Hero
            </h2>

            <Input
              label="Professional Name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />

            <Input
              label="Professional Subtitle"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            />

            <Input
              label="Brand Tagline"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />

            <Input
              label="Hero Headline"
              value={settings.heroHeadline}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
            />

            <Textarea
              label="Hero Supporting Copy"
              rows={3}
              value={settings.heroSupportingCopy}
              onChange={(e) => setSettings({ ...settings, heroSupportingCopy: e.target.value })}
            />
          </div>

          {/* Contact & Social Links */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              2. Contact Information & Links
            </h2>

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
        </div>

        {/* Right Column: Bio, Philosophy & Academic Info */}
        <div className="lg:col-span-6 space-y-8">
          {/* About Biography & Philosophy */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              3. Biography & Creative Philosophy
            </h2>

            <Textarea
              label="Professional Summary / Intro"
              rows={4}
              value={settings.aboutIntro}
              onChange={(e) => setSettings({ ...settings, aboutIntro: e.target.value })}
            />

            <Textarea
              label="Creative Philosophy Quote"
              rows={3}
              value={settings.aboutPhilosophy}
              onChange={(e) => setSettings({ ...settings, aboutPhilosophy: e.target.value })}
            />
          </div>

          {/* Education & Verified Resume Credentials */}
          <div className="p-6 bg-white border border-charcoal/15 space-y-4">
            <h2 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              4. Verified Education Credentials
            </h2>

            <Input
              label="Degree Title"
              value={settings.educationDegree}
              onChange={(e) => setSettings({ ...settings, educationDegree: e.target.value })}
            />

            <Input
              label="College / Institution"
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

          <div className="p-6 bg-charcoal text-ivory space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSaving}
            >
              Update Global Content
            </Button>
            <p className="text-[11px] font-sans text-charcoal-400 text-center">
              All edits take effect across the live website and public feeds.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
