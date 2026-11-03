'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '/work', index: '01' },
  { label: 'About', href: '/about', index: '02' },
  { label: 'Services', href: '/services', index: '03' },
  { label: 'Contact', href: '/contact', index: '04' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live Coimbatore time (IST)
  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTime(ist);
      } catch {
        setTime('13:30');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-charcoal/10 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Wordmark / Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-3 select-none focus:outline-none"
            aria-label="Abdul Ahad — Homepage"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/brand/logo-monogram-light.png"
                alt="Aa Monogram"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-charcoal group-hover:text-copper transition-colors">
                ABDUL AHAD
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-charcoal-500 hidden sm:block">
                Visual Branding & Creative
              </span>
            </div>
          </Link>

          {/* Center Coordinates & Time (Desktop Editorial) */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-sans text-charcoal-500 uppercase tracking-widest border-x border-charcoal/10 px-8">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span>Available for 2026 Projects</span>
            </span>
            <span className="text-charcoal-300">/</span>
            <span>Coimbatore, IN · {time || 'IST'}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-1 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-charcoal hover:text-copper transition-colors duration-200"
                >
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-copper"
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.16em] text-copper hover:text-charcoal transition-colors ml-2"
            >
              <span>Initiate Brief</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-xs font-sans font-bold uppercase tracking-widest text-charcoal focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? 'Close [X]' : 'Menu [—]'}
          </button>
        </div>
      </header>

      {/* Full-Screen Editorial Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-charcoal text-ivory flex flex-col justify-between p-8 sm:p-14 overflow-y-auto"
          >
            {/* Top brand reminder */}
            <div className="pt-20 pb-8 border-b border-charcoal-800 flex items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal-400">
              <span>Navigation Directory</span>
              <span>Coimbatore, India</span>
            </div>

            {/* Huge Menu Links */}
            <div className="py-12 space-y-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline justify-between py-2 border-b border-charcoal-800/80"
                  >
                    <span className="font-display font-bold text-4xl sm:text-6xl text-ivory group-hover:text-copper transition-colors tracking-tight">
                      {link.label}
                    </span>
                    <span className="text-xs font-mono text-copper tracking-widest">
                      {link.index}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Coordinates */}
            <div className="pt-8 border-t border-charcoal-800 space-y-4 text-xs font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-charcoal-400">
                <div>
                  Direct: <a href="mailto:abdulahad.ofcl@gmail.com" className="text-ivory underline">abdulahad.ofcl@gmail.com</a>
                </div>
                <div>
                  WhatsApp: <a href="https://wa.me/919150037005" target="_blank" rel="noopener noreferrer" className="text-copper underline">+91 9150037005</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
