'use client';

import React from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ExternalLink, 
  Globe, 
  Apple, 
  Play, 
  TrendingUp, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectDetailClientProps {
  project: Project;
  nextProject?: Project | null;
}

export function ProjectDetailClient({ project, nextProject }: ProjectDetailClientProps) {
  const prefersReduced = useReducedMotion();

  const approachText = project.approach || project.creativeProcess;
  const hasExternalLinks = Boolean(
    project.liveWebsiteUrl || project.appStoreUrl || project.playStoreUrl
  );

  // Modular case study sections with custom editable headings + fallback
  const displaySections = (project.sections && project.sections.length > 0)
    ? project.sections.filter(s => s.heading?.trim() || s.body?.trim())
    : ([
        project.fullDescription ? { id: 'sec-overview', heading: 'Context & Purpose', body: project.fullDescription } : null,
        project.challenge ? { id: 'sec-challenge', heading: 'Friction Points & Strategic Hurdles', body: project.challenge } : null,
        approachText ? { id: 'sec-approach', heading: 'Design Thinking & Methodology', body: approachText } : null,
        project.solution ? { id: 'sec-solution', heading: 'Executed Design Architecture', body: project.solution } : null,
      ].filter(Boolean) as { id: string; heading: string; body: string }[]);

  return (
    <article className="pt-32 sm:pt-40 pb-28 bg-ivory text-charcoal min-h-screen select-none">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ========================================================= */}
        {/* 1. TOP BREADCRUMB NAVIGATION                              */}
        {/* ========================================================= */}
        <div className="pb-10">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.2em] text-charcoal-400 hover:text-copper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio Index</span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL CASE STUDY HEADER                            */}
        {/* ========================================================= */}
        <header className="pb-14 border-b border-charcoal/15 space-y-8">
          {/* Category & Year Topline */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-copper"
          >
            <span className="font-bold">{project.category}</span>
            <span>·</span>
            <span>{project.projectYear}</span>
            {project.clientName && (
              <>
                <span>·</span>
                <span className="text-charcoal-500 font-sans tracking-wider">{project.clientName}</span>
              </>
            )}
          </motion.div>

          {/* Main Case Study Title */}
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] tracking-tighter text-charcoal leading-[0.96] max-w-6xl"
          >
            {project.title}
          </motion.h1>

          {/* Short Narrative Lead */}
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl text-charcoal-600 font-sans font-light max-w-4xl leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>

          {/* Metadata Matrix & External Actions */}
          <div className="pt-8 border-t border-charcoal/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-xs font-sans">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                  Client / Brand
                </span>
                <span className="font-bold text-charcoal text-sm">
                  {project.clientName || 'Independent Practice'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                  Role &amp; Discipline
                </span>
                <span className="font-bold text-charcoal text-sm">
                  {project.role}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                  Timeline
                </span>
                <span className="font-bold text-charcoal text-sm font-mono">
                  {project.projectYear}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                  Tools &amp; Stack
                </span>
                <span className="font-bold text-charcoal text-sm">
                  {project.toolsUsed?.join(', ') || 'Figma, Adobe Suite'}
                </span>
              </div>
            </div>

            {/* External Links (Live Website, App Store, Play Store) */}
            {hasExternalLinks && (
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.liveWebsiteUrl && (
                  <a
                    href={project.liveWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{project.externalLinkLabel || 'Live Website'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-copper group-hover:text-ivory" />
                  </a>
                )}

                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal/20 bg-white text-charcoal text-xs font-sans font-bold uppercase tracking-[0.16em] hover:border-copper hover:text-copper transition-colors"
                  >
                    <Apple className="w-3.5 h-3.5" />
                    <span>App Store</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
                  </a>
                )}

                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal/20 bg-white text-charcoal text-xs font-sans font-bold uppercase tracking-[0.16em] hover:border-copper hover:text-copper transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Google Play</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ========================================================= */}
        {/* 3. HERO PROJECT COVER (LARGE VIEWPORT COVERAGE)          */}
        {/* ========================================================= */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 sm:py-16"
        >
          <div className="relative aspect-[16/9] lg:aspect-[21/10] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden shadow-2xl">
            <SafeImage
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1820px) 100vw, 1820px"
              className="object-cover"
              fallback="/projects/freelance/branding-cover.svg"
            />
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 4. BEHANCE-STYLE CASE STUDY SECTIONS                      */}
        {/* ========================================================= */}
        {displaySections.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-16 sm:space-y-24 py-12">
            {displaySections.map((sec, idx) => (
              <motion.section
                key={sec.id || idx}
                initial={prefersReduced ? {} : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5 pt-12 first:pt-0 border-t border-charcoal/15 first:border-t-0"
              >
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-copper">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span className="w-6 h-px bg-copper/40" />
                  <span>Case Study Section</span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
                  {sec.heading}
                </h2>
                <div className="text-lg sm:text-xl text-charcoal-700 font-sans font-light leading-relaxed whitespace-pre-line">
                  {sec.body}
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. VISUAL SHOWCASE (FULL-WIDTH BEHANCE STYLE PLATES)      */}
        {/* ========================================================= */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 sm:py-24 space-y-12 sm:space-y-20 border-t border-charcoal/15">
            <div className="max-w-4xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-copper block">
                05 / Visual Showcase
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
                Design Artifacts &amp; Plates
              </h2>
            </div>

            <div className="space-y-10 sm:space-y-16">
              {project.gallery.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden shadow-2xl"
                >
                  <SafeImage
                    src={imgUrl}
                    alt={`${project.title} - Plate ${idx + 1}`}
                    fill
                    sizes="(max-width: 1820px) 100vw, 1820px"
                    className="object-cover"
                    fallback="/projects/freelance/branding-cover.svg"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal/80 backdrop-blur-sm border border-ivory/10 text-[11px] font-mono text-ivory uppercase tracking-widest">
                    Plate 0{idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* Video Embed (if provided)                                 */}
        {/* ========================================================= */}
        {project.videoUrl && (
          <div className="py-12 max-w-5xl mx-auto">
            <div className="relative aspect-video w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden shadow-2xl">
              <iframe
                src={project.videoUrl}
                title={`${project.title} Video Preview`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. MEASURABLE RESULTS & OUTCOMES                          */}
        {/* ========================================================= */}
        {project.results && project.results.length > 0 && (
          <section className="py-16 sm:py-24 border-t border-charcoal/15">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-copper block">
                  06 / Measurable Impact
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
                  Project Outcomes
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.results.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 bg-white border border-charcoal/15 flex items-start gap-4"
                  >
                    <TrendingUp className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                    <span className="text-base font-sans font-medium text-charcoal leading-snug">
                      {res}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 7. NEXT PROJECT EDITORIAL NAVIGATION                      */}
        {/* ========================================================= */}
        {nextProject && (
          <nav
            aria-label="Next Case Study"
            className="pt-20 sm:pt-28 pb-12 border-t border-charcoal/15"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-8">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-copper block">
                  Next Case Study
                </span>
                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-charcoal tracking-tight hover:text-copper transition-colors">
                  <Link href={`/work/${nextProject.slug}`}>
                    {nextProject.title}
                  </Link>
                </h3>
              </div>

              <Link
                href={`/work/${nextProject.slug}`}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-charcoal text-ivory text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-all duration-200 self-start sm:self-auto shadow-sm"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-4 h-4 text-copper group-hover:text-ivory group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <Link href={`/work/${nextProject.slug}`} className="block relative group overflow-hidden">
              <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden">
                <SafeImage
                  src={nextProject.coverImage}
                  alt={nextProject.title}
                  fill
                  sizes="(max-width: 1820px) 100vw, 1820px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fallback="/projects/freelance/branding-cover.svg"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
