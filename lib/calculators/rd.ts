export interface RDInput {
  monthlyDeposit: number;
  interestRate: number; // Annual interest rate percentage
  tenure: number; // In months
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually';
}

export interface RDResult {
  maturityAmount: number;
  totalDeposited: number;
  totalInterest: number;
  monthlyBreakdown: Array<{
    month: number;
    deposit: number;
    interest: number;
    balance: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    deposited: number;
    interest: number;
    balance: number;
  }>;
}

export function calculateRD(input: RDInput): RDResult {
  const { monthlyDeposit, interestRate, tenure, compoundingFrequency } = input;
  
  // Convert annual rate to monthly rate
  const annualRate = interestRate / 100;
  let monthlyRate: number;
  let compoundingPerYear: number;
  
  switch (compoundingFrequency) {
    case 'monthly':
      compoundingPerYear = 12;
      monthlyRate = annualRate / 12;
      break;
    case 'quarterly':
      compoundingPerYear = 4;
      monthlyRate = annualRate / 12;
      break;
    case 'annually':
      compoundingPerYear = 1;
      monthlyRate = annualRate / 12;
      break;
  }
  
  const totalDeposited = monthlyDeposit * tenure;
  
  // RD Formula: M = P * [(1 + r)^n - 1] / r * (1 + r)
  // Where P = monthly deposit, r = monthly rate, n = number of months
  const maturityAmount = monthlyDeposit * 
    (((Math.pow(1 + monthlyRate, tenure) - 1) / monthlyRate) * (1 + monthlyRate));
  
  const totalInterest = maturityAmount - totalDeposited;
  
  // Calculate monthly breakdown
  const monthlyBreakdown: Array<{
    month: number;
    deposit: number;
    interest: number;
    balance: number;
  }> = [];
  
  let runningBalance = 0;
  
  for (let month = 1; month <= tenure; month++) {
    runningBalance += monthlyDeposit;
    const interestEarned = runningBalance * monthlyRate;
    runningBalance += interestEarned;
    
    monthlyBreakdown.push({
      month,
      deposit: monthlyDeposit,
      interest: interestEarned,
      balance: runningBalance,
    });
  }
  
  // Calculate yearly breakdown
  const yearlyBreakdown: Array<{
    year: number;
    deposited: number;
    interest: number;
    balance: number;
  }> = [];
  
  const totalYears = Math.ceil(tenure / 12);
  
  for (let year = 1; year <= totalYears; year++) {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = Math.min(year * 12, tenure);
    
    let yearlyDeposited = 0;
    let yearlyInterest = 0;
    
    for (let month = startMonth; month <= endMonth; month++) {
      const monthData = monthlyBreakdown[month - 1];
      yearlyDeposited += monthData.deposit;
      yearlyInterest += monthData.interest;
    }
    
    const lastMonthOfYear = monthlyBreakdown[endMonth - 1];
    
    yearlyBreakdown.push({
      year,
      deposited: yearlyDeposited,
      interest: yearlyInterest,
      balance: lastMonthOfYear.balance,
    });
  }
  
  return {
    maturityAmount: Math.round(maturityAmount),
    totalDeposited: Math.round(totalDeposited),
    totalInterest: Math.round(totalInterest),
    monthlyBreakdown: monthlyBreakdown.map(item => ({
      ...item,
      interest: Math.round(item.interest),
      balance: Math.round(item.balance),
    })),
    yearlyBreakdown: yearlyBreakdown.map(item => ({
      ...item,
      deposited: Math.round(item.deposited),
      interest: Math.round(item.interest),
      balance: Math.round(item.balance),
    })),
  };
}

// Helper function to get current RD rates from major banks
export function getBankRDRates() {
  return {
    sbi: { rate: 6.5, bank: 'State Bank of India' },
    hdfc: { rate: 6.75, bank: 'HDFC Bank' },
    icici: { rate: 6.5, bank: 'ICICI Bank' },
    axis: { rate: 6.75, bank: 'Axis Bank' },
    pnb: { rate: 6.25, bank: 'Punjab National Bank' },
    bob: { rate: 6.0, bank: 'Bank of Baroda' },
  };
}

// Helper function to calculate required monthly deposit for target amount
export function calculateRDForTarget(targetAmount: number, interestRate: number, tenure: number): number {
  const monthlyRate = interestRate / (12 * 100);
  
  // Reverse RD formula
  const monthlyDeposit = targetAmount / 
    (((Math.pow(1 + monthlyRate, tenure) - 1) / monthlyRate) * (1 + monthlyRate));
  
  return Math.round(monthlyDeposit);
}