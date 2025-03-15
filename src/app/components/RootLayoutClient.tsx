'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { Providers } from '@/components/Providers';
import WhatsAppChat from '@/components/WhatsAppChat';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <Providers>
      {children}
      {!isAdminRoute && <Footer />}
      <WhatsAppChat />
    </Providers>
  );
} 
