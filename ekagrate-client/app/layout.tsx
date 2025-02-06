import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import {
  Work_Sans,
  Playfair_Display,
  Cormorant_Garamond,
  Cinzel,
  Marcellus,
  Tenor_Sans,
} from "next/font/google";
import clsx from "clsx";

import { Providers } from "./providers";

import Navbar from "@/components/navbar";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const marcellus = Marcellus({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus",
});

const tenor = Tenor_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tenor",
});

export const metadata: Metadata = {
  title: "Ekagrata - Artisan Products Storefront",
  description:
    "Discover unique artisan products at Ekagrata - A Rotaract project promoting local artisans and their craftsmanship.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={clsx(
        workSans.variable,
        playfair.variable,
        cormorant.variable,
        cinzel.variable,
        marcellus.variable,
        tenor.variable,
      )}
      lang="en"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          "bg-gradient-to-br from-white via-rose-50/30 to-rose-100/20",
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
            forcedTheme: "light",
          }}
        >
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <footer className="w-full flex flex-col items-center justify-center py-8 gap-2 border-t border-rose-100/20 backdrop-blur-sm">
              <p className="text-gray-600 font-light tracking-wide text-sm">
                An Initiative by{" "}
                <span className="text-rose-900">
                  Rotaract Club of Ingenious Minds
                </span>
              </p>
              <p className="text-gray-600 font-light tracking-wide text-sm">
                © 2024 Ekagrata. All rights reserved.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
