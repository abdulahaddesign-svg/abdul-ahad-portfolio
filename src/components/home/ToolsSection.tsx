'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Palette, Layers, Film, ExternalLink } from 'lucide-react';
import { CapabilityCategory, CapabilityTool, ToolItem } from '@/lib/types';
import { DEFAULT_CAPABILITY_CATEGORIES, DEFAULT_CAPABILITY_TOOLS } from '@/lib/constants';
import { TOOL_ICON_MAP, GenericCapabilityIcon } from '@/components/icons/ToolIcons';

interface ToolsSectionProps {
  categories?: CapabilityCategory[];
  headline?: string;
  subheadline?: string;
  sectionLabel?: string;
  className?: string;
  // Backward compatibility prop if passed by older callers
  tools?: ToolItem[];
}

// Brand-adapted icon for each spatial category
function getCategoryIcon(position: string) {
  switch (position) {
    case 'top':
      return Sparkles;
    case 'left':
      return Palette;
    case 'right':
      return Layers;
    case 'bottom':
      return Film;
    default:
      return Sparkles;
  }
}

export function ToolsSection({
  categories: propCategories,
  headline = 'Tools & Capabilities',
  subheadline = 'A creative toolkit I use to research, design, create and build meaningful digital experiences.',
  sectionLabel = 'TECHNICAL ARSENAL',
  className = '',
}: ToolsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTool, setActiveTool] = useState<CapabilityTool | null>(null);

  // Fallback to defaults if no categories passed or if empty
  const activeCategories: CapabilityCategory[] = (
    propCategories && propCategories.length > 0 ? propCategories : DEFAULT_CAPABILITY_CATEGORIES
  )
    .filter((c) => c.isVisible !== false)
    .map((c) => {
      if (c.tools && c.tools.length > 0) {
        return {
          ...c,
          tools: c.tools.filter((t) => t.isVisible !== false),
        };
      }
      const matchingTools = DEFAULT_CAPABILITY_TOOLS.filter(
        (t) => t.categoryId === c.id && t.isVisible !== false
      );
      return {
        ...c,
        tools: matchingTools,
      };
    });

  // Spatial arrangement lookup
  const topCategory = activeCategories.find((c) => c.position === 'top') || activeCategories[0];
  const leftCategory = activeCategories.find((c) => c.position === 'left') || activeCategories[1];
  const rightCategory = activeCategories.find((c) => c.position === 'right') || activeCategories[2];
  const bottomCategory = activeCategories.find((c) => c.position === 'bottom') || activeCategories[3];

  // Subtle ambient float variant for depth
  const getFloatingVariant = (offsetY: number, duration: number) => {
    if (shouldReduceMotion) return {};
    return {
      animate: {
        y: [0, offsetY, 0],
        transition: {
          duration,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut',
        },
      },
    };
  };

  const renderToolIcon = (tool: CapabilityTool) => {
    // 1. If an uploaded image/SVG URL exists, use image
    if (tool.iconUrl && tool.iconUrl.trim().length > 0) {
      return (
        <img
          src={tool.iconUrl}
          alt={tool.altText || tool.name}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-sm"
          loading="lazy"
        />
      );
    }

    // 2. Check icon map by tool slug or lowercase name
    const lookupSlug = (tool.slug || tool.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const MappedIcon = TOOL_ICON_MAP[lookupSlug] || TOOL_ICON_MAP[tool.slug] || TOOL_ICON_MAP[tool.name.toLowerCase()];

    if (MappedIcon) {
      return <MappedIcon size={28} />;
    }

    // 3. Fallback for non-software capabilities or unmapped items
    return <GenericCapabilityIcon label={tool.name} size={28} />;
  };

  const renderCategoryGroup = (
    category?: CapabilityCategory,
    isLabelAbove = true,
    isDesktopSpatial = false
  ) => {
    if (!category) return null;
    const CategoryIcon = getCategoryIcon(category.position);
    const tools = category.tools || [];
    const isLateral = category.position === 'left' || category.position === 'right';

    const labelBadge = (
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-charcoal/15 dark:border-ivory/20 bg-[#EAE4D9]/80 dark:bg-[#1C1B17]/90 text-charcoal dark:text-ivory text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_1px_3px_rgba(37,36,31,0.04)] select-none"
      >
        <CategoryIcon className="w-3.5 h-3.5 text-copper shrink-0" aria-hidden="true" />
        <span className="font-display uppercase tracking-wider text-[11px] sm:text-xs font-bold text-charcoal/90 dark:text-ivory/90">
          {category.name}
        </span>
      </div>
    );

    const iconGrid = (
      <div
        className={`flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 ${
          isDesktopSpatial && isLateral ? 'max-w-[280px] xl:max-w-[320px]' : 'max-w-[460px]'
        }`}
      >
        {tools.map((tool, idx) => {
          const isSelected = activeTool?.id === tool.id;

          return (
            <motion.div
              key={tool.id || idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : idx * 0.04 }}
              className="relative group"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTool(isSelected ? null : tool);
                  if (tool.websiteUrl && typeof window !== 'undefined') {
                    // Tap/click can also toggle tool details
                  }
                }}
                onMouseEnter={() => setActiveTool(tool)}
                onMouseLeave={() => setActiveTool(null)}
                aria-label={`${tool.name}: ${tool.description || 'Creative tool'}`}
                className={`relative w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full flex items-center justify-center bg-white dark:bg-[#2A2823] border border-charcoal/10 dark:border-ivory/15 shadow-[0_2px_8px_rgba(37,36,31,0.06)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-300 transform group-hover:scale-108 group-hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper ${
                  isSelected
                    ? 'scale-110 -translate-y-1 ring-2 ring-copper shadow-lg'
                    : 'group-hover:border-copper/60 dark:group-hover:border-copper/70'
                }`}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-300">
                  {renderToolIcon(tool)}
                </div>
              </button>

              {/* Tooltip on Hover / Focus (Desktop) */}
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] px-3 py-1.5 rounded-lg bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal text-[11px] font-sans font-medium text-center shadow-xl opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-30"
              >
                <div className="font-bold text-xs">{tool.name}</div>
                {tool.description && (
                  <div className="text-[10px] opacity-80 font-normal leading-tight mt-0.5">
                    {tool.description}
                  </div>
                )}
                {tool.proficiency && (
                  <div className="mt-1 text-[9px] font-mono uppercase font-bold text-copper tracking-wider">
                    {tool.proficiency}
                  </div>
                )}
                <div className="w-2 h-2 bg-charcoal dark:bg-ivory rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    );

    return (
      <div className={`flex flex-col items-center gap-3.5 ${isDesktopSpatial && isLateral ? 'w-full max-w-[320px]' : ''}`}>
        {isLabelAbove ? (
          <>
            {labelBadge}
            {iconGrid}
          </>
        ) : (
          <>
            {iconGrid}
            {labelBadge}
          </>
        )}
      </div>
    );
  };

  return (
    <section
      id="tools"
      aria-label="Creative Software & Capabilities Arsenal"
      className={`relative py-20 sm:py-28 md:py-32 bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory border-b border-charcoal/15 dark:border-ivory/15 overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* Subtle Depth Glow using Burnt Copper brand accent */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25 dark:opacity-15"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-copper/15 blur-[120px]" />
      </div>

      <div className="max-w-[1820px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP SPATIAL ARRANGEMENT: Balanced, Symmetrical Orbital Composition */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative min-h-[560px] xl:min-h-[590px] w-full max-w-[1360px] xl:max-w-[1420px] mx-auto">
          
          {/* 1. TOP GROUP — AI, Research & Productivity (Label ABOVE icons) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <motion.div {...getFloatingVariant(-5, 6)}>
              {renderCategoryGroup(topCategory, true, true)}
            </motion.div>
          </div>

          {/* 2. LEFT GROUP — Design & Visual Creation (Label ABOVE icons) */}
          <div className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 max-w-[280px] xl:max-w-[310px]">
            <motion.div {...getFloatingVariant(-4, 6.4)}>
              {renderCategoryGroup(leftCategory, true, true)}
            </motion.div>
          </div>

          {/* 3. CENTER HEADLINE & SUBTITLE with Balanced Four-Directional Whitespace */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-[480px] xl:max-w-[520px] mx-auto pointer-events-none z-10">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto px-2 py-2"
            >
              <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-[45px] tracking-tight text-charcoal dark:text-ivory mb-3 leading-[1.15]">
                {headline}
              </h2>
              <p className="font-sans text-xs sm:text-sm xl:text-[15px] text-charcoal-600 dark:text-ivory/70 leading-relaxed font-normal max-w-[360px] xl:max-w-[400px] mx-auto">
                {subheadline}
              </p>

              {/* Active Tool Live Indicator */}
              {activeTool && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1E1D19] border border-copper/30 shadow-sm text-xs font-sans text-charcoal dark:text-ivory"
                >
                  <span className="w-2 h-2 rounded-full bg-copper" />
                  <span className="font-bold">{activeTool.name}</span>
                  <span className="text-charcoal-400 dark:text-ivory/40">·</span>
                  <span className="text-charcoal-600 dark:text-ivory/80 font-medium">
                    {activeTool.description || 'Active Capability'}
                  </span>
                  {activeTool.websiteUrl && (
                    <a
                      href={activeTool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-copper hover:underline ml-1"
                      aria-label={`Visit official website for ${activeTool.name}`}
                    >
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* 4. RIGHT GROUP — UI/UX & Digital Product (Icons ABOVE label) */}
          <div className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 max-w-[280px] xl:max-w-[310px]">
            <motion.div {...getFloatingVariant(4, 5.8)}>
              {renderCategoryGroup(rightCategory, false, true)}
            </motion.div>
          </div>

          {/* 5. BOTTOM GROUP — Motion & Video Production (Icons ABOVE label) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
            <motion.div {...getFloatingVariant(5, 6.2)}>
              {renderCategoryGroup(bottomCategory, false, true)}
            </motion.div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE: Clean Stacked Responsive Flow */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center">
          
          {/* Main Title & Subtitle */}
          <div className="mb-12 max-w-lg mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-charcoal dark:text-ivory mb-3 leading-tight">
              {headline}
            </h2>
            <p className="font-sans text-sm sm:text-base text-charcoal-600 dark:text-ivory/70 leading-relaxed font-normal max-w-sm mx-auto">
              {subheadline}
            </p>
          </div>

          {/* Mobile Categories Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
            {activeCategories.map((category, idx) => (
              <motion.div
                key={category.id || idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                className="p-6 rounded-2xl bg-white/40 dark:bg-[#1E1D19]/40 border border-charcoal/10 dark:border-ivory/10 shadow-xs flex flex-col items-center justify-center min-h-[140px]"
              >
                {renderCategoryGroup(
                  category,
                  category.position === 'top' || category.position === 'left',
                  false
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Active Tool Info Indicator */}
          {activeTool && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1E1D19] border border-copper/30 shadow-sm text-xs font-sans text-charcoal dark:text-ivory"
            >
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span className="font-bold">{activeTool.name}</span>
              <span className="text-charcoal-400 dark:text-ivory/40">·</span>
              <span className="text-charcoal-600 dark:text-ivory/80 font-medium">
                {activeTool.description || 'Active Capability'}
              </span>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
