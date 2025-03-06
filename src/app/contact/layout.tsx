import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact Sobha Real Estate for expert consultation about our premium properties and real estate solutions.',
  openGraph: {
    title: 'Contact Sobha Real Estate - We\'re Here to Help',
    description: 'Get in touch with our real estate experts for personalized assistance and professional guidance.',
    images: [
      {
        url: '/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Sobha Real Estate',
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 