'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCalculatorsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsCalculatorsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCalculatorsOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  };

  // Get current locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const calculators = [
    { name: 'PPF Calculator', href: `/${locale}/calculators/ppf`, icon: '🏛️', description: 'Public Provident Fund returns' },
    { name: 'SIP Calculator', href: `/${locale}/calculators/sip`, icon: '📈', description: 'Systematic Investment Plan' },
    { name: 'FD Calculator', href: `/${locale}/calculators/fd`, icon: '🏦', description: 'Fixed Deposit maturity' },
    { name: 'EMI Calculator', href: `/${locale}/calculators/emi`, icon: '🏠', description: 'Loan EMI calculations' },
    { name: 'Tax Calculator', href: `/${locale}/tax/new-vs-old-regime`, icon: '💰', description: 'New vs Old tax regime' },
    { name: 'NPS Calculator', href: `/${locale}/calculators/nps`, icon: '👴', description: 'National Pension System' },
    { name: 'RD Calculator', href: `/${locale}/calculators/rd`, icon: '💳', description: 'Recurring Deposit' },
    { name: 'HRA Calculator', href: `/${locale}/calculators/hra`, icon: '🏠', description: 'House Rent Allowance' },
  ];

  const upcomingFeatures = [
    { name: 'Tax Tools', icon: '📊', description: 'Advanced tax planning tools' },
    { name: 'Mutual Funds', icon: '📈', description: 'MF analysis & recommendations' },
    { name: 'Govt Schemes', icon: '🏛️', description: 'Government schemes database' },
    { name: 'News', icon: '📰', description: 'Latest financial news & updates' },
  ];

  // Only include working navigation items
  const navigation = [
    { name: 'Home', href: `/${locale}` },
    { name: 'Blog', href: `/${locale}/blog` },
    { name: 'About', href: `/${locale}/about` },
    { name: 'Contact', href: `/${locale}/contact` },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 min-h-[64px] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <img 
              src="/svg/bharatfin-logo-transparent-light.svg" 
              alt="BharatFin" 
              className="h-8 dark:hidden"
            />
            <img 
              src="/svg/bharatfin-logo-transparent-dark.svg" 
              alt="BharatFin" 
              className="h-8 hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Calculators Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                className="flex items-center bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors duration-200 font-medium text-sm"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculators
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {isCalculatorsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-3 z-50">
                  {/* Invisible bridge to prevent gap issues */}
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent"></div>
                  
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Financial Calculators</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose from our comprehensive calculator suite</p>
                  </div>
                  
                  {/* Active Calculators */}
                  <div className="py-2">
                    {calculators.map((calc) => (
                      <Link
                        key={calc.name}
                        href={calc.href}
                        onClick={() => setIsCalculatorsOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                      >
                        <span className="text-xl mr-4 group-hover:scale-110 transition-transform">{calc.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{calc.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{calc.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Upcoming Section */}
                  <div className="border-t border-gray-100 dark:border-gray-600 pt-2">
                    <div className="px-4 py-2">
                      <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Coming Soon</h4>
                    </div>
                    <div className="py-1">
                      {upcomingFeatures.map((feature) => (
                        <div
                          key={feature.name}
                          className="flex items-center px-4 py-3 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
                        >
                          <span className="text-xl mr-4 grayscale">{feature.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium flex items-center">
                              {feature.name}
                              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                Soon
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">{feature.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
              {/* Calculators Section */}
              <div className="px-3 py-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mx-2 mb-3">
                <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Financial Calculators
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.name}
                      href={calc.href}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 px-2 text-sm rounded-md hover:bg-white dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-base mr-2">{calc.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-xs">{calc.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Upcoming Features */}
                <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-700">
                  <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-2 uppercase tracking-wider">
                    Coming Soon
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {upcomingFeatures.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center text-gray-400 dark:text-gray-500 py-2 px-2 text-sm rounded-md cursor-not-allowed opacity-60"
                      >
                        <span className="text-base mr-2 grayscale">{feature.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-xs flex items-center">
                            {feature.name}
                            <span className="ml-1 px-1 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                              Soon
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Other Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}