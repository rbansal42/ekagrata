// Strapi Common Types
export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
};

export type StrapiImages = {
  data: Array<StrapiImage['data']>;
};

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

// Component Types
export type Location = {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type Contact = {
  whatsapp: string;
  email?: string;
  instagram?: string;
  defaultMessage?: string;
};

export type SEO = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaImage: StrapiImage;
  structuredData?: Record<string, any>;
};

export type SocialMedia = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  pinterest?: string;
};

// Entity Types
export type Product = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    price: number;
    images: StrapiImages;
    featured: boolean;
    metadata?: Record<string, any>;
    artisan: {
      data: Artisan;
    };
    category: {
      data: Category;
    };
    createdAt: string;
    updatedAt: string;
  };
};

export type Artisan = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    bio: string;
    expertise: string;
    location: Location;
    avatar: StrapiImage;
    gallery?: StrapiImages;
    contact: Contact;
    featured: boolean;
    status: 'active' | 'inactive';
    products?: {
      data: Product[];
    };
    createdAt: string;
    updatedAt: string;
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    image: StrapiImage;
    featured: boolean;
    order: number;
    products?: {
      data: Product[];
    };
    createdAt: string;
    updatedAt: string;
  };
};

export type SiteConfig = {
  id: number;
  attributes: {
    siteName: string;
    siteDescription: string;
    contact: Contact;
    seo: SEO;
    socialMedia: SocialMedia;
    featuredProducts?: {
      data: Product[];
    };
    featuredArtisans?: {
      data: Artisan[];
    };
  };
};

export interface GlobalSettings {
  id: number;
  attributes: {
    whatsapp_number: string;
    default_whatsapp_message?: string;
    contact_email: string;
    instagram_handle?: string;
  };
} 