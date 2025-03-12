'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const teamMembers = [
  {
    name: 'Ravi Kumar',
    role: 'CEO & Managing Director',
    description: 'With over 25 years of experience in real estate development and leadership.',
    image: '/images/team/ceo.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Sales',
    image: '/images/team/sales-head.jpg',
    description: 'Expert in luxury real estate sales and client relationships.',
  },
  {
    name: 'Arun Menon',
    role: 'Chief Architect',
    image: '/images/team/architect.jpg',
    description: 'Award-winning architect with expertise in sustainable design.',
  },
  {
    name: 'Arun Menon',
    role: 'Chief Architect',
    image: '/images/team/architect.jpg',
    description: 'Award-winning architect with expertise in sustainable design.',
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/about-banner.webp"
            alt="Luxury Real Estate Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center text-white mt-28">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Sobha Real Estate
            </h1>
            <p className="text-xl text-white/90">
              Building dreams, delivering excellence, and creating lasting value since 1995
            </p>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="pt-8 sm:pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "25+", label: "Years of Excellence" },
                { number: "500+", label: "Projects Completed" },
                { number: "10K+", label: "Happy Families" },
                { number: "12", label: "Cities Present" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-text-light text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="pt-6 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
            {/* Mission */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-2 sm:mb-6">
                <div className="h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">Our Mission</h2>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                To transform the real estate landscape by delivering exceptional quality homes and commercial spaces that exceed expectations, while maintaining the highest standards of transparency, integrity, and customer satisfaction.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-text-secondary">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Delivering unmatched quality in construction
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Creating sustainable living environments
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Ensuring customer delight through innovation
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-2 sm:mb-6">
                <div className=" h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">Our Vision</h2>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                To be the most trusted and admired real estate developer, recognized globally for our commitment to quality, innovation, and customer-centricity, while creating sustainable value for all stakeholders.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-text-secondary">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Leading the industry in innovation and sustainability
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Expanding our global footprint
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3"></span>
                  Setting new benchmarks in real estate excellence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8 sm:mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-8">
            {[
              {
                title: "Quality",
                description: "Unwavering commitment to the highest standards in everything we do",
                icon: "🏆"
              },
              {
                title: "Integrity",
                description: "Maintaining transparency and ethical practices in all our dealings",
                icon: "⚖️"
              },
              {
                title: "Innovation",
                description: "Continuously evolving and adopting cutting-edge technologies",
                icon: "💡"
              },
              {
                title: "Customer First",
                description: "Prioritizing customer satisfaction in every decision we make",
                icon: "🤝"
              }
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-xs sm:text-base text-text-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-8 sm:py-20 bg-gray-50">
        <div className="absolute inset-0">
          <Image
            src="/images/about/team-bg.jpg"
            alt="Team Background"
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-sm sm:text-base text-text-light max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering excellence in real estate
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-sm sm:text-base text-text-light">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Matching Homepage Style */}
      <section className="py-4 sm:py-24 bg-gradient-to-br from-[#1a1a1a] to-[#404040]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-sm sm:text-xl mb-6 sm:mb-10 text-white/90 max-w-2xl mx-auto">
              Schedule a consultation with our real estate experts today and take the first step towards your dream home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 