'use client';

import React, { useEffect, useState } from 'react';
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
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shrink-0"
            >
              <svg
                viewBox="0 0 313.95 313.95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full select-none"
                aria-label="Abdul Ahad Aa Monogram Logo"
              >
                {/* Slanted Serif Letter 'A' in Ivory (#F4EFE6) */}
                <path
                  fill="#F4EFE6"
                  d="M178.5,200.11c-4.39-.18-7.79-1.26-10.2-3.21-2.68-2.17-4.02-4.98-4.02-8.43s1.28-6.13,3.83-8.04c1.3-.98,2.85-1.7,4.65-2.18l-4.75-18.06-1.77-6.75-7.16-27.26-4.39-16.69h-36.03l-28.83,109.66h21.31l5.96-24.13h39.16l5.6,22.7c2.04.63,4.17,1.1,6.39,1.43h15.28l-5-19.04ZM121.94,175.91l13.32-53.42h2.82l11.33,45.42,1.99,8h-29.45Z"
                />
                {/* Overlapping Letter 'a' in Burnt Copper (#C4855A) */}
                <path
                  fill="#C4855A"
                  d="M231.68,197.09c-3.57,0-5.36-1.92-5.36-5.75v-35.43c0-11.87-3.64-20.94-10.91-27.19-7.27-6.26-17.17-9.39-29.68-9.39-8.17,0-15.1,1.25-20.78,3.74-2.12.93-4.08,1.97-5.88,3.11-3.03,1.92-5.6,4.14-7.72,6.66-3.38,4.02-5.84,8.46-7.37,13.31l22.22,7.47c0-.06.02-.12.04-.17.9-4.26,2.8-7.75,5.7-10.46,2.93-2.75,7.41-4.12,13.4-4.12s10.6,1.44,13.4,4.31c2.81,2.87,4.22,6.54,4.22,11.01v5.36h-26.04c-3.12,0-6.09.21-8.91.64-3.64.55-7.02,1.46-10.15,2.71-3.23,1.3-6.05,2.97-8.46,5.01-1.73,1.45-3.25,3.1-4.56,4.95-.69.97-1.3,1.98-1.82,3.05-1.91,3.79-2.87,8.24-2.87,13.32,0,2.03.15,3.95.45,5.79.67,4.06,2.08,7.66,4.23,10.77,3.13,4.53,7.38,7.98,12.74,10.34,1.38.61,2.8,1.14,4.27,1.59,2.04.63,4.17,1.1,6.39,1.43,2.41.35,4.92.53,7.54.53,6.64,0,11.88-.96,15.71-2.87,3.83-1.91,6.64-4.12,8.43-6.61,1.79-2.49,2.93-4.5,3.45-6.03h3.64v.19c0,3.83,1.53,6.89,4.6,9.19,3.06,2.3,6.96,3.45,11.68,3.45h16.09v-19.92h-7.66ZM202.96,179.47c0,6.26-2.14,11.27-6.41,15.03-4.28,3.77-9.8,5.65-16.57,5.65-.5,0-1,0-1.48-.04-4.39-.18-7.79-1.26-10.2-3.21-2.68-2.17-4.02-4.98-4.02-8.43s1.28-6.13,3.83-8.04c1.3-.98,2.85-1.7,4.65-2.18,1.73-.47,3.69-.7,5.89-.7h24.32v1.91Z"
                />
                {/* Bounding Wireframe Box in Burnt Copper */}
                <rect
                  x="44.31"
                  y="44.31"
                  width="240.55"
                  height="240.55"
                  stroke="#C4855A"
                  strokeWidth="2.5"
                  strokeMiterlimit="10"
                  fill="none"
                />
                {/* Corner Anchor Handles */}
                <rect x="273.93" y="33.38" width="21.86" height="21.86" fill="#F4EFE6" stroke="#C4855A" strokeWidth="2" strokeMiterlimit="10" />
                <rect x="273.93" y="273.93" width="21.86" height="21.86" rx="10.93" ry="10.93" fill="#F4EFE6" stroke="#C4855A" strokeWidth="2" strokeMiterlimit="10" />
                <rect x="33.38" y="273.93" width="21.86" height="21.86" fill="#F4EFE6" stroke="#C4855A" strokeWidth="2" strokeMiterlimit="10" />
                <rect x="33.38" y="33.38" width="21.86" height="21.86" fill="#F4EFE6" stroke="#C4855A" strokeWidth="2" strokeMiterlimit="10" />
                {/* Diamond Sparkle Stars */}
                <path
                  fill="#C4855A"
                  d="M44.31,88.62h0c0-24.47-19.84-44.31-44.31-44.31h0c24.47,0,44.31-19.84,44.31-44.31h0c0,24.47,19.84,44.31,44.31,44.31h0c-24.47,0-44.31,19.84-44.31,44.31Z"
                />
                <path
                  fill="#C4855A"
                  d="M284.86,313.95h0c0-16.07-13.03-29.1-29.1-29.1h0c16.07,0,29.1-13.03,29.1-29.1h0c0,16.07,13.03,29.1,29.1,29.1h0c-16.07,0-29.1,13.03-29.1,29.1Z"
                />
              </svg>
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
