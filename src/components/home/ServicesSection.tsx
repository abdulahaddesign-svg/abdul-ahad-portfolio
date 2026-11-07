'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    index: '01',
    title: 'Graphic Design & Visual Branding',
    subtitle: 'Primary Service Core',
    description:
      'Distinctive brand identities, custom wordmarks, comprehensive brand manuals, packaging dielines, editorial publications, and high-impact marketing collaterals.',
    deliverables: [
      'Logo Systems & Wordmarks',
      'Visual Brand Guidelines',
      'Packaging & Print Dielines',
      'Campaign Marketing Collaterals',
      'Editorial & Social Kits',
    ],
    href: '/services#graphic-design-visual-branding',
  },
  {
    index: '02',
    title: 'UI/UX Design',
    subtitle: 'Digital Products & Systems',
    description:
      'Human-centered digital products engineered through design thinking methodology. Customer-facing mobile web apps, complex admin dashboards, and scalable Figma component libraries.',
    deliverables: [
      'Mobile-First UI Design',
      'Interactive Figma Prototypes',
      'Design Systems & Tokens',
      'Wireframing & User Flows',
    ],
    href: '/services#ui-ux-design',
  },
  {
    index: '03',
    title: 'Motion Graphics & Video Editing',
    subtitle: 'Temporal Storytelling',
    description:
      'Kinetic typography, animated logo reveals, 2D keyframe animation, UI micro-interactions, promotional social reels, and high-retention video post-production.',
    deliverables: [
      'Kinetic Motion Graphics',
      'Animated Logo Stings',
      'Social Reels & Video Edits',
      'UI Interaction Demos',
    ],
    href: '/services#motion-graphics',
  },
  {
    index: '04',
    title: 'Web & App Development',
    subtitle: 'Digital Craft & Execution',
    description:
      'Editorial, responsive web experiences combining high-contrast typography, performance-optimized media delivery, and seamless component architecture.',
    deliverables: [
      'Responsive Landing Pages',
      'Editorial Portfolios & Web Apps',
      'Custom Design Token Systems',
      'Performance Optimization',
    ],
    href: '/services#web-app-design',
  },
];

export function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15">
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-charcoal/15">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
              Offerings &amp; Deliverables
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-charcoal tracking-tighter">
              Services
            </h2>
          </div>
          <p className="text-sm font-sans text-charcoal-600 max-w-md leading-relaxed">
            Positioned as connected creative disciplines. Explore tangible deliverables and typical scopes below.
          </p>
        </div>

        {/* Large Typography List with Interactive Accordion / Hover */}
        <div className="divide-y divide-charcoal/15">
          {SERVICES.map((srv, idx) => {
            const isHovered = activeIdx === idx;

            return (
              <div
                key={srv.index}
                onMouseEnter={() => setActiveIdx(idx)}
                className="py-10 sm:py-14 transition-colors duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Title & Index */}
                  <div className="space-y-2 lg:max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs sm:text-sm text-copper tracking-widest">
                        {srv.index}
                      </span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal-400">
                        {srv.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter text-charcoal hover:text-copper transition-colors cursor-pointer">
                      <Link href={srv.href}>{srv.title}</Link>
                    </h3>
                  </div>

                  {/* Description & Deliverables */}
                  <div className="lg:max-w-md space-y-6">
                    <p className="text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed font-light">
                      {srv.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {srv.deliverables.map((del) => (
                        <span
                          key={del}
                          className="px-2.5 py-1 text-[11px] font-sans uppercase tracking-wider text-charcoal-700 bg-charcoal/5 border border-charcoal/10"
                        >
                          {del}
                        </span>
                      ))}
                    </div>

                    <div>
                      <Link
                        href={srv.href}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.16em] text-copper hover:text-charcoal transition-colors"
                      >
                        <span>View Detailed Scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
