'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FolderKanban, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  PlusCircle, 
  ArrowUpRight, 
  ExternalLink,
  Clock,
  Sparkles 
} from 'lucide-react';
import { getProjects, getInquiries } from '@/lib/data';
import { Project, Inquiry } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function AdminOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [projs, inqs] = await Promise.all([
        getProjects({ includeDrafts: true }),
        getInquiries(),
      ]);
      setProjects(projs);
      setInquiries(inqs);
      setLoading(false);
    }
    loadData();
  }, []);

  const publishedCount = projects.filter((p) => p.isPublished).length;
  const draftCount = projects.filter((p) => !p.isPublished).length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  if (loading) {
    return (
      <div className="py-20 text-center text-charcoal-500 font-sans text-sm">
        Loading CMS Overview metrics...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
            Dashboard
          </span>
          <h1 className="font-display font-bold text-3xl text-charcoal">
            Portfolio CMS Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/admin/projects/new" variant="primary" size="sm" icon={<PlusCircle className="w-3.5 h-3.5" />}>
            New Project
          </Button>
          <Button href="/" isExternal variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
            Live Site
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-charcoal/15 space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-xs font-sans font-bold uppercase tracking-wider">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-copper" />
          </div>
          <div className="font-display font-bold text-4xl text-charcoal">{projects.length}</div>
          <span className="text-[11px] font-sans text-charcoal-500">Across all categories</span>
        </div>

        <div className="p-6 bg-white border border-charcoal/15 space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-xs font-sans font-bold uppercase tracking-wider">Published</span>
            <CheckCircle className="w-4 h-4 text-sage" />
          </div>
          <div className="font-display font-bold text-4xl text-sage-700">{publishedCount}</div>
          <span className="text-[11px] font-sans text-charcoal-500">Live on public portfolio</span>
        </div>

        <div className="p-6 bg-white border border-charcoal/15 space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-xs font-sans font-bold uppercase tracking-wider">Drafts</span>
            <FileText className="w-4 h-4 text-earthBrown" />
          </div>
          <div className="font-display font-bold text-4xl text-charcoal">{draftCount}</div>
          <span className="text-[11px] font-sans text-charcoal-500">Hidden from public</span>
        </div>

        <div className="p-6 bg-white border border-charcoal/15 space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-xs font-sans font-bold uppercase tracking-wider">New Inquiries</span>
            <MessageSquare className="w-4 h-4 text-copper" />
          </div>
          <div className="font-display font-bold text-4xl text-copper">{newInquiriesCount}</div>
          <span className="text-[11px] font-sans text-charcoal-500">
            {inquiries.length} total client submissions
          </span>
        </div>
      </div>

      {/* Grid: Recent Inquiries + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-7 bg-white border border-charcoal/15 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
            <div>
              <h2 className="font-display font-bold text-xl text-charcoal">
                Recent Client Inquiries
              </h2>
              <span className="text-xs font-sans text-charcoal-400">
                Latest messages from contact form
              </span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-sans font-bold uppercase tracking-wider text-copper hover:underline"
            >
              View All ({inquiries.length})
            </Link>
          </div>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 bg-ivory-100 border border-charcoal/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-sm text-charcoal">
                      {inq.name} {inq.company && `(${inq.company})`}
                    </span>
                    <Badge variant={inq.status === 'new' ? 'copper' : 'outline'}>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-sans text-charcoal-600 line-clamp-2">
                    {inq.details}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-sans text-charcoal-400 pt-2 border-t border-charcoal/10">
                    <span>Service: {inq.serviceRequired}</span>
                    <span>{formatDate(inq.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-sans text-charcoal-400">
              No inquiries received yet.
            </div>
          )}
        </div>

        {/* Right Column: Quick Actions & Projects Overview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white border border-charcoal/15 p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="flex items-center justify-between p-3 bg-ivory-100 hover:bg-copper/10 hover:text-copper transition-colors text-xs font-sans font-semibold text-charcoal"
              >
                <span>Add New Portfolio Project</span>
                <PlusCircle className="w-4 h-4 text-copper" />
              </Link>
              <Link
                href="/admin/inquiries"
                className="flex items-center justify-between p-3 bg-ivory-100 hover:bg-copper/10 hover:text-copper transition-colors text-xs font-sans font-semibold text-charcoal"
              >
                <span>Manage Client Inquiries</span>
                <MessageSquare className="w-4 h-4 text-copper" />
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 bg-ivory-100 hover:bg-copper/10 hover:text-copper transition-colors text-xs font-sans font-semibold text-charcoal"
              >
                <span>Upload Media Assets</span>
                <ArrowUpRight className="w-4 h-4 text-copper" />
              </Link>
              <Link
                href="/admin/content"
                className="flex items-center justify-between p-3 bg-ivory-100 hover:bg-copper/10 hover:text-copper transition-colors text-xs font-sans font-semibold text-charcoal"
              >
                <span>Edit Site Copy & Resume Info</span>
                <ArrowUpRight className="w-4 h-4 text-copper" />
              </Link>
            </div>
          </div>

          {/* Quick Projects List */}
          <div className="bg-white border border-charcoal/15 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
              <h3 className="font-display font-bold text-lg text-charcoal">
                Active Projects
              </h3>
              <Link
                href="/admin/projects"
                className="text-xs font-sans font-bold uppercase tracking-wider text-copper hover:underline"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 bg-ivory-100 text-xs font-sans"
                >
                  <div className="truncate max-w-[180px]">
                    <span className="font-bold text-charcoal block truncate">{p.title}</span>
                    <span className="text-[10px] text-charcoal-400">{p.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        p.isPublished ? 'bg-sage' : 'bg-charcoal-400'
                      }`}
                    />
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="text-copper hover:underline font-bold text-[11px]"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
