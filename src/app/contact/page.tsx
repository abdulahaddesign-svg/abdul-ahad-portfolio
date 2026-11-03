import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Project Inquiry & Contact — Abdul Ahad J',
  description:
    'Start a creative design project with Abdul Ahad J. Brand identity, social media creatives, UI/UX, and motion graphics based in Coimbatore, Tamil Nadu, India.',
};

export default function ContactPage() {
  return (
    <div className="pt-36 sm:pt-44 pb-32 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="pb-16 border-b border-charcoal/15">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-copper block mb-4">
            Initiate Collaboration
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-charcoal leading-none">
            Start a Project
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-charcoal-600 font-sans max-w-4xl font-light leading-relaxed">
            Have an upcoming brand launch, digital redesign, or motion requirement? Complete the project brief below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-16 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block">
                Direct Channels
              </span>

              <div className="space-y-4 text-xs font-sans">
                <a
                  href={`mailto:${SITE_SETTINGS.email}`}
                  className="flex items-start gap-4 p-4 border border-charcoal/15 hover:border-copper transition-colors group"
                >
                  <Mail className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal-400 block text-[10px] uppercase tracking-wider">
                      Direct Email
                    </span>
                    <span className="text-sm font-bold text-charcoal group-hover:text-copper transition-colors">
                      {SITE_SETTINGS.email}
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919150037005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 border border-charcoal/15 hover:border-copper transition-colors group"
                >
                  <Phone className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal-400 block text-[10px] uppercase tracking-wider">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-sm font-bold text-copper group-hover:underline">
                      {SITE_SETTINGS.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 border border-charcoal/15">
                  <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal-400 block text-[10px] uppercase tracking-wider">
                      Studio Location
                    </span>
                    <span className="text-sm font-bold text-charcoal">
                      {SITE_SETTINGS.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-charcoal/5 border-l-2 border-copper space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-charcoal font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-copper" />
                <span>Strict Confidentiality</span>
              </div>
              <p className="text-charcoal-600 leading-relaxed font-light">
                All client project briefs, unreleased assets, and proprietary information are treated with strict confidentiality. Non-disclosure agreements (NDAs) signed upon request.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Brief Form */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-charcoal/15 lg:pl-16 pt-8 lg:pt-0">
            <div className="mb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal-400 block mb-2">
                Project Scope
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal">
                Project Inquiry Brief
              </h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
