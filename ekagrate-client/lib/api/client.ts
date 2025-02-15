import { Artisan, Category, Product, StrapiData, StrapiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Debug environment variables
console.log('🔧 API Configuration:', {
  API_URL,
  hasToken: !!API_TOKEN,
  tokenFirstChars: API_TOKEN ? `${API_TOKEN.slice(0, 4)}...` : 'none',
});

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  if (!API_TOKEN) {
    console.error('❌ No API token found. Please set NEXT_PUBLIC_STRAPI_API_TOKEN in your environment variables.');
  }

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    ...options,
  };

  const url = `${API_URL}/api${endpoint}`;
  console.log(`🌐 Fetching from: ${url}`);
  console.log(`🔑 Request headers:`, defaultOptions.headers);

  try {
    const res = await fetch(url, defaultOptions);
    console.log(`📥 Response status for ${endpoint}:`, res.status, res.statusText);
    
    // Log response headers for debugging
    const headers = Object.fromEntries(res.headers.entries());
    console.log(`📋 Response headers:`, headers);

    if (!res.ok) {
      if (res.status === 404) {
        console.log(`⚠️ No data found for ${endpoint}`);
        // Try to get error details
        try {
          const errorData = await res.json();
          console.log('📄 404 Response body:', JSON.stringify(errorData, null, 2));
        } catch (e) {
          console.log('📄 Could not parse 404 response body');
        }
        return null;
      }
      
      // Try to get error details from response
      let errorDetails = '';
      try {
        const errorData = await res.json();
        errorDetails = JSON.stringify(errorData, null, 2);
      } catch (e) {
        errorDetails = 'No error details available';
      }
      
      console.error(`❌ API Error for ${endpoint}:`, {
        status: res.status,
        statusText: res.statusText,
        errorDetails
      });
      
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`✅ Data received for ${endpoint}:`, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`💥 Network or parsing error for ${endpoint}:`, error);
    throw error;
  }
}

// Simple test function to get all artisans
export async function getAllArtisans(): Promise<StrapiData<Artisan>[]> {
  console.log('📊 Fetching all artisans...');
  const res = await fetchAPI<StrapiResponse<StrapiData<Artisan>[]>>('/artisans');
  const data = res?.data || [];
  console.log(`👥 Found ${data.length} artisans`);
  return data;
}

export async function getFeaturedArtisans(limit = 4): Promise<StrapiData<Artisan>[]> {
  console.log('📊 Fetching featured artisans...');
  const res = await fetchAPI<StrapiResponse<StrapiData<Artisan>[]>>(
    `/artisans?populate=*&filters[featured][$eq]=true&pagination[limit]=${limit}&sort=createdAt:desc`
  );
  const data = res?.data || [];
  console.log(`👥 Found ${data.length} featured artisans`);
  return data;
}

export async function getFeaturedProducts(limit = 8): Promise<StrapiData<Product>[]> {
  console.log('📊 Fetching featured products...');
  const res = await fetchAPI<StrapiResponse<StrapiData<Product>[]>>(
    `/products?populate=*&filters[featured][$eq]=true&pagination[limit]=${limit}&sort=createdAt:desc`
  );
  const data = res?.data || [];
  console.log(`🛍️ Found ${data.length} featured products`);
  return data;
}

export async function getCategories(): Promise<StrapiData<Category>[]> {
  console.log('📊 Fetching categories...');
  const res = await fetchAPI<StrapiResponse<StrapiData<Category>[]>>(
    '/categories?populate=*&sort=order:asc'
  );
  const data = res?.data || [];
  console.log(`📑 Found ${data.length} categories`);
  return data;
}

export async function getHomePageData() {
  console.log('🏠 Fetching home page data...');
  try {
    // First try to get all artisans as a test
    console.log('🧪 Testing API connection with getAllArtisans...');
    const testArtisans = await getAllArtisans();
    console.log('✅ Test successful, found', testArtisans.length, 'artisans');

    const [featuredArtisans, featuredProducts, categories] = await Promise.all([
      getFeaturedArtisans(),
      getFeaturedProducts(),
      getCategories(),
    ]);

    const result = {
      featuredArtisans,
      featuredProducts,
      categories,
    };

    console.log('🎉 Home page data summary:', {
      featuredArtisansCount: featuredArtisans.length,
      featuredProductsCount: featuredProducts.length,
      categoriesCount: categories.length,
    });

    return result;
  } catch (error) {
    console.error('❌ Error fetching home page data:', error);
    return {
      featuredArtisans: [],
      featuredProducts: [],
      categories: [],
    };
  }
} 