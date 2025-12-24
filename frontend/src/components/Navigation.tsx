"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="MC Smart Bytes Logo"
                width={200}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onBlur={() => setTimeout(() => setIsProductsOpen(false), 150)}
                className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium flex items-center gap-1"
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a
                    href="https://expenses-made-easy-opal.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="font-medium text-[#2c3e50]">Expenses Made Easy</div>
                    <div className="text-sm text-gray-500">AI receipt scanning & mileage</div>
                  </a>
                  <a
                    href="https://books-made-easy-app.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="font-medium text-[#2c3e50]">Books Made Easy</div>
                    <div className="text-sm text-gray-500">Full accounting suite</div>
                  </a>
                  <a
                    href="https://sitesense-lilac.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="font-medium text-[#2c3e50]">SiteSense</div>
                    <div className="text-sm text-gray-500">Job costing & time tracking</div>
                  </a>
                </div>
              )}
            </div>

            <Link
              href="/#pricing"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Done For You
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              About
            </Link>
            <a
              href="https://expenses-made-easy-opal.vercel.app/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#20B2AA] to-[#3CB371] text-white px-6 py-2 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#D2691E]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Products
            </div>
            <a
              href="https://expenses-made-easy-opal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md pl-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Expenses Made Easy
            </a>
            <a
              href="https://books-made-easy-app.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md pl-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Books Made Easy
            </a>
            <a
              href="https://sitesense-lilac.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md pl-6"
              onClick={() => setIsMenuOpen(false)}
            >
              SiteSense
            </a>
            <div className="border-t border-gray-100 my-2"></div>
            <Link
              href="/#pricing"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Done For You
            </Link>
            <Link
              href="/#about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <a
              href="https://expenses-made-easy-opal.vercel.app/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-3 my-2 text-center bg-gradient-to-r from-[#20B2AA] to-[#3CB371] text-white px-4 py-2 rounded-xl hover:shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
