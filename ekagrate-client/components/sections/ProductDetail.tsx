"use client";

import Image from "next/image";
import { Product } from "@/types";
import { formatWhatsAppLink, getStrapiMedia } from "@/lib/strapi";
import { Button } from "@heroui/button";
import { useState, useRef } from "react";
import Link from "next/link";
import type { Route } from "next";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  if (!product || !product.attributes) {
    return <div>Product not found</div>;
  }

  const {
    name,
    description,
    price,
    images,
    featuredImage,
    artisan,
    materials,
    dimensions,
    specifications,
    careInstructions,
    estimatedDelivery,
    isCustomizable,
    customizationOptions,
    category,
    tags
  } = product.attributes;

  const allImages = [
    featuredImage?.data ? getStrapiMedia(featuredImage.data.attributes.url) : "https://picsum.photos/600/400?blur=2",
    ...(images?.data || []).map(img => getStrapiMedia(img.attributes.url))
  ].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
        <Link href={"/" as Route} className="hover:text-rose-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href={"/products" as Route} className="hover:text-rose-900">Products</Link>
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
              src={selectedImage || "https://picsum.photos/600/400?blur=2"}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {isZoomed && (
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square relative rounded-lg overflow-hidden bg-rose-50 ${
                    selectedImage === img ? "ring-2 ring-rose-900" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="16vw"
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
            <p className="text-2xl font-light text-rose-900 mb-6">₹{price.toLocaleString('en-IN')}</p>
            <div className="prose prose-rose font-light tracking-wide text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          {/* Tabs */}
          <div className="border-b border-rose-100/20">
            <nav className="flex gap-8">
              {['description', 'specifications', 'care'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`py-4 text-sm font-light tracking-wide border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-rose-900 text-rose-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'description' && (
              <div className="prose prose-rose font-light tracking-wide text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
            )}

            {activeTab === 'specifications' && materials && dimensions && (
              <div className="space-y-8">
                {/* Materials */}
                <div>
                  <h3 className="text-lg font-light mb-3">Materials</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-gray-500 font-light">Primary Material</dt>
                      <dd className="text-gray-600 font-light">{materials.primaryMaterial}</dd>
                    </div>
                    {materials.additionalMaterials && (
                      <div>
                        <dt className="text-gray-500 font-light">Additional Materials</dt>
                        <dd className="text-gray-600 font-light">{materials.additionalMaterials}</dd>
                      </div>
                    )}
                    {materials.finish && (
                      <div>
                        <dt className="text-gray-500 font-light">Finish</dt>
                        <dd className="text-gray-600 font-light">{materials.finish}</dd>
                      </div>
                    )}
                    {materials.color && (
                      <div>
                        <dt className="text-gray-500 font-light">Color</dt>
                        <dd className="text-gray-600 font-light">{materials.color}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Dimensions */}
                <div>
                  <h3 className="text-lg font-light mb-3">Dimensions</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-gray-500 font-light">Length</dt>
                      <dd className="text-gray-600 font-light">{dimensions.length} {dimensions.unit}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500 font-light">Width</dt>
                      <dd className="text-gray-600 font-light">{dimensions.width} {dimensions.unit}</dd>
                    </div>
                    {dimensions.height && (
                      <div>
                        <dt className="text-gray-500 font-light">Height</dt>
                        <dd className="text-gray-600 font-light">{dimensions.height} {dimensions.unit}</dd>
                      </div>
                    )}
                    {dimensions.weight && (
                      <div>
                        <dt className="text-gray-500 font-light">Weight</dt>
                        <dd className="text-gray-600 font-light">{dimensions.weight} {dimensions.weightUnit}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Additional Specifications */}
                {specifications && specifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-light mb-3">Additional Specifications</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      {specifications.map((spec, idx) => (
                        <div key={idx}>
                          <dt className="text-gray-500 font-light">{spec.label}</dt>
                          <dd className="text-gray-600 font-light">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'care' && careInstructions && (
              <div className="prose prose-rose font-light tracking-wide text-gray-600" dangerouslySetInnerHTML={{ __html: careInstructions }} />
            )}
          </div>

          {/* Customization Options */}
          {isCustomizable && customizationOptions && customizationOptions.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-rose-100/20">
              <h3 className="text-lg font-light mb-3">Customization Options</h3>
              <div className="space-y-4">
                {customizationOptions.map((option, idx) => (
                  <div key={idx}>
                    <label className="block text-gray-600 font-light">{option.name}</label>
                    <p className="text-gray-500 font-light text-sm">{option.description}</p>
                    {option.priceAdjustment && option.priceAdjustment > 0 && (
                      <p className="text-rose-900 font-light text-sm">+₹{option.priceAdjustment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags?.data && tags.data.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.data.map(tag => (
                <span key={tag.id} className="px-3 py-1 bg-rose-50 text-sm rounded-full text-rose-900 font-light">
                  {tag.attributes.name}
                </span>
              ))}
            </div>
          )}

          {/* Artisan */}
          {artisan?.data && (
            <div className="border-t border-rose-100/20 pt-6">
              <div className="flex items-center gap-4">
                {artisan.data.attributes.image?.data && (
                  <div className="w-12 h-12 relative rounded-full overflow-hidden bg-rose-50">
                    <Image
                      src={getStrapiMedia(artisan.data.attributes.image.data.attributes.url)}
                      alt={artisan.data.attributes.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-light text-lg">
                    Crafted by{" "}
                    <Link
                      href={`/artisans/${artisan.data.id}` as Route}
                      className="text-rose-900 hover:text-rose-800 transition-colors duration-300"
                    >
                      {artisan.data.attributes.name}
                    </Link>
                  </p>
                  <p className="text-gray-600 font-light">
                    {artisan.data.attributes.specialization}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-6">
            <Button
              as="a"
              href={formatWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-rose-900 hover:bg-rose-800 text-white font-light px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 