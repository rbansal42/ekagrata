export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface Product {
  attributes: {
    whatsappNumber?: string;
    whatsappMessage?: string;
    // ... other product fields
  };
}

export interface Artisan {
  attributes: {
    specialization: string;
    bio: string;
    // ... other artisan fields
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