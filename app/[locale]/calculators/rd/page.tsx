'use client';

import { useState, useEffect } from 'react';
import { PiggyBank, Target, Calculator, IndianRupee, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateRD, calculateRDForTarget, getBankRDRates, RDInput } from '@/lib/calculators/rd';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { HeaderAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function RDCalculatorPage() {
  const [input, setInput] = useState<RDInput>({
    monthlyDeposit: 5000,
    interestRate: 6.5,
    tenure: 60, // 5 years in months
    compoundingFrequency: 'quarterly',
  });

  const [mode, setMode] = useState<'calculate' | 'target'>('calculate');
  const [targetAmount, setTargetAmount] = useState(500000);
  const [result, setResult] = useState(calculateRD(input));

  useEffect(() => {
    if (mode === 'calculate') {
      setResult(calculateRD(input));
    } else {
      const requiredDeposit = calculateRDForTarget(targetAmount, input.interestRate, input.tenure);
      const targetInput = { ...input, monthlyDeposit: requiredDeposit };
      setResult(calculateRD(targetInput));
      setInput(targetInput);
    }
  }, [input, mode, targetAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = [
    { name: 'Total Deposited', value: result.totalDeposited, color: CHART_COLORS[0] },
    { name: 'Interest Earned', value: result.totalInterest, color: CHART_COLORS[1] },
  ];

  const bankRates = getBankRDRates();

  return (
    <CalculatorLayout
      title="RD Calculator"
      description="Calculate your Recurring Deposit maturity amount and plan your monthly savings"
    >
      <HeaderAdSlot />
      
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
                      : 'bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Calculator className="h-4 w-4 inline mr-2" />
                  Calculate RD
                </button>
                <button
                  onClick={() => setMode('target')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === 'target'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  Target Amount
                </button>
              </div>
            </div>

            {mode === 'target' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter target amount"
                />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Deposit (₹)
                </label>
                <input
                  type="number"
                  value={input.monthlyDeposit}
                  onChange={(e) => setInput({ ...input, monthlyDeposit: Number(e.target.value) })}
                  disabled={mode === 'target'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Enter monthly deposit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Interest Rate (%)
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
                    Tenure (Months)
                  </label>
                  <input
                    type="number"
                    value={input.tenure}
                    onChange={(e) => setInput({ ...input, tenure: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tenure in months"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={input.compoundingFrequency}
                    onChange={(e) => setInput({ ...input, compoundingFrequency: e.target.value as 'monthly' | 'quarterly' | 'annually' })}
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
            </div>
          </div>

          {/* Bank Rates */}
          <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Current RD Rates from Major Banks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(bankRates).map(([key, bank]) => (
                <div key={key} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{bank.bank}</div>
                  <div className="text-2xl font-bold text-blue-600">{bank.rate}%</div>
                  <button
                    onClick={() => setInput({ ...input, interestRate: bank.rate })}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Use this rate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar with Results */}
        <div className="space-y-6">
          <SidebarAdSlot />
          
          {/* Summary Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Maturity Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Deposited</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(result.totalDeposited)}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Interest Earned</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Investment Breakdown Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Investment Breakdown</h3>
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

      {/* Growth Chart */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Year-wise Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={result.yearlyBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(Number(value)), name]}
              labelFormatter={(year) => `Year ${year}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="deposited"
              stroke={CHART_COLORS[0]}
              strokeWidth={3}
              name="Total Deposited"
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke={CHART_COLORS[1]}
              strokeWidth={3}
              name="Total Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RD Benefits */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Why Choose Recurring Deposits?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Disciplined Savings</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Build a habit of regular monthly savings with guaranteed returns</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Higher Returns than Savings</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Earn better interest rates compared to regular savings accounts</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Flexible Tenure</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Choose tenure from 6 months to 10 years based on your goals</p>
          </div>
        </div>
      </div>

      <FooterAdSlot />
    </CalculatorLayout>
  );
}