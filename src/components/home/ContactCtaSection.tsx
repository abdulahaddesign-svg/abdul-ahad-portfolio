'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { CreativeVectorIllustration } from '@/components/home/CreativeVectorIllustration';

interface ContactCtaSectionProps {
  settings?: SiteSettings;
}

export function ContactCtaSection({ settings }: ContactCtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const headline = settings?.ctaHeadline || 'HAVE A PROJECT\nIN MIND?';
  const supporting = settings?.ctaSupporting || "Let's create something meaningful together.";
  const availability = settings?.ctaAvailability || 'Available for New Projects · 01 / 02';

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Header Label & Availability Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/10 dark:border-ivory/10 mb-12 sm:mb-16">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            INITIATE COLLABORATION
          </span>

          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-charcoal-600 dark:text-ivory/70">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="font-semibold">{availability}</span>
          </div>
        </div>

        {/* 2-Column Composition: Headline & Action on Left, Vector Art on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Expressive Editorial Headline & Action */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8 sm:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] tracking-tighter leading-[0.92] text-charcoal dark:text-ivory uppercase whitespace-pre-line">
                {headline}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl text-charcoal-600 dark:text-ivory/70 font-sans font-light max-w-2xl leading-relaxed"
            >
              {supporting}
            </motion.p>

            {/* Prominent Start a Project CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-5 bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.18em] hover:bg-copper dark:hover:bg-copper dark:hover:text-ivory transition-colors duration-200 rounded-none shadow-sm"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-copper group-hover:text-ivory dark:group-hover:text-ivory transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
              </Link>

              <span className="text-xs font-mono text-charcoal-400 dark:text-ivory/50 uppercase tracking-wider">
                Typical Response within 24 Hours
              </span>
            </motion.div>
          </div>

          {/* Right Column: Creative Vector Illustration */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end">
            <CreativeVectorIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
