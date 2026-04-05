'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Calculator, Mail, Shield, FileText } from 'lucide-react';

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('common');

  const calculatorLinks = [
    { name: 'PPF Calculator', href: `/${locale}/calculators/ppf` },
    { name: 'FD Calculator', href: `/${locale}/calculators/fd` },
    { name: 'SIP Calculator', href: `/${locale}/calculators/sip` },
    { name: 'EMI Calculator', href: `/${locale}/calculators/emi` },
    { name: 'Tax Calculator', href: `/${locale}/tax/new-vs-old-regime` },
    { name: 'NPS Calculator', href: `/${locale}/calculators/nps` },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: `/${locale}/privacy` },
    { name: 'Terms of Service', href: `/${locale}/terms` },
    { name: 'Disclaimer', href: `/${locale}/disclaimer` },
    { name: 'Contact Us', href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="font-display font-bold text-xl">
                FinCalc <span className="text-blue-400">India</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              India's fastest financial calculators for smart investment decisions. 
              Calculate returns, plan investments, and achieve your financial goals.
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
                  href={`/${locale}/mutual-funds/top-funds`}
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Top Mutual Funds
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/govt-schemes`}
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/tax/income-tax-slabs`}
                  className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Tax Slabs 2025-26
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/news`}
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
              © 2025 FinCalc India. All rights reserved. Made with ❤️ for Indian investors.
            </div>
            <div className="text-xs text-gray-500 text-center md:text-right max-w-md">
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