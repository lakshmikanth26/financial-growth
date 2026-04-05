/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatfin.in',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  alternateRefs: [
    {
      href: 'https://fincalc.in/en',
      hreflang: 'en',
    },
    {
      href: 'https://fincalc.in/hi',
      hreflang: 'hi',
    },
    {
      href: 'https://fincalc.in/ta',
      hreflang: 'ta',
    },
    {
      href: 'https://fincalc.in/te',
      hreflang: 'te',
    },
    {
      href: 'https://fincalc.in/kn',
      hreflang: 'kn',
    },
    {
      href: 'https://fincalc.in/bn',
      hreflang: 'bn',
    },
    {
      href: 'https://fincalc.in/mr',
      hreflang: 'mr',
    },
    {
      href: 'https://fincalc.in/gu',
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
    additionalSitemaps: [
      'https://fincalc.in/sitemap.xml',
    ],
  },
}