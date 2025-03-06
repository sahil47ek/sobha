'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setAuthenticated } from '@/store/features/adminSlice';
import Cookies from 'js-cookie';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Leads', href: '/admin/leads', icon: UserGroupIcon },
  { name: 'Projects', href: '/admin/projects', icon: BuildingOfficeIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Check and restore authentication state from cookie
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = Cookies.get('adminAuth') === 'true';
      if (isAuthenticated) {
        dispatch(setAuthenticated(true));
      }
    };

    // Check on mount and set up interval to check periodically
    checkAuth();
  }, [dispatch]);

  const handleLogout = () => {
    // Remove authentication from Redux store
    dispatch(setAuthenticated(false));
    
    // Remove authentication cookie
    Cookies.remove('adminAuth');
    
    // Redirect to login page
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/admin" className="flex items-center space-x-3">
              <Image
                src="/images/sobha-logo.png"
                alt="Sobha Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold text-gray-900">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`md:ml-64 min-h-screen`}>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 