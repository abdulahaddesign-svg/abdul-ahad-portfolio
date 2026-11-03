'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { SITE_SETTINGS } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-ivory border-t border-charcoal-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-charcoal-800">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Logo variant="dark" height={44} />
            <p className="text-charcoal-300 font-sans text-sm md:text-base max-w-sm leading-relaxed">
              {SITE_SETTINGS.tagline}
            </p>
            <p className="text-xs text-charcoal-400 font-sans leading-relaxed max-w-md">
              Creative Graphic Designer combining visual branding, digital experiences, motion, and technology to deliver thoughtful creative solutions for ambitious businesses.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse" />
              <span className="text-xs font-sans text-ivory/80">
                Available for freelance & select retainer collaborations
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-copper">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link href="/work" className="text-charcoal-300 hover:text-ivory transition-colors">
                  Selected Work & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-charcoal-300 hover:text-ivory transition-colors">
                  Services & Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-charcoal-300 hover:text-ivory transition-colors">
                  About & Experience
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-charcoal-300 hover:text-ivory transition-colors">
                  Project Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-copper">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <a
                  href={`mailto:${SITE_SETTINGS.email}`}
                  className="inline-flex items-center gap-2.5 text-ivory hover:text-copper transition-colors"
                >
                  <Mail className="w-4 h-4 text-copper shrink-0" />
                  <span>{SITE_SETTINGS.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/919150037005`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-ivory hover:text-copper transition-colors"
                >
                  <Phone className="w-4 h-4 text-copper shrink-0" />
                  <span>{SITE_SETTINGS.phone} (WhatsApp available)</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-charcoal-300">
                <MapPin className="w-4 h-4 text-copper shrink-0" />
                <span>{SITE_SETTINGS.location}</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <a
                href={SITE_SETTINGS.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-300 hover:text-copper transition-colors"
              >
                <span>Behance</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-charcoal-700">·</span>
              <a
                href={SITE_SETTINGS.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-300 hover:text-copper transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-charcoal-400">
          <p>© {new Date().getFullYear()} Abdul Ahad J. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Coimbatore, Tamil Nadu, India</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-charcoal-500 hover:text-copper transition-colors"
              title="Admin CMS Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
