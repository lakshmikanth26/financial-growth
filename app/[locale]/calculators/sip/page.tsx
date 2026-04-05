'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Calculator, IndianRupee } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateSIP, calculateSIPForTarget, SIPInput } from '@/lib/calculators/sip';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function SIPCalculatorPage() {
  const [input, setInput] = useState<SIPInput>({
    monthlyInvestment: 5000,
    expectedReturn: 12,
    timePeriod: 10,
    stepUpPercentage: 0,
  });

  const [mode, setMode] = useState<'calculate' | 'target'>('calculate');
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [result, setResult] = useState(calculateSIP(input));

  useEffect(() => {
    if (mode === 'calculate') {
      setResult(calculateSIP(input));
    } else {
      const requiredSIP = calculateSIPForTarget(targetAmount, input.expectedReturn, input.timePeriod);
      const targetInput = { ...input, monthlyInvestment: requiredSIP };
      setResult(calculateSIP(targetInput));
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
    { name: 'Total Investment', value: result.totalInvestment, color: CHART_COLORS[0] },
    { name: 'Returns', value: result.totalReturns, color: CHART_COLORS[1] },
  ];

  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Calculate your Systematic Investment Plan returns and plan your wealth creation journey"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
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
                Calculate SIP
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
                Monthly Investment (₹)
              </label>
              <input
                type="number"
                value={input.monthlyInvestment}
                onChange={(e) => setInput({ ...input, monthlyInvestment: Number(e.target.value) })}
                disabled={mode === 'target'}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter monthly investment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={input.expectedReturn}
                onChange={(e) => setInput({ ...input, expectedReturn: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter expected return"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={input.timePeriod}
                onChange={(e) => setInput({ ...input, timePeriod: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter time period"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Step-up (%) - Optional
              </label>
              <input
                type="number"
                step="0.1"
                value={input.stepUpPercentage || 0}
                onChange={(e) => setInput({ ...input, stepUpPercentage: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter step-up percentage"
              />
              <p className="text-sm text-gray-500 mt-1">
                Increase your SIP amount by this percentage every year
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Maturity Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                </div>
                <IndianRupee className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Investment</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(result.totalInvestment)}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Returns</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(result.totalReturns)}</p>
              </div>
            </div>
          </div>

          {/* Investment vs Returns Chart */}
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
              dataKey="investment"
              stroke={CHART_COLORS[0]}
              strokeWidth={3}
              name="Total Investment"
            />
            <Line
              type="monotone"
              dataKey="totalValue"
              stroke={CHART_COLORS[1]}
              strokeWidth={3}
              name="Total Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Features */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Why Choose SIP?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Rupee Cost Averaging</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Reduce impact of market volatility through systematic investing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Goal-based Investing</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Plan for specific financial goals with disciplined investing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Power of Compounding</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Let your money grow exponentially over time</p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}