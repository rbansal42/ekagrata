"use client";

import { Button } from "@heroui/button";
import { getGlobalSettings } from "@/lib/strapi";

export async function HeroSection() {
  const { data: settings } = await getGlobalSettings();
  const whatsappLink = `https://wa.me/${settings.attributes.whatsapp_number}`;

  // Replace any unsplash URLs with local placeholders or Strapi media
  const backgroundImage = '/images/hero-background.jpg'; // Add this to public/images/

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent opacity-70" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
          Empowering Local{" "}
          <span className="font-normal bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 bg-clip-text text-transparent">
            Artisans
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed tracking-wide">
          Connect directly with skilled local artisans and discover their unique
          handcrafted creations. Every purchase creates sustainable
          opportunities and supports their livelihoods.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Button
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose-900 hover:bg-rose-800 text-white font-light px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            Shop Artisan Products
          </Button>
          <Button
            as="a"
            className="font-light border-2 border-rose-900 text-rose-900 hover:bg-rose-50/50 px-10 py-7 text-lg rounded-xl transition-all duration-300"
            href="#artisans"
            size="lg"
            variant="bordered"
          >
            Meet our Artisans
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-12 mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">
              100% Authentic Handcrafted
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">
              Direct Artisan Support
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">
              Sustainable Practices
            </span>
          </div>
        </div>

        {/* Initiative Text */}
        <div className="text-sm text-gray-600 font-light tracking-wide mt-8">
          An Initiative by{" "}
          <span className="text-rose-900">
            Rotaract Club of Ingenious Minds
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-rose-900 opacity-50">↓</span>
      </div>
    </section>
  );
}
