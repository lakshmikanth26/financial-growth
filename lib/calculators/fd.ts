export interface FDInput {
  principal: number;
  interestRate: number;
  tenure: number;
  tenureUnit: 'days' | 'months' | 'years';
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
  interestPayout: 'cumulative' | 'non-cumulative';
}

export interface FDResult {
  maturityAmount: number;
  totalInterest: number;
  effectiveYield: number;
  monthlyPayout?: number; // For non-cumulative FD
  yearWiseData: FDYearData[];
}

export interface FDYearData {
  year: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface BankRate {
  bankName: string;
  rate1Year: number;
  rate2Year: number;
  rate3Year: number;
  rate5Year: number;
  seniorCitizenBonus: number;
  lastUpdated: string;
}

/**
 * Calculate FD maturity amount with compound interest
 */
export function calculateFD(input: FDInput): FDResult {
  const { principal, interestRate, tenure, tenureUnit, compoundingFrequency, interestPayout } = input;
  
  // Validate inputs
  if (principal <= 0) {
    throw new Error('Principal amount must be greater than 0');
  }
  
  if (interestRate <= 0 || interestRate > 20) {
    throw new Error('Interest rate must be between 0% and 20%');
  }
  
  if (tenure <= 0) {
    throw new Error('Tenure must be greater than 0');
  }

  // Convert tenure to years
  let tenureInYears: number;
  switch (tenureUnit) {
    case 'days':
      tenureInYears = tenure / 365;
      break;
    case 'months':
      tenureInYears = tenure / 12;
      break;
    case 'years':
      tenureInYears = tenure;
      break;
  }

  const annualRate = interestRate / 100;
  
  if (interestPayout === 'non-cumulative') {
    // Simple interest calculation for non-cumulative FD
    return calculateNonCumulativeFD(principal, annualRate, tenureInYears, compoundingFrequency);
  } else {
    // Compound interest calculation for cumulative FD
    return calculateCumulativeFD(principal, annualRate, tenureInYears, compoundingFrequency);
  }
}

/**
 * Calculate cumulative FD (compound interest)
 */
function calculateCumulativeFD(
  principal: number,
  annualRate: number,
  tenureInYears: number,
  compoundingFrequency: string
): FDResult {
  // Get compounding frequency
  let n: number;
  switch (compoundingFrequency) {
    case 'monthly':
      n = 12;
      break;
    case 'quarterly':
      n = 4;
      break;
    case 'annually':
      n = 1;
      break;
    default:
      n = 4; // Default to quarterly
  }

  // Compound interest formula: A = P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(1 + annualRate / n, n * tenureInYears);
  const totalInterest = maturityAmount - principal;
  
  // Calculate effective annual yield
  const effectiveYield = (Math.pow(1 + annualRate / n, n) - 1) * 100;

  // Generate year-wise data
  const yearWiseData: FDYearData[] = [];
  let currentBalance = principal;
  let cumulativeInterest = 0;

  const totalYears = Math.ceil(tenureInYears);
  
  for (let year = 1; year <= totalYears; year++) {
    const yearFraction = Math.min(1, tenureInYears - (year - 1));
    const yearlyGrowth = Math.pow(1 + annualRate / n, n * yearFraction);
    const newBalance = currentBalance * yearlyGrowth;
    const yearlyInterest = newBalance - currentBalance;
    
    cumulativeInterest += yearlyInterest;
    
    yearWiseData.push({
      year,
      principal: year === 1 ? principal : 0,
      interest: yearlyInterest,
      balance: newBalance,
      cumulativeInterest
    });
    
    currentBalance = newBalance;
  }

  return {
    maturityAmount,
    totalInterest,
    effectiveYield,
    yearWiseData
  };
}

/**
 * Calculate non-cumulative FD (simple interest with periodic payouts)
 */
function calculateNonCumulativeFD(
  principal: number,
  annualRate: number,
  tenureInYears: number,
  compoundingFrequency: string
): FDResult {
  // For non-cumulative FD, interest is paid out periodically
  const totalInterest = principal * annualRate * tenureInYears;
  const maturityAmount = principal; // Only principal is returned at maturity
  
  // Calculate periodic payout
  let payoutFrequency: number;
  switch (compoundingFrequency) {
    case 'monthly':
      payoutFrequency = 12;
      break;
    case 'quarterly':
      payoutFrequency = 4;
      break;
    case 'annually':
      payoutFrequency = 1;
      break;
    default:
      payoutFrequency = 4;
  }
  
  const monthlyPayout = (principal * annualRate) / 12;
  
  // Generate year-wise data
  const yearWiseData: FDYearData[] = [];
  let cumulativeInterest = 0;
  
  const totalYears = Math.ceil(tenureInYears);
  
  for (let year = 1; year <= totalYears; year++) {
    const yearFraction = Math.min(1, tenureInYears - (year - 1));
    const yearlyInterest = principal * annualRate * yearFraction;
    cumulativeInterest += yearlyInterest;
    
    yearWiseData.push({
      year,
      principal: year === 1 ? principal : 0,
      interest: yearlyInterest,
      balance: principal, // Balance remains same for non-cumulative
      cumulativeInterest
    });
  }

  return {
    maturityAmount,
    totalInterest,
    effectiveYield: annualRate * 100, // Same as nominal rate for simple interest
    monthlyPayout,
    yearWiseData
  };
}

/**
 * Get current FD rates from major Indian banks
 */
export function getBankFDRates(): BankRate[] {
  // These rates should be updated regularly from bank websites
  // As of January 2025 (approximate rates)
  return [
    {
      bankName: 'SBI',
      rate1Year: 6.80,
      rate2Year: 7.00,
      rate3Year: 7.00,
      rate5Year: 6.50,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'HDFC Bank',
      rate1Year: 7.00,
      rate2Year: 7.25,
      rate3Year: 7.50,
      rate5Year: 7.25,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'ICICI Bank',
      rate1Year: 7.00,
      rate2Year: 7.25,
      rate3Year: 7.50,
      rate5Year: 7.25,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'Axis Bank',
      rate1Year: 7.25,
      rate2Year: 7.50,
      rate3Year: 7.75,
      rate5Year: 7.50,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'Kotak Mahindra Bank',
      rate1Year: 7.00,
      rate2Year: 7.25,
      rate3Year: 7.50,
      rate5Year: 7.25,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'Yes Bank',
      rate1Year: 7.75,
      rate2Year: 8.00,
      rate3Year: 8.25,
      rate5Year: 8.00,
      seniorCitizenBonus: 0.75,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'IndusInd Bank',
      rate1Year: 7.50,
      rate2Year: 7.75,
      rate3Year: 8.00,
      rate5Year: 7.75,
      seniorCitizenBonus: 0.50,
      lastUpdated: '2025-01-15'
    },
    {
      bankName: 'Bajaj Finance',
      rate1Year: 8.10,
      rate2Year: 8.35,
      rate3Year: 8.65,
      rate5Year: 8.40,
      seniorCitizenBonus: 0.25,
      lastUpdated: '2025-01-15'
    }
  ];
}

/**
 * Calculate TDS on FD interest
 */
export function calculateFDTDS(
  totalInterest: number,
  isSeniorCitizen: boolean = false
): { tdsAmount: number; tdsApplicable: boolean; exemptionLimit: number } {
  const exemptionLimit = isSeniorCitizen ? 50000 : 40000;
  const tdsApplicable = totalInterest > exemptionLimit;
  const tdsAmount = tdsApplicable ? totalInterest * 0.10 : 0; // 10% TDS rate
  
  return {
    tdsAmount,
    tdsApplicable,
    exemptionLimit
  };
}