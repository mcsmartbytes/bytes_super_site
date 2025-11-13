"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/clients", label: "Clients" },
    { href: "/admin/accounting", label: "Accounting" },
    { href: "/admin/accounting/expense-sync", label: "Expense Sync" },
    { href: "/admin/tasks", label: "Tasks" },
    { href: "/admin/reports", label: "Reports" },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-white">MC Smart Bytes</span>
              <span className="ml-2 text-sm text-orange-400">Admin</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-slate-900 text-orange-400"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              Back to Site
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
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
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "bg-slate-800 text-orange-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium bg-orange-600 text-white hover:bg-orange-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Back to Site
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
