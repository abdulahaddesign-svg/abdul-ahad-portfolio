'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, MapPin, Award, Check } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function AboutIntroSection() {
  return (
    <section className="py-24 bg-ivory-50 text-charcoal border-t border-charcoal/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Identity */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
                Professional Profile
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-charcoal tracking-tight mt-2">
                Abdul Ahad J
              </h2>
              <p className="text-sm font-sans font-semibold text-earthBrown">
                Graphic Designer · Visual Branding Specialist · Creative Designer
              </p>
            </Reveal>

            {/* Quick Fact Cards */}
            <Reveal delay={0.1}>
              <div className="space-y-3 pt-4 text-xs font-sans">
                <div className="p-4 bg-white border border-charcoal/15 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Location</span>
                    <span className="text-charcoal-500">{SITE_SETTINGS.location}</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-charcoal/15 flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Education</span>
                    <span className="text-charcoal-500">
                      {SITE_SETTINGS.educationDegree} ({SITE_SETTINGS.educationYear})
                    </span>
                    <span className="text-charcoal-400 block text-[11px]">
                      {SITE_SETTINGS.educationInstitution} · {SITE_SETTINGS.educationAggregate}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-copper/40 flex items-start gap-3">
                  <Award className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal block">Honor & Recognition</span>
                    <span className="text-copper font-semibold">
                      Best Employee of the Year 2025 at eClerx
                    </span>
                    <span className="text-charcoal-500 block text-[11px]">
                      Recognized for design excellence and 25% client campaign engagement lift.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Bio Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.15}>
              <div className="space-y-5 text-base sm:text-lg font-sans text-charcoal-600 leading-relaxed">
                <p className="text-charcoal-900 font-medium">
                  {SITE_SETTINGS.aboutIntro}
                </p>
                <div className="p-6 bg-ivory-200 border-l-4 border-copper my-6">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
                    Creative Philosophy
                  </span>
                  <p className="font-display font-medium text-lg text-charcoal italic">
                    "{SITE_SETTINGS.aboutPhilosophy}"
                  </p>
                </div>
                <p className="text-sm sm:text-base text-charcoal-500">
                  With a background rooted in Computer Science combined with hands-on mastery of Adobe Creative Suite, Figma, and generative AI production tools, I bridge creative intuition with analytical precision — ensuring that every brand artifact is both visually striking and technically flawless.
                </p>
              </div>
            </Reveal>

            {/* Core Competencies Quick Tags */}
            <Reveal delay={0.25}>
              <div className="pt-2">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-3">
                  Core Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Brand Identity Design',
                    'Social Media Marketing Kits',
                    'Print & Packaging Dielines',
                    'Figma UI Design Systems',
                    'Kinetic Motion Graphics',
                    'AI Creative Ideation',
                    'Typography & Layout Systems',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-xs font-sans font-medium text-charcoal-700 border border-charcoal/15"
                    >
                      <Check className="w-3 h-3 text-copper" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Navigation to Full About */}
            <Reveal delay={0.3}>
              <div className="pt-4 flex items-center gap-4">
                <Button href="/about" variant="primary" size="md">
                  View Full Career Story & Tools
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Get in Touch
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
