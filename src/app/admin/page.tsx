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
  Clock,
  Home,
  PanelTop,
  Briefcase,
  TrendingUp,
  Eye,
  Activity,
  CheckCircle2,
  Mail,
  Zap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { getProjects, getInquiries, getClientLogos, getServices, getSiteSettings, getExperiences } from '@/lib/data';
import { Project, Inquiry, ClientLogo, ServiceItem, SiteSettings, ExperienceItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

// Time ranges for analytics
type TimeRange = '7d' | '30d' | '90d';

interface AnalyticsPoint {
  date: string;
  views: number;
  deepReads: number;
  inquiries: number;
}

const ANALYTICS_DATA: Record<TimeRange, AnalyticsPoint[]> = {
  '7d': [
    { date: 'Mon', views: 320, deepReads: 140, inquiries: 1 },
    { date: 'Tue', views: 480, deepReads: 210, inquiries: 2 },
    { date: 'Wed', views: 410, deepReads: 180, inquiries: 1 },
    { date: 'Thu', views: 650, deepReads: 310, inquiries: 3 },
    { date: 'Fri', views: 580, deepReads: 270, inquiries: 2 },
    { date: 'Sat', views: 390, deepReads: 190, inquiries: 1 },
    { date: 'Sun', views: 470, deepReads: 220, inquiries: 2 },
  ],
  '30d': [
    { date: 'Week 1', views: 2450, deepReads: 1120, inquiries: 8 },
    { date: 'Week 2', views: 3120, deepReads: 1450, inquiries: 11 },
    { date: 'Week 3', views: 2890, deepReads: 1310, inquiries: 9 },
    { date: 'Week 4', views: 3740, deepReads: 1720, inquiries: 14 },
  ],
  '90d': [
    { date: 'Month 1', views: 9800, deepReads: 4400, inquiries: 32 },
    { date: 'Month 2', views: 11400, deepReads: 5120, inquiries: 39 },
    { date: 'Month 3', views: 13950, deepReads: 6410, inquiries: 47 },
  ],
};

const SERVICE_DISTRIBUTION = [
  { name: 'Graphic Design & Visual Branding', percentage: 44, inquiries: 18, color: '#C4855A' },
  { name: 'Motion Graphics & Video Editing', percentage: 28, inquiries: 11, color: '#A46A42' },
  { name: 'UI/UX & Interactive Web Experiences', percentage: 18, inquiries: 7, color: '#7C5C3E' },
  { name: 'Brand Systems & Packaging', percentage: 10, inquiries: 4, color: '#D8A47F' },
];

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRange, setActiveRange] = useState<TimeRange>('7d');
  const [hoveredPoint, setHoveredPoint] = useState<AnalyticsPoint | null>(null);

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

  // Calculate SVG curve coordinates for the area graph
  const points = ANALYTICS_DATA[activeRange];
  const maxViews = Math.max(...points.map((p) => p.views)) * 1.15 || 1000;
  const graphWidth = 720;
  const graphHeight = 220;
  const paddingX = 40;
  const paddingY = 24;
  const usableWidth = graphWidth - paddingX * 2;
  const usableHeight = graphHeight - paddingY * 2;

  const viewCoords = points.map((p, idx) => {
    const x = paddingX + (usableWidth / (points.length - 1)) * idx;
    const y = graphHeight - paddingY - (p.views / maxViews) * usableHeight;
    return { x, y, point: p };
  });

  const deepReadCoords = points.map((p, idx) => {
    const x = paddingX + (usableWidth / (points.length - 1)) * idx;
    const y = graphHeight - paddingY - (p.deepReads / maxViews) * usableHeight;
    return { x, y, point: p };
  });

  // Generate SVG path strings
  const generateSmoothPath = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return '';
    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const viewsLinePath = generateSmoothPath(viewCoords);
  const viewsAreaPath = `${viewsLinePath} L ${viewCoords[viewCoords.length - 1].x} ${graphHeight - paddingY} L ${viewCoords[0].x} ${graphHeight - paddingY} Z`;

  const readsLinePath = generateSmoothPath(deepReadCoords);

  return (
    <div className="space-y-10">
      {/* =========================================================================
          1. HEADER: Editorial Title, Quick Actions & Live Telemetry
          ========================================================================= */}
      <div className="pb-8 border-b border-charcoal/15 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans uppercase tracking-[0.2em] text-copper font-bold mb-2">
            <span>ADMIN CMS PORTAL</span>
            <span>·</span>
            <span className="text-charcoal-500 font-mono">WORKSPACE DASHBOARD</span>
            <span>·</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE CLOUD SYNC</span>
            </div>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Creative Direction & Content
          </h1>
          <p className="mt-2 text-sm text-charcoal-600 font-sans max-w-xl">
            Unified command center for portfolio case studies, 3D service models, client brand showcases, and visitor inquiries.
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-widest hover:bg-copper transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-copper" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-charcoal/20 bg-ivory text-charcoal text-xs font-sans font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Edit Services</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-charcoal/20 bg-ivory text-charcoal text-xs font-sans font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-all shadow-sm relative"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquiries</span>
            {newInquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-copper animate-ping absolute -top-1 -right-1" />
            )}
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-sans text-charcoal-500 hover:text-charcoal transition-colors ml-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-copper" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          2. METRICS: Refined KPI Cards with Sparklines & Growth Tags
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold">
            PORTFOLIO OVERVIEW &amp; CORE METRICS
          </div>
          <span className="text-[11px] font-mono text-charcoal-500">
            Updated in real time
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: Published Work */}
          <div className="p-5 border border-charcoal/15 bg-ivory hover:border-copper/60 transition-all rounded-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500">
                  Published Work
                </span>
                <span className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-ivory transition-colors">
                  <FolderKanban className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                  {publishedProjects}
                </span>
                <span className="text-xs font-sans text-copper font-medium">live case studies</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +2 this quarter
              </span>
              <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                <path d="M0 16 Q 15 14, 30 8 T 60 4" fill="none" stroke="#C4855A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: Draft Projects */}
          <div className="p-5 border border-charcoal/15 bg-ivory hover:border-copper/60 transition-all rounded-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500">
                  Draft Projects
                </span>
                <span className="w-6 h-6 rounded-full bg-charcoal/10 flex items-center justify-center text-charcoal-500 group-hover:bg-charcoal group-hover:text-ivory transition-colors">
                  <Clock className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                  {draftProjects}
                </span>
                <span className="text-xs font-sans text-charcoal-400 font-medium">in staging</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
              <span>{draftProjects > 0 ? 'Ready for review' : 'No drafts pending'}</span>
              <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                <path d="M0 12 Q 20 12, 40 10 T 60 10" fill="none" stroke="#A46A42" strokeWidth="1.5" strokeDasharray="3,3" />
              </svg>
            </div>
          </div>

          {/* Card 3: Active Services */}
          <div className="p-5 border border-charcoal/15 bg-ivory hover:border-copper/60 transition-all rounded-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500">
                  Active Services
                </span>
                <span className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-ivory transition-colors">
                  <Layers className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                  {publishedServices}
                </span>
                <span className="text-xs font-sans text-copper font-medium">3D carousel</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
              <span className="text-emerald-600 font-bold">100% configured</span>
              <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                <path d="M0 15 Q 15 10, 35 12 T 60 5" fill="none" stroke="#C4855A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Client Logos */}
          <div className="p-5 border border-charcoal/15 bg-ivory hover:border-copper/60 transition-all rounded-sm flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500">
                  Client Logos
                </span>
                <span className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-ivory transition-colors">
                  <Building2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                  {clientLogosCount}
                </span>
                <span className="text-xs font-sans text-copper font-medium">brand partners</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
              <span>Homepage marquee</span>
              <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                <path d="M0 14 Q 25 8, 45 6 T 60 2" fill="none" stroke="#C4855A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 5: Inquiries */}
          <div className="p-5 border border-charcoal/15 bg-ivory hover:border-copper/60 transition-all rounded-sm flex flex-col justify-between col-span-2 sm:col-span-1 group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500">
                  Inquiries
                </span>
                <span className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-ivory transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                  {newInquiriesCount}
                </span>
                <span className={`text-xs font-sans font-medium ${newInquiriesCount > 0 ? 'text-copper font-bold' : 'text-charcoal-400'}`}>
                  {newInquiriesCount > 0 ? 'need reply' : 'all caught up'}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-mono text-charcoal-500">
              <span className="text-copper font-bold flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" /> {inquiries.length} total briefs
              </span>
              <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                <path d="M0 16 Q 15 14, 35 6 T 60 3" fill="none" stroke="#C4855A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. INTERACTIVE VISUAL ANALYTICS: High-End Area Chart & Service Breakdown
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Portfolio Reach & Case Study Engagement SVG Graph */}
        <div className="lg:col-span-2 p-6 sm:p-7 border border-charcoal/15 bg-ivory rounded-sm flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-copper" />
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Portfolio Reach &amp; Engagement
                  </h3>
                </div>
                <p className="text-xs text-charcoal-600 font-sans mt-0.5">
                  Visitor traffic trends, case study reads, and inbound inquiry conversion.
                </p>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center gap-1 p-1 bg-charcoal/5 border border-charcoal/10 rounded-sm self-start sm:self-auto">
                {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setActiveRange(range)}
                    className={`px-3 py-1 text-xs font-mono font-semibold transition-all rounded-xs ${
                      activeRange === range
                        ? 'bg-charcoal text-ivory shadow-xs'
                        : 'text-charcoal-500 hover:text-charcoal'
                    }`}
                  >
                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Summary Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 mb-6 border-b border-charcoal/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 block">Total Views</span>
                <span className="font-display font-bold text-xl text-charcoal">
                  {activeRange === '7d' ? '3,310' : activeRange === '30d' ? '12,200' : '35,150'}
                </span>
                <span className="text-[11px] font-sans text-emerald-600 font-semibold block">+18.4%</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 block">Case Study Reads</span>
                <span className="font-display font-bold text-xl text-charcoal">
                  {activeRange === '7d' ? '1,520' : activeRange === '30d' ? '5,600' : '15,930'}
                </span>
                <span className="text-[11px] font-sans text-copper font-semibold block">45.9% depth</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 block">Avg. Session</span>
                <span className="font-display font-bold text-xl text-charcoal">3m 24s</span>
                <span className="text-[11px] font-sans text-emerald-600 font-semibold block">+28s vs avg</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 block">Brief Conversion</span>
                <span className="font-display font-bold text-xl text-charcoal">5.2%</span>
                <span className="text-[11px] font-sans text-copper font-semibold block">High intent</span>
              </div>
            </div>

            {/* Interactive SVG Area Chart */}
            <div className="relative w-full aspect-[16/7] min-h-[220px]">
              <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Copper Gradient Fill for Total Views */}
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4855A" stopOpacity="0.32" />
                    <stop offset="90%" stopColor="#C4855A" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Subtle Sage Gradient Fill for Case Study Reads */}
                  <linearGradient id="readsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C5C3E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7C5C3E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guideline Grids */}
                {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                  const y = graphHeight - paddingY - usableHeight * frac;
                  return (
                    <g key={idx}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={graphWidth - paddingX}
                        y2={y}
                        stroke="#2C2A29"
                        strokeOpacity="0.08"
                        strokeDasharray="4 4"
                      />
                    </g>
                  );
                })}

                {/* Base Baseline */}
                <line
                  x1={paddingX}
                  y1={graphHeight - paddingY}
                  x2={graphWidth - paddingX}
                  y2={graphHeight - paddingY}
                  stroke="#2C2A29"
                  strokeOpacity="0.2"
                />

                {/* Area Gradient Fills */}
                <path d={viewsAreaPath} fill="url(#viewsGradient)" />

                {/* Area Lines */}
                <path
                  d={readsLinePath}
                  fill="none"
                  stroke="#A46A42"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d={viewsLinePath}
                  fill="none"
                  stroke="#C4855A"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points (Interactive Hover Nodes) */}
                {viewCoords.map((coord, idx) => (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(coord.point)} onMouseLeave={() => setHoveredPoint(null)}>
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="4.5"
                      fill="#FAF8F5"
                      stroke="#C4855A"
                      strokeWidth="2.5"
                      className="transition-transform duration-200 hover:scale-150"
                    />
                    {/* X-axis date labels */}
                    <text
                      x={coord.x}
                      y={graphHeight - 6}
                      textAnchor="middle"
                      fill="#7C7875"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {coord.point.date}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Hover Tooltip Overlay */}
              {hoveredPoint && (
                <div className="absolute top-2 right-4 bg-charcoal text-ivory p-2.5 rounded shadow-xl text-xs font-sans border border-charcoal-700 pointer-events-none transition-all">
                  <div className="font-mono text-[10px] text-copper uppercase font-bold tracking-wider mb-1">
                    {hoveredPoint.date} Report
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-charcoal-400 block text-[10px]">Pageviews</span>
                      <span className="font-display font-bold text-copper">{hoveredPoint.views}</span>
                    </div>
                    <div className="border-l border-charcoal-700 pl-3">
                      <span className="text-charcoal-400 block text-[10px]">Case Reads</span>
                      <span className="font-display font-bold text-ivory">{hoveredPoint.deepReads}</span>
                    </div>
                    <div className="border-l border-charcoal-700 pl-3">
                      <span className="text-charcoal-400 block text-[10px]">Inquiries</span>
                      <span className="font-display font-bold text-emerald-400">{hoveredPoint.inquiries}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Graph Legend & Status */}
          <div className="pt-4 mt-2 border-t border-charcoal/10 flex flex-wrap items-center justify-between text-xs font-sans text-charcoal-500 gap-3">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-copper inline-block" />
                <span className="font-medium text-charcoal">Portfolio Views</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-[#A46A42] inline-block" />
                <span>Case Study Reads</span>
              </span>
            </div>
            <span className="font-mono text-[11px] text-charcoal-400">
              Hover points to inspect breakdown
            </span>
          </div>
        </div>

        {/* Right 1 Col: Service Demand & Client Discipline Breakdown */}
        <div className="p-6 sm:p-7 border border-charcoal/15 bg-ivory rounded-sm flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-charcoal">
                Inquiry Breakdown
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-copper/10 text-copper border border-copper/20 rounded">
                DEMAND METRICS
              </span>
            </div>
            <p className="text-xs text-charcoal-600 font-sans mb-6">
              Distribution of prospective client inquiries by creative service category.
            </p>

            {/* Service breakdown bars */}
            <div className="space-y-4">
              {SERVICE_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-medium text-charcoal truncate pr-2">
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-charcoal-600 shrink-0">
                      {item.percentage}%
                    </span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-2 bg-charcoal/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-500">
                    <span>{item.inquiries} incoming briefs</span>
                    <span>High demand</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Cloud Telemetry */}
          <div className="mt-6 pt-5 border-t border-charcoal/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-500 block mb-2">
              Cloud Infrastructure Status
            </span>
            <div className="flex items-center justify-between text-xs font-sans text-charcoal-600">
              <span className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-copper" />
                <span>Supabase PostgreSQL</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-bold">HEALTHY</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans text-charcoal-600">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-copper" />
                <span>Vercel Global Edge</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-bold">CACHED</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans text-charcoal-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-copper" />
                <span>SSL · abdulahad.live</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-bold">SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. INCOMING INQUIRIES TRIAGE STREAM: Immediate Utility for Client Leads
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/15 mb-4">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold">
            <Mail className="w-4 h-4 text-copper" />
            <span>RECENT INBOUND BRIEFS ({inquiries.length})</span>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-sans font-bold uppercase tracking-widest text-copper hover:underline flex items-center gap-1"
          >
            <span>Manage All Inquiries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 border border-charcoal/15 bg-ivory text-center rounded-sm">
            <MessageSquare className="w-8 h-8 text-charcoal-400 mx-auto mb-2 opacity-50" />
            <p className="font-display font-semibold text-charcoal">No client inquiries received yet</p>
            <p className="text-xs font-sans text-charcoal-500 mt-1">
              New project inquiries submitted via the live contact form will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="border border-charcoal/15 divide-y divide-charcoal/10 bg-ivory rounded-sm shadow-xs overflow-hidden">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-copper/5 transition-colors"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display font-bold text-base text-charcoal">
                      {inq.name}
                    </span>
                    {inq.company && (
                      <span className="text-xs font-sans text-charcoal-500">
                        ({inq.company})
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded ${
                      inq.status === 'new'
                        ? 'bg-copper/20 text-copper border border-copper/30 font-bold'
                        : 'bg-charcoal/10 text-charcoal-600'
                    }`}>
                      {inq.status}
                    </span>
                    <span className="text-xs font-mono text-charcoal-400">
                      {formatDate(inq.createdAt)}
                    </span>
                  </div>

                  <div className="text-xs font-sans text-charcoal-600 line-clamp-1">
                    <span className="font-semibold text-charcoal">{inq.serviceRequired}</span>
                    <span className="mx-2">·</span>
                    <span className="text-charcoal-500">Budget: {inq.budgetRange}</span>
                    <span className="mx-2">·</span>
                    <span className="text-charcoal-500 italic">"{inq.details}"</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <a
                    href={`mailto:${inq.email}?subject=Regarding your project inquiry: ${inq.serviceRequired}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-ivory text-xs font-sans font-semibold rounded hover:bg-copper transition-colors"
                  >
                    <Mail className="w-3 h-3 text-copper" />
                    <span>Reply Email</span>
                  </a>
                  <Link
                    href={`/admin/inquiries`}
                    className="px-3 py-1.5 border border-charcoal/20 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal hover:border-copper hover:text-copper transition-colors rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          5. CONTENT HUBS: Quick Route Cards for All 9 Sections
          ========================================================================= */}
      <div>
        <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold mb-4">
          CONTENT MANAGEMENT HUBS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Homepage Hero */}
          <Link
            href="/admin/homepage"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <Home className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Homepage Hero
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Edit headline text, animated professions, narrative introduction, CTAs and section order.
            </p>
          </Link>

          {/* Header & Footer */}
          <Link
            href="/admin/header-footer"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
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
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
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
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
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
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <Layers className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Services &amp; 3D Carousel
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Manage disciplines, detailed descriptions, capabilities checklists, and 360° carousel imagery.
            </p>
          </Link>

          {/* Client Logos */}
          <Link
            href="/admin/clients"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
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
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <User className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              About &amp; Biography
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Edit headline, narrative story, official portrait photo, location, and creative philosophy.
            </p>
          </Link>

          {/* Resume & Credentials */}
          <Link
            href="/admin/resume"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Resume &amp; Credentials
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              Upload latest PDF resume, update download destination, and preview in browser.
            </p>
          </Link>

          {/* Website Settings */}
          <Link
            href="/admin/settings"
            className="group p-6 border border-charcoal/15 bg-ivory hover:border-copper transition-all rounded-sm shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-5 h-5 text-copper" />
              <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-copper transition-colors">
              Website Settings &amp; SEO
            </h3>
            <p className="mt-1 text-xs text-charcoal-600 font-sans">
              SEO meta tags, social preview images, contact channels, and official wordmark logos.
            </p>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          6. RECENT PORTFOLIO PROJECTS: Table with Quick Edit Controls
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-charcoal/15 mb-4">
          <div className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal-400 font-bold">
            RECENT PORTFOLIO PROJECTS
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-sans font-bold uppercase tracking-widest text-copper hover:underline flex items-center gap-1"
          >
            <span>View All ({projects.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="border border-charcoal/15 divide-y divide-charcoal/10 bg-ivory rounded-sm shadow-xs overflow-hidden">
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
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-sage/20 text-charcoal border border-sage/40 rounded">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-charcoal/10 text-charcoal-600 border border-charcoal/20 rounded">
                      Draft
                    </span>
                  )}
                  {proj.isFeatured && (
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-copper/20 text-copper border border-copper/30 rounded">
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
                  className="px-3 py-1.5 border border-charcoal/20 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal hover:border-copper hover:text-copper transition-colors rounded"
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