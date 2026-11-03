'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  {
    num: '01',
    title: 'GRAPHIC DESIGN',
    scope: 'Marketing collaterals, digital ad banners, campaign posters, flyers & social kits.',
    href: '/services#graphic-design-visual-branding',
  },
  {
    num: '02',
    title: 'BRAND IDENTITY',
    scope: 'Wordmarks, monograms, color systems, typography scale & master brand guidelines.',
    href: '/services#brand-identity-design',
  },
  {
    num: '03',
    title: 'UI/UX DESIGN',
    scope: 'Mobile-first interfaces, wireframes, interactive Figma prototypes & design tokens.',
    href: '/services#ui-ux-design',
  },
  {
    num: '04',
    title: 'MOTION GRAPHICS',
    scope: '2D keyframe animation, kinetic typography, animated stings & social media loops.',
    href: '/services#motion-graphics',
  },
  {
    num: '05',
    title: 'VIDEO EDITING',
    scope: 'Paced commercial cuts, social reels, product demos, color grading & audio sync.',
    href: '/services#video-editing',
  },
  {
    num: '06',
    title: 'WEB & APP DESIGN',
    scope: 'Responsive editorial web concepts, high-converting hero architecture & design systems.',
    href: '/services#web-app-design',
  },
];

export function CapabilitiesTickerSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-ivory text-charcoal border-b border-charcoal/15">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal/15">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
              Capabilities &amp; Disciplines
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-charcoal tracking-tight">
              Creative Spectrum
            </h2>
          </div>
          <p className="text-sm font-sans text-charcoal-500 max-w-md leading-relaxed">
            Independent creative capabilities unified by typographic discipline, human-centered design thinking, and contemporary motion.
          </p>
        </div>

        {/* Editorial Title Sequence List */}
        <div className="divide-y divide-charcoal/15">
          {CAPABILITIES.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group py-8 sm:py-12 transition-colors duration-300 hover:bg-charcoal/5 px-4 sm:px-6"
            >
              <Link href={item.href} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs sm:text-sm text-copper tracking-widest shrink-0">
                    {item.num}
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-charcoal group-hover:text-copper transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-8 pl-12 lg:pl-0">
                  <p className="text-xs sm:text-sm font-sans text-charcoal-500 max-w-sm leading-relaxed group-hover:text-charcoal transition-colors">
                    {item.scope}
                  </p>
                  <div className="w-10 h-10 border border-charcoal/20 flex items-center justify-center shrink-0 group-hover:border-copper group-hover:bg-copper group-hover:text-ivory transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
