import Image from 'next/image';
import Link from 'next/link';
import { useCategories } from '../../lib/hooks';

interface CategorySectionProps {
  featured?: boolean;
  limit?: number;
}

export function CategorySection({ featured = false, limit = 4 }: CategorySectionProps) {
  const { categories } = useCategories();

  const displayCategories = categories?.data
    ?.slice(0, limit)
    .filter(category => !featured || category.attributes.featured);

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {displayCategories?.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.attributes.slug}`}
          className="group relative"
        >
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
            {category.attributes.image?.data && (
              <Image
                src={category.attributes.image.data.attributes.url}
                alt={category.attributes.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                width={400}
                height={400}
              />
            )}
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {category.attributes.name}
          </h3>
          {category.attributes.description && (
            <p className="mt-1 text-sm text-gray-500">
              {category.attributes.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
} 