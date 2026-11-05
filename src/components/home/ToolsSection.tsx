'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { ToolItem } from '@/lib/types';
import { DEFAULT_TOOLS } from '@/lib/constants';

interface ToolsSectionProps {
  tools?: ToolItem[];
  sectionLabel?: string;
  headline?: string;
  subheadline?: string;
  className?: string;
}

export function ToolsSection({
  tools,
  sectionLabel = '04 / ARSENAL',
  headline = 'Tools I Use',
  subheadline = 'Industry-standard design applications mastered for precision, system design, and brand execution.',
  className = '',
}: ToolsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeTools = (tools && tools.length > 0 ? tools : DEFAULT_TOOLS).filter(
    (t) => t.isVisible !== false
  );

  return (
    <section
      id="tools"
      aria-label="Creative Software & Design Tools"
      className={`py-20 sm:py-28 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 transition-colors duration-300 ${className}`}
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-charcoal/10 dark:border-ivory/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-3.5 h-3.5 text-copper" aria-hidden="true" />
              <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
                {sectionLabel}
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-charcoal dark:text-ivory tracking-tighter">
              {headline}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-charcoal-600 dark:text-ivory/70 leading-relaxed font-light">
            {subheadline}
          </p>
        </div>

        {/* Responsive Grid of Design Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {activeTools.map((tool, idx) => (
            <motion.div
              key={tool.id || idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative p-6 sm:p-7 bg-white dark:bg-charcoal-900 border border-charcoal/15 dark:border-ivory/15 hover:border-copper dark:hover:border-copper transition-all duration-300 flex flex-col justify-between min-h-[200px]"
            >
              {/* Monogram / Icon Tile */}
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 border border-charcoal/20 dark:border-ivory/20 flex items-center justify-center font-display font-black text-xl tracking-tight transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(196, 133, 90, 0.08)',
                    color: tool.accentColor || '#C4855A',
                  }}
                  aria-label={`${tool.name} monogram`}
                >
                  <span>{tool.monogram || tool.name.substring(0, 2)}</span>
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal-400 dark:text-ivory/40">
                  0{tool.sortOrder || idx + 1}
                </span>
              </div>

              {/* Tool Meta Info */}
              <div className="pt-6 space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-copper block">
                  {tool.category || 'Creative Tool'}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal dark:text-ivory">
                  {tool.name}
                </h3>
              </div>

              {/* Minimal Accent Indicator */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: tool.accentColor || '#C4855A' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
