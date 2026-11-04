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

  useEffect(() => {
    setCurrentSrc(src || actualFallback);
  }, [src, actualFallback]);

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
        }
      }}
    />
  );
}
