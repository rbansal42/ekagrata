import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/index';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const image = category.image;

  return (
    <Link href={`/products?category=${category.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        {image ? (
          <Image
            src={image.url}
            alt={category.name || 'Category image'}
            width={400}
            height={300}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100/50 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 transition-opacity group-hover:opacity-90" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-semibold text-white font-work-sans tracking-wide">
            {category.name}
          </h3>
          <div className="mt-2 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center text-white/90 text-sm">
              Explore Collection
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 