'use client';

import { useState, useEffect } from 'react';
import { User, Target, Calculator, IndianRupee, PiggyBank } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateNPS, calculateNPSForTarget, NPSInput } from '@/lib/calculators/nps';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function NPSCalculatorPage() {
  const [input, setInput] = useState<NPSInput>({
    currentAge: 30,
    retirementAge: 60,
    monthlyContribution: 5000,
    expectedReturn: 10,
    annuityReturn: 6,
  });

  const [mode, setMode] = useState<'calculate' | 'target'>('calculate');
  const [targetCorpus, setTargetCorpus] = useState(5000000);
  const [result, setResult] = useState(calculateNPS(input));

  useEffect(() => {
    try {
      if (mode === 'calculate') {
        setResult(calculateNPS(input));
      } else {
        const requiredContribution = calculateNPSForTarget(targetCorpus, input.currentAge, input.retirementAge, input.expectedReturn);
        const targetInput = { ...input, monthlyContribution: requiredContribution };
        setResult(calculateNPS(targetInput));
        setInput(targetInput);
      }
    } catch (error) {
      console.error('NPS calculation error:', error);
    }
  }, [input, mode, targetCorpus]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = [
    { name: 'Lump Sum (60%)', value: result.lumpSumAmount, color: CHART_COLORS[0] },
    { name: 'Annuity (40%)', value: result.annuityAmount, color: CHART_COLORS[1] },
  ];

  return (
    <CalculatorLayout
      title="NPS Calculator"
      description="Calculate your National Pension System corpus and retirement planning"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMode('calculate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'calculate'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Calculator className="h-4 w-4 inline mr-2" />
                Calculate NPS
              </button>
              <button
                onClick={() => setMode('target')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'target'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Target className="h-4 w-4 inline mr-2" />
                Target Corpus
              </button>
            </div>
          </div>

          {mode === 'target' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Corpus (₹)
              </label>
              <input
                type="number"
                value={targetCorpus}
                onChange={(e) => setTargetCorpus(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter target corpus"
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={input.currentAge}
                onChange={(e) => setInput({ ...input, currentAge: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current age"
                min="18"
                max="65"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Age
              </label>
              <input
                type="number"
                value={input.retirementAge}
                onChange={(e) => setInput({ ...input, retirementAge: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter retirement age"
                min="60"
                max="75"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum retirement age is 60 years for NPS
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution (₹)
              </label>
              <input
                type="number"
                value={input.monthlyContribution}
                onChange={(e) => setInput({ ...input, monthlyContribution: Number(e.target.value) })}
                disabled={mode === 'target'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter monthly contribution"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={input.expectedReturn}
                onChange={(e) => setInput({ ...input, expectedReturn: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter expected return"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annuity Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={input.annuityReturn || 6}
                onChange={(e) => setInput({ ...input, annuityReturn: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter annuity return"
              />
              <p className="text-sm text-gray-500 mt-1">
                Expected return on annuity portion (40% of corpus)
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
                  <p className="text-blue-100 text-sm font-medium">Total Corpus</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 text-sm font-medium">Total Investment</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalInvestment)}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 text-sm font-medium">Total Returns</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(result.totalReturns)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                <p className="text-green-100 text-sm font-medium">Lump Sum (60%)</p>
                <p className="text-lg font-bold">{formatCurrency(result.lumpSumAmount)}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                <p className="text-purple-100 text-sm font-medium">Monthly Pension</p>
                <p className="text-lg font-bold">{formatCurrency(result.monthlyPension)}</p>
              </div>
            </div>
          </div>

          {/* Withdrawal Breakdown Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Breakdown</h3>
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
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Age-wise Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={result.yearlyBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(Number(value)), name]}
              labelFormatter={(age) => `Age ${age}`}
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

      {/* NPS Benefits */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">NPS Benefits</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Tax Benefits</h4>
            <p className="text-gray-600 text-sm">Additional ₹50,000 deduction under Section 80CCD(1B)</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Retirement Planning</h4>
            <p className="text-gray-600 text-sm">Systematic retirement corpus building with government backing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Guaranteed Pension</h4>
            <p className="text-gray-600 text-sm">40% corpus converted to annuity for lifelong pension</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-2">Important Note:</h4>
          <p className="text-gray-700 text-sm">
            At retirement, 60% of the corpus can be withdrawn as lump sum (tax-free up to certain limits), 
            while 40% must be used to purchase an annuity for monthly pension. Early exit before 60 years 
            allows only 20% lump sum withdrawal.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}