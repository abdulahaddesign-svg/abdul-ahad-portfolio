'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ServiceItem } from '@/lib/types';
import { SafeImage } from '@/components/ui/SafeImage';

interface Service3DCarouselProps {
  services: ServiceItem[];
  onSelectService?: (slug: string) => void;
}

export function Service3DCarousel({ services, onSelectService }: Service3DCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [radius, setRadius] = useState(280);

  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemCount = services.length;
  const angleStep = 360 / (itemCount || 1);

  // Responsive radius adjustment
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(180);
      } else if (window.innerWidth < 1024) {
        setRadius(230);
      } else {
        setRadius(280);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Continuous infinite ambient rotation (NO reset at 360, seamless perpetual loop)
  useEffect(() => {
    if (prefersReduced) return;

    const animate = () => {
      if (!isHovered && !isDragging && !isFocusing) {
        // Continuous increment without modulus avoids snapping back to 1st
        setRotation((prev) => prev + 0.16);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isDragging, isFocusing, prefersReduced]);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsFocusing(false);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current - deltaX * 0.45);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        if (e.currentTarget instanceof HTMLElement) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }
  };

  // Click on a panel to bring it directly to front in shortest rotational path
  const handleCardClick = (index: number, slug: string) => {
    setIsFocusing(true);
    const cardAngle = index * angleStep;
    const currentRotMod = ((rotation % 360) + 360) % 360;
    const desiredTargetMod = (360 - (cardAngle % 360)) % 360;
    let delta = desiredTargetMod - currentRotMod;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotation(rotation + delta);

    setTimeout(() => {
      setIsFocusing(false);
    }, 600);

    if (onSelectService) {
      onSelectService(slug);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      className="relative w-full flex flex-col items-center justify-center py-2 select-none"
    >
      {/* 3D Scene Viewport */}
      <div
        style={{ perspective: 1100 }}
        className="w-full h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center relative touch-none cursor-grab active:cursor-grabbing overflow-visible"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Revolving Cylinder Center */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isFocusing ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
          className="relative w-0 h-0 flex items-center justify-center"
        >
          {services.map((service, index) => {
            const cardAngle = index * angleStep;
            // Angle relative to front facing camera (0 degrees is front)
            const relativeAngle = ((cardAngle + rotation) % 360 + 360) % 360;
            // Normalize relative angle to -180 to +180
            const diffAngle = relativeAngle > 180 ? relativeAngle - 360 : relativeAngle;
            // Cosine gives depth (1 at front, -1 at back)
            const cosVal = Math.cos((diffAngle * Math.PI) / 180);
            const isFront = cosVal > 0.45;
            const opacity = Math.max(0.3, (cosVal + 1) / 2);
            const scale = 0.85 + 0.15 * Math.max(0, cosVal);

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(index, service.slug)}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${Math.max(0, (1 - cosVal) * 2.2)}px)`,
                  transition: 'opacity 0.25s ease, filter 0.25s ease',
                  backfaceVisibility: 'visible',
                }}
                className={`absolute w-[220px] sm:w-[260px] md:w-[280px] aspect-[10/13] -translate-x-1/2 -translate-y-1/2 bg-charcoal-900 border border-charcoal/30 overflow-hidden shadow-2xl rounded-none cursor-pointer group transition-shadow ${
                  isFront ? 'ring-1 ring-copper/60 z-20 shadow-copper/10' : 'z-10'
                }`}
              >
                {/* Visual Artwork Showcase */}
                <div className="relative w-full h-[68%] bg-charcoal-950 overflow-hidden">
                  <SafeImage
                    src={service.primaryImage || '/projects/freelance/branding-cover.svg'}
                    fallback="/projects/freelance/branding-cover.svg"
                    alt={service.title}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />

                  {/* Discipline Number Pill */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-charcoal/85 backdrop-blur-md border border-ivory/15 text-[10px] font-mono text-copper uppercase tracking-widest">
                    0{service.sortOrder || index + 1}
                  </div>
                </div>

                {/* Editorial Panel Footer */}
                <div className="h-[32%] p-3.5 bg-charcoal text-ivory flex flex-col justify-between border-t border-charcoal-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper block truncate">
                      {service.isPrimary ? 'Primary Scope' : 'Discipline'}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-ivory tracking-tight line-clamp-1 group-hover:text-copper transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-sans text-charcoal-400">
                    <span className="truncate">{service.deliverables?.[0] || 'Strategic Design'}</span>
                    <span className="text-copper font-mono uppercase">Focus ↗</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
