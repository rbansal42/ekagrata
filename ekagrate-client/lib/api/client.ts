import { Artisan, Category, Product, StrapiData, StrapiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const res = await fetch(`${API_URL}/api${endpoint}`, defaultOptions);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getFeaturedArtisans(limit = 4): Promise<StrapiData<Artisan>[]> {
  const res = await fetchAPI<StrapiResponse<StrapiData<Artisan>[]>>(
    `/artisans?filters[featured][$eq]=true&pagination[limit]=${limit}&sort=createdAt:desc`
  );
  return res?.data || [];
}

export async function getFeaturedProducts(limit = 8): Promise<StrapiData<Product>[]> {
  const res = await fetchAPI<StrapiResponse<StrapiData<Product>[]>>(
    `/products?filters[featured][$eq]=true&pagination[limit]=${limit}&sort=createdAt:desc`
  );
  return res?.data || [];
}

export async function getCategories(): Promise<StrapiData<Category>[]> {
  const res = await fetchAPI<StrapiResponse<StrapiData<Category>[]>>(
    '/categories?sort=order:asc'
  );
  return res?.data || [];
}

export async function getHomePageData() {
  try {
    const [featuredArtisans, featuredProducts, categories] = await Promise.all([
      getFeaturedArtisans(),
      getFeaturedProducts(),
      getCategories(),
    ]);

    return {
      featuredArtisans,
      featuredProducts,
      categories,
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      featuredArtisans: [],
      featuredProducts: [],
      categories: [],
    };
  }
} 