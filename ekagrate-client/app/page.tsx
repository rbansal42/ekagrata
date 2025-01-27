import {
  HeroSection,
  ProductsSection,
  ArtisansSection,
} from "@/components/sections";

export const revalidate = 60; // Revalidate content every minute

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <ArtisansSection />
    </main>
  );
}
