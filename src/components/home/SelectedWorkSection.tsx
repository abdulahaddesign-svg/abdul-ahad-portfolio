'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { SafeImage } from '@/components/ui/SafeImage';

interface SelectedWorkSectionProps {
  projects: Project[];
}

export function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const pool = projects && projects.length > 0 ? projects : [];
  const gridProjects = pool.slice(0, 9);

  return (
    <section
      id="selected-works"
      aria-label="Selected Works & Case Studies"
      className="py-24 sm:py-36 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 select-none transition-colors duration-300"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="pb-8 mb-14 sm:mb-16 border-b border-charcoal/15 dark:border-ivory/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
              07 / EDITORIAL ARCHIVE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-charcoal dark:text-ivory tracking-tighter">
              Selected Works
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.18em] text-charcoal-500 dark:text-ivory/60">
            <span>{gridProjects.length} Curated Projects</span>
            <span className="text-copper">/</span>
            <Link
              href="/work"
              className="text-copper font-bold hover:underline transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper"
            >
              <span>View Full Index</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 x 3 Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {gridProjects.map((project, idx) => (
            <motion.article
              key={`grid-3x3-${project.id}-${idx}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <Link
                href={`/work/${project.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                {/* Sharp Edged Image Box */}
                <div className="relative aspect-[16/11] w-full bg-white dark:bg-charcoal-900 border border-charcoal/15 dark:border-ivory/15 overflow-hidden rounded-none shadow-sm transition-all duration-300 group-hover:border-copper group-hover:shadow-md">
                  <SafeImage
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fallback="/projects/freelance/branding-cover.svg"
                    className="object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Sharp Hover Tag */}
                  <div className="absolute top-4 right-4 bg-charcoal text-ivory px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 shadow-lg">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3 text-copper" />
                  </div>

                  {/* Year Tag */}
                  <div className="absolute bottom-4 left-4 bg-charcoal/90 text-ivory px-2.5 py-1 text-[10px] font-mono tracking-widest rounded-none">
                    {project.projectYear || '2025'}
                  </div>
                </div>

                {/* Text Meta */}
                <div className="pt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-copper font-mono uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-charcoal-400 dark:text-ivory/40 text-[11px]">
                      {project.clientName || 'Brand Identity'}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-charcoal dark:text-ivory tracking-tight group-hover:text-copper transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-charcoal-600 dark:text-ivory/70 line-clamp-2 font-light leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
