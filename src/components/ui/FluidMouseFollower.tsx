'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function FluidMouseFollower() {
  const pathname = usePathname();
  const followerRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Never activate in admin dashboard
    if (pathname?.startsWith('/admin')) return;

    // 2. Only enable on desktop devices with fine pointer and hover support
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    const follower = followerRef.current;
    const secondary = secondaryRef.current;
    if (!follower) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let secX = -100;
    let secY = -100;

    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        secX = targetX;
        secY = targetY;
        follower.style.opacity = '1';
        if (secondary) secondary.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      follower.style.opacity = '0';
      if (secondary) secondary.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      follower.style.opacity = '1';
      if (secondary) secondary.style.opacity = '1';
    };

    // Physics animation loop using requestAnimationFrame
    const animate = () => {
      // Fluid interpolation (lerp)
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.16;
      currentY += dy * 0.16;

      // Calculate velocity and motion angle for organic squash and stretch
      const distance = Math.hypot(dx, dy);
      const speed = Math.min(distance * 0.045, 0.45); // Bounded stretch factor
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Dynamic stretch along direction of travel, squash perpendicularly
      const scaleX = 1 + speed * 0.65;
      const scaleY = 1 / (1 + speed * 0.45);

      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

      // Secondary trailing bead with slower inertia (organic gel droplet effect)
      if (secondary) {
        const secDx = targetX - secX;
        const secDy = targetY - secY;
        secX += secDx * 0.09;
        secY += secDy * 0.09;
        secondary.style.transform = `translate3d(${secX}px, ${secY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Primary Organic Gel Fluid Follower (~48px diameter) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-[48px] h-[48px] rounded-full opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform flex items-center justify-center"
      >
        {/* Soft diffused outer glow & subtle organic gel border */}
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-copper/25 via-copper/15 to-transparent dark:from-copper/35 dark:via-copper/20 dark:to-transparent border border-copper/30 dark:border-copper/40 backdrop-blur-[1px] shadow-[0_0_22px_rgba(196,133,90,0.25)] dark:shadow-[0_0_26px_rgba(196,133,90,0.32)]" />
      </div>

      {/* Secondary Soft Ambient Trailing Bead (~14px diameter) */}
      <div
        ref={secondaryRef}
        className="fixed top-0 left-0 w-[14px] h-[14px] rounded-full opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform bg-copper/40 dark:bg-copper/50 blur-[2px]"
      />
    </div>
  );
}
