'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';

export function ContactCtaSection() {
  return (
    <section className="relative py-28 sm:py-44 bg-charcoal text-ivory overflow-hidden select-none">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 bottom-0 w-80 sm:w-[500px] aspect-[1024/754] pointer-events-none opacity-5">
        <Image
          src="/brand/logo-monogram-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="max-w-5xl space-y-8">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block">
            Initiate Collaboration
          </span>

          {/* Huge Headline */}
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter leading-[0.92] text-ivory">
            HAVE A PROJECT <br />
            <span className="text-copper">IN MIND?</span>
          </h2>

          <p className="text-xl sm:text-3xl text-charcoal-300 font-sans font-light max-w-2xl leading-snug">
            Let&apos;s create something that matters.
          </p>

          {/* Primary Action Button */}
          <div className="pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4.5 bg-copper text-ivory font-display font-bold text-sm sm:text-base uppercase tracking-[0.18em] hover:bg-copper-600 transition-colors duration-200"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Direct Communication Channels Row */}
          <div className="pt-16 sm:pt-24 border-t border-charcoal-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs sm:text-sm font-sans">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Direct Email
              </span>
              <a
                href={`mailto:${SITE_SETTINGS.email}`}
                className="font-bold text-ivory hover:text-copper transition-colors break-all"
              >
                {SITE_SETTINGS.email}
              </a>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                WhatsApp Direct
              </span>
              <a
                href="https://wa.me/919150037005"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-copper hover:text-ivory transition-colors"
              >
                {SITE_SETTINGS.phone}
              </a>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                Behance Portfolio
              </span>
              <a
                href={SITE_SETTINGS.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ivory hover:text-copper transition-colors inline-flex items-center gap-1"
              >
                <span>behance.net/abdulahad438</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 block mb-1">
                LinkedIn Profile
              </span>
              <a
                href={SITE_SETTINGS.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ivory hover:text-copper transition-colors inline-flex items-center gap-1"
              >
                <span>linkedin.com/in/abdulahadj</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
