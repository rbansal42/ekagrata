import Image from 'next/image';
import Link from 'next/link';
import { Artisan } from '@/lib/strapi';
import { getStrapiMedia } from '@/lib/strapi';

interface ArtisanGridProps {
  artisans: Artisan[];
}

export default function ArtisanGrid({ artisans }: ArtisanGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {artisans.map((artisan) => (
        <Link 
          key={artisan.id}
          href={`/artisans/${artisan.attributes.slug}`}
          className="group text-center"
        >
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src={getStrapiMedia(artisan.attributes.image?.data?.attributes?.url)}
              alt={artisan.attributes.name}
              fill
              className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-light text-gray-900 mb-2">
            {artisan.attributes.name}
          </h3>
          <p className="text-gray-600 font-light">
            {artisan.attributes.specialization}
          </p>
        </Link>
      ))}
    </div>
  );
} 