import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Artisan } from "@/types";

interface ArtisanCardProps {
  artisan: Artisan;
}

function ArtisanCard({ artisan }: ArtisanCardProps) {
  const { name, bio, avatar, slug, categories } = artisan.attributes;
  const imageUrl = getImageUrl(avatar.data.attributes.url);
  const primaryCategory = categories?.data?.[0]?.attributes.name;

  return (
    <Link href={`/artisans/${slug}` as Route} className="group">
      <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-rose-50 mb-6">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-light text-xl tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
      {primaryCategory && (
        <p className="text-rose-900 font-light mb-3">{primaryCategory}</p>
      )}
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide">{bio}</p>
    </Link>
  );
}

function ArtisanCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-rose-100/50 rounded-xl mb-6" />
      <div className="h-7 bg-rose-100/50 rounded-lg mb-3 w-3/4" />
      <div className="h-5 bg-rose-100/50 rounded-lg mb-3 w-1/2" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
      <div className="h-4 bg-rose-100/50 rounded-lg w-2/3" />
    </div>
  );
}

interface FeaturedArtisansSectionProps {
  artisans: Artisan[];
  loading?: boolean;
}

export function FeaturedArtisansSection({ artisans, loading = false }: FeaturedArtisansSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <ArtisanCardSkeleton key={index} />
        ))
      ) : (
        artisans?.slice(0, 4).map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))
      )}
    </div>
  );
} 