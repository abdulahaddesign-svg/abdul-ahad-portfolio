import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects, getSiteSettings } from '@/lib/data';
import { ProjectDetailClient } from './ProjectDetailClient';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found — Abdul Ahad' };
  }

  const title = project.seoTitle || `${project.title} — Case Study by Abdul Ahad`;
  const description = project.seoDescription || project.shortDescription;
  const canonicalUrl = `https://abdulahad.design/work/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects({ includeDrafts: false }),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  // Find next project in circular sequence
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: project.title,
    description: project.shortDescription,
    image: project.coverImage,
    creator: {
      '@type': 'Person',
      name: 'Abdul Ahad J',
      jobTitle: 'Creative Designer & Digital Creative Partner',
      url: 'https://abdulahad.design',
    },
    dateCreated: project.projectYear,
    genre: project.category,
    keywords: [
      project.category,
      project.role,
      ...(project.toolsUsed || []),
    ].join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
        {/* Behance-Style Editorial Case Study */}
        <ProjectDetailClient project={project} nextProject={nextProject} />

        {/* Dedicated Above-Footer Collaboration CTA */}
        <ContactCtaSection settings={settings} />
      </main>
    </>
  );
}
