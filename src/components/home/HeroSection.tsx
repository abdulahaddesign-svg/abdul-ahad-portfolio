'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteSettings, HeroProfessionItem } from '@/lib/types';
import { DEFAULT_HERO_PROFESSIONS } from '@/lib/constants';

interface HeroSectionProps {
  settings?: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: '0px 0px -20% 0px' });
  const shouldReduceMotion = useReducedMotion();

  // Content configuration with strict defaults
  const introduction = settings?.heroIntroduction || "Hi, I'm";
  const name = settings?.heroName || settings?.heroHeadline || settings?.name || 'Abdul Ahad';
  const description =
    settings?.heroSupportingCopy ||
    'I create thoughtful visual identities, digital experiences and creative solutions that help ambitious brands stand out.';

  const primaryCtaText = settings?.heroPrimaryCtaText || 'Explore My Work';
  const primaryCtaHref = settings?.heroPrimaryCtaHref || '#selected-works';
  const secondaryCtaText = settings?.heroSecondaryCtaText || 'Start a Project';
  const secondaryCtaHref = settings?.heroSecondaryCtaHref || '/contact';

  const animationEnabled = settings?.heroAnimationEnabled !== false && !shouldReduceMotion;
  const intervalMs = settings?.heroAnimationInterval && settings.heroAnimationInterval >= 600
    ? settings.heroAnimationInterval
    : 1200; // Hold ~1s + transition
  const transitionDuration = settings?.heroTransitionDuration && settings.heroTransitionDuration > 0
    ? settings.heroTransitionDuration
    : 0.42;

  // Active enabled professions sequence
  const activeProfessions: string[] = useMemo(() => {
    const rawList = settings?.heroProfessions;
    if (Array.isArray(rawList) && rawList.length > 0) {
      const enabledOnly = rawList.filter((p: HeroProfessionItem) => p.enabled !== false).map((p) => p.text.trim());
      if (enabledOnly.length > 0) return enabledOnly;
    }
    return DEFAULT_HERO_PROFESSIONS.map((p) => p.text);
  }, [settings?.heroProfessions]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotating animation ticker
  useEffect(() => {
    if (!animationEnabled || activeProfessions.length <= 1 || !isInView) return;

    const timer = setInterval(() => {
      // Pause ticker if window is backgrounded
      if (typeof document !== 'undefined' && document.hidden) return;

      setCurrentIndex((prev) => (prev + 1) % activeProfessions.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [animationEnabled, activeProfessions.length, intervalMs, isInView]);

  const currentProfession = activeProfessions[currentIndex] || activeProfessions[0] || 'Graphic Designer';

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction & Professional Overview"
      className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 select-none transition-colors duration-500 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* ATMOSPHERIC BACKGROUND: Animated Blur Orbs, Grain Noise & Dimensional Glow */}
      {/* ========================================================================= */}

      {/* 1. Tactile Fine Film Grain / Paper Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.038] dark:opacity-[0.052] mix-blend-overlay select-none"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-film-grain)" />
        </svg>
      </div>

      {/* 2. Soft Ambient Radial Depth Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(37,36,31,0.04)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.38)_100%)]"
        aria-hidden="true"
      />

      {/* 3. Floating Animated Glowing Orbs with Generous Blur */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Orb 1: Primary Warm Burnt Copper Orb (Top-Left / Center Drift) */}
        <motion.div
          animate={
            animationEnabled
              ? {
                  x: [0, 45, -30, 0],
                  y: [0, -35, 25, 0],
                  scale: [1, 1.12, 0.95, 1],
                  opacity: [0.2, 0.3, 0.22, 0.2],
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute -top-20 sm:-top-32 left-1/4 -translate-x-1/2 w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full bg-gradient-to-br from-copper via-[#D49366] to-transparent blur-[90px] sm:blur-[135px] opacity-20 dark:opacity-28 will-change-transform"
        />

        {/* Orb 2: Secondary Earth Amber Glow (Bottom-Right / Drift) */}
        <motion.div
          animate={
            animationEnabled
              ? {
                  x: [0, -40, 35, 0],
                  y: [0, 30, -30, 0],
                  scale: [1, 0.92, 1.1, 1],
                  opacity: [0.15, 0.25, 0.18, 0.15],
                }
              : {}
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute -bottom-16 sm:-bottom-24 right-1/4 translate-x-1/2 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-tl from-[#7C5C3E] via-copper to-transparent blur-[85px] sm:blur-[125px] opacity-15 dark:opacity-22 will-change-transform"
        />

        {/* Orb 3: Central Core Luminescence (Breathing softly behind typography) */}
        <motion.div
          animate={
            animationEnabled
              ? {
                  scale: [0.94, 1.08, 0.94],
                  opacity: [0.22, 0.38, 0.22],
                }
              : {}
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[220px] sm:w-[520px] sm:h-[340px] rounded-full bg-copper/25 dark:bg-copper/25 blur-[80px] sm:blur-[115px] will-change-transform"
        />
      </div>

      {/* ========================================================================= */}
      {/* FOREGROUND HERO CONTENT                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10 w-full">
        {/* 1. Small Introduction ("Hi, I'm") */}
        <motion.p
          initial={animationEnabled ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl font-sans font-medium text-[#7C5C3E] dark:text-[#D0C5B8] tracking-tight mb-2 sm:mb-3"
        >
          {introduction}
        </motion.p>

        {/* 2. Main Name ("Abdul Ahad") — Strongest Element of First Viewport */}
        <motion.h1
          initial={animationEnabled ? { opacity: 0, y: 22 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(48px,12.5vw,76px)] sm:text-[clamp(64px,9vw,132px)] tracking-tighter leading-[0.95] text-charcoal dark:text-ivory"
        >
          {name}
        </motion.h1>

        {/* 3. Animated Professional Title Sequence (Highlighted in Burnt Copper #C4855A) */}
        <div
          className="relative h-[clamp(44px,7vw,76px)] flex items-center justify-center overflow-hidden w-full my-2 sm:my-3"
          aria-live="polite"
          aria-atomic="true"
        >
          {animationEnabled ? (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={currentProfession}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(27px,6.8vw,42px)] sm:text-[clamp(32px,5vw,64px)] text-copper tracking-tight leading-none whitespace-nowrap block"
              >
                {currentProfession}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="font-display font-bold text-[clamp(27px,6.8vw,42px)] sm:text-[clamp(32px,5vw,64px)] text-copper tracking-tight leading-none whitespace-nowrap block">
              {activeProfessions[0] || 'Graphic Designer'}
            </span>
          )}
        </div>

        {/* 4. Supporting Description (Max width ~650px) */}
        <motion.p
          initial={animationEnabled ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#7C5C3E] dark:text-[#D0C5B8] max-w-[650px] mx-auto mt-3 sm:mt-4 mb-8 sm:mb-10 px-2"
        >
          {description}
        </motion.p>

        {/* 5. Minimal CTA Buttons */}
        <motion.div
          initial={animationEnabled ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 w-full"
        >
          {/* Primary CTA */}
          <Link
            href={primaryCtaHref}
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal border border-charcoal dark:border-ivory font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] hover:bg-copper hover:border-copper dark:hover:bg-copper dark:hover:border-copper dark:hover:text-ivory transition-all duration-300 shadow-sm"
          >
            <span>{primaryCtaText}</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={secondaryCtaHref}
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 border border-charcoal/30 dark:border-ivory/30 text-charcoal dark:text-ivory font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] hover:border-copper hover:text-copper dark:hover:border-copper dark:hover:text-copper transition-all duration-300"
          >
            <span>{secondaryCtaText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-copper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
