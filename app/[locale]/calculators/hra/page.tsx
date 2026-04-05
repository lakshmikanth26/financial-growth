'use client';

import { useState, useEffect } from 'react';
import { Home, Calculator, IndianRupee, Building } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateHRA, calculateAnnualHRA, getMetroCities, HRAInput } from '@/lib/calculators/hra';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { HeaderAdSlot, SidebarAdSlot, FooterAdSlot } from '@/components/layout/AdSlot';

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function HRACalculatorPage() {
  const [input, setInput] = useState<HRAInput>({
    basicSalary: 50000,
    hraReceived: 20000,
    rentPaid: 25000,
    city: 'metro',
  });

  const [calculationType, setCalculationType] = useState<'monthly' | 'annual'>('monthly');
  const [result, setResult] = useState(calculateHRA(input));

  useEffect(() => {
    if (calculationType === 'monthly') {
      setResult(calculateHRA(input));
    } else {
      setResult(calculateAnnualHRA(input));
    }
  }, [input, calculationType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = [
    { name: 'HRA Exemption', value: result.hraExemption, color: CHART_COLORS[1] },
    { name: 'Taxable HRA', value: result.taxableHRA, color: CHART_COLORS[3] },
  ];

  const barData = [
    {
      name: 'Actual HRA',
      amount: result.exemptionBreakdown.actualHRA,
    },
    {
      name: 'Rent - 10% Basic',
      amount: result.exemptionBreakdown.rentMinusBasic,
    },
    {
      name: `${input.city === 'metro' ? '50%' : '40%'} of Basic`,
      amount: result.exemptionBreakdown.basicPercentage,
    },
  ];

  const metroCities = getMetroCities();

  return (
    <CalculatorLayout
      title="HRA Calculator"
      description="Calculate your House Rent Allowance exemption and taxable HRA amount"
      icon={<Home className="h-8 w-8 text-white" />}
    >
      <HeaderAdSlot />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCalculationType('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    calculationType === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Calculator className="h-4 w-4 inline mr-2" />
                  Monthly
                </button>
                <button
                  onClick={() => setCalculationType('annual')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    calculationType === 'annual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Building className="h-4 w-4 inline mr-2" />
                  Annual
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basic Salary (₹) - {calculationType}
                </label>
                <input
                  type="number"
                  value={input.basicSalary}
                  onChange={(e) => setInput({ ...input, basicSalary: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter basic salary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HRA Received (₹) - {calculationType}
                </label>
                <input
                  type="number"
                  value={input.hraReceived}
                  onChange={(e) => setInput({ ...input, hraReceived: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter HRA received"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Paid (₹) - {calculationType}
                </label>
                <input
                  type="number"
                  value={input.rentPaid}
                  onChange={(e) => setInput({ ...input, rentPaid: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter rent paid"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Type
                </label>
                <select
                  value={input.city}
                  onChange={(e) => setInput({ ...input, city: e.target.value as 'metro' | 'non-metro' })}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="metro">Metro City (50% exemption)</option>
                  <option value="non-metro">Non-Metro City (40% exemption)</option>
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

          {/* Metro Cities Info */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Metro Cities (50% exemption)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {metroCities.map((city) => (
                <div key={city} className="text-sm text-blue-800 bg-white px-3 py-1 rounded-lg">
                  {city}
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 mt-3">
              All other cities are considered non-metro with 40% exemption limit.
            </p>
          </div>
        </div>

        {/* Sidebar with Results */}
        <div className="space-y-6">
          <SidebarAdSlot />
          
          {/* Summary Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">HRA Exemption</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.hraExemption)}</p>
                </div>
                <Home className="h-8 w-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Taxable HRA</p>
                  <p className="text-2xl font-bold">{formatCurrency(result.taxableHRA)}</p>
                </div>
                <IndianRupee className="h-8 w-8 text-red-200" />
              </div>
            </div>
          </div>

          {/* HRA Breakdown Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">HRA Breakdown</h3>
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
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

      {/* Exemption Calculation Chart */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">HRA Exemption Calculation</h3>
        <p className="text-gray-600 mb-6">
          HRA exemption is the <strong>minimum</strong> of the following three amounts:
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="amount" fill={CHART_COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Your exemption:</strong> {formatCurrency(result.hraExemption)} 
            (minimum of the three amounts above)
          </p>
        </div>
      </div>

      {/* HRA Rules */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">HRA Exemption Rules</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Conditions for HRA Exemption</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                You must be paying rent for accommodation
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                You must be receiving HRA from employer
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Rent paid should exceed 10% of basic salary
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                You should not own the house you're living in
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Rent receipts or rental agreement
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Landlord's PAN (if rent > ₹1 lakh/year)
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Declaration to employer about HRA claim
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                No ownership certificate (if required)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FooterAdSlot />
    </CalculatorLayout>
  );
}