'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ResolvedTheme;
  resolvedTheme: ResolvedTheme;
  allowDarkTheme: boolean;
  setTheme: (theme: ResolvedTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  resolvedTheme: 'light',
  allowDarkTheme: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = 'theme-preference';

interface ThemeProviderProps {
  children: React.ReactNode;
  allowDarkTheme?: boolean;
}

export function ThemeProvider({ children, allowDarkTheme = false }: ThemeProviderProps) {
  // Default is strictly Light for both portfolio and admin panel
  const [themeState, setThemeState] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from storage only if allowDarkTheme is true
  useEffect(() => {
    if (!allowDarkTheme) {
      setThemeState('light');
      const root = document.documentElement;
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark') {
          setThemeState('dark');
        } else {
          // First visit or stored light defaults to light
          setThemeState('light');
        }
      } catch {
        setThemeState('light');
      }
    }
    setMounted(true);
  }, [allowDarkTheme]);

  // Sync DOM classes whenever themeState or allowDarkTheme changes
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (!allowDarkTheme || themeState === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    }
  }, [themeState, allowDarkTheme, mounted]);

  const setTheme = (newTheme: ResolvedTheme) => {
    if (!allowDarkTheme) {
      setThemeState('light');
      return;
    }
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    if (!allowDarkTheme) return;
    const nextTheme: ResolvedTheme = themeState === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const currentEffectiveTheme: ResolvedTheme = allowDarkTheme ? themeState : 'light';

  return (
    <ThemeContext.Provider
      value={{
        theme: currentEffectiveTheme,
        resolvedTheme: currentEffectiveTheme,
        allowDarkTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
