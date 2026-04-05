/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatfin.in',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  alternateRefs: [
    {
      href: 'https://bharatfin.in/en',
      hreflang: 'en',
    },
    {
      href: 'https://bharatfin.in/hi',
      hreflang: 'hi',
    },
    {
      href: 'https://bharatfin.in/ta',
      hreflang: 'ta',
    },
    {
      href: 'https://bharatfin.in/te',
      hreflang: 'te',
    },
    {
      href: 'https://bharatfin.in/kn',
      hreflang: 'kn',
    },
    {
      href: 'https://bharatfin.in/bn',
      hreflang: 'bn',
    },
    {
      href: 'https://bharatfin.in/mr',
      hreflang: 'mr',
    },
    {
      href: 'https://bharatfin.in/gu',
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
      'https://bharatfin.in/sitemap.xml',
    ],
  },
}