export interface SIPInput {
  monthlyInvestment: number;
  expectedReturn: number; // Annual return percentage
  timePeriod: number; // In years
  stepUpPercentage?: number; // Optional step-up percentage
}

export interface SIPResult {
  totalInvestment: number;
  totalReturns: number;
  maturityAmount: number;
  yearlyBreakdown: Array<{
    year: number;
    investment: number;
    returns: number;
    totalValue: number;
  }>;
}

export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyInvestment, expectedReturn, timePeriod, stepUpPercentage = 0 } = input;
  
  const monthlyRate = expectedReturn / (12 * 100);
  const totalMonths = timePeriod * 12;
  
  let totalInvestment = 0;
  let currentValue = 0;
  let currentMonthlyInvestment = monthlyInvestment;
  const yearlyBreakdown: Array<{
    year: number;
    investment: number;
    returns: number;
    totalValue: number;
  }> = [];

  for (let month = 1; month <= totalMonths; month++) {
    // Step-up investment amount yearly
    if (month > 1 && (month - 1) % 12 === 0 && stepUpPercentage > 0) {
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercentage / 100);
    }

    totalInvestment += currentMonthlyInvestment;
    currentValue = (currentValue + currentMonthlyInvestment) * (1 + monthlyRate);

    // Store yearly breakdown
    if (month % 12 === 0) {
      const year = month / 12;
      const returns = currentValue - totalInvestment;
      yearlyBreakdown.push({
        year,
        investment: totalInvestment,
        returns,
        totalValue: currentValue,
      });
    }
  }

  const maturityAmount = currentValue;
  const totalReturns = maturityAmount - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    totalReturns: Math.round(totalReturns),
    maturityAmount: Math.round(maturityAmount),
    yearlyBreakdown,
  };
}

// Helper function to calculate SIP amount needed for target
export function calculateSIPForTarget(targetAmount: number, expectedReturn: number, timePeriod: number): number {
  const monthlyRate = expectedReturn / (12 * 100);
  const totalMonths = timePeriod * 12;
  
  // Formula: P = FV / [((1+r)^n - 1) / r * (1+r)]
  const denominator = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate * (1 + monthlyRate);
  const monthlyInvestment = targetAmount / denominator;
  
  return Math.round(monthlyInvestment);
}