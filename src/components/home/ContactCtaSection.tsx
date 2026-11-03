'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface ContactCtaSectionProps {
  settings?: SiteSettings;
}

export function ContactCtaSection({ settings }: ContactCtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const headline = settings?.ctaHeadline || 'HAVE A PROJECT\nIN MIND?';
  const supporting = settings?.ctaSupporting || "Let's create something meaningful together.";
  const availability = settings?.ctaAvailability || 'Available for New Projects · Q1 / Q2';

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15 overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Top Header Label & Availability Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/10 mb-12 sm:mb-16">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            INITIATE COLLABORATION
          </span>

          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-charcoal-600">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="font-semibold">{availability}</span>
          </div>
        </div>

        {/* Expressive Editorial Headline & Action */}
        <div className="max-w-4xl space-y-8 sm:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter leading-[0.92] text-charcoal uppercase whitespace-pre-line">
              {headline}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl text-charcoal-600 font-sans font-light max-w-2xl leading-relaxed"
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
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-5 bg-charcoal text-ivory font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.18em] hover:bg-copper transition-colors duration-200 rounded-none shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-copper group-hover:text-ivory transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
            </Link>

            <span className="text-xs font-mono text-charcoal-400 uppercase tracking-wider">
              Typical Response within 24 Hours
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}