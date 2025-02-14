import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ekagrata - Authentic Indian Craftsmanship',
  description: 'Discover and shop authentic handcrafted products directly from skilled Indian artisans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-background text-foreground`}>
        <div className="flex min-h-full flex-col">
          <header className="bg-white border-b">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-gray-900">Ekagrata</span>
                </a>
              </div>
              <div className="flex gap-x-12">
                <a href="/products" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  Products
                </a>
                <a href="/artisans" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  Artisans
                </a>
                <a href="/categories" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  Categories
                </a>
                <a href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  About
                </a>
              </div>
              <div className="flex flex-1 justify-end">
                <a href="/contact" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                  Contact Us
                </a>
              </div>
            </nav>
          </header>

          {children}

          <footer className="bg-white border-t">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
              <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-xs leading-5 text-gray-500">
                  &copy; {new Date().getFullYear()} Ekagrata. All rights reserved.
                </p>
              </div>
              <div className="flex justify-center space-x-6 md:order-2">
                <a href="/privacy" className="text-gray-500 hover:text-gray-600">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-gray-600">
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
