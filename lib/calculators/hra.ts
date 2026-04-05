export interface HRAInput {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  city: 'metro' | 'non-metro'; // Metro cities have 50% exemption, non-metro 40%
}

export interface HRAResult {
  hraExemption: number;
  taxableHRA: number;
  exemptionBreakdown: {
    actualHRA: number;
    rentMinusBasic: number;
    basicPercentage: number;
    exemption: number;
  };
}

export function calculateHRA(input: HRAInput): HRAResult {
  const { basicSalary, hraReceived, rentPaid, city } = input;
  
  // HRA exemption calculation
  // Exemption is minimum of:
  // 1. Actual HRA received
  // 2. Rent paid minus 10% of basic salary
  // 3. 50% of basic salary (metro) or 40% of basic salary (non-metro)
  
  const basicPercentage = city === 'metro' ? 0.5 : 0.4;
  const rentMinusBasic = Math.max(0, rentPaid - (basicSalary * 0.1));
  const basicPercentageAmount = basicSalary * basicPercentage;
  
  const exemption = Math.min(
    hraReceived,
    rentMinusBasic,
    basicPercentageAmount
  );
  
  const taxableHRA = Math.max(0, hraReceived - exemption);
  
  return {
    hraExemption: Math.round(exemption),
    taxableHRA: Math.round(taxableHRA),
    exemptionBreakdown: {
      actualHRA: hraReceived,
      rentMinusBasic: Math.round(rentMinusBasic),
      basicPercentage: Math.round(basicPercentageAmount),
      exemption: Math.round(exemption),
    },
  };
}

// Helper function to calculate annual HRA exemption
export function calculateAnnualHRA(monthlyInput: HRAInput): HRAResult {
  const annualInput: HRAInput = {
    basicSalary: monthlyInput.basicSalary * 12,
    hraReceived: monthlyInput.hraReceived * 12,
    rentPaid: monthlyInput.rentPaid * 12,
    city: monthlyInput.city,
  };
  
  return calculateHRA(annualInput);
}

// Helper function to get metro cities list
export function getMetroCities(): string[] {
  return [
    'Mumbai',
    'Delhi',
    'Chennai',
    'Kolkata',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Pune',
  ];
}