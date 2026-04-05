'use client';

import Link from 'next/link';
import { Calculator, Mail, Shield, FileText } from 'lucide-react';

export function Footer() {
  const calculatorLinks = [
    { name: 'PPF Calculator', href: '/en/calculators/ppf' },
    { name: 'FD Calculator', href: '/en/calculators/fd' },
    { name: 'SIP Calculator', href: '/en/calculators/sip' },
    { name: 'EMI Calculator', href: '/en/calculators/emi' },
    { name: 'Tax Calculator', href: '/en/tax/new-vs-old-regime' },
    { name: 'NPS Calculator', href: '/en/calculators/nps' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/en/privacy' },
    { name: 'Terms of Service', href: '/en/terms' },
    { name: 'Disclaimer', href: '/en/disclaimer' },
    { name: 'Contact Us', href: '/en/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/en" className="flex items-center space-x-2 mb-4">
              <img 
                src="/svg/bharatfin-logo-transparent-dark.svg" 
                alt="BharatFin" 
                className="h-8"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Smart Money for Every Indian. Calculate returns, plan investments, 
              and achieve your financial goals with BharatFin's comprehensive calculators.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Popular Calculators</h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/en/mutual-funds/top-funds"
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Top Mutual Funds
                </Link>
              </li>
              <li>
                <Link
                  href="/en/govt-schemes"
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="/en/tax/income-tax-slabs"
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Tax Slabs 2025-26
                </Link>
              </li>
              <li>
                <Link
                  href="/en/news"
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Financial News
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 BharatFin. All rights reserved. Made with ❤️ for Indian investors.
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right max-w-md">
              <p className="mb-1">
                <strong>Disclaimer:</strong> This website provides calculators for educational purposes only. 
                Past performance does not guarantee future results. Please consult a financial advisor for investment decisions.
              </p>
              <p>Not affiliated with any government or financial institution.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}