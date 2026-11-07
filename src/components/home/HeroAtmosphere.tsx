'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroAtmosphereProps {
  isInView?: boolean;
}

export function HeroAtmosphere({ isInView = true }: HeroAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse micro-interaction state for smooth lerped cursor parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize -1 to 1 based on center of hero
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseTargetRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
      };
    };

    const handleMouseLeave = () => {
      mouseTargetRef.current = { x: 0, y: 0 };
    };

    const animatePhysics = () => {
      // Lerp mouse coordinates with smooth damping
      const cur = mouseCurrentRef.current;
      const target = mouseTargetRef.current;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      setMousePos({ x: cur.x, y: cur.y });
      animFrameRef.current = requestAnimationFrame(animatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    animFrameRef.current = requestAnimationFrame(animatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion]);

  const activeAnimations = isInView && !shouldReduceMotion;

  // Floating studio micro-markers (crosshairs '+' and diamond nodes)
  const studioMarkers = [
    { id: 1, top: '18%', left: '12%', label: '01 / ID', delay: 0, depth: 25 },
    { id: 2, top: '22%', right: '14%', label: 'SYSTEMS', delay: 1.2, depth: -30 },
    { id: 3, top: '74%', left: '15%', label: '2026', delay: 2.1, depth: 35 },
    { id: 4, top: '68%', right: '16%', label: 'MOTION', delay: 0.8, depth: -25 },
    { id: 5, top: '48%', left: '6%', isDot: true, delay: 1.6, depth: 20 },
    { id: 6, top: '42%', right: '7%', isDot: true, delay: 2.4, depth: -20 },
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. SILK AMBIENT BASE: Multi-stop non-banding radial gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,rgba(196,133,90,0.14)_0%,rgba(196,133,90,0.08)_35%,rgba(244,239,230,0)_70%)] dark:bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,rgba(196,133,90,0.22)_0%,rgba(196,133,90,0.11)_35%,rgba(22,21,19,0)_70%)]"
      />

      {/* 2. DYNAMIC MOUSE-INTERACTIVE LUMINOUS FIELD (Micro-Interaction) */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 65}px, ${mousePos.y * 55}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] sm:w-[850px] sm:h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,147,102,0.22)_0%,rgba(196,133,90,0.12)_40%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(212,147,102,0.28)_0%,rgba(196,133,90,0.15)_45%,transparent_70%)] blur-[70px] sm:blur-[95px] will-change-transform"
      />

      {/* 3. NOTICEABLE FLUID ORGANIC AURA 1 (Primary Burnt Copper Bloom) */}
      <motion.div
        animate={
          activeAnimations
            ? {
                x: [0, 60, -45, 0],
                y: [0, -50, 40, 0],
                scale: [1, 1.18, 0.92, 1],
                rotate: [0, 45, -30, 0],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -35}px, 0)`,
        }}
        className="absolute -top-12 sm:-top-24 left-1/3 -translate-x-1/2 w-[340px] h-[340px] sm:w-[620px] sm:h-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(196,133,90,0.32)_0%,rgba(212,147,102,0.18)_45%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(196,133,90,0.36)_0%,rgba(212,147,102,0.20)_50%,transparent_75%)] blur-[60px] sm:blur-[90px] will-change-transform opacity-90"
      />

      {/* 4. NOTICEABLE FLUID ORGANIC AURA 2 (Secondary Warm Amber / Golden Sand) */}
      <motion.div
        animate={
          activeAnimations
            ? {
                x: [0, -55, 50, 0],
                y: [0, 45, -45, 0],
                scale: [1, 0.88, 1.15, 1],
                rotate: [0, -60, 40, 0],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate3d(${mousePos.x * 45}px, ${mousePos.y * 40}px, 0)`,
        }}
        className="absolute -bottom-16 sm:-bottom-28 right-1/4 translate-x-1/3 w-[320px] h-[320px] sm:w-[580px] sm:h-[580px] rounded-full bg-[radial-gradient(circle_at_center,rgba(164,106,66,0.25)_0%,rgba(196,133,90,0.14)_45%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(196,133,90,0.30)_0%,rgba(124,92,62,0.18)_50%,transparent_75%)] blur-[55px] sm:blur-[85px] will-change-transform opacity-85"
      />

      {/* 5. GENTLE AMBIENT RIPPLE AURA (Noticeable kinetic motion rings expanding softly) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[620px] sm:h-[620px] flex items-center justify-center">
        {/* Inner Ring */}
        <motion.div
          animate={
            activeAnimations
              ? {
                  scale: [0.92, 1.12, 0.92],
                  opacity: [0.12, 0.28, 0.12],
                }
              : {}
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-full h-full rounded-full border border-copper/35 dark:border-copper/40"
        />

        {/* Outer Ring */}
        <motion.div
          animate={
            activeAnimations
              ? {
                  scale: [1.05, 1.28, 1.05],
                  opacity: [0.08, 0.18, 0.08],
                  rotate: [0, 90, 180],
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 rounded-full border border-dashed border-copper/25 dark:border-copper/30"
        />
      </div>

      {/* 6. FLOATING STUDIO MICRO-MARKERS (Delicate geometric markers with mouse parallax) */}
      {studioMarkers.map((marker) => {
        const pX = mousePos.x * marker.depth;
        const pY = mousePos.y * marker.depth;

        return (
          <motion.div
            key={marker.id}
            initial={{ opacity: 0 }}
            animate={
              activeAnimations
                ? {
                    opacity: [0.4, 0.8, 0.4],
                    y: [0, -8, 0],
                  }
                : { opacity: 0.5 }
            }
            transition={{
              duration: 5 + marker.id,
              delay: marker.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              top: marker.top,
              left: marker.left,
              right: marker.right,
              transform: `translate3d(${pX}px, ${pY}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="hidden sm:flex items-center gap-1.5 absolute z-0 text-charcoal/30 dark:text-ivory/30 font-mono text-[10px] tracking-widest uppercase pointer-events-none"
          >
            {marker.isDot ? (
              <span className="w-1.5 h-1.5 rounded-full bg-copper/60 shadow-[0_0_8px_rgba(196,133,90,0.6)]" />
            ) : (
              <>
                <span className="text-copper font-mono text-xs font-bold leading-none select-none">+</span>
                <span className="text-[9px] tracking-[0.22em] font-sans opacity-75">{marker.label}</span>
              </>
            )}
          </motion.div>
        );
      })}

      {/* 7. SILKY EDGE VIGNETTE (Keeps focus crisp on central typography) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(232,223,208,0.45)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(22,21,19,0.7)_100%)]" />
    </div>
  );
}
