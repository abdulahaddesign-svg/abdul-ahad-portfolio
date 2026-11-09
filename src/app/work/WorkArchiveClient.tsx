'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = [
  'All',
  'Branding',
  'Graphic Design',
  'Social Media',
  'UI/UX',
  'Motion Graphics',
  'Video Editing',
  'Web & App',
  'Packaging & Print',
];

interface WorkArchiveClientProps {
  initialProjects: Project[];
  initialCategories?: string[];
}

export function WorkArchiveClient({ initialProjects, initialCategories }: WorkArchiveClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(() => {
    const list = initialCategories && initialCategories.length > 0 ? initialCategories : [
      'Branding',
      'Graphic Design',
      'Social Media',
      'UI/UX',
      'Motion Graphics',
      'Video Editing',
      'Web & App',
      'Packaging & Print',
    ];
    return ['All', ...list.filter(c => c !== 'All')];
  });

  // Real-time listener for instant portfolio updates
  useEffect(() => {
    setProjects(initialProjects);

    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel('realtime:public_projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        async () => {
          try {
            const res = await fetch('/api/projects');
            if (res.ok) {
              const fresh = await res.json();
              if (Array.isArray(fresh) && fresh.length > 0) {
                setProjects(fresh);
              }
            }
          } catch {
            // Keep current
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialProjects]);

  const filtered = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pt-32 sm:pt-40 pb-32 bg-ivory text-charcoal min-h-screen select-none">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="pb-16 border-b border-charcoal/15">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-4">
            Index / {filtered.length} Projects
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-charcoal leading-none">
            Selected Work
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-charcoal-600 font-sans max-w-2xl font-light">
            An archive of visual identities, editorial publications, digital products, and motion explorations.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="py-6 sm:py-7 border-b border-charcoal/15 flex flex-wrap items-center gap-x-6 sm:gap-x-8 md:gap-x-9 gap-y-3 text-[13px] sm:text-[14px] md:text-[15px] font-sans font-semibold uppercase tracking-[0.14em]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-200 relative pb-1.5 pt-0.5 ${
                selectedCategory === category
                  ? 'text-copper font-bold'
                  : 'text-charcoal-600 dark:text-ivory/60 hover:text-charcoal dark:hover:text-ivory'
              }`}
            >
              <span>{category}</span>
              {selectedCategory === category && (
                <motion.span
                  layoutId="work-filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper"
                />
              )}
            </button>
          ))}
        </div>

        {/* Editorial Project Grid (Oversized Images, Minimal Layout) */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 pt-16">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group space-y-5"
              >
                <Link href={`/work/${project.slug}`} className="block relative">
                  <div className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/15 overflow-hidden">
                    <SafeImage
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fallback="/projects/freelance/branding-cover.svg"
                    />
                  </div>
                </Link>

                <div className="flex items-baseline justify-between pt-2 border-t border-charcoal/10 text-xs font-sans">
                  <span className="text-copper font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-charcoal-400 font-mono">
                    {project.projectYear}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-copper transition-colors">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-charcoal-600 font-sans line-clamp-2 font-light">
                      {project.shortDescription}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/work/${project.slug}`}
                        className="text-xs font-sans font-bold uppercase tracking-[0.16em] text-charcoal-500 hover:text-copper transition-colors"
                      >
                        Read Case Study &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* External Project Link Arrow (only displayed when an external destination exists) */}
                  {(project.liveWebsiteUrl || project.appStoreUrl || project.playStoreUrl) && (
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <a
                        href={project.liveWebsiteUrl || project.appStoreUrl || project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-copper hover:bg-copper hover:text-ivory text-copper transition-all duration-300"
                        title={project.externalLinkLabel || 'Launch External Project'}
                        aria-label={`Launch ${project.externalLinkLabel || 'external project'} for ${project.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400">
                        {project.liveWebsiteUrl ? 'Live Web' : project.appStoreUrl ? 'App Store' : 'Play Store'}
                      </span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-charcoal-500 font-sans text-sm">
            No projects found in category "{selectedCategory}".
          </div>
        )}
      </div>
    </div>
  );
}
