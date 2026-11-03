'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

const CATEGORIES = [
  'All',
  'UI/UX',
  'Graphic Design',
  'Branding',
  'Motion Graphics',
  'Web & App',
];

interface SelectedWorkSectionProps {
  initialProjects: Project[];
}

export function SelectedWorkSection({ initialProjects }: SelectedWorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = initialProjects.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="py-24 bg-charcoal-950 text-ivory relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-charcoal-800">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
                Curated Portfolio
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory tracking-tight">
                Selected Work
              </h2>
            </div>
            <p className="text-sm text-charcoal-400 font-sans max-w-md">
              A curated selection of visual identities, campaign collaterals, digital interfaces, and motion reels engineered with strategic clarity.
            </p>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="pt-8 pb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-copper text-ivory'
                  : 'bg-charcoal-900 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center">
          <Button
            href="/work"
            variant="outline"
            size="lg"
            className="border-charcoal-700 text-ivory hover:border-ivory hover:bg-ivory/10"
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            View All Projects in Archive
          </Button>
        </div>
      </div>
    </section>
  );
}
