'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize theme after hydration - always use dark theme
  useEffect(() => {
    setIsHydrated(true);
    setTheme('dark');
    setActualTheme('dark');
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Always use dark theme
    setActualTheme('dark');
    
    // Update document class only on client
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add('dark');
      
      // Update meta theme-color for dark theme
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0F172A');
      }
    }
  }, [isHydrated]);

  const handleSetTheme = (newTheme: Theme) => {
    // Always keep dark theme
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, actualTheme, isHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}