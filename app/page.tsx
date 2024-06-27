import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';
import HeroSection from 'components/Homepage/hero-section';
import HighlightedItems from '@/components/Homepage/highlighted-items';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Suspense>
          <HeroSection />
        </Suspense>
        <Suspense>
          <HighlightedItems />
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
