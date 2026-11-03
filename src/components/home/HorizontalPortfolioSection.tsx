'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface HorizontalPortfolioSectionProps {
  projects: Project[];
}

export function HorizontalPortfolioSection({ projects }: HorizontalPortfolioSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for the 2-row horizontal motion
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start end', 'end start'],
  });

  // Row 1: Left to Right
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-16%', '12%']);
  // Row 2: Right to Left
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  const pool = projects.length > 0 ? projects : [];
  const getRowItems = (offset: number) => {
    if (pool.length === 0) return [];
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(pool[(i + offset) % pool.length]);
    }
    return items;
  };

  const row1Items = getRowItems(0);
  const row2Items = getRowItems(3);

  // Exactly 9 projects for the 3 x 3 grid
  const gridProjects = pool.slice(0, 9);

  return (
    <>
      {/* =========================================================================
          PART 1: TWO SCROLLING HORIZONTAL ROWS (Continuous kinetic motion)
          ========================================================================= */}
      <section
        id="portfolio-strip"
        ref={scrollContainerRef}
        className="relative bg-charcoal text-ivory pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden select-none border-b border-charcoal-800"
      >
        {/* Ticker Header */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
              Kinetic Horizon
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tighter">
              Featured Works in Motion
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.18em] text-charcoal-400">
            <span>Scroll to Shift Perspectives</span>
            <span className="text-copper">/</span>
            <span className="text-ivory font-mono">02 HORIZONTAL ROWS</span>
          </div>
        </div>

        {/* 2 Horizontal Motion Rows */}
        <div className="space-y-6 sm:space-y-10">
          {/* ROW 1: Left to Right */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={shouldReduceMotion ? {} : { x: xRow1 }}
              className="flex gap-6 sm:gap-10 w-max will-change-transform"
            >
              {row1Items.map((project, idx) => (
                <ProjectStripCard
                  key={`r1-${project.id}-${idx}`}
                  project={project}
                  widthClass={
                    idx % 3 === 0
                      ? 'w-[420px] sm:w-[540px]'
                      : idx % 3 === 1
                      ? 'w-[360px] sm:w-[460px]'
                      : 'w-[480px] sm:w-[600px]'
                  }
                  aspectRatio={
                    idx % 3 === 0
                      ? 'aspect-[16/10]'
                      : idx % 3 === 1
                      ? 'aspect-[4/3]'
                      : 'aspect-[21/9]'
                  }
                />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: Right to Left */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={shouldReduceMotion ? {} : { x: xRow2 }}
              className="flex gap-6 sm:gap-10 w-max will-change-transform"
            >
              {row2Items.map((project, idx) => (
                <ProjectStripCard
                  key={`r2-${project.id}-${idx}`}
                  project={project}
                  widthClass={
                    idx % 3 === 0
                      ? 'w-[460px] sm:w-[580px]'
                      : idx % 3 === 1
                      ? 'w-[400px] sm:w-[500px]'
                      : 'w-[360px] sm:w-[440px]'
                  }
                  aspectRatio={
                    idx % 3 === 0
                      ? 'aspect-[4/3]'
                      : idx % 3 === 1
                      ? 'aspect-[16/10]'
                      : 'aspect-[3/2]'
                  }
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 2: 3 x 3 GRID UNDER THE 2 SCROLLING ROWS
          - Background: Warm Ivory (#F4EFE6) — NOT charcoal black
          - Sharp Edges (rounded-none)
          - Exactly 3 columns x 3 rows (9 projects)
          - Duo Fankaar inspired presentation with clean typography
          ========================================================================= */}
      <section className="py-24 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15 select-none">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          {/* Section Header */}
          <div className="pb-8 mb-14 sm:mb-16 border-b border-charcoal/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
                Selected Portfolio
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-charcoal tracking-tighter">
                Curated Work
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.18em] text-charcoal-500">
              <span>9 Selected Projects</span>
              <span className="text-copper">/</span>
              <Link href="/work" className="text-copper font-bold hover:text-charcoal transition-colors underline">
                View Full Archive &rarr;
              </Link>
            </div>
          </div>

          {/* 3 x 3 Project Grid with Sharp Edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {gridProjects.map((project, idx) => (
              <motion.article
                key={`grid-3x3-${project.id}-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link href={`/work/${project.slug}`} className="block">
                  {/* Sharp Edged Image Box (rounded-none) */}
                  <div className="relative aspect-[16/11] w-full bg-white border border-charcoal/15 overflow-hidden rounded-none shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Minimal Sharp Hover Reveal Tag */}
                    <div className="absolute top-4 right-4 bg-charcoal text-ivory px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
                    </div>
                  </div>

                  {/* Clean Understated Caption Under Each Card (Sharp styling) */}
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-copper transition-colors truncate">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-wider text-charcoal-500 shrink-0">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Bottom Fast Action */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-charcoal/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-xs font-mono text-charcoal-500 uppercase tracking-wider">
              Explore 50+ Client Projects across Branding, UI/UX &amp; Motion
            </span>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-4 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-colors rounded-none"
            >
              <span>Explore All Projects &amp; Disciplines</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface ProjectStripCardProps {
  project: Project;
  widthClass: string;
  aspectRatio: string;
}

function ProjectStripCard({ project, widthClass, aspectRatio }: ProjectStripCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex-shrink-0 ${widthClass} block cursor-pointer rounded-none`}
    >
      <div
        className={`relative ${aspectRatio} w-full bg-charcoal-900 border border-charcoal-800 overflow-hidden rounded-none`}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 380px, 600px"
          className="object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Minimal Editorial Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between rounded-none">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-none bg-copper text-ivory flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
              {project.category} · {project.projectYear}
            </span>
            <h4 className="font-display font-bold text-lg text-ivory leading-snug">
              {project.title}
            </h4>
          </div>
        </div>
      </div>

      {/* Understated Minimal Caption */}
      <div className="mt-3 flex items-baseline justify-between text-xs sm:text-sm font-sans">
        <span className="font-medium text-ivory truncate max-w-[70%] group-hover:text-copper transition-colors">
          {project.title}
        </span>
        <span className="text-[11px] font-mono text-charcoal-400">
          {project.category}
        </span>
      </div>
    </Link>
  );
}