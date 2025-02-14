import Image from 'next/image';
import Link from 'next/link';
import { Category, StrapiData } from '@/lib/api/types';

interface CategoryCardProps {
  category: StrapiData<Category>;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { attributes } = category;
  const image = attributes.image.data?.attributes;

  if (!image) return null;

  return (
    <Link href={`/categories/${attributes.slug}`} className="group relative block">
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
          alt={attributes.name}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{attributes.name}</h3>
        </div>
      </div>
    </Link>
  );
} 