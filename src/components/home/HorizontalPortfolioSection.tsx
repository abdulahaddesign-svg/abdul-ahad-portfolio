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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for the 2-row horizontal motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  // Diverse projects for the large editorial image grid
  const gridProjects = pool.slice(0, 8);

  return (
    <section
      id="portfolio-strip"
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 sm:py-36 overflow-hidden border-b border-charcoal-800 select-none"
    >
      {/* 1. Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
            Selected Work
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-ivory tracking-tighter">
            Curated Archive
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.18em] text-charcoal-400">
          <span>Kinetic Showcase &amp; Editorial Grid</span>
          <span className="text-copper">/</span>
          <Link href="/work" className="text-copper hover:text-ivory transition-colors underline">
            View Complete Index &rarr;
          </Link>
        </div>
      </div>

      {/* 2. Exactly Two Alternating Horizontal Motion Rows */}
      <div className="space-y-8 sm:space-y-12 mb-28 sm:mb-36">
        {/* ROW 1: Left to Right */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={shouldReduceMotion ? {} : { x: xRow1 }}
            className="flex gap-8 sm:gap-12 w-max will-change-transform"
          >
            {row1Items.map((project, idx) => (
              <ProjectStripCard
                key={`r1-${project.id}-${idx}`}
                project={project}
                widthClass={
                  idx % 3 === 0
                    ? 'w-[420px] sm:w-[560px]'
                    : idx % 3 === 1
                    ? 'w-[360px] sm:w-[480px]'
                    : 'w-[480px] sm:w-[620px]'
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
            className="flex gap-8 sm:gap-12 w-max will-change-transform"
          >
            {row2Items.map((project, idx) => (
              <ProjectStripCard
                key={`r2-${project.id}-${idx}`}
                project={project}
                widthClass={
                  idx % 3 === 0
                    ? 'w-[460px] sm:w-[600px]'
                    : idx % 3 === 1
                    ? 'w-[400px] sm:w-[520px]'
                    : 'w-[360px] sm:w-[460px]'
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

      {/* 3. Large Editorial Image Grid (More Images, Less Text) */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="pb-8 mb-14 border-b border-charcoal-800 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            DISCIPLINE SPECTRUM
          </span>
          <p className="text-xs sm:text-sm font-sans text-charcoal-400">
            Brand Identity / UI/UX / Motion / Packaging / Social / Video / Web
          </p>
        </div>

        {/* Asymmetrical Masonry Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-14 items-start">
          {gridProjects.map((project, idx) => {
            // Asymmetrical grid column spans & aspect ratios
            let colSpan = 'md:col-span-6';
            let aspect = 'aspect-[16/10]';

            if (idx === 0) {
              colSpan = 'md:col-span-8';
              aspect = 'aspect-[16/10]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-4';
              aspect = 'aspect-[4/5]';
            } else if (idx === 2) {
              colSpan = 'md:col-span-5';
              aspect = 'aspect-[4/3]';
            } else if (idx === 3) {
              colSpan = 'md:col-span-7';
              aspect = 'aspect-[16/10]';
            } else if (idx === 4) {
              colSpan = 'md:col-span-12';
              aspect = 'aspect-[21/9] sm:aspect-[24/9]';
            } else if (idx === 5) {
              colSpan = 'md:col-span-7';
              aspect = 'aspect-[16/10]';
            } else if (idx === 6) {
              colSpan = 'md:col-span-5';
              aspect = 'aspect-[4/3]';
            }

            return (
              <motion.div
                key={`grid-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} group`}
              >
                <Link href={`/work/${project.slug}`} className="block">
                  <div
                    className={`relative ${aspect} w-full bg-charcoal-900 border border-charcoal-800 overflow-hidden`}
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Corner Arrow Reveal on Hover */}
                    <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-copper text-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Understated Title & Category Only (Minimal Editorial Caption) */}
                  <div className="mt-4 flex items-baseline justify-between text-sm sm:text-base font-sans">
                    <h3 className="font-display font-bold text-ivory group-hover:text-copper transition-colors truncate max-w-[75%]">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 shrink-0">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Work Link */}
        <div className="mt-20 pt-10 border-t border-charcoal-800 flex items-center justify-between">
          <span className="text-xs font-mono text-charcoal-500">
            TOTAL ARCHIVE: {pool.length} PROJECTS
          </span>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper hover:text-ivory transition-colors"
          >
            <span>Explore All Projects &amp; Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
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
      className={`group relative flex-shrink-0 ${widthClass} block cursor-pointer`}
    >
      <div
        className={`relative ${aspectRatio} w-full bg-charcoal-900 border border-charcoal-800 overflow-hidden`}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 380px, 600px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Minimal Editorial Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-full bg-copper text-ivory flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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

      {/* Understated Minimal Caption: Title & Category Only */}
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