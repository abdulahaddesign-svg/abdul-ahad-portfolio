'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';

const CATEGORIES = [
  'All',
  'Branding',
  'Graphic Design',
  'Social Media',
  'UI/UX',
  'Motion Graphics',
  'Video Editing',
  'Web & App',
  'Packaging & Print',
];

interface WorkArchiveClientProps {
  initialProjects: Project[];
}

export function WorkArchiveClient({ initialProjects }: WorkArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = initialProjects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen text-ivory">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Header */}
        <Reveal>
          <div className="max-w-3xl pb-12 border-b border-charcoal-800">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Portfolio & Case Studies
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-ivory tracking-tight">
              Selected Work
            </h1>
            <p className="mt-4 text-base sm:text-lg text-charcoal-300 font-sans leading-relaxed">
              Commercial projects, brand identity overhauls, digital products, and motion explorations created with precision and intent.
            </p>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <div className="pt-8 pb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-copper text-ivory shadow-sm'
                  : 'bg-charcoal-900 text-charcoal-400 hover:text-ivory hover:bg-charcoal-800 border border-charcoal-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-charcoal-800 bg-charcoal-900 p-8">
            <p className="text-charcoal-400 font-sans">
              No projects found matching the "{selectedCategory}" category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-xs font-sans font-bold uppercase tracking-wider text-copper underline"
            >
              Reset to All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
