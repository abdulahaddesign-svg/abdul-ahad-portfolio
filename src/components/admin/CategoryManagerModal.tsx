'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Tags, 
  RotateCcw,
  AlertCircle,
  FolderKanban
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesChange?: (categories: string[]) => void;
  projectCounts?: Record<string, number>;
}

export function CategoryManagerModal({
  isOpen,
  onClose,
  onCategoriesChange,
  projectCounts = {},
}: CategoryManagerModalProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      }
    } catch {
      setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      setError(null);
      setEditingIndex(null);
      setNewCatName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      const updated = [...categories, trimmed];
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', name: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        const next = data.categories || updated;
        setCategories(next);
        setNewCatName('');
        onCategoriesChange?.(next);
      } else {
        const err = await res.json();
        setError(err.error || 'Failed to add category');
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
        const next =
          data.categories ||
          categories.map((c, i) => (i === idx ? trimmed : c));
        setCategories(next);
        setEditingIndex(null);
        setEditValue('');
        onCategoriesChange?.(next);
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
      ? `"${name}" is currently assigned to ${count} project(s). Are you sure you want to remove this category option?`
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
        const next = data.categories || categories.filter((c) => c !== name);
        setCategories(next);
        onCategoriesChange?.(next);
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
        const data = await res.json();
        onCategoriesChange?.(data.categories || copy);
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
        const next = data.categories || DEFAULT_LIST;
        setCategories(next);
        onCategoriesChange?.(next);
      }
    } catch {
      setError('Failed to reset categories.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-ivory border border-charcoal/20 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-charcoal/15 bg-charcoal text-ivory flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-copper/20 flex items-center justify-center text-copper">
              <Tags className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-ivory tracking-tight">
                Manage Project Categories
              </h2>
              <p className="text-xs font-sans text-charcoal-400">
                Add, rename, delete, and reorder primary project disciplines.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center gap-2 rounded-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Add Category Input */}
          <form onSubmit={handleAdd} className="space-y-2">
            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal">
              Add New Category
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 3D & CGI, Art Direction, Editorial Design..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-white border border-charcoal/20 text-charcoal text-sm font-sans focus:outline-none focus:border-copper rounded-none"
              />
              <button
                type="submit"
                disabled={saving || !newCatName.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-wider hover:bg-copper-600 transition-colors disabled:opacity-50 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </form>

          {/* Categories List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans text-charcoal-500 uppercase tracking-widest font-bold">
              <span>Configured Categories ({categories.length})</span>
              {categories.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  disabled={saving}
                  className="text-[11px] text-copper hover:underline flex items-center gap-1 font-normal lowercase tracking-normal"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>reset to defaults</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs font-mono text-charcoal-400">
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              <div className="p-6 text-center text-xs text-charcoal-500 bg-white border border-charcoal/10">
                No categories configured. Click "reset to defaults" or add one above.
              </div>
            ) : (
              <div className="border border-charcoal/15 divide-y divide-charcoal/10 bg-white rounded-sm overflow-hidden shadow-xs">
                {categories.map((cat, idx) => {
                  const isEditing = editingIndex === idx;
                  const projectCount = projectCounts[cat] || 0;

                  return (
                    <div
                      key={cat}
                      className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-copper/5 transition-colors group"
                    >
                      {/* Left: Move buttons & Name */}
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {/* Up / Down Reorder */}
                        <div className="flex flex-col gap-0.5 text-charcoal-400 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'up')}
                            disabled={idx === 0 || saving}
                            className="p-0.5 hover:text-copper disabled:opacity-20 transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'down')}
                            disabled={idx === categories.length - 1 || saving}
                            className="p-0.5 hover:text-copper disabled:opacity-20 transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Name or Edit Input */}
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
                              className="flex-1 px-2.5 py-1 text-sm bg-white border border-copper focus:outline-none font-sans"
                            />
                            <button
                              type="button"
                              onClick={() => saveEdit(idx)}
                              disabled={saving}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Save Changes (Enter)"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="p-1.5 text-charcoal-400 hover:bg-charcoal-100 rounded"
                              title="Cancel (Esc)"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="font-sans font-bold text-sm text-charcoal truncate">
                              {cat}
                            </span>
                            {projectCount > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-copper bg-copper/10 rounded-full shrink-0">
                                <FolderKanban className="w-2.5 h-2.5" />
                                {projectCount} project{projectCount > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      {!isEditing && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEdit(idx)}
                            disabled={saving}
                            className="p-1.5 text-charcoal-400 hover:text-copper hover:bg-charcoal/5 rounded transition-colors"
                            title={`Rename "${cat}"`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cat)}
                            disabled={saving}
                            className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title={`Delete "${cat}"`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-charcoal/15 bg-white flex items-center justify-between">
          <span className="text-[11px] font-mono text-charcoal-400">
            Changes save and sync automatically
          </span>
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
