'use client';

import { useState, useEffect } from 'react';
import { Home, Calculator, Target, IndianRupee, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { calculateEMI, calculateLoanForEMI, calculateAffordableEMI, EMIInput } from '@/lib/calculators/emi';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import Link from 'next/link';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function EMICalculatorClient() {
  const [input, setInput] = useState<EMIInput>({
    loanAmount: 2500000,
    interestRate: 8.5,
    loanTenure: 20,
    tenureType: 'years',
  });

  const [mode, setMode] = useState<'calculate' | 'affordability'>('calculate');
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMIs, setExistingEMIs] = useState(0);
  const [result, setResult] = useState(calculateEMI(input));

  useEffect(() => {
    setResult(calculateEMI(input));
  }, [input]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = [
    { name: 'Principal Amount', value: input.loanAmount, color: CHART_COLORS[0] },
    { name: 'Total Interest', value: result.totalInterest, color: CHART_COLORS[1] },
  ];

  const affordableEMI = calculateAffordableEMI(monthlyIncome, existingEMIs);
  const maxLoanAmount = calculateLoanForEMI(affordableEMI, input.interestRate, input.loanTenure);

  return (
    <CalculatorLayout
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment for home loans, car loans, and personal loans"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMode('calculate')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === 'calculate'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-500'
                  }`}
                >
                  <Calculator className="h-4 w-4 inline mr-2" />
                  Calculate EMI
                </button>
                <button
                  onClick={() => setMode('affordability')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === 'affordability'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-500'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  Affordability
                </button>
              </div>
            </div>

            {mode === 'affordability' && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Income Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter monthly income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Existing EMIs (₹)
                    </label>
                    <input
                      type="number"
                      value={existingEMIs}
                      onChange={(e) => setExistingEMIs(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter existing EMIs"
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Affordable EMI:</strong> {formatCurrency(affordableEMI)} (50% of income)
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Max Loan Amount:</strong> {formatCurrency(maxLoanAmount)}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={input.loanAmount}
                  onChange={(e) => setInput({ ...input, loanAmount: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={input.interestRate}
                  onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interest rate"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loan Tenure
                  </label>
                  <input
                    type="number"
                    value={input.loanTenure}
                    onChange={(e) => setInput({ ...input, loanTenure: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tenure"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tenure Type
                  </label>
                  <select
                    value={input.tenureType}
                    onChange={(e) => setInput({ ...input, tenureType: e.target.value as 'years' | 'months' })}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-slate-800"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none mt-7">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar with Results */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Monthly EMI</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.emi)}</p>
                </div>
                <IndianRupee className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Amount</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(result.totalAmount)}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Interest</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Principal vs Interest Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Loan Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment Schedule Chart */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Year-wise Payment Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={result.yearlyBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(Number(value)), name]}
              labelFormatter={(year) => `Year ${year}`}
            />
            <Legend />
            <Bar
              dataKey="principalPaid"
              stackId="payment"
              fill={CHART_COLORS[0]}
              name="Principal Paid"
            />
            <Bar
              dataKey="interestPaid"
              stackId="payment"
              fill={CHART_COLORS[1]}
              name="Interest Paid"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Comprehensive EMI Guide Content */}
      <div className="mt-8 space-y-12">
        
        {/* What is EMI Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">What is EMI (Equated Monthly Installment)?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              EMI (Equated Monthly Installment) is a fixed amount paid by borrowers to lenders at a specified date each month. EMIs consist of both principal and interest components, calculated to ensure the loan is fully repaid over the agreed tenure.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The EMI amount remains constant throughout the loan tenure, but the proportion of principal and interest changes. Initially, the interest component is higher, and gradually, the principal component increases as you pay down the loan.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                💡 Key Benefits of EMI Structure
              </h3>
              <ul className="text-blue-800 dark:text-blue-300 text-sm space-y-1">
                <li>• Predictable monthly payments for better budgeting</li>
                <li>• Enables purchase of assets beyond immediate paying capacity</li>
                <li>• Tax benefits available on home loan EMIs</li>
                <li>• Builds credit history when paid regularly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* EMI Formula Calculation */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">How EMI is Calculated</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">EMI Formula</h3>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg mb-4 border">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">EMI = </p>
                  <div className="text-lg font-mono bg-gray-100 dark:bg-slate-700 p-4 rounded">
                    P × r × (1 + r)ⁿ<br/>
                    <span className="border-t border-gray-400 block mt-2 pt-2">((1 + r)ⁿ - 1)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <p><strong>P</strong> = Principal loan amount</p>
                <p><strong>r</strong> = Monthly interest rate (Annual rate ÷ 12)</p>
                <p><strong>n</strong> = Number of monthly installments</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Example Calculation</h3>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border">
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>Loan Amount (P):</strong> ₹25,00,000</p>
                  <p><strong>Annual Interest Rate:</strong> 8.5%</p>
                  <p><strong>Monthly Rate (r):</strong> 8.5% ÷ 12 = 0.708%</p>
                  <p><strong>Tenure:</strong> 20 years (240 months)</p>
                  <div className="border-t pt-3 mt-4">
                    <p className="text-green-600 dark:text-green-400 font-bold text-lg">
                      <strong>EMI = ₹21,738</strong>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Total Interest: ₹27,17,120
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Loans and EMI Rates */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Types of Loans and Current EMI Rates (2026)</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">Home Loan</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li><strong>Interest Rate:</strong> 8.5% - 9.5%</li>
                <li><strong>Max Tenure:</strong> 30 years</li>
                <li><strong>Loan Amount:</strong> Up to ₹10 crore</li>
                <li><strong>Tax Benefits:</strong> ₹2L interest + ₹1.5L principal</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded border">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Example:</strong> ₹50L at 9% for 20 years<br/>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">EMI: ₹44,986</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">Car Loan</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li><strong>Interest Rate:</strong> 8.5% - 11%</li>
                <li><strong>Max Tenure:</strong> 7 years</li>
                <li><strong>Loan Amount:</strong> Up to ₹1 crore</li>
                <li><strong>Down Payment:</strong> 10% - 20%</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded border">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Example:</strong> ₹8L at 10% for 5 years<br/>
                  <span className="text-green-600 dark:text-green-400 font-semibold">EMI: ₹16,997</span>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">Personal Loan</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li><strong>Interest Rate:</strong> 10% - 18%</li>
                <li><strong>Max Tenure:</strong> 5 years</li>
                <li><strong>Loan Amount:</strong> Up to ₹40 lakh</li>
                <li><strong>Processing:</strong> Quick approval</li>
              </ul>
              <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded border">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Example:</strong> ₹5L at 14% for 3 years<br/>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">EMI: ₹17,063</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              💡 Pro Tip: EMI to Income Ratio
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Financial experts recommend keeping your total EMIs below 40-50% of your monthly income. This ensures you have enough liquidity for other expenses and emergencies. Use our affordability calculator above to determine your ideal loan amount.
            </p>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Related Financial Calculators</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/en/calculators/sip" className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 p-6 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600">SIP Calculator</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Plan your mutual fund investments while managing loan EMIs effectively</p>
            </Link>

            <Link href="/en/calculators/ppf" className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 p-6 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600">PPF Calculator</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Build long-term wealth while servicing your home loan EMIs</p>
            </Link>

            <Link href="/en/tax/new-vs-old-regime" className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-6 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600">Tax Calculator</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Optimize tax savings with home loan deductions and investment planning</p>
            </Link>
          </div>
        </div>

        {/* Updated for FY 2026-27 Notice */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Updated for FY 2026-27</h3>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                All EMI calculations, interest rates, and tax information are updated for the current financial year. Interest rates reflect current market conditions as of April 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4">⚠️ Important Disclaimer</h3>
          <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed mb-4">
            This EMI calculator is for educational and planning purposes only. Actual EMI amounts may vary based on bank policies, processing fees, insurance requirements, and other factors. Interest rates are indicative and can change based on market conditions and your credit profile.
          </p>
          <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
            Always verify EMI calculations with your lender before making financial commitments. Consider consulting with certified financial advisors for personalized loan and investment planning advice.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}