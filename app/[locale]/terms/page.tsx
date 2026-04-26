import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Terms of Service - BharatFin Financial Calculators',
    description: 'Terms and conditions for using BharatFin financial calculators, educational content, and services. Legal agreement and user responsibilities.',
    alternates: {
      canonical: `/${locale}/terms`
    }
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Effective Date: April 26, 2026 | Last Updated: April 26, 2026
            </p>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                📋 Agreement Overview
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                These Terms of Service ("Terms") govern your use of BharatFin and its services. By accessing or using our website, 
                you agree to be bound by these Terms. Please read them carefully before using our financial calculators and content.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using BharatFin (bharatfin.vercel.app) ("Service," "we," "our," or "us"), you accept and agree 
              to be bound by the terms and provisions of this agreement. These Terms apply to all visitors, users, and others 
              who access or use the Service.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you do not agree to these Terms of Service, you must not access or use our Service. Your continued use of 
              the Service constitutes your acceptance of any modifications to these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              BharatFin is a comprehensive financial platform designed for Indian users, providing:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">🧮 Calculator Services</h4>
                <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                  <li>• PPF (Public Provident Fund) Calculator</li>
                  <li>• SIP (Systematic Investment Plan) Calculator</li>
                  <li>• EMI (Equated Monthly Installment) Calculator</li>
                  <li>• Fixed Deposit Calculator</li>
                  <li>• Tax Calculator (New vs Old Regime)</li>
                  <li>• NPS (National Pension System) Calculator</li>
                  <li>• HRA (House Rent Allowance) Calculator</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">📚 Educational Content</h4>
                <ul className="text-blue-800 dark:text-blue-300 text-sm space-y-1">
                  <li>• Financial planning guides</li>
                  <li>• Investment strategy articles</li>
                  <li>• Tax saving tips and guides</li>
                  <li>• Market analysis and insights</li>
                  <li>• Personal finance tutorials</li>
                  <li>• Bank rate comparisons</li>
                  <li>• Policy updates and news</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. User Eligibility and Registration</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">3.1 Age Requirement</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You must be at least 18 years old to use our Service. By using BharatFin, you represent and warrant that you 
              are at least 18 years old and have the legal capacity to enter into this agreement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">3.2 Account Accuracy</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you create an account or provide information to us, you must provide accurate, current, and complete 
              information and keep such information updated.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Permitted Use and Restrictions</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">4.1 Permitted Uses</h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3">✅ You May:</h4>
              <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                <li>• Use our calculators for personal financial planning</li>
                <li>• Read and share our educational content (with attribution)</li>
                <li>• Access our services for non-commercial purposes</li>
                <li>• Print or save content for personal reference</li>
                <li>• Link to our website from your personal blog or social media</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">4.2 Prohibited Uses</h3>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6 border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3">❌ You May NOT:</h4>
              <ul className="text-red-800 dark:text-red-300 text-sm space-y-1">
                <li>• Copy, modify, or distribute our calculator software or code</li>
                <li>• Use our service for commercial purposes without permission</li>
                <li>• Attempt to reverse engineer our calculators or website</li>
                <li>• Remove copyright or proprietary notices</li>
                <li>• Create derivative works based on our content</li>
                <li>• Use automated tools to scrape our website</li>
                <li>• Attempt to disrupt or damage our service</li>
                <li>• Provide misleading or fraudulent information</li>
                <li>• Violate any applicable laws or regulations</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. Financial Information Disclaimer</h2>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-6 border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-3">
                ⚠️ Important Financial Disclaimer
              </h3>
              <p className="text-yellow-800 dark:text-yellow-300 text-sm mb-3">
                <strong>Educational Purpose Only:</strong> All calculators, articles, and information on BharatFin are provided 
                for educational and informational purposes only. They do not constitute professional financial, investment, 
                tax, or legal advice.
              </p>
              <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                <li>• Calculator results are estimates based on inputs provided</li>
                <li>• Actual returns may vary significantly from projections</li>
                <li>• Past performance does not guarantee future results</li>
                <li>• Tax laws and financial regulations change frequently</li>
                <li>• Always consult qualified professionals for personalized advice</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">5.1 Investment Risk Warning</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All investments carry risk of loss. Market conditions, economic factors, and regulatory changes can 
              significantly impact investment returns. You should carefully consider your financial situation, 
              investment objectives, and risk tolerance before making any investment decisions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">5.2 Tax Calculation Accuracy</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tax calculations are based on information available as of the publication date and current understanding 
              of tax laws. Tax regulations change frequently, and individual circumstances vary. Always verify tax 
              calculations with current official sources or qualified tax professionals.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. Data Privacy and Calculator Inputs</h2>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6 border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                🔐 Your Financial Data Privacy
              </h3>
              <p className="text-green-800 dark:text-green-300 text-sm mb-3">
                <strong>Local Processing:</strong> All financial calculations are performed locally in your browser. 
                Your financial data and calculator inputs are never transmitted to or stored on our servers.
              </p>
              <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                <li>• Calculator inputs remain on your device</li>
                <li>• No financial data is collected or stored</li>
                <li>• Your calculations are completely private</li>
                <li>• We cannot access your input values or results</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">7.1 Our Content</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property 
              of BharatFin and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">7.2 User Content</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Any content you provide through comments, feedback, or communication with us may be used by us to improve 
              our Service. You retain ownership of your content but grant us a license to use it for service improvement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">8. Third-Party Services and Links</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">8.1 External Links</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our Service may contain links to third-party websites or services that are not owned or controlled by BharatFin. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
              third-party websites or services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">8.2 Advertising</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may display advertisements through third-party services like Google AdSense. These services may collect 
              information about your visits to our site and other sites to provide relevant advertisements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">9. User Responsibilities</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">As a user of our Service, you agree to:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Financial Responsibility</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Verify all financial information independently</li>
                  <li>• Use calculator results as estimates only</li>
                  <li>• Consult professionals for important decisions</li>
                  <li>• Understand investment risks before investing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Legal Compliance</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <li>• Comply with all applicable laws</li>
                  <li>• Respect intellectual property rights</li>
                  <li>• Provide accurate information when requested</li>
                  <li>• Not misuse or attempt to damage our Service</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">10. Service Availability and Modifications</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">10.1 Service Availability</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We strive to provide continuous access to our Service, but we do not guarantee uninterrupted availability. 
              We may experience downtime for maintenance, updates, or technical issues.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">10.2 Service Modifications</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify, suspend, or discontinue any part of our Service at any time. We may also 
              update our calculators and content to reflect changes in financial regulations or improve accuracy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">11. Disclaimers and Warranties</h2>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6 border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200 mb-3">
                📋 Service Disclaimers
              </h3>
              <p className="text-orange-800 dark:text-orange-300 text-sm mb-3">
                <strong>"AS IS" Service:</strong> Your use of our Service is at your sole risk. The Service is provided on an 
                "AS IS" and "AS AVAILABLE" basis without any warranties of any kind.
              </p>
              <ul className="text-orange-800 dark:text-orange-300 text-sm space-y-1">
                <li>• We do not warrant that the Service will be error-free</li>
                <li>• We do not guarantee the accuracy of all information</li>
                <li>• We do not warrant uninterrupted service availability</li>
                <li>• Calculator results are estimates, not guaranteed outcomes</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">12. Limitation of Liability</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To the maximum extent permitted by applicable law, in no event shall BharatFin, its affiliates, officers, 
              directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive 
              damages, including but not limited to:
            </p>
            
            <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>• Loss of profits, revenue, or business opportunities</li>
              <li>• Loss of investments or financial losses</li>
              <li>• Loss of data or information</li>
              <li>• Business interruption or downtime</li>
              <li>• Any damages arising from reliance on calculator results</li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our total liability to you for all claims shall not exceed the amount you have paid us in the past twelve months, 
              or ₹1,000, whichever is less.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">13. Indemnification</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to defend, indemnify, and hold harmless BharatFin and its affiliates, officers, directors, employees, 
              and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
            </p>
            
            <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-1">
              <li>• Your use of and access to the Service</li>
              <li>• Your violation of any term of these Terms</li>
              <li>• Your violation of any third-party right</li>
              <li>• Any content you provide through the Service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">14. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">14.1 Termination by You</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You may stop using our Service at any time. If you have an account with us, you may delete it by contacting us.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">14.2 Termination by Us</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason, 
              including breach of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">15. Governing Law and Jurisdiction</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to 
              conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought 
              exclusively in the courts located in Mumbai, India.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">16. Changes to Terms</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to 
              provide at least 30 days' notice prior to any new terms taking effect. Material changes will be prominently 
              displayed on our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">17. Severability</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
              interpreted to accomplish the objectives of such provision to the greatest extent possible, and the remaining 
              provisions will continue in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">18. Contact Information</h2>
            
            <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Legal Inquiries</h4>
                  <p className="text-blue-600 dark:text-blue-400">legal@bharatfin.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    For questions about terms, legal matters, and compliance
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">General Support</h4>
                  <p className="text-blue-600 dark:text-blue-400">support@bharatfin.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    For technical support and general inquiries
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                🤝 Fair Use Policy
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                BharatFin is committed to providing free, accessible financial tools for all Indians. These Terms are 
                designed to protect both our users and our service while ensuring fair access to financial education and 
                calculation tools. Thank you for using BharatFin responsibly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}