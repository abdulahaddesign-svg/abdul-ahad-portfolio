'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { SITE_SETTINGS, EXPERIENCE_DATA } from '@/lib/constants';

export function AboutIntroSection() {
  return (
    <section className="py-24 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Main Headline */}
        <div className="max-w-5xl mb-20 sm:mb-28">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-4">
            Creative Philosophy
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal leading-[0.95]">
            I DESIGN VISUAL EXPERIENCES THAT MAKE IDEAS MATTER.
          </h2>
        </div>

        {/* Narrative & Profile Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-20 border-b border-charcoal/15">
          <div className="lg:col-span-7 space-y-6 text-lg sm:text-xl md:text-2xl font-sans text-charcoal leading-relaxed font-light">
            <p>
              I am Abdul Ahad, a creative designer based in Coimbatore, India, with 3+ years of experience creating visual identities, digital experiences, and motion-led content.
            </p>
            <p className="text-charcoal-600 text-base sm:text-lg">
              My work combines graphic design, visual storytelling, and digital technology to help businesses communicate with clarity and confidence. I work independently and collaborate with teams when a project requires broader creative capabilities.
            </p>
            <p className="text-charcoal-600 text-base sm:text-lg">
              Holding a Bachelor of Science in Computer Science (80% aggregate) alongside specialized proficiency across Adobe Creative Suite, Figma, and generative AI production workflows, I operate with both visual imagination and systematic structural execution.
            </p>

            <div className="pt-4 flex flex-wrap gap-6 items-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-copper hover:text-charcoal transition-colors"
              >
                <span>Read Full Biography &amp; Toolkit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Highlights & Accreditations */}
          <div className="lg:col-span-5 space-y-8 border-l border-charcoal/15 pl-6 sm:pl-10">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Annual Company Honor
              </span>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-copper shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-xl text-charcoal">
                    Best Employee of the Year 2025
                  </h4>
                  <p className="text-xs font-sans text-charcoal-500 mt-1">
                    Conferred at eClerx for exceptional visual design quality and a verified 25% lift in client campaign engagement.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Independent Track Record
              </span>
              <div className="font-display font-bold text-3xl text-copper">
                50+ Clients
              </div>
              <p className="text-xs font-sans text-charcoal-500 mt-1">
                Delivered logos, packaging, social kits, and responsive UI screens across global brands and startups.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Academic Background
              </span>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-copper shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-base text-charcoal">
                    BSc Computer Science (80% Aggregate)
                  </h4>
                  <p className="text-xs font-sans text-charcoal-500 mt-0.5">
                    Government Arts College (Autonomous), Coimbatore · 2020–2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Career Timeline (Thin Dividers, Zero Cards) */}
        <div className="pt-20">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
              Chronology
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Career History
            </h3>
          </div>

          <div className="divide-y divide-charcoal/15">
            {EXPERIENCE_DATA.map((item) => (
              <div
                key={item.id}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-copper tracking-widest">
                    {item.period}
                  </span>
                  <div className="font-display font-bold text-xl sm:text-2xl text-charcoal mt-1">
                    {item.company}
                  </div>
                  <span className="text-xs font-sans text-charcoal-400 block">
                    {item.location}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <span className="text-xs font-sans uppercase tracking-widest text-charcoal-400 block mb-1">
                    Designation
                  </span>
                  <h4 className="font-display font-bold text-lg text-charcoal">
                    {item.role}
                  </h4>
                </div>

                <div className="md:col-span-5">
                  <ul className="space-y-2 text-xs sm:text-sm font-sans text-charcoal-600 leading-relaxed">
                    {item.responsibilities.slice(0, 3).map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
