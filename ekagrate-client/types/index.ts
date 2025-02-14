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
    products: {
      data: Product[];
    };
    artisans: {
      data: Artisan[];
    };
    featured: boolean;
    order: number;
  };
}

export interface Contact {
  whatsapp: string;
  email?: string;
  phone?: string;
  address?: string;
  defaultMessage?: string;
}

export interface Artisan {
  id: number;
  attributes: {
    name: string;
    slug: string;
    bio: string;
    avatar: StrapiImage;
    gallery?: StrapiImages;
    products: {
      data: Product[];
    };
    categories: {
      data: Category[];
    };
    contact: Contact;
    featured: boolean;
  };
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    images: StrapiImages;
    featuredImage: number;
    artisan: {
      data: Artisan;
    };
    categories: {
      data: Category[];
    };
    featured: boolean;
  };
}

export interface ProductFilters {
  categories?: string[];
  artisans?: string[];
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
