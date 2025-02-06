import { Product, SiteConfig } from '../types';

export function formatWhatsAppLink(product: Product, siteConfig: SiteConfig): string {
  const contact = product.attributes.artisan.data.attributes.contact;
  const defaultContact = siteConfig.attributes.contact;
  
  const number = contact?.whatsapp || defaultContact.whatsapp;
  const message = contact?.defaultMessage || defaultContact.defaultMessage || '';
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateMetadata(title: string, description: string) {
  return {
    title: `${title} | Ekagrata`,
    description,
    openGraph: {
      title: `${title} | Ekagrata`,
      description,
      siteName: 'Ekagrata',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Ekagrata`,
      description,
    },
  };
} 