'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

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
      setScrolled(window.scrollY > 30);
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
        setTime('14:00');
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-charcoal/10 py-3.5 shadow-sm'
            : 'bg-ivory/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Primary Light Mode Brand Logo */}
          <div className="flex items-center">
            <Logo variant="light" height={34} />
          </div>

          {/* Center Coordinates & Availability Indicator */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-sans text-charcoal-500 uppercase tracking-widest border-x border-charcoal/10 px-8 h-8">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span>Available for New Projects</span>
            </span>
            <span className="text-charcoal-300">/</span>
            <span>Coimbatore, IN · {time || 'IST'}</span>
          </div>

          {/* Desktop Navigation Links & Action */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative py-1 text-[13.5px] font-sans font-semibold uppercase tracking-[0.16em] text-charcoal hover:text-copper transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-copper"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 border border-charcoal/20 text-[13px] font-sans font-bold uppercase tracking-[0.16em] text-charcoal hover:border-copper hover:text-copper transition-all duration-200"
            >
              <span>Initiate Brief</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-xs font-sans font-bold uppercase tracking-widest text-charcoal focus:outline-none"
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
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-charcoal text-ivory flex flex-col justify-between p-8 sm:p-14 overflow-y-auto"
          >
            <div className="pt-20 pb-8 border-b border-charcoal-800 flex items-center justify-between text-xs font-sans uppercase tracking-widest text-charcoal-400">
              <Logo variant="dark" height={28} />
              <span>Coimbatore, India</span>
            </div>

            <div className="py-12 space-y-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
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
