'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Layers, Palette, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function ServicesOverviewSection() {
  const primaryService = SERVICES_DATA.find((s) => s.isPrimary);
  const supportingServices = SERVICES_DATA.filter((s) => !s.isPrimary);

  return (
    <section className="py-24 bg-ivory text-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal/15">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
                Capabilities & Scope
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-charcoal tracking-tight">
                Creative Services
              </h2>
            </div>
            <p className="text-sm text-charcoal-500 font-sans max-w-md">
              Positioned as interconnected creative disciplines that unify visual storytelling, strategic branding, digital product design, and dynamic motion.
            </p>
          </div>
        </Reveal>

        {/* Primary Service Spotlight Box */}
        {primaryService && (
          <Reveal delay={0.1}>
            <div className="mt-12 p-8 sm:p-12 bg-charcoal text-ivory border border-charcoal-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-copper/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper/20 text-copper text-xs font-sans font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Primary Service Core</span>
                  </div>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-ivory">
                    {primaryService.title}
                  </h3>
                  <p className="text-base text-charcoal-300 font-sans leading-relaxed max-w-2xl">
                    {primaryService.description}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {primaryService.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-sans px-3 py-1 bg-charcoal-800 text-charcoal-200 border border-charcoal-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-end lg:items-end gap-4">
                  <Button
                    href="/services"
                    variant="primary"
                    size="md"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    View All Deliverables
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Supporting Services Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingServices.map((service, index) => (
            <Reveal key={service.id} delay={0.05 * (index % 6)}>
              <div className="h-full p-6 sm:p-8 bg-ivory-100 border border-charcoal/10 flex flex-col justify-between hover:border-copper transition-colors duration-200 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-display font-bold text-copper">
                      0{index + 2}
                    </span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-400">
                      Capability
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-charcoal group-hover:text-copper transition-colors">
                    {service.title}
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm text-charcoal-500 font-sans leading-relaxed">
                    {service.shortSummary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-charcoal-400">
                    {service.deliverables.length} Key Outputs
                  </span>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-copper inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
