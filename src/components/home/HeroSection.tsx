'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { SafeImage } from '@/components/ui/SafeImage';

interface HeroSectionProps {
  settings?: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const monogramY = useTransform(scrollY, [0, 500], [0, 40]);

  const headline = settings?.heroHeadline || 'ABDUL AHAD';
  const headlineLine2 = settings?.heroHeadlineLine2 || '';
  const title = settings?.heroTitle || settings?.title || 'CREATIVE DESIGNER & DIGITAL CREATIVE PARTNER';
  const locationLabel = settings?.heroLocationLabel || settings?.location || 'Coimbatore, Tamil Nadu, India';
  const intro = settings?.heroSupportingCopy || 'I create thoughtful visual identities, digital experiences, and motion-led content for brands that want to stand out.';
  const introSecondary = settings?.heroIntroSecondary || 'Combining visual design, typography, and human-centered design thinking to deliver precise creative solutions that command attention and build credibility.';
  
  const primaryCtaText = settings?.heroPrimaryCtaText || 'Explore My Work';
  const primaryCtaHref = settings?.heroPrimaryCtaHref || '#portfolio-strip';
  const secondaryCtaText = settings?.heroSecondaryCtaText || 'Start a Project';
  const secondaryCtaHref = settings?.heroSecondaryCtaHref || '/contact';

  const showMonogram = settings?.heroMonogramVisible !== false;
  const monogramUrl = settings?.heroMonogramUrl || '/brand/logo-monogram-light.png';
  const animationEnabled = settings?.heroAnimationEnabled !== false && !shouldReduceMotion;

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-ivory text-charcoal border-b border-charcoal/15 overflow-hidden">
      {/* Optional Background Image */}
      {settings?.heroBgImage && (
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
          <SafeImage
            src={settings.heroBgImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Background Subtle Monogram Watermark (Positioned in Upper Right Negative Space) */}
      {showMonogram && (
        <motion.div
          style={animationEnabled ? { y: monogramY } : {}}
          className="absolute right-4 sm:right-12 lg:right-20 top-24 sm:top-28 w-56 sm:w-80 lg:w-[420px] aspect-[1024/754] pointer-events-none opacity-[0.05] select-none"
          aria-hidden="true"
        >
          <SafeImage
            src={monogramUrl}
            alt=""
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      )}

      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full space-y-12 sm:space-y-16">
        {/* Top Alignment Edge: Location and Professional Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/10 text-xs font-sans uppercase tracking-[0.2em] text-charcoal-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="font-semibold text-charcoal">
              {locationLabel}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Independent Design Practice</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Main Headline & Professional Title (Strict Left Alignment) */}
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={animationEnabled ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem] tracking-tighter leading-[0.92] text-charcoal">
              {headline}
              {headlineLine2 && <span className="block text-copper">{headlineLine2}</span>}
            </h1>
          </motion.div>

          <motion.div
            initial={animationEnabled ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-copper tracking-tight uppercase leading-snug">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Balanced Two-Column Composition (Aligned along the Same Left Edge) */}
        <div className="pt-8 border-t border-charcoal/15 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Short Professional Introduction with Comfortable Line Length */}
          <div className="md:col-span-6 lg:col-span-7 space-y-4">
            <p className="text-xl sm:text-2xl md:text-[26px] font-sans text-charcoal font-light leading-relaxed">
              {intro}
            </p>
            {introSecondary && (
              <p className="text-base sm:text-[18px] font-sans text-charcoal-600 font-light leading-relaxed max-w-xl">
                {introSecondary}
              </p>
            )}
          </div>

          {/* Right Column: Service Capabilities & Primary Actions */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6 md:border-l md:border-charcoal/15 md:pl-8 lg:pl-10">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal-400 block mb-2">
                Core Capabilities
              </span>
              <p className="text-xs sm:text-sm md:text-base font-sans font-medium uppercase tracking-[0.16em] text-charcoal-700 leading-relaxed">
                Graphic Design / UI/UX / Motion Graphics / Video Editing / Web &amp; App
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-ivory text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors duration-200"
              >
                <span>{primaryCtaText}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-charcoal/30 text-charcoal text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.16em] hover:border-charcoal hover:bg-charcoal/5 transition-colors duration-200"
              >
                <span>{secondaryCtaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
