'use client';

import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Save, 
  CheckCircle2, 
  ExternalLink,
  Eye,
  FileCheck
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';
import { SiteSettings } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminResumePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSiteSettings();
      setSettings(data);
    }
    load();
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please upload a PDF document.');
      return;
    }

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, resumeUrl: data.url });
      } else {
        alert(data.error || 'Resume upload failed');
      }
    } catch {
      alert('Upload failed. Please check network connection.');
    } finally {
      setUploadingResume(false);
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
      alert('Failed to save Resume configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading Resume CMS...
        </p>
      </div>
    );
  }

  const currentResumeUrl = settings.resumeUrl || '/resume.pdf';

  return (
    <form onSubmit={handleSave} className="space-y-10 font-sans max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            CREDENTIALS CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight">
            Resume &amp; Curriculum Vitae
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Upload the latest PDF resume, configure download links, and test browser viewing.
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
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="p-8 border border-charcoal/15 bg-ivory space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
            <FileText className="w-4 h-4" />
            <span>Active Resume Document</span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-400">
            PDF FORMAT ONLY
          </span>
        </div>

        <div className="p-6 border border-dashed border-charcoal/30 bg-charcoal-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-charcoal text-ivory flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6 text-copper" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-charcoal truncate max-w-sm">
                {currentResumeUrl.split('/').pop() || 'Abdul_Ahad_Resume.pdf'}
              </div>
              <div className="text-xs font-mono text-charcoal-500 mt-0.5">
                Target URL: {currentResumeUrl}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={currentResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 border border-charcoal/20 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal hover:border-copper hover:text-copper transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </a>
            <a
              href={currentResumeUrl}
              download
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-copper" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Upload Button & URL Override */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-copper-600 transition-colors">
              <Upload className="w-3.5 h-3.5 text-ivory" />
              <span>{uploadingResume ? 'Uploading PDF to Storage...' : 'Upload New Resume PDF'}</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={uploadingResume}
              />
            </label>
            <span className="text-xs text-charcoal-500 font-sans">
              Max file size: 10MB. Automatically stored in Cloudflare R2 / Supabase.
            </span>
          </div>

          <Input
            label="Resume URL (Custom CDN or Static Path)"
            value={settings.resumeUrl || ''}
            onChange={(e) => setSettings({ ...settings, resumeUrl: e.target.value })}
            placeholder="/resume.pdf or https://media.abdulahad.design/uploads/resume.pdf"
            className="text-xs font-mono"
          />
        </div>
      </div>

      {/* Embedded Live PDF Frame Preview */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans uppercase tracking-widest text-charcoal font-bold">
            Interactive Browser Preview
          </span>
          <a
            href={currentResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-copper hover:underline inline-flex items-center gap-1"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="w-full h-[540px] border border-charcoal/20 bg-charcoal-900">
          <iframe
            src={currentResumeUrl}
            title="Resume PDF Preview"
            className="w-full h-full"
          />
        </div>
      </div>
    </form>
  );
}
