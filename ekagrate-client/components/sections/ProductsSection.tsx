"use client";

import type { Route } from "next";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Product, Category, Artisan } from "@/types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { title, price, description, images, slug } = product.attributes;
  const imageUrl = getImageUrl(images.data[0].attributes.url);

  return (
    <Link href={`/products/${slug}` as Route} className="group">
      <div className="aspect-square relative rounded-xl overflow-hidden bg-rose-50 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-light text-lg tracking-wide group-hover:text-rose-900 transition-colors duration-300">{title}</h3>
      <p className="text-rose-900 font-light">₹{price.toLocaleString()}</p>
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide mt-2">{description}</p>
    </Link>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-rose-100/50 rounded-xl mb-4" />
      <div className="h-6 bg-rose-100/50 rounded-lg mb-2 w-3/4" />
      <div className="h-5 bg-rose-100/50 rounded-lg mb-4 w-1/4" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
      <div className="h-4 bg-rose-100/50 rounded-lg w-2/3" />
    </div>
  );
}

interface FilterSidebarProps {
  categories: Category[];
  artisans: Artisan[];
  selectedCategories: string[];
  selectedArtisans: string[];
  onCategoriesChange: (categories: string[]) => void;
  onArtisansChange: (artisans: string[]) => void;
}

function FilterSidebar({
  categories,
  artisans,
  selectedCategories,
  selectedArtisans,
  onCategoriesChange,
  onArtisansChange,
}: FilterSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-8">
      <div className="mb-8">
        <h3 className="text-lg font-light mb-4">Categories</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                checked={selectedCategories.includes(String(category.id))}
                className="form-checkbox text-rose-600 rounded border-gray-300"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    onCategoriesChange([...selectedCategories, String(category.id)]);
                  } else {
                    onCategoriesChange(selectedCategories.filter((id) => id !== String(category.id)));
                  }
                }}
              />
              <span className="ml-2 text-gray-700 font-light">{category.attributes.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-light mb-4">Artisans</h3>
        <div className="space-y-2">
          {artisans?.map((artisan) => (
            <label key={artisan.id} className="flex items-center">
              <input
                checked={selectedArtisans.includes(String(artisan.id))}
                className="form-checkbox text-rose-600 rounded border-gray-300"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    onArtisansChange([...selectedArtisans, String(artisan.id)]);
                  } else {
                    onArtisansChange(selectedArtisans.filter((id) => id !== String(artisan.id)));
                  }
                }}
              />
              <span className="ml-2 text-gray-700 font-light">{artisan.attributes.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductFilters {
  category?: string;
  artisan?: string;
  page?: number;
  pageSize?: number;
}

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  artisans: Artisan[];
  loading: boolean;
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
}

export function ProductsSection({
  products,
  categories,
  artisans,
  loading,
  filters,
  onFilterChange,
}: ProductsSectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);

  const handleCategoriesChange = (newCategories: string[]) => {
    setSelectedCategories(newCategories);
    onFilterChange({ category: newCategories[0] });
  };

  const handleArtisansChange = (newArtisans: string[]) => {
    setSelectedArtisans(newArtisans);
    onFilterChange({ artisan: newArtisans[0] });
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-light tracking-wide">Our Products</h1>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          artisans={artisans}
          selectedCategories={selectedCategories}
          selectedArtisans={selectedArtisans}
          onCategoriesChange={handleCategoriesChange}
          onArtisansChange={handleArtisansChange}
        />

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
