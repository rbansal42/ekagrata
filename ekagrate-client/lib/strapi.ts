import { notFound } from "next/navigation";
import { Product, Artisan, StrapiResponse, Category, PaginationMeta } from "@/types";
import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Dummy data for development
const DUMMY_DATA = {
  products: [
    {
      id: 1,
      attributes: {
        name: "Handwoven Silk Saree",
        description: "Traditional handwoven silk saree with intricate designs",
        shortDescription: "Exquisite handwoven silk saree with traditional motifs",
        price: 15000,
        whatsappNumber: "919876543210",
        whatsappMessage: "Hi, I'm interested in the Handwoven Silk Saree",
        images: {
          data: [
            {
              attributes: {
                url: "https://picsum.photos/seed/saree1/600/600",
                alternativeText: "Handwoven Silk Saree View 1",
              },
            },
            {
              attributes: {
                url: "https://picsum.photos/seed/saree2/600/600",
                alternativeText: "Handwoven Silk Saree View 2",
              },
            },
            {
              attributes: {
                url: "https://picsum.photos/seed/saree3/600/600",
                alternativeText: "Handwoven Silk Saree View 3",
              },
            }
          ],
        },
        featuredImage: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/saree-main/600/600",
              alternativeText: "Handwoven Silk Saree Main View",
            },
          },
        },
        artisan: {
          data: {
            id: 1,
            attributes: {
              name: "Rajesh Kumar",
              specialization: "Silk Weaving",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        name: "Brass Metal Art",
        description: "Handcrafted brass metal art with traditional motifs",
        shortDescription: "Beautiful handcrafted brass metal art piece",
        price: 8500,
        whatsappNumber: "919876543210",
        whatsappMessage: "Hi, I'm interested in the Brass Metal Art",
        images: {
          data: [
            {
              attributes: {
                url: "https://picsum.photos/seed/brass1/600/600",
                alternativeText: "Brass Metal Art View 1",
              },
            },
            {
              attributes: {
                url: "https://picsum.photos/seed/brass2/600/600",
                alternativeText: "Brass Metal Art View 2",
              },
            }
          ],
        },
        featuredImage: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/brass-main/600/600",
              alternativeText: "Brass Metal Art Main View",
            },
          },
        },
        artisan: {
          data: {
            id: 2,
            attributes: {
              name: "Meena Kumari",
              specialization: "Metal Work",
            },
          },
        },
      },
    },
  ],
  artisans: [
    {
      id: 1,
      attributes: {
        name: "Rajesh Kumar",
        specialization: "Silk Weaving",
        bio: "Master weaver with 20 years of experience",
        location: "Varanasi, UP",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/artisan1/400/400",
              alternativeText: "Rajesh Kumar",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        name: "Meena Kumari",
        specialization: "Metal Work",
        bio: "Award-winning metal artist specializing in brass work",
        location: "Moradabad, UP",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/artisan2/400/400",
              alternativeText: "Meena Kumari",
            },
          },
        },
      },
    },
  ],
  stories: [
    {
      id: 1,
      attributes: {
        title: "The Art of Silk Weaving",
        preview: "Discover the ancient tradition of silk weaving",
        content: "Long form content about silk weaving...",
        image: {
          data: {
            attributes: {
              url: "https://picsum.photos/seed/story1/800/450",
              alternativeText: "Silk Weaving Process",
            },
          },
        },
        artisan: {
          data: {
            id: 1,
            attributes: {
              name: "Rajesh Kumar",
              specialization: "Silk Weaving",
            },
          },
        },
      },
    },
  ],
};

class StrapiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'StrapiError';
  }
}

async function fetchAPI<T>(endpoint: string, cache: RequestCache = 'force-cache'): Promise<StrapiResponse<T>> {
  if (process.env.NODE_ENV === 'development') {
    // Return dummy data in development
    const type = endpoint.split('?')[0].split('/').filter(Boolean)[0];
    const id = endpoint.split('/')[1]?.split('?')[0];
    
    if (id) {
      const item = DUMMY_DATA[type as keyof typeof DUMMY_DATA]?.find(i => i.id === Number(id));
      return { data: item } as unknown as StrapiResponse<T>;
    }
    
    return { 
      data: DUMMY_DATA[type as keyof typeof DUMMY_DATA] as any,
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 } }
    };
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, { 
    headers,
    cache,
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new StrapiError(`Failed to fetch ${endpoint}`, res.status);
  }

  return res.json();
}

export async function getProducts(filters: ProductFilters = {}): Promise<FetchResponse<Product[]>> {
  const {
    categories,
    artisans,
    priceRange,
    inStock,
    sortBy = "createdAt:desc",
    page = 1,
    pageSize = 9,
  } = filters;

  const query = {
    populate: ["images", "category", "artisan"],
    pagination: {
      page,
      pageSize,
    },
    filters: {
      ...(categories?.length && {
        category: {
          id: {
            $in: categories,
          },
        },
      }),
      ...(artisans?.length && {
        artisan: {
          id: {
            $in: artisans,
          },
        },
      }),
      ...(inStock && {
        stock: {
          $gt: 0,
        },
      }),
      ...(priceRange && priceRange !== "all" && {
        price: getPriceFilter(priceRange),
      }),
    },
    sort: getSortValue(sortBy),
  };

  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const response = await fetch(`${STRAPI_URL}/api/products?${queryString}`);
  return response.json();
}

export async function getCategories(): Promise<FetchResponse<Category[]>> {
  const query = qs.stringify({
    populate: ["image"],
  }, { encodeValuesOnly: true });

  const response = await fetch(`${STRAPI_URL}/api/categories?${query}`);
  return response.json();
}

export async function getArtisans(): Promise<FetchResponse<Artisan[]>> {
  const query = qs.stringify({
    populate: ["image"],
  }, { encodeValuesOnly: true });

  const response = await fetch(`${STRAPI_URL}/api/artisans?${query}`);
  return response.json();
}

function getPriceFilter(priceRange: string) {
  const [min, max] = priceRange.split("-").map(Number);
  
  if (!max) {
    return {
      $gt: min,
    };
  }

  return {
    $gte: min,
    $lte: max,
  };
}

function getSortValue(sortBy: string) {
  switch (sortBy) {
    case "price-low":
      return ["price:asc"];
    case "price-high":
      return ["price:desc"];
    case "popular":
      return ["views:desc"];
    case "newest":
    default:
      return ["createdAt:desc"];
  }
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetchAPI<{ data: Product }>(`products/${id}?populate=*`);
  return response.data as unknown as Product;
}

export async function getArtisan(id: string): Promise<Artisan> {
  const response = await fetchAPI<{ data: Artisan }>(`artisans/${id}?populate=*`);
  return response.data as unknown as Artisan;
}

export function formatWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    product.attributes.whatsappMessage || 
    `Hi, I'm interested in ${product.attributes.name}`
  );
  return `https://wa.me/${product.attributes.whatsappNumber}?text=${message}`;
}

export function getStrapiMedia(url: string): string {
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
} 