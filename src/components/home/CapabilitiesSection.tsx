'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Graphic Design & Visual Branding',
    scope: 'Brand identity systems, wordmarks, packaging dielines, campaign collaterals, and high-impact print media.',
    deliverables: 'Logos · Brand Guidelines · Packaging · Marketing Collaterals',
    href: '/services#graphic-design-visual-branding',
  },
  {
    num: '02',
    title: 'UI/UX & Product Design',
    scope: 'Human-centered digital products, responsive web apps, mobile-first design systems, and Figma component libraries.',
    deliverables: 'Mobile Apps · SaaS Dashboards · Figma Tokens · Wireframes',
    href: '/services#ui-ux-design',
  },
  {
    num: '03',
    title: 'Motion Graphics & Video Editing',
    scope: 'Dynamic 2D animation, kinetic typography, promotional video edits, animated brand stings, and high-retention social reels.',
    deliverables: 'Kinetic Type · 2D Animation · Reels & Shorts · Logo Stings',
    href: '/services#motion-graphics',
  },
  {
    num: '04',
    title: 'Web & Digital Craft',
    scope: 'Editorial, performance-optimized responsive websites combining typographic pacing with accessible interaction.',
    deliverables: 'Landing Pages · Portfolio Archives · Responsive Systems',
    href: '/services#web-app-design',
  },
];

export function CapabilitiesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="deliver"
      className="py-24 sm:py-36 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 select-none transition-colors duration-300"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 mb-12 sm:mb-16 border-b border-charcoal/10">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
              Capabilities &amp; Scope
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
              What I Deliver
            </h2>
          </div>
          <span className="text-xs font-mono text-charcoal-400">
            04 CORE DISCIPLINES
          </span>
        </div>

        {/* Minimal Editorial Rows (Thin Horizontal Rules, Zero Boxed Cards) */}
        <div className="divide-y divide-charcoal/15 border-b border-charcoal/15">
          {CAPABILITIES.map((cap, idx) => (
            <Link
              key={cap.num}
              href={cap.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-charcoal/[0.02] -mx-4 px-4"
            >
              <div className="md:col-span-1 font-mono text-xs sm:text-sm text-charcoal-400 group-hover:text-copper transition-colors">
                {cap.num}
              </div>

              <div className="md:col-span-6">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-tight group-hover:text-copper transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm font-mono text-charcoal-500 uppercase tracking-wider">
                  {cap.deliverables}
                </p>
              </div>

              <div className="md:col-span-4 text-sm sm:text-base font-sans text-charcoal-600 font-light leading-relaxed">
                {cap.scope}
              </div>

              <div className="md:col-span-1 flex justify-end">
                <div className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal-400 group-hover:border-copper group-hover:text-copper group-hover:bg-copper group-hover:text-ivory transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Fast Action */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-charcoal-500">
          <span>Need a multidisciplinary engagement or bespoke creative direction?</span>
          <Link
            href="/services"
            className="font-bold text-copper hover:text-charcoal uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors"
          >
            Explore Detailed Service Deliverables &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}