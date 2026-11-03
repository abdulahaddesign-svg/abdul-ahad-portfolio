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

  // Vertical scroll progress over this tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Row 1: Left to Right
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-16%', '12%']);
  // Row 2: Right to Left (slightly different range for subtle depth)
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  // Populate two abundant rows with alternating project selections
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

  return (
    <section
      id="portfolio-strip"
      ref={containerRef}
      className="relative bg-charcoal text-ivory py-24 sm:py-36 overflow-hidden border-b border-charcoal-800 select-none"
    >
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
            Selected Work
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-ivory tracking-tighter">
            Featured Projects
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.18em] text-charcoal-400">
          <span>Scroll to Explore Archive</span>
          <span className="text-copper">/</span>
          <Link href="/work" className="text-copper hover:text-ivory transition-colors underline">
            View Complete Index &rarr;
          </Link>
        </div>
      </div>

      {/* Exactly Two Alternating Horizontal Motion Rows */}
      <div className="space-y-8 sm:space-y-12">
        {/* ROW 1: Moves Left to Right */}
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

        {/* ROW 2: Moves Right to Left */}
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

      {/* Bottom Sub-Indicator */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mt-16 flex items-center justify-between text-xs font-sans text-charcoal-400">
        <span>Curated Visual Library</span>
        <span>Every piece dynamic via Admin CMS</span>
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

      {/* Understated bottom caption */}
      <div className="mt-3 flex items-baseline justify-between text-xs font-sans text-charcoal-400">
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
