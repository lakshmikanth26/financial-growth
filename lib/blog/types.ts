export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  faqs?: FAQ[];
  relatedCalculators?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  canonicalUrl: string;
  ogImage?: string;
}

export type Locale = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'bn' | 'mr' | 'gu';

export interface LocalizedBlogPost {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  content: Record<Locale, string>;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  seoTitle?: Record<Locale, string>;
  seoDescription?: Record<Locale, string>;
  canonicalUrl?: string;
  faqs?: Record<Locale, FAQ[]>;
  relatedCalculators?: string[];
}