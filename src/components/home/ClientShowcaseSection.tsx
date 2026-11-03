'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ClientLogo } from '@/lib/types';

interface ClientShowcaseSectionProps {
  clients: ClientLogo[];
}

export function ClientShowcaseSection({ clients }: ClientShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth, controlled horizontal translation linked to vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Double the list for seamless continuous horizontal length
  const displayClients = clients.length > 0 ? [...clients, ...clients, ...clients] : [];

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-ivory text-charcoal border-b border-charcoal/15 overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-charcoal/10">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            SELECTED CLIENTS
          </span>
          <p className="text-xs sm:text-sm font-sans text-charcoal-500 font-light">
            Collaborating with brands, businesses and creative teams.
          </p>
        </div>
      </div>

      {/* Horizontal Moving Strip of Large Logos */}
      <div className="w-full overflow-hidden py-4">
        <motion.div
          style={shouldReduceMotion ? {} : { x }}
          className="flex items-center gap-16 sm:gap-24 md:gap-32 w-max will-change-transform px-6 sm:px-12"
        >
          {displayClients.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex items-center justify-center shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 py-3"
              title={client.name}
            >
              <div className="relative h-10 sm:h-14 md:h-16 w-40 sm:w-52 md:w-64 flex items-center justify-center">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  width={240}
                  height={80}
                  className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain select-none transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
