import { Metadata } from 'next';
import { BlogPost, Locale } from './types';

/**
 * Generate SEO metadata for blog posts
 */
export function generateBlogMetadata(
  post: BlogPost,
  locale: Locale = 'en'
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app';
  const canonicalUrl = `${siteUrl}/${locale}/blog/${post.slug}`;
  
  // Generate hreflang alternates for all supported locales
  const locales: Locale[] = ['en', 'hi', 'te', 'ta', 'kn', 'bn', 'mr', 'gu'];
  const alternates = {
    canonical: canonicalUrl,
    languages: {} as Record<string, string>
  };
  
  locales.forEach(loc => {
    alternates.languages[loc] = `${siteUrl}/${loc}/blog/${post.slug}`;
  });

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'BharatFin',
    
    // Open Graph
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      url: canonicalUrl,
      siteName: 'BharatFin',
      locale: locale,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/images/blog/${post.slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      creator: '@BharatFin',
      images: [`${siteUrl}/images/blog/${post.slug}-og.jpg`],
    },
    
    // Alternates for internationalization
    alternates,
    
    // Additional metadata
    category: post.category,
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for blog posts
 */
export function generateBlogJsonLd(post: BlogPost, locale: Locale = 'en') {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app';
  const canonicalUrl = `${siteUrl}/${locale}/blog/${post.slug}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Article schema
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.description,
        image: `${siteUrl}/images/blog/${post.slug}-og.jpg`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          '@type': 'Organization',
          name: post.author,
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'BharatFin',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/svg/bharatfin-logo-transparent-dark.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        articleSection: post.category,
        keywords: post.tags.join(', '),
        wordCount: Math.floor(post.content.length / 5), // Rough word count estimation
        timeRequired: `PT${post.readingTime}M`,
      },
      
      // Breadcrumb schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/${locale}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
      
      // Website schema
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: 'BharatFin',
        description: 'Smart Money for Every Indian. Calculate returns, plan investments, and achieve your financial goals.',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
    ],
  };
  
  // Add FAQ schema if FAQs exist
  if (post.faqs && post.faqs.length > 0) {
    (jsonLd['@graph'] as any[]).push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: post.faqs.map((faq, index) => ({
        '@type': 'Question',
        '@id': `${canonicalUrl}#faq-${index}`,
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }
  
  return jsonLd;
}

/**
 * Generate sitemap entries for blog posts
 */
export function generateBlogSitemapEntries(posts: BlogPost[], locales: Locale[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app';
  const entries: string[] = [];
  
  posts.forEach(post => {
    locales.forEach(locale => {
      const url = `${siteUrl}/${locale}/blog/${post.slug}`;
      const hreflangs = locales
        .map(loc => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${siteUrl}/${loc}/blog/${post.slug}" />`)
        .join('\n');
      
      entries.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
${hreflangs}
  </url>`);
    });
  });
  
  return entries;
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove markdown and HTML tags
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Truncate at word boundary
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}