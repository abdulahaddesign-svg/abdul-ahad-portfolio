'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Understand',
    summary: 'Deconstruct the business challenge, examine the competitive terrain, and understand audience psychology to establish uncompromising creative intent.',
  },
  {
    number: '02',
    title: 'Explore',
    summary: 'Develop visual directions, typographic moodboards, and structural layout grids. Iteratively validate aesthetic choices against strategic goals.',
  },
  {
    number: '03',
    title: 'Create',
    summary: 'Execute with mathematical precision. Refining vector letterforms, optical kerning, responsive UI breakpoints, and motion curves.',
  },
  {
    number: '04',
    title: 'Deliver',
    summary: 'Package complete brand manuals, preflight print-ready packages, Figma component tokens, and production assets engineered for longevity.',
  },
];

export function CreativeProcessSection() {
  return (
    <section
      id="process"
      className="py-24 sm:py-36 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 select-none transition-colors duration-300"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-3">
            Workflow &amp; Rigor
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-charcoal tracking-tighter">
            Creative Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
            A linear, transparent framework designed to eliminate arbitrary styling and deliver measurable business outcomes.
          </p>
        </div>

        {/* 4 Editorial Process Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-charcoal/15">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`pt-8 lg:pt-0 ${idx > 0 ? 'lg:pl-8' : ''} space-y-6 flex flex-col justify-between`}
            >
              <div>
                <span className="font-display font-black text-6xl sm:text-7xl text-copper/40 block leading-none">
                  {step.number}
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal mt-6 tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm font-sans text-charcoal-600 leading-relaxed font-light">
                  {step.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-charcoal/10 text-[10px] font-mono tracking-widest text-charcoal-400 uppercase">
                Phase 0{idx + 1} Execution
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
