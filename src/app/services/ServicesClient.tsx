'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesClientProps {
  services: ServiceItem[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug || '');
  const prefersReduced = useReducedMotion();

  // Scroll spy to highlight current service in navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const srv of services) {
        const el = document.getElementById(srv.slug);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSlug(srv.slug);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services]);

  const scrollToService = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-ivory text-charcoal select-none">
      {/* ========================================================= */}
      {/* 1. SERVICES PAGE HERO SECTION                             */}
      {/* ========================================================= */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 border-b border-charcoal/15 relative overflow-hidden">
        <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Subtle Background Monogram Accent */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] text-charcoal font-display font-black text-[28vw] leading-none"
            aria-hidden="true"
          >
            AA
          </div>

          <div className="max-w-5xl space-y-8 relative z-10">
            {/* Introductory Label */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
              <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-copper">
                Creative Services
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tighter text-charcoal leading-[0.95]"
            >
              DESIGN THAT<br />
              <span className="text-copper">MAKES IDEAS</span><br />
              MATTER.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl text-charcoal-700 font-sans font-light leading-relaxed max-w-3xl"
            >
              From visual identities to digital experiences, I create thoughtful design solutions that help brands communicate with clarity and stand out.
            </motion.p>

            {/* Dual Action CTAs */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('services-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-charcoal text-ivory text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-all duration-200 shadow-sm"
              >
                <span>Explore Services</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-4 border border-charcoal/30 text-charcoal text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] hover:border-charcoal hover:bg-charcoal/5 transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MINIMAL SERVICE NAVIGATION BAR (STICKY)                */}
      {/* ========================================================= */}
      <nav
        aria-label="Services Index Navigation"
        className="sticky top-16 sm:top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-charcoal/15 py-4 overflow-x-auto scrollbar-none"
      >
        <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center gap-2 sm:gap-6 whitespace-nowrap min-w-max">
          {services.map((srv, idx) => {
            const isActive = activeSlug === srv.slug;
            const numberFormatted = String(srv.sortOrder || idx + 1).padStart(2, '0');

            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => scrollToService(srv.slug)}
                className={`group flex items-center gap-2 px-3 py-1.5 transition-all duration-200 relative text-xs sm:text-[13px] font-sans uppercase tracking-[0.12em] ${
                  isActive
                    ? 'text-charcoal font-bold'
                    : 'text-charcoal-500 hover:text-charcoal font-medium'
                }`}
              >
                <span className={`font-mono text-[11px] ${isActive ? 'text-copper font-bold' : 'text-charcoal-400'}`}>
                  {numberFormatted}
                </span>
                <span>{srv.title}</span>

                {isActive && (
                  <motion.span
                    layoutId="service-nav-pill"
                    className="absolute -bottom-4 left-0 right-0 h-[2.5px] bg-copper"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 3. DEDICATED EDITORIAL SERVICE SECTIONS                   */}
      {/* ========================================================= */}
      <div id="services-catalog" className="divide-y divide-charcoal/15">
        {services.map((srv, index) => (
          <ServicePresentationSection
            key={srv.id}
            service={srv}
            index={index}
            prefersReduced={Boolean(prefersReduced)}
          />
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Individual Image-Led Editorial Service Presentation Component
// -------------------------------------------------------------
interface ServicePresentationSectionProps {
  service: ServiceItem;
  index: number;
  prefersReduced: boolean;
}

function ServicePresentationSection({
  service,
  index,
  prefersReduced,
}: ServicePresentationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberFormatted = String(service.sortOrder || index + 1).padStart(2, '0');
  const isEven = index % 2 === 1;

  // Scroll linked parallax for image composition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const primaryY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [30, -30]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [60, -40]);

  return (
    <section
      id={service.slug}
      ref={containerRef}
      className="py-24 sm:py-32 lg:py-40 scroll-mt-24 relative overflow-hidden"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center ${
          isEven ? 'lg:flex-row-reverse' : ''
        }`}>
          {/* ========================================================= */}
          {/* Left / Text Narrative Column                              */}
          {/* ========================================================= */}
          <div className={`lg:col-span-5 space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Service Number & Metadata Badge */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 text-xs font-mono tracking-widest text-copper"
            >
              <span className="text-3xl sm:text-4xl font-display font-black text-copper">
                {numberFormatted}
              </span>
              <span className="h-px w-8 bg-copper/40" />
              <span className="uppercase tracking-[0.2em] font-sans font-bold">
                {service.isPrimary ? 'Primary Discipline' : 'Core Creative Capability'}
              </span>
            </motion.div>

            {/* Headline Title */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tighter leading-[1.05]">
                {service.title}
              </h2>
              {service.tagline && (
                <p className="text-base sm:text-lg font-sans font-semibold text-copper">
                  {service.tagline}
                </p>
              )}
            </motion.div>

            {/* Editorial Description */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-charcoal-700 font-sans font-light leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* Deliverables Roster */}
            {service.deliverables && service.deliverables.length > 0 && (
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-charcoal/15 space-y-4"
              >
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-charcoal-500 block">
                  Key Deliverables &amp; Output:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-charcoal-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action CTA Link */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <Link
                href={service.ctaHref || `/contact?service=${service.slug}`}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-charcoal text-ivory text-xs sm:text-[13px] font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-all duration-200 shadow-sm"
              >
                <span>{service.ctaText || 'Initiate Brief'}</span>
                <ArrowUpRight className="w-4 h-4 text-copper group-hover:text-ivory group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* Right / Overlapping Image Composition                     */}
          {/* ========================================================= */}
          <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <motion.div
              style={{ y: primaryY }}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] w-full bg-charcoal-900 border border-charcoal/20 overflow-hidden shadow-2xl group"
            >
              <Image
                src={service.primaryImage || '/projects/freelance/branding-cover.svg'}
                alt={`${service.title} primary showcase`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />

              {/* Service Number Watermark Overlay */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 bg-charcoal/80 backdrop-blur-sm border border-ivory/10 text-[11px] font-mono text-ivory uppercase tracking-widest">
                Discipline / {numberFormatted}
              </div>
            </motion.div>

            {/* Overlapping Secondary Floating Card (Top or Bottom Corner) */}
            {service.supportingImages && service.supportingImages.length > 0 && (
              <motion.div
                style={{ y: secondaryY }}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute -bottom-6 sm:-bottom-10 w-2/5 max-w-[280px] aspect-[4/3] bg-charcoal-900 border-2 border-ivory shadow-2xl overflow-hidden hidden sm:block group ${
                  isEven ? '-left-4 sm:-left-8' : '-right-4 sm:-right-8'
                }`}
              >
                <Image
                  src={service.supportingImages[0]}
                  alt={`${service.title} supporting collateral`}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-charcoal/90 text-[10px] font-mono uppercase tracking-wider text-ivory text-center truncate">
                  Visual Application
                </div>
              </motion.div>
            )}

            {/* Optional 2nd Supporting Floating Card (if available) */}
            {service.supportingImages && service.supportingImages.length > 1 && (
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute -top-6 sm:-top-8 w-1/3 max-w-[220px] aspect-[16/10] bg-charcoal-900 border-2 border-ivory shadow-2xl overflow-hidden hidden md:block group ${
                  isEven ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'
                }`}
              >
                <Image
                  src={service.supportingImages[1]}
                  alt={`${service.title} supplementary view`}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
