import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { SITE_SETTINGS } from '@/lib/constants';
import { ContactForm } from './ContactForm';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Project Inquiry & Contact — Abdul Ahad J',
  description:
    'Start a creative design project with Abdul Ahad J. Brand identity, social media creatives, UI/UX, and motion graphics based in Coimbatore, Tamil Nadu, India.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl pb-12 border-b border-charcoal/15">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block mb-2">
              Get in Touch
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl text-charcoal tracking-tight">
              Start a Project
            </h1>
            <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
              Have an upcoming product launch, branding initiative, or design requirement? Share your vision and I'll respond within 24 business hours.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 items-start">
          {/* Left Column: Direct Contacts & Operating Guidelines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-charcoal text-ivory border border-charcoal-800 space-y-6">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-copper block">
                Direct Channels
              </span>

              <div className="space-y-4">
                <a
                  href={`mailto:${SITE_SETTINGS.email}`}
                  className="flex items-start gap-3 p-3 bg-charcoal-900 border border-charcoal-800 hover:border-copper transition-colors group"
                >
                  <Mail className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-sans text-charcoal-400 block">Email Directly</span>
                    <span className="text-sm font-sans font-semibold text-ivory group-hover:text-copper transition-colors">
                      {SITE_SETTINGS.email}
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919150037005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 bg-charcoal-900 border border-charcoal-800 hover:border-copper transition-colors group"
                >
                  <Phone className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-sans text-charcoal-400 block">WhatsApp Direct</span>
                    <span className="text-sm font-sans font-semibold text-ivory group-hover:text-copper transition-colors">
                      {SITE_SETTINGS.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 bg-charcoal-900 border border-charcoal-800">
                  <MapPin className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-sans text-charcoal-400 block">Location</span>
                    <span className="text-sm font-sans font-semibold text-ivory">
                      {SITE_SETTINGS.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-800 flex items-center gap-3 text-xs font-sans text-charcoal-400">
                <Clock className="w-4 h-4 text-copper shrink-0" />
                <span>Response window: Within 24 hours (Mon – Sat)</span>
              </div>
            </div>

            {/* Privacy & Professional Commitment */}
            <div className="p-6 bg-white border border-charcoal/15 space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-earthBrown font-bold">
                <ShieldCheck className="w-4 h-4 text-copper" />
                <span>Confidentiality Guaranteed</span>
              </div>
              <p className="text-charcoal-500 leading-relaxed">
                Project inquiries, unreleased concepts, and proprietary information are held in strict confidence. Non-disclosure agreements (NDAs) signed upon request.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form Component */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-white border border-charcoal/15 shadow-sm">
            <h2 className="font-display font-bold text-2xl text-charcoal mb-2">
              Project Inquiry Brief
            </h2>
            <p className="text-sm text-charcoal-500 font-sans mb-8">
              Fill in the details below to give us an overview of your goals.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
