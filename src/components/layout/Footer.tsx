'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { SITE_SETTINGS } from '@/lib/constants';
import { SafeImage } from '@/components/ui/SafeImage';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings = SITE_SETTINGS }: FooterProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  // Default to dark mode as requested by user
  const isDarkMode = settings.footerAppearance ? settings.footerAppearance === 'dark' : true;
  const logoUrl = isDarkMode
    ? settings.footerLogoDarkUrl || '/brand/logo-wordmark-clean-dark.png'
    : settings.footerLogoLightUrl || '/brand/logo-wordmark-clean-light.png';

  const description =
    settings.footerDescription ||
    'Independent creative designer specializing in visual branding, digital experiences, motion and creative systems. Based in Coimbatore, India.';
  const email = settings.email || 'abdulahad.ofcl@gmail.com';
  const phone = settings.phone || '+91 9150037005';
  const rawWhatsapp = (settings.whatsappNumber || phone).replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawWhatsapp || '919150037005'}`;
  const behance = settings.behanceUrl || 'https://www.behance.net/abdulahad438';
  const linkedin = settings.linkedinUrl || 'https://www.linkedin.com/in/abdulahadj';
  const instagram = settings.instagramUrl;
  const dribbble = settings.dribbbleUrl;
  const showNav = settings.footerNavVisible !== false;
  const copyright = settings.footerCopyright || 'Abdul Ahad J. All rights reserved.';
  const locationText = settings.footerLocation || settings.location || 'Coimbatore, Tamil Nadu, India';

  return (
    <footer
      className={`relative pt-16 sm:pt-24 pb-6 sm:pb-10 overflow-hidden select-none transition-colors duration-300 ${
        isDarkMode
          ? 'bg-charcoal text-ivory border-t border-charcoal-800'
          : 'bg-ivory text-charcoal border-t border-charcoal/15'
      }`}
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* =========================================================================
            1. FOOTER TOP: Compact Info & Direct Channels (Inspired by Endcap)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start pb-12 sm:pb-16">
          {/* Left Side: Clean Logo + Short Description */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="relative h-8 sm:h-9 w-48 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]">
                <SafeImage
                  src={logoUrl}
                  fallback="/brand/logo-wordmark-clean-dark.png"
                  alt={settings.name}
                  width={240}
                  height={48}
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
                  href={whatsappUrl}
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
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs uppercase tracking-wider">
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
              {instagram && (
                <>
                  <span className={isDarkMode ? 'text-charcoal-700' : 'text-charcoal-300'}>/</span>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-copper transition-colors inline-flex items-center gap-1"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-copper" />
                  </a>
                </>
              )}
              {dribbble && (
                <>
                  <span className={isDarkMode ? 'text-charcoal-700' : 'text-charcoal-300'}>/</span>
                  <a
                    href={dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-copper transition-colors inline-flex items-center gap-1"
                  >
                    <span>Dribbble</span>
                    <ArrowUpRight className="w-3 h-3 text-copper" />
                  </a>
                </>
              )}
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
          className={`pt-6 pb-6 sm:pb-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-sans uppercase tracking-widest ${
            isDarkMode ? 'text-charcoal-500' : 'text-charcoal-400'
          }`}
        >
          <span>&copy; {new Date().getFullYear()} {copyright}</span>
          <span>Graphic Design · Visual Branding · {locationText}</span>
        </div>
      </div>

      {/* =========================================================================
          4. OVERSIZED BRAND LOGO STATEMENT (Replaces Typo with Uploaded Logo Asset)
          - Bleeds intentionally to the edges
          - Displays uploaded logo wordmark (Dark or Light variant)
          - Controlled with overflow-hidden
          ========================================================================= */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-4 sm:mt-8 -mb-2 sm:-mb-4">
        <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="relative w-full aspect-[1024/167] opacity-85 transition-opacity duration-300">
            <SafeImage
              src={logoUrl}
              fallback="/brand/logo-wordmark-clean-dark.png"
              alt={settings.name}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-contain object-bottom select-none"
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
}