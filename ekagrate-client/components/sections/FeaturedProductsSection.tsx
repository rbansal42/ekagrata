import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { name, shortDescription, price, images, featuredImage, slug, artisan } = product.attributes;
  const imageUrl = getImageUrl(images.data[featuredImage].attributes.url);

  return (
    <Link href={`/products/${slug}` as Route} className="group">
      <div className="aspect-square relative rounded-xl overflow-hidden bg-rose-50 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-light text-lg tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
      <p className="text-rose-900 font-light">₹{price.toLocaleString()}</p>
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide mt-2">{shortDescription}</p>
      <p className="text-sm text-gray-500 font-light mt-1">By {artisan.data.attributes.name}</p>
    </Link>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-rose-100/50 rounded-xl mb-4" />
      <div className="h-6 bg-rose-100/50 rounded-lg mb-2 w-3/4" />
      <div className="h-5 bg-rose-100/50 rounded-lg mb-4 w-1/4" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
      <div className="h-4 bg-rose-100/50 rounded-lg w-2/3" />
    </div>
  );
}

interface FeaturedProductsSectionProps {
  products: Product[];
  loading?: boolean;
}

export function FeaturedProductsSection({ products, loading = false }: FeaturedProductsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : (
        products?.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
} 