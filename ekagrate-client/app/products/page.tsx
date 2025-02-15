"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, getCategories } from "@/lib/api/fetcher";
import { Product, Category } from "@/types";
import { ProductsSection } from "@/components/sections/ProductsSection";

interface ProductFilters {
  category?: string;
  priceRange?: { min?: number; max?: number };
  inStock?: boolean;
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

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(filters),
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
