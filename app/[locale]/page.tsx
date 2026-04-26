import Link from 'next/link';
import { Calculator, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react';

export default async function SimplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const popularCalculators = [
    {
      name: 'PPF Calculator',
      description: 'Calculate PPF maturity amount with 15-year lock-in',
      href: `/${locale}/calculators/ppf`,
      icon: '🏛️',
      popular: true
    },
    {
      name: 'SIP Calculator', 
      description: 'Calculate SIP returns and wealth growth over time',
      href: `/${locale}/calculators/sip`,
      icon: '📈',
      popular: true
    },
    {
      name: 'Tax Calculator',
      description: 'Compare new vs old tax regime for FY 2025-26',
      href: `/${locale}/tax/new-vs-old-regime`,
      icon: '💰',
      popular: true
    },
    {
      name: 'FD Calculator',
      description: 'Calculate fixed deposit maturity with compound interest',
      href: `/${locale}/calculators/fd`,
      icon: '🏦',
      popular: true
    },
    {
      name: 'EMI Calculator',
      description: 'Calculate loan EMI, interest and amortization schedule',
      href: `/${locale}/calculators/emi`,
      icon: '🏠',
      popular: true
    },
    {
      name: 'NPS Calculator',
      description: 'Calculate NPS corpus and monthly pension amount',
      href: `/${locale}/calculators/nps`,
      icon: '👴',
      popular: true
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant calculations with real-time results as you type'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'All calculations happen in your browser. No data stored.'
    },
    {
      icon: Globe,
      title: 'Multilingual',
      description: 'Available in 8 Indian languages including Hindi, Tamil, Telugu'
    },
    {
      icon: Users,
      title: 'User Friendly',
      description: 'Used by investors, professionals and financial advisors across India'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-800 dark:via-slate-900 dark:to-emerald-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bold text-4xl lg:text-6xl text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">
              <span className="text-emerald-600">Smart Money</span><br />
              for Every Indian
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Calculate. Plan. Grow. Make informed investment decisions 
              with BharatFin's free, accurate financial calculators designed for Indian investors.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">0s</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Load Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 bg-white dark:bg-slate-800 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Popular Financial Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Most used calculators by Indian investors and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{calc.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 mb-2">
                      {calc.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {calc.description}
                    </p>
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      Calculate Now
                      <TrendingUp className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Why Choose BharatFin?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Built specifically for Indian investors with accuracy and speed in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Latest Financial Insights & Guides
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expert analysis, investment strategies, and comprehensive guides to help you make informed financial decisions in 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href={`/${locale}/blog/sip-mistakes-beginners-india`}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">Investment</span>
                  <span className="mx-2">•</span>
                  <span>12 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Top 10 SIP Mistakes Indian Beginners Make
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  Avoid costly SIP investment mistakes that can hurt your wealth creation. Learn the common errors Indian investors make and expert tips to maximize returns.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/blog/home-loan-prepayment-guide-india`}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">Planning</span>
                  <span className="mx-2">•</span>
                  <span>14 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Home Loan Prepayment vs Investment Guide
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  Should you prepay your home loan or invest the money? Complete analysis with decision framework for Indian homeowners in 2026.
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/blog/nps-vs-ppf-retirement-planning`}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">Retirement</span>
                  <span className="mx-2">•</span>
                  <span>16 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  NPS vs PPF: Complete Retirement Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  Detailed analysis of returns, tax benefits, withdrawal rules, and expert recommendations to choose the best option for your retirement.
                </p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Articles
              <TrendingUp className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Financial Planning for Different Life Stages */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Financial Planning for Every Life Stage
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tailored financial strategies and calculator recommendations based on your age and life goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-4">👨‍🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Young Professional (22-30)
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2 mb-4">
                <li>• Start SIP with ₹2,000-5,000/month</li>
                <li>• Build emergency fund (6 months)</li>
                <li>• Focus on ELSS for tax saving</li>
                <li>• Term insurance planning</li>
              </ul>
              <div className="flex space-x-2">
                <Link href={`/${locale}/calculators/sip`} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">SIP Calc</Link>
                <Link href={`/${locale}/tax/new-vs-old-regime`} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">Tax Calc</Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Mid-Career (30-40)
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2 mb-4">
                <li>• Increase SIP to ₹10,000+/month</li>
                <li>• Home loan planning & EMI calculation</li>
                <li>• Child education fund planning</li>
                <li>• PPF maximization (₹1.5L annually)</li>
              </ul>
              <div className="flex space-x-2">
                <Link href={`/${locale}/calculators/emi`} className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">EMI Calc</Link>
                <Link href={`/${locale}/calculators/ppf`} className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">PPF Calc</Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="text-3xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Peak Career (40-50)
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2 mb-4">
                <li>• Aggressive retirement planning</li>
                <li>• NPS additional contributions</li>
                <li>• Debt consolidation strategies</li>
                <li>• High-value insurance planning</li>
              </ul>
              <div className="flex space-x-2">
                <Link href={`/${locale}/calculators/nps`} className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">NPS Calc</Link>
                <Link href={`/${locale}/calculators/fd`} className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">FD Calc</Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-4">👴</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Pre-Retirement (50+)
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2 mb-4">
                <li>• Conservative investment approach</li>
                <li>• FD vs debt fund comparison</li>
                <li>• Health insurance optimization</li>
                <li>• Estate planning basics</li>
              </ul>
              <div className="flex space-x-2">
                <Link href={`/${locale}/calculators/fd`} className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">FD Calc</Link>
                <Link href={`/${locale}/calculators/rd`} className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">RD Calc</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Financial Trends 2026 */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Key Financial Updates for 2026
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay updated with the latest rates, tax changes, and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">7.1%</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">PPF Interest Rate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Q1 FY 2026-27</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Current PPF rate remains stable at 7.1% per annum. With tax-free returns, 
                effective yield is higher for investors in 20-30% tax brackets.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">₹2L</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tax Deduction Limit</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">80C + 80CCD(1B)</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Maximum tax deduction of ₹2 lakh possible: ₹1.5L under Section 80C 
                plus additional ₹50k under 80CCD(1B) for NPS contributions.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">6-7%</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">FD Interest Rates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Major Banks Average</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Fixed deposit rates range from 6.0% to 7.5% across major banks. 
                Senior citizens get additional 0.25-0.5% premium on FD rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Switcher - Simplified */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-6">
            Available in Multiple Indian Languages
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Access our calculators and content in your preferred language for better understanding of financial concepts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'en', name: 'English', flag: '🇮🇳' },
              { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
            ].map((lang) => (
              <div
                key={lang.code}
                className={`p-4 border rounded-lg ${
                  locale === lang.code ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</div>
              </div>
            ))}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg opacity-60">
              <div className="text-2xl mb-2">🚧</div>
              <div className="font-medium text-gray-500 dark:text-gray-400 text-sm">More languages coming soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="h-8 w-8 text-emerald-400" />
            <span className="font-bold text-xl">
              BharatFin <span className="text-emerald-400">India</span>
            </span>
          </div>
          <p className="text-gray-300 dark:text-gray-200 mb-4">
            Smart Money for Every Indian. India's fastest financial calculators for smart investment decisions.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 BharatFin. Built with ❤️ for Indian investors.
          </p>
        </div>
      </footer>
    </div>
  );
}