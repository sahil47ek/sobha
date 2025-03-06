'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  SwatchIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: SwatchIcon },
  { name: 'Projects', href: '/admin/projects', icon: UserGroupIcon },
  { name: 'Leads', href: '/admin/leads', icon: ShoppingBagIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <nav className="mt-5 px-2">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <item.icon
                  className={`icon`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 