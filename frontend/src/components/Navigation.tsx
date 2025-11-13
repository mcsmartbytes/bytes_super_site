"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link
              href="/#services"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="/#freetool"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Free Tool
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/admin/login"
              className="text-gray-700 hover:text-[#D2691E] transition-colors font-medium"
            >
              Client Platform
            </Link>
            <Link
              href="/#contact"
              className="bg-[#D2691E] text-white px-6 py-2 rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#2563eb]"
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
            <Link
              href="/#services"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#testimonials"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </Link>
            <Link
              href="/tools"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/book"
              className="block mx-3 my-2 text-center bg-[#2563eb] text-white px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
