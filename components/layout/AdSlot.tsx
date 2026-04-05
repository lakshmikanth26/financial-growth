'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function AdSlot({ slot, format = 'auto', style, className }: AdSlotProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // Show placeholder in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`ad-placeholder h-24 ${className || ''}`}
        style={style}
      >
        Ad Slot — {slot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

// Pre-defined ad slot components for common positions
export function HeaderAdSlot() {
  return (
    <div className="w-full flex justify-center py-4">
      <AdSlot 
        slot="header-banner" 
        format="horizontal"
        className="w-full max-w-4xl"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

export function SidebarAdSlot() {
  return (
    <div className="sticky top-4">
      <AdSlot 
        slot="sidebar-rectangle" 
        format="rectangle"
        style={{ width: '300px', height: '600px' }}
      />
    </div>
  );
}

export function InContentAdSlot() {
  return (
    <div className="my-8 flex justify-center">
      <AdSlot 
        slot="in-content" 
        format="fluid"
        className="w-full max-w-2xl"
        style={{ minHeight: '280px' }}
      />
    </div>
  );
}

export function FooterAdSlot() {
  return (
    <div className="w-full flex justify-center py-4 bg-gray-50">
      <AdSlot 
        slot="footer-banner" 
        format="horizontal"
        className="w-full max-w-6xl"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}