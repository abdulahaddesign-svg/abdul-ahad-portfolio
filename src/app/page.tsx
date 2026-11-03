import React from 'react';
import { getProjects, getClientLogos, getSiteSettings } from '@/lib/data';
import { Preloader } from '@/components/layout/Preloader';
import { HeroSection } from '@/components/home/HeroSection';
import { ClientShowcaseSection } from '@/components/home/ClientShowcaseSection';
import { HorizontalPortfolioSection } from '@/components/home/HorizontalPortfolioSection';
import { CapabilitiesSection } from '@/components/home/CapabilitiesSection';
import { AboutIntroSection } from '@/components/home/AboutIntroSection';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

export const revalidate = 60;

export default async function HomePage() {
  // Dynamic projects, clients & settings loaded from data layer (Supabase / local store)
  const [projects, clients, settings] = await Promise.all([
    getProjects({ includeDrafts: false }),
    getClientLogos(false),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col w-full selection:bg-copper selection:text-ivory">
      {/* 1. Opening Brand Loading Experience */}
      <Preloader />

      {/* 2. Homepage Hero — Who I Am & Highlights Bar */}
      <HeroSection />

      {/* 3. Selected Client Brands Showcase (Larger Logos, Scroll-Linked) */}
      <ClientShowcaseSection clients={clients} />

      {/* 4. Selected Work — 2 Alternating Horizontal Motion Rows & Large Editorial Image Grid */}
      <HorizontalPortfolioSection projects={projects} />

      {/* 5. What I Deliver — Minimal Typography-Led Scope */}
      <CapabilitiesSection />

      {/* 6. About Direction — Asymmetrical Editorial Portrait, Narrative & Resume Download */}
      <AboutIntroSection settings={settings} />

      {/* 7. Contact Closing Statement */}
      <ContactCtaSection />
    </div>
  );
}
