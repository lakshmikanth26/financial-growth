import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Privacy Policy - BharatFin India Financial Calculators',
    description: 'Learn how BharatFin protects your privacy, handles data, cookies, and advertising. Complete privacy policy for our financial calculator platform.',
    alternates: {
      canonical: `/${locale}/privacy`
    }
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Effective Date: April 26, 2026 | Last Updated: April 26, 2026
            </p>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              BharatFin ("we," "our," or "us") operates bharatfin.vercel.app and related services (the "Service"). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our financial calculators and educational resources.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                🔒 Your Privacy is Important
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                BharatFin is committed to protecting your personal information and your right to privacy. 
                All financial calculations are performed locally in your browser and are never transmitted to our servers.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Contact Information:</strong> When you contact us via email or forms (name, email address, message content)</li>
              <li><strong>Newsletter Subscriptions:</strong> Email address if you subscribe to our financial updates</li>
              <li><strong>Calculator Inputs:</strong> Financial data you enter in calculators (processed locally, not stored)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, device information</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs</li>
              <li><strong>Cookies and Tracking:</strong> Session cookies, analytics cookies, advertising cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">2.3 Third-Party Information</h3>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Google Analytics:</strong> Website traffic and user behavior analytics</li>
              <li><strong>Google AdSense:</strong> Advertising performance and user preferences</li>
              <li><strong>Social Media:</strong> Public profile information if you interact with our social media</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. How We Use Your Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-200 mb-3">✅ Primary Uses</h3>
                <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                  <li>• Provide financial calculator services</li>
                  <li>• Deliver educational content</li>
                  <li>• Improve user experience</li>
                  <li>• Send relevant updates (with consent)</li>
                  <li>• Respond to inquiries and support</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-3">🔍 Analytics & Advertising</h3>
                <ul className="text-orange-800 dark:text-orange-300 text-sm space-y-1">
                  <li>• Website traffic analysis</li>
                  <li>• Content performance measurement</li>
                  <li>• Targeted advertising (via Google)</li>
                  <li>• User behavior insights</li>
                  <li>• Service optimization</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Financial Calculator Data Privacy</h2>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                🔐 Local Processing Guarantee
              </h3>
              <p className="text-green-800 dark:text-green-300 mb-4">
                <strong>Important:</strong> All financial calculations (PPF, SIP, EMI, Tax, etc.) are performed 
                entirely in your browser using JavaScript. Your financial data never leaves your device.
              </p>
              <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                <li>• No financial data is transmitted to our servers</li>
                <li>• No calculation results are stored or logged</li>
                <li>• Your financial privacy is completely protected</li>
                <li>• You can use calculators offline after initial page load</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-50 dark:bg-slate-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-600">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Cookie Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Required</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Essential Cookies</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Site functionality, language preferences</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Yes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Analytics Cookies</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Google Analytics, traffic measurement</td>
                    <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-semibold">Optional</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Advertising Cookies</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Google AdSense, personalized ads</td>
                    <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-semibold">Optional</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can control cookies through your browser settings. However, disabling certain cookies may 
              affect website functionality and the relevance of advertisements shown to you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">6.1 Google Services</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
                <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our site. 
                This helps us improve our content and user experience.
              </p>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Google AdSense:</strong> We use Google AdSense to display relevant advertisements. 
                Google may use cookies to show ads based on your interests.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">6.2 Hosting and CDN</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our website is hosted on Vercel and uses various CDN services for optimal performance. 
              These services may have access to technical data necessary for service delivery.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Data Sharing and Disclosure</h2>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-3">
                🚫 What We DON'T Do
              </h3>
              <ul className="text-red-800 dark:text-red-300 text-sm space-y-1">
                <li>• We do not sell your personal information</li>
                <li>• We do not rent your data to third parties</li>
                <li>• We do not share your financial calculator inputs</li>
                <li>• We do not provide data to marketing companies</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">Limited Sharing Scenarios</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may share information only in these specific circumstances:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Service Providers:</strong> With trusted partners who help operate our website (hosting, analytics)</li>
              <li><strong>Business Transfer:</strong> In case of merger, acquisition, or business sale (with user notification)</li>
              <li><strong>Safety Concerns:</strong> To protect rights, property, or safety of users and the public</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">8. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technical Safeguards</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• SSL/TLS encryption for data transmission</li>
                  <li>• Secure hosting infrastructure</li>
                  <li>• Regular security updates</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Operational Safeguards</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Limited access to personal data</li>
                  <li>• Employee training on data protection</li>
                  <li>• Regular backup procedures</li>
                  <li>• Incident response protocols</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">9. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">9.1 Access and Control</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Access:</strong> Request information about what personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">9.2 Marketing Communications</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can opt out of marketing communications at any time by:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              <li>• Clicking "unsubscribe" in email communications</li>
              <li>• Contacting us directly at privacy@bharatfin.com</li>
              <li>• Adjusting your account preferences (if applicable)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our Service is not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe 
              your child has provided personal information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">11. International Data Transfers</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your information may be transferred to and processed in countries other than India, 
              including the United States (for Google services). We ensure appropriate safeguards 
              are in place to protect your information during such transfers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">12. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We retain personal information only as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required by law. 
              Financial calculator data is never retained as it's processed locally in your browser.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">13. Updates to This Privacy Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              We encourage you to review this Privacy Policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">14. Contact Information</h2>
            <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Questions About This Privacy Policy?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                data practices, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Email Contact</h4>
                  <p className="text-blue-600 dark:text-blue-400">privacy@bharatfin.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    We respond to privacy inquiries within 48 hours
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Website</h4>
                  <p className="text-blue-600 dark:text-blue-400">bharatfin.vercel.app</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Visit our contact page for more options
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                🔒 Your Trust Matters
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                BharatFin is committed to transparency and protecting your privacy. This Privacy Policy 
                reflects our dedication to handling your information responsibly while providing you with 
                valuable financial tools and education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}