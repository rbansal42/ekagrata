import { getSiteConfig } from '../lib/strapi';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import ArtisanGrid from '../components/ArtisanGrid';

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

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Featured Products
          </h2>
          <ProductGrid featured pageSize={4} />
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Meet Our Artisans
          </h2>
          <ArtisanGrid featured pageSize={4} />
        </div>
      </section>
    </main>
  );
}
