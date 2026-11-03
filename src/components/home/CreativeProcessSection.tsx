'use client';

import React from 'react';
import { Compass, Eye, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategic Intent',
    description:
      'Every project begins by deconstructing the core problem. We analyze market context, customer psychology, and business objectives to formulate a clear creative brief.',
    deliverable: 'Strategic brief, visual audit, and audience mapping',
  },
  {
    step: '02',
    title: 'Conceptual Exploration & Grid',
    description:
      'We test multiple visual hypotheses, typographic structures, and layout grids. Exploring both expressive and restrained aesthetic paths to pinpoint the strongest direction.',
    deliverable: 'Moodboards, typographic pairings, and rough vector concepts',
  },
  {
    step: '03',
    title: 'Precision Craft & Refinement',
    description:
      'With the chosen direction locked, we obsess over details: curve continuity, optical kerning, responsive breakpoints, contrast ratios, and print dieline tolerances.',
    deliverable: 'High-fidelity Figma screens, vector marks, and packaging artwork',
  },
  {
    step: '04',
    title: 'Guidelines & Production Handoff',
    description:
      'Design is only valuable if it can be sustained. We package complete design systems, export suites (SVG, PDF, PNG), and explicit guidelines for seamless implementation.',
    deliverable: 'Master brand manual, token library, and preflight print packages',
  },
];

export function CreativeProcessSection() {
  return (
    <section className="py-24 bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Methodology
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-charcoal tracking-tight">
              The Creative Process
            </h2>
            <p className="mt-4 text-base text-charcoal-500 font-sans leading-relaxed">
              A structured, transparent workflow designed to eliminate guesswork, respect project timelines, and deliver commercially impactful creative work.
            </p>
          </div>
        </Reveal>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.step} delay={0.1 * index}>
              <div className="p-8 bg-white border border-charcoal/15 flex flex-col justify-between h-full relative group hover:border-copper transition-colors duration-200">
                {/* Step Number */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-charcoal/10">
                    <span className="font-display font-bold text-4xl text-copper">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal-400">
                      Phase {index + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-charcoal mt-6 group-hover:text-copper transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-charcoal-500 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable Pill */}
                <div className="mt-8 pt-4 border-t border-charcoal/10">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                    Deliverable:
                  </span>
                  <span className="text-xs font-sans text-charcoal-700 font-medium">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
