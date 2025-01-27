"use client";

import { useState, useEffect } from "react";
import { Listbox } from "@heroui/listbox";
import { Switch } from "@heroui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, getProducts, getCategories, getArtisans } from "@/lib/strapi";
import { Product, Category, Artisan } from "@/types";
import { DUMMY_PRODUCTS, DUMMY_CATEGORIES, DUMMY_ARTISANS } from "@/constants/dummyData";
import type { Route } from "next";

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

type SortOption = typeof sortOptions[number]["id"];
type PriceRange = typeof priceRanges[number]["id"];

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
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-rose-600 rounded border-gray-300"
                checked={selectedCategories.includes(String(category.id))}
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
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 font-light"
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
          {artisans.map((artisan) => (
            <label key={artisan.id} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-rose-600 rounded border-gray-300"
                checked={selectedArtisans.includes(String(artisan.id))}
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
            type="checkbox"
            className="form-checkbox text-rose-600 rounded border-gray-300"
            checked={inStock}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          <span className="ml-2 text-gray-700 font-light">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { name, price, description, images, slug } = product.attributes;
  const imageUrl = getStrapiMedia(images.data[0].attributes.url);

  return (
    <Link href={`/products/${slug}` as Route} className="group">
      <div className="aspect-square relative rounded-xl overflow-hidden bg-rose-50 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-light text-lg tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
      <p className="text-rose-900 font-light">₹{price.toLocaleString()}</p>
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide mt-2">{description}</p>
    </Link>
  );
}

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Initialize filters from URL params
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    
    // If we have a category in the URL, find its ID from DUMMY_CATEGORIES
    if (categoryFromUrl) {
      const category = DUMMY_CATEGORIES.find(c => c.attributes.slug === categoryFromUrl);
      if (category) {
        setSelectedCategories([String(category.id)]);
      }
    } else {
      setSelectedCategories(params.get("categories")?.split(",").filter(Boolean) || []);
    }
    
    setSelectedArtisans(params.get("artisans")?.split(",").filter(Boolean) || []);
    setPriceRange((params.get("priceRange") || "all") as PriceRange);
    setInStock(params.get("inStock") === "true");
    setSortBy((params.get("sortBy") || "newest") as SortOption);
  }, []);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, artisansRes] = await Promise.all([
          getCategories(),
          getArtisans(),
        ]);
        setCategories(categoriesRes?.data || DUMMY_CATEGORIES);
        setArtisans(artisansRes?.data || DUMMY_ARTISANS);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setCategories(DUMMY_CATEGORIES);
        setArtisans(DUMMY_ARTISANS);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (selectedCategories.length) {
      const category = DUMMY_CATEGORIES.find(c => String(c.id) === selectedCategories[0]);
      if (category) {
        params.set("category", category.attributes.slug);
      }
    }
    if (selectedArtisans.length) params.set("artisans", selectedArtisans.join(","));
    if (priceRange !== "all") params.set("priceRange", priceRange);
    if (inStock) params.set("inStock", "true");
    if (sortBy !== "newest") params.set("sortBy", sortBy);
    
    router.push(`/products?${params.toString()}`, { scroll: false });

    // Fetch products with filters
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts({
          categories: selectedCategories,
          artisans: selectedArtisans,
          priceRange,
          inStock,
          sortBy,
          page: 1,
        });
        setProducts(response?.data || DUMMY_PRODUCTS.filter(product => {
          // Apply category filter
          if (selectedCategories.length && !selectedCategories.includes(String(product.attributes.category.data.id))) {
            return false;
          }
          // Apply artisan filter
          if (selectedArtisans.length && !selectedArtisans.includes(String(product.attributes.artisan.data.id))) {
            return false;
          }
          // Apply price range filter
          if (priceRange !== "all") {
            const price = product.attributes.price;
            switch (priceRange) {
              case "0-1000":
                if (price > 1000) return false;
                break;
              case "1000-5000":
                if (price < 1000 || price > 5000) return false;
                break;
              case "5000-10000":
                if (price < 5000 || price > 10000) return false;
                break;
              case "10000":
                if (price < 10000) return false;
                break;
            }
          }
          // Apply in stock filter
          if (inStock && product.attributes.stock <= 0) {
            return false;
          }
          return true;
        }));
        setHasMore(false); // Since we're using dummy data, no pagination needed
        setPage(1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(DUMMY_PRODUCTS);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategories, selectedArtisans, priceRange, inStock, sortBy, router]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    
    try {
      const response = await getProducts({
        categories: selectedCategories,
        artisans: selectedArtisans,
        priceRange,
        inStock,
        sortBy,
        page: page + 1,
      });
      const newProducts = response?.data || [];
      setProducts([...products, ...newProducts]);
      setHasMore(response?.meta?.pagination?.page < response?.meta?.pagination?.pageCount);
      setPage(page + 1);
    } catch (error) {
      console.error("Error loading more products:", error);
      setHasMore(false);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-light tracking-wide">Our Products</h1>
        <div className="w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 font-light"
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
          categories={categories}
          artisans={artisans}
          selectedCategories={selectedCategories}
          selectedArtisans={selectedArtisans}
          priceRange={priceRange}
          inStock={inStock}
          onCategoriesChange={setSelectedCategories}
          onArtisansChange={setSelectedArtisans}
          onPriceRangeChange={setPriceRange}
          onInStockChange={setInStock}
        />

        <div className="flex-1">
          {loading && products.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-rose-100/50 rounded-xl mb-4" />
                  <div className="h-6 bg-rose-100/50 rounded-lg mb-2 w-3/4" />
                  <div className="h-5 bg-rose-100/50 rounded-lg mb-4 w-1/4" />
                  <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
                  <div className="h-4 bg-rose-100/50 rounded-lg w-2/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-light mb-2">No products found</h3>
              <p className="text-gray-600 font-light">Try adjusting your filters to find what you're looking for.</p>
            </div>
          ) : (
            <>
              <ProductsGrid products={products} />
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-6 py-2 border border-rose-200 rounded-lg text-rose-900 hover:bg-rose-50 transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 