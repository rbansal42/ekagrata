"use client";

import { useSiteConfig } from '../lib/hooks';
import { getImageUrl } from '../lib/utils';
import Image from 'next/image';

export default function HeroSection() {
  const { config, loading } = useSiteConfig();

  if (loading || !config?.data) return null;

  const { siteName, siteDescription, seo } = config.data.attributes;

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(seo.metaImage.data.attributes.url)}
          alt={seo.metaImage.data.attributes.alternativeText || siteName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {siteName}
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          {siteDescription}
        </p>
      </div>
    </div>
  );
} 