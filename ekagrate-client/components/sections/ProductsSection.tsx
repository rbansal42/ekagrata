"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getStrapiMedia } from "@/lib/strapi";

interface Category {
  id: number;
  attributes: {
    name: string;
    description: string;
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const { name, description, slug, image } = category.attributes;
  const imageUrl = getStrapiMedia(image.data.attributes.url);

  return (
    <Link 
      href={`/categories/${slug}` as `/categories/${string}`}
      className="group block aspect-square relative rounded-2xl overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
        <h3 className="font-light text-2xl tracking-wide mb-2">{name}</h3>
        <p className="font-light tracking-wide text-white/80 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="aspect-square bg-rose-100/50 rounded-2xl animate-pulse" />
  );
}

async function CategoriesList() {
  // TODO: Replace with actual API call once implemented
  const dummyCategories: Category[] = [
    {
      id: 1,
      attributes: {
        name: "Textiles",
        description: "Handwoven sarees, fabrics, and traditional garments",
        slug: "textiles",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/textiles/800/800",
              alternativeText: "Textile Category",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        name: "Metal Art",
        description: "Handcrafted brass and copper artifacts",
        slug: "metal-art",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/metal/800/800",
              alternativeText: "Metal Art Category",
            },
          },
        },
      },
    },
    {
      id: 3,
      attributes: {
        name: "Pottery",
        description: "Traditional earthenware and ceramic crafts",
        slug: "pottery",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/pottery/800/800",
              alternativeText: "Pottery Category",
            },
          },
        },
      },
    },
  ];

  return (
    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 -mx-6 px-6 md:mx-0 snap-x snap-mandatory md:snap-none hide-scrollbar">
      {dummyCategories.map((category) => (
        <div key={category.id} className="w-[85vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center">
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="container max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4 tracking-wide">Shop by Category</h2>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
          Explore our diverse collection of artisanal products, each category showcasing unique craftsmanship and skill
        </p>
      </div>
      <Suspense fallback={
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 -mx-6 px-6 md:mx-0 snap-x snap-mandatory md:snap-none hide-scrollbar">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[85vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center">
              <CategoryCardSkeleton />
            </div>
          ))}
        </div>
      }>
        <CategoriesList />
      </Suspense>
      <div className="text-center mt-12">
        <Link 
          href="/categories"
          className="inline-flex items-center gap-2 text-rose-900 hover:text-rose-800 font-light tracking-wide transition-colors duration-300"
        >
          Explore All Categories
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
} 