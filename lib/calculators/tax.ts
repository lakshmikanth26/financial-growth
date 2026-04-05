export interface TaxInput {
  annualIncome: number;
  age: 'below60' | 'senior' | 'superSenior';
  
  // Old regime deductions
  section80C: number;
  section80D: number;
  hraExemption: number;
  homeLoanInterest: number;
  ltaExemption: number;
  professionalTax: number;
  otherDeductions: number;
}

export interface TaxResult {
  regime: 'new' | 'old';
  grossIncome: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebateAmount: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  slabWiseBreakdown: TaxSlabBreakdown[];
}

export interface TaxSlabBreakdown {
  slabMin: number;
  slabMax: number | null;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

export interface TaxComparison {
  newRegime: TaxResult;
  oldRegime: TaxResult;
  savings: number;
  recommendedRegime: 'new' | 'old';
  savingsPercentage: number;
}

// FY 2025-26 Tax Slabs
export const NEW_REGIME_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 5 },
  { min: 700000, max: 1000000, rate: 10 },
  { min: 1000000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: null, rate: 30 }
];

export const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 }
];

// Senior citizen slabs for old regime
export const OLD_REGIME_SENIOR_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 }
];

// Super senior citizen slabs for old regime
export const OLD_REGIME_SUPER_SENIOR_SLABS = [
  { min: 0, max: 500000, rate: 0 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 }
];

/**
 * Calculate tax under new regime
 */
export function calculateNewRegimeTax(input: TaxInput): TaxResult {
  const standardDeduction = 75000; // FY 2025-26
  const taxableIncome = Math.max(0, input.annualIncome - standardDeduction);
  
  const { taxBeforeRebate, slabWiseBreakdown } = calculateTaxFromSlabs(taxableIncome, NEW_REGIME_SLABS);
  
  // Rebate under Section 87A (New Regime)
  const rebateAmount = input.annualIncome <= 1200000 ? Math.min(taxBeforeRebate, 25000) : 0;
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebateAmount);
  
  // Health and Education Cess (4%)
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;
  
  const netIncome = input.annualIncome - totalTax;
  const effectiveTaxRate = input.annualIncome > 0 ? (totalTax / input.annualIncome) * 100 : 0;
  const marginalTaxRate = getMarginalTaxRate(taxableIncome, NEW_REGIME_SLABS);

  return {
    regime: 'new',
    grossIncome: input.annualIncome,
    taxableIncome,
    taxBeforeRebate,
    rebateAmount,
    taxAfterRebate,
    cess,
    totalTax,
    netIncome,
    effectiveTaxRate,
    marginalTaxRate,
    slabWiseBreakdown
  };
}

/**
 * Calculate tax under old regime
 */
export function calculateOldRegimeTax(input: TaxInput): TaxResult {
  const standardDeduction = 50000; // FY 2025-26
  
  // Total deductions
  const totalDeductions = standardDeduction + 
    input.section80C + 
    input.section80D + 
    input.hraExemption + 
    input.homeLoanInterest + 
    input.ltaExemption + 
    input.professionalTax + 
    input.otherDeductions;
  
  const taxableIncome = Math.max(0, input.annualIncome - totalDeductions);
  
  // Select appropriate slabs based on age
  let slabs = OLD_REGIME_SLABS;
  if (input.age === 'senior') {
    slabs = OLD_REGIME_SENIOR_SLABS;
  } else if (input.age === 'superSenior') {
    slabs = OLD_REGIME_SUPER_SENIOR_SLABS;
  }
  
  const { taxBeforeRebate, slabWiseBreakdown } = calculateTaxFromSlabs(taxableIncome, slabs);
  
  // Rebate under Section 87A (Old Regime) - only for income up to ₹5L
  const rebateAmount = input.annualIncome <= 500000 ? Math.min(taxBeforeRebate, 12500) : 0;
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebateAmount);
  
  // Health and Education Cess (4%)
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;
  
  const netIncome = input.annualIncome - totalTax;
  const effectiveTaxRate = input.annualIncome > 0 ? (totalTax / input.annualIncome) * 100 : 0;
  const marginalTaxRate = getMarginalTaxRate(taxableIncome, slabs);

  return {
    regime: 'old',
    grossIncome: input.annualIncome,
    taxableIncome,
    taxBeforeRebate,
    rebateAmount,
    taxAfterRebate,
    cess,
    totalTax,
    netIncome,
    effectiveTaxRate,
    marginalTaxRate,
    slabWiseBreakdown
  };
}

