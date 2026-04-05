'use client';

import { useState, useMemo } from 'react';
import { 
  compareTaxRegimes, 
  calculateHRAExemption, 
  get80CInvestments, 
  type TaxInput 
} from '@/lib/calculators/tax';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import { Calculator, ArrowLeft, Share2 } from 'lucide-react';
import { HeaderAdSlot, InContentAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const COLORS = ['#1a56db', '#0e9f6e', '#ff5a1f', '#8b5cf6'];

export default function TaxCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const [inputs, setInputs] = useState<TaxInput>({
    annualIncome: 1200000,
    age: 'below60',
    section80C: 150000,
    section80D: 25000,
    hraExemption: 0,
    homeLoanInterest: 0,
    ltaExemption: 0,
    professionalTax: 2400,
    otherDeductions: 0
  });

  const [hraDetails, setHraDetails] = useState({
    basicSalary: 0,
    hraReceived: 0,
    rentPaid: 0,
    isMetroCity: false
  });

  const comparison = useMemo(() => {
    try {
      return compareTaxRegimes(inputs);
    } catch (error) {
      return null;
    }
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const calculateHRA = () => {
    const exemption = calculateHRAExemption(
      hraDetails.basicSalary,
      hraDetails.hraReceived,
      hraDetails.rentPaid,
      hraDetails.isMetroCity
    );
    setInputs({ ...inputs, hraExemption: exemption });
  };

  const investments80C = get80CInvestments();

  const comparisonData = comparison ? [
    {
      regime: 'New Regime',
      'Total Tax': comparison.newRegime.totalTax,
      'Net Income': comparison.newRegime.netIncome,
      'Effective Rate': comparison.newRegime.effectiveTaxRate
    },
    {
      regime: 'Old Regime',
      'Total Tax': comparison.oldRegime.totalTax,
      'Net Income': comparison.oldRegime.netIncome,
      'Effective Rate': comparison.oldRegime.effectiveTaxRate
    }
  ] : [];

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Income Tax Calculator 2025-26</h1>
                <p className="text-gray-600 dark:text-gray-400">Compare New vs Old tax regime and find which saves you more</p>
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
                Tax Calculator
              </h2>
              
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Income</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.annualIncome}
                        onChange={(e) => setInputs({...inputs, annualIncome: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age Category</label>
                    <select
                      value={inputs.age}
                      onChange={(e) => setInputs({...inputs, age: e.target.value as any})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="below60">Below 60 years</option>
                      <option value="senior">Senior Citizen (60-80 years)</option>
                      <option value="superSenior">Super Senior Citizen (80+ years)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Old Regime Deductions */}
              <div className="space-y-6 mt-8">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Old Regime Deductions
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                    (Not applicable for New Regime)
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section 80C (Max: ₹1.5L)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="150000"
                        value={inputs.section80C}
                        onChange={(e) => setInputs({...inputs, section80C: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PPF, ELSS, EPF, Life Insurance, etc.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section 80D (Health Insurance)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.section80D}
                        onChange={(e) => setInputs({...inputs, section80D: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Max: ₹25K (₹50K for senior citizens)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HRA Exemption</label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={inputs.hraExemption}
                          onChange={(e) => setInputs({...inputs, hraExemption: Number(e.target.value)})}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => document.getElementById('hra-modal')?.classList.remove('hidden')}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Calculate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Home Loan Interest (Max: ₹2L)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="200000"
                        value={inputs.homeLoanInterest}
                        onChange={(e) => setInputs({...inputs, homeLoanInterest: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <InContentAdSlot />
            
            {/* Results */}
            {comparison && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Tax Comparison Results</h2>
                
                {/* Recommendation */}
                <div className={`border rounded-xl p-6 text-center mb-6 ${
                  comparison.recommendedRegime === 'new' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    comparison.recommendedRegime === 'new' ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    {comparison.recommendedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'} is better for you
                  </h3>
                  <p className={`text-2xl font-bold ${
                    comparison.recommendedRegime === 'new' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    Save ₹{Math.abs(comparison.savings).toLocaleString('en-IN')} 
                    ({comparison.savingsPercentage.toFixed(1)}%)
                  </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* New Regime */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                      New Tax Regime
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                        <span className="font-medium">{formatCurrency(comparison.newRegime.grossIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                        <span className="font-medium">{formatCurrency(comparison.newRegime.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tax Before Rebate:</span>
                        <span className="font-medium">{formatCurrency(comparison.newRegime.taxBeforeRebate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rebate (87A):</span>
                        <span className="font-medium text-green-600">-{formatCurrency(comparison.newRegime.rebateAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Cess (4%):</span>
                        <span className="font-medium">{formatCurrency(comparison.newRegime.cess)}</span>
                      </div>
                      <hr className="border-green-200" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Tax:</span>
                        <span className="text-green-600">{formatCurrency(comparison.newRegime.totalTax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Income:</span>
                        <span className="text-green-800">{formatCurrency(comparison.newRegime.netIncome)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Old Regime */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                      Old Tax Regime
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                        <span className="font-medium">{formatCurrency(comparison.oldRegime.grossIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                        <span className="font-medium">{formatCurrency(comparison.oldRegime.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tax Before Rebate:</span>
                        <span className="font-medium">{formatCurrency(comparison.oldRegime.taxBeforeRebate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rebate (87A):</span>
                        <span className="font-medium text-green-600">-{formatCurrency(comparison.oldRegime.rebateAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Cess (4%):</span>
                        <span className="font-medium">{formatCurrency(comparison.oldRegime.cess)}</span>
                      </div>
                      <hr className="border-blue-200" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Tax:</span>
                        <span className="text-blue-600">{formatCurrency(comparison.oldRegime.totalTax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Income:</span>
                        <span className="text-blue-800">{formatCurrency(comparison.oldRegime.netIncome)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts */}
            {comparison && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Visual Comparison</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Comparison Chart */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Tax Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="regime" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="Total Tax" fill={COLORS[2]} />
                        <Bar dataKey="Net Income" fill={COLORS[1]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 80C Investment Options */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Section 80C Investment Options</h3>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {investments80C.slice(0, 6).map((investment) => (
                        <div key={investment.name} className="border border-gray-200 rounded-lg p-3">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{investment.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{investment.description}</p>
                          <p className="text-xs font-medium text-blue-600">Max: {formatCurrency(investment.limit)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                  <li>• New regime has lower rates but no deductions</li>
                  <li>• Old regime allows 80C, HRA, home loan deductions</li>
                  <li>• You can switch regimes every year</li>
                  <li>• Standard deduction: ₹75K (new), ₹50K (old)</li>
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
                  <Link href="/en/calculators/fd" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mr-3">🏦</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">FD Calculator</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HRA Calculator Modal */}
      <div id="hra-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
          <h3 className="font-semibold text-lg mb-4">HRA Exemption Calculator</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Basic Salary</label>
              <input
                type="number"
                value={hraDetails.basicSalary}
                onChange={(e) => setHraDetails({...hraDetails, basicSalary: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HRA Received</label>
              <input
                type="number"
                value={hraDetails.hraReceived}
                onChange={(e) => setHraDetails({...hraDetails, hraReceived: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rent Paid</label>
              <input
                type="number"
                value={hraDetails.rentPaid}
                onChange={(e) => setHraDetails({...hraDetails, rentPaid: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hraDetails.isMetroCity}
                onChange={(e) => setHraDetails({...hraDetails, isMetroCity: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm">Metro City (Mumbai, Delhi, Chennai, Kolkata)</span>
            </label>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button
              onClick={calculateHRA}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Calculate & Apply
            </button>
            <button
              onClick={() => document.getElementById('hra-modal')?.classList.add('hidden')}
              className="flex-1 bg-gray-300 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      
      <FooterAdSlot />
    </div>
  );
}