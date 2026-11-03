'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Check, 
  X, 
  Star,
  Search
} from 'lucide-react';
import { getProjects, deleteProject, duplicateProject } from '@/lib/data';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects({ includeDrafts: true });
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      await deleteProject(id);
      await fetchProjects();
    }
  };

  const handleDuplicate = async (id: string) => {
    const duplicated = await duplicateProject(id);
    if (duplicated) {
      await fetchProjects();
    }
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.clientName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Content Management
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            Projects CMS
          </h1>
        </div>

        <Button
          href="/admin/projects/new"
          variant="primary"
          size="md"
          icon={<PlusCircle className="w-4 h-4" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-charcoal/15">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, category..."
            className="w-full pl-9 pr-4 py-2 bg-ivory-50 border border-charcoal/20 text-xs font-sans focus:outline-none focus:border-copper"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="text-xs font-sans text-charcoal-400">
          Showing {filtered.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-charcoal/15 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-ivory-100 border-b border-charcoal/15 text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-500">
              <th className="p-4">Cover</th>
              <th className="p-4">Title & Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Year</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10 text-xs font-sans">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-charcoal-400">
                  Loading projects...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-charcoal-400">
                  No projects found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-ivory-50 transition-colors">
                  {/* Thumbnail Cover */}
                  <td className="p-4">
                    <div className="relative w-16 h-10 bg-charcoal overflow-hidden border border-charcoal/20 shrink-0">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td className="p-4">
                    <div className="font-bold text-charcoal text-sm">{p.title}</div>
                    <div className="text-[10px] text-charcoal-400 font-mono mt-0.5">
                      /work/{p.slug}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <Badge variant="copper">{p.category}</Badge>
                  </td>

                  {/* Year */}
                  <td className="p-4 font-semibold text-charcoal-600">{p.projectYear}</td>

                  {/* Published status */}
                  <td className="p-4">
                    {p.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sage-700">
                        <Check className="w-3.5 h-3.5 text-sage" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-charcoal-400">
                        <X className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>

                  {/* Featured */}
                  <td className="p-4">
                    {p.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-copper">
                        <Star className="w-3.5 h-3.5 fill-copper text-copper" /> Yes
                      </span>
                    ) : (
                      <span className="text-charcoal-400">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-charcoal-400 hover:text-copper transition-colors"
                        title="View Live Case Study"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDuplicate(p.id)}
                        className="p-1.5 text-charcoal-400 hover:text-copper transition-colors"
                        title="Duplicate Project"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="p-1.5 text-charcoal-600 hover:text-copper transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
