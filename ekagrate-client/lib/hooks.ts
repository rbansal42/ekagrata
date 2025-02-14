import { useEffect, useState } from 'react';
import { Product, Artisan, Category, SiteConfig, StrapiResponse } from '../types';
import {
  getProducts,
  getArtisans,
  getCategories,
  getSiteConfig,
  getFeaturedProducts,
  getFeaturedArtisans,
  searchProducts
} from './strapi';

export function useSiteConfig() {
  const [config, setConfig] = useState<StrapiResponse<SiteConfig> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await getSiteConfig();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch site config'));
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}

export function useProducts(options?: {
  category?: string;
  artisan?: string;
  featured?: boolean;
  pageSize?: number;
}) {
  const [products, setProducts] = useState<StrapiResponse<Product[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let data;
        if (options?.featured) {
          data = await getFeaturedProducts();
        } else {
          data = await getProducts({
            filters: {
              ...(options?.category ? { 'category.slug': options.category } : {}),
              ...(options?.artisan ? { 'artisan.slug': options.artisan } : {})
            },
            pagination: {
              pageSize: options?.pageSize
            }
          });
        }
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options?.category, options?.artisan, options?.featured, options?.pageSize]);

  return { products, loading, error };
}

export function useArtisans(options?: { featured?: boolean; pageSize?: number }) {
  const [artisans, setArtisans] = useState<StrapiResponse<Artisan[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArtisans() {
      try {
        const data = options?.featured
          ? await getFeaturedArtisans()
          : await getArtisans({
              pagination: {
                pageSize: options?.pageSize
              }
            });
        setArtisans(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch artisans'));
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, [options?.featured, options?.pageSize]);

  return { artisans, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<StrapiResponse<Category[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useSearch(query: string) {
  const [results, setResults] = useState<StrapiResponse<Product[]> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setResults(null);
        return;
      }

      setLoading(true);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Search failed'));
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { results, loading, error };
} 