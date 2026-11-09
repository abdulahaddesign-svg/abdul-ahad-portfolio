'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Tags, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw,
  AlertCircle,
  FolderKanban,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [projectCounts, setProjectCounts] = useState<Record<string, number>>({});
  const [newCatName, setNewCatName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, projRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/projects'),
      ]);

      if (catRes.ok) {
        const catData = await catRes.json();
        if (Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }
      }

      if (projRes.ok) {
        const projects = await projRes.json();
        if (Array.isArray(projects)) {
          const counts: Record<string, number> = {};
          projects.forEach((p: any) => {
            if (p.category) {
              counts[p.category] = (counts[p.category] || 0) + 1;
            }
          });
          setProjectCounts(counts);
        }
      }
    } catch {
      setError('Failed to load project categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAdd = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setError(`Category "${trimmed}" already exists.`);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', name: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || [...categories, trimmed]);
        setNewCatName('');
        showSuccess(`Added "${trimmed}" category.`);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to add category.');
      }
    } catch {
      setError('Network error adding category.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setEditValue(categories[idx]);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const saveEdit = async (idx: number) => {
    const trimmed = editValue.trim();
    const oldName = categories[idx];
    if (!trimmed || trimmed === oldName) {
      cancelEdit();
      return;
    }

    if (
      categories.some(
        (c, i) => i !== idx && c.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setError(`Category "${trimmed}" already exists.`);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rename',
          oldName,
          newName: trimmed,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
        setEditingIndex(null);
        setEditValue('');
        showSuccess(`Renamed "${oldName}" to "${trimmed}". Assigned projects updated.`);
        fetchData(); // refresh counts
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to rename category.');
      }
    } catch {
      setError('Network error renaming category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (name: string) => {
    const count = projectCounts[name] || 0;
    const msg = count > 0 
      ? `"${name}" is currently assigned to ${count} project(s). Are you sure you want to remove this category? Projects will remain until reassigned.`
      : `Delete category "${name}"?`;

    if (!confirm(msg)) return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', name }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || categories.filter((c) => c !== name));
        showSuccess(`Deleted category "${name}".`);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to delete category.');
      }
    } catch {
      setError('Network error deleting category.');
    } finally {
      setSaving(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= categories.length) return;

    const copy = [...categories];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);

    setCategories(copy);
    setSaving(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: copy }),
      });
      if (res.ok) {
        showSuccess('Category order updated.');
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    const DEFAULT_LIST = [
      'Branding',
      'Graphic Design',
      'Social Media',
      'UI/UX',
      'Motion Graphics',
      'Video Editing',
      'Web & App',
      'Packaging & Print',
    ];

    if (
      !confirm(
        'Reset categories to the default 8 disciplines? Any custom categories not in use will be replaced.'
      )
    ) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: DEFAULT_LIST }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || DEFAULT_LIST);
        showSuccess('Reset categories to default disciplines.');
      }
    } catch {
      setError('Failed to reset categories.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-copper hover:underline mb-2 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects CMS</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-charcoal flex items-center gap-2.5">
            <Tags className="w-7 h-7 text-copper" />
            <span>Project Categories CMS</span>
          </h1>
          <p className="mt-1 text-xs text-charcoal-500 font-sans">
            Customize the primary discipline categories available across project editors and portfolio filters.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 bg-white text-charcoal text-xs font-sans font-bold uppercase tracking-wider hover:border-copper hover:text-copper transition-colors"
        >
          View Projects ({Object.values(projectCounts).reduce((a, b) => a + b, 0)})
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center gap-2 rounded-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2 rounded-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Add New Category Box */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-4 shadow-sm">
        <h2 className="font-display font-bold text-base text-charcoal">
          Create New Category
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. 3D & CGI, Art Direction, Editorial Design..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-ivory-50 border border-charcoal/20 text-charcoal text-sm font-sans focus:outline-none focus:border-copper"
          />
          <button
            type="submit"
            disabled={saving || !newCatName.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper-600 transition-colors disabled:opacity-50 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </form>
      </div>

      {/* Categories List Container */}
      <div className="p-6 bg-white border border-charcoal/15 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
          <div>
            <h2 className="font-display font-bold text-base text-charcoal">
              Active Project Categories ({categories.length})
            </h2>
            <p className="text-xs font-sans text-charcoal-500">
              Drag or use arrows to adjust display order. Renaming automatically updates all assigned projects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={saving}
            className="text-xs text-copper hover:underline flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-charcoal-400">
            Loading categories from database...
          </div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center text-xs text-charcoal-500">
            No categories configured. Click "Reset Defaults" or add a new category above.
          </div>
        ) : (
          <div className="border border-charcoal/15 divide-y divide-charcoal/10 rounded-sm overflow-hidden">
            {categories.map((cat, idx) => {
              const isEditing = editingIndex === idx;
              const count = projectCounts[cat] || 0;

              return (
                <div
                  key={cat}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-copper/5 transition-colors"
                >
                  {/* Left: Reorder and Title */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex flex-col gap-0.5 text-charcoal-400 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0 || saving}
                        className="p-0.5 hover:text-copper disabled:opacity-20 transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === categories.length - 1 || saving}
                        className="p-0.5 hover:text-copper disabled:opacity-20 transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-xs font-mono text-charcoal-400 w-6 shrink-0">
                      0{idx + 1}
                    </span>

                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(idx);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                          className="flex-1 px-3 py-1.5 text-sm bg-white border border-copper focus:outline-none font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => saveEdit(idx)}
                          disabled={saving}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="Save Changes (Enter)"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="p-2 text-charcoal-400 hover:bg-charcoal-100 rounded"
                          title="Cancel (Esc)"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="font-display font-bold text-base text-charcoal truncate">
                          {cat}
                        </span>
                        {count > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono text-copper bg-copper/10 rounded-full shrink-0">
                            <FolderKanban className="w-3 h-3" />
                            <span>{count} project{count > 1 ? 's' : ''}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-charcoal-400">
                            0 projects
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  {!isEditing && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(idx)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-charcoal-600 hover:text-copper hover:bg-charcoal/5 border border-charcoal/15 transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Rename</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat)}
                        disabled={saving}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title={`Delete category "${cat}"`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
