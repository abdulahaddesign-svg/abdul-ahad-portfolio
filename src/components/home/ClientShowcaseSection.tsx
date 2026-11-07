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

  // Ensure each row has at least 8 items for continuous scroll coverage
  const padRow = (items: ClientLogo[]) => {
    const source = items.length > 0 ? items : basePool;
    const result: ClientLogo[] = [];
    while (result.length < 8) {
      result.push(...source);
    }
    return result.slice(0, 10);
  };

  const row1Items = padRow(row1Pool);
  const row2Items = padRow(row2Pool.length > 0 ? row2Pool : row1Pool.slice().reverse());
  const row3Items = padRow(row3Pool.length > 0 ? row3Pool : row1Pool);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Limit travel to 8%-12% so edge logos are never clipped
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-8%', '6%']);
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['6%', '-8%']);
  const xRow3 = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section
      id="clients"
      ref={containerRef}
      aria-label="Clients & Brand Collaborations"
      className="py-6 sm:py-10 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory overflow-hidden select-none transition-colors duration-300"
    >
      {shouldReduceMotion ? (
        /* Reduced Motion Fallback: Clean, borderless wrapped grid */
        <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 items-center">
            {basePool.map((client, idx) => (
              <div
                key={`static-${client.id}-${idx}`}
                className="flex items-center justify-center p-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="relative h-7 sm:h-9 w-28 sm:w-36 flex items-center justify-center">
                  <SafeImage
                    src={client.logoUrl}
                    alt={client.name}
                    width={180}
                    height={50}
                    fallback="/clients/client-reztro.svg"
                    className="max-h-7 sm:max-h-9 w-auto object-contain dark:brightness-150"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3 Seamless Scroll-Linked Rows: No boxes, no outlines, reduced spacing */
        <div className="space-y-3 sm:space-y-4 overflow-hidden">
          {/* Row 1 */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow1 }}
              className="flex items-center gap-10 sm:gap-14 md:gap-20 w-max will-change-transform pl-4"
            >
              {row1Items.map((client, idx) => (
                <div
                  key={`r1-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  title={client.name}
                >
                  <div className="relative h-6 sm:h-8 md:h-9 w-24 sm:w-32 md:w-40 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-reztro.svg"
                      className="max-h-6 sm:max-h-8 md:max-h-9 w-auto object-contain dark:brightness-150"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow2 }}
              className="flex items-center gap-10 sm:gap-14 md:gap-20 w-max will-change-transform pl-12"
            >
              {row2Items.map((client, idx) => (
                <div
                  key={`r2-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  title={client.name}
                >
                  <div className="relative h-6 sm:h-8 md:h-9 w-24 sm:w-32 md:w-40 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-falcon.svg"
                      className="max-h-6 sm:max-h-8 md:max-h-9 w-auto object-contain dark:brightness-150"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xRow3 }}
              className="flex items-center gap-10 sm:gap-14 md:gap-20 w-max will-change-transform pl-6"
            >
              {row3Items.map((client, idx) => (
                <div
                  key={`r3-${client.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  title={client.name}
                >
                  <div className="relative h-6 sm:h-8 md:h-9 w-24 sm:w-32 md:w-40 flex items-center justify-center">
                    <SafeImage
                      src={client.logoUrl}
                      alt={client.name}
                      width={180}
                      height={50}
                      fallback="/clients/client-apex.svg"
                      className="max-h-6 sm:max-h-8 md:max-h-9 w-auto object-contain dark:brightness-150"
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
