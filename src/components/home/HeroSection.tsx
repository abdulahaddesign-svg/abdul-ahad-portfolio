'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const monogramY = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-ivory text-charcoal border-b border-charcoal/15 overflow-hidden">
      {/* Background Subtle Monogram Watermark (Positioned in Upper Right Negative Space) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: monogramY }}
        className="absolute right-4 sm:right-12 lg:right-20 top-24 sm:top-28 w-56 sm:w-80 lg:w-[420px] aspect-[1024/754] pointer-events-none opacity-[0.05] select-none"
        aria-hidden="true"
      >
        <Image
          src="/brand/logo-monogram-light.png"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </motion.div>

      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full space-y-12 sm:space-y-16">
        {/* Top Alignment Edge: Location and Professional Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/10 text-xs font-sans uppercase tracking-[0.2em] text-charcoal-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="font-semibold text-charcoal">
              Coimbatore, Tamil Nadu, India
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Independent Design Practice</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Main Headline & Professional Title (Strict Left Alignment) */}
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem] tracking-tighter leading-[0.92] text-charcoal uppercase">
              ABDUL AHAD
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-copper tracking-tight uppercase leading-snug">
              CREATIVE DESIGNER &amp; DIGITAL CREATIVE PARTNER
            </h2>
          </motion.div>
        </div>

        {/* Balanced Two-Column Composition (Aligned along the Same Left Edge) */}
        <div className="pt-8 border-t border-charcoal/15 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Short Professional Introduction with Comfortable Line Length */}
          <div className="md:col-span-6 lg:col-span-7 space-y-4">
            <p className="text-xl sm:text-2xl md:text-[26px] font-sans text-charcoal font-light leading-relaxed">
              I create thoughtful visual identities, digital experiences, and motion-led content for brands that want to stand out.
            </p>
            <p className="text-base sm:text-[18px] font-sans text-charcoal-600 font-light leading-relaxed max-w-xl">
              Combining visual design, typography, and human-centered design thinking to deliver precise creative solutions that command attention and build credibility.
            </p>
          </div>

          {/* Right Column: Service Capabilities & Primary Actions */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6 md:border-l md:border-charcoal/15 md:pl-8 lg:pl-10">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal-400 block mb-2">
                Core Capabilities
              </span>
              <p className="text-xs sm:text-sm md:text-base font-sans font-medium uppercase tracking-[0.16em] text-charcoal-700 leading-relaxed">
                Graphic Design / UI/UX / Motion Graphics / Video Editing / Web &amp; App
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#portfolio-strip"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-ivory text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors duration-200"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-charcoal/30 text-charcoal text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] hover:border-charcoal hover:bg-charcoal/5 transition-colors duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
              </Link>
            </div>
          </div>
        </div>

        {/* Highlight Statistics Bar (Grid with Thin Divider Lines) */}
        <div className="pt-8 sm:pt-12 border-t border-charcoal/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x-0 sm:divide-x divide-charcoal/15">
            <div className="space-y-1">
              <span className="font-display font-black text-2xl sm:text-3xl text-charcoal block">
                3+ Years
              </span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-charcoal-500 block">
                Professional Experience
              </span>
            </div>

            <div className="space-y-1 sm:pl-8">
              <span className="font-display font-black text-2xl sm:text-3xl text-copper block">
                50+ Clients
              </span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-charcoal-500 block">
                Global &amp; Freelance
              </span>
            </div>

            <div className="space-y-1 md:pl-8">
              <span className="font-display font-black text-2xl sm:text-3xl text-charcoal block">
                Best Employee
              </span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-charcoal-500 block">
                eClerx 2025 Annual Honor
              </span>
            </div>

            <div className="space-y-1 sm:pl-8">
              <span className="font-display font-black text-2xl sm:text-3xl text-charcoal block">
                -40% Delay
              </span>
              <span className="text-[11px] font-sans uppercase tracking-wider text-charcoal-500 block">
                Reztro Ordering Impact
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
