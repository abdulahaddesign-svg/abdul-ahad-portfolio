'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { EXPERIENCE_DATA } from '@/lib/constants';
import { Reveal } from '@/components/motion/Reveal';

export function ExperienceSection() {
  return (
    <section className="py-24 bg-charcoal text-ivory relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal-800">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
                Career History
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory tracking-tight">
                Experience & Achievements
              </h2>
            </div>
            <p className="text-sm text-charcoal-400 font-sans max-w-md">
              A timeline of commercial impact across enterprise SaaS, global agency accounts, and independent freelance engagements.
            </p>
          </div>
        </Reveal>

        {/* Timeline Items */}
        <div className="mt-12 space-y-12 relative">
          {/* Vertical Timeline Guide */}
          <div className="absolute left-0 md:left-1/3 top-4 bottom-4 w-px bg-charcoal-800 hidden md:block" />

          {EXPERIENCE_DATA.map((exp, index) => (
            <Reveal key={exp.id} delay={0.1 * index}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
                {/* Left Meta Info */}
                <div className="md:col-span-4 space-y-2 md:text-right md:pr-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-800 text-copper text-xs font-sans font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <h3 className="font-display font-bold text-xl text-ivory">
                    {exp.company}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-charcoal-400 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-copper" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Right Role & Responsibilities */}
                <div className="md:col-span-8 p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 space-y-6">
                  <div>
                    <span className="text-xs font-sans uppercase tracking-widest text-copper block mb-1">
                      Role Designation
                    </span>
                    <h4 className="font-display font-bold text-2xl text-ivory">
                      {exp.role}
                    </h4>
                  </div>

                  {/* Responsibilities List */}
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-sm text-charcoal-300 font-sans leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Special Recognition Achievement Box */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="p-4 bg-charcoal-950 border border-copper/40 flex items-start gap-3">
                      <Award className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-copper block">
                          Key Achievement & Recognition
                        </span>
                        <p className="text-sm font-sans text-ivory/90 mt-1">
                          {exp.achievements[0]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
