'use client';

import { useState, useMemo } from 'react';
import { calculatePPF, getCurrentPPFRate, type PPFInput } from '@/lib/calculators/ppf';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';
import { Calculator, ArrowLeft, Share2 } from 'lucide-react';
import { HeaderAdSlot, InContentAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const COLORS = ['#1a56db', '#0e9f6e', '#ff5a1f'];

export default function PPFCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const [inputs, setInputs] = useState<PPFInput>({
    yearlyDeposit: 150000,
    tenure: 15,
    currentRate: getCurrentPPFRate()
  });

  const result = useMemo(() => {
    try {
      return calculatePPF(inputs);
    } catch (error) {
      return null;
    }
  }, [inputs]);

  const pieData = result ? [
    { name: 'Principal', value: result.totalInvested, color: COLORS[0] },
    { name: 'Interest', value: result.totalInterest, color: COLORS[1] }
  ] : [];

  const barData = result ? result.yearWiseData.map(item => ({
    year: item.year,
    Principal: item.cumulativeDeposit,
    Interest: item.cumulativeInterest,
    Total: item.balance
  })) : [];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <HeaderAdSlot />
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/en" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PPF Calculator 2025-26</h1>
                <p className="text-gray-600 dark:text-gray-400">Calculate your PPF maturity amount with current rates</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Calculator Input */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                PPF Calculator
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Yearly Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="500"
                      max="150000"
                      value={inputs.yearlyDeposit}
                      onChange={(e) => setInputs({...inputs, yearlyDeposit: Number(e.target.value)})}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Min: ₹500 - Max: ₹1,50,000</p>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tenure (Years)
                  </label>
                  <select
                    value={inputs.tenure}
                    onChange={(e) => setInputs({...inputs, tenure: Number(e.target.value)})}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-slate-800"
                  >
                    <option value={15}>15 years (Minimum)</option>
                    <option value={20}>20 years (15 + 5 extension)</option>
                    <option value={25}>25 years (15 + 10 extension)</option>
                    <option value={30}>30 years (15 + 15 extension)</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none mt-7">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">15-year lock-in period</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current PPF Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="15"
                      step="0.1"
                      value={inputs.currentRate}
                      onChange={(e) => setInputs({...inputs, currentRate: Number(e.target.value)})}
                      className="w-full px-4 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Tax-free returns (EEE status)</p>
                </div>
              </div>
            </div>

            <InContentAdSlot />
            
            {/* Results */}
            {result && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Maturity Amount</h3>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.maturityAmount)}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-green-600 mb-2">Total Interest Earned</h3>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Invested</h3>
                    <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{formatCurrency(result.totalInvested)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Charts */}
            {result && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Visual Breakdown</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
                      Principal vs Interest Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
                      Year-wise Growth
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData.filter((_, index) => index % 3 === 0 || index === barData.length - 1)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="Principal" stackId="a" fill={COLORS[0]} />
                        <Bar dataKey="Interest" stackId="a" fill={COLORS[1]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-gray-100">What is PPF?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-700 dark:text-gray-300 border-l-4 border-blue-200 ml-4 mt-2">
                    Public Provident Fund (PPF) is a long-term savings scheme backed by the Government of India with a 15-year lock-in period and tax benefits under Section 80C.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-gray-100">What is the current PPF interest rate?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-700 dark:text-gray-300 border-l-4 border-blue-200 ml-4 mt-2">
                    The current PPF interest rate for Q1 FY2025-26 is 7.1% per annum, compounded annually.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Is PPF interest taxable?</span>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-gray-700 dark:text-gray-300 border-l-4 border-blue-200 ml-4 mt-2">
                    No. PPF enjoys EEE (Exempt-Exempt-Exempt) status - deposits, interest, and maturity amount are all tax-free.
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <SidebarAdSlot />
              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-4">💡 Quick Tips</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• All calculations happen in your browser - completely private</li>
                  <li>• Results update in real-time as you change inputs</li>
                  <li>• PPF has a 15-year mandatory lock-in period</li>
                  <li>• Maximum annual investment is ₹1,50,000</li>
                </ul>
              </div>

              {/* Related Calculators */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Related Calculators</h3>
                <div className="space-y-3">
                  <Link href="/en/calculators/fd" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">🏦</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">FD Calculator</span>
                  </Link>
                  <Link href="/en/calculators/sip" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">📈</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">SIP Calculator</span>
                  </Link>
                  <Link href="/en/tax/new-vs-old-regime" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">💰</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Tax Calculator</span>
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-semibold text-orange-900 mb-4">⚠️ Important Disclaimer</h3>
                <p className="text-sm text-orange-800">
                  This calculator is for educational purposes only. Past performance does not 
                  guarantee future results. Please consult a financial advisor for investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterAdSlot />
    </div>
  );
}