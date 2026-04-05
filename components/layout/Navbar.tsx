'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

  const calculators = [
    { name: 'PPF Calculator', href: '/en/calculators/ppf', icon: '🏛️', description: 'Public Provident Fund returns' },
    { name: 'SIP Calculator', href: '/en/calculators/sip', icon: '📈', description: 'Systematic Investment Plan' },
    { name: 'FD Calculator', href: '/en/calculators/fd', icon: '🏦', description: 'Fixed Deposit maturity' },
    { name: 'EMI Calculator', href: '/en/calculators/emi', icon: '🏠', description: 'Loan EMI calculations' },
    { name: 'Tax Calculator', href: '/en/tax/new-vs-old-regime', icon: '💰', description: 'New vs Old tax regime' },
    { name: 'NPS Calculator', href: '/en/calculators/nps', icon: '👴', description: 'National Pension System' },
    { name: 'RD Calculator', href: '/en/calculators/rd', icon: '💳', description: 'Recurring Deposit' },
    { name: 'HRA Calculator', href: '/en/calculators/hra', icon: '🏠', description: 'House Rent Allowance' },
  ];

  const navigation = [
    { name: 'Home', href: '/en' },
    { name: 'Tax Tools', href: '/en/tax' },
    { name: 'Mutual Funds', href: '/en/mutual-funds' },
    { name: 'Govt Schemes', href: '/en/govt-schemes' },
    { name: 'News', href: '/en/news' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 min-h-[64px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/en" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="font-display font-bold text-xl text-gray-900">
              FinCalc <span className="text-blue-600">India</span>
            </span>
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
                className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculators
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {isCalculatorsOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                  {/* Invisible bridge to prevent gap issues */}
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent"></div>
                  
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Financial Calculators</h3>
                    <p className="text-xs text-gray-500">Choose from our comprehensive calculator suite</p>
                  </div>
                  <div className="py-2">
                    {calculators.map((calc) => (
                      <Link
                        key={calc.name}
                        href={calc.href}
                        onClick={() => setIsCalculatorsOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                      >
                        <span className="text-xl mr-4 group-hover:scale-110 transition-transform">{calc.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{calc.name}</div>
                          <div className="text-xs text-gray-500">{calc.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors duration-200"
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
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Calculators Section */}
              <div className="px-3 py-3 bg-blue-50 rounded-lg mx-2 mb-3">
                <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Financial Calculators
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.name}
                      href={calc.href}
                      className="flex items-center text-gray-700 hover:text-blue-600 py-2 px-2 text-sm rounded-md hover:bg-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-base mr-2">{calc.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-xs">{calc.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Other Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
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