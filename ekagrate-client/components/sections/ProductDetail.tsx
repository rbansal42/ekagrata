"use client";

import type { Route } from "next";

import Image from "next/image";
import { Button } from "@heroui/button";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { formatWhatsAppLink, getStrapiMedia, Product } from "@/lib/strapi";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  // Move all hooks to the top
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState<
    "description" | "delivery" | "returns"
  >("description");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Use useEffect to set initial selected image
  useEffect(() => {
    if (!product?.attributes) return;

    const allImages = [
      product.attributes.featuredImage?.data
        ? getStrapiMedia(product.attributes.featuredImage.data.attributes.url)
        : "https://picsum.photos/600/400?blur=2",
      ...(product.attributes.images?.data || []).map((img) =>
        getStrapiMedia(img.attributes.url),
      ),
    ].filter(Boolean);

    if (allImages.length > 0 && !selectedImage) {
      setSelectedImage(allImages[0]);
    }
  }, [product, selectedImage]);

  if (!product || !product.attributes) {
    return <div>Product not found</div>;
  }

  const {
    name,
    description,
    price,
    images,
    featuredImage,
    estimatedDelivery,
    tags,
  } = product.attributes;

  const allImages = [
    featuredImage?.data
      ? getStrapiMedia(featuredImage.data.attributes.url)
      : "https://picsum.photos/600/400?blur=2",
    ...(images?.data || []).map((img) => getStrapiMedia(img.attributes.url)),
  ].filter(Boolean);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        <Link className="hover:text-rose-900" href={"/" as Route}>
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link className="hover:text-rose-900" href={"/products" as Route}>
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div
            ref={imageContainerRef}
            className="aspect-square relative rounded-xl overflow-hidden bg-rose-50 cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              fill
              priority
              alt={name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={selectedImage || "https://picsum.photos/600/400?blur=2"}
            />
            {isZoomed && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: "200%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`aspect-square relative rounded-lg overflow-hidden bg-rose-50 ${
                    selectedImage === img ? "ring-2 ring-rose-900" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    fill
                    alt={`${name} view ${idx + 1}`}
                    className="object-cover"
                    sizes="16vw"
                    src={img}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-light tracking-wide mb-4">{name}</h1>
            <p className="text-2xl font-light text-rose-900 mb-6">
              ₹{price.toLocaleString("en-IN")}
            </p>

            {/* Action Button */}
            <div className="mb-8">
              <Button
                as="a"
                className="w-full bg-rose-900 hover:bg-rose-800 text-white font-light px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                href={formatWhatsAppLink(product)}
                rel="noopener noreferrer"
                size="lg"
                target="_blank"
              >
                Enquire on WhatsApp
              </Button>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="prose prose-rose font-light tracking-wide text-gray-600"
            />
          </div>

          {/* Tabs */}
          <div className="border-b border-rose-100/20">
            <nav className="flex gap-8">
              {["description", "delivery", "returns"].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-light tracking-wide border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-rose-900 text-rose-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "description" && (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="prose prose-rose font-light tracking-wide text-gray-600"
              />
            )}

            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-light mb-3">
                    Estimated Delivery
                  </h3>
                  <p className="text-gray-600 font-light">
                    {estimatedDelivery || "7-10 business days"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-3">Prepaid Orders</h3>
                  <p className="text-gray-600 font-light">
                    We accept prepaid orders through various payment methods
                    including UPI, bank transfer, and credit/debit cards. Once
                    your payment is confirmed, we&apos;ll begin processing your
                    order immediately.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-3">
                    Shipping Information
                  </h3>
                  <p className="text-gray-600 font-light">
                    We ship across India using trusted courier partners. Each
                    order is carefully packaged to ensure your product reaches
                    you in perfect condition. You&apos;ll receive tracking
                    information once your order is dispatched.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-light mb-3">Return Policy</h3>
                  <p className="text-gray-600 font-light">
                    We want you to be completely satisfied with your purchase.
                    If you receive a damaged or defective item, please contact
                    us within 48 hours of delivery. We&apos;ll assist you with
                    the return process and ensure you receive a replacement or
                    refund.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-3">Exchange Policy</h3>
                  <p className="text-gray-600 font-light">
                    For size or fit issues, we offer exchanges subject to
                    product availability. Please note that customized items
                    cannot be exchanged unless they&apos;re defective. Contact
                    us within 7 days of delivery to initiate an exchange.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-light mb-3">Quality Guarantee</h3>
                  <p className="text-gray-600 font-light">
                    Each product is carefully inspected before shipping to
                    ensure it meets our quality standards. We stand behind the
                    craftsmanship of our artisans and guarantee the quality of
                    our products.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags?.data && tags.data.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.data.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-rose-50 text-rose-900 rounded-full text-sm font-light"
                >
                  {tag.attributes.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
