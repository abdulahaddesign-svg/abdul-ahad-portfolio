import React from 'react';
import { getProjects } from '@/lib/data';
import { Preloader } from '@/components/layout/Preloader';
import { HeroSection } from '@/components/home/HeroSection';
import { CapabilitiesTickerSection } from '@/components/home/CapabilitiesTickerSection';
import { HorizontalPortfolioSection } from '@/components/home/HorizontalPortfolioSection';
import { FeaturedEditorialStorySection } from '@/components/home/FeaturedEditorialStorySection';
import { AboutIntroSection } from '@/components/home/AboutIntroSection';
import { CreativeProcessSection } from '@/components/home/CreativeProcessSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

export const revalidate = 60;

export default async function HomePage() {
  // Dynamic projects loaded from data layer (Supabase / local store)
  const projects = await getProjects({ includeDrafts: false });

  return (
    <div className="flex flex-col w-full selection:bg-copper selection:text-ivory">
      {/* 1. Opening Brand Loading Experience */}
      <Preloader />

      {/* 2. Homepage Hero — Who I Am */}
      <HeroSection />

      {/* 3. Creative Capability Introduction (Editorial Title Sequence) */}
      <CapabilitiesTickerSection />

      {/* 4. Signature Portfolio Showcase — 4 Alternating Horizontal Motion Rows */}
      <HorizontalPortfolioSection projects={projects} />

      {/* 5. Featured Project Visual Storytelling */}
      <FeaturedEditorialStorySection projects={projects} />

      {/* 6. About Section — Professional Introduction & Timeline */}
      <AboutIntroSection />

      {/* 7. Creative Process (01 Understand, 02 Explore, 03 Create, 04 Deliver) */}
      <CreativeProcessSection />

      {/* 8. Typography-Led Services Section */}
      <ServicesSection />

      {/* 9. Contact Closing Statement */}
      <ContactCtaSection />
    </div>
  );
}
