# BharatFin Logo Assets
## Concept 3 — Ascending BF (Modern Fintech)

Brand colors:
  Emerald Green (primary):  #00C896
  Deep Green (secondary):   #00A87C
  Forest Green (accent):    #007A5A
  Navy Dark (background):   #0F172A
  White:                    #FFFFFF

Fonts used:
  Wordmark:  Sora Bold 700 (Google Fonts)
  Tagline:   Plus Jakarta Sans Medium 500 (Google Fonts)
  Import:    https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Plus+Jakarta+Sans:wght@500

---

## File Guide

### SVG (Scalable — use these in code)
  bharatfin-logo-light.svg              Full logo, white background
  bharatfin-logo-dark.svg               Full logo, dark background
  bharatfin-logo-transparent-light.svg  Full logo, no background (dark text — for light pages)
  bharatfin-logo-transparent-dark.svg   Full logo, no background (white text — for dark pages)
  bharatfin-icon-light.svg              Icon only, white background
  bharatfin-icon-dark.svg               Icon only, dark background
  bharatfin-favicon.svg                 Favicon/app icon (rounded square)
  bharatfin-og-image.svg                Social share / OG image (1200×630)

### PNG (Raster exports)
  png/bharatfin-logo-light-2x.png       960×224   Retina displays
  png/bharatfin-logo-light-1x.png       480×112   Standard displays
  png/bharatfin-logo-dark-2x.png        960×224   Retina, dark bg
  png/bharatfin-logo-dark-1x.png        480×112   Standard, dark bg
  png/bharatfin-logo-transparent-light.png  960×224  Transparent, dark text
  png/bharatfin-logo-transparent-dark.png   960×224  Transparent, white text
  png/bharatfin-icon-light-512.png      512×512   Icon, white bg
  png/bharatfin-icon-dark-512.png       512×512   Icon, dark bg
  png/bharatfin-og-image.png            1200×630  OG/social image

### Favicon
  favicon/bharatfin-favicon.ico         Multi-size ICO (16, 32, 192px)
  favicon/bharatfin-favicon-512.png     512×512   Play Store / App Store
  favicon/bharatfin-favicon-192.png     192×192   Android PWA
  favicon/bharatfin-favicon-180.png     180×180   Apple Touch Icon
  favicon/bharatfin-favicon-32.png      32×32     Browser tab
  favicon/bharatfin-favicon-16.png      16×16     Browser tab (small)

---

## Usage in Next.js

In app/layout.tsx:
  import { Metadata } from 'next'
  export const metadata: Metadata = {
    icons: {
      icon: '/favicon/bharatfin-favicon.ico',
      apple: '/favicon/bharatfin-favicon-180.png',
    },
    openGraph: {
      images: [{ url: '/png/bharatfin-og-image.png', width: 1200, height: 630 }],
    },
  }

In Navbar.tsx:
  <img src="/svg/bharatfin-logo-transparent-light.svg" alt="BharatFin" height={40} />

---

Tagline options:
  "Smart Money for Every Indian"
  "Calculate. Plan. Grow."
  "Paisa Samajho. Paisa Badhao."
  "Your Financial GPS"
