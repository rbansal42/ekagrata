"use client";

import Image from "next/image";
import { Artisan } from "@/types";
import { getStrapiMedia, getArtisans } from "@/lib/strapi";
import Link from "next/link";

interface ArtisanCardProps {
  artisan: Artisan;
}

function ArtisanCard({ artisan }: ArtisanCardProps) {
  const { name, specialization, bio, location, image } = artisan.attributes;
  const imageUrl = getStrapiMedia(image.data.attributes.url);

  return (
    <div className="group">
      <Link href={`/artisans/${artisan.id}`} className="block">
        <div className="relative mb-6">
          <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-rose-50">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="font-light text-xl tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
        <p className="text-rose-900 font-light mb-3">{specialization}</p>
        <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide">{bio}</p>
        <p className="text-sm text-gray-500 font-light mt-3 tracking-wide">{location}</p>
      </Link>
    </div>
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

async function ArtisansList() {
  const artisans = await getArtisans();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {artisans.map((artisan) => (
        <ArtisanCard key={artisan.id} artisan={artisan} />
      ))}
    </div>
  );
}

export function ArtisansSection() {
  return (
    <section id="artisans" className="container max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4 tracking-wide">Meet Our Artisans</h2>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
          Discover the skilled craftspeople behind our unique pieces, each bringing generations of expertise and passion to their work
        </p>
      </div>
      <ArtisansList />
    </section>
  );
} 