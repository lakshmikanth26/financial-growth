export interface EMIInput {
  loanAmount: number;
  interestRate: number; // Annual interest rate percentage
  loanTenure: number; // In years
  tenureType?: 'years' | 'months'; // Default: years
}

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  monthlyBreakdown: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPaid: number;
    remainingBalance: number;
  }>;
}

export function calculateEMI(input: EMIInput): EMIResult {
  const { loanAmount, interestRate, loanTenure, tenureType = 'years' } = input;
  
  const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
  const monthlyRate = interestRate / (12 * 100);
  
  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - loanAmount;
  
  // Calculate monthly breakdown
  const monthlyBreakdown: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }> = [];
  
  let remainingBalance = loanAmount;
  
  for (let month = 1; month <= totalMonths; month++) {
    const interestComponent = remainingBalance * monthlyRate;
    const principalComponent = emi - interestComponent;
    remainingBalance -= principalComponent;
    
    monthlyBreakdown.push({
      month,
      emi: Math.round(emi),
      principal: Math.round(principalComponent),
      interest: Math.round(interestComponent),
      balance: Math.round(Math.max(0, remainingBalance)),
    });
  }
  
  // Calculate yearly breakdown
  const yearlyBreakdown: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPaid: number;
    remainingBalance: number;
  }> = [];
  
  const totalYears = Math.ceil(totalMonths / 12);
  
  for (let year = 1; year <= totalYears; year++) {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = Math.min(year * 12, totalMonths);
    
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = startMonth; month <= endMonth; month++) {
      const monthData = monthlyBreakdown[month - 1];
      yearlyPrincipal += monthData.principal;
      yearlyInterest += monthData.interest;
    }
    
    const lastMonthOfYear = monthlyBreakdown[endMonth - 1];
    
    yearlyBreakdown.push({
      year,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      totalPaid: Math.round(yearlyPrincipal + yearlyInterest),
      remainingBalance: lastMonthOfYear.balance,
    });
  }
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    monthlyBreakdown,
    yearlyBreakdown,
  };
}

// Helper function to calculate loan amount for target EMI
export function calculateLoanForEMI(targetEMI: number, interestRate: number, loanTenure: number): number {
  const totalMonths = loanTenure * 12;
  const monthlyRate = interestRate / (12 * 100);
  
  // Reverse EMI formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  const loanAmount = targetEMI * (Math.pow(1 + monthlyRate, totalMonths) - 1) / 
                     (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
  
  return Math.round(loanAmount);
}

// Helper function to calculate affordable EMI based on income
export function calculateAffordableEMI(monthlyIncome: number, existingEMIs: number = 0, foir: number = 50): number {
  // FOIR (Fixed Obligation to Income Ratio) - typically 40-50%
  const maxEMI = (monthlyIncome * foir) / 100;
  const affordableEMI = maxEMI - existingEMIs;
  
  return Math.round(Math.max(0, affordableEMI));
}