'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, QrCode, Smartphone, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function ReztroCaseStudySection() {
  return (
    <section className="py-24 bg-charcoal text-ivory relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-copper/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header Badge */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal-800">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
                Featured Flagship Case Study
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory tracking-tight">
                Reztro — Digital Table Ordering
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans text-charcoal-400">May – July 2025</span>
              <Button
                href="/work/reztro-digital-table-ordering"
                variant="dark"
                size="sm"
                icon={<ArrowUpRight className="w-3.5 h-3.5 text-copper" />}
              >
                Read Deep-Dive Case Study
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          {/* Visual Showcase Screen */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="relative aspect-[16/10] bg-charcoal-950 border border-charcoal-700 overflow-hidden shadow-2xl group">
                <Image
                  src="/projects/reztro/reztro-cover.svg"
                  alt="Reztro Table Ordering UI Design System"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          {/* Detailed Narrative & Impact */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-ivory">
                  Transforming high-volume dining through thoughtful design thinking.
                </h3>
                <p className="text-sm sm:text-base text-charcoal-300 font-sans leading-relaxed">
                  Busy casual dining restaurants face severe order-taking delays and kitchen confusion during peak hours. Reztro was conceived as a zero-install mobile-first web app activated by table QR codes.
                </p>
              </div>
            </Reveal>

            {/* Measurable Results Box */}
            <Reveal delay={0.2}>
              <div className="p-6 bg-charcoal-900 border border-copper/30 space-y-4">
                <div className="flex items-center gap-3 text-copper">
                  <TrendingUp className="w-6 h-6 shrink-0" />
                  <span className="font-display font-bold text-3xl">-40% Order Delays</span>
                </div>
                <p className="text-xs text-charcoal-300 font-sans leading-relaxed">
                  Verified reduction in guest waiting time from table seating to kitchen order ticket (KOT) firing.
                </p>
              </div>
            </Reveal>

            {/* Scope Deliverables */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <span className="text-charcoal-200">Complete Brand Identity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <span className="text-charcoal-200">Mobile-first Ordering UI</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <span className="text-charcoal-200">Kitchen Display System (KDS)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <span className="text-charcoal-200">Acrylic QR Table Touchpoints</span>
                </div>
              </div>
            </Reveal>

            {/* Bottom Link */}
            <Reveal delay={0.4}>
              <div className="pt-2">
                <Link
                  href="/work/reztro-digital-table-ordering"
                  className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-wider text-copper hover:text-ivory transition-colors"
                >
                  <span>Explore UX Wireframes & Design System</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
