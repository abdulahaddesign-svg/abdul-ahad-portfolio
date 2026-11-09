'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred or already seen in this session, skip immediately
    if (shouldReduceMotion) {
      setLoading(false);
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('aa_intro_viewed');
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    // Smooth, fast progress counter (0 -> 100 in ~1.3 seconds)
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('aa_intro_viewed', 'true');
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-charcoal text-ivory select-none overflow-hidden"
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-charcoal-400">
            <span>Abdul Ahad J</span>
            <span>Portfolio &copy; {new Date().getFullYear()}</span>
          </div>

          {/* Centerpiece: Animated Monogram & Brand reveal */}
          <div className="flex flex-col items-center justify-center my-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center shrink-0"
            >
              {/* Subtle ambient copper glow aura */}
              <div className="absolute -inset-4 bg-copper/20 rounded-full blur-2xl transform scale-125 pointer-events-none" />

              <Image
                src="/brand/logo-monogram-dark.png"
                alt="Abdul Ahad Aa Monogram"
                width={150}
                height={110}
                priority
                className="relative z-10 w-28 sm:w-36 h-auto object-contain select-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-1"
            >
              <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-ivory">
                ABDUL <span className="text-copper">AHAD</span>
              </h1>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-charcoal-400">
                Creative Designer & Digital Creative Partner
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-charcoal-400">
              <span>LOADING EXPERIENCE</span>
              <span className="text-copper">{progress}%</span>
            </div>
            <div className="w-full h-px bg-charcoal-800 relative overflow-hidden">
              <motion.div
                className="h-full bg-copper"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
