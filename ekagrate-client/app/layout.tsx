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
import Footer from '../components/Footer';

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
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
