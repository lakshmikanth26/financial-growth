import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBankFDRate, getAllBanks, calculateFDMaturity, compareBankRates, fdTenureOptions } from '@/lib/programmatic-seo/bank-data';
import { Locale } from '@/lib/blog/types';
import { AdSlot } from '@/components/layout/AdSlot';
import { Calculator, TrendingUp, Building, Phone, Globe, ArrowRight, CheckCircle } from 'lucide-react';

interface BankFDPageProps {
  params: Promise<{ locale: Locale; bank: string }>;
}

// Generate static params for all banks
export async function generateStaticParams() {
  const banks = getAllBanks();
  const locales: Locale[] = ['en', 'hi', 'te', 'ta', 'kn', 'bn', 'mr', 'gu'];
  
  const params: { locale: Locale; bank: string }[] = [];
  
  banks.forEach(bank => {
    locales.forEach(locale => {
      params.push({ locale, bank: bank.bankSlug });
    });
  });
  
  return params;
}

// Generate metadata for each bank FD page
export async function generateMetadata({ params }: BankFDPageProps): Promise<Metadata> {
  const { locale, bank } = await params;
  const bankData = getBankFDRate(bank);
  
  if (!bankData) {
    return {
      title: 'Bank Not Found | BharatFin',
      description: 'The requested bank FD rates could not be found.',
    };
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app';
  
  return {
    title: `${bankData.bankName} FD Interest Rate 2026: ${bankData.generalRate}% Returns & Calculator`,
    description: `${bankData.bankName} Fixed Deposit interest rate 2026 is ${bankData.generalRate}% (${bankData.seniorCitizenRate}% for seniors). Calculate FD returns, compare rates, and invest online.`,
    keywords: `${bankData.bankName} FD rate, ${bank} fixed deposit, ${bankData.bankName} interest rate 2026, FD calculator ${bank}, fixed deposit ${bankData.bankName}`,
    alternates: {
      canonical: `${siteUrl}/${locale}/fd-interest-rate-${bank}`,
      languages: {
        'en': `${siteUrl}/en/fd-interest-rate-${bank}`,
        'hi': `${siteUrl}/hi/fd-interest-rate-${bank}`,
        'te': `${siteUrl}/te/fd-interest-rate-${bank}`,
        'ta': `${siteUrl}/ta/fd-interest-rate-${bank}`,
        'kn': `${siteUrl}/kn/fd-interest-rate-${bank}`,
        'bn': `${siteUrl}/bn/fd-interest-rate-${bank}`,
        'mr': `${siteUrl}/mr/fd-interest-rate-${bank}`,
        'gu': `${siteUrl}/gu/fd-interest-rate-${bank}`,
      },
    },
    openGraph: {
      title: `${bankData.bankName} FD Rate 2026: ${bankData.generalRate}% Interest`,
      description: `Get latest ${bankData.bankName} Fixed Deposit rates, calculate returns, and compare with other banks. Updated FD interest rates for 2026.`,
      url: `${siteUrl}/${locale}/fd-interest-rate-${bank}`,
      siteName: 'BharatFin',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/fd-rates-${bank}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${bankData.bankName} FD Interest Rates 2026`,
        }
      ],
    },
  };
}

export default async function BankFDPage({ params }: BankFDPageProps) {
  const { locale, bank } = await params;
  const bankData = getBankFDRate(bank);
  
  if (!bankData) {
    notFound();
  }
  
  const comparisonData = compareBankRates(100000, 12);
  const sampleCalculations = [
    { amount: 50000, tenure: 12 },
    { amount: 100000, tenure: 12 },
    { amount: 500000, tenure: 24 },
    { amount: 1000000, tenure: 60 }
  ];
  
  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${bankData.bankName} Fixed Deposit`,
    description: `Fixed Deposit offered by ${bankData.bankName} with ${bankData.generalRate}% interest rate`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bankData.bankName,
      url: bankData.website,
      telephone: bankData.customerCare
    },
    interestRate: `${bankData.generalRate}%`,
    currency: 'INR',
    feesAndCommissionsSpecification: `Minimum amount: ₹${bankData.minAmount.toLocaleString()}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/fd-interest-rate-${bank}`
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Header Ad */}
        <AdSlot 
          slot="fd-bank-header"
          format="horizontal"
          className="w-full max-w-4xl mx-auto mb-8"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href={`/${locale}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-3 w-3 mx-2" />
                <Link href={`/${locale}/calculators/fd`} className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  FD Calculator
                </Link>
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-3 w-3 mx-2" />
                <span className="text-gray-900 dark:text-gray-100">{bankData.bankName} FD Rates</span>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                {bankData.bankName} FD Interest Rate 2026
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get the latest Fixed Deposit interest rates from {bankData.bankName}. 
              Calculate returns, compare with other banks, and make informed investment decisions.
            </p>
          </div>

          {/* Key Rates Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">General Rate</h3>
              <p className="text-3xl font-bold">{bankData.generalRate}%</p>
              <p className="text-sm opacity-90">Per annum</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">Senior Citizen Rate</h3>
              <p className="text-3xl font-bold">{bankData.seniorCitizenRate}%</p>
              <p className="text-sm opacity-90">Additional 0.5% for seniors</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white text-center">
              <Calculator className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-1">Minimum Amount</h3>
              <p className="text-3xl font-bold">₹{(bankData.minAmount / 1000).toFixed(0)}K</p>
              <p className="text-sm opacity-90">Starting investment</p>
            </div>
          </div>

          {/* Sample Calculations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {bankData.bankName} FD Maturity Calculator
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Investment Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tenure
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Interest Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Maturity Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Interest Earned
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sampleCalculations.map((calc, index) => {
                      const maturity = calculateFDMaturity(calc.amount, bankData.generalRate, calc.tenure);
                      const interest = maturity - calc.amount;
                      return (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            ₹{calc.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {calc.tenure} months
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {bankData.generalRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            ₹{maturity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                            ₹{interest.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* In-Content Ad */}
          <AdSlot 
            slot="fd-bank-content"
            format="rectangle"
            className="w-full max-w-md mx-auto my-12"
          />

          {/* Bank Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {bankData.bankName} FD Features & Benefits
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankData.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rate Comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Compare FD Rates: {bankData.bankName} vs Other Banks
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Bank Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        General Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Senior Citizen Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Maturity on ₹1L (1 Year)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {comparisonData.map((bankComp, index) => (
                      <tr 
                        key={bankComp.bankSlug} 
                        className={`hover:bg-gray-50 dark:hover:bg-slate-700 ${
                          bankComp.bankSlug === bank ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {bankComp.bankName}
                            </div>
                            {bankComp.bankSlug === bank && (
                              <span className="ml-2 px-2 py-1 text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded">
                                Current
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {bankComp.generalRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {bankComp.seniorCitizenRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          ₹{bankComp.generalMaturity.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {bankData.bankName} Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Customer Care</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{bankData.customerCare}</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Official Website</h3>
                </div>
                <a 
                  href={bankData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {bankData.website}
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Calculate Your {bankData.bankName} FD Returns
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Use our advanced FD calculator to plan your investment and compare returns across different tenures.
            </p>
            <Link
              href={`/${locale}/calculators/fd`}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Calculator className="h-5 w-5 mr-2" />
              FD Calculator
            </Link>
          </section>
        </div>

        {/* Footer Ad */}
        <AdSlot 
          slot="fd-bank-footer"
          format="horizontal"
          className="w-full max-w-4xl mx-auto mt-8 mb-4"
        />
      </div>
    </>
  );
}