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

            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
                Our Financial Tools
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Investment Calculators</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• PPF Calculator</li>
                    <li>• SIP Calculator</li>
                    <li>• FD Calculator</li>
                    <li>• RD Calculator</li>
                    <li>• NPS Calculator</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Loan Calculators</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• EMI Calculator</li>
                    <li>• Home Loan Calculator</li>
                    <li>• Personal Loan Calculator</li>
                    <li>• Car Loan Calculator</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Tax Tools</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Income Tax Calculator</li>
                    <li>• HRA Calculator</li>
                    <li>• Tax Regime Comparison</li>
                    <li>• Capital Gains Calculator</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Comparison Tools</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Bank FD Rates</li>
                    <li>• Investment Options</li>
                    <li>• Loan Interest Rates</li>
                    <li>• Tax Saving Options</li>
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