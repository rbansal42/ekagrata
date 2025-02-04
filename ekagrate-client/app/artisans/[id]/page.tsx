"use client";

import type { Route } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, getArtisan, Artisan as StrapiArtisan, getProducts, Product } from "@/lib/strapi";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { name, price, description, images, slug } = product.attributes;
  const imageUrl = getStrapiMedia(images.data[0].attributes.url);

  return (
    <Link href={`/products/${slug}` as Route} className="group">
      <div className="aspect-square relative rounded-xl overflow-hidden bg-rose-50 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-light text-lg tracking-wide group-hover:text-rose-900 transition-colors duration-300">{name}</h3>
      <p className="text-rose-900 font-light">₹{price.toLocaleString()}</p>
      <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide mt-2">{description}</p>
    </Link>
  );
}

export default function ArtisanDetailPage({ params }: { params: { id: string } }) {
  const [artisan, setArtisan] = useState<StrapiArtisan | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisan = async () => {
      setLoading(true);
      try {
        const response = await getArtisan(params.id);
        setArtisan(response?.data || null);

        // Get products by artisan ID
        const productsResponse = await getProducts({ artisan: params.id });
        setArtisanProducts(productsResponse?.data || []);
      } catch (error) {
        setArtisan(null);
        setArtisanProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisan();
  }, [params.id]);

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

  if (!artisan) {
    return (
      <div className="container max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-light mb-4 tracking-wide">Artisan Not Found</h1>
        <p className="text-gray-600 font-light mb-8">The artisan you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href={"/artisans" as Route}
          className="text-rose-900 hover:text-rose-800 font-light tracking-wide transition-colors duration-300"
        >
          ← Back to Artisans
        </Link>
      </div>
    );
  }

  const { name, specialization, bio, location, image } = artisan.attributes;
  const imageUrl = getStrapiMedia(image.data.attributes.url);

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        <Link href={"/" as Route} className="hover:text-rose-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href={"/artisans" as Route} className="hover:text-rose-900">Artisans</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </div>

      {/* Artisan Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-rose-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-light mb-4 tracking-wide">{name}</h1>
          <p className="text-rose-900 font-light text-xl mb-6">{specialization}</p>
          <p className="text-gray-600 font-light leading-relaxed mb-6">{bio}</p>
          <p className="text-gray-500 font-light">
            <span className="text-gray-900">Location:</span> {location}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="border-t border-rose-100/20 pt-16">
        <h2 className="text-3xl font-light mb-8 tracking-wide">Products by {name}</h2>
        {artisanProducts.length === 0 ? (
          <p className="text-gray-600 font-light">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisanProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
