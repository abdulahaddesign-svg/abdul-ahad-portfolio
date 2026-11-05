'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ClientLogo } from '@/lib/types';
import { INITIAL_CLIENTS } from '@/lib/constants';
import { SafeImage } from '@/components/ui/SafeImage';

interface ClientShowcaseSectionProps {
  clients: ClientLogo[];
}

export function ClientShowcaseSection({ clients }: ClientShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Combine database clients with fallback defaults to ensure rich rows
  const rawList = clients && clients.length > 0 ? clients : INITIAL_CLIENTS;
  const activeClients = rawList.filter((c) => c.isVisible !== false);
  const basePool = activeClients.length > 0 ? activeClients : INITIAL_CLIENTS;

  // Split or distribute across 3 distinct rows
  const row1Pool: ClientLogo[] = [];
  const row2Pool: ClientLogo[] = [];
  const row3Pool: ClientLogo[] = [];

  basePool.forEach((client, idx) => {
    if (idx % 3 === 0) row1Pool.push(client);
    else if (idx % 3 === 1) row2Pool.push(client);
    else row3Pool.push(client);
  });

  // Ensure each row has at least 6 items for smooth scroll coverage
  const padRow = (items: ClientLogo[]) => {
    const source = items.length > 0 ? items : basePool;
    const result: ClientLogo[] = [];
    while (result.length < 8) {
      result.push(...source);
    }
    return result.slice(0, 10);
  };

  const row1Items = padRow(row1Pool);
  const row2Items = padRow(row2Pool.length > 0 ? row2Pool : row1Pool.reverse());
  const row3Items = padRow(row3Pool.length > 0 ? row3Pool : row1Pool);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Limit travel to 8%-12% so edge logos are never clipped
  // On scroll down: rows 1 and 3 move right, row 2 moves left. Reverse on scroll up.
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-8%', '6%']);
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['6%', '-8%']);
  const xRow3 = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section
      id="clients"
      ref={containerRef}
      aria-label="Clients & Brand Collaborations"
      className="py-16 sm:py-24 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-charcoal/10 dark:border-ivory/10">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper">
            02 / SELECTED CLIENTS
          </span>
          <p className="text-xs sm:text-sm font-sans text-charcoal-600 dark:text-ivory/70 font-light">
            Collaborating with ambitious brands, SaaS platforms and creative studios worldwide.
          </p>
        </div>
      </div>

      {shouldReduceMotion ? (
        /* Reduced Motion Fallback: Accessible, wrapped static grid */
        <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 items-center">
            {basePool.map((client, idx) => (
              <div
                key={`static-${client.id}-${idx}`}
                className="flex items-center justify-center p-4 border border-charcoal/10 dark:border-ivory/10 bg-white/40 dark:bg-charcoal-900/40"
              >
                <div className="relative h-8 sm:h-10 w-28 sm:w-36 flex items-center justify-center">
                  <SafeImage
                    src={client.logoUrl}
                    alt={client.name}
                    width={180}
                    height={50}
                    fallback="/clients/client-reztro.svg"
                    className="max-h-8 sm:max-h-10 w-auto object-contain dark:brightness-150"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3 Scroll-Linked Kinetic Rows */
        <div className="space-y-4 sm:space-y-6 overflow-hidden">
          {/* Row 1: Moves Right on Scroll Down */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow1 }}
              className="flex items-center gap-8 sm:gap-14 md:gap-20 w-max will-change-transform pl-4"
            >
              {row1Items.map((client, idx) => (
                <div
                  key={`r1-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 px-6 py-3 border border-charcoal/10 dark:border-ivory/10 bg-white/60 dark:bg-charcoal-900/60 hover:border-copper transition-colors duration-300"
                  title={client.name}
                >
                  <div className="relative h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-44 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-reztro.svg"
                      className="max-h-7 sm:max-h-9 md:max-h-10 w-auto object-contain dark:brightness-150 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Moves Left on Scroll Down */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow2 }}
              className="flex items-center gap-8 sm:gap-14 md:gap-20 w-max will-change-transform pl-12"
            >
              {row2Items.map((client, idx) => (
                <div
                  key={`r2-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 px-6 py-3 border border-charcoal/10 dark:border-ivory/10 bg-white/60 dark:bg-charcoal-900/60 hover:border-copper transition-colors duration-300"
                  title={client.name}
                >
                  <div className="relative h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-44 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-falcon.svg"
                      className="max-h-7 sm:max-h-9 md:max-h-10 w-auto object-contain dark:brightness-150 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 3: Moves Right on Scroll Down */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow3 }}
              className="flex items-center gap-8 sm:gap-14 md:gap-20 w-max will-change-transform pl-6"
            >
              {row3Items.map((client, idx) => (
                <div
                  key={`r3-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 px-6 py-3 border border-charcoal/10 dark:border-ivory/10 bg-white/60 dark:bg-charcoal-900/60 hover:border-copper transition-colors duration-300"
                  title={client.name}
                >
                  <div className="relative h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-44 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-apex.svg"
                      className="max-h-7 sm:max-h-9 md:max-h-10 w-auto object-contain dark:brightness-150 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
