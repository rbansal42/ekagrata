import {
  HeroSection,
  ProductsSection,
  ArtisansSection,
  StoriesSection,
} from "@/components/sections";

export const revalidate = 60; // Revalidate content every minute

export default async function Home() {
  return (
    <div className="flex flex-col gap-20 py-8 md:py-10">
      <HeroSection />
      {/* @ts-expect-error Async Server Component */}
      <ProductsSection />
      {/* @ts-expect-error Async Server Component */}
      <ArtisansSection />
      {/* @ts-expect-error Async Server Component */}
      <StoriesSection />
    </div>
  );
}
