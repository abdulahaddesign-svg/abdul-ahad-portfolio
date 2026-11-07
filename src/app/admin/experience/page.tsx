'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle2, 
  Upload, 
  X, 
  ArrowUp, 
  ArrowDown,
  Building,
  Calendar,
  Award,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { getExperiences, saveExperience, deleteExperience } from '@/lib/data';
import { ExperienceItem } from '@/lib/types';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';

export default function AdminExperienceCMS() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<ExperienceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [newResp, setNewResp] = useState('');
  const [newAch, setNewAch] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/experience?all=true');
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleStartAdd = () => {
    setEditingItem({
      company: '',
      role: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      period: '2025 – Present',
      isCurrent: true,
      location: 'Coimbatore, India',
      description: '',
      responsibilities: [],
      achievements: [],
      companyLogo: '',
      companyUrl: '',
      sortOrder: experiences.length + 1,
      isVisible: true,
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditingItem({ ...editingItem, companyLogo: data.url });
      } else {
        alert(data.error || 'Logo upload failed');
      }
    } catch {
      alert('Upload failed. Please check network.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleAddResponsibility = () => {
    if (!newResp.trim() || !editingItem) return;
    const current = editingItem.responsibilities || [];
    setEditingItem({
      ...editingItem,
      responsibilities: [...current, newResp.trim()],
    });
    setNewResp('');
  };

  const handleRemoveResponsibility = (idx: number) => {
    if (!editingItem) return;
    const current = editingItem.responsibilities || [];
    setEditingItem({
      ...editingItem,
      responsibilities: current.filter((_, i) => i !== idx),
    });
  };

  const handleAddAchievement = () => {
    if (!newAch.trim() || !editingItem) return;
    const current = editingItem.achievements || [];
    setEditingItem({
      ...editingItem,
      achievements: [...current, newAch.trim()],
    });
    setNewAch('');
  };

  const handleRemoveAchievement = (idx: number) => {
    if (!editingItem) return;
    const current = editingItem.achievements || [];
    setEditingItem({
      ...editingItem,
      achievements: current.filter((_, i) => i !== idx),
    });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.company || !editingItem.role) {
      alert('Company and Job Title are required.');
      return;
    }

    setIsSaving(true);
    try {
      const periodStr = editingItem.period || (
        editingItem.startDate 
          ? `${editingItem.startDate} – ${editingItem.isCurrent ? 'Present' : (editingItem.endDate || 'Present')}`
          : 'Present'
      );

      const payload = {
        ...editingItem,
        period: periodStr,
      };

      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFeedback('Experience entry saved successfully!');
        setEditingItem(null);
        fetchList();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        alert('Failed to save experience.');
      }
    } catch {
      alert('Network error saving experience.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, company: string) => {
    if (!confirm(`Are you sure you want to delete experience entry for "${company}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/experience?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setExperiences(prev => prev.filter(e => e.id !== id));
        setFeedback('Experience deleted.');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      alert('Failed to delete experience.');
    }
  };

  const handleToggleVisibility = async (item: ExperienceItem) => {
    const updated = { ...item, isVisible: !item.isVisible };
    try {
      await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setExperiences(prev => prev.map(e => e.id === item.id ? updated : e));
    } catch {
      alert('Failed to update visibility.');
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            CAREER &amp; CREDENTIALS CMS
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-copper" />
            Work Experience Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage your verified employment history, company logos, roles, responsibilities, and achievements displayed on the public About page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedback && (
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-sage bg-sage/10 px-3 py-1.5 border border-sage/30">
              <CheckCircle2 className="w-4 h-4 text-sage" /> {feedback}
            </span>
          )}
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleStartAdd}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Experience
          </Button>
        </div>
      </div>

      {/* Edit / Create Modal or Slide-in Form */}
      {editingItem && (
        <form onSubmit={handleSaveItem} className="p-6 sm:p-8 bg-ivory border-2 border-copper space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/15">
            <h2 className="font-display font-bold text-xl text-charcoal">
              {editingItem.id ? `Edit Career Entry: ${editingItem.company}` : 'Add New Career Experience'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 text-charcoal-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Company Name *
              </label>
              <Input
                value={editingItem.company || ''}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="e.g. Falcon Square Private Limited"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Job Title / Position *
              </label>
              <Input
                value={editingItem.role || ''}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="e.g. Graphic Designer & Visual Content Specialist"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Employment Type
              </label>
              <Input
                value={editingItem.employmentType || ''}
                onChange={(e) => setEditingItem({ ...editingItem, employmentType: e.target.value })}
                placeholder="Full-time / Contract / Freelance"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Start Date
              </label>
              <Input
                value={editingItem.startDate || ''}
                onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                placeholder="May 2025"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                End Date (or Present)
              </label>
              <Input
                value={editingItem.endDate || ''}
                onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                placeholder="Present"
                disabled={editingItem.isCurrent}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Location
              </label>
              <Input
                value={editingItem.location || ''}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                placeholder="Coimbatore, India"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
                Display Order
              </label>
              <Input
                type="number"
                value={editingItem.sortOrder ?? 1}
                onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="pt-5 flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isCurrent ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isCurrent: e.target.checked })}
                  className="rounded border-charcoal/30 text-copper focus:ring-copper"
                />
                <span className="text-xs font-sans font-semibold text-charcoal">
                  Currently Working Here
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isVisible !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, isVisible: e.target.checked })}
                  className="rounded border-charcoal/30 text-copper focus:ring-copper"
                />
                <span className="text-xs font-sans font-semibold text-charcoal">
                  Published
                </span>
              </label>
            </div>
          </div>

          {/* Company Logo */}
          <div className="space-y-2 pt-2 border-t border-charcoal/10">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Company Logo Image / SVG
            </label>
            <div className="flex items-center gap-4">
              {editingItem.companyLogo ? (
                <div className="w-16 h-16 border border-charcoal/20 bg-charcoal/5 p-2 flex items-center justify-center">
                  <SafeImage
                    src={editingItem.companyLogo}
                    alt={editingItem.company || ''}
                    width={48}
                    height={48}
                    className="max-h-12 object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 border border-dashed border-charcoal/30 flex items-center justify-center text-charcoal-400">
                  <Building className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 space-y-1">
                <Input
                  value={editingItem.companyLogo || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, companyLogo: e.target.value })}
                  placeholder="/clients/client-falcon.svg or URL"
                />
                <label className="inline-block text-xs font-sans font-bold text-copper hover:underline cursor-pointer">
                  {uploadingLogo ? 'Uploading logo...' : 'Click to Upload Logo File'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Company Website URL */}
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-copper" />
              <span>Company Website URL (Optional)</span>
            </label>
            <Input
              value={editingItem.companyUrl || ''}
              onChange={(e) => setEditingItem({ ...editingItem, companyUrl: e.target.value })}
              placeholder="e.g. https://falconsquare.in or /work"
            />
            <p className="text-[11px] text-charcoal-500 font-sans">
              Visitors can click the arrow button next to the company name on the About page to navigate to this website.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Summary Description
            </label>
            <Textarea
              rows={2}
              value={editingItem.description || ''}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="Brief executive overview of the engagement and scope..."
            />
          </div>

          {/* Responsibilities list */}
          <div className="space-y-3 pt-2 border-t border-charcoal/10">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block">
              Key Responsibilities (Bullets)
            </label>
            <div className="flex gap-2">
              <Input
                value={newResp}
                onChange={(e) => setNewResp(e.target.value)}
                placeholder="e.g. Create high-converting posters, banners and advertising creatives..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddResponsibility();
                  }
                }}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddResponsibility}>
                Add
              </Button>
            </div>

            <ul className="space-y-1.5 max-h-48 overflow-y-auto">
              {(editingItem.responsibilities || []).map((resp, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 bg-charcoal/5 border border-charcoal/10 text-xs">
                  <span className="flex-1 pr-2">&mdash; {resp}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveResponsibility(idx)}
                    className="text-charcoal-400 hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="space-y-3 pt-2 border-t border-charcoal/10">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-copper flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Verified Achievements &amp; Honors
            </label>
            <div className="flex gap-2">
              <Input
                value={newAch}
                onChange={(e) => setNewAch(e.target.value)}
                placeholder="e.g. Awarded Best Employee of the Year 2025 for design excellence..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddAchievement}>
                Add
              </Button>
            </div>

            <ul className="space-y-1.5">
              {(editingItem.achievements || []).map((ach, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 bg-copper/10 border border-copper/30 text-xs text-charcoal font-medium">
                  <span className="flex-1 pr-2">🏆 {ach}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(idx)}
                    className="text-charcoal-400 hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal/15">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
              icon={<Save className="w-4 h-4" />}
            >
              Save Experience Entry
            </Button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs font-mono uppercase text-charcoal-500">
            Loading experience entries...
          </div>
        ) : experiences.length === 0 ? (
          <div className="py-12 p-8 border-2 border-dashed border-charcoal/20 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-charcoal-400 mx-auto" />
            <p className="text-sm font-sans text-charcoal-600 font-medium">No experience entries found.</p>
            <Button variant="primary" size="sm" onClick={handleStartAdd} icon={<Plus className="w-3.5 h-3.5" />}>
              Create First Entry
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-charcoal/15 border border-charcoal/15 bg-ivory">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-charcoal/5 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 shrink-0 border border-charcoal/20 bg-charcoal/5 p-1.5 flex items-center justify-center">
                    {exp.companyLogo ? (
                      <SafeImage
                        src={exp.companyLogo}
                        alt={exp.company}
                        width={36}
                        height={36}
                        className="max-h-9 object-contain"
                      />
                    ) : (
                      <Building className="w-5 h-5 text-charcoal-400" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-copper font-bold">0{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg text-charcoal">{exp.company}</h3>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-copper hover:text-charcoal p-0.5 rounded transition-colors inline-flex items-center gap-0.5 text-xs font-mono"
                            title={`Visit ${exp.company} website`}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-sage/20 text-sage border border-sage/40">
                          Current
                        </span>
                      )}
                      {!exp.isVisible && (
                        <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-charcoal/20 text-charcoal-500">
                          Hidden
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-sans font-medium text-charcoal-700">{exp.role}</p>
                    <p className="text-xs font-mono text-charcoal-500">
                      {exp.period || `${exp.startDate} – ${exp.endDate}`} · {exp.location} · {exp.responsibilities?.length || 0} responsibilities
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(exp)}
                    className="p-2 border border-charcoal/15 text-charcoal-600 hover:text-charcoal hover:border-charcoal transition-colors"
                    title={exp.isVisible ? 'Hide from public view' : 'Show on public view'}
                  >
                    {exp.isVisible ? <Eye className="w-4 h-4 text-sage" /> : <EyeOff className="w-4 h-4 text-charcoal-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingItem(exp)}
                    className="p-2 border border-charcoal/15 text-charcoal hover:text-copper hover:border-copper transition-colors"
                    title="Edit entry"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(exp.id, exp.company)}
                    className="p-2 border border-charcoal/15 text-charcoal-400 hover:text-red-600 hover:border-red-600 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
