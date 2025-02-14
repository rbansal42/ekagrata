import { getSiteConfig, getFeaturedProducts, getFeaturedArtisans } from '../lib/strapi';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedProductsSection } from '../components/sections/FeaturedProductsSection';
import { FeaturedArtisansSection } from '../components/sections/FeaturedArtisansSection';
import { CategorySection } from '../components/sections/CategorySection';

export async function generateMetadata() {
  const config = await getSiteConfig();
  const { siteName, siteDescription, seo } = config.data.attributes;

  return {
    title: seo.metaTitle || siteName,
    description: seo.metaDescription || siteDescription,
    openGraph: {
      title: seo.metaTitle || siteName,
      description: seo.metaDescription || siteDescription,
      images: [
        {
          url: seo.metaImage.data.attributes.url,
          alt: seo.metaImage.data.attributes.alternativeText,
        },
      ],
    },
  };
}

export default async function HomePage() {
  const [featuredProducts, featuredArtisans] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedArtisans()
  ]);

  return (
    <main>
      <HeroSection />
      
      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Featured Products
          </h2>
          <FeaturedProductsSection 
            products={featuredProducts.data} 
            loading={!featuredProducts.data} 
          />
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Featured Categories
          </h2>
          <CategorySection featured limit={4} />
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Featured Artisans
          </h2>
          <FeaturedArtisansSection 
            artisans={featuredArtisans.data} 
            loading={!featuredArtisans.data} 
          />
        </div>
      </section>

      {/* About Ingenions Minds Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            About Ingenions Minds
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Ingenions Minds is dedicated to empowering local artisans and preserving traditional craftsmanship. 
              Through Ekagrata, we connect skilled artisans with appreciative customers, ensuring the continuation 
              of India's rich artistic heritage.
            </p>
            <p className="mt-4">
              Our mission is to create a sustainable marketplace that benefits both artisans and consumers, 
              while keeping alive the traditional art forms that make our culture unique.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