/**
 * Compare both tax regimes and recommend the better one
 */
export function compareTaxRegimes(input: TaxInput): TaxComparison {
  const newRegime = calculateNewRegimeTax(input);
  const oldRegime = calculateOldRegimeTax(input);
  
  const savings = oldRegime.totalTax - newRegime.totalTax;
  const recommendedRegime = savings > 0 ? 'new' : 'old';
  const savingsPercentage = oldRegime.totalTax > 0 ? (Math.abs(savings) / oldRegime.totalTax) * 100 : 0;

  return {
    newRegime,
    oldRegime,
    savings,
    recommendedRegime,
    savingsPercentage
  };
}

/**
 * Calculate tax from given slabs
 */
function calculateTaxFromSlabs(
  taxableIncome: number, 
  slabs: Array<{ min: number; max: number | null; rate: number }>
): { taxBeforeRebate: number; slabWiseBreakdown: TaxSlabBreakdown[] } {
  let totalTax = 0;
  const slabWiseBreakdown: TaxSlabBreakdown[] = [];
  
  for (const slab of slabs) {
    const slabMin = slab.min;
    const slabMax = slab.max || Infinity;
    
    if (taxableIncome > slabMin) {
      const taxableInThisSlab = Math.min(taxableIncome, slabMax) - slabMin;
      const taxInThisSlab = taxableInThisSlab * (slab.rate / 100);
      
      totalTax += taxInThisSlab;
      
      slabWiseBreakdown.push({
        slabMin,
        slabMax: slab.max,
        rate: slab.rate,
        taxableAmount: taxableInThisSlab,
        taxAmount: taxInThisSlab
      });
      
      if (taxableIncome <= slabMax) break;
    } else {
      // Add zero-tax slabs for completeness
      slabWiseBreakdown.push({
        slabMin,
        slabMax: slab.max,
        rate: slab.rate,
        taxableAmount: 0,
        taxAmount: 0
      });
    }
  }
  
  return { taxBeforeRebate: totalTax, slabWiseBreakdown };
}

/**
 * Get marginal tax rate for given income
 */
function getMarginalTaxRate(
  taxableIncome: number, 
  slabs: Array<{ min: number; max: number | null; rate: number }>
): number {
  for (const slab of slabs) {
    if (taxableIncome > slab.min && (slab.max === null || taxableIncome <= slab.max)) {
      return slab.rate;
    }
  }
  return 0;
}

/**
 * Calculate HRA exemption
 */
export function calculateHRAExemption(
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetroCity: boolean
): number {
  if (rentPaid === 0 || hraReceived === 0) return 0;
  
  const metroPercentage = isMetroCity ? 0.5 : 0.4;
  const exemptionOptions = [
    hraReceived,
    rentPaid - (basicSalary * 0.1),
    basicSalary * metroPercentage
  ];
  
  return Math.max(0, Math.min(...exemptionOptions));
}

/**
 * Calculate 80C eligible investments
 */
export function get80CInvestments(): Array<{ name: string; limit: number; description: string }> {
  return [
    { name: 'PPF', limit: 150000, description: 'Public Provident Fund - 15 year lock-in' },
    { name: 'ELSS', limit: 150000, description: 'Equity Linked Savings Scheme - 3 year lock-in' },
    { name: 'EPF', limit: 150000, description: 'Employee Provident Fund contribution' },
    { name: 'Life Insurance Premium', limit: 150000, description: 'Premium paid for life insurance' },
    { name: 'NSC', limit: 150000, description: 'National Savings Certificate - 5 year lock-in' },
    { name: 'Tax Saver FD', limit: 150000, description: 'Tax saving fixed deposit - 5 year lock-in' },
    { name: 'Sukanya Samriddhi', limit: 150000, description: 'Girl child savings scheme' },
    { name: 'Home Loan Principal', limit: 150000, description: 'Principal repayment of home loan' },
    { name: 'Tuition Fees', limit: 150000, description: 'Children\'s tuition fees' }
  ];
}