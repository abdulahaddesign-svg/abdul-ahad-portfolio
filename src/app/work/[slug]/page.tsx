import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Tag, 
  User, 
  Wrench,
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
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
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.isFeatured))
    .slice(0, 2);

  return (
    <article className="pt-28 pb-24 bg-ivory text-charcoal min-h-screen">
      {/* Top Breadcrumb & Back Link */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-charcoal-500 hover:text-copper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work Archive</span>
        </Link>
      </div>

      {/* Hero Header Area */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-12">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="copper">{project.category}</Badge>
            <span className="text-xs font-sans text-charcoal-400">·</span>
            <span className="text-xs font-sans font-semibold text-charcoal-500 uppercase tracking-wider">
              {project.projectYear}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl text-charcoal tracking-tight leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Metadata Matrix Table */}
        <div className="mt-12 pt-8 border-t border-charcoal/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-sans">
          <div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
              Client / Account
            </span>
            <span className="font-semibold text-charcoal">
              {project.clientName || 'Independent Initiative'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
              Year & Timeline
            </span>
            <span className="font-semibold text-charcoal">{project.projectYear}</span>
          </div>

          <div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
              Role & Responsibility
            </span>
            <span className="font-semibold text-charcoal">{project.role}</span>
          </div>

          <div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
              Tools Applied
            </span>
            <span className="font-semibold text-charcoal">
              {project.toolsUsed.join(', ')}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Cover Visual Presentation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 my-8">
        <div className="relative aspect-[16/9] w-full bg-charcoal border border-charcoal/20 shadow-md overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Narrative Content Sections */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 space-y-16">
        {/* Full Project Overview */}
        <section className="space-y-4">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
            01 / Project Overview
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
            The Context & Purpose
          </h2>
          <div className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed whitespace-pre-line">
            {project.fullDescription}
          </div>
        </section>

        {/* Project Challenge */}
        {project.challenge && (
          <section className="p-8 bg-ivory-100 border border-charcoal/15 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              02 / The Challenge
            </span>
            <h3 className="font-display font-bold text-2xl text-charcoal">
              Friction Points & Obstacles
            </h3>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed">
              {project.challenge}
            </p>
          </section>
        )}

        {/* Creative Process */}
        {project.creativeProcess && (
          <section className="space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              03 / Creative Process & Strategy
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              How We Approached the Solution
            </h3>
            <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed whitespace-pre-line">
              {project.creativeProcess}
            </p>
          </section>
        )}

        {/* Final Solution */}
        {project.solution && (
          <section className="p-8 bg-charcoal text-ivory space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              04 / Execution & Design Solution
            </span>
            <h3 className="font-display font-bold text-2xl text-ivory">
              The Delivered Artifacts
            </h3>
            <p className="text-base text-charcoal-300 font-sans leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </section>
        )}

        {/* Measurable Results & Outcomes */}
        {project.results && project.results.length > 0 && (
          <section className="space-y-6">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              05 / Measurable Outcomes & Impact
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              Key Results & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.results.map((res, index) => (
                <div
                  key={index}
                  className="p-5 bg-white border border-charcoal/15 flex items-start gap-3.5"
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

        {/* Project Visual Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6 pt-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              06 / Visual Gallery & System Details
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              Design Artifacts & Screens
            </h3>
            <div className="space-y-8">
              {project.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[16/10] w-full bg-charcoal border border-charcoal/20 overflow-hidden shadow-sm"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} - View ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Project CTA Box */}
        <div className="p-8 sm:p-12 bg-charcoal-900 text-ivory border border-charcoal-800 text-center space-y-6">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
            Need similar creative outcomes?
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory">
            Let's collaborate on your next design initiative.
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button href="/contact" variant="primary" size="md">
              Start Project Inquiry
            </Button>
            <Button
              href="https://wa.me/919150037005"
              isExternal
              variant="dark"
              size="md"
            >
              WhatsApp Quick Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <aside className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 border-t border-charcoal/15">
          <div className="mb-8">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-1">
              Explore More
            </span>
            <h3 className="font-display font-bold text-2xl text-charcoal">
              Related Case Studies
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.id} project={rel} />
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
