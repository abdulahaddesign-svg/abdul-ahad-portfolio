'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface MonogramProps {
  size?: number;
  variant?: 'light' | 'dark';
  animated?: boolean;
  className?: string;
}

export function Monogram({
  size = 40,
  variant = 'light',
  animated = false,
  className = '',
}: MonogramProps) {
  const isDark = variant === 'dark';
  const shouldReduce = useReducedMotion();
  const imageSrc = isDark
    ? '/brand/logo-monogram-dark.png'
    : '/brand/logo-monogram-light.png';

  // Aspect ratio is 1024 / 754 ≈ 1.358
  const width = Math.round(size * 1.358);
  const height = size;

  if (animated && !shouldReduce) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width, height }}
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        role="img"
        aria-label="Abdul Ahad AA Monogram"
      >
        <Image
          src={imageSrc}
          alt="Abdul Ahad AA Monogram"
          width={width}
          height={height}
          priority
          className="object-contain w-auto h-full select-none"
        />
      </motion.div>
    );
  }

  return (
    <div
      style={{ width, height }}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      role="img"
      aria-label="Abdul Ahad AA Monogram"
    >
      <Image
        src={imageSrc}
        alt="Abdul Ahad AA Monogram"
        width={width}
        height={height}
        priority
        className="object-contain w-auto h-full select-none"
      />
    </div>
  );
}
