'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { SafeImage } from '@/components/ui/SafeImage';

interface FeaturedMotionSectionProps {
  projects: Project[];
}

function ProjectStripCard({
  project,
}: {
  project: Project;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative shrink-0 w-[360px] sm:w-[460px] md:w-[500px] block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
    >
      <div
        className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/20 dark:border-ivory/20 overflow-hidden shadow-2xl transition-all duration-700 ease-out group-hover:border-copper"
      >
        <SafeImage
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          fallback="/projects/freelance/branding-cover.svg"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Card Overlay Meta */}
        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 bg-charcoal/80 text-ivory backdrop-blur-sm border border-ivory/10">
              {project.category}
            </span>
            <div className="w-8 h-8 rounded-full bg-ivory text-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-4 h-4 text-charcoal" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono text-copper uppercase tracking-wider block mb-1">
              {project.clientName || 'Selected Case Study'}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-2xl text-ivory tracking-tight drop-shadow-md">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedMotionSection({ projects }: FeaturedMotionSectionProps) {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setProjectList(projects);

    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel('realtime:motion_projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, async () => {
        try {
          const res = await fetch('/api/projects');
          if (res.ok) {
            const fresh = await res.json();
            if (Array.isArray(fresh) && fresh.length > 0) {
              setProjectList(fresh);
            }
          }
        } catch {
          // Keep current
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projects]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start end', 'end start'],
  });

  // Row 1: Left to Right
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-16%', '12%']);
  // Row 2: Right to Left
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  const pool = projectList.length > 0 ? projectList : [];
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
      ref={scrollContainerRef}
      aria-label="Featured Works in Motion"
      className="relative bg-charcoal text-ivory pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden select-none border-b border-charcoal-800"
    >
      {/* Ticker Header */}
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
            05 / KINETIC HORIZON
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tighter">
            Featured in Motion
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
            className="flex gap-6 sm:gap-8 md:gap-10 w-max will-change-transform"
          >
            {row1Items.map((project, idx) => (
              <ProjectStripCard
                key={`r1-${project.id}-${idx}`}
                project={project}
              />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Right to Left */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={shouldReduceMotion ? {} : { x: xRow2 }}
            className="flex gap-6 sm:gap-8 md:gap-10 w-max will-change-transform"
          >
            {row2Items.map((project, idx) => (
              <ProjectStripCard
                key={`r2-${project.id}-${idx}`}
                project={project}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
