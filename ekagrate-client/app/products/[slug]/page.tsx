"use client";

import { getProduct } from "@/lib/strapi";
import { ProductDetail } from "@/components/sections";
import { notFound } from "next/navigation";
import { DUMMY_PRODUCTS } from "@/constants/dummyData";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }

  try {
    // Find product from dummy data using slug
    const product = DUMMY_PRODUCTS.find(p => p.attributes.slug === slug);
    
    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
} 