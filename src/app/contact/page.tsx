import Navbar from '../components/Navbar';
import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact Shine Paints for expert color consultation, paint recommendations, or any questions about our premium paint solutions.',
  openGraph: {
    title: 'Contact Shine Paints - We\'re Here to Help',
    description: 'Get in touch with our paint experts for personalized assistance and professional recommendations.',
    images: [
      {
        url: '/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Shine Paints',
      },
    ],
  },
}

// Add JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Shine Paints',
    description: 'Premium paint solutions provider',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Paint Street',
      addressLocality: 'Color City',
      addressRegion: 'ST',
      postalCode: '12345',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'contact@shinepaint.com',
      availableLanguage: ['English']
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ]
  }
}

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-r from-rose-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Let's Create Together
              </h1>
              <p className="text-xl text-gray-600">
                Have questions about our products or need expert color advice?
                We're here to help bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </>
  );
} 