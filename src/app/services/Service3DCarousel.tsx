'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, ExternalLink } from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface Service3DCarouselProps {
  services: ServiceItem[];
  onSelectService?: (slug: string) => void;
}

export function Service3DCarousel({ services, onSelectService }: Service3DCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        setRadius(190);
      } else if (window.innerWidth < 1024) {
        setRadius(240);
      } else {
        setRadius(290);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Ambient automatic slow rotation (paused on hover, drag, or prefers-reduced-motion)
  useEffect(() => {
    if (prefersReduced) return;

    const animate = () => {
      if (!isHovered && !isDragging) {
        setRotation((prev) => (prev + 0.18) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isDragging, prefersReduced]);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    // 0.45 multiplier gives natural, tactile drag resistance
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

  // Step controls
  const handlePrev = useCallback(() => {
    setRotation((prev) => prev - angleStep);
  }, [angleStep]);

  const handleNext = useCallback(() => {
    setRotation((prev) => prev + angleStep);
  }, [angleStep]);

  // Click on a panel to bring it directly to front
  const handleCardClick = (index: number, slug: string) => {
    const targetAngle = -index * angleStep;
    // Normalize to closest rotation
    const currentMod = rotation % 360;
    const diff = (targetAngle - currentMod + 540) % 360 - 180;
    setRotation(rotation + diff);

    if (onSelectService) {
      onSelectService(slug);
    }
  };

  // Compute active front index
  const normalizedRotation = (((-rotation % 360) + 360) % 360);
  const activeIndex = Math.round(normalizedRotation / angleStep) % itemCount;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      className="relative w-full flex flex-col items-center justify-center py-6 select-none"
    >
      {/* 3D Scene Viewport */}
      <div
        style={{ perspective: 1100 }}
        className="w-full h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center relative touch-none cursor-grab active:cursor-grabbing"
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
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
            const isFront = cosVal > 0.4;
            const opacity = Math.max(0.3, (cosVal + 1) / 2);
            const scale = 0.85 + 0.15 * Math.max(0, cosVal);

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(index, service.slug)}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${Math.max(0, (1 - cosVal) * 2.5)}px)`,
                  transition: isDragging ? 'none' : 'opacity 0.3s ease, filter 0.3s ease',
                  backfaceVisibility: 'visible',
                }}
                className={`absolute w-[220px] sm:w-[260px] md:w-[280px] aspect-[10/13] -translate-x-1/2 -translate-y-1/2 bg-charcoal-900 border border-charcoal/30 overflow-hidden shadow-2xl rounded-none cursor-pointer group transition-shadow ${
                  isFront ? 'ring-1 ring-copper/50 z-20' : 'z-10'
                }`}
              >
                {/* Visual Artwork Showcase */}
                <div className="relative w-full h-[68%] bg-charcoal-950 overflow-hidden">
                  <Image
                    src={service.primaryImage || '/projects/freelance/branding-cover.svg'}
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

      {/* Interactive Controls & Status Indicator */}
      <div className="flex items-center justify-between w-full max-w-[380px] px-4 pt-3 text-xs font-sans">
        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="p-2 border border-charcoal/20 bg-ivory text-charcoal hover:border-copper hover:text-copper hover:bg-copper/5 transition-all rounded-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="p-2 border border-charcoal/20 bg-ivory text-charcoal hover:border-copper hover:text-copper hover:bg-copper/5 transition-all rounded-none"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Service Name of Current Front Item */}
        <div className="text-center truncate px-2">
          <span className="font-mono text-[11px] text-copper font-bold uppercase tracking-wider block">
            0{services[activeIndex]?.sortOrder || activeIndex + 1} / 0{itemCount}
          </span>
          <span className="font-display font-bold text-xs text-charcoal truncate block max-w-[170px]">
            {services[activeIndex]?.title || 'Creative Service'}
          </span>
        </div>

        {/* Ambient Drag / Auto Indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-charcoal-400">
          <RotateCw className={`w-3 h-3 text-copper ${!isHovered && !isDragging ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          <span className="hidden sm:inline">{isHovered || isDragging ? 'Paused' : 'Auto 360°'}</span>
        </div>
      </div>
    </div>
  );
}
