'use client';

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const themes = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'system', name: 'System', icon: Monitor },
] as const;

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, actualTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-500"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Theme</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
          </div>
          <div className="py-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.id;
              
              return (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors ${
                    isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-r-2 border-emerald-600 dark:border-emerald-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{themeOption.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {themeOption.id === 'light' && 'Always use light theme'}
                      {themeOption.id === 'dark' && 'Always use dark theme'}
                      {themeOption.id === 'system' && 'Use system preference'}
                    </div>
                  </div>
                  {isActive && (
                    <div className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">Active</div>
                  )}
                </button>
              );
            })}
          </div>
          
          {theme === 'system' && (
            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Currently: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{actualTheme}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}