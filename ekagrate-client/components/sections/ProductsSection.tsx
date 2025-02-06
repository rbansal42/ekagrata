"use client";

import type { Route } from "next";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Product, Category, Artisan } from "@/types";

const sortOptions = [
  { id: "newest", name: "Newest" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "popular", name: "Most Popular" },
] as const;

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "0-1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "5000-10000", name: "₹5,000 - ₹10,000" },
  { id: "10000", name: "Above ₹10,000" },
] as const;

type SortOption = (typeof sortOptions)[number]["id"];
type PriceRange = (typeof priceRanges)[number]["id"];

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
  priceRange: PriceRange;
  inStock: boolean;
  onCategoriesChange: (categories: string[]) => void;
  onArtisansChange: (artisans: string[]) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onInStockChange: (inStock: boolean) => void;
}

function FilterSidebar({
  categories,
  artisans,
  selectedCategories,
  selectedArtisans,
  priceRange,
  inStock,
  onCategoriesChange,
  onArtisansChange,
  onPriceRangeChange,
  onInStockChange,
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
        <h3 className="text-lg font-light mb-4">Price Range</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 font-light"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
        >
          {priceRanges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.name}
            </option>
          ))}
        </select>
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

      <div>
        <h3 className="text-lg font-light mb-4">Availability</h3>
        <label className="flex items-center">
          <input
            checked={inStock}
            className="form-checkbox text-rose-600 rounded border-gray-300"
            type="checkbox"
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          <span className="ml-2 text-gray-700 font-light">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}

interface ProductFilters {
  category?: string;
  artisan?: string;
  priceRange?: { min?: number; max?: number };
  inStock?: boolean;
  sortBy?: string;
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
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const handleCategoriesChange = (newCategories: string[]) => {
    setSelectedCategories(newCategories);
    onFilterChange({ category: newCategories[0] });
  };

  const handleArtisansChange = (newArtisans: string[]) => {
    setSelectedArtisans(newArtisans);
    onFilterChange({ artisan: newArtisans[0] });
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setPriceRange(range);
    let priceFilter;
    switch (range) {
      case "0-1000":
        priceFilter = { max: 1000 };
        break;
      case "1000-5000":
        priceFilter = { min: 1000, max: 5000 };
        break;
      case "5000-10000":
        priceFilter = { min: 5000, max: 10000 };
        break;
      case "10000":
        priceFilter = { min: 10000 };
        break;
      default:
        priceFilter = undefined;
    }
    onFilterChange({ priceRange: priceFilter });
  };

  const handleInStockChange = (value: boolean) => {
    setInStock(value);
    onFilterChange({ inStock: value });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    onFilterChange({ sortBy: value });
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-light tracking-wide">Our Products</h1>
        <div className="w-48">
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 font-light"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-12">
        <FilterSidebar
          artisans={artisans || []}
          categories={categories || []}
          inStock={inStock}
          priceRange={priceRange}
          selectedArtisans={selectedArtisans}
          selectedCategories={selectedCategories}
          onArtisansChange={handleArtisansChange}
          onCategoriesChange={handleCategoriesChange}
          onInStockChange={handleInStockChange}
          onPriceRangeChange={handlePriceRangeChange}
        />

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-light mb-2">No products found</h3>
              <p className="text-gray-600 font-light">Try adjusting your filters to find what you&apos;re looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
