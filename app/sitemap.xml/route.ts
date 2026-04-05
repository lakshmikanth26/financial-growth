import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app'
  const lastmod = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  
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

  let urls = []

  // Root URL with hreflang
  urls.push(`
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    ${locales.map(locale => 
      `<xhtml:link rel="alternate" hreflang="${locale}" href="${siteUrl}/${locale}"/>`
    ).join('\n    ')}
  </url>`)

  // Home pages for each locale
  locales.forEach(locale => {
    urls.push(`
  <url>
    <loc>${siteUrl}/${locale}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`)
  })

  // Calculator pages for each locale
  locales.forEach(locale => {
    calculatorPaths.forEach(path => {
      urls.push(`
  <url>
    <loc>${siteUrl}/${locale}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls.join('')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}