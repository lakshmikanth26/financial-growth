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
                    : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-500'
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
                    : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-500'
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-slate-600"
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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

      {/* Comprehensive SIP Guide Content */}
      <div className="mt-8 space-y-12">
        
        {/* What is SIP Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">What is SIP (Systematic Investment Plan)?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A Systematic Investment Plan (SIP) is a disciplined approach to investing in mutual funds where you invest a fixed amount regularly (monthly, quarterly, or yearly) regardless of market conditions. SIP allows you to invest small amounts consistently over time, making it perfect for building long-term wealth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              In India, SIP has become one of the most popular investment methods, with over 5.4 crore active SIP accounts as of 2026. The beauty of SIP lies in its simplicity – you can start with as little as ₹500 per month and gradually build a substantial corpus through the power of compounding.
            </p>
          </div>
        </div>

        {/* How SIP Returns are Calculated */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">How SIP Returns are Calculated</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">SIP Formula</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  FV = PMT × (((1 + r)^n - 1) / r) × (1 + r)
                </code>
              </div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>FV</strong> = Future Value (Maturity Amount)</li>
                <li><strong>PMT</strong> = Monthly Investment Amount</li>
                <li><strong>r</strong> = Monthly Interest Rate (Annual Rate/12)</li>
                <li><strong>n</strong> = Number of Monthly Investments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Example Calculation</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Monthly SIP:</strong> ₹10,000</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Investment Period:</strong> 15 years</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Expected Return:</strong> 12% annually</p>
                <p className="text-green-600 font-bold text-lg mt-4">Maturity Value: ₹50,01,148</p>
                <p className="text-gray-600 dark:text-gray-400">Total Invested: ₹18,00,000</p>
                <p className="text-gray-600 dark:text-gray-400">Wealth Gain: ₹32,01,148</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits of SIP Investing */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Benefits of SIP Investing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Rupee Cost Averaging</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                SIP reduces the impact of market volatility by buying more units when markets are low and fewer when high, averaging out your purchase cost over time.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Goal-based Investing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Perfect for achieving specific financial goals like children's education, home purchase, or retirement planning with disciplined monthly investments.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Power of Compounding</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Your money grows exponentially over time as returns generate their own returns, creating substantial wealth through consistent investing.
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">💰</div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Affordable Investment</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Start with just ₹500 per month. No need to time the market or invest large lump sums. Perfect for middle-class Indians to build wealth gradually.
              </p>
            </div>
            <div className="text-center p-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
              <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🤖</div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Automated Discipline</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Once set up, SIP automatically deducts from your bank account, ensuring consistent investment without the temptation to skip or delay.
              </p>
            </div>
            <div className="text-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🛡️</div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Tax Benefits</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                ELSS SIP offers tax deduction up to ₹1.5 lakh under Section 80C, plus long-term capital gains up to ₹1 lakh are tax-free.
              </p>
            </div>
          </div>
        </div>

        {/* Real-world SIP Examples */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Real SIP Success Stories & Examples</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Example 1: Child's Education Planning</h3>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300"><strong>Goal:</strong> ₹50 lakh for child's education in 18 years</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Required SIP:</strong> ₹8,500 per month</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Expected Return:</strong> 12% annually</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Total Invested:</strong> ₹18,36,000</p>
                <p className="text-green-600 font-bold"><strong>Corpus Built:</strong> ₹50,12,456</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Example 2: Retirement Planning</h3>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300"><strong>Goal:</strong> ₹2 crore retirement corpus in 25 years</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Required SIP:</strong> ₹15,000 per month</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Expected Return:</strong> 12% annually</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Total Invested:</strong> ₹45,00,000</p>
                <p className="text-blue-600 font-bold"><strong>Corpus Built:</strong> ₹2,01,56,789</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">💡 Pro Tip: Step-Up SIP</h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Increase your SIP amount by 10-15% annually to keep pace with salary increments and inflation. A ₹5,000 SIP with 10% annual step-up can grow to ₹15,000+ in 10 years, significantly boosting your wealth creation.
            </p>
          </div>
        </div>

        {/* How Inflation Affects SIP */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">How Inflation Affects Your SIP Investment</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Understanding Inflation Impact</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                With average inflation of 5-6% in India, your money's purchasing power decreases over time. What costs ₹1 lakh today will cost approximately ₹2.65 lakh after 20 years at 5% inflation.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                This is why SIP investments in equity mutual funds, which historically deliver 12-15% returns, are crucial for beating inflation and building real wealth.
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inflation Example</h4>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  A car costing ₹10 lakh today will cost ₹26.5 lakh in 20 years (5% inflation). Your SIP needs to beat this inflation to maintain purchasing power.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">SIP vs Inflation: Real Returns</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Bank Savings (4% return)</p>
                  <p className="text-red-600 text-sm">Real Return: -1% to -2% (loses to inflation)</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Fixed Deposits (6-7% return)</p>
                  <p className="text-orange-600 text-sm">Real Return: 1-2% (barely beats inflation)</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Equity SIP (12% return)</p>
                  <p className="text-green-600 text-sm">Real Return: 6-7% (significantly beats inflation)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax on Mutual Fund SIP */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Tax on Mutual Fund SIP in India (2026)</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Equity Mutual Fund SIP Taxation</h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Short-term Capital Gains (STCG)</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Holding period: Less than 1 year</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Tax Rate:</strong> 15% + 4% cess</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Long-term Capital Gains (LTCG)</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Holding period: More than 1 year</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Tax Rate:</strong> 10% on gains above ₹1 lakh annually</p>
                  <p className="text-green-600 text-sm font-medium">First ₹1 lakh gain per year is tax-free!</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">ELSS SIP Tax Benefits</h3>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Triple Tax Advantage</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>1. Investment Deduction:</strong> Up to ₹1.5 lakh under Section 80C</li>
                  <li><strong>2. Tax-free Growth:</strong> No tax on gains until withdrawal</li>
                  <li><strong>3. Tax-free Withdrawal:</strong> LTCG up to ₹1 lakh annually is exempt</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                    Tax Saving: ₹46,800 annually (₹1.5L investment × 31.2% tax rate)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIP Mistakes to Avoid */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Common SIP Mistakes Beginners Make</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Stopping SIP During Market Downturns</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Many investors panic and stop SIP when markets fall. This defeats the purpose of rupee cost averaging. Market downturns are actually the best time to accumulate more units at lower prices.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Choosing Funds Based on Past Returns</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Past performance doesn't guarantee future returns. Focus on fund management consistency, expense ratio, and alignment with your risk tolerance rather than just high past returns.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Starting Too Late</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Delaying SIP by even 5 years can reduce your final corpus by 40-50%. The power of compounding works best over longer periods. Start today, even with a small amount.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Stay Consistent and Patient</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Continue your SIP regardless of market conditions. Successful SIP investors are those who stay invested for 10+ years without interruption.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Choose Right Fund Category</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Large-cap funds for stability, mid-cap for growth, small-cap for high growth (with higher risk). Diversify across categories based on your risk appetite and investment horizon.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Increase SIP with Income Growth</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Implement a step-up SIP strategy. Increase your SIP amount by 10-15% annually or whenever you get a salary hike to accelerate wealth creation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Frequently Asked Questions About SIP</h2>
          
          <div className="space-y-6">
            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">What is the minimum amount required to start SIP?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>You can start SIP with as little as ₹500 per month in most mutual funds. However, for better wealth creation, it's recommended to start with at least ₹1,000-2,000 per month. Many investors gradually increase their SIP amount as their income grows.</p>
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">How long should I continue my SIP investment?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>SIP works best when continued for at least 5-7 years, but ideally 10+ years for maximum benefit from compounding. The longer you stay invested, the better your returns. For retirement planning, continue for 20-30 years. For short-term goals (less than 3 years), SIP in equity funds is not recommended.</p>
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Can I stop or pause my SIP anytime?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Yes, SIP offers complete flexibility. You can stop, pause, or modify your SIP amount at any time without any penalty. However, it's advisable to continue during market downturns as they provide opportunity to buy more units at lower prices. Only stop SIP for genuine financial emergencies.</p>
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Which mutual fund category is best for SIP?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>For long-term wealth creation (7+ years): Large-cap and Multi-cap funds offer good balance of growth and stability. For aggressive growth (high risk): Mid-cap and Small-cap funds. For tax saving: ELSS funds with 3-year lock-in. For conservative investors: Hybrid or Balanced Advantage funds.</p>
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">What returns can I expect from SIP in 2026?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Historical data shows equity mutual funds have delivered 12-15% annual returns over 10+ year periods. However, returns vary based on market conditions and fund performance. Large-cap funds typically give 10-12%, mid-cap 12-15%, and small-cap 15-18% (with higher volatility). Never invest based on return expectations alone.</p>
              </div>
            </details>

            <details className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibent text-gray-900 dark:text-gray-100">Should I invest lump sum or continue SIP?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>SIP is generally better for most investors as it reduces timing risk and builds investment discipline. Lump sum can work well during market lows, but requires market timing skills. A hybrid approach works best: invest lump sum during major market corrections and continue regular SIP for dollar-cost averaging.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4">⚠️ Important Disclaimer</h3>
          <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
            This SIP calculator is for educational purposes only. Mutual fund investments are subject to market risks. Past performance does not guarantee future results. The calculations shown are estimates based on assumed rate of returns and do not guarantee actual returns. Please read all scheme-related documents carefully before investing. Consult your financial advisor for personalized investment advice based on your risk profile and financial goals.
          </p>
          <p className="text-orange-700 dark:text-orange-300 text-sm mt-4">
            <strong>Updated for FY 2026-27:</strong> All calculations and tax information reflect current Indian tax laws and mutual fund regulations as of April 2026.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}