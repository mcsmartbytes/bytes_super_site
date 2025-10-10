"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // Check authentication status
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth error:', error);
          router.push('/admin/login');
          return;
        }

        if (!session) {
          console.log('No session found, redirecting to login');
          router.push('/admin/login');
        } else {
          console.log('Session found for user:', session.user.email);
          setUserEmail(session.user.email || null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session) {
        setUserEmail(session.user.email || null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Show loading state while checking auth
  if (loading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-800 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'fas fa-home' },
    { href: '/admin/inquiries', label: 'Inquiries', icon: 'fas fa-envelope' },
    { href: '/', label: 'View Site', icon: 'fas fa-external-link-alt' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={150} height={40} className="h-10 w-auto" />
              <span className="text-sm font-semibold text-gray-500 border-l pl-4 border-gray-300">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              {userEmail && (
                <span className="text-sm text-gray-600">
                  <i className="fas fa-user-circle mr-2"></i>
                  {userEmail}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 transition"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-800 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-800'
                      }`}
                    >
                      <i className={`${item.icon} w-5 text-center`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
