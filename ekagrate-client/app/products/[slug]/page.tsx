"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/index";
import { ProductDetail } from "@/components/sections/ProductDetail";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data?.data || null);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-6 py-12 animate-pulse">
        <div className="aspect-[2/1] bg-rose-100/50 rounded-2xl mb-12" />
        <div className="h-8 bg-rose-100/50 rounded-lg mb-4 w-1/3" />
        <div className="h-6 bg-rose-100/50 rounded-lg mb-8 w-1/4" />
        <div className="h-4 bg-rose-100/50 rounded-lg mb-2 w-full" />
        <div className="h-4 bg-rose-100/50 rounded-lg mb-2 w-5/6" />
        <div className="h-4 bg-rose-100/50 rounded-lg w-4/6" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-light mb-4 tracking-wide">Product Not Found</h1>
        <p className="text-gray-600 font-light mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
