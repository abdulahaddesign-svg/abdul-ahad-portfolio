import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Services & Creative Capabilities — Abdul Ahad J',
  description:
    'Graphic design, brand identity systems, social media content, print packaging, UI/UX, and motion graphics services by Abdul Ahad J in Coimbatore.',
};

export default function ServicesPage() {
  const primaryService = SERVICES_DATA.find((s) => s.isPrimary);
  const supportingServices = SERVICES_DATA.filter((s) => !s.isPrimary);

  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl pb-12 border-b border-charcoal/15">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Capabilities & Offerings
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-charcoal tracking-tight">
              Creative Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
              Precision design services structured around strategic outcomes. From singular brand identities to complete multi-channel campaign architectures.
            </p>
          </div>
        </Reveal>

        {/* Primary Service Anchor Section */}
        {primaryService && (
          <div id={primaryService.slug} className="py-16 border-b border-charcoal/15">
            <div className="p-8 sm:p-12 bg-charcoal text-ivory border border-charcoal-800 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper/20 text-copper text-xs font-sans font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Primary Specialization</span>
                </div>
                <span className="text-xs font-sans text-charcoal-400">01 / Foundational Practice</span>
              </div>

              <div className="space-y-4 max-w-3xl">
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory tracking-tight">
                  {primaryService.title}
                </h2>
                <p className="text-base sm:text-lg text-charcoal-300 font-sans leading-relaxed">
                  {primaryService.description}
                </p>
              </div>

              {/* Deliverables and Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-charcoal-800">
                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-copper mb-4">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {primaryService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal-200 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-copper mb-4">
                    Typical Engagement Types
                  </h4>
                  <ul className="space-y-2.5">
                    {primaryService.typicalProjects.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal-200 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-sans text-charcoal-400">
                  Custom proposals tailored to scope, timeline, and business goals.
                </span>
                <Button href="/contact" variant="primary" size="md">
                  Inquire About This Service
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Supporting Services Grid */}
        <section className="py-16">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Connected Disciplines
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Supporting Capabilities
            </h2>
          </div>

          <div className="space-y-12">
            {supportingServices.map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                className="p-8 sm:p-10 bg-white border border-charcoal/15 space-y-8 scroll-mt-24"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10">
                  <div>
                    <span className="text-xs font-display font-bold text-copper block mb-1">
                      0{index + 2} / Service
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
                      {service.title}
                    </h3>
                  </div>
                  <Button
                    href="/contact"
                    variant="outline"
                    size="sm"
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    Start Project
                  </Button>
                </div>

                <p className="text-base text-charcoal-600 font-sans leading-relaxed max-w-3xl">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Deliverables */}
                  <div className="p-6 bg-ivory-100 border border-charcoal/10">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block mb-3">
                      Deliverables Included
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs font-sans text-charcoal-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-copper shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typical Projects */}
                  <div className="p-6 bg-ivory-100 border border-charcoal/10">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal block mb-3">
                      Project Applications
                    </h4>
                    <ul className="space-y-2">
                      {service.typicalProjects.map((typ, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-xs font-sans text-charcoal-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                          <span>{typ}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Creative Process Steps */}
                {service.creativeProcess && service.creativeProcess.length > 0 && (
                  <div className="pt-6 border-t border-charcoal/10">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal-400 block mb-3">
                      Execution Flow
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {service.creativeProcess.map((step) => (
                        <div key={step.step} className="p-4 bg-white border border-charcoal/10">
                          <span className="text-xs font-display font-bold text-copper block mb-1">
                            {step.step}
                          </span>
                          <span className="text-xs font-sans font-bold text-charcoal block mb-1">
                            {step.title}
                          </span>
                          <p className="text-[11px] font-sans text-charcoal-500 leading-normal">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <div className="p-8 sm:p-12 bg-charcoal text-ivory text-center space-y-6">
          <h3 className="font-display font-bold text-3xl text-ivory">
            Ready to define your visual presence?
          </h3>
          <p className="text-sm font-sans text-charcoal-300 max-w-xl mx-auto">
            Book an initial consultation to review your requirements, timelines, and deliverables.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Submit a Project Brief
          </Button>
        </div>
      </div>
    </div>
  );
}
