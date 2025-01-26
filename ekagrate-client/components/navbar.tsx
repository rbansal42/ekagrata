"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useState } from "react";

// Choose one of these logo variations by uncommenting it and commenting out the others
const LogoVariation1 = () => (
  // Classic Uppercase with Extra Spacing
  <span className="font-cinzel text-2xl tracking-[0.25em] text-rose-900 uppercase font-semibold">
    ekagrata
  </span>
);

const LogoVariation2 = () => (
  // Two-Tone Split with Different Weights
  <span className="font-cinzel text-2xl tracking-[0.15em] uppercase">
    <span className="text-rose-900 font-bold">EKA</span>
    <span className="text-rose-800 font-normal">GRATA</span>
  </span>
);

const LogoVariation3 = () => (
  // Larger Size with Normal Spacing
  <span className="font-cinzel text-3xl tracking-[0.1em] text-rose-900 uppercase font-medium">
    ekagrata
  </span>
);

const LogoVariation4 = () => (
  // Mixed Case with Custom Spacing
  <span className="font-cinzel text-2xl tracking-[0.12em] text-rose-900 font-semibold">
    Ekagrata
  </span>
);

const LogoVariation5 = () => (
  // Compact Uppercase with Gradient
  <span className="font-cinzel text-2xl tracking-[0.08em] uppercase font-bold bg-gradient-to-r from-rose-900 to-rose-800 bg-clip-text text-transparent">
    ekagrata
  </span>
);

const LogoVariation6 = () => (
  // Extra Large with Minimal Spacing
  <span className="font-cinzel text-4xl tracking-[0.05em] text-rose-900 uppercase font-light">
    ekagrata
  </span>
);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "#products" },
    { name: "Artisans", href: "#artisans" },
    { name: "Stories", href: "#stories" },
  ];

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed bg-white/80 backdrop-blur-lg border-b border-rose-100/20 shadow-sm"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-rose-900"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <span className="font-cinzel text-2xl tracking-[0.15em] text-rose-900 uppercase font-light">
              ekagrata
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-rose-900 transition-colors duration-300 font-light tracking-wide"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="https://wa.me/your-number-here"
            className="bg-rose-900 hover:bg-rose-800 text-white font-light px-6 py-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Us
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/95 backdrop-blur-lg pt-8">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name} className="py-3">
            <Link
              className="w-full text-gray-600 hover:text-rose-900 transition-colors duration-300 font-light tracking-wide text-lg"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
