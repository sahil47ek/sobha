import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Footer from './components/Footer';
import { Providers } from '@/components/Providers';
import WhatsAppChat from '@/components/WhatsAppChat';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    default: 'Sobha Real Estate | Premium Properties',
    template: '%s | Sobha Real Estate'
  },
  description: 'Discover exclusive properties and premium real estate solutions. Find your dream home with our expert real estate consultants.',
  keywords: ['real estate', 'luxury homes', 'property', 'apartments', 'villas', 'real estate consultation', 'premium properties'],
  authors: [{ name: 'Sobha Real Estate' }],
  creator: 'Sobha Real Estate',
  publisher: 'Sobha Real Estate',
  openGraph: {
    title: 'Premium Properties - Sobha Real Estate',
    description: 'Find your dream home with our exclusive collection of luxury properties.',
    images: [
      {
        url: 'https://placehold.co/1200x630/8B4513/white/png?text=Sobha+Real+Estate',
        width: 1200,
        height: 630,
        alt: 'Sobha Real Estate Premium Properties',
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Sobha Real Estate',
              description: 'Premium real estate solutions and luxury properties',
              url: 'https://sobharealestate.com',
              logo: 'https://placehold.co/512x512/8B4513/white/png?text=Sobha+Real+Estate+Logo',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-234-567-8900',
                contactType: 'sales',
                areaServed: 'US',
                availableLanguage: ['English']
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
          <Footer />
          <WhatsAppChat />
        </Providers>
      </body>
    </html>
  );
}
