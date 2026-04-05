/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
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
    additionalSitemaps: [
      'https://bharathfin.vercel.app/sitemap.xml',
    ],
  },
}