'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, Compass, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';

export function HeroSection() {
  const { scrollY } = useScroll();
  const monogramY = useTransform(scrollY, [0, 600], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-36 sm:pt-44 pb-14 bg-ivory text-charcoal overflow-hidden border-b border-charcoal/15">
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <div className="max-w-[1600px] h-full mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-charcoal last:border-r-0" />
          ))}
        </div>
      </div>

      {/* Floating Monogram Watermark (Cinematic Background Depth) */}
      <motion.div
        style={{ y: monogramY }}
        className="absolute right-4 sm:right-16 top-24 sm:top-28 w-64 sm:w-96 lg:w-[480px] aspect-[1024/754] pointer-events-none opacity-[0.08] select-none"
      >
        <Image
          src="/brand/logo-monogram-light.png"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </motion.div>

      {/* Main Editorial Content */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10 w-full"
      >
        {/* Top Kicker Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-charcoal/10 text-xs font-sans uppercase tracking-[0.2em] text-charcoal-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="font-semibold text-charcoal">Design Practice · Coimbatore, India</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Specializing in Graphic Design &amp; Visual Systems</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Oversized Editorial Name & Tagline */}
        <div className="pt-8 sm:pt-14 space-y-6 sm:space-y-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter leading-[0.92] text-charcoal">
              ABDUL AHAD
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6"
          >
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-copper tracking-tight leading-tight">
              CREATIVE DESIGNER &amp; DIGITAL CREATIVE PARTNER
            </h2>
          </motion.div>

          {/* Statement Narrative & Scope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 sm:pt-6"
          >
            <div className="md:col-span-7">
              <p className="text-xl sm:text-2xl md:text-3xl text-charcoal font-sans font-light leading-snug">
                I create thoughtful visual identities, digital experiences, and motion-led content for brands that want to stand out.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between space-y-6 border-l border-charcoal/15 pl-6 sm:pl-8">
              <p className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.18em] text-charcoal-500 leading-relaxed">
                Graphic Design / UI/UX / Motion / Video / Web &amp; App
              </p>

              {/* Two Direct Editorial CTAs */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="#portfolio-strip"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors duration-200"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-charcoal/30 text-charcoal text-xs font-sans font-bold uppercase tracking-[0.16em] hover:border-charcoal hover:bg-charcoal/5 transition-colors duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Editorial Ticker & Verified Impact Bar */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 pt-12 sm:pt-16 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-charcoal/15 text-xs font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-0.5">
              Experience
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-charcoal">
              3+ Years
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-0.5">
              Client Impact
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-copper">
              50+ Clients
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-0.5">
              Annual Honor
            </span>
            <span className="font-display font-bold text-base sm:text-lg text-charcoal truncate block">
              Best Employee 2025
            </span>
            <span className="text-[10px] text-charcoal-400">eClerx Design Impact</span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-0.5">
              Key Metric
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-charcoal">
              -40% Delay
            </span>
            <span className="text-[10px] text-charcoal-400">Reztro Table Ordering</span>
          </div>
        </div>
      </div>
    </section>
  );
}
