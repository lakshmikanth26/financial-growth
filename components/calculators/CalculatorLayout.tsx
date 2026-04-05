'use client';

import { ReactNode } from 'react';
import { InContentAdSlot, SidebarAdSlot } from '@/components/layout/AdSlot';
import { Share2, Download, Calculator } from 'lucide-react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  result?: ReactNode;
  chart?: ReactNode;
  faq?: ReactNode;
  relatedCalculators?: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}

export function CalculatorLayout({
  title,
  description,
  children,
  result,
  chart,
  faq,
  relatedCalculators = []
}: CalculatorLayoutProps) {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleDownload = () => {
    // This would generate a PDF report of the calculation
    // Implementation depends on the specific calculator
    console.log('Download functionality to be implemented');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Calculator Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Calculator
              </h2>
              {children}
            </div>

            {/* Ad Slot - After Input, Before Result */}
            <InContentAdSlot />

            {/* Result */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                  Results
                </h2>
                {result}
              </div>
            )}

            {/* Chart */}
            {chart && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                  Visual Breakdown
                </h2>
                {chart}
              </div>
            )}

            {/* FAQ */}
            {faq && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                {faq}
              </div>
            )}

            {/* Related Calculators */}
            {relatedCalculators.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                  Related Calculators
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCalculators.map((calc) => (
                    <a
                      key={calc.name}
                      href={calc.href}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-2xl mr-3">{calc.icon}</span>
                      <span className="font-medium text-gray-900">{calc.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Sidebar Ad */}
              <div className="hidden lg:block">
                <SidebarAdSlot />
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-display font-semibold text-blue-900 mb-4">
                  💡 Quick Tips
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• All calculations happen in your browser - completely private</li>
                  <li>• Results update in real-time as you change inputs</li>
                  <li>• Use the share button to save your calculation</li>
                  <li>• Download a PDF report for your records</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-display font-semibold text-orange-900 mb-4">
                  ⚠️ Important Disclaimer
                </h3>
                <p className="text-sm text-orange-800">
                  This calculator is for educational purposes only. Past performance does not 
                  guarantee future results. Please consult a financial advisor for investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}