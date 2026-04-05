import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['via.placeholder.com'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  }
};

export default withNextIntl(nextConfig);
