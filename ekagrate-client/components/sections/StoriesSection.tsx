"use client";

import Image from "next/image";
import { Story } from "@/types";
import { getStrapiMedia, getStories } from "@/lib/strapi";
import { Button } from "@heroui/button";
import Link from "next/link";

interface StoryCardProps {
  story: Story;
}

function StoryCard({ story }: StoryCardProps) {
  const { title, preview, image, artisan } = story.attributes;
  const imageUrl = getStrapiMedia(image.data.attributes.url);

  return (
    <div className="group">
      <Link href={`/stories/${story.id}`} className="block">
        <div className="relative mb-6">
          <div className="aspect-video relative rounded-xl overflow-hidden bg-rose-50">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="font-light text-xl tracking-wide group-hover:text-rose-900 transition-colors duration-300 mb-3">{title}</h3>
        <p className="text-gray-600 font-light leading-relaxed line-clamp-2 tracking-wide mb-4">{preview}</p>
        <p className="text-sm text-rose-900 font-light tracking-wide">
          By {artisan.data.attributes.name}
        </p>
      </Link>
      <Link
        href={`/stories/${story.id}`}
        className="inline-block mt-6 text-rose-900 font-light tracking-wide hover:text-rose-800 transition-colors duration-300"
      >
        Read More →
      </Link>
    </div>
  );
}

function StoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-rose-100/50 rounded-xl mb-6" />
      <div className="h-7 bg-rose-100/50 rounded-lg mb-3 w-3/4" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-2" />
      <div className="h-4 bg-rose-100/50 rounded-lg mb-4 w-2/3" />
      <div className="h-5 bg-rose-100/50 rounded-lg w-1/3" />
    </div>
  );
}

async function StoriesList() {
  const stories = await getStories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}

export function StoriesSection() {
  return (
    <section id="stories" className="container max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4 tracking-wide">Artisan Stories</h2>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
          Explore the rich traditions and personal journeys of our artisans through their compelling stories
        </p>
      </div>
      <StoriesList />
    </section>
  );
} 