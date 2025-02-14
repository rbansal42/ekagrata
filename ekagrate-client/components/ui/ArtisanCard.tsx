import Image from 'next/image';
import Link from 'next/link';
import { Artisan, StrapiData } from '@/lib/api/types';

interface ArtisanCardProps {
  artisan: StrapiData<Artisan>;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const { attributes } = artisan;
  const avatarImage = attributes.avatar.data?.attributes;

  if (!avatarImage) return null;

  return (
    <Link href={`/artisans/${attributes.slug}`} className="group">
      <div className="aspect-square overflow-hidden rounded-full bg-gray-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${avatarImage.url}`}
          alt={attributes.name}
          width={avatarImage.width}
          height={avatarImage.height}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">{attributes.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{attributes.bio}</p>
      </div>
    </Link>
  );
} 