'use client';

import React, { useEffect, useState } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  Check, 
  ArrowUpRight,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { uploadMedia } from '@/lib/upload-client';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ServiceItem>>({
    title: '',
    slug: '',
    tagline: '',
    shortSummary: '',
    description: '',
    deliverables: [],
    primaryImage: '',
    supportingImages: [],
    ctaText: 'Initiate Brief',
    ctaHref: '/contact',
    sortOrder: 1,
    isPrimary: false,
    isPublished: true,
  });
  const [newDeliverable, setNewDeliverable] = useState('');
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingSupporting, setUploadingSupporting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services?all=true');
      const data = await res.json();
      setServices(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditForm({
      title: '',
      slug: '',
      tagline: '',
      shortSummary: '',
      description: '',
      deliverables: [],
      primaryImage: '/projects/freelance/branding-cover.svg',
      supportingImages: [],
      ctaText: 'Initiate Brief',
      ctaHref: '/contact',
      sortOrder: services.length + 1,
      isPrimary: false,
      isPublished: true,
    });
    setNewDeliverable('');
    setIsEditing(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditForm({
      ...srv,
      deliverables: srv.deliverables ? [...srv.deliverables] : [],
      supportingImages: srv.supportingImages ? [...srv.supportingImages] : [],
    });
    setNewDeliverable('');
    setIsEditing(true);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    const current = editForm.deliverables || [];
    setEditForm({
      ...editForm,
      deliverables: [...current, newDeliverable.trim()],
    });
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index: number) => {
    const current = editForm.deliverables || [];
    setEditForm({
      ...editForm,
      deliverables: current.filter((_, i) => i !== index),
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'supporting'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'primary') setUploadingPrimary(true);
    if (type === 'supporting') setUploadingSupporting(true);

    try {
      const data = await uploadMedia(file);
      if (data.url) {
        if (type === 'primary') {
          setEditForm(prev => ({ ...prev, primaryImage: data.url }));
          showNotification('Primary service image uploaded');
        } else {
          setEditForm(prev => ({
            ...prev,
            supportingImages: [...(prev.supportingImages || []), data.url],
          }));
          showNotification('Supporting image added');
        }
      }
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      if (type === 'primary') setUploadingPrimary(false);
      if (type === 'supporting') setUploadingSupporting(false);
      e.target.value = '';
    }
  };

  const handleRemoveSupportingImage = (idx: number) => {
    setEditForm(prev => ({
      ...prev,
      supportingImages: (prev.supportingImages || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.title?.trim()) {
      alert('Service title is required');
      return;
    }

    const payload = {
      ...editForm,
      slug: editForm.slug?.trim() || editForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    try {
      const method = editForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save service');

      await fetchServices();
      setIsEditing(false);
      showNotification(editForm.id ? 'Service updated successfully' : 'New service created');
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      await fetchServices();
      showNotification('Service deleted');
    } catch (err: any) {
      alert(err.message || 'Error deleting service');
    }
  };

  const handleTogglePublish = async (srv: ServiceItem) => {
    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: srv.id, isPublished: !srv.isPublished }),
      });
      await fetchServices();
      showNotification(`Service ${srv.isPublished ? 'hidden' : 'published'}`);
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-8 select-none">
      {feedback && (
        <div className="fixed top-6 right-6 z-50 bg-charcoal text-ivory px-5 py-3 border border-copper text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl">
          <Check className="w-4 h-4 text-copper" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Studio Capabilities
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
            Services Management
          </h1>
          <p className="text-sm font-sans text-charcoal-500 mt-1">
            Manage the 6 dynamic creative disciplines displayed on the public Services page.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          variant="primary"
          className="inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </Button>
      </div>

      {/* Services List Table */}
      {loading ? (
        <div className="py-20 text-center text-sm font-sans text-charcoal-400">
          Loading services catalog...
        </div>
      ) : services.length === 0 ? (
        <div className="py-20 text-center bg-white border border-charcoal/15 p-8 space-y-4">
          <p className="text-sm font-sans text-charcoal-600">No services configured yet.</p>
          <Button onClick={handleOpenAdd} variant="primary">
            Create First Service
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-charcoal/15 divide-y divide-charcoal/10 overflow-hidden shadow-sm">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-charcoal/5 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-5">
                <span className="font-mono text-xs font-bold text-copper px-2.5 py-1 bg-charcoal/5 border border-charcoal/10 shrink-0">
                  0{srv.sortOrder || idx + 1}
                </span>

                {srv.primaryImage && (
                  <div className="relative w-20 h-14 bg-charcoal-900 border border-charcoal/20 overflow-hidden shrink-0">
                    <SafeImage
                      src={srv.primaryImage}
                      alt={srv.title}
                      fill
                      className="object-cover"
                      fallback="/projects/freelance/branding-cover.svg"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-display font-bold text-lg text-charcoal">
                      {srv.title}
                    </h3>
                    {srv.isPrimary && (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 bg-copper text-ivory">
                        Primary
                      </span>
                    )}
                    {srv.isPublished === false && (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 bg-charcoal-200 text-charcoal-600">
                        Draft / Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-500 font-sans line-clamp-1 max-w-xl">
                    {srv.tagline || srv.shortSummary}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-charcoal-400">
                    <span>{srv.deliverables?.length || 0} Deliverables</span>
                    <span>•</span>
                    <span>{srv.supportingImages?.length || 0} Supporting Images</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(srv)}
                  className={`p-2 border text-xs font-sans font-bold flex items-center gap-1.5 transition-colors ${
                    srv.isPublished !== false
                      ? 'border-charcoal/20 text-charcoal hover:border-copper hover:text-copper'
                      : 'border-charcoal/20 text-charcoal-400 hover:text-charcoal'
                  }`}
                  title={srv.isPublished !== false ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                >
                  {srv.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{srv.isPublished !== false ? 'Visible' : 'Hidden'}</span>
                </button>

                <Button
                  onClick={() => handleOpenEdit(srv)}
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Button>

                <button
                  type="button"
                  onClick={() => handleDelete(srv.id, srv.title)}
                  className="p-2 border border-charcoal/20 text-charcoal-400 hover:text-red-600 hover:border-red-400 transition-colors"
                  title="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-ivory text-charcoal border border-charcoal/20 w-full max-w-3xl my-8 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal/15">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-copper block">
                  {editForm.id ? 'Edit Capability' : 'New Capability'}
                </span>
                <h2 className="font-display font-bold text-2xl text-charcoal">
                  {editForm.id ? editForm.title : 'Add Creative Service'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 text-charcoal-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g. Graphic Design & Visual Branding"
                    className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editForm.slug || ''}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    placeholder="e.g. graphic-design-visual-branding"
                    className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                  Tagline / Scope Quote
                </label>
                <input
                  type="text"
                  value={editForm.tagline || ''}
                  onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                  placeholder="e.g. Posters, Advertising Creatives, Social Media & Packaging"
                  className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                  Editorial Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Detailed breakdown of your strategic design methodology..."
                  className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                />
              </div>

              {/* Deliverables Chips */}
              <div className="space-y-3 pt-2 border-t border-charcoal/10">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                  Key Deliverables
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Add a deliverable and press Enter"
                    className="flex-1 px-3.5 py-2 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                  <Button type="button" onClick={handleAddDeliverable} variant="outline" size="sm">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(editForm.deliverables || []).map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-charcoal/15 text-xs font-sans"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-charcoal-400 hover:text-charcoal"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Image Upload */}
              <div className="space-y-3 pt-2 border-t border-charcoal/10">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                  Primary Showcase Image (Large Editorial Visual)
                </label>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {editForm.primaryImage ? (
                    <div className="relative w-40 h-28 bg-charcoal-900 border border-charcoal/20 overflow-hidden shrink-0">
                      <SafeImage
                        src={editForm.primaryImage}
                        alt="Primary service"
                        fill
                        className="object-cover"
                        fallback="/projects/freelance/branding-cover.svg"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-28 bg-white border border-dashed border-charcoal/30 flex items-center justify-center text-charcoal-400 shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editForm.primaryImage || ''}
                      onChange={(e) => setEditForm({ ...editForm, primaryImage: e.target.value })}
                      placeholder="/projects/packaging/packaging-cover.svg or upload below"
                      className="w-full px-3.5 py-2 bg-white border border-charcoal/20 text-xs font-mono focus:border-copper outline-none"
                    />
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 bg-white text-xs font-sans font-bold uppercase tracking-wider text-charcoal hover:border-copper cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-copper" />
                      <span>{uploadingPrimary ? 'Uploading...' : 'Upload Replacement'}</span>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'primary')}
                        disabled={uploadingPrimary}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Supporting Images (Overlapping elements) */}
              <div className="space-y-3 pt-2 border-t border-charcoal/10">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                  Supporting Overlapping Imagery (Optional, up to 3)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(editForm.supportingImages || []).map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] bg-charcoal-900 border border-charcoal/20 group overflow-hidden">
                      <SafeImage
                        src={img}
                        alt={`Supporting ${idx}`}
                        fill
                        className="object-cover"
                        fallback="/projects/freelance/branding-cover.svg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSupportingImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-charcoal/80 text-ivory opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <label className="aspect-[4/3] border border-dashed border-charcoal/30 flex flex-col items-center justify-center gap-1 bg-white hover:border-copper cursor-pointer text-xs font-sans text-charcoal-500">
                    <Upload className="w-4 h-4 text-copper" />
                    <span>{uploadingSupporting ? 'Uploading...' : 'Add Image'}</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'supporting')}
                      disabled={uploadingSupporting}
                    />
                  </label>
                </div>
              </div>

              {/* Action Link & Ordering */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-charcoal/10">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editForm.sortOrder || 1}
                    onChange={(e) => setEditForm({ ...editForm, sortOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editForm.ctaText || 'Initiate Brief'}
                    onChange={(e) => setEditForm({ ...editForm, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={editForm.ctaHref || '/contact'}
                    onChange={(e) => setEditForm({ ...editForm, ctaHref: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-charcoal/20 text-sm focus:border-copper outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                  <input
                    type="checkbox"
                    checked={editForm.isPrimary || false}
                    onChange={(e) => setEditForm({ ...editForm, isPrimary: e.target.checked })}
                    className="rounded-none border-charcoal/30 text-copper focus:ring-copper"
                  />
                  <span>Mark as Primary Discipline</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                  <input
                    type="checkbox"
                    checked={editForm.isPublished !== false}
                    onChange={(e) => setEditForm({ ...editForm, isPublished: e.target.checked })}
                    className="rounded-none border-charcoal/30 text-copper focus:ring-copper"
                  />
                  <span>Published on Live Site</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal/15">
                <Button type="button" onClick={() => setIsEditing(false)} variant="ghost">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Capability
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
