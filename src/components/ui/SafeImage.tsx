'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined | null;
  fallback?: string;
}

export function SafeImage({
  src,
  fallback = '/projects/freelance/branding-cover.svg',
  alt,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  const isDataOrSvg =
    typeof currentSrc === 'string' &&
    (currentSrc.startsWith('data:') ||
      currentSrc.endsWith('.svg') ||
      currentSrc.includes('.svg?'));

  return (
    <Image
      {...props}
      alt={alt || 'Abdul Ahad Portfolio Media'}
      src={currentSrc}
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : isDataOrSvg}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
