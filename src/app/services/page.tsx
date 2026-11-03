import React from 'react';
import type { Metadata } from 'next';
import { getServices, getSiteSettings } from '@/lib/data';
import { ServicesClient } from './ServicesClient';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Creative Services & Design Capabilities — Abdul Ahad',
  description:
    'Graphic design services in Coimbatore, brand identity systems, UI/UX mobile product design, motion graphics, video editing, and modern web design by Abdul Ahad.',
  keywords: [
    'Graphic design services in Coimbatore',
    'Branding designer in Coimbatore',
    'UI/UX design services',
    'Motion graphics designer',
    'Video editing services',
    'Web and app design',
    'Brand identity design',
    'Logo design Coimbatore',
    'Packaging design Tamil Nadu',
    'Freelance creative director India',
  ],
  alternates: {
    canonical: 'https://abdulahad.design/services',
  },
  openGraph: {
    title: 'Design That Makes Ideas Matter — Abdul Ahad Creative Services',
    description:
      'Explore graphic design, visual branding, UI/UX, motion graphics, video editing, and web design capabilities engineered by Abdul Ahad.',
    url: 'https://abdulahad.design/services',
    siteName: 'Abdul Ahad Portfolio',
    type: 'website',
  },
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(false),
    getSiteSettings(),
  ]);

  // Structured Data Schema (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abdul Ahad Creative Services',
    description:
      'Graphic design, brand identity systems, UI/UX, motion graphics, video editing, and web & app design services.',
    url: 'https://abdulahad.design/services',
    telephone: '+919150037005',
    email: 'abdulahad.ofcl@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Creative Disciplines & Design Services',
      itemListElement: services.map((srv, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: srv.title,
          description: srv.description,
          position: idx + 1,
        },
      })),
    },
  };

  return (
    <>
      {/* Structured Data Script for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
        {/* Dynamic Image-Led Editorial Services Experience */}
        <ServicesClient services={services} />

        {/* Dedicated Above-Footer Collaboration CTA */}
        <ContactCtaSection settings={settings} />
      </main>
    </>
  );
}
