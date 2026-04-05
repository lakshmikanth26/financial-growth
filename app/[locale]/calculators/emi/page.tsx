'use client';

import { useState, useEffect } from 'react';
import { Home, Calculator, Target, IndianRupee, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { calculateEMI, calculateLoanForEMI, calculateAffordableEMI, EMIInput } from '@/lib/calculators/emi';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { HeaderAdSlot, InContentAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function EMICalculatorPage() {
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
      <HeaderAdSlot />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
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
                  Calculate EMI
                </button>
                <button
                  onClick={() => setMode('affordability')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === 'affordability'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  Affordability
                </button>
              </div>
            </div>

            {mode === 'affordability' && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Income Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter monthly income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing EMIs (₹)
                    </label>
                    <input
                      type="number"
                      value={existingEMIs}
                      onChange={(e) => setExistingEMIs(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter existing EMIs"
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600">
                    <strong>Affordable EMI:</strong> {formatCurrency(affordableEMI)} (50% of income)
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Max Loan Amount:</strong> {formatCurrency(maxLoanAmount)}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={input.loanAmount}
                  onChange={(e) => setInput({ ...input, loanAmount: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={input.interestRate}
                  onChange={(e) => setInput({ ...input, interestRate: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interest rate"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure
                  </label>
                  <input
                    type="number"
                    value={input.loanTenure}
                    onChange={(e) => setInput({ ...input, loanTenure: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tenure"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure Type
                  </label>
                  <select
                    value={input.tenureType}
                    onChange={(e) => setInput({ ...input, tenureType: e.target.value as 'years' | 'months' })}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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

        {/* Sidebar with Results and Ad */}
        <div className="space-y-6">
          <SidebarAdSlot />
          
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
              <div className="bg-white rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 text-sm font-medium">Total Amount</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(result.totalAmount)}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border">
                <p className="text-gray-600 text-sm font-medium">Total Interest</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Principal vs Interest Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Breakdown</h3>
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
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Year-wise Payment Breakdown</h3>
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

      {/* Loan Types */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Loan Types</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Home Loan</h4>
            <p className="text-gray-600 text-sm">7.5% - 9.5% interest rate<br/>Up to 30 years tenure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Car Loan</h4>
            <p className="text-gray-600 text-sm">8.5% - 11% interest rate<br/>Up to 7 years tenure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personal Loan</h4>
            <p className="text-gray-600 text-sm">10% - 18% interest rate<br/>Up to 5 years tenure</p>
          </div>
        </div>
      </div>

      <FooterAdSlot />
    </CalculatorLayout>
  );
}