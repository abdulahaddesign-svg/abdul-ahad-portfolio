import React from 'react';
import { getProjects, getClientLogos, getSiteSettings, getCapabilityCategories } from '@/lib/data';
import { DEFAULT_HOMEPAGE_ORDER } from '@/lib/constants';
import { Preloader } from '@/components/layout/Preloader';
import { HeroSection } from '@/components/home/HeroSection';
import { ClientShowcaseSection } from '@/components/home/ClientShowcaseSection';
import { AboutIntroSection } from '@/components/home/AboutIntroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FeaturedMotionSection } from '@/components/home/FeaturedMotionSection';
import { CapabilitiesSection } from '@/components/home/CapabilitiesSection';
import { SelectedWorkSection } from '@/components/home/SelectedWorkSection';
import { CreativeProcessSection } from '@/components/home/CreativeProcessSection';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [projects, clients, settings, capabilityCategories] = await Promise.all([
    getProjects({ includeDrafts: false }),
    getClientLogos(false),
    getSiteSettings(),
    getCapabilityCategories(false),
  ]);

  const sectionOrder =
    Array.isArray(settings.homepageSectionOrder) && settings.homepageSectionOrder.length > 0
      ? settings.homepageSectionOrder
      : DEFAULT_HOMEPAGE_ORDER;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return <HeroSection key="hero" settings={settings} />;
      case 'clients':
        return <ClientShowcaseSection key="clients" clients={clients} />;
      case 'about':
        return <AboutIntroSection key="about" settings={settings} />;
      case 'tools':
        return (
          <ToolsSection
            key="tools"
            categories={capabilityCategories}
            headline={settings.toolsHeadline}
            subheadline={settings.toolsSubheadline}
          />
        );
      case 'motion':
        return <FeaturedMotionSection key="motion" projects={projects} />;
      case 'deliver':
        return <CapabilitiesSection key="deliver" />;
      case 'selected-works':
        return <SelectedWorkSection key="selected-works" projects={projects} />;
      case 'process':
        return <CreativeProcessSection key="process" />;
      case 'contact':
        return <ContactCtaSection key="contact" settings={settings} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full selection:bg-copper selection:text-ivory">
      {/* Brand Opening Experience */}
      <Preloader />

      {/* Dynamic Admin-Managed Homepage Flow */}
      {sectionOrder.map((secId) => renderSection(secId))}
    </div>
  );
}
