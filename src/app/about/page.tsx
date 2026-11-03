import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, GraduationCap, MapPin, Mail, Phone, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SITE_SETTINGS, EXPERIENCE_DATA, SKILLS_DATA, AWARDS_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Abdul Ahad J — Creative Designer & Visual Specialist',
  description:
    'Career background, creative philosophy, experience timeline, and technical skill sets of Abdul Ahad J, Graphic Designer based in Coimbatore, Tamil Nadu, India.',
};

export default function AboutPage() {
  return (
    <div className="pt-36 sm:pt-44 pb-32 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Main Header */}
        <div className="pb-16 border-b border-charcoal/15">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-4">
            Biography &amp; Philosophy
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-charcoal leading-none">
            About Abdul Ahad
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-charcoal-600 font-sans max-w-4xl font-light leading-relaxed">
            Graphic Designer, Visual Branding Specialist &amp; Digital Creative Partner combining 3+ years of professional experience across visual branding, print packaging, digital marketing, and kinetic motion.
          </p>
        </div>

        {/* Philosophy & Credentials Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-20 border-b border-charcoal/15">
          <div className="lg:col-span-7 space-y-8 text-lg sm:text-xl font-sans text-charcoal-700 font-light leading-relaxed">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight">
              I believe design is not decorative styling; it is clear thinking made visible.
            </h2>
            <p>
              {SITE_SETTINGS.aboutIntro}
            </p>
            <p>
              Holding a Bachelor of Science in Computer Science with an 80% aggregate, I view design challenges through both creative empathy and structural logic. Whether engineering a modular typography hierarchy for digital ads or creating a mobile restaurant ordering ecosystem, my work balances brand elevation with functional performance.
            </p>

            <div className="pt-6 flex flex-wrap gap-6 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.18em] hover:bg-copper transition-colors"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE_SETTINGS.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-copper hover:text-charcoal transition-colors"
              >
                <span>View Behance Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10 border-l border-charcoal/15 pl-6 sm:pl-10 text-xs font-sans">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Coordinates &amp; Channels
              </span>
              <div className="space-y-2 text-charcoal-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-copper" />
                  <span>{SITE_SETTINGS.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-copper" />
                  <a href={`mailto:${SITE_SETTINGS.email}`} className="text-charcoal font-bold hover:text-copper underline">
                    {SITE_SETTINGS.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-copper" />
                  <a href="https://wa.me/919150037005" target="_blank" rel="noopener noreferrer" className="text-copper font-bold hover:underline">
                    {SITE_SETTINGS.phone} (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Honors &amp; Recognition
              </span>
              <h3 className="font-display font-bold text-xl text-charcoal">
                Best Employee of the Year 2025
              </h3>
              <p className="text-charcoal-500 mt-1 leading-relaxed">
                Awarded at eClerx for design excellence and driving a verified 25% lift in client campaign engagement.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Education
              </span>
              <h4 className="font-display font-bold text-base text-charcoal">
                {SITE_SETTINGS.educationDegree}
              </h4>
              <p className="text-charcoal-500 mt-0.5">
                {SITE_SETTINGS.educationInstitution} ({SITE_SETTINGS.educationYear}) ·{' '}
                <strong className="text-copper">{SITE_SETTINGS.educationAggregate}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <section className="py-20 border-b border-charcoal/15">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
              Trajectory
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
              Professional Work Experience
            </h2>
          </div>

          <div className="divide-y divide-charcoal/15">
            {EXPERIENCE_DATA.map((exp) => (
              <div
                key={exp.id}
                className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-3 space-y-1">
                  <span className="font-mono text-xs text-copper tracking-widest">
                    {exp.period}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-charcoal">
                    {exp.company}
                  </h3>
                  <span className="text-xs font-sans text-charcoal-400 block">
                    {exp.location}
                  </span>
                </div>

                <div className="md:col-span-3">
                  <span className="text-xs font-sans uppercase tracking-widest text-charcoal-400 block mb-1">
                    Designation
                  </span>
                  <div className="font-display font-bold text-lg text-charcoal">
                    {exp.role}
                  </div>
                </div>

                <div className="md:col-span-6 space-y-4">
                  <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-charcoal-600 leading-relaxed font-light">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="p-4 bg-charcoal text-ivory text-xs font-sans flex items-start gap-3 mt-4">
                      <Award className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                      <span>{exp.achievements[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Software Toolkit */}
        <section className="pt-20">
          <div className="mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
              Capabilities
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
              Skills &amp; Software Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 divide-y sm:divide-y-0 sm:divide-x divide-charcoal/15">
            {SKILLS_DATA.map((cat, idx) => (
              <div key={cat.category} className={`space-y-4 ${idx > 0 ? 'sm:pl-8' : ''}`}>
                <h3 className="font-display font-bold text-lg text-charcoal pb-2 border-b border-charcoal/10">
                  {cat.category}
                </h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="text-xs font-sans text-charcoal-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
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
