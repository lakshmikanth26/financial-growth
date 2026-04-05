import React from 'react';
import { BlogPost, Locale } from '@/lib/blog/types';
import { getRelatedCalculatorLinks } from '@/lib/blog/internal-links';
import { Clock, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AdSlot } from '@/components/layout/AdSlot';

interface BlogLayoutProps {
  post: BlogPost;
  locale: Locale;
  children: React.ReactNode;
}

export function BlogLayout({ post, locale, children }: BlogLayoutProps) {
  const relatedCalculators = post.relatedCalculators 
    ? getRelatedCalculatorLinks(post.relatedCalculators, locale)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header Ad */}
      <AdSlot 
        slot="blog-header"
        format="horizontal"
        className="w-full max-w-4xl mx-auto mb-8"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link 
                    href={`/${locale}`}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-3 w-3 mx-2" />
                  <Link 
                    href={`/${locale}/blog`}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Blog
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-3 w-3 mx-2" />
                  <span className="text-gray-900 dark:text-gray-100">{post.title}</span>
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {post.description}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
                {children}
              </div>
            </div>

            {/* In-Content Ad */}
            <AdSlot 
              slot="blog-content"
              format="rectangle"
              className="w-full max-w-md mx-auto my-8"
            />

            {/* Related Calculators */}
            {relatedCalculators.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Related Calculators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={calculator.url}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {calculator.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {post.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Sidebar Ad */}
              <AdSlot 
                slot="blog-sidebar"
                format="rectangle"
                className="w-full"
              />

              {/* Table of Contents (if needed) */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Quick Navigation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link 
                      href="#overview" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#key-features" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Key Features
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#calculations" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      Calculations
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#faqs" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Popular Calculators */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Popular Calculators
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'PPF Calculator', url: `/${locale}/calculators/ppf` },
                    { name: 'SIP Calculator', url: `/${locale}/calculators/sip` },
                    { name: 'FD Calculator', url: `/${locale}/calculators/fd` },
                    { name: 'EMI Calculator', url: `/${locale}/calculators/emi` },
                  ].map((calc) => (
                    <li key={calc.name}>
                      <Link
                        href={calc.url}
                        className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 group"
                      >
                        <span>{calc.name}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Ad */}
      <AdSlot 
        slot="blog-footer"
        format="horizontal"
        className="w-full max-w-4xl mx-auto mt-8 mb-4"
      />
    </div>
  );
}