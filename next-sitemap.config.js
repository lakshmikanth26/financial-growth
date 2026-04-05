/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => {
    const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn', 'mr', 'gu'];
    const calculatorPaths = [
      '/calculators/ppf',
      '/calculators/fd', 
      '/calculators/sip',
      '/calculators/nps',
      '/calculators/emi',
      '/calculators/rd',
      '/calculators/hra',
      '/tax/new-vs-old-regime'
    ];
    
    const paths = [];
    
    // Add home page for each locale
    locales.forEach(locale => {
      paths.push({
        loc: `/${locale}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add calculator pages for each locale
    locales.forEach(locale => {
      calculatorPaths.forEach(path => {
        paths.push({
          loc: `/${locale}${path}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });
    });
    
    return paths;
  },
  alternateRefs: [
    {
      href: 'https://bharathfin.vercel.app/en',
      hreflang: 'en',
    },
    {
      href: 'https://bharathfin.vercel.app/hi',
      hreflang: 'hi',
    },
    {
      href: 'https://bharathfin.vercel.app/ta',
      hreflang: 'ta',
    },
    {
      href: 'https://bharathfin.vercel.app/te',
      hreflang: 'te',
    },
    {
      href: 'https://bharathfin.vercel.app/kn',
      hreflang: 'kn',
    },
    {
      href: 'https://bharathfin.vercel.app/bn',
      hreflang: 'bn',
    },
    {
      href: 'https://bharathfin.vercel.app/mr',
      hreflang: 'mr',
    },
    {
      href: 'https://bharathfin.vercel.app/gu',
      hreflang: 'gu',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
}