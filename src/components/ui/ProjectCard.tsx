'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col bg-charcoal-900 border border-charcoal-700/60 overflow-hidden ${
        featured ? 'lg:grid lg:grid-cols-12 lg:gap-8 items-center' : ''
      }`}
    >
      {/* Project Image Container */}
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-charcoal-950 ${
          featured ? 'lg:col-span-7' : 'w-full'
        }`}
      >
        <Link href={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true">
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <SafeImage
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              priority={featured}
              fallback="/projects/freelance/branding-cover.svg"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="copper" className="bg-charcoal-950/80 backdrop-blur-md">
            {project.category}
          </Badge>
        </div>

        {/* Year Pill Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-sans font-semibold tracking-wider px-2 py-0.5 bg-charcoal-950/80 text-ivory/80 backdrop-blur-md border border-charcoal-700">
            {project.projectYear}
          </span>
        </div>
      </div>

      {/* Project Metadata & Content */}
      <div
        className={`flex flex-col p-6 md:p-8 justify-between ${
          featured ? 'lg:col-span-5' : 'flex-1'
        }`}
      >
        <div>
          {project.clientName && (
            <p className="text-xs font-sans uppercase tracking-widest text-copper mb-2">
              {project.clientName}
            </p>
          )}

          <h3 className="font-display font-bold text-xl md:text-2xl text-ivory tracking-tight group-hover:text-copper transition-colors duration-200">
            <Link
              href={`/work/${project.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-3 text-sm text-charcoal-300 leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tools and Dual Actions */}
        <div className="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="text-xs font-sans font-bold uppercase tracking-[0.16em] text-ivory hover:text-copper transition-colors duration-150 inline-flex items-center gap-1.5"
          >
            <span>Case Study</span>
            <span>&rarr;</span>
          </Link>

          {(project.behanceUrl || project.liveWebsiteUrl || project.appStoreUrl || project.playStoreUrl) && (
            <a
              href={project.behanceUrl || project.liveWebsiteUrl || project.appStoreUrl || project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-800 border border-charcoal-700 text-[11px] font-sans font-semibold uppercase tracking-wider text-copper hover:bg-copper hover:text-ivory transition-colors"
              title={project.behanceUrl ? 'View Full Case Study in Behance' : project.externalLinkLabel || 'Live External Destination'}
            >
              <span>{project.behanceUrl ? 'Behance' : project.liveWebsiteUrl ? 'Live Web' : project.appStoreUrl ? 'App Store' : 'Play Store'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
