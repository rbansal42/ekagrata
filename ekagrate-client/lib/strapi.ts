import qs from "qs";

export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    stock: number;
    slug: string;
    whatsappNumber: string;
    whatsappMessage?: string;
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
    featuredImage: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          image: {
            data: {
              attributes: {
                url: string;
                alternativeText: string;
              };
            };
          };
        };
      };
    };
    artisan: {
      data: {
        id: number;
        attributes: {
          name: string;
          specialization: string;
          bio: string;
          location: string;
          slug: string;
          image: {
            data: {
              attributes: {
                url: string;
                alternativeText: string;
              };
            };
          };
        };
      };
    };
    tags: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    estimatedDelivery: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface Artisan {
  id: number;
  attributes: {
    name: string;
    specialization: string;
    bio: string;
    location: string;
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface GlobalSettings {
  id: number;
  attributes: {
    whatsapp_number: string;
    default_whatsapp_message?: string;
    contact_email: string;
    instagram_handle?: string;
  };
}

interface ProductFilters {
  category?: string;
  artisan?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  inStock?: boolean;
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy?: string;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI<T>(endpoint: string, options = {}): Promise<T> {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api/${endpoint}`;

  console.log("Fetching URL:", requestUrl);
  console.log("Request Headers:", mergedOptions.headers);

  try {
    const res = await fetch(requestUrl, mergedOptions);

    if (!res.ok) {
      console.error("Fetch failed:", {
        status: res.status,
        statusText: res.statusText,
        body: await res.text(),
      });
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<StrapiResponse<Product[]>> {
  const query = qs.stringify(
    {
      filters: {
        ...(filters.category
          ? { "category.slug": { $eq: filters.category } }
          : {}),
        ...(filters.artisan
          ? { "artisan.slug": { $eq: filters.artisan } }
          : {}),
        ...(filters.search
          ? {
              $or: [
                { name: { $containsi: filters.search } },
                { description: { $containsi: filters.search } },
              ],
            }
          : {}),
        ...(filters.inStock ? { stock: { $gt: 0 } } : {}),
        ...(filters.priceRange?.min || filters.priceRange?.max
          ? {
              price: {
                ...(filters.priceRange.min ? { $gte: filters.priceRange.min } : {}),
                ...(filters.priceRange.max ? { $lte: filters.priceRange.max } : {}),
              },
            }
          : {}),
      },
      populate: {
        images: true,
        featuredImage: true,
        category: {
          populate: ['image']
        },
        artisan: {
          populate: ['image']
        },
        tags: true
      },
      pagination: {
        page: filters.page || 1,
        pageSize: filters.pageSize || 12,
      },
      ...(filters.sortBy
        ? {
            sort: filters.sortBy,
          }
        : { sort: ["createdAt:desc"] }),
    },
    {
      encodeValuesOnly: true,
    }
  );

  return fetchAPI(`products?${query}`);
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  const query = qs.stringify(
    {
      populate: {
        image: true
      }
    },
    {
      encodeValuesOnly: true,
    }
  );
  return fetchAPI(`categories?${query}`);
}

export async function getArtisans(): Promise<StrapiResponse<Artisan[]>> {
  const query = qs.stringify(
    {
      populate: {
        image: true
      }
    },
    {
      encodeValuesOnly: true,
    }
  );
  return fetchAPI(`artisans?${query}`);
}

export async function getProduct(
  slug: string,
): Promise<StrapiResponse<Product>> {
  console.log("Getting product with slug:", slug);
  const query = qs.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: {
        featuredImage: true,
        images: true,
        category: {
          populate: ["image"],
        },
        artisan: {
          populate: ["image"],
        },
        tags: true,
      },
    },
    { encodeValuesOnly: true },
  );

  return fetchAPI<StrapiResponse<Product>>(`products?${query}`);
}

export async function getArtisan(
  slug: string,
): Promise<StrapiResponse<Artisan>> {
  console.log("Getting artisan with slug:", slug);
  const query = qs.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: ["image"],
    },
    { encodeValuesOnly: true },
  );

  return fetchAPI<StrapiResponse<Artisan>>(`artisans?${query}`);
}

export async function getGlobalSettings(): Promise<StrapiResponse<GlobalSettings>> {
  try {
    const response = await fetchAPI('site-config');
    if (!response.data) {
      // Return default values if no settings exist
      return {
        data: {
          id: 0,
          attributes: {
            whatsapp_number: process.env.DEFAULT_WHATSAPP_NUMBER || '',
            default_whatsapp_message: 'Hi, I am interested in your products',
            contact_email: process.env.DEFAULT_CONTACT_EMAIL || 'contact@ekagrata.in',
            instagram_handle: process.env.DEFAULT_INSTAGRAM_HANDLE || 'ekagrata.crafts'
          }
        },
        meta: {}
      };
    }
    return response;
  } catch (error) {
    console.error('Failed to fetch global settings:', error);
    // Return default values on error
    return {
      data: {
        id: 0,
        attributes: {
          whatsapp_number: process.env.DEFAULT_WHATSAPP_NUMBER || '',
          default_whatsapp_message: 'Hi, I am interested in your products',
          contact_email: process.env.DEFAULT_CONTACT_EMAIL || 'contact@ekagrata.in',
          instagram_handle: process.env.DEFAULT_INSTAGRAM_HANDLE || 'ekagrata.crafts'
        }
      },
      meta: {}
    };
  }
}

export function formatWhatsAppLink(product: Product, settings: GlobalSettings) {
  const number = product.attributes.whatsappNumber || settings.attributes.whatsapp_number;
  const message = product.attributes.whatsappMessage || settings.attributes.default_whatsapp_message || '';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function getStrapiMedia(url: string) {
  if (!url) return '/images/fallback-product.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function getFeaturedProducts(): Promise<StrapiResponse<Product[]>> {
  const query = qs.stringify(
    {
      filters: {
        featured: { $eq: true }
      },
      populate: {
        featuredImage: true,
        category: {
          populate: ['image']
        },
        artisan: {
          populate: ['image']
        }
      },
      pagination: {
        pageSize: 6
      },
      sort: ['createdAt:desc']
    },
    {
      encodeValuesOnly: true,
    }
  );
  return fetchAPI(`products?${query}`);
}

export async function getFeaturedArtisans(): Promise<StrapiResponse<Artisan[]>> {
  const query = qs.stringify(
    {
      filters: {
        featured: { $eq: true }
      },
      populate: {
        image: true
      },
      pagination: {
        pageSize: 3
      }
    },
    {
      encodeValuesOnly: true,
    }
  );
  return fetchAPI(`artisans?${query}`);
}
