export interface NPSInput {
  currentAge: number;
  retirementAge: number; // Must be 60 or later
  monthlyContribution: number;
  expectedReturn: number; // Annual return percentage
  annuityReturn?: number; // Return on annuity (default 6%)
}

export interface NPSResult {
  totalInvestment: number;
  maturityAmount: number;
  totalReturns: number;
  // At retirement (60% lump sum + 40% annuity rule)
  lumpSumAmount: number; // 60% of corpus
  annuityAmount: number; // 40% of corpus
  monthlyPension: number; // Monthly pension from annuity
  yearlyBreakdown: Array<{
    age: number;
    year: number;
    investment: number;
    returns: number;
    totalValue: number;
  }>;
}

export function calculateNPS(input: NPSInput): NPSResult {
  const { currentAge, retirementAge, monthlyContribution, expectedReturn, annuityReturn = 6 } = input;
  
  if (retirementAge < 60) {
    throw new Error('Retirement age must be at least 60 years for NPS');
  }
  
  const investmentYears = retirementAge - currentAge;
  const totalMonths = investmentYears * 12;
  const monthlyRate = expectedReturn / (12 * 100);
  
  let totalInvestment = 0;
  let currentValue = 0;
  const yearlyBreakdown: Array<{
    age: number;
    year: number;
    investment: number;
    returns: number;
    totalValue: number;
  }> = [];

  for (let month = 1; month <= totalMonths; month++) {
    totalInvestment += monthlyContribution;
    currentValue = (currentValue + monthlyContribution) * (1 + monthlyRate);

    // Store yearly breakdown
    if (month % 12 === 0) {
      const year = month / 12;
      const age = currentAge + year;
      const returns = currentValue - totalInvestment;
      yearlyBreakdown.push({
        age,
        year,
        investment: totalInvestment,
        returns,
        totalValue: currentValue,
      });
    }
  }

  const maturityAmount = currentValue;
  const totalReturns = maturityAmount - totalInvestment;

  // NPS withdrawal rules: 60% lump sum, 40% annuity
  const lumpSumAmount = maturityAmount * 0.6;
  const annuityAmount = maturityAmount * 0.4;
  
  // Calculate monthly pension from annuity (assuming life expectancy of 25 years post retirement)
  const annuityMonthlyRate = annuityReturn / (12 * 100);
  const annuityMonths = 25 * 12; // 25 years
  const monthlyPension = (annuityAmount * annuityMonthlyRate) / (1 - Math.pow(1 + annuityMonthlyRate, -annuityMonths));

  return {
    totalInvestment: Math.round(totalInvestment),
    maturityAmount: Math.round(maturityAmount),
    totalReturns: Math.round(totalReturns),
    lumpSumAmount: Math.round(lumpSumAmount),
    annuityAmount: Math.round(annuityAmount),
    monthlyPension: Math.round(monthlyPension),
    yearlyBreakdown,
  };
}

// Helper function to calculate required monthly contribution for target corpus
export function calculateNPSForTarget(
  targetCorpus: number,
  currentAge: number,
  retirementAge: number,
  expectedReturn: number
): number {
  const investmentYears = retirementAge - currentAge;
  const totalMonths = investmentYears * 12;
  const monthlyRate = expectedReturn / (12 * 100);
  
  // Formula: P = FV / [((1+r)^n - 1) / r * (1+r)]
  const denominator = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate * (1 + monthlyRate);
  const monthlyContribution = targetCorpus / denominator;
  
  return Math.round(monthlyContribution);
}