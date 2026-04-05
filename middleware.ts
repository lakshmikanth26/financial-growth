import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'hi', 'ta', 'te', 'kn', 'bn', 'mr', 'gu'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Enable automatic locale detection from browser Accept-Language header
  localeDetection: true,
  
  // Prefix strategy for URLs
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|.*\\..*).*)']
};