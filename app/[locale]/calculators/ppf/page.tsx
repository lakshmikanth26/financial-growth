'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { calculatePPF, getCurrentPPFRate, type PPFInput } from '@/lib/calculators/ppf';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLORS = ['#1a56db', '#0e9f6e', '#ff5a1f'];

export default function PPFCalculatorPage() {
  const t = useTranslations('ppf');
  const tCommon = useTranslations('common');
  
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

  const relatedCalculators = [
    { name: 'FD Calculator', href: '/calculators/fd', icon: '🏦' },
    { name: 'SIP Calculator', href: '/calculators/sip', icon: '📈' },
    { name: 'NPS Calculator', href: '/calculators/nps', icon: '👴' },
    { name: 'Tax Calculator', href: '/tax/new-vs-old-regime', icon: '💰' }
  ];

  const inputForm = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('yearlyDeposit')}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            min="500"
            max="150000"
            value={inputs.yearlyDeposit}
            onChange={(e) => setInputs({...inputs, yearlyDeposit: Number(e.target.value)})}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{t('minDeposit')} - {t('maxDeposit')}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('tenure')}
        </label>
        <select
          value={inputs.tenure}
          onChange={(e) => setInputs({...inputs, tenure: Number(e.target.value)})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={15}>15 years (Minimum)</option>
          <option value={20}>20 years (15 + 5 extension)</option>
          <option value={25}>25 years (15 + 10 extension)</option>
          <option value={30}>30 years (15 + 15 extension)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">{t('lockIn')}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('currentRate')}
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            max="15"
            step="0.1"
            value={inputs.currentRate}
            onChange={(e) => setInputs({...inputs, currentRate: Number(e.target.value)})}
            className="w-full px-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
        </div>
        <p className="text-xs text-green-600 mt-1">{t('taxFree')}</p>
      </div>
    </div>
  );

  const resultCard = result && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-blue-600 mb-2">{t('maturityAmount')}</h3>
        <p className="result-number text-blue-600">{formatCurrency(result.maturityAmount)}</p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-green-600 mb-2">{t('totalInterest')}</h3>
        <p className="result-number text-green-600">{formatCurrency(result.totalInterest)}</p>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{t('totalInvested')}</h3>
        <p className="result-number text-gray-600">{formatCurrency(result.totalInvested)}</p>
      </div>
    </div>
  );

  const chartSection = result && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div>
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
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
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
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
  );

  const faqSection = (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((num) => (
        <details key={num} className="group">
          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-900">{t(`faq.q${num}`)}</span>
            <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-4 text-gray-700 border-l-4 border-blue-200 ml-4 mt-2">
            {t(`faq.a${num}`)}
          </div>
        </details>
      ))}
    </div>
  );

  return (
    <CalculatorLayout
      title={t('title')}
      description={t('metaDescription')}
      result={resultCard}
      chart={chartSection}
      faq={faqSection}
      relatedCalculators={relatedCalculators}
    >
      {inputForm}
    </CalculatorLayout>
  );
}