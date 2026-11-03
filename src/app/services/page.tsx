import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services & Creative Capabilities — Abdul Ahad J',
  description:
    'Graphic design, brand identity systems, social media content, print packaging, UI/UX, and motion graphics services by Abdul Ahad J in Coimbatore.',
};

export default function ServicesPage() {
  const primaryService = SERVICES_DATA.find((s) => s.isPrimary);
  const supportingServices = SERVICES_DATA.filter((s) => !s.isPrimary);

  return (
    <div className="pt-36 sm:pt-44 pb-32 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="pb-16 border-b border-charcoal/15">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-4">
            Capabilities &amp; Scope
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-charcoal leading-none">
            Creative Services
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-charcoal-600 font-sans max-w-4xl font-light leading-relaxed">
            Interconnected visual disciplines structured around measurable commercial outcomes. From singular visual identities to multi-channel digital campaigns.
          </p>
        </div>

        {/* Primary Specialization Spotlight */}
        {primaryService && (
          <div id={primaryService.slug} className="py-20 border-b border-charcoal/15">
            <div className="p-8 sm:p-14 bg-charcoal text-ivory space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-copper">
                  01 / Primary Discipline
                </span>
                <span className="text-xs font-sans text-charcoal-400">
                  Graphic Design &amp; Visual Systems
                </span>
              </div>

              <div className="max-w-4xl space-y-4">
                <h2 className="font-display font-black text-4xl sm:text-6xl text-ivory tracking-tight">
                  {primaryService.title}
                </h2>
                <p className="text-lg sm:text-xl text-charcoal-300 font-sans font-light leading-relaxed">
                  {primaryService.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-charcoal-800">
                <div className="space-y-4">
                  <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-copper">
                    Key Deliverables
                  </h3>
                  <ul className="space-y-2.5 text-sm font-sans text-charcoal-200 font-light">
                    {primaryService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-copper">
                    Typical Engagements
                  </h3>
                  <ul className="space-y-2.5 text-sm font-sans text-charcoal-200 font-light">
                    {primaryService.typicalProjects.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-6">
                <span className="text-xs font-sans text-charcoal-400">
                  Tailored scopes for ambitious startups and enterprise accounts.
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-copper text-ivory text-xs font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper-600 transition-colors"
                >
                  <span>Initiate Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Supporting Services Sequence */}
        <section className="py-20">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
              Breadth of Capability
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
              Supporting Disciplines
            </h2>
          </div>

          <div className="divide-y divide-charcoal/15">
            {supportingServices.map((srv, idx) => (
              <div
                key={srv.id}
                id={srv.slug}
                className="py-14 sm:py-20 scroll-mt-28 space-y-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-xs sm:text-sm text-copper tracking-widest shrink-0">
                      0{idx + 2}
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-5xl tracking-tighter text-charcoal">
                      {srv.title}
                    </h3>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.16em] text-copper hover:text-charcoal transition-colors self-start lg:self-auto"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-base sm:text-lg text-charcoal-600 font-sans max-w-4xl font-light leading-relaxed">
                  {srv.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-3">
                      Deliverables Included
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm font-sans text-charcoal-700 font-light">
                      {srv.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-3">
                      Project Applications
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm font-sans text-charcoal-700 font-light">
                      {srv.typicalProjects.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
