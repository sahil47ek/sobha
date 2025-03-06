import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import type { Metadata } from 'next'
import BestSellers from './components/BestSellers';
import HomeHeroSlider from './components/HomeHeroSlider';

export const metadata: Metadata = {
  title: 'Premium Paint Solutions for Your Home & Business',
  description: 'Discover our premium quality paints, expert color consultation services, and innovative paint solutions for interior and exterior applications.',
  openGraph: {
    title: 'Premium Paint Solutions - Shine Paints',
    description: 'Transform your space with our premium quality paints and expert color consultation services.',
    images: [
      {
        url: 'https://placehold.co/1200x630/rose/white/png?text=Shine+Paints',
        width: 1200,
        height: 630,
        alt: 'Shine Paints Premium Solutions',
      },
    ],
  },
};

// Add JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shine Paints',
  description: 'Premium paint solutions for interior and exterior applications',
  url: 'https://shinepaint.com',
  logo: 'https://placehold.co/512x512/rose/white/png?text=Shine+Paints+Logo',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-234-567-8900',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English']
  },
  offers: {
    '@type': 'AggregateOffer',
    itemOffered: [
      {
        '@type': 'Service',
        name: 'Interior Painting',
        description: 'Premium interior paint solutions'
      },
      {
        '@type': 'Service',
        name: 'Exterior Painting',
        description: 'Durable exterior paint solutions'
      },
      {
        '@type': 'Service',
        name: 'Color Consultation',
        description: 'Expert color advisory services'
      }
    ]
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section with Slider */}
        <HomeHeroSlider />

        {/* Trending Colors Section */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-b from-rose-100 to-purple-100"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80"></div>
          </div>
          <div className="relative container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500 animate-fade-in">
              Trending Colors of 2024
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in">
              Discover this year's most inspiring color palette, carefully curated by our color experts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Desert Rose", color: "bg-[#E8B4B8]" },
                { name: "Ocean Depth", color: "bg-[#1B4965]" },
                { name: "Sage Harmony", color: "bg-[#9CAF88]" },
                { name: "Golden Hour", color: "bg-[#F2C94C]" },
              ].map((item, index) => (
                <div 
                  key={item.name} 
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`${item.color} h-64 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}></div>
                  <p className="mt-4 text-lg font-medium text-center text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-purple-500 transition-colors">{item.name}</p>
                </div>
              ))}
            </div>
        </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-900 animate-fade-in">Featured Projects</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in">
              Get inspired by our latest transformations and see how our colors bring spaces to life
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Modern Living Room", 
                  feature: "Sage Harmony", 
                  image: "https://img.freepik.com/free-photo/modern-living-room-with-green-wall_23-2150635372.jpg" 
                },
                { 
                  title: "Serene Bedroom", 
                  feature: "Desert Rose", 
                  image: "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2063.jpg" 
                },
                { 
                  title: "Contemporary Kitchen", 
                  feature: "Ocean Depth", 
                  image: "https://img.freepik.com/free-photo/blue-kitchen-house-modern-interior-design_23-2150670736.jpg" 
                },
              ].map((project, index) => (
                <div 
                  key={project.title}
                  className="relative h-[500px] group overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p>Featuring {project.feature}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Inspiration */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Find Your Perfect Color</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Explore our curated color palettes designed by expert color consultants.
                  From timeless neutrals to bold statements, find the perfect shade for your space.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {["Neutrals", "Pastels", "Bold", "Metallics"].map((category) => (
                    <span
                      key={category}
                      className="px-6 py-2 text-black bg-white rounded-full text-sm shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center text-rose-500 font-semibold hover:text-purple-500 transition-colors group"
                >
                  Browse All Colors
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <div className="space-y-4">
                  <div className="h-48 bg-[#F8E5E5] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"></div>
                  <div className="h-48 bg-[#D4E6F1] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 bg-[#F9E79F] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"></div>
                  <div className="h-48 bg-[#D5F5E3] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <BestSellers />

        {/* Design Services */}
        <section className="py-20 bg-gradient-to-r from-rose-400 to-purple-500">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white animate-fade-in">Need Help with Your Project?</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-white/90 animate-fade-in">
              Our color consultants are here to help you create the perfect space.
              Book a free consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-in"
            >
              Book Consultation
            </Link>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-900 animate-fade-in">
              Get Inspired
            </h2>
            <p className="text-gray-600 text-center mb-12 animate-fade-in">
              Follow us <span className="font-semibold hover:text-rose-500 transition-colors cursor-pointer">@shinepaintsofficial</span> for daily inspiration
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                  title: "Interior Design Inspiration",
                  image: "https://img.freepik.com/free-photo/modern-residential-house-interior-design_23-2150170170.jpg"
                },
                {
                  title: "Color Palette Ideas",
                  image: "https://img.freepik.com/free-photo/paint-roller-with-color-palette-guide_23-2148188273.jpg"
                },
                {
                  title: "Professional Painting",
                  image: "https://img.freepik.com/free-photo/painter-working-with-paint-roller_23-2148188289.jpg"
                },
                {
                  title: "Texture & Finishes",
                  image: "https://img.freepik.com/free-photo/close-up-paint-roller-wooden-surface_23-2148188259.jpg"
                }
              ].map((item) => (
                <div 
                  key={item.title} 
                  className="relative aspect-square group overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
    </>
  );
}
