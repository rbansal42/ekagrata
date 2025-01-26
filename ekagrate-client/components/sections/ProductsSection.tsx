"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { Product } from "@/types";
import { formatWhatsAppLink, getStrapiMedia, getProducts } from "@/lib/strapi";
import { Suspense } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { name, shortDescription, price, featuredImage } = product.attributes;
  const imageUrl = getStrapiMedia(featuredImage.data.attributes.url);
  const whatsappLink = formatWhatsAppLink(product);

  return (
    <div className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square relative rounded-xl overflow-hidden mb-6 bg-rose-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="font-light text-xl tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
        <p className="text-gray-600 mb-3 font-light leading-relaxed line-clamp-2 tracking-wide">{shortDescription}</p>
        <p className="text-xl font-light text-rose-900 mb-6">₹{price.toLocaleString('en-IN')}</p>
      </Link>
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button 
          className="w-full bg-rose-900 hover:bg-rose-800 text-white font-light py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Enquire on WhatsApp
        </Button>
      </a>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-rose-100/50 rounded-xl mb-6" />
      <div className="h-7 bg-rose-100/50 rounded-lg mb-3 w-3/4" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-6 w-2/3" />
      <div className="h-12 bg-rose-100/50 rounded-xl" />
    </div>
  );
}

async function ProductsList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="container max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4 tracking-wide">Featured Products</h2>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
          Discover our curated collection of artisanal treasures, each piece telling a unique story of craftsmanship and heritage
        </p>
      </div>
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      }>
        <ProductsList />
      </Suspense>
    </section>
  );
} 