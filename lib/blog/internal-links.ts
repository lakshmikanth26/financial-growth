import { Locale } from './types';

// Internal linking keywords and their corresponding calculator URLs
export const calculatorKeywords = {
  'PPF calculator': '/calculators/ppf',
  'ppf calculator': '/calculators/ppf',
  'Public Provident Fund calculator': '/calculators/ppf',
  'FD calculator': '/calculators/fd',
  'fd calculator': '/calculators/fd',
  'Fixed Deposit calculator': '/calculators/fd',
  'fixed deposit calculator': '/calculators/fd',
  'SIP calculator': '/calculators/sip',
  'sip calculator': '/calculators/sip',
  'Systematic Investment Plan calculator': '/calculators/sip',
  'EMI calculator': '/calculators/emi',
  'emi calculator': '/calculators/emi',
  'loan calculator': '/calculators/emi',
  'NPS calculator': '/calculators/nps',
  'nps calculator': '/calculators/nps',
  'National Pension Scheme calculator': '/calculators/nps',
  'RD calculator': '/calculators/rd',
  'rd calculator': '/calculators/rd',
  'Recurring Deposit calculator': '/calculators/rd',
  'HRA calculator': '/calculators/hra',
  'hra calculator': '/calculators/hra',
  'House Rent Allowance calculator': '/calculators/hra',
  'Tax calculator': '/tax/new-vs-old-regime',
  'tax calculator': '/tax/new-vs-old-regime',
  'income tax calculator': '/tax/new-vs-old-regime',
};

// Blog internal linking keywords
export const blogKeywords = {
  'PPF interest rate': '/blog/ppf-interest-rate-2026',
  'ppf interest rate': '/blog/ppf-interest-rate-2026',
  'FD vs PPF': '/blog/fd-vs-ppf-india',
  'fd vs ppf': '/blog/fd-vs-ppf-india',
  'Fixed Deposit vs PPF': '/blog/fd-vs-ppf-india',
  'how to save tax': '/blog/how-to-save-tax-india',
  'tax saving': '/blog/how-to-save-tax-india',
  'tax planning': '/blog/how-to-save-tax-india',
  'Section 80C': '/blog/how-to-save-tax-india',
  'section 80c': '/blog/how-to-save-tax-india',
  'SIP mistakes': '/blog/sip-mistakes-beginners-india',
  'sip mistakes': '/blog/sip-mistakes-beginners-india',
  'home loan prepayment': '/blog/home-loan-prepayment-guide-india',
  'NPS vs PPF': '/blog/nps-vs-ppf-retirement-planning',
  'nps vs ppf': '/blog/nps-vs-ppf-retirement-planning',
  'retirement planning': '/blog/nps-vs-ppf-retirement-planning',
  'FD vs SIP': '/blog/fd-vs-sip-beginners-india',
  'fd vs sip': '/blog/fd-vs-sip-beginners-india',
  'emergency fund': '/blog/best-emergency-fund-strategy-india',
  'emergency fund strategy': '/blog/best-emergency-fund-strategy-india',
  'financial planning': '/blog/financial-planning-basics-india',
};

// Combine all keywords
export const allKeywords = { ...calculatorKeywords, ...blogKeywords };

/**
 * Automatically add internal links to content
 */
export function addInternalLinks(content: string, locale: Locale = 'en'): string {
  let processedContent = content;

  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Object.entries(allKeywords).sort(
    ([a], [b]) => b.length - a.length
  );

  for (const [keyword, path] of sortedKeywords) {
    // Create regex to match the keyword (case insensitive, whole word)
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    
    // Replace with link, but avoid replacing if already inside a link
    processedContent = processedContent.replace(regex, (match) => {
      // Check if this match is already inside a link tag
      const beforeMatch = processedContent.substring(0, processedContent.indexOf(match));
      const openLinks = (beforeMatch.match(/<a[^>]*>/g) || []).length;
      const closeLinks = (beforeMatch.match(/<\/a>/g) || []).length;
      
      // If we're inside a link, don't add another link
      if (openLinks > closeLinks) {
        return match;
      }
      
      // Add locale prefix to path
      const localizedPath = `/${locale}${path}`;
      return `[${match}](${localizedPath})`;
    });
  }

  return processedContent;
}

/**
 * Get related calculator links for a blog post
 */
export function getRelatedCalculatorLinks(calculatorSlugs: string[], locale: Locale = 'en') {
  return calculatorSlugs.map(slug => ({
    name: getCalculatorName(slug),
    url: `/${locale}/calculators/${slug}`,
    slug
  }));
}

/**
 * Get calculator display name from slug
 */
function getCalculatorName(slug: string): string {
  const names: Record<string, string> = {
    ppf: 'PPF Calculator',
    fd: 'FD Calculator',
    sip: 'SIP Calculator',
    emi: 'EMI Calculator',
    nps: 'NPS Calculator',
    rd: 'RD Calculator',
    hra: 'HRA Calculator'
  };
  
  return names[slug] || slug.toUpperCase() + ' Calculator';
}