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
      title: 'Trusted by Millions',
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
                <div className="text-3xl font-bold text-emerald-600">15+</div>
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

      {/* Language Switcher */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-3xl text-gray-900 dark:text-gray-100 mb-8">
            Available in 8 Indian Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'en', name: 'English', flag: '🇮🇳' },
              { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
              { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
              { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
              { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
              { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
              { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
              { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
            ].map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}/simple-page`}
                className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                  locale === lang.code ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</div>
              </Link>
            ))}
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