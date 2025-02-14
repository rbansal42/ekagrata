import Image from 'next/image';
import Link from 'next/link';
import { Product, StrapiData } from '@/lib/api/types';

interface ProductCardProps {
  product: StrapiData<Product>;
}

export function ProductCard({ product }: ProductCardProps) {
  const { attributes } = product;
  const featuredImage = attributes.images.data[attributes.featuredImage];

  return (
    <Link href={`/products/${attributes.slug}`} className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${featuredImage.attributes.url}`}
          alt={attributes.name}
          width={featuredImage.attributes.width}
          height={featuredImage.attributes.height}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{attributes.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{attributes.shortDescription}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">₹{attributes.price}</p>
      </div>
    </Link>
  );
} 