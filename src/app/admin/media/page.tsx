'use client';

import React, { useState, useEffect } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import { Upload, Copy, Check, Trash2, ExternalLink, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { uploadMedia } from '@/lib/upload-client';
import { StorageMetrics } from '@/lib/types';

const INITIAL_MEDIA = [
  { id: 'm1', name: 'Reztro Cover', url: '/projects/reztro/reztro-cover.svg', size: '12 KB' },
  { id: 'm2', name: 'Reztro Brand Identity', url: '/projects/reztro/reztro-brand.svg', size: '15 KB' },
  { id: 'm3', name: 'Reztro Mobile Journey', url: '/projects/reztro/reztro-mobile-flow.svg', size: '18 KB' },
  { id: 'm4', name: 'Reztro Admin KDS', url: '/projects/reztro/reztro-admin.svg', size: '14 KB' },
  { id: 'm5', name: 'Falcon Square Cover', url: '/projects/falcon/falcon-cover.svg', size: '16 KB' },
  { id: 'm6', name: 'eClerx Global Campaign', url: '/projects/eclerx/eclerx-cover.svg', size: '14 KB' },
  { id: 'm7', name: 'Visual Identity Suite', url: '/projects/freelance/branding-cover.svg', size: '16 KB' },
  { id: 'm8', name: 'Motion Graphics Reels', url: '/projects/motion/motion-cover.svg', size: '17 KB' },
  { id: 'm9', name: '20+ Hero Concepts', url: '/projects/web/hero-collection-cover.svg', size: '15 KB' },
  { id: 'm10', name: 'Abdul Ahad Logo Wordmark', url: '/brand/logo-wordmark-light.svg', size: '4 KB' },
  { id: 'm11', name: 'AA Monogram Geometric', url: '/brand/logo-monogram-light.svg', size: '3 KB' },
];

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState(INITIAL_MEDIA);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [storage, setStorage] = useState<StorageMetrics | null>(null);

  useEffect(() => {
    fetch('/api/admin/storage')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStorage(data);
      })
      .catch(() => {});
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = await uploadMedia(file);
      if (data.url) {
        const newItem = {
          id: `m-${Date.now()}`,
          name: data.name || file.name,
          url: data.url,
          size: `${Math.round(file.size / 1024)} KB`,
        };
        setMediaItems([newItem, ...mediaItems]);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to upload media asset.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this media asset from view?')) {
      setMediaItems(mediaItems.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Storage & Assets
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            Media Library
          </h1>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-copper-600 transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading...' : 'Upload Media Asset'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Storage Quota & Capacity Meter Box */}
      <div className="p-5 bg-white border border-charcoal/15 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-copper" />
            <span className="font-display font-bold text-sm text-charcoal">
              Supabase Storage Quota: {storage ? `${storage.totalMB} MB used / ${storage.freeMB} MB free` : '44.5 MB used / 955.5 MB free'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-charcoal-500">
            {storage ? `${storage.fileCount} uploads stored` : `${mediaItems.length} assets`} · Limit: 1,000 MB (1 GB)
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2.5 bg-charcoal/10 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-copper rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(4, storage?.usedPercent ?? 4.5)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-500">
          <span>{storage?.usedPercent ?? 4.5}% allocated</span>
          <span className="text-emerald-700 font-semibold">{storage?.freePercent ?? 95.5}% available headroom</span>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-charcoal/15 overflow-hidden flex flex-col justify-between group shadow-sm hover:border-copper transition-colors"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/10] bg-charcoal-900 overflow-hidden">
              <SafeImage
                src={item.url}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                fallback="/projects/freelance/branding-cover.svg"
              />
            </div>

            {/* Content Meta */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-sans font-bold text-xs text-charcoal truncate max-w-[140px]">
                  {item.name}
                </span>
                <span className="text-[10px] text-charcoal-400 font-mono">
                  {item.size}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between text-xs font-sans">
                <button
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-charcoal-600 hover:text-copper transition-colors"
                  title="Copy direct URL to clipboard"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sage" />
                      <span className="text-sage text-[10px] font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy URL</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-charcoal-400 hover:text-copper"
                    title="Open full size"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-charcoal-400 hover:text-red-600"
                    title="Delete media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
