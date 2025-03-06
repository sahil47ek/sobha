'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '../components/AdminSidebar';
import Cookies from 'js-cookie';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication on client side
    const isAuthenticated = Cookies.get('adminAuth') === 'true';
    const isLoginPage = pathname === '/admin/login';

    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    } else if (isAuthenticated && isLoginPage) {
      router.push('/admin');
    }
  }, [pathname]);

  // If it's the login page, render without the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  Cookies.remove('adminAuth', { path: '/' });
                  router.refresh();
                  router.push('/admin/login');
                }}
                className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 