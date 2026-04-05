'use client';

import { useState, useMemo } from 'react';
import { calculateFD, getBankFDRates, calculateFDTDS, type FDInput } from '@/lib/calculators/fd';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';
import { Calculator, ArrowLeft, Share2 } from 'lucide-react';
import { HeaderAdSlot, InContentAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const COLORS = ['#1a56db', '#0e9f6e', '#ff5a1f'];

export default function FDCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const [inputs, setInputs] = useState<FDInput>({
    principal: 100000,
    interestRate: 7.5,
    tenure: 3,
    tenureUnit: 'years',
    compoundingFrequency: 'quarterly',
    interestPayout: 'cumulative'
  });

  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [showBankComparison, setShowBankComparison] = useState(false);

  const result = useMemo(() => {
    try {
      return calculateFD(inputs);
    } catch (error) {
      return null;
    }
  }, [inputs]);

  const tdsInfo = useMemo(() => {
    if (!result) return null;
    return calculateFDTDS(result.totalInterest, isSeniorCitizen);
  }, [result, isSeniorCitizen]);

  const bankRates = getBankFDRates();

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Fixed Deposit Calculator 2025-26</h1>
                <p className="text-gray-600 dark:text-gray-400">Calculate FD maturity amount with compound interest</p>
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
                FD Calculator
              </h2>
              
              {/* Basic Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Principal Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="1000"
                      value={inputs.principal}
                      onChange={(e) => setInputs({...inputs, principal: Number(e.target.value)})}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="15"
                      step="0.25"
                      value={inputs.interestRate}
                      onChange={(e) => setInputs({...inputs, interestRate: Number(e.target.value)})}
                      className="w-full px-4 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tenure</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={inputs.tenure}
                      onChange={(e) => setInputs({...inputs, tenure: Number(e.target.value)})}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={inputs.tenureUnit}
                      onChange={(e) => setInputs({...inputs, tenureUnit: e.target.value as any})}
                      className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compounding Frequency</label>
                  <select
                    value={inputs.compoundingFrequency}
                    onChange={(e) => setInputs({...inputs, compoundingFrequency: e.target.value as any})}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-slate-800"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none mt-7">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interest Payout Options */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Payout</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="interestPayout"
                      value="cumulative"
                      checked={inputs.interestPayout === 'cumulative'}
                      onChange={(e) => setInputs({...inputs, interestPayout: e.target.value as any})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Cumulative (Reinvest)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Interest compounded and paid at maturity</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="interestPayout"
                      value="non-cumulative"
                      checked={inputs.interestPayout === 'non-cumulative'}
                      onChange={(e) => setInputs({...inputs, interestPayout: e.target.value as any})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Non-Cumulative (Payout)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Interest paid out periodically</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Options */}
              <div className="flex items-center space-x-4 mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSeniorCitizen}
                    onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Senior Citizen (60+ years)</span>
                </label>
                
                <button
                  onClick={() => setShowBankComparison(!showBankComparison)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {showBankComparison ? 'Hide' : 'Show'} Bank Rate Comparison
                </button>
              </div>
            </div>

            <InContentAdSlot />
            
            {/* Results */}
            {result && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Maturity Amount</h3>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.maturityAmount)}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-green-600 mb-2">Interest Earned</h3>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-purple-600 mb-2">Effective Yield</h3>
                    <p className="text-3xl font-bold text-purple-600">{result.effectiveYield.toFixed(2)}%</p>
                  </div>
                </div>

                {/* Monthly Payout for Non-Cumulative */}
                {inputs.interestPayout === 'non-cumulative' && result.monthlyPayout && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center mb-6">
                    <h3 className="text-sm font-medium text-orange-600 mb-2">Monthly Interest Payout</h3>
                    <p className="text-2xl font-bold text-orange-600">{formatCurrency(result.monthlyPayout)}</p>
                  </div>
                )}

                {/* TDS Information */}
                {tdsInfo && (
                  <div className={`border rounded-xl p-6 ${tdsInfo.tdsApplicable ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <h3 className={`text-sm font-medium mb-2 ${tdsInfo.tdsApplicable ? 'text-red-600' : 'text-green-600'}`}>
                      TDS Information
                    </h3>
                    {tdsInfo.tdsApplicable ? (
                      <div>
                        <p className="text-red-800">TDS will be deducted: <strong>{formatCurrency(tdsInfo.tdsAmount)}</strong></p>
                        <p className="text-sm text-red-600 mt-1">
                          Interest exceeds exemption limit of {formatCurrency(tdsInfo.exemptionLimit)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-green-800">
                        No TDS applicable. Interest is below exemption limit of {formatCurrency(tdsInfo.exemptionLimit)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bank Rate Comparison */}
            {showBankComparison && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Bank Rate Comparison (Latest Rates)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Bank</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">1 Year</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">2 Years</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">3 Years</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">5 Years</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Senior Citizen Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankRates.map((bank) => (
                        <tr key={bank.bankName} className="hover:bg-gray-50">
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">{bank.bankName}</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">{bank.rate1Year}%</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">{bank.rate2Year}%</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">{bank.rate3Year}%</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">{bank.rate5Year}%</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">+{bank.seniorCitizenBonus}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  * Rates are indicative and may vary. Please check with respective banks for current rates.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <SidebarAdSlot />
              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-4">💡 Quick Tips</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Higher compounding frequency = higher returns</li>
                  <li>• Senior citizens get 0.5% extra interest</li>
                  <li>• TDS applies if interest exceeds ₹40,000/year</li>
                  <li>• Compare rates across different banks</li>
                </ul>
              </div>

              {/* Related Calculators */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Related Calculators</h3>
                <div className="space-y-3">
                  <Link href="/en/calculators/ppf" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">🏛️</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">PPF Calculator</span>
                  </Link>
                  <Link href="/en/calculators/rd" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">💰</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">RD Calculator</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterAdSlot />
    </div>
  );
}