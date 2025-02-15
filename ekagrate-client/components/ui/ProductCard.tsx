import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link 
        href={`/products/${product.slug}`} 
        className="block relative bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      >
        <div className="relative">
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 font-work-sans">
                Featured
              </span>
            </div>
          )}
          <div className="aspect-[4/3] overflow-hidden">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage}
                alt={product.name}
                width={400}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100/50 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 font-work-sans line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 font-work-sans line-clamp-2">{product.shortDescription}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 font-work-sans">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="inline-flex items-center text-rose-800 text-sm font-work-sans">
              View Details
              <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 