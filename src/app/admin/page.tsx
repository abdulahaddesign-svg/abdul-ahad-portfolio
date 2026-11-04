'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FolderKanban, 
  Layers, 
  Building2, 
  User, 
  FileText,
  PlusCircle, 
  ExternalLink,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Home,
  PanelTop,
  Briefcase
} from 'lucide-react';
import { getProjects, getInquiries, getClientLogos, getServices, getSiteSettings, getExperiences } from '@/lib/data';
import { Project, Inquiry, ClientLogo, ServiceItem, SiteSettings, ExperienceItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [projs, servs, clis, inqs, sets, exps] = await Promise.all([
        getProjects({ includeDrafts: true }),
        getServices(),
        getClientLogos(true),
        getInquiries(),
        getSiteSettings(),
        getExperiences(true),
      ]);
      setProjects(projs);
      setServices(servs);
      setClients(clis);
      setInquiries(inqs);
      setSettings(sets);
      setExperiences(exps);
      setLoading(false);
    }
    loadData();
  }, []);

  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const draftProjects = projects.filter((p) => !p.isPublished).length;
  const publishedServices = services.length;
  const clientLogosCount = clients.length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">
          Loading editorial CMS overview...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* =========================================================================
          1. HEADER: Editorial Title & Quick Actions
          ========================================================================= */}
      <div className="pb-8 border-b border-charcoal/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-copper font-bold mb-2">
            <span>ADMIN CMS PORTAL</span>
            <span>·</span>
            <span className="text-charcoal-500 font-mono">WORKSPACE DASHBOARD</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Creative Direction & Content
          </h1>
          <p className="mt-2 text-sm text-charcoal-600 font-sans max-w-xl">
            Real-time management for portfolio case studies, service offerings, client showcases, and editorial copy.
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-widest hover:bg-copper transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-copper" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 bg-ivory text-charcoal text-xs font-sans font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Edit Services</span>
          </Link>
          <Link
            href="/admin/about"
            className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/20 bg-ivory text-charcoal text-xs font-sans font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Update About</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-sans text-charcoal-500 hover:text-charcoal transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-copper" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          2. METRICS: Clean Editorial Grid with Thin Dividers (No Heavy Cards)
          ========================================================================= */}
      <div>
        <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold mb-4">
          PORTFOLIO METRICS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-charcoal/15">
          {/* Published Projects */}
          <div className="p-6 border-b border-r border-charcoal/15 bg-ivory hover:bg-copper/5 transition-colors">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 block mb-1">
              Published Work
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {publishedProjects}
              </span>
              <span className="text-xs font-sans text-copper font-medium">live</span>
            </div>
          </div>

          {/* Draft Projects */}
          <div className="p-6 border-b border-r border-charcoal/15 bg-ivory hover:bg-copper/5 transition-colors">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 block mb-1">
              Draft Projects
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {draftProjects}
              </span>
              <span className="text-xs font-sans text-charcoal-400 font-medium">in prep</span>
            </div>
          </div>

          {/* Published Services */}
          <div className="p-6 border-b border-r border-charcoal/15 bg-ivory hover:bg-copper/5 transition-colors">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 block mb-1">
              Services Active
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {publishedServices}
              </span>
              <span className="text-xs font-sans text-copper font-medium">3D carousel</span>
            </div>
          </div>

          {/* Client Logos */}
          <div className="p-6 border-b border-r border-charcoal/15 bg-ivory hover:bg-copper/5 transition-colors">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 block mb-1">
              Client Logos
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {clientLogosCount}
              </span>
              <span className="text-xs font-sans text-copper font-medium">brands</span>
            </div>
          </div>

          {/* Client Inquiries */}
          <div className="p-6 border-b border-r border-charcoal/15 bg-ivory hover:bg-copper/5 transition-colors col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 block mb-1">
              New Inquiries
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {newInquiriesCount}
              </span>
              <span className={`text-xs font-sans font-medium ${newInquiriesCount > 0 ? 'text-copper font-bold' : 'text-charcoal-400'}`}>
                {newInquiriesCount > 0 ? 'unread' : 'up to date'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. CONTENT HUBS: Quick Route Cards for All 9 Sections
          ========================================================================= */}
      <div>
        <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold mb-4">
          CONTENT MANAGEMENT HUBS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Homepage Hero */}
          <Link
            href="/admin/homepage"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <Home className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Homepage Hero
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Edit headline text, professional subtitle, narrative introduction, CTAs and monogram watermark.
            </p>
          </Link>

          {/* Header & Footer */}
          <Link
            href="/admin/header-footer"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <PanelTop className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Header &amp; Footer
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Customize light/dark logos, navigation destinations, availability beacon, and footer statement.
            </p>
          </Link>

          {/* Work Experience */}
          <Link
            href="/admin/experience"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Work Experience ({experiences.length})
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Manage employment history, company logos, roles, responsibilities, and verified honors.
            </p>
          </Link>

          {/* Projects CMS */}
          <Link
            href="/admin/projects"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <FolderKanban className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Projects CMS
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Create, edit, feature, and reorder Behance-style case studies with modular narrative sections.
            </p>
          </Link>

          {/* Services CMS */}
          <Link
            href="/admin/services"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <Layers className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Services & 3D Carousel
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Manage disciplines, detailed descriptions, capabilities checklists, and 360° carousel imagery.
            </p>
          </Link>

          {/* Client Logos */}
          <Link
            href="/admin/clients"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Client Logos
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Upload brand SVG / PNG logos, configure website links, and toggle homepage marquee visibility.
            </p>
          </Link>

          {/* About Biography */}
          <Link
            href="/admin/about"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <User className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              About & Biography
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Edit headline, narrative story, official portrait photo, location, and creative philosophy.
            </p>
          </Link>

          {/* Resume & Credentials */}
          <Link
            href="/admin/resume"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Resume & Credentials
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Upload latest PDF resume, update download destination, and preview in browser.
            </p>
          </Link>

          {/* Website Settings */}
          <Link
            href="/admin/settings"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Website Settings & SEO
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              SEO meta tags, social preview images, contact channels, and official wordmark logos.
            </p>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          4. RECENT ACTIVITY: Published Work Table with Quick Edits
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/15 mb-4">
          <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold">
            RECENT PORTFOLIO PROJECTS
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-sans font-bold uppercase tracking-widest text-copper hover:underline"
          >
            View All ({projects.length}) &rarr;
          </Link>
        </div>

        <div className="border border-charcoal/15 divide-y divide-charcoal/10 bg-ivory">
          {projects.slice(0, 6).map((proj) => (
            <div
              key={proj.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-copper/5 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-base text-charcoal">
                    {proj.title}
                  </span>
                  {proj.isPublished ? (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-sage/20 text-charcoal border border-sage/40">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-charcoal/10 text-charcoal-600 border border-charcoal/20">
                      Draft
                    </span>
                  )}
                  {proj.isFeatured && (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-copper/20 text-copper border border-copper/30">
                      Featured
                    </span>
                  )}
                </div>
                <div className="text-xs font-sans text-charcoal-500">
                  <span>{proj.category}</span>
                  <span className="mx-2">·</span>
                  <span>{proj.projectYear}</span>
                  <span className="mx-2">·</span>
                  <span>{proj.clientName || 'Direct Client'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Link
                  href={`/admin/projects/${proj.id}`}
                  className="px-3 py-1.5 border border-charcoal/20 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal hover:border-copper hover:text-copper transition-colors"
                >
                  Edit CMS
                </Link>
                {proj.isPublished && (
                  <Link
                    href={`/work/${proj.slug}`}
                    target="_blank"
                    className="p-1.5 text-charcoal-400 hover:text-copper transition-colors"
                    title="View case study on live site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
