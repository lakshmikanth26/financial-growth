import type { Metadata } from 'next';
import EMICalculatorClient from './EMICalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'EMI Calculator India 2026 | Calculate Home, Car & Personal Loan EMI',
    description: 'Free EMI calculator for home loans, car loans, personal loans. Calculate monthly EMI, total interest, payment schedule. Updated for 2026 interest rates. Includes affordability calculator.',
    keywords: 'EMI calculator India, home loan EMI calculator, car loan EMI, personal loan calculator, EMI formula, loan affordability calculator 2026',
    authors: [{ name: 'BharatFin Editorial Team' }],
    alternates: {
      canonical: `/${locale}/calculators/emi`,
    },
    openGraph: {
      title: 'EMI Calculator India 2026 | Calculate Loan EMI with Payment Schedule',
      description: 'Free EMI calculator for all types of loans in India. Calculate monthly EMI, total interest, and payment schedule. Updated for 2026 rates.',
      url: `/${locale}/calculators/emi`,
      siteName: 'BharatFin',
      locale: locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function EMICalculatorPage() {
  return <EMICalculatorClient />;
}