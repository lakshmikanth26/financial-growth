import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Target, Users, Shield, TrendingUp, BookOpen } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'About Us - BharatFin',
    description: 'Learn about BharatFin - India\'s trusted financial calculator platform helping millions make informed financial decisions.',
    alternates: {
      canonical: `/${locale}/about`
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-8 py-12">
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
              >
                ← Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                About BharatFin
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Empowering Indians with smart financial tools and education
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  BharatFin was created to democratize financial planning in India. We believe every Indian 
                  deserves access to accurate, easy-to-use financial tools that help them make informed 
                  decisions about their money.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Our platform provides comprehensive financial calculators, educational content, and 
                  resources specifically designed for the Indian market, taking into account local 
                  tax laws, investment options, and financial products.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Why BharatFin?
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>100% free financial calculators</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>Designed specifically for Indian market</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>Updated with latest tax laws and rates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>Multilingual support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>No registration or personal data required</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <Calculator className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Comprehensive Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  From PPF to SIP, EMI to Tax calculations - all the financial tools you need in one place
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <BookOpen className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Educational Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Learn about financial concepts with our detailed guides and blog posts
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Privacy Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  All calculations happen in your browser - we don't store your financial data
                </p>
              </div>
            </div>

            {/* Our Team and Expertise */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Our Team & Expertise
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Financial Expertise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Our team includes certified financial planners, tax experts, and investment professionals with 
                    extensive experience in Indian financial markets and regulations.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Technical Innovation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Built by technology professionals who understand both finance and software development, 
                    ensuring accurate calculations and excellent user experience.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    User-Centric Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Every tool is designed based on real user feedback and common financial planning scenarios 
                    faced by Indian investors and professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Comprehensive Financial Tools */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Comprehensive Financial Calculator Suite
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-3xl mx-auto">
                Over 15 specialized calculators covering every aspect of Indian financial planning, 
                from basic savings to complex investment scenarios.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">₹</span>
                    </div>
                    Investment Calculators
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• <strong>PPF Calculator</strong> - 15-year wealth building</li>
                    <li>• <strong>SIP Calculator</strong> - Mutual fund investments</li>
                    <li>• <strong>FD Calculator</strong> - Fixed deposit returns</li>
                    <li>• <strong>RD Calculator</strong> - Recurring deposits</li>
                    <li>• <strong>NPS Calculator</strong> - Retirement planning</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">🏠</span>
                    </div>
                    Loan Calculators
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• <strong>EMI Calculator</strong> - Monthly payments</li>
                    <li>• <strong>Home Loan</strong> - Property financing</li>
                    <li>• <strong>Personal Loan</strong> - Quick funding</li>
                    <li>• <strong>Car Loan</strong> - Vehicle financing</li>
                    <li>• <strong>Education Loan</strong> - Study abroad</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">🎯</span>
                    </div>
                    Tax & Planning Tools
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• <strong>Income Tax</strong> - New vs Old regime</li>
                    <li>• <strong>HRA Calculator</strong> - Rent exemptions</li>
                    <li>• <strong>Capital Gains</strong> - Investment tax</li>
                    <li>• <strong>80C Planner</strong> - Tax saving</li>
                    <li>• <strong>TDS Calculator</strong> - Deductions</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">⚖️</span>
                    </div>
                    Comparison & Analysis
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• <strong>Bank FD Rates</strong> - Best deposits</li>
                    <li>• <strong>Investment Options</strong> - Portfolio</li>
                    <li>• <strong>Loan Rates</strong> - Best deals</li>
                    <li>• <strong>Insurance Plans</strong> - Coverage</li>
                    <li>• <strong>Mutual Funds</strong> - Top performers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Financial Professionals Recommend BharatFin */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Why Financial Professionals Recommend BharatFin
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Accuracy & Reliability</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ Formulas verified by certified financial planners</li>
                    <li>✓ Regular updates to reflect current tax laws and rates</li>
                    <li>✓ Calculations cross-checked with bank and government sources</li>
                    <li>✓ Compliant with SEBI, RBI, and IRDAI guidelines</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Educational Value</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ Detailed explanations of financial concepts</li>
                    <li>✓ Real-world examples with Indian scenarios</li>
                    <li>✓ Best practices and common mistake warnings</li>
                    <li>✓ Investment strategy guidance for different life stages</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Privacy & Security</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ All calculations performed locally in your browser</li>
                    <li>✓ No financial data transmitted or stored on servers</li>
                    <li>✓ Complete privacy protection for sensitive information</li>
                    <li>✓ No registration required for basic calculations</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">User Experience</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>✓ Fast, responsive interface optimized for all devices</li>
                    <li>✓ Instant results as you type input values</li>
                    <li>✓ Visual charts and graphs for better understanding</li>
                    <li>✓ Multilingual support for regional users</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl mb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
                <p className="text-xl mb-6 opacity-90">
                  We are committed to providing accurate, up-to-date financial information and tools
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Always Updated</h3>
                    <p className="text-sm opacity-80">Latest tax laws and interest rates</p>
                  </div>
                  <div>
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">User-Focused</h3>
                    <p className="text-sm opacity-80">Designed for real Indian scenarios</p>
                  </div>
                  <div>
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Accuracy First</h3>
                    <p className="text-sm opacity-80">Thoroughly tested calculations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                BharatFin provides educational tools and information only. We do not provide personalized 
                financial advice. All calculations are estimates and should be verified with qualified 
                financial professionals. Always consult with certified financial planners, tax advisors, 
                or other professionals for advice specific to your situation.
              </p>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Questions or Feedback?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We'd love to hear from you and continuously improve our platform
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}