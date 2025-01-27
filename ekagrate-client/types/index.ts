import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface StrapiImage {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
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

export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    whatsappNumber: string;
    whatsappMessage?: string;
    images: {
      data: Array<{
        attributes: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
    featuredImage: StrapiImage;
    materials: Materials;
    dimensions: Dimensions;
    specifications?: Specification[];
    careInstructions?: string;
    estimatedDelivery?: string;
    isCustomizable: boolean;
    customizationOptions?: CustomizationOption[];
    artisan: {
      data: {
        id: number;
        attributes: Omit<Artisan["attributes"], "products">;
      };
    };
    category?: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
  };
}

export interface Artisan {
  id: string;
  attributes: {
    name: string;
    bio: string;
    image: Media;
    products: {
      data: Product[];
    };
  };
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
