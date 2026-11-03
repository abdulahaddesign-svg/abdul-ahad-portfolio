import React from 'react';
import { getProjects } from '@/lib/data';
import { HeroSection } from '@/components/home/HeroSection';
import { SelectedWorkSection } from '@/components/home/SelectedWorkSection';
import { ServicesOverviewSection } from '@/components/home/ServicesOverviewSection';
import { AboutIntroSection } from '@/components/home/AboutIntroSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ReztroCaseStudySection } from '@/components/home/ReztroCaseStudySection';
import { CreativeProcessSection } from '@/components/home/CreativeProcessSection';
import { CtaSection } from '@/components/home/CtaSection';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const projects = await getProjects({ includeDrafts: false });

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Flagship Reztro Case Study Spotlight */}
      <ReztroCaseStudySection />

      {/* 3. Selected Work Projects Grid with Filtering */}
      <SelectedWorkSection initialProjects={projects} />

      {/* 4. Creative Services & Capabilities */}
      <ServicesOverviewSection />

      {/* 5. Professional Introduction & Philosophy */}
      <AboutIntroSection />

      {/* 6. Career Experience Timeline & Achievements */}
      <ExperienceSection />

      {/* 7. Structured 4-Step Creative Methodology */}
      <CreativeProcessSection />

      {/* 8. Client Inquiry Call to Action */}
      <CtaSection />
    </div>
  );
}
