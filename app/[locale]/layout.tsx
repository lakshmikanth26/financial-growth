import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BharatFin - Smart Money for Every Indian",
  description: "Calculate PPF, FD, SIP, Tax, EMI returns instantly. Free financial calculators for Indian investors with multilingual support.",
  keywords: "financial calculator, PPF calculator, FD calculator, SIP calculator, tax calculator, EMI calculator, India, investment, BharatFin",
  authors: [{ name: "BharatFin" }],
  creator: "BharatFin",
  publisher: "BharatFin",
  robots: "index, follow",
  icons: {
    icon: "/favicon/bharatfin-favicon.ico",
    apple: "/favicon/bharatfin-favicon-180.png",
    shortcut: "/favicon/bharatfin-favicon-32.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bharatfin.in",
    siteName: "BharatFin",
    title: "BharatFin - Smart Money for Every Indian",
    description: "Calculate PPF, FD, SIP, Tax, EMI returns instantly. Free financial calculators for Indian investors.",
    images: [
      {
        url: "/png/bharatfin-og-image.png",
        width: 1200,
        height: 630,
        alt: "BharatFin - Financial Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BharatFin - Smart Money for Every Indian",
    description: "Calculate PPF, FD, SIP, Tax, EMI returns instantly. Free financial calculators for Indian investors.",
    images: ["/png/bharatfin-og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${plusJakartaSans.variable} ${sora.variable}`}>
      <head>
        {/* Google Fonts Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Theme color meta tag */}
        <meta name="theme-color" content="#FFFFFF" />
        
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (theme === 'system' && systemDark);
                  var htmlElement = document.documentElement;
                  htmlElement.classList.remove('light', 'dark');
                  htmlElement.classList.add(isDark ? 'dark' : 'light');
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        
        {/* AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}