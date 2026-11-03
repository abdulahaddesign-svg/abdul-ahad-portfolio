'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_SETTINGS } from '@/lib/constants';
import { Reveal } from '@/components/motion/Reveal';

export function CtaSection() {
  return (
    <section className="py-24 bg-charcoal text-ivory relative overflow-hidden border-t border-charcoal-800">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
              Start a Conversation
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-ivory tracking-tight mt-3">
              Have a project in mind? Let's make it matter.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-charcoal-300 font-sans max-w-2xl mx-auto leading-relaxed">
              Whether you need a distinctive brand identity, performance marketing creatives, a mobile-first digital experience, or dynamic motion graphics — I'm ready to collaborate.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Start a Project Inquiry
              </Button>
              <Button
                href={`https://wa.me/919150037005`}
                isExternal={true}
                variant="dark"
                size="lg"
                icon={<Phone className="w-4 h-4 text-copper" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </Reveal>

          {/* Direct Contact Pills */}
          <Reveal delay={0.2}>
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs font-sans text-charcoal-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-copper" />
                <a
                  href={`mailto:${SITE_SETTINGS.email}`}
                  className="hover:text-ivory transition-colors"
                >
                  {SITE_SETTINGS.email}
                </a>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-copper" />
                <a
                  href={`tel:${SITE_SETTINGS.phone.replace(/\s+/g, '')}`}
                  className="hover:text-ivory transition-colors"
                >
                  {SITE_SETTINGS.phone}
                </a>
              </div>
              <span>·</span>
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
