/* Minimal ProductsSection component implementation */
"use client";

import React from "react";
import { Product, Category } from "@/types/index";
import { Slider } from "@heroui/slider";

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  filters: {
    category?: string;
    priceRange?: { min?: number; max?: number };
    sortBy?: string;
    page?: number;
    pageSize?: number;
  };
  onFilterChange: (newFilters: Partial<ProductsSectionProps["filters"]>) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, categories, loading, filters, onFilterChange }) => {
  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      onFilterChange({
        priceRange: { min: value[0], max: value[1] }
      });
    }
  };

  const handleCategoryChange = (categorySlug: string) => {
    onFilterChange({
      category: categorySlug === filters.category ? undefined : categorySlug
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const maxPrice = Math.max(...products.map(p => p.price), 10000);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-24 space-y-6 p-6 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      filters.category === category.slug
                        ? 'bg-gray-900 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="px-2">
                <Slider 
                  label="Price Range"
                  step={100}
                  minValue={0}
                  maxValue={maxPrice}
                  defaultValue={[filters.priceRange?.min || 0, filters.priceRange?.max || maxPrice]}
                  formatOptions={{ style: 'currency', currency: 'INR' }}
                  className="max-w-md"
                  onChange={handlePriceRangeChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative bg-white/80 backdrop-blur-md rounded-lg overflow-hidden border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.featuredImage || product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.name}</h2>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      <button 
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=I'm interested in ${product.name}`, '_blank')}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white/80 backdrop-blur-md rounded-lg border border-gray-200">
              <p className="text-gray-500">No products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductsSection }; 