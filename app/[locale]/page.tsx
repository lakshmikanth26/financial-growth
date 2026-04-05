import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Calculator, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react';
import { HeaderAdSlot, InContentAdSlot } from '@/components/layout/AdSlot';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

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
      title: 'Trusted by Millions',
      description: 'Used by investors, professionals and financial advisors across India'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              India's <span className="text-blue-600">Fastest</span><br />
              Financial Calculators
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Calculate PPF, FD, SIP, Tax, EMI returns instantly. Make informed investment decisions 
              with our free, accurate financial calculators designed for Indian investors.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search calculators... (PPF, SIP, Tax, EMI)"
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="absolute right-2 top-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Calculator className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">0s</div>
                <div className="text-sm text-gray-600">Load Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeaderAdSlot />

      {/* Popular Calculators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Popular Financial Calculators
            </h2>
            <p className="text-lg text-gray-600">
              Most used calculators by Indian investors and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{calc.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-gray-900 group-hover:text-blue-600 mb-2">
                      {calc.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {calc.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Calculate Now
                      <TrendingUp className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/calculators`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Calculators
              <Calculator className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <InContentAdSlot />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Why Choose FinCalc India?
            </h2>
            <p className="text-lg text-gray-600">
              Built specifically for Indian investors with accuracy and speed in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Start Planning Your Financial Future Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of Indians who trust FinCalc India for their investment calculations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/calculators/ppf`}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Calculate PPF Returns
            </Link>
            <Link
              href={`/${locale}/calculators/sip`}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Plan SIP Investment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}