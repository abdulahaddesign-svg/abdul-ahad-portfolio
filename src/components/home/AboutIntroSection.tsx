'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, CheckCircle2, Award } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface AboutIntroSectionProps {
  settings: SiteSettings;
}

export function AboutIntroSection({ settings }: AboutIntroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  // Subtle parallax on portrait image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  const headline = settings.aboutHeadline || 'I create visual experiences that make ideas matter.';
  const intro =
    settings.aboutIntro ||
    'Abdul Ahad J is a creative designer based in Coimbatore, India, with 3+ years of experience in graphic design, visual branding and digital creative production.';
  const description =
    settings.aboutDescription ||
    'He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025. He works independently and collaborates with teams when projects require broader creative capabilities.';
  const photoUrl = settings.profilePhotoUrl || '/profile/abdul-ahad.jpg';
  const photoAlt = settings.profilePhotoAlt || 'Abdul Ahad J — Creative Designer';
  const resumeUrl = settings.resumeUrl || '/resume/abdul-ahad-resume.pdf';
  const resumeLabel = settings.resumeLabel || 'PDF · Updated Resume';
  const resumeVisible = settings.resumeVisible !== false;

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-36 bg-ivory text-charcoal border-b border-charcoal/15 select-none"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header Line */}
        <div className="flex items-center justify-between pb-6 border-b border-charcoal/10 mb-14 sm:mb-20">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            ABOUT &amp; DIRECTION
          </span>
          <span className="text-xs font-mono text-charcoal-400">
            03 — PROFILE &amp; PRACTICE
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Typography, Narrative & CTAs (7 Columns) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {/* Large Typography Reveal Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-charcoal tracking-tighter leading-[1.05]">
                {headline}
              </h2>
            </motion.div>

            {/* Short Concise Professional Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <p className="text-lg sm:text-[20px] md:text-[22px] font-sans text-charcoal font-normal leading-relaxed">
                {intro}
              </p>
              <p className="text-base sm:text-[17px] font-sans text-charcoal-600 font-light leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Compact Experience & Accreditations (Editorial Divider Layout, Zero Cards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 border-y border-charcoal/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block">
                  Experience
                </span>
                <span className="font-display font-bold text-xl text-charcoal">
                  3+ Years
                </span>
                <span className="text-xs text-charcoal-500 block">
                  Visual Branding &amp; Motion
                </span>
              </div>

              <div className="space-y-1 sm:border-l sm:border-charcoal/10 sm:pl-6">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block">
                  Client Record
                </span>
                <span className="font-display font-bold text-xl text-copper">
                  50+ Brands
                </span>
                <span className="text-xs text-charcoal-500 block">
                  Global &amp; Independent
                </span>
              </div>

              <div className="space-y-1 sm:border-l sm:border-charcoal/10 sm:pl-6">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-charcoal-400 block">
                  Recognition
                </span>
                <span className="font-display font-bold text-xl text-charcoal flex items-center gap-1">
                  eClerx 2025
                </span>
                <span className="text-xs text-charcoal-500 block">
                  Best Employee Honor
                </span>
              </div>
            </motion.div>

            {/* Resume Download CTA & Extended Biography Link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {resumeVisible && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <a
                    href={resumeUrl}
                    download="Abdul-Ahad-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors duration-200"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Download Resume</span>
                  </a>
                  <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wider">
                    {resumeLabel}
                  </span>
                </div>
              )}

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.16em] text-copper hover:text-charcoal transition-colors py-3.5"
              >
                <span>Read Full Biography</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Large Professional Portrait with Mask Reveal (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[460px] aspect-[4/5] bg-charcoal-900 border border-charcoal/20 overflow-hidden"
            >
              <motion.div style={{ y: imageY }} className="relative w-full h-full">
                <Image
                  src={photoUrl}
                  alt={photoAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  priority
                  className="object-cover object-top select-none"
                />
              </motion.div>

              {/* Minimal Editorial Corner Badge */}
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 border border-charcoal/30">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ivory">
                  COIMBATORE · IN
                </span>
              </div>
            </motion.div>

            {/* Understated Editorial Caption */}
            <div className="w-full max-w-[460px] mt-4 flex items-baseline justify-between text-xs font-sans text-charcoal-500">
              <span className="font-medium text-charcoal">Abdul Ahad J</span>
              <span className="font-mono text-[11px] text-charcoal-400">
                Portrait / Studio Spec
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}