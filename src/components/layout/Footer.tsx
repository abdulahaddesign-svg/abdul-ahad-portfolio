'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { SITE_SETTINGS } from '@/lib/constants';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings = SITE_SETTINGS }: FooterProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isDarkMode = settings.footerAppearance === 'dark';
  const logoUrl = isDarkMode
    ? settings.footerLogoDarkUrl || '/brand/logo-wordmark-clean-dark.png'
    : settings.footerLogoLightUrl || '/brand/logo-wordmark-clean-light.png';

  const brandStatement = settings.footerBrandStatement || 'Abdul Ahad';
  const description =
    settings.footerDescription ||
    'Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India.';
  const email = settings.email || 'abdulahad.ofcl@gmail.com';
  const phone = settings.phone || '+91 9150037005';
  const behance = settings.behanceUrl || 'https://www.behance.net/abdulahad438';
  const linkedin = settings.linkedinUrl || 'https://www.linkedin.com/in/abdulahadj';
  const showNav = settings.footerNavVisible !== false;
  const copyright = settings.footerCopyright || 'Abdul Ahad J. All rights reserved.';

  return (
    <footer
      className={`relative pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden select-none transition-colors duration-300 ${
        isDarkMode
          ? 'bg-charcoal text-ivory border-t border-charcoal-800'
          : 'bg-ivory text-charcoal border-t border-charcoal/15'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* =========================================================================
            1. FOOTER TOP: Compact Info & Channels (Inspired by Endcap)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start pb-12 sm:pb-16">
          {/* Left Side: Clean Logo + Short Description */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="relative h-8 sm:h-9 w-48 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={logoUrl}
                  alt={settings.name}
                  width={220}
                  height={44}
                  className="max-h-8 sm:max-h-9 w-auto object-contain select-none"
                  priority
                />
              </div>
            </Link>

            <p
              className={`text-sm sm:text-base font-sans max-w-md font-light leading-relaxed ${
                isDarkMode ? 'text-charcoal-300' : 'text-charcoal-600'
              }`}
            >
              {description}
            </p>
          </div>

          {/* Right Side: Direct Contact Coordinates & Social Handles */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col sm:items-end justify-between space-y-4 text-xs sm:text-sm font-sans">
            <div className="space-y-2 sm:text-right">
              <a
                href={`mailto:${email}`}
                className={`inline-flex items-center gap-1.5 font-bold hover:text-copper transition-colors ${
                  isDarkMode ? 'text-ivory' : 'text-charcoal'
                }`}
              >
                <span>{email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
              </a>

              <div className="block">
                <a
                  href="https://wa.me/919150037005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-copper transition-colors font-mono text-xs ${
                    isDarkMode ? 'text-charcoal-400' : 'text-charcoal-500'
                  }`}
                >
                  WhatsApp: {phone}
                </a>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-6 pt-2 font-mono text-xs uppercase tracking-wider">
              <a
                href={behance}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-colors inline-flex items-center gap-1"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-3 h-3 text-copper" />
              </a>
              <span className={isDarkMode ? 'text-charcoal-700' : 'text-charcoal-300'}>/</span>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-copper" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. FOOTER NAVIGATION ROW: Understated & Aligned
            ========================================================================= */}
        {showNav && (
          <div
            className={`py-6 border-y ${
              isDarkMode ? 'border-charcoal-800' : 'border-charcoal/15'
            } flex flex-wrap items-center justify-between gap-6 text-[13px] font-sans font-semibold uppercase tracking-[0.18em]`}
          >
            <nav className="flex flex-wrap items-center gap-8 sm:gap-12" aria-label="Footer Navigation">
              <Link
                href="/work"
                className={`transition-colors hover:text-copper ${
                  isDarkMode ? 'text-charcoal-300' : 'text-charcoal-700'
                }`}
              >
                Work
              </Link>
              <Link
                href="/services"
                className={`transition-colors hover:text-copper ${
                  isDarkMode ? 'text-charcoal-300' : 'text-charcoal-700'
                }`}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-copper ${
                  isDarkMode ? 'text-charcoal-300' : 'text-charcoal-700'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-copper ${
                  isDarkMode ? 'text-charcoal-300' : 'text-charcoal-700'
                }`}
              >
                Contact
              </Link>
            </nav>

            <Link
              href="/admin/login"
              className={`inline-flex items-center gap-1.5 text-xs font-mono lowercase tracking-wider transition-colors ${
                isDarkMode
                  ? 'text-charcoal-500 hover:text-ivory'
                  : 'text-charcoal-400 hover:text-charcoal'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>admin portal</span>
            </Link>
          </div>
        )}

        {/* =========================================================================
            3. FOOTER BOTTOM: Small Copyright & Location Spec
            ========================================================================= */}
        <div
          className={`pt-6 pb-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-sans uppercase tracking-widest ${
            isDarkMode ? 'text-charcoal-500' : 'text-charcoal-400'
          }`}
        >
          <span>&copy; {new Date().getFullYear()} {copyright}</span>
          <span>Graphic Design · Visual Branding · Coimbatore, India</span>
        </div>
      </div>

      {/* =========================================================================
          4. OVERSIZED TYPOGRAPHIC BRAND STATEMENT (Endcap Reference)
          - Bleeds intentionally to the edges
          - Space Grotesk Bold, Live responsive text
          - Controlled with overflow-hidden
          ========================================================================= */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-2 sm:mt-6 -mb-4 sm:-mb-8">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <h2
            className={`font-display font-black text-[13.5vw] sm:text-[14.5vw] md:text-[15.5vw] lg:text-[15.8vw] tracking-tighter leading-[0.82] uppercase whitespace-nowrap transition-colors duration-300 ${
              isDarkMode
                ? 'text-charcoal-800/80 hover:text-ivory'
                : 'text-charcoal/[0.12] sm:text-charcoal/[0.10]'
            }`}
          >
            {brandStatement}
          </h2>
        </div>
      </div>
    </footer>
  );
}