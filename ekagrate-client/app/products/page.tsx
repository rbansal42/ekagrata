"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts, getCategories, getArtisans, Product, Category, Artisan } from "@/lib/strapi";
import { ProductsSection } from "@/components/sections/ProductsSection";

interface ProductFilters {
  category?: string;
  artisan?: string;
  priceRange?: { min?: number; max?: number };
  inStock?: boolean;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    pageSize: 12,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes, artisansRes] = await Promise.all([
          getProducts(filters),
          getCategories(),
          getArtisans(),
        ]);

        setProducts(productsRes?.data || []);
        setCategories(categoriesRes?.data || []);
        setArtisans(artisansRes?.data || []);
      } catch (error) {
        setProducts([]);
        setCategories([]);
        setArtisans([]);
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
        artisans={artisans}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
