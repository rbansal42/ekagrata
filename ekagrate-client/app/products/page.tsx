"use client";

import { useEffect, useState } from "react";
import { getProducts, getCategories } from "@/lib/api/fetcher";
import { Product, Category } from "@/types/index";
import { ProductsSection } from "@/components/sections/ProductsSection";

interface ProductFilters {
  category?: string;
  priceRange?: { min?: number; max?: number };
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    pageSize: 12,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiFilters: { page?: number; pageSize?: number; category?: string; minPrice?: number; maxPrice?: number } = {
          page: filters.page,
          pageSize: filters.pageSize
        };
        if (filters.category) {
          apiFilters.category = filters.category;
        }
        if (filters.priceRange) {
          if (filters.priceRange.min !== undefined) apiFilters.minPrice = filters.priceRange.min;
          if (filters.priceRange.max !== undefined) apiFilters.maxPrice = filters.priceRange.max;
        }

        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(apiFilters),
          getCategories()
        ]);

        setProducts(productsRes?.data || []);
        setCategories(categoriesRes?.data || []);
      } catch (error) {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-white">
      <ProductsSection
        products={products}
        categories={categories}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
