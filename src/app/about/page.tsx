import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Story & Team',
  description: 'Learn about Shine Paints\' commitment to quality, innovation, and sustainability. Meet our expert team of color consultants and paint specialists.',
  openGraph: {
    title: 'About Shine Paints - Our Story & Expert Team',
    description: 'Discover the passionate team behind Shine Paints and our commitment to transforming spaces with premium quality paints.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        width: 1200,
        height: 630,
        alt: 'Shine Paints Team',
      },
    ],
  },
}

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Color Expert',
    description: 'With over 15 years of experience in color theory and consultation, Sarah leads our color advisory services.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
  },
  {
    name: 'Michael Chen',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    description: 'Expert in paint formulation and quality control.',
  },
  {
    name: 'Emma Williams',
    role: 'Design Consultant',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    description: 'Specializes in interior and exterior color schemes.',
  },
];

const values = [
  {
    title: 'Quality',
    description: 'We never compromise on the quality of our products and services.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Constantly developing new products and techniques.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    description: 'Committed to environmentally friendly practices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Add JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Shine Paints',
    description: 'Premium paint solutions for interior and exterior applications',
    foundingDate: '2010',
    employees: teamMembers.map(member => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.description
    })),
    sameAs: [
      'https://facebook.com/shinepaint',
      'https://twitter.com/shinepaint',
      'https://linkedin.com/company/shinepaint'
    ]
  }
}

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white ">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[100vh] pt-10">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
              alt="Our Team"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Our Story
                </h1>
                <p className="text-xl text-gray-100">
                  We're passionate about bringing color and life to your spaces through premium quality paints and expert consultation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
              alt="Paint Workshop"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/90"></div>
          </div>
          <div className="container mx-auto px-6 relative">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
              alt="Team Working"
              fill
              className="object-cover opacity-5"
            />
          </div>
          <div className="container mx-auto px-6 relative">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=2000&q=80"
              alt="Paint Expert"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/90 to-rose-500/90 mix-blend-multiply"></div>
          </div>
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Space?</h2>
              <p className="text-xl mb-12 text-white/90">
                Our team of experts is here to help you bring your vision to life.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-opacity"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 