import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Story & Team',
  description: 'Learn about Sobha Real Estate\'s commitment to quality, innovation, and sustainability in premium real estate development.',
  openGraph: {
    title: 'About Sobha Real Estate - Excellence in Real Estate',
    description: 'Discover our journey of creating premium living spaces and our commitment to quality and innovation.',
    images: [
      {
        url: '/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'About Sobha Real Estate',
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 