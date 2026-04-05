export interface BankFDRate {
  bankName: string;
  bankSlug: string;
  generalRate: number;
  seniorCitizenRate: number;
  minAmount: number;
  maxAmount: number;
  tenure: string;
  lastUpdated: string;
  features: string[];
  website: string;
  customerCare: string;
}

export const bankFDRates: Record<string, BankFDRate> = {
  sbi: {
    bankName: 'State Bank of India (SBI)',
    bankSlug: 'sbi',
    generalRate: 6.8,
    seniorCitizenRate: 7.3,
    minAmount: 1000,
    maxAmount: 10000000,
    tenure: '1 year to 10 years',
    lastUpdated: '2026-04-05',
    features: [
      'Largest bank network in India',
      'Auto-renewal facility available',
      'Premature withdrawal allowed',
      'Loan against FD facility',
      'Online FD booking available',
      'Tax-saving FD (5-year lock-in) available'
    ],
    website: 'https://www.onlinesbi.sbi',
    customerCare: '1800 11 2211'
  },
  hdfc: {
    bankName: 'HDFC Bank',
    bankSlug: 'hdfc',
    generalRate: 7.0,
    seniorCitizenRate: 7.5,
    minAmount: 5000,
    maxAmount: 50000000,
    tenure: '7 days to 10 years',
    lastUpdated: '2026-04-05',
    features: [
      'Flexible tenure options',
      'Competitive interest rates',
      'Digital FD booking',
      'Sweep-in facility available',
      'Quarterly interest payout option',
      'Special rates for women customers'
    ],
    website: 'https://www.hdfcbank.com',
    customerCare: '1800 202 6161'
  },
  icici: {
    bankName: 'ICICI Bank',
    bankSlug: 'icici',
    generalRate: 6.9,
    seniorCitizenRate: 7.4,
    minAmount: 10000,
    maxAmount: 20000000,
    tenure: '7 days to 10 years',
    lastUpdated: '2026-04-05',
    features: [
      'iWish flexible FD available',
      'Monthly interest payout option',
      'Auto-renewal with higher rates',
      'Mobile banking FD booking',
      'Instant FD through ATM',
      'Special FD for NRIs'
    ],
    website: 'https://www.icicibank.com',
    customerCare: '1860 120 7777'
  }
};

export const fdTenureOptions = [
  { label: '7 days', months: 0.25, popular: false },
  { label: '1 month', months: 1, popular: false },
  { label: '3 months', months: 3, popular: true },
  { label: '6 months', months: 6, popular: true },
  { label: '1 year', months: 12, popular: true },
  { label: '2 years', months: 24, popular: true },
  { label: '3 years', months: 36, popular: false },
  { label: '5 years', months: 60, popular: true },
  { label: '10 years', months: 120, popular: false }
];

export function calculateFDMaturity(
  principal: number,
  rate: number,
  tenureMonths: number,
  compoundingFrequency: number = 4 // Quarterly
): number {
  const years = tenureMonths / 12;
  const maturityAmount = principal * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * years);
  return Math.round(maturityAmount);
}

export function getBankFDRate(bankSlug: string): BankFDRate | undefined {
  return bankFDRates[bankSlug];
}

export function getAllBanks(): BankFDRate[] {
  return Object.values(bankFDRates);
}

export function compareBankRates(amount: number = 100000, tenureMonths: number = 12) {
  return getAllBanks().map(bank => {
    const generalMaturity = calculateFDMaturity(amount, bank.generalRate, tenureMonths);
    const seniorMaturity = calculateFDMaturity(amount, bank.seniorCitizenRate, tenureMonths);
    
    return {
      ...bank,
      generalMaturity,
      seniorMaturity,
      generalInterest: generalMaturity - amount,
      seniorInterest: seniorMaturity - amount
    };
  }).sort((a, b) => b.generalRate - a.generalRate);
}