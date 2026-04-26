import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Editorial Policy - BharatFin Financial Content Standards',
    description: 'Learn about BharatFin\'s editorial standards, fact-checking process, and commitment to providing accurate financial information and calculator tools.',
    alternates: {
      canonical: `/${locale}/editorial-policy`
    }
  };
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
              Editorial Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our Commitment to Accurate, Unbiased Financial Information
            </p>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                📋 Our Mission
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                BharatFin is committed to providing accurate, unbiased, and educational financial content that helps 
                Indians make informed financial decisions. This editorial policy outlines our standards for content 
                creation, fact-checking, and maintaining editorial independence.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Editorial Independence</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">1.1 Content Integrity</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our editorial content is created independently and is not influenced by advertisers, sponsors, or 
              commercial interests. All articles, guides, and recommendations are based on research, analysis, 
              and what we believe is in the best interest of our readers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">1.2 No Pay-to-Play</h3>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• We do not accept payment for positive coverage of financial products</li>
              <li>• Our calculator recommendations are based on features and user needs, not commissions</li>
              <li>• Sponsored content is clearly labeled as such and separated from editorial content</li>
              <li>• We maintain a clear distinction between advertising and editorial content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. Content Standards and Guidelines</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">2.1 Accuracy and Reliability</h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3">✅ We Ensure:</h4>
              <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                <li>• All financial calculations are mathematically verified</li>
                <li>• Tax information reflects current Indian tax laws (FY 2026-27)</li>
                <li>• Interest rates and financial data are updated regularly</li>
                <li>• Examples use realistic Indian financial scenarios</li>
                <li>• All claims are backed by credible sources</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">2.2 Source Requirements</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">All content must be supported by reliable sources:</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Primary Sources</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Reserve Bank of India (RBI)</li>
                  <li>• Ministry of Finance, Government of India</li>
                  <li>• Securities and Exchange Board of India (SEBI)</li>
                  <li>• Insurance Regulatory and Development Authority (IRDAI)</li>
                  <li>• National Statistical Office (NSO)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Financial Industry Sources</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Association of Mutual Funds in India (AMFI)</li>
                  <li>• National Stock Exchange (NSE)</li>
                  <li>• Bombay Stock Exchange (BSE)</li>
                  <li>• Credit rating agencies (CRISIL, ICRA)</li>
                  <li>• Peer-reviewed financial research</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. Fact-Checking Process</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">3.1 Pre-Publication Review</h3>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6 border border-orange-200 dark:border-orange-800">
              <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-3">📝 Review Checklist</h4>
              <ul className="text-orange-800 dark:text-orange-300 text-sm space-y-1">
                <li>• Mathematical accuracy of all calculations and formulas</li>
                <li>• Currency and relevance of tax laws and regulations</li>
                <li>• Verification of interest rates and financial data points</li>
                <li>• Cross-checking of statistics and market data</li>
                <li>• Review of examples for practical applicability</li>
                <li>• Grammar, spelling, and readability check</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">3.2 Regular Updates</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Financial information changes frequently. We maintain accuracy through:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Quarterly Reviews:</strong> All calculator formulas and interest rates</li>
              <li><strong>Annual Tax Updates:</strong> Complete review after each Union Budget</li>
              <li><strong>Market Event Updates:</strong> Prompt updates for significant regulatory changes</li>
              <li><strong>User Feedback Integration:</strong> Corrections based on reader reports</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Content Categories and Standards</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">4.1 Financial Calculators</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Standard:</strong> All calculators must provide mathematically accurate results based on 
                current formulas used by financial institutions in India. Results are cross-verified with 
                multiple sources before publication.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">4.2 Educational Articles</h3>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4 border border-purple-200 dark:border-purple-800">
              <p className="text-purple-800 dark:text-purple-300 text-sm">
                <strong>Standard:</strong> Articles must be comprehensive, well-researched, and provide 
                actionable insights. All recommendations must be suitable for the average Indian investor 
                and clearly explain risks and benefits.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">4.3 News and Updates</h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4 border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>Standard:</strong> Financial news must be timely, accurate, and sourced from 
                official announcements or credible financial media. We focus on news that directly 
                impacts Indian investors and taxpayers.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. Bias Prevention and Objectivity</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">5.1 Balanced Coverage</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We strive to present multiple perspectives on financial topics:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• Present both advantages and disadvantages of financial products</li>
              <li>• Include different investment strategies for various risk profiles</li>
              <li>• Acknowledge uncertainty and varying expert opinions where they exist</li>
              <li>• Avoid sensationalism in favor of factual, measured analysis</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">5.2 Conflict of Interest Disclosure</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We disclose any potential conflicts of interest, including:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• Affiliate relationships with financial service providers</li>
              <li>• Sponsored content or partnerships</li>
              <li>• Personal investments that might bias content</li>
              <li>• Advertising relationships that could influence editorial decisions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. User-Generated Content Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">6.1 Comments and Feedback</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We encourage user engagement while maintaining quality standards:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">✅ We Welcome</h4>
                <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                  <li>• Constructive feedback on content</li>
                  <li>• Questions about financial concepts</li>
                  <li>• Personal experiences (when relevant)</li>
                  <li>• Corrections to factual errors</li>
                  <li>• Suggestions for new content</li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2">❌ We Remove</h4>
                <ul className="text-red-800 dark:text-red-300 text-sm space-y-1">
                  <li>• Promotional content or spam</li>
                  <li>• Unsubstantiated investment advice</li>
                  <li>• Personal attacks or inappropriate language</li>
                  <li>• Content that violates Indian financial regulations</li>
                  <li>• Misleading or false information</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Legal and Regulatory Compliance</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">7.1 Indian Financial Regulations</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All content complies with Indian financial regulations and guidelines:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• SEBI guidelines for investment advice and recommendations</li>
              <li>• RBI regulations on banking and lending products</li>
              <li>• IRDAI guidelines for insurance product information</li>
              <li>• Ministry of Finance tax regulations and updates</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">7.2 Disclaimers and Risk Warnings</h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6 border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-3">⚠️ Standard Disclaimers</h4>
              <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                <li>• "This is for educational purposes only and not personal financial advice"</li>
                <li>• "Past performance does not guarantee future results"</li>
                <li>• "Please consult a qualified financial advisor for personalized advice"</li>
                <li>• "Mutual fund investments are subject to market risks"</li>
                <li>• "Calculator results are estimates based on inputs provided"</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">8. Content Corrections and Updates</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">8.1 Error Reporting</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you notice an error in our content, please report it to us:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              <li>• Email: editorial@bharatfin.com</li>
              <li>• Response time: Within 24-48 hours</li>
              <li>• Corrections are published prominently when significant</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">8.2 Update Policy</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We update content to maintain accuracy and relevance:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Major Updates:</strong> Substantial changes are noted at the top of articles</li>
              <li><strong>Minor Updates:</strong> Small corrections and data updates</li>
              <li><strong>Archive Policy:</strong> Outdated content is marked as archived rather than deleted</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">9. Editorial Team and Expertise</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">9.1 Qualifications</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our editorial team includes professionals with:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• Financial planning and analysis experience</li>
              <li>• Professional certifications in finance and taxation</li>
              <li>• Understanding of Indian financial markets and regulations</li>
              <li>• Technical expertise in financial modeling and calculations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">9.2 Continuous Learning</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our team stays current through:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              <li>• Regular training on regulatory changes</li>
              <li>• Participation in financial industry events and webinars</li>
              <li>• Continuous education in financial planning and analysis</li>
              <li>• Collaboration with subject matter experts</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">10. Contact and Feedback</h2>
            
            <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Editorial Questions or Concerns?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We welcome feedback on our editorial standards and content quality:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Editorial Team</h4>
                  <p className="text-blue-600 dark:text-blue-400">editorial@bharatfin.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    For content questions, corrections, and suggestions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Content Updates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Follow us for the latest updates to our editorial standards 
                    and new content guidelines as they evolve.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 mt-8">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
                🎯 Our Commitment
              </h3>
              <p className="text-green-800 dark:text-green-300 text-sm">
                BharatFin is dedicated to maintaining the highest standards of editorial integrity. 
                This policy is regularly reviewed and updated to ensure we continue providing valuable, 
                accurate, and trustworthy financial information to our readers.
              </p>
              <p className="text-green-800 dark:text-green-300 text-sm mt-2">
                <strong>Last Updated:</strong> April 26, 2026 | <strong>Next Review:</strong> October 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}