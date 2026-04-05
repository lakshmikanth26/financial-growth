# FinCalc India 🇮🇳

India's fastest multilingual financial calculators for smart investment decisions. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **15+ Financial Calculators**: PPF, FD, SIP, EMI, Tax, NPS, and more
- **8 Indian Languages**: English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati
- **Real-time Calculations**: Instant results as you type
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Built for Google India ranking
- **Ad Revenue Ready**: Google AdSense integration
- **Fast Performance**: Core Web Vitals optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fincalc-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🧮 Available Calculators

### Phase 1 (Completed)
- ✅ **PPF Calculator** - Calculate PPF maturity with 15-year lock-in
- ✅ **FD Calculator** - Fixed deposit with compound interest and bank comparison
- ✅ **Tax Calculator** - New vs Old regime comparison for FY 2025-26
- ⏳ **SIP Calculator** - Systematic Investment Plan returns
- ⏳ **EMI Calculator** - Loan EMI with amortization schedule
- ⏳ **RD Calculator** - Recurring deposit maturity
- ⏳ **NPS Calculator** - National Pension System corpus and pension

### Phase 2 (Planned)
- **Government Schemes** - PM Kisan, PMAY, Mudra Loan, etc.
- **Business Calculators** - GST, Profit Margin, Business Ideas
- **Investment Comparison** - Mutual fund analysis

### Phase 3 (Planned)
- **AI-Powered News** - Curated financial news with relevance scoring
- **Portfolio Tracker** - Track investments across platforms

## 🌐 Multilingual Support

The platform supports 8 Indian languages:

| Language | Code | Native Name |
|----------|------|-------------|
| English | `en` | English |
| Hindi | `hi` | हिंदी |
| Tamil | `ta` | தமிழ் |
| Telugu | `te` | తెలుగు |
| Kannada | `kn` | ಕನ್ನಡ |
| Bengali | `bn` | বাংলা |
| Marathi | `mr` | मराठी |
| Gujarati | `gu` | ગુજરાતી |

## 📱 URL Structure

```
/                           # Homepage
/[locale]/calculators/ppf   # PPF Calculator
/[locale]/calculators/fd    # FD Calculator  
/[locale]/tax/new-vs-old-regime # Tax Calculator
/[locale]/mutual-funds/top-funds # Top Mutual Funds
/[locale]/govt-schemes      # Government Schemes
/[locale]/news             # Financial News
```

## 🔧 Development

### Adding a New Calculator

1. **Create math functions** in `lib/calculators/`
2. **Add translation keys** in `messages/en.json` and other language files
3. **Create the page** in `app/[locale]/calculators/[name]/page.tsx`
4. **Use CalculatorLayout** component for consistent UI
5. **Add to navigation** in components and homepage

### Example Calculator Structure

```typescript
// lib/calculators/example.ts
export interface ExampleInput {
  amount: number;
  rate: number;
  tenure: number;
}

export interface ExampleResult {
  maturityAmount: number;
  totalInterest: number;
}

export function calculateExample(input: ExampleInput): ExampleResult {
  // Pure math function - no UI dependencies
  const maturityAmount = input.amount * Math.pow(1 + input.rate/100, input.tenure);
  const totalInterest = maturityAmount - input.amount;
  
  return { maturityAmount, totalInterest };
}
```

## 🎨 Design System

### Colors
- **Primary**: `#1a56db` (Trust Blue)
- **Secondary**: `#0e9f6e` (Growth Green)  
- **Accent**: `#ff5a1f` (Alert Orange)

### Typography
- **Display Font**: Sora (headings, results)
- **Body Font**: Plus Jakarta Sans (body text, UI)

### Components
- All calculators use the shared `CalculatorLayout`
- Consistent result cards with large, bold numbers
- Charts use blue for principal, green for gains
- Ad slots positioned for optimal CTR

## 📈 SEO & Performance

### Core Web Vitals
- **LCP**: < 1.2s (Largest Contentful Paint)
- **CLS**: < 0.05 (Cumulative Layout Shift)
- **FID/INP**: < 50ms (First Input Delay/Interaction to Next Paint)

### SEO Features
- Unique meta titles and descriptions for each calculator
- JSON-LD structured data (FAQPage, WebApplication, BreadcrumbList)
- Canonical URLs with hreflang for all languages
- OpenGraph images for social sharing
- Sitemap auto-generation

## 💰 Monetization

### Ad Placement Strategy
1. **After input form, before results** (highest CTR)
2. **After chart, before FAQ**
3. **Sidebar on desktop** (300×600 sticky)
4. **Footer banner** (728×90 desktop / 320×50 mobile)

### Revenue Growth Path
- **Month 1-3**: Google AdSense (₹0.5-2 RPM)
- **Month 4-6**: Optimized ad placements (₹2-5 RPM)
- **Month 6-12**: Ezoic migration (₹5-15 RPM)
- **Month 12+**: Direct sponsorships + affiliate links

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
ANTHROPIC_API_KEY=sk-ant-production-key
NEXT_PUBLIC_SITE_URL=https://fincalc.in
```

## 📊 Analytics & Monitoring

### Google Analytics 4
- **Goal Tracking**: Calculator usage, page views, engagement
- **Custom Events**: Calculator completions, language switches
- **Audience Insights**: Geographic distribution, device usage

### Performance Monitoring
- **Vercel Analytics**: Core Web Vitals, page load times
- **Google Search Console**: Search performance, indexing status
- **PageSpeed Insights**: Performance optimization recommendations

## 🔄 Content Updates

### Regular Updates Required
- **February**: Budget day - update tax slabs and regime calculator
- **April 1**: New FY - update all "FY 202X-2Y" references  
- **Quarterly**: RBI rate reviews - update PPF/FD/SCSS rates
- **Monthly**: Mutual fund top 10 refresh (automated)
- **Every 2 hours**: News page refresh (automated)

## 📝 Legal & Compliance

### Required Disclaimers
- "This calculator is for educational purposes only"
- "Past performance does not guarantee future results"
- "Please consult a financial advisor for investment decisions"
- SEBI disclaimer on all mutual fund pages
- Privacy Policy and Cookie Consent for AdSense

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-calculator`)
3. Commit your changes (`git commit -m 'Add amazing calculator'`)
4. Push to the branch (`git push origin feature/amazing-calculator`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indian Government** for financial schemes and tax slab data
- **RBI** for interest rate information
- **SEBI** for mutual fund regulations and guidelines
- **Open Source Community** for the amazing tools and libraries

---

**Built with ❤️ for Indian investors | Made in India 🇮🇳**

For questions or support, reach out at: [contact@fincalc.in](mailto:contact@fincalc.in)