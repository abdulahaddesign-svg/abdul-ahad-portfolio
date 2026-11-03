'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Monogram } from '@/components/brand/Monogram';
import { SITE_SETTINGS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 bg-ivory overflow-hidden">
      {/* Precision Background Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-charcoal" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-charcoal" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-charcoal" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-charcoal" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-charcoal" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-ivory-300/80 border border-charcoal/15 text-charcoal text-xs font-sans font-semibold uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span>{SITE_SETTINGS.title}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-[1.05]">
                {SITE_SETTINGS.heroHeadline}
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-charcoal-500 font-sans max-w-2xl leading-relaxed font-normal"
            >
              {SITE_SETTINGS.heroSupportingCopy}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                href="/work"
                variant="primary"
                size="lg"
                icon={<ArrowDown className="w-4 h-4" />}
              >
                Explore My Work
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </motion.div>

            {/* Trust Highlights Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-charcoal/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-charcoal"
            >
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-charcoal tracking-tight">
                  3+ Years
                </span>
                <span className="text-xs font-sans text-charcoal-400 uppercase tracking-wider">
                  Professional Experience
                </span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-copper tracking-tight">
                  50+ Clients
                </span>
                <span className="text-xs font-sans text-charcoal-400 uppercase tracking-wider">
                  Global & Freelance
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-earthBrown">
                  <Award className="w-4 h-4 text-copper shrink-0" />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider">
                    eClerx 2025
                  </span>
                </div>
                <span className="text-xs font-sans text-charcoal-400 block">
                  Best Employee of the Year
                </span>
              </div>
            </motion.div>
          </div>

          {/* Interactive AA Monogram Architectural Sculpture Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 sm:p-12 bg-ivory-100 border border-charcoal/15 shadow-sm"
            >
              {/* Subtle Corner Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-copper" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-copper" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-copper" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-copper" />

              <div className="flex flex-col items-center text-center space-y-6">
                <Monogram size={160} variant="light" animated={true} />

                <div className="space-y-1">
                  <span className="font-display font-bold text-lg tracking-tight text-charcoal">
                    ABDUL AHAD J
                  </span>
                  <p className="text-xs font-sans text-charcoal-400 uppercase tracking-widest">
                    Coimbatore, Tamil Nadu
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-sans text-charcoal-500 border-t border-charcoal/10 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-copper" />
                  <span>"Designed with intent. Made to matter."</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
