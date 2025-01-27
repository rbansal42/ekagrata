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
    price: number;
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
    materials?: {
      primaryMaterial: string;
      additionalMaterials?: string;
      finish?: string;
      color?: string;
      isEcoFriendly: boolean;
    };
    dimensions?: {
      length: number;
      width: number;
      height?: number;
      weight?: number;
      unit: 'cm' | 'inch' | 'm';
      weightUnit?: 'g' | 'kg';
    };
    specifications?: Array<{
      label: string;
      value: string;
      icon?: string;
    }>;
    careInstructions?: string;
    estimatedDelivery?: string;
    isCustomizable?: boolean;
    customizationOptions?: Array<{
      name: string;
      description?: string;
      type: 'color' | 'size' | 'material' | 'design' | 'text';
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

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Materials {
  primaryMaterial: string;
  additionalMaterials?: string;
  finish?: string;
  color?: string;
  isEcoFriendly: boolean;
}

interface Dimensions {
  length: number;
  width: number;
  height?: number;
  weight?: number;
  unit: 'cm' | 'inch' | 'm';
  weightUnit?: 'g' | 'kg';
}

interface Specification {
  label: string;
  value: string;
  icon?: string;
}

interface CustomizationOption {
  name: string;
  description?: string;
  type: 'color' | 'size' | 'material' | 'design' | 'text';
  options?: any;
  priceAdjustment?: number;
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
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
