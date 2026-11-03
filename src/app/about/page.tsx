import React from 'react';
import type { Metadata } from 'next';
import { 
  Award, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { 
  SITE_SETTINGS, 
  EXPERIENCE_DATA, 
  SKILLS_DATA, 
  AWARDS_DATA 
} from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'About Abdul Ahad J — Creative Designer & Visual Specialist',
  description:
    'Career background, creative philosophy, experience timeline, and technical skill sets of Abdul Ahad J, Graphic Designer based in Coimbatore, Tamil Nadu, India.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl pb-12 border-b border-charcoal/15">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Background & Philosophy
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-charcoal tracking-tight">
              About Abdul Ahad
            </h1>
            <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
              A multidisciplinary creative designer combining 3+ years of professional experience across visual branding, print packaging, digital marketing, and kinetic motion.
            </p>
          </div>
        </Reveal>

        {/* Introduction & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-charcoal/15 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-charcoal text-ivory border border-charcoal-800 space-y-4">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
                Creative Motto
              </span>
              <p className="font-display font-medium text-2xl text-ivory italic leading-snug">
                "{SITE_SETTINGS.tagline}"
              </p>
              <p className="text-xs text-charcoal-400 font-sans pt-2 border-t border-charcoal-800">
                Operating from Coimbatore, Tamil Nadu, India for global enterprise accounts, high-growth startups, and visionary founders.
              </p>
            </div>

            {/* Contact Quick Details */}
            <div className="p-6 bg-white border border-charcoal/15 space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2.5 text-charcoal">
                <MapPin className="w-4 h-4 text-copper shrink-0" />
                <span>{SITE_SETTINGS.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-charcoal">
                <Mail className="w-4 h-4 text-copper shrink-0" />
                <a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-copper">
                  {SITE_SETTINGS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-charcoal">
                <Phone className="w-4 h-4 text-copper shrink-0" />
                <a href="https://wa.me/919150037005" target="_blank" rel="noopener noreferrer" className="hover:text-copper">
                  {SITE_SETTINGS.phone} (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-sans text-charcoal-600 leading-relaxed">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
              Thoughtful Design Built with Purpose
            </h2>
            <p>
              {SITE_SETTINGS.aboutIntro}
            </p>
            <p>
              {SITE_SETTINGS.aboutPhilosophy}
            </p>
            <p className="text-sm sm:text-base text-charcoal-500">
              Having completed a Bachelor of Science in Computer Science with an 80% aggregate, I view design problems through both creative empathy and structural logic. Whether engineering a modular typography hierarchy for digital ads or creating a mobile restaurant ordering ecosystem, my work balances brand elevation with functional performance.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="md">
                Discuss a Project
              </Button>
              <Button
                href={SITE_SETTINGS.behanceUrl}
                isExternal
                variant="outline"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                View Behance Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <section className="py-16 border-b border-charcoal/15">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Career Trajectory
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Professional Work Experience
            </h2>
          </div>

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp) => (
              <div
                key={exp.id}
                className="p-8 bg-white border border-charcoal/15 space-y-6 hover:border-charcoal/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal/10">
                  <div>
                    <span className="text-xs font-sans uppercase tracking-widest text-copper font-bold block mb-1">
                      {exp.period}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-charcoal">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="text-right sm:self-center">
                    <span className="text-sm font-sans font-semibold text-earthBrown block">
                      {exp.role}
                    </span>
                    <span className="text-xs font-sans text-charcoal-400">
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-charcoal-600 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="p-4 bg-ivory-100 border border-copper/40 flex items-start gap-3 mt-4">
                    <Award className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-copper block">
                        Annual Recognition
                      </span>
                      <p className="text-sm font-sans text-charcoal-800 font-medium">
                        {exp.achievements[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education & Honors */}
        <section className="py-16 border-b border-charcoal/15 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Box */}
          <div className="p-8 bg-white border border-charcoal/15 space-y-4">
            <div className="inline-flex items-center gap-2 text-copper font-sans text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Degree</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-charcoal">
              {SITE_SETTINGS.educationDegree}
            </h3>
            <p className="text-sm font-sans text-charcoal-600 font-medium">
              {SITE_SETTINGS.educationInstitution}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-sans text-charcoal-500 border-t border-charcoal/10">
              <span>{SITE_SETTINGS.educationYear}</span>
              <span className="font-bold text-copper">{SITE_SETTINGS.educationAggregate}</span>
            </div>
          </div>

          {/* Awards Box */}
          <div className="p-8 bg-charcoal text-ivory border border-charcoal-800 space-y-4">
            <div className="inline-flex items-center gap-2 text-copper font-sans text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Design Excellence Honor</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ivory">
              {AWARDS_DATA[0].title} (2025)
            </h3>
            <p className="text-sm font-sans text-charcoal-300">
              Conferred by {AWARDS_DATA[0].issuer}
            </p>
            <p className="text-xs text-charcoal-400 font-sans leading-relaxed pt-2 border-t border-charcoal-800">
              {AWARDS_DATA[0].description}
            </p>
          </div>
        </section>

        {/* Comprehensive Skills & Software Toolkit */}
        <section className="py-16">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Capabilities
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">
              Skills & Software Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS_DATA.map((cat) => (
              <div key={cat.category} className="p-6 bg-white border border-charcoal/15 space-y-4">
                <h3 className="font-display font-bold text-lg text-charcoal pb-3 border-b border-charcoal/10">
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-sans text-charcoal-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
