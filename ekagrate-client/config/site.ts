export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ekagrata",
  description: "Discover unique artisan products at Ekagrata - A Rotaract project promoting local artisans and their craftsmanship.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Artisans",
      href: "/artisans",
    },
    {
      label: "Contact",
      href: "/contact",
    }
  ],
  navMenuItems: [
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Artisans",
      href: "/artisans",
    },
    {
      label: "Contact",
      href: "/contact",
    }
  ],
  links: {
    instagram: "https://instagram.com/ekagrata",
    facebook: "https://facebook.com/ekagrata",
  },
};
