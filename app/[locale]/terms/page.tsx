import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Terms of Service - BharatFin',
    description: 'BharatFin Terms of Service - Terms and conditions for using our financial calculators and services.',
    alternates: {
      canonical: `/${locale}/terms`
    }
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
                Terms of Service
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using BharatFin ("we," "our," or "us"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these Terms of Service, you should not use this website.
              </p>

              <h2>Description of Service</h2>
              <p>
                BharatFin provides free financial calculators and educational content related to personal finance in India. 
                Our services include:
              </p>
              <ul>
                <li>Interactive financial calculators (PPF, FD, SIP, EMI, Tax, etc.)</li>
                <li>Educational blog content about Indian financial topics</li>
                <li>Bank interest rate comparisons</li>
                <li>Tax planning tools and information</li>
              </ul>

              <h2>Use License</h2>
              <p>
                Permission is granted to temporarily access BharatFin for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2>Disclaimer of Warranties</h2>
              <p>
                <strong>Important:</strong> BharatFin provides financial calculators and information for educational purposes only. 
                The information is not intended as professional financial, investment, or tax advice.
              </p>
              <ul>
                <li>All calculations are estimates and may not reflect actual returns</li>
                <li>Interest rates, tax rules, and financial regulations change frequently</li>
                <li>Always consult with qualified financial professionals for personalized advice</li>
                <li>We do not guarantee the accuracy or completeness of any information</li>
              </ul>

              <h2>Accuracy of Materials</h2>
              <p>
                The materials appearing on BharatFin could include technical, typographical, or photographic errors. 
                We do not warrant that any of the materials on its website are accurate, complete, or current. 
                We may make changes to the materials contained on its website at any time without notice.
              </p>

              <h2>User Responsibilities</h2>
              <p>When using our services, you agree to:</p>
              <ul>
                <li>Use the calculators and information responsibly</li>
                <li>Not input false or misleading information</li>
                <li>Not attempt to damage or disrupt the website</li>
                <li>Respect intellectual property rights</li>
                <li>Verify all financial information independently</li>
              </ul>

              <h2>Financial Disclaimer</h2>
              <p>
                <strong>Risk Warning:</strong> All investments and financial decisions carry risk. Past performance does not 
                guarantee future results. The calculators and information provided are for educational purposes and should 
                not be considered as financial advice.
              </p>
              <ul>
                <li>Tax calculations are estimates based on current rules</li>
                <li>Investment returns are projections, not guaranteed outcomes</li>
                <li>Financial regulations and tax laws change regularly</li>
                <li>Always verify current rates and rules with official sources</li>
              </ul>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to external websites. We are not responsible for the content, 
                privacy policies, or practices of third-party websites.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                The content, design, and software on BharatFin are protected by copyright and other intellectual 
                property laws. All rights are reserved unless explicitly stated otherwise.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                In no event shall BharatFin or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on BharatFin's website.
              </p>

              <h2>Modifications</h2>
              <p>
                We may revise these terms of service at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India 
                and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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