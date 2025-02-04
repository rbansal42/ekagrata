"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getArtisans, Artisan } from "@/lib/strapi";
import { ArtisansSection } from "@/components/sections/ArtisansSection";

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState<Set<string>>(new Set());
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      try {
        const response = await getArtisans();
        const artisansData = response?.data || [];
        setArtisans(artisansData);
        
        // Extract unique specializations
        const uniqueSpecializations = new Set(
          artisansData.map((artisan) => artisan.attributes.specialization)
        );
        setSpecializations(uniqueSpecializations);
      } catch (error) {
        setArtisans([]);
        setSpecializations(new Set());
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ArtisansSection
        artisans={artisans}
        loading={loading}
        specializations={Array.from(specializations)}
      />
    </div>
  );
}
