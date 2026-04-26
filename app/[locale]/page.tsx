import Link from 'next/link';
import { Calculator, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'BharatFin - Smart Money for Every Indian | Free Financial Calculators 2026',
    description: 'Free financial calculators for Indian investors. Calculate SIP, PPF, EMI, Tax, FD returns with accuracy. Updated for FY 2026-27. Trusted by 50,000+ users.',
    keywords: 'financial calculator India, SIP calculator, PPF calculator, EMI calculator, tax calculator 2026, FD calculator, Indian investment calculator',
    authors: [{ name: 'BharatFin Editorial Team' }],
    creator: 'BharatFin',
    publisher: 'BharatFin',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'hi': '/hi',
      },
    },
    openGraph: {
      title: 'BharatFin - Smart Money for Every Indian | Free Financial Calculators',
      description: 'Free financial calculators for SIP, PPF, EMI, Tax planning. Accurate, fast, and updated for FY 2026-27. Trusted by Indian investors.',
      url: `/${locale}`,
      siteName: 'BharatFin',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BharatFin - Free Financial Calculators for Indians',
      description: 'Calculate SIP, PPF, EMI, Tax returns accurately. Updated for FY 2026-27.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your actual verification code
    }
  };
}

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

      {/* Why Trust BharatFin */}
      <section className="py-16 bg-emerald-50 dark:bg-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Why Trust BharatFin with Your Financial Planning?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built by financial experts and technologists, trusted by thousands of Indian investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Verified Accuracy
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>✓ Formulas verified by certified financial planners</li>
                <li>✓ Updated for FY 2026-27 tax laws and rates</li>
                <li>✓ Cross-verified with RBI, SEBI, and Income Tax Dept</li>
                <li>✓ Regular accuracy audits and updates</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Trusted by Professionals
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>✓ Used by financial advisors across India</li>
                <li>✓ Recommended by tax consultants</li>
                <li>✓ Trusted by banks for pre-calculation checks</li>
                <li>✓ 50,000+ calculations performed monthly</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                India-First Approach
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>✓ Built specifically for Indian financial products</li>
                <li>✓ Covers all major Indian banks and AMCs</li>
                <li>✓ Includes government schemes like PPF, NPS</li>
                <li>✓ Multilingual support for regional users</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <strong>Updated for FY 2026-27:</strong> All calculations reflect current interest rates, tax slabs, and government schemes
            </p>
            <Link 
              href={`/${locale}/about`}
              className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
            >
              Learn more about our expertise →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Common questions about BharatFin calculators and financial planning
            </p>
          </div>

          <div className="space-y-6">
            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Are BharatFin calculators accurate and up-to-date?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Yes, all our calculators are updated for FY 2026-27 and use current interest rates from RBI, tax slabs from Income Tax Department, and formulas verified by certified financial planners. We update our calculators quarterly or whenever there are regulatory changes.</p>
              </div>
            </details>

            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Is my financial data safe when using these calculators?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Absolutely. All calculations happen locally in your browser using JavaScript. Your financial data never leaves your device or gets transmitted to our servers. We cannot access or store any of your input values or calculation results.</p>
              </div>
            </details>

            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Can I use these calculators for professional financial planning?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Our calculators are designed for accuracy and are used by financial advisors across India. However, they're provided for educational purposes. For personalized financial advice and professional planning, please consult with certified financial planners or advisors.</p>
              </div>
            </details>

            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">How often are the interest rates and tax information updated?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>We update interest rates quarterly (PPF, NPS, government schemes) and immediately after RBI policy changes. Tax information is updated after every Union Budget and Finance Act. You can find the last updated date at the bottom of each calculator page.</p>
              </div>
            </details>

            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Do you provide calculators in regional Indian languages?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Currently, we provide high-quality content in English and Hindi. We're working on adding more Indian languages with proper localization to ensure accuracy and cultural relevance rather than machine translations.</p>
              </div>
            </details>

            <details className="group bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm">
              <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Are BharatFin calculators free to use?</span>
                <span className="text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                <p>Yes, all our calculators and educational content are completely free. We believe financial planning tools should be accessible to every Indian. There are no hidden charges, subscriptions, or premium features.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Financial Disclaimer Section */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-yellow-200 dark:border-yellow-800 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Important Financial Disclaimer
                </h3>
                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-3">
                  <p>
                    <strong>Educational Purpose:</strong> All calculators, articles, and information on BharatFin are provided for educational and informational purposes only. They do not constitute professional financial, investment, tax, or legal advice.
                  </p>
                  <p>
                    <strong>Accuracy Disclaimer:</strong> While we strive for accuracy and regularly update our information, calculator results are estimates based on the inputs provided. Actual returns may vary due to market conditions, changes in interest rates, and other factors.
                  </p>
                  <p>
                    <strong>Consult Professionals:</strong> Always consult with qualified financial advisors, tax consultants, or other professionals for personalized advice specific to your financial situation and goals.
                  </p>
                  <p>
                    <strong>Risk Warning:</strong> All investments carry risk of loss. Past performance does not guarantee future results. Please read all scheme-related documents carefully before investing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-emerald-400" />
                <span className="font-bold text-xl">
                  BharatFin <span className="text-emerald-400">India</span>
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Smart Money for Every Indian. Free, accurate financial calculators and educational content for informed investment decisions.
              </p>
              <div className="text-sm text-gray-400">
                <p>📍 Mumbai, India</p>
                <p>📧 support@bharatfin.com</p>
                <p>🔄 Updated for FY 2026-27</p>
              </div>
            </div>

            {/* Calculators */}
            <div>
              <h3 className="font-semibold text-white mb-4">Popular Calculators</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href={`/${locale}/calculators/sip`} className="hover:text-emerald-400 transition-colors">SIP Calculator</Link></li>
                <li><Link href={`/${locale}/calculators/ppf`} className="hover:text-emerald-400 transition-colors">PPF Calculator</Link></li>
                <li><Link href={`/${locale}/calculators/emi`} className="hover:text-emerald-400 transition-colors">EMI Calculator</Link></li>
                <li><Link href={`/${locale}/calculators/fd`} className="hover:text-emerald-400 transition-colors">FD Calculator</Link></li>
                <li><Link href={`/${locale}/tax/new-vs-old-regime`} className="hover:text-emerald-400 transition-colors">Tax Calculator</Link></li>
                <li><Link href={`/${locale}/calculators/nps`} className="hover:text-emerald-400 transition-colors">NPS Calculator</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Financial Guides</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href={`/${locale}/blog/financial-planning-basics-india`} className="hover:text-emerald-400 transition-colors">Financial Planning Guide</Link></li>
                <li><Link href={`/${locale}/blog/sip-mistakes-beginners-india`} className="hover:text-emerald-400 transition-colors">SIP Investment Tips</Link></li>
                <li><Link href={`/${locale}/blog/home-loan-prepayment-guide-india`} className="hover:text-emerald-400 transition-colors">Home Loan Guide</Link></li>
                <li><Link href={`/${locale}/blog/nps-vs-ppf-retirement-planning`} className="hover:text-emerald-400 transition-colors">Retirement Planning</Link></li>
                <li><Link href={`/${locale}/blog`} className="hover:text-emerald-400 transition-colors">All Articles</Link></li>
              </ul>
            </div>

            {/* Legal & Trust */}
            <div>
              <h3 className="font-semibold text-white mb-4">Trust & Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href={`/${locale}/about`} className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href={`/${locale}/terms`} className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href={`/${locale}/disclaimer`} className="hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
                <li><Link href={`/${locale}/editorial-policy`} className="hover:text-emerald-400 transition-colors">Editorial Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                <p>© 2026 BharatFin. Built with ❤️ for Indian investors.</p>
                <p className="mt-1">All calculations verified by certified financial planners. Updated for FY 2026-27.</p>
              </div>
              <div className="text-sm text-gray-400">
                <p>Sources: RBI • SEBI • Income Tax Dept • IRDAI</p>
                <p className="mt-1">Educational content only. Consult professionals for advice.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}