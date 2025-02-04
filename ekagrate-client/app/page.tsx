import { Suspense } from 'react';
import {HeroSection} from '@/components/sections/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import ArtisanGrid from '@/components/ArtisanGrid';
import { getFeaturedProducts, getFeaturedArtisans } from '@/lib/strapi';

function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function LoadingArtisans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 w-48 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
      ))}
    </div>
  );
}

async function FeaturedProducts() {
  const { data: products } = await getFeaturedProducts();
  
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

async function FeaturedArtisans() {
  const { data: artisans } = await getFeaturedArtisans();
  
  return (
    <section className="py-16 px-6 bg-rose-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">
          Meet Our Artisans
        </h2>
        <ArtisanGrid artisans={artisans} />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      
      <Suspense fallback={<LoadingProducts />}>
        <FeaturedProducts />
      </Suspense>
      
      <Suspense fallback={<LoadingArtisans />}>
        <FeaturedArtisans />
      </Suspense>
      
      {/* Add more sections as needed */}
    </main>
  );
}
