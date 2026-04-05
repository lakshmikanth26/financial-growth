import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blog/data';
import { Locale } from '@/lib/blog/types';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { AdSlot } from '@/components/layout/AdSlot';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharathfin.vercel.app';
  
  return {
    title: 'Financial Blog - Investment Tips, Tax Saving & Calculator Guides | BharatFin',
    description: 'Expert financial advice, investment strategies, tax-saving tips, and comprehensive guides on PPF, SIP, FD, and more. Stay updated with BharatFin blog.',
    keywords: 'financial blog, investment tips, tax saving, PPF guide, SIP investment, FD rates, financial planning India',
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        'en': `${siteUrl}/en/blog`,
        'hi': `${siteUrl}/hi/blog`,
        'te': `${siteUrl}/te/blog`,
        'ta': `${siteUrl}/ta/blog`,
        'kn': `${siteUrl}/kn/blog`,
        'bn': `${siteUrl}/bn/blog`,
        'mr': `${siteUrl}/mr/blog`,
        'gu': `${siteUrl}/gu/blog`,
      },
    },
    openGraph: {
      title: 'Financial Blog - Investment Tips & Guides | BharatFin',
      description: 'Expert financial advice, investment strategies, and comprehensive guides. Stay updated with the latest financial trends in India.',
      url: `${siteUrl}/${locale}/blog`,
      siteName: 'BharatFin',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'BharatFin Financial Blog',
        }
      ],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header Ad */}
      <AdSlot 
        slot="blog-listing-header"
        format="horizontal"
        className="w-full max-w-4xl mx-auto mb-8"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Financial Insights & Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert advice on investments, tax planning, and financial calculations. 
            Stay informed with the latest trends and strategies for building wealth in India.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Featured Articles
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm group"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* In-Content Ad */}
        <AdSlot 
          slot="blog-listing-content"
          format="rectangle"
          className="w-full max-w-md mx-auto my-12"
        />

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            All Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 p-6 group"
              >
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readingTime} min read</span>
                  <span className="mx-2">•</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm group"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Use our comprehensive calculators to plan your investments and achieve your financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/calculators/sip`}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              SIP Calculator
            </Link>
            <Link
              href={`/${locale}/calculators/ppf`}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              PPF Calculator
            </Link>
            <Link
              href={`/${locale}/tax/new-vs-old-regime`}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Tax Calculator
            </Link>
          </div>
        </section>
      </div>

      {/* Footer Ad */}
      <AdSlot 
        slot="blog-listing-footer"
        format="horizontal"
        className="w-full max-w-4xl mx-auto mt-8 mb-4"
      />
    </div>
  );
}