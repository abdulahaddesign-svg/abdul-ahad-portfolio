import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/data';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.seoTitle || `${project.title} — Abdul Ahad J`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects({ includeDrafts: false });
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="pt-36 sm:pt-44 pb-32 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Breadcrumb Navigation */}
        <div className="pb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.2em] text-charcoal-400 hover:text-copper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Work Index</span>
          </Link>
        </div>

        {/* Hero Title & Scope */}
        <header className="pb-16 border-b border-charcoal/15 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-copper">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.projectYear}</span>
            {project.clientName && (
              <>
                <span>·</span>
                <span className="text-charcoal-500">{project.clientName}</span>
              </>
            )}
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal leading-[0.96]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-charcoal-600 font-sans font-light max-w-4xl leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Metadata Specs Matrix */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-sans border-t border-charcoal/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Account / Client
              </span>
              <span className="font-bold text-charcoal">
                {project.clientName || 'Independent Project'}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Role &amp; Responsibilities
              </span>
              <span className="font-bold text-charcoal">{project.role}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Year of Execution
              </span>
              <span className="font-bold text-charcoal">{project.projectYear}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Software &amp; Tools
              </span>
              <span className="font-bold text-charcoal">
                {project.toolsUsed.join(', ')}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cinematic Cover */}
        <div className="py-12 sm:py-16">
          <div className="relative aspect-[16/9] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Deep Dive Narrative Sections */}
        <div className="max-w-4xl mx-auto py-12 space-y-20">
          {/* Section 01: Overview */}
          <section className="space-y-4">
            <span className="font-mono text-xs text-copper tracking-widest block uppercase">
              01 — Overview &amp; Objective
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight">
              The Context &amp; Purpose
            </h2>
            <div className="text-base sm:text-lg text-charcoal-700 font-sans font-light leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </div>
          </section>

          {/* Section 02: Challenge */}
          {project.challenge && (
            <section className="p-8 sm:p-12 bg-charcoal/5 border-l-2 border-copper space-y-4">
              <span className="font-mono text-xs text-copper tracking-widest block uppercase">
                02 — The Creative Challenge
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
                Friction Points &amp; Strategic Hurdles
              </h3>
              <p className="text-base text-charcoal-700 font-sans font-light leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {/* Section 03: Process */}
          {project.creativeProcess && (
            <section className="space-y-4">
              <span className="font-mono text-xs text-copper tracking-widest block uppercase">
                03 — Strategy &amp; Execution
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight">
                How We Designed the Solution
              </h3>
              <div className="text-base sm:text-lg text-charcoal-700 font-sans font-light leading-relaxed whitespace-pre-line">
                {project.creativeProcess}
              </div>
            </section>
          )}

          {/* Section 04: Solution */}
          {project.solution && (
            <section className="p-8 sm:p-12 bg-charcoal text-ivory space-y-4">
              <span className="font-mono text-xs text-copper tracking-widest block uppercase">
                04 — Final Design System
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory">
                The Delivered Artifacts
              </h3>
              <div className="text-base text-charcoal-300 font-sans font-light leading-relaxed whitespace-pre-line">
                {project.solution}
              </div>
            </section>
          )}

          {/* Section 05: Measurable Outcomes */}
          {project.results && project.results.length > 0 && (
            <section className="space-y-6">
              <span className="font-mono text-xs text-copper tracking-widest block uppercase">
                05 — Measurable Impact
              </span>
              <h3 className="font-display font-bold text-3xl text-charcoal">
                Key Deliverables &amp; Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white border border-charcoal/15 flex items-start gap-3"
                  >
                    <TrendingUp className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                    <span className="text-sm font-sans font-semibold text-charcoal leading-snug">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 06: Visual Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-8 pt-8">
              <span className="font-mono text-xs text-copper tracking-widest block uppercase">
                06 — Visual Artifacts &amp; Screens
              </span>
              <div className="space-y-12">
                {project.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] w-full bg-charcoal border border-charcoal/20 overflow-hidden"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${project.title} - Plate ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Call to Action */}
          <div className="pt-16 border-t border-charcoal/15 text-center space-y-6">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Need similar creative outcomes?
            </h3>
            <p className="text-sm font-sans text-charcoal-600 max-w-md mx-auto">
              Let's discuss how we can elevate your brand positioning and digital experiences.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-colors"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Case Studies Row */}
        {relatedProjects.length > 0 && (
          <aside className="pt-24 border-t border-charcoal/15">
            <div className="mb-10 flex items-center justify-between">
              <h4 className="font-display font-bold text-2xl text-charcoal">
                More Case Studies
              </h4>
              <Link
                href="/work"
                className="text-xs font-sans uppercase tracking-[0.16em] text-copper hover:underline"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/work/${rel.slug}`}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/15 overflow-hidden">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-between text-xs font-sans">
                    <span className="font-bold text-charcoal group-hover:text-copper transition-colors">
                      {rel.title}
                    </span>
                    <span className="text-copper font-mono uppercase">
                      {rel.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
