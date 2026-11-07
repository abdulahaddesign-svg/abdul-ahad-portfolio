'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const SERVICE_OPTIONS = [
  { value: 'Graphic Design & Visual Branding', label: 'Graphic Design & Visual Branding (Primary)' },
  { value: 'Brand Identity Design', label: 'Brand Identity & Logo Suite' },
  { value: 'Social Media Design', label: 'Social Media Creatives & Content Calendar' },
  { value: 'Marketing & Advertising Creatives', label: 'Marketing & Digital Ad Collaterals' },
  { value: 'Packaging & Print Design', label: 'Product Packaging, Dielines & Print' },
  { value: 'UI/UX Design', label: 'UI/UX & Mobile App Interfaces' },
  { value: 'Motion Graphics', label: 'Motion Graphics & Logo Animations' },
  { value: 'Video Editing', label: 'Video Post-Production & Social Reels' },
  { value: 'Web & App Design', label: 'Website & Responsive Landing Pages' },
  { value: 'AI-Assisted Creative Production', label: 'AI Visual Ideation & Fast Prototyping' },
];

const BUDGET_OPTIONS = [
  { value: 'Flexible / To Be Discussed', label: 'Flexible / To Be Discussed' },
  { value: 'Under ₹25,000', label: 'Under ₹25,000' },
  { value: '₹25,000 – ₹50,000', label: '₹25,000 – ₹50,000' },
  { value: '₹50,000 – ₹1,00,000', label: '₹50,000 – ₹1,00,000' },
  { value: '₹1,00,000+', label: '₹1,00,000+ (Comprehensive Brand/Product)' },
];

const fieldInputClass =
  "bg-[#ECE5D8] hover:bg-[#E8DFD0] focus:bg-[#FAF7F2] dark:bg-[#201F1A] dark:hover:bg-[#262520] dark:focus:bg-[#1A1915] border-charcoal/20 dark:border-ivory/20 text-charcoal dark:text-ivory placeholder:text-charcoal-400 dark:placeholder:text-charcoal-400 transition-colors";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceRequired: 'Graphic Design & Visual Branding',
    budgetRange: 'Flexible / To Be Discussed',
    details: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceRequired: 'Graphic Design & Visual Branding',
        budgetRange: 'Flexible / To Be Discussed',
        details: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 bg-ivory border border-copper/40 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-copper mx-auto" />
        <h3 className="font-display font-bold text-2xl text-charcoal">
          Inquiry Successfully Delivered
        </h3>
        <p className="text-sm font-sans text-charcoal-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. I have received your project details and will review them thoroughly before getting back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs font-sans font-bold uppercase tracking-wider text-copper hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          name="name"
          placeholder="e.g. Rahul Sharma"
          required
          className={fieldInputClass}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Your Email"
          name="email"
          type="email"
          placeholder="e.g. rahul@company.com"
          required
          className={fieldInputClass}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Company or Brand (Optional)"
          name="company"
          placeholder="e.g. Acme Tech Studio"
          className={fieldInputClass}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <Select
          label="Service Required"
          name="serviceRequired"
          options={SERVICE_OPTIONS}
          className={fieldInputClass}
          value={formData.serviceRequired}
          onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
        />
      </div>

      <Select
        label="Target Budget Range"
        name="budgetRange"
        options={BUDGET_OPTIONS}
        className={fieldInputClass}
        value={formData.budgetRange}
        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
      />

      <Textarea
        label="Project Overview & Objectives"
        name="details"
        placeholder="Briefly describe your brand, deliverables required, target audience, and preferred deadline..."
        required
        rows={5}
        className={fieldInputClass}
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
      />

      <div className="pt-2 flex items-center justify-between">
        <span className="text-xs font-sans text-charcoal-400">
          Strictly confidential. No spam.
        </span>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={<Send className="w-4 h-4" />}
        >
          Send Project Inquiry
        </Button>
      </div>
    </form>
  );
}
