"use client";

import type { Route } from "next";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, Artisan } from "@/lib/strapi";

interface ArtisanCardProps {
  artisan: Artisan;
}

function ArtisanCard({ artisan }: ArtisanCardProps) {
  const { name, specialization, bio, location, image } = artisan.attributes;
  const imageUrl = getStrapiMedia(image.data.attributes.url);

  return (
    <Link href={`/artisans/${artisan.id}` as Route} className="group">
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
      <p className="text-rose-900 font-light mb-3">{specialization}</p>
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide">{bio}</p>
      <p className="text-sm text-gray-500 font-light mt-3 tracking-wide">{location}</p>
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

interface ArtisansSectionProps {
  artisans: Artisan[];
  loading: boolean;
  specializations: string[];
}

export function ArtisansSection({ artisans = [], loading, specializations = [] }: ArtisansSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");

  // Filter artisans based on search query and specialization
  const filteredArtisans = (artisans || []).filter((artisan) => {
    const matchesSearch =
      artisan.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.attributes.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.attributes.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization =
      selectedSpecialization === "all" ||
      artisan.attributes.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light mb-4 tracking-wide">Our Artisans</h1>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
          Meet the skilled craftspeople behind our unique pieces, each bringing generations of expertise and passion to their work
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <input
          className="flex-1 p-3 border border-gray-200 rounded-xl text-gray-700 font-light focus:outline-none focus:border-rose-300 transition-colors duration-300"
          placeholder="Search artisans..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sm:w-48 p-3 border border-gray-200 rounded-xl text-gray-700 font-light focus:outline-none focus:border-rose-300 transition-colors duration-300"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
        >
          <option value="all">All Specializations</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Artisans Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArtisanCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredArtisans.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-light mb-2">No artisans found</h3>
          <p className="text-gray-600 font-light">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </div>
  );
}
