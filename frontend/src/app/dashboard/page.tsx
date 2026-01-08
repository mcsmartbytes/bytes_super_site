"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </>
    );
  }

  const products = [
    {
      title: "Expenses Made Easy",
      description: "AI receipt scanning, GPS mileage tracking, IRS tax categories",
      icon: "fas fa-receipt",
      href: "https://expenses-made-easy-opal.vercel.app",
      color: "from-emerald-500 to-teal-600",
      badge: "AI-Powered",
    },
    {
      title: "Books Made Easy",
      description: "Invoicing, A/R, A/P, and financial reports",
      icon: "fas fa-book",
      href: "https://books-made-easy-app.vercel.app",
      color: "from-blue-500 to-indigo-600",
      badge: "Most Popular",
    },
    {
      title: "SiteSense",
      description: "Job costing, time tracking, estimate vs actual",
      icon: "fas fa-hard-hat",
      href: "https://sitesense-lilac.vercel.app",
      color: "from-orange-500 to-red-600",
      badge: "For Contractors",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.user_metadata?.full_name || 'User'}!
                </h1>
                <p className="text-blue-100">
                  Access your Made Easy suite of business tools
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Account Status</div>
              <div className="text-2xl font-bold text-emerald-600">Active</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Plan</div>
              <div className="text-2xl font-bold text-blue-700">Free Tier</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="text-lg font-medium text-gray-900 truncate">{user?.email}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Support</div>
              <a href="mailto:info@mcsmartbytes.com" className="text-lg font-medium text-blue-700 hover:underline">
                Get Help
              </a>
            </div>
          </div>

          {/* Products Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Business Tools</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {products.map((product, idx) => (
              <a
                key={idx}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${product.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                      <i className={product.icon}></i>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{product.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center text-blue-700 font-semibold group-hover:text-blue-800">
                    Open App <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Done For You Services */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3 className="text-2xl font-bold">Need Help Managing Your Books?</h3>
                </div>
                <p className="text-blue-100 max-w-2xl">
                  Our Done For You services let you focus on your trade while we handle your bookkeeping,
                  expense management, and financial reporting.
                </p>
              </div>
              <Link
                href="/services"
                className="shrink-0 px-8 py-4 bg-white text-blue-800 rounded-xl font-bold hover:bg-blue-50 transition-all"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl">
                  <i className="fas fa-crown"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Upgrade to Pro</h4>
                  <p className="text-gray-600 text-sm">Unlock unlimited features for just $29/month</p>
                </div>
              </div>
              <Link
                href="/#pricing"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
