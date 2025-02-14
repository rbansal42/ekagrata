import qs from "qs";
import {
  Product,
  Artisan,
  Category,
  SiteConfig,
  StrapiResponse
} from '../types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

type QueryParams = {
  filters?: Record<string, any>;
  populate?: string[] | Record<string, any>;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
};

async function fetchAPI<T>(endpoint: string, params?: QueryParams): Promise<StrapiResponse<T>> {
  const queryString = params
    ? `?${qs.stringify({
        populate: params.populate,
        ...(params.filters && { filters: params.filters }),
        ...(params.sort && { sort: params.sort }),
        ...(params.pagination && {
          pagination: {
            page: params.pagination.page,
            pageSize: params.pagination.pageSize
          }
        })
      }, {
        encodeValuesOnly: true,
        arrayFormat: 'brackets'
      })}`
    : '';

  const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;
  console.log(`[Strapi API] Making request to: ${url}`);
  console.log(`[Strapi API] Environment: STRAPI_URL=${STRAPI_URL}`);
  
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` })
      }
    });
    
    console.log(`[Strapi API] Response status: ${res.status}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Strapi API] Error response: ${errorText}`);
      throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`[Strapi API] Success response for ${endpoint}:`, {
      dataLength: Array.isArray(data.data) ? data.data.length : 'single item',
      meta: data.meta
    });
    
    return data;
  } catch (error) {
    console.error(`[Strapi API] Request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Products API
export async function getProducts(params?: QueryParams): Promise<StrapiResponse<Product[]>> {
  return fetchAPI<Product[]>('products', {
    populate: {
      images: true,
      artisan: {
        populate: ['avatar']
      },
      category: true
    },
    ...params
  });
}

export async function getProduct(slug: string): Promise<StrapiResponse<Product>> {
  const response = await fetchAPI<Product[]>('products', {
    filters: { slug },
    populate: {
      images: true,
      artisan: {
        populate: ['avatar']
      },
      category: true
    }
  });
  
  if (!response.data?.[0]) {
    throw new Error('Product not found');
  }
  
  return { data: response.data[0], meta: response.meta };
}

// Artisans API
export async function getArtisans(params?: QueryParams): Promise<StrapiResponse<Artisan[]>> {
  return fetchAPI<Artisan[]>('artisans', {
    populate: ['avatar', 'location', 'contact'],
    ...params
  });
}

export async function getArtisan(slug: string): Promise<StrapiResponse<Artisan>> {
  const response = await fetchAPI<Artisan[]>('artisans', {
    filters: { slug },
    populate: ['avatar', 'location', 'contact', 'products']
  });
  
  if (!response.data?.[0]) {
    throw new Error('Artisan not found');
  }
  
  return { data: response.data[0], meta: response.meta };
}

// Categories API
export async function getCategories(params?: QueryParams): Promise<StrapiResponse<Category[]>> {
  return fetchAPI<Category[]>('categories', {
    populate: ['image'],
    sort: ['order:asc'],
    ...params
  });
}

export async function getCategory(slug: string): Promise<StrapiResponse<Category>> {
  const params: QueryParams = {
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: {
      image: true,
      products: {
        populate: ['images', 'artisan']
      }
    }
  };
  
  const response = await fetchAPI<Category[]>('categories', params);
  if (!response.data?.[0]) {
    throw new Error('Category not found');
  }
  return { data: response.data[0], meta: response.meta };
}

// Site Configuration API
export async function getSiteConfig(): Promise<StrapiResponse<SiteConfig>> {
  return fetchAPI<SiteConfig>('site-config', {
    populate: {
      seo: {
        populate: ['metaImage']
      },
      contact: true,
      socialMedia: true,
      featuredProducts: {
        populate: ['images', 'artisan']
      },
      featuredArtisans: {
        populate: ['avatar', 'location']
      }
    }
  });
}

// Search API
export async function searchProducts(query: string): Promise<StrapiResponse<Product[]>> {
  const params: QueryParams = {
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } }
      ]
    },
    populate: {
      images: true,
      artisan: {
        populate: ['avatar']
      },
      category: true
    }
  };
  
  return fetchAPI<Product[]>('products', params);
}

// Featured Content API
export async function getFeaturedProducts(): Promise<StrapiResponse<Product[]>> {
  return getProducts({
    filters: {
      featured: true
    },
    pagination: {
      pageSize: 5
    }
  });
}

export async function getFeaturedArtisans(): Promise<StrapiResponse<Artisan[]>> {
  return getArtisans({
    filters: {
      featured: true
    },
    pagination: {
      pageSize: 4
    }
  });
}

// Helper function to get full URL for media
export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
