'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  height?: number;
  className?: string;
  showMonogramOnly?: boolean;
}

export function Logo({
  variant = 'light',
  height = 40,
  className = '',
  showMonogramOnly = false,
}: LogoProps) {
  const isDarkBg = variant === 'dark';

  if (showMonogramOnly) {
    const monoSrc = isDarkBg
      ? '/brand/logo-monogram-dark.png'
      : '/brand/logo-monogram-light.png';
    const monoWidth = Math.round(height * 1.358);

    return (
      <Link
        href="/"
        className={`group inline-flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-copper ${className}`}
        aria-label="Abdul Ahad — Creative Designer"
      >
        <Image
          src={monoSrc}
          alt="Abdul Ahad Monogram"
          width={monoWidth}
          height={height}
          priority
          className="h-auto w-auto max-h-[44px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    );
  }

  // Primary wordmark aspect ratio: 1024 / 225 ≈ 4.551
  const wordmarkSrc = isDarkBg
    ? '/brand/logo-wordmark-dark.png'
    : '/brand/logo-wordmark-light.png';
  const width = Math.round(height * 4.551);

  return (
    <Link
      href="/"
      className={`group inline-flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm ${className}`}
      aria-label="Abdul Ahad — Creative Designer & Digital Creative Partner"
    >
      <div className="relative transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src={wordmarkSrc}
          alt="Abdul Ahad — Creative Designer & Digital Creative Partner"
          width={width}
          height={height}
          priority
          className="h-7 sm:h-8 md:h-9 w-auto object-contain select-none"
        />
      </div>
    </Link>
  );
}
