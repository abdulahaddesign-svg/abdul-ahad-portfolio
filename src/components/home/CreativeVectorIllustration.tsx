'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CreativeVectorIllustrationProps {
  className?: string;
}

export function CreativeVectorIllustration({ className = '' }: CreativeVectorIllustrationProps) {
  return (
    <div className={`relative w-full aspect-[600/500] max-w-[620px] mx-auto select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Copper Gradient for Wedge */}
          <linearGradient id="copperWedge" x1="270" y1="210" x2="350" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4855A" />
            <stop offset="100%" stopColor="#9E6138" />
          </linearGradient>

          {/* Luxury Copper Gradient for Pen Nib */}
          <linearGradient id="nibMetallic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2A77E" />
            <stop offset="35%" stopColor="#C4855A" />
            <stop offset="70%" stopColor="#8A4E29" />
            <stop offset="100%" stopColor="#C4855A" />
          </linearGradient>

          {/* Pen Barrel Shading */}
          <linearGradient id="penBarrel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A3833" />
            <stop offset="40%" stopColor="#1E1D19" />
            <stop offset="80%" stopColor="#12110E" />
            <stop offset="100%" stopColor="#2A2824" />
          </linearGradient>

          {/* Soft Glow */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* =========================================================================
            1. SACRED GEOMETRY & COMPASS CONSTRUCTION RINGS
            ========================================================================= */}
        {/* Large Golden Circle */}
        <motion.circle
          cx="270"
          cy="260"
          r="165"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.16"
          fill="none"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Medium Concentric Circle */}
        <motion.circle
          cx="270"
          cy="260"
          r="115"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeOpacity="0.12"
          strokeDasharray="3 3"
          fill="none"
          initial={{ rotate: -30, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Fine Construction Lines */}
        <line
          x1="325"
          y1="80"
          x2="325"
          y2="460"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.12"
        />
        <line
          x1="120"
          y1="260"
          x2="520"
          y2="260"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.12"
        />
        <line
          x1="450"
          y1="90"
          x2="450"
          y2="460"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.12"
        />

        {/* =========================================================================
            2. SOLID BURNT COPPER QUADRANT / GEOMETRIC SECTOR
            ========================================================================= */}
        <motion.path
          d="M 290 215 L 290 295 L 370 295 A 80 80 0 0 0 290 215 Z"
          fill="url(#copperWedge)"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* =========================================================================
            3. ELEGANT 4-POINT STAR SPARKLES
            ========================================================================= */}
        {/* Top-Left Diamond Sparkle */}
        <motion.g
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M 235 170 Q 235 155 235 145 Q 235 155 245 170 Q 235 170 235 185 Q 235 170 225 170 Q 235 170 235 155"
            fill="#C4855A"
          />
          <path
            d="M 235 140 Q 235 170 205 170 Q 235 170 235 200 Q 235 170 265 170 Q 235 170 235 140 Z"
            fill="#C4855A"
            opacity="0.9"
          />
        </motion.g>

        {/* Bottom-Right Small Diamond Sparkle */}
        <motion.g
          initial={{ scale: 0, rotate: 45, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M 465 410 Q 465 425 450 425 Q 465 425 465 440 Q 465 425 480 425 Q 465 425 465 410 Z"
            fill="#C4855A"
            opacity="0.8"
          />
        </motion.g>

        {/* =========================================================================
            4. VECTOR TYPOGRAPHY BOUNDING BOX WITH CORNER CONTROL HANDLES
            ========================================================================= */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Bounding Box Frame */}
          <rect
            x="440"
            y="310"
            width="80"
            height="80"
            fill="none"
            stroke="#C4855A"
            strokeWidth="0.85"
            strokeOpacity="0.45"
          />

          {/* 4 Vector Corner Anchor Handles */}
          <rect x="437.5" y="307.5" width="5" height="5" fill="#F4EFE6" stroke="#C4855A" strokeWidth="1" />
          <rect x="517.5" y="307.5" width="5" height="5" fill="#F4EFE6" stroke="#C4855A" strokeWidth="1" />
          <rect x="437.5" y="387.5" width="5" height="5" fill="#F4EFE6" stroke="#C4855A" strokeWidth="1" />
          <rect x="517.5" y="387.5" width="5" height="5" fill="#F4EFE6" stroke="#C4855A" strokeWidth="1" />

          {/* Typographic "Aa" Serif Glyph */}
          <text
            x="480"
            y="363"
            textAnchor="middle"
            fontFamily="Georgia, 'Playfair Display', serif"
            fontSize="40"
            fontWeight="500"
            fill="currentColor"
            fillOpacity="0.7"
            className="tracking-tight"
          >
            Aa
          </text>
        </motion.g>

        {/* =========================================================================
            5. FLUID INK STROKE DRAWN BY THE FOUNTAIN PEN NIB
            ========================================================================= */}
        <motion.path
          d="M 488 262 C 484 275 460 290 415 315 C 330 360 215 425 155 425 C 105 425 80 395 105 365 C 135 330 240 280 380 235 C 475 205 520 220 488 262 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* =========================================================================
            6. SCULPTED LUXURY FOUNTAIN PEN NIB (Pointing at Calligraphic Path)
            ========================================================================= */}
        <motion.g
          initial={{ x: 30, y: -30, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          transform="translate(0, 0)"
        >
          {/* Transform group rotated ~-45 deg pointing down-left at (488, 262) */}
          <g transform="translate(488, 262) rotate(-135)">
            {/* Nib Tip Contact Highlight */}
            <circle cx="0" cy="0" r="1.5" fill="#C4855A" />

            {/* Fountain Pen Metallic Nib */}
            <path
              d="M 0 0 L 14 36 L 20 65 L -20 65 L -14 36 Z"
              fill="url(#nibMetallic)"
              stroke="#25241F"
              strokeWidth="0.75"
            />

            {/* Inner Nib Detailing & Engraving */}
            <path
              d="M 0 0 L 0 38"
              stroke="#25241F"
              strokeWidth="0.8"
            />
            {/* Breather Hole */}
            <circle cx="0" cy="38" r="3" fill="#25241F" />

            {/* Ornamental Curved Nib Inscription */}
            <path
              d="M -9 42 Q 0 46 9 42"
              stroke="#25241F"
              strokeWidth="0.75"
              fill="none"
              opacity="0.6"
            />

            {/* Polished Copper Collar / Ferrule Ring */}
            <rect
              x="-21"
              y="65"
              width="42"
              height="8"
              fill="#C4855A"
              stroke="#25241F"
              strokeWidth="0.75"
            />
            <line x1="-21" y1="69" x2="21" y2="69" stroke="#E2A77E" strokeWidth="0.75" opacity="0.8" />

            {/* Black Lacquer Pen Barrel Body */}
            <path
              d="M -20 73 L -24 200 L 24 200 L 20 73 Z"
              fill="url(#penBarrel)"
              stroke="#25241F"
              strokeWidth="1"
            />

            {/* Pen Barrel Specular Light Sheen */}
            <line
              x1="-8"
              y1="75"
              x2="-10"
              y2="195"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.18"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
