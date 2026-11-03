import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Award, GraduationCap, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { getSiteSettings, getExperience } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `About ${settings.name} — Creative Designer & Visual Specialist`,
    description: `Professional background, verified experience, honors, and resume of ${settings.name}, Creative Designer in Coimbatore, Tamil Nadu, India.`,
  };
}

export default async function AboutPage() {
  const [settings, experienceList] = await Promise.all([
    getSiteSettings(),
    getExperience(),
  ]);

  const headline = settings.aboutHeadline || 'I create visual experiences that make ideas matter.';
  const intro =
    settings.aboutIntro ||
    'Abdul Ahad J is a creative designer based in Coimbatore, India, with 3+ years of experience in graphic design, visual branding and digital creative production.';
  const description =
    settings.aboutDescription ||
    'He has worked across enterprise, SaaS and freelance projects, creating visual identities, marketing creatives, digital experiences and motion-led content. He has served 50+ freelance clients and received the Best Employee of the Year award at eClerx in 2025. He works independently and collaborates with teams when projects require broader creative capabilities.';
  const photoUrl = settings.profilePhotoUrl || '/profile/abdul-ahad.jpg';
  const photoAlt = settings.profilePhotoAlt || 'Abdul Ahad J — Creative Designer';
  const resumeUrl = settings.resumeUrl || '/resume/abdul-ahad-resume.pdf';
  const resumeLabel = settings.resumeLabel || 'PDF · Updated Resume';
  const resumeVisible = settings.resumeVisible !== false;

  return (
    <div className="pt-32 sm:pt-40 pb-32 bg-ivory text-charcoal min-h-screen select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Section Top Label */}
        <div className="flex items-center justify-between pb-6 border-b border-charcoal/10 text-xs font-sans uppercase tracking-[0.2em] text-charcoal-500 mb-12 sm:mb-16">
          <span className="text-copper font-bold">BIOGRAPHY &amp; CAPABILITIES</span>
          <span className="font-mono">COIMBATORE, INDIA · 11.0168° N, 76.9558° E</span>
        </div>

        {/* Large Typography Headline */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tighter text-charcoal leading-[0.98]">
            {headline}
          </h1>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-20 border-b border-charcoal/15">
          {/* Left Column: Portrait & Quick Metadata (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full aspect-[4/5] bg-charcoal-900 border border-charcoal/20 overflow-hidden">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 bg-charcoal/85 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-mono text-ivory tracking-widest uppercase">
                Abdul Ahad J · 2026
              </div>
            </div>

            {/* Resume Download CTA (Directly under Portrait) */}
            {resumeVisible && (
              <div className="pt-2 pb-4 border-b border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <a
                    href={resumeUrl}
                    download="Abdul-Ahad-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Download Resume</span>
                  </a>
                </div>
                <span className="text-xs font-mono text-charcoal-500">
                  {resumeLabel}
                </span>
              </div>
            )}

            {/* Fast Contact Coordinates */}
            <div className="space-y-3 pt-2 text-xs font-sans text-charcoal-600">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-copper shrink-0" />
                <span>{settings.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-copper shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-charcoal font-semibold hover:text-copper underline"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-copper shrink-0" />
                <a
                  href="https://wa.me/919150037005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper font-semibold hover:underline"
                >
                  {settings.phone} (Direct / WhatsApp)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Career Stats & Philosophy (7 Columns) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block">
                Professional Profile
              </span>
              <p className="text-xl sm:text-2xl md:text-[26px] font-sans text-charcoal font-light leading-relaxed">
                {intro}
              </p>
              <p className="text-base sm:text-lg font-sans text-charcoal-600 font-light leading-relaxed">
                {description}
              </p>
              <p className="text-base sm:text-lg font-sans text-charcoal-600 font-light leading-relaxed">
                {settings.aboutPhilosophy}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-charcoal/15">
              <div>
                <span className="font-display font-black text-3xl sm:text-4xl text-charcoal block">
                  3+ Years
                </span>
                <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 mt-1 block">
                  Design Experience
                </span>
              </div>
              <div>
                <span className="font-display font-black text-3xl sm:text-4xl text-copper block">
                  50+ Brands
                </span>
                <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 mt-1 block">
                  Worldwide Clients
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-display font-black text-3xl sm:text-4xl text-charcoal block">
                  80%
                </span>
                <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 mt-1 block">
                  BSc Computer Science
                </span>
              </div>
            </div>

            {/* Education & Academic Rigor */}
            <div className="space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block">
                Academic Background
              </span>
              <div className="flex items-start gap-4">
                <GraduationCap className="w-5 h-5 text-copper mt-1 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    {settings.educationDegree}
                  </h3>
                  <p className="text-sm font-sans text-charcoal-600">
                    {settings.educationInstitution} · {settings.educationYear} ({settings.educationAggregate})
                  </p>
                </div>
              </div>
            </div>

            {/* Honor & Recognition */}
            <div className="space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block">
                Annual Company Honor
              </span>
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-copper mt-1 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Best Employee of the Year 2025 — eClerx
                  </h3>
                  <p className="text-sm font-sans text-charcoal-600 leading-relaxed">
                    Recognized for design leadership, visual consistency, and delivering a verified 25% lift in client campaign engagement across global enterprise accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Timeline Section (Minimal Editorial Dividers, Zero Cards) */}
        <div className="py-20 border-b border-charcoal/15">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-2">
                Verified Career History
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal tracking-tight">
                Work Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-charcoal-400">
              2023 — PRESENT
            </span>
          </div>

          <div className="divide-y divide-charcoal/15">
            {experienceList.map((exp, idx) => (
              <div
                key={exp.id}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group"
              >
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs text-charcoal-400 block">
                    0{idx + 1} / {exp.period}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-charcoal group-hover:text-copper transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-xs font-sans uppercase tracking-wider text-charcoal-500">
                    {exp.location}
                  </p>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <h4 className="font-display font-semibold text-lg text-charcoal">
                    {exp.role}
                  </h4>
                  <ul className="space-y-2 text-sm sm:text-base font-sans text-charcoal-600 font-light leading-relaxed">
                    {exp.responsibilities.slice(0, 3).map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-copper mt-1.5 text-xs">&mdash;</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="pt-2 text-xs font-sans font-medium text-copper flex items-center gap-2">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>{exp.achievements[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block (Editorial, Zero Box Cards) */}
        <div className="pt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-2">
              Have a Project in Mind?
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-charcoal tracking-tight">
              Let&apos;s build something that matters.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-ivory text-xs font-sans font-bold uppercase tracking-[0.16em] hover:bg-copper transition-colors"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 border border-charcoal/25 text-charcoal text-xs font-sans font-bold uppercase tracking-[0.16em] hover:border-charcoal transition-colors"
            >
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}