export const categories = [
  {
    title: 'Pottery',
    description: 'Handcrafted ceramic items made with traditional techniques',
    slug: 'pottery',
    order: 1
  },
  {
    title: 'Textiles',
    description: 'Traditional handwoven fabrics and garments',
    slug: 'textiles',
    order: 2
  },
  {
    title: 'Jewelry',
    description: 'Handcrafted jewelry using traditional designs',
    slug: 'jewelry',
    order: 3
  }
];

export const artisans = [
  {
    name: 'Rajesh Kumar',
    bio: 'Master potter with 20 years of experience in traditional pottery',
    slug: 'rajesh-kumar',
    location: {
      city: 'Jaipur',
      state: 'Rajasthan'
    },
    contact: {
      email: 'rajesh@example.com',
      phone: '+91-9876543210'
    },
    featured: true
  },
  {
    name: 'Maya Devi',
    bio: 'Expert weaver specializing in traditional textile patterns',
    slug: 'maya-devi',
    location: {
      city: 'Varanasi',
      state: 'Uttar Pradesh'
    },
    contact: {
      email: 'maya@example.com',
      phone: '+91-9876543211'
    },
    featured: true
  }
];

export const products = [
  {
    title: 'Traditional Clay Pot',
    description: 'Handcrafted clay pot made using traditional techniques',
    slug: 'traditional-clay-pot',
    price: 1200,
    featured: true,
    stock: 10
  },
  {
    title: 'Handwoven Silk Saree',
    description: 'Traditional Banarasi silk saree with intricate patterns',
    slug: 'handwoven-silk-saree',
    price: 15000,
    featured: true,
    stock: 5
  },
  {
    title: 'Silver Anklet',
    description: 'Traditional silver anklet with bells',
    slug: 'silver-anklet',
    price: 2500,
    featured: false,
    stock: 15
  }
];

export const siteConfig = {
  siteName: 'Ekagrata',
  seo: {
    metaTitle: 'Ekagrata - Traditional Indian Crafts',
    metaDescription: 'Discover authentic Indian handicrafts made by skilled artisans',
    keywords: 'handicrafts, Indian crafts, artisans, traditional'
  },
  contact: {
    email: 'contact@ekagrata.in',
    phone: '+91-9876543210',
    address: 'Jaipur, Rajasthan, India'
  },
  socialMedia: {
    instagram: 'ekagrata.crafts',
    facebook: 'ekagrata.crafts',
    twitter: 'ekagrata_crafts'
  }
}; 