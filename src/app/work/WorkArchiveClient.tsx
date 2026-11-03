'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';

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
}

export function WorkArchiveClient({ initialProjects }: WorkArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = initialProjects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pt-36 sm:pt-44 pb-32 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
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

        {/* Minimal Category Filter Line */}
        <div className="py-8 border-b border-charcoal/15 flex flex-wrap gap-x-8 gap-y-3 text-xs font-sans uppercase tracking-[0.16em]">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`transition-colors duration-200 relative pb-1 ${
                selectedCategory === category
                  ? 'text-copper font-bold'
                  : 'text-charcoal-500 hover:text-charcoal font-medium'
              }`}
            >
              <span>{category}</span>
              {selectedCategory === category && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
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
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                  <div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-copper transition-colors">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-charcoal-600 font-sans line-clamp-2 font-light">
                      {project.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="w-10 h-10 border border-charcoal/20 flex items-center justify-center shrink-0 group-hover:border-copper group-hover:bg-copper group-hover:text-ivory transition-all duration-300"
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
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
