'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, allowDarkTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When admin setting "Allow Dark Theme" is OFF, hide the toggle completely
  if (!allowDarkTheme) {
    return null;
  }

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex items-center gap-2 p-2 rounded-none border transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper ${
        isDark
          ? 'border-ivory/20 bg-charcoal-900 text-ivory hover:border-copper hover:text-copper'
          : 'border-charcoal/15 bg-ivory text-charcoal hover:border-copper hover:text-copper'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center text-copper"
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center text-copper"
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-[11px] font-sans font-bold uppercase tracking-widest">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
