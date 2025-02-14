export type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiData<T> = {
  id: number;
  attributes: T;
};

export type StrapiImage = {
  data: StrapiData<{
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  }> | null;
};

export type StrapiImages = {
  data: Array<StrapiData<{
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  }>>;
};

export interface Artisan {
  name: string;
  slug: string;
  bio: string;
  avatar: StrapiImage;
  gallery: StrapiImages;
  featured: boolean;
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  images: StrapiImages;
  featuredImage: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image: StrapiImage;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
} 