import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Contact Us - BharatFin',
    description: 'Get in touch with BharatFin team. Contact us for questions about financial calculators, feedback, or support.',
    alternates: {
      canonical: `/${locale}/contact`
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                Contact Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">support@bharatfin.in</p>
                      <p className="text-gray-600 dark:text-gray-400">For general inquiries and support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Business</h3>
                      <p className="text-gray-600 dark:text-gray-400">business@bharatfin.in</p>
                      <p className="text-gray-600 dark:text-gray-400">For partnerships and business inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Feedback</h3>
                      <p className="text-gray-600 dark:text-gray-400">feedback@bharatfin.in</p>
                      <p className="text-gray-600 dark:text-gray-400">Share your thoughts and suggestions</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Response Time</h3>
                      <p className="text-gray-600 dark:text-gray-400">We typically respond within 24-48 hours</p>
                      <p className="text-gray-600 dark:text-gray-400">Monday to Friday, 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  About BharatFin
                </h2>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    BharatFin is India's comprehensive financial calculator platform, providing free tools 
                    and educational resources to help Indians make informed financial decisions.
                  </p>
                  
                  <p>
                    Our mission is to simplify complex financial calculations and make financial planning 
                    accessible to everyone, regardless of their financial background or experience.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      What We Offer
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Comprehensive financial calculators</li>
                      <li>• Educational blog content</li>
                      <li>• Bank interest rate comparisons</li>
                      <li>• Tax planning tools</li>
                      <li>• Investment planning resources</li>
                      <li>• Multilingual support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  ⚠️ Important Disclaimer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  BharatFin provides educational tools and information only. We do not provide 
                  personalized financial advice. Always consult with qualified financial professionals 
                  for advice specific to your situation. All calculations are estimates and actual 
                  results may vary.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>
              <Link 
                href="/disclaimer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}