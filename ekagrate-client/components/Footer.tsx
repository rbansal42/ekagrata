import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-900">About Ingenions Minds</h3>
            <p className="mt-4 text-base text-gray-500">
              Ingenions Minds is dedicated to empowering local artisans and preserving traditional craftsmanship. 
              Through Ekagrata, we connect skilled artisans with appreciative customers, ensuring the continuation 
              of India's rich artistic heritage.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-base text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-base text-gray-500 hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-base text-gray-500">
                Email: contact@ingenionsminds.com
              </li>
              <li className="text-base text-gray-500">
                Phone: +91 XXXXXXXXXX
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Ekagrata by Ingenions Minds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 