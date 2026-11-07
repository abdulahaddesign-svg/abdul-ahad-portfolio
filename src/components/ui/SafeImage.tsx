'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined | null;
  fallback?: string;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  fallback = '/projects/freelance/branding-cover.svg',
  fallbackSrc,
  alt,
  ...props
}: SafeImageProps) {
  const actualFallback = fallbackSrc || fallback;
  const [currentSrc, setCurrentSrc] = useState<string>(src || actualFallback);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || actualFallback);
    setHasFailed(false);
  }, [src, actualFallback]);

  if (hasFailed) {
    return (
      <div className={`w-full h-full bg-charcoal-900 flex items-center justify-center p-4 ${props.className || ''}`}>
        <span className="text-xs font-mono uppercase tracking-widest text-charcoal-400 text-center select-none">
          {alt || 'Visual Project'}
        </span>
      </div>
    );
  }

  const isDirectLoad =
    typeof currentSrc === 'string' &&
    (currentSrc.startsWith('http') ||
      currentSrc.startsWith('data:') ||
      currentSrc.endsWith('.svg') ||
      currentSrc.includes('.svg?'));

  return (
    <Image
      {...props}
      alt={alt || 'Abdul Ahad Portfolio Media'}
      src={currentSrc}
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : isDirectLoad}
      onError={() => {
        if (currentSrc !== actualFallback) {
          setCurrentSrc(actualFallback);
        } else {
          setHasFailed(true);
        }
      }}
    />
  );
}
