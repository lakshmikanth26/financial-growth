import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Disclaimer - BharatFin',
    description: 'BharatFin Disclaimer - Important information about our financial calculators and educational content.',
    alternates: {
      canonical: `/${locale}/disclaimer`
    }
  };
}

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Disclaimer
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 mb-8">
                <h2 className="text-red-800 dark:text-red-300 font-semibold mb-2">
                  ⚠️ Important Financial Disclaimer
                </h2>
                <p className="text-red-700 dark:text-red-300 mb-0">
                  BharatFin provides educational tools and information only. This is not professional 
                  financial, investment, tax, or legal advice. Always consult qualified professionals 
                  for advice specific to your financial situation.
                </p>
              </div>

              <h2>General Disclaimer</h2>
              <p>
                The information on BharatFin is provided on an "as is" basis. To the fullest extent 
                permitted by law, this Company:
              </p>
              <ul>
                <li>Excludes all representations and warranties relating to this website and its contents</li>
                <li>Does not warrant that the website will be constantly available, or available at all</li>
                <li>Makes no representations or warranties regarding the accuracy of calculations</li>
                <li>Disclaims liability for any loss or damage arising from use of this website</li>
              </ul>

              <h2>Financial Calculations Disclaimer</h2>
              <p>
                <strong>All calculations are estimates only:</strong>
              </p>
              <ul>
                <li><strong>PPF Calculator:</strong> Based on current interest rates which may change annually</li>
                <li><strong>FD Calculator:</strong> Bank rates vary and change frequently</li>
                <li><strong>SIP Calculator:</strong> Market returns are not guaranteed and highly variable</li>
                <li><strong>Tax Calculator:</strong> Based on current tax laws which change regularly</li>
                <li><strong>EMI Calculator:</strong> Actual loan terms may differ from calculations</li>
              </ul>

              <h2>Investment Risk Warning</h2>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="text-orange-800 dark:text-orange-300 font-semibold mb-2">
                  Investment Risks
                </h3>
                <ul className="text-orange-700 dark:text-orange-300 mb-0">
                  <li>• All investments carry risk of loss</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Market volatility can significantly impact returns</li>
                  <li>• Inflation may erode purchasing power over time</li>
                  <li>• Early withdrawal may result in penalties</li>
                </ul>
              </div>

              <h2>Tax Calculation Disclaimer</h2>
              <p>
                Tax calculations are based on:
              </p>
              <ul>
                <li>Current tax laws and rates as of the calculation date</li>
                <li>Standard deductions and exemptions</li>
                <li>General tax scenarios - individual circumstances vary</li>
              </ul>
              <p>
                <strong>Important:</strong> Tax laws change frequently. Actual tax liability may differ 
                significantly based on your specific circumstances, income sources, deductions, and 
                applicable tax provisions.
              </p>

              <h2>Interest Rate Disclaimers</h2>
              <p>
                Interest rates displayed on our website:
              </p>
              <ul>
                <li>Are indicative and subject to change without notice</li>
                <li>May not reflect the latest rates offered by financial institutions</li>
                <li>Can vary based on deposit amount, tenure, and individual eligibility</li>
                <li>Should be verified directly with the respective banks or institutions</li>
              </ul>

              <h2>No Professional Relationship</h2>
              <p>
                Use of BharatFin does not create any professional relationship between you and BharatFin. 
                We are not:
              </p>
              <ul>
                <li>Certified financial planners or investment advisors</li>
                <li>Tax consultants or chartered accountants</li>
                <li>Insurance agents or brokers</li>
                <li>Legal advisors or attorneys</li>
              </ul>

              <h2>Third-Party Information</h2>
              <p>
                Some information on our website may be sourced from third parties. We do not guarantee 
                the accuracy, completeness, or timeliness of such information. Users should verify 
                all information independently.
              </p>

              <h2>Regional Variations</h2>
              <p>
                Our calculations and information are primarily focused on Indian financial markets, 
                tax laws, and regulations. Information may not be applicable in other jurisdictions.
              </p>

              <h2>Technology Limitations</h2>
              <p>
                While we strive for accuracy, our calculators have limitations:
              </p>
              <ul>
                <li>Rounding may affect precise calculations</li>
                <li>Complex financial scenarios may not be fully captured</li>
                <li>Browser compatibility may affect functionality</li>
                <li>Internet connectivity issues may impact user experience</li>
              </ul>

              <h2>Recommendation</h2>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">
                  Always Consult Professionals
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-0">
                  Before making any financial decisions, consult with qualified professionals including 
                  certified financial planners, tax advisors, chartered accountants, and investment 
                  advisors who can provide personalized advice based on your specific circumstances.
                </p>
              </div>

              <h2>Updates to Disclaimer</h2>
              <p>
                This disclaimer may be updated periodically to reflect changes in our services, 
                applicable laws, or regulatory requirements. Users are encouraged to review this 
                disclaimer regularly.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this disclaimer or our services, please contact us at:
              </p>
              <ul>
                <li>Email: legal@bharatfin.in</li>
                <li>Website: <Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}