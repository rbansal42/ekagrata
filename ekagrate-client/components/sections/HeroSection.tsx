"use client";

import { Button } from "@heroui/button";

export function HeroSection() {
  const openWhatsApp = () => {
    window.open("https://wa.me/your-number-here", "_blank");
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent opacity-70" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
          Empowering Artisans,{" "}
          <span className="font-normal bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 bg-clip-text text-transparent">
            Preserving Heritage
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed tracking-wide">
          Connect with skilled local artisans and discover unique handcrafted treasures. 
          Every purchase supports traditional craftsmanship and sustainable livelihoods.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Button 
            size="lg" 
            className="bg-rose-900 hover:bg-rose-800 text-white font-light px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onPress={openWhatsApp}
          >
            Shop Artisan Products
          </Button>
          <Button 
            size="lg" 
            variant="bordered"
            className="font-light border-2 border-rose-900 text-rose-900 hover:bg-rose-50/50 px-10 py-7 text-lg rounded-xl transition-all duration-300"
            href="#products"
            as="a"
          >
            Explore Collection
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-12 mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">100% Authentic Handcrafted</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">Direct Artisan Support</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-rose-900">✦</span>
            <span className="font-light tracking-wide">Sustainable Practices</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-rose-900 opacity-50">↓</span>
      </div>
    </section>
  );
} 