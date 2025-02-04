import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

export interface StrapiImages {
  data: Array<{
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
    };
  }>;
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    description: string;
    slug: string;
    image: StrapiImage;
  };
}

export interface Artisan {
  id: number;
  attributes: {
    name: string;
    specialization: string;
    bio: string;
    location: string;
    image: StrapiImage;
    slug: string;
  };
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    whatsappNumber: string;
    whatsappMessage?: string;
    stock: number;
    slug: string;
    images: StrapiImages;
    featuredImage?: StrapiImage;
    category: {
      data: Category;
    };
    artisan: {
      data: Artisan;
    };
    estimatedDelivery?: string;
    isCustomizable?: boolean;
    customizationOptions?: Array<{
      name: string;
      description?: string;
      type: "color" | "size" | "material" | "design" | "text";
      options?: any;
      priceAdjustment?: number;
    }>;
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductFilters {
  categories?: string[];
  artisans?: string[];
  priceRange?: string;
  inStock?: boolean;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Story {
  id: number;
  attributes: {
    title: string;
    preview: string;
    content: string;
    image: StrapiImage;
    artisan: {
      data: {
        attributes: Omit<Artisan["attributes"], "products">;
      };
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type FetchResponse<T> = StrapiResponse<T>;
