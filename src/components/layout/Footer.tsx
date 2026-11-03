'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-ivory border-t border-charcoal-800 py-16 sm:py-20">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 space-y-12">
        {/* Top Minimal Footer Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-charcoal-800">
          <div className="space-y-4 max-w-md">
            <div className="relative w-44 aspect-[1024/225]">
              <Image
                src="/brand/logo-wordmark-dark.png"
                alt="Abdul Ahad"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-charcoal-400 font-sans leading-relaxed">
              Designed with intent. Made to matter. Independent creative practice based in Coimbatore, Tamil Nadu, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-sans font-semibold uppercase tracking-[0.18em]">
            <Link href="/work" className="text-charcoal-300 hover:text-copper transition-colors">
              Work
            </Link>
            <Link href="/services" className="text-charcoal-300 hover:text-copper transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-charcoal-300 hover:text-copper transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-charcoal-300 hover:text-copper transition-colors">
              Contact
            </Link>
            <Link href="/admin/login" className="text-charcoal-500 hover:text-ivory transition-colors inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-charcoal-400 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} Abdul Ahad J. All rights reserved.</span>
          <span>Graphic Design · Visual Branding · Coimbatore, India</span>
        </div>
      </div>
    </footer>
  );
}
