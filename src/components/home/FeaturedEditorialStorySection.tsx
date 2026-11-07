'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Project } from '@/lib/types';

interface FeaturedEditorialStorySectionProps {
  projects: Project[];
}

export function FeaturedEditorialStorySection({ projects }: FeaturedEditorialStorySectionProps) {
  // Select featured projects or fallback to first 3
  const featured = projects.filter((p) => p.isFeatured).slice(0, 3);
  const stories = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section className="py-24 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl pb-16 sm:pb-24">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
            In-Depth Case Studies
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-charcoal tracking-tighter">
            Featured Stories
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
            Examining the intersection of brand strategy, aesthetic precision, and commercial performance across selected flagship client engagements.
          </p>
        </div>

        {/* Stories Stack (Alternating Editorial Layouts) */}
        <div className="space-y-32 sm:space-y-48">
          {stories.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Visual Media Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Link href={`/work/${project.slug}`} className="group block relative">
                    <div className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Index Watermark */}
                    <span className="absolute -bottom-6 -right-4 font-display font-black text-7xl sm:text-9xl text-charcoal/5 select-none pointer-events-none">
                      0{idx + 1}
                    </span>
                  </Link>
                </div>

                {/* Narrative Description Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-[0.2em] text-copper">
                    <span className="font-mono">Case 0{idx + 1}</span>
                    <span>·</span>
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.projectYear}</span>
                  </div>

                  <h3 className="font-display font-bold text-3xl sm:text-5xl text-charcoal tracking-tight leading-[1.08]">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-copper transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Metadata matrix */}
                  <div className="pt-4 border-t border-charcoal/15 grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-400 block mb-0.5">
                        Client / Account
                      </span>
                      <span className="font-bold text-charcoal">
                        {project.clientName || 'Private Client'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-400 block mb-0.5">
                        Role Designation
                      </span>
                      <span className="font-bold text-charcoal">{project.role}</span>
                    </div>
                  </div>

                  {/* Primary Outcome Highlight */}
                  {project.results && project.results.length > 0 && (
                    <div className="p-4 bg-charcoal text-ivory flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                      <span className="text-xs font-sans font-medium text-ivory/90">
                        {project.results[0]}
                      </span>
                    </div>
                  )}

                  {/* Editorial Link */}
                  <div className="pt-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-charcoal hover:text-copper transition-colors"
                    >
                      <span>Read Deep-Dive Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-copper" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
