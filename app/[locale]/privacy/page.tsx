import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Privacy Policy - BharatFin',
    description: 'BharatFin Privacy Policy - How we collect, use, and protect your personal information.',
    alternates: {
      canonical: `/${locale}/privacy`
    }
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('privacy');

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
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>Information We Collect</h2>
              <p>
                BharatFin is committed to protecting your privacy. When you use our financial calculators and services, we may collect:
              </p>
              <ul>
                <li><strong>Usage Data:</strong> Information about how you use our calculators and website</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                <li><strong>Calculation Data:</strong> Input values you enter into our calculators (processed locally, not stored)</li>
                <li><strong>Analytics Data:</strong> Website performance and user interaction data through Google Analytics</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Provide and improve our financial calculation services</li>
                <li>Analyze website usage to enhance user experience</li>
                <li>Display relevant advertisements through Google AdSense</li>
                <li>Ensure website security and prevent misuse</li>
              </ul>

              <h2>Data Storage and Security</h2>
              <p>
                Your calculation inputs are processed locally in your browser and are not transmitted to or stored on our servers. 
                We implement appropriate security measures to protect any data we do collect.
              </p>

              <h2>Third-Party Services</h2>
              <p>Our website uses the following third-party services:</p>
              <ul>
                <li><strong>Google Analytics:</strong> For website usage analytics</li>
                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                <li><strong>Vercel:</strong> For website hosting and performance</li>
              </ul>
              <p>
                These services may collect data according to their own privacy policies. We recommend reviewing their policies:
              </p>
              <ul>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience and for analytics purposes. 
                You can control cookie settings through your browser preferences.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access information about data we may have about you</li>
                <li>Request correction of any inaccurate data</li>
                <li>Request deletion of your data where legally permissible</li>
                <li>Opt out of analytics tracking</li>
              </ul>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes 
                by updating the "Last updated" date above.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@bharatfin.in</li>
                <li>Website: <Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}