import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog/data'
import { getAllBanks } from '@/lib/programmatic-seo/bank-data'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app'
  const lastmod = '2026-04-05'
  
  const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn', 'mr', 'gu']
  const calculatorPaths = [
    '/calculators/ppf',
    '/calculators/fd', 
    '/calculators/sip',
    '/calculators/nps',
    '/calculators/emi',
    '/calculators/rd',
    '/calculators/hra',
    '/tax/new-vs-old-regime'
  ]
  
  // Get blog posts and banks for programmatic SEO
  const blogPosts = getAllBlogPosts()
  const banks = getAllBanks()

  let urls = []

  // Root URL with hreflang
  urls.push(`  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${siteUrl}/hi"/>
    <xhtml:link rel="alternate" hreflang="ta" href="${siteUrl}/ta"/>
    <xhtml:link rel="alternate" hreflang="te" href="${siteUrl}/te"/>
    <xhtml:link rel="alternate" hreflang="kn" href="${siteUrl}/kn"/>
    <xhtml:link rel="alternate" hreflang="bn" href="${siteUrl}/bn"/>
    <xhtml:link rel="alternate" hreflang="mr" href="${siteUrl}/mr"/>
    <xhtml:link rel="alternate" hreflang="gu" href="${siteUrl}/gu"/>
  </url>`)

  // Home pages for each locale
  locales.forEach(locale => {
    urls.push(`  <url>
    <loc>${siteUrl}/${locale}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`)
  })

  // Calculator pages for each locale
  locales.forEach(locale => {
    calculatorPaths.forEach(path => {
      urls.push(`  <url>
    <loc>${siteUrl}/${locale}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    })
  })

  // Blog listing pages for each locale
  locales.forEach(locale => {
    urls.push(`  <url>
    <loc>${siteUrl}/${locale}/blog</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
  })

  // Individual blog posts for each locale
  locales.forEach(locale => {
    blogPosts.forEach(post => {
      urls.push(`  <url>
    <loc>${siteUrl}/${locale}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    })
  })

  // Programmatic SEO pages: Bank FD rates for each locale
  locales.forEach(locale => {
    banks.forEach(bank => {
      urls.push(`  <url>
    <loc>${siteUrl}/${locale}/fd-interest-rate-${bank.bankSlug}</loc>
    <lastmod>${bank.lastUpdated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
}