export interface PPFInput {
  yearlyDeposit: number;
  tenure: number;
  currentRate: number;
}

export interface PPFResult {
  totalInvested: number;
  totalInterest: number;
  maturityAmount: number;
  yearWiseData: PPFYearData[];
}

export interface PPFYearData {
  year: number;
  deposit: number;
  interest: number;
  balance: number;
  cumulativeDeposit: number;
  cumulativeInterest: number;
}

/**
 * Calculate PPF maturity amount and year-wise breakdown
 * PPF compounds annually and has a 15-year lock-in period
 */
export function calculatePPF(input: PPFInput): PPFResult {
  const { yearlyDeposit, tenure, currentRate } = input;
  
  // Validate inputs
  if (yearlyDeposit < 500 || yearlyDeposit > 150000) {
    throw new Error('Yearly deposit must be between ₹500 and ₹1,50,000');
  }
  
  if (tenure < 15) {
    throw new Error('PPF has a minimum lock-in period of 15 years');
  }
  
  if (currentRate <= 0 || currentRate > 20) {
    throw new Error('Interest rate must be between 0% and 20%');
  }

  const annualRate = currentRate / 100;
  const yearWiseData: PPFYearData[] = [];
  
  let balance = 0;
  let cumulativeDeposit = 0;
  let cumulativeInterest = 0;

  for (let year = 1; year <= tenure; year++) {
    // Add yearly deposit at the beginning of the year
    balance += yearlyDeposit;
    cumulativeDeposit += yearlyDeposit;
    
    // Calculate interest on the balance (compounded annually)
    const yearlyInterest = balance * annualRate;
    balance += yearlyInterest;
    cumulativeInterest += yearlyInterest;
    
    yearWiseData.push({
      year,
      deposit: yearlyDeposit,
      interest: yearlyInterest,
      balance,
      cumulativeDeposit,
      cumulativeInterest
    });
  }

  return {
    totalInvested: cumulativeDeposit,
    totalInterest: cumulativeInterest,
    maturityAmount: balance,
    yearWiseData
  };
}

/**
 * Calculate partial withdrawal amount (available from 7th year)
 * Can withdraw up to 50% of balance at end of 4th preceding year
 */
export function calculatePPFPartialWithdrawal(
  yearWiseData: PPFYearData[],
  withdrawalYear: number
): number {
  if (withdrawalYear < 7) {
    throw new Error('Partial withdrawal is only allowed from 7th year onwards');
  }
  
  const fourthPrecedingYear = withdrawalYear - 4;
  const balanceAtEndOfFourthYear = yearWiseData[fourthPrecedingYear - 1]?.balance || 0;
  
  return balanceAtEndOfFourthYear * 0.5;
}

/**
 * Calculate PPF extension scenarios (after 15 years)
 * Can extend in blocks of 5 years with or without contributions
 */
export function calculatePPFExtension(
  initialBalance: number,
  extensionYears: number,
  continuousDeposit: number,
  interestRate: number
): PPFResult {
  if (extensionYears % 5 !== 0) {
    throw new Error('PPF can only be extended in blocks of 5 years');
  }

  const annualRate = interestRate / 100;
  const yearWiseData: PPFYearData[] = [];
  
  let balance = initialBalance;
  let cumulativeDeposit = continuousDeposit > 0 ? 0 : 0; // Only count new deposits during extension
  let cumulativeInterest = 0;

  for (let year = 1; year <= extensionYears; year++) {
    // Add yearly deposit if continuing contributions
    if (continuousDeposit > 0) {
      balance += continuousDeposit;
      cumulativeDeposit += continuousDeposit;
    }
    
    // Calculate interest
    const yearlyInterest = balance * annualRate;
    balance += yearlyInterest;
    cumulativeInterest += yearlyInterest;
    
    yearWiseData.push({
      year: year + 15, // Extension years start after 15
      deposit: continuousDeposit,
      interest: yearlyInterest,
      balance,
      cumulativeDeposit,
      cumulativeInterest
    });
  }

  return {
    totalInvested: cumulativeDeposit,
    totalInterest: cumulativeInterest,
    maturityAmount: balance,
    yearWiseData
  };
}

/**
 * Get current PPF interest rate (updated quarterly by government)
 */
export function getCurrentPPFRate(): number {
  // As of Q1 FY2025-26 - update this when RBI announces new rates
  return 7.1;
}

/**
 * Calculate tax benefits under Section 80C
 */
export function calculatePPFTaxBenefit(
  yearlyDeposit: number,
  taxSlab: number
): number {
  const maxDeduction = Math.min(yearlyDeposit, 150000); // 80C limit
  return maxDeduction * (taxSlab / 100);
}