"use client";

import { Product, StrapiResponse } from '../types';
import { useProducts, useSiteConfig } from '../lib/hooks';
import { formatPrice, getImageUrl, formatWhatsAppLink } from '../lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface ProductGridProps {
  category?: string;
  artisan?: string;
  featured?: boolean;
  pageSize?: number;
}

export default function ProductGrid({ category, artisan, featured, pageSize = 12 }: ProductGridProps) {
  const { products, loading, error } = useProducts({ category, artisan, featured, pageSize });
  const { config } = useSiteConfig();

  if (loading) return <div className="grid place-items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-center text-red-600">Failed to load products</div>;
  if (!products?.data?.length) return <div className="text-center text-gray-600">No products found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.data.map((product) => (
        <div key={product.id} className="group relative">
          <Link href={`/products/${product.attributes.slug}`}>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={getImageUrl(product.attributes.images.data[0]?.attributes.url)}
                alt={product.attributes.images.data[0]?.attributes.alternativeText || product.attributes.title}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{product.attributes.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  By {product.attributes.artisan.data.attributes.name}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(product.attributes.price)}
              </p>
            </div>
          </Link>
          {config?.data && (
            <a
              href={formatWhatsAppLink(product, config.data)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Enquire on WhatsApp
            </a>
          )}
        </div>
      ))}
    </div>
  );
} 