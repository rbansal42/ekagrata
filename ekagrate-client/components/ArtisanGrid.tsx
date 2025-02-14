"use client";

import { useArtisans } from '../lib/hooks';
import { getImageUrl } from '../lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface ArtisanGridProps {
  featured?: boolean;
  pageSize?: number;
}

export default function ArtisanGrid({ featured, pageSize = 8 }: ArtisanGridProps) {
  const { artisans, loading, error } = useArtisans({ featured, pageSize });

  if (loading) return <div className="grid place-items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-center text-red-600">Failed to load artisans</div>;
  if (!artisans?.data?.length) return <div className="text-center text-gray-600">No artisans found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {artisans.data.map((artisan) => (
        <Link
          key={artisan.id}
          href={`/artisans/${artisan.attributes.slug}`}
          className="group"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={getImageUrl(artisan.attributes.avatar.data.attributes.url)}
              alt={artisan.attributes.avatar.data.attributes.alternativeText || artisan.attributes.name}
              width={400}
              height={400}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
            {artisan.attributes.status === 'inactive' && (
              <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
                Currently Unavailable
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">{artisan.attributes.name}</h3>
            <p className="text-sm text-gray-500">{artisan.attributes.expertise}</p>
            <p className="mt-1 text-sm text-gray-500">
              {artisan.attributes.location.city}, {artisan.attributes.location.state}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
} 