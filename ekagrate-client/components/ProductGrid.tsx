import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/strapi';
import { getStrapiMedia } from '@/lib/strapi';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link 
          key={product.id}
          href={`/products/${product.attributes.slug}`}
          className="group"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64">
              <Image
                src={getStrapiMedia(product.attributes.featuredImage?.data?.attributes?.url)}
                alt={product.attributes.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light text-gray-900 mb-2">
                {product.attributes.name}
              </h3>
              <p className="text-gray-600 font-light mb-4">
                {product.attributes.shortDescription}
              </p>
              <p className="text-rose-600 font-medium">
                ₹{product.attributes.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 