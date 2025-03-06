import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Services() {
  const services = [
    {
      title: "Interior Painting",
      description: "Transform your indoor spaces with our premium interior painting service",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80",
      price: "From $299",
      features: ["Premium paint selection", "Color consultation", "Surface preparation", "Multiple coat application"]
    },
    {
      title: "Exterior Painting",
      description: "Protect and beautify your property's exterior with durable paint solutions",
      image: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&auto=format&fit=crop&q=80",
      price: "From $499",
      features: ["Weather-resistant paints", "Surface cleaning", "Repair and preparation", "Professional application"]
    },
    {
      title: "Color Consultation",
      description: "Get expert advice to find the perfect palette for your space",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop&q=80",
      price: "From $99",
      features: ["Personalized color schemes", "Trend analysis", "Lighting considerations", "Sample testing"]
    },
    {
      title: "Commercial Painting",
      description: "Comprehensive painting solutions for businesses and commercial properties",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&auto=format&fit=crop&q=80",
      price: "Custom Quote",
      features: ["Project planning", "Flexible scheduling", "Safety compliance", "Quality assurance"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-0">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center">
          <div className="absolute inset-0 grid grid-cols-3 gap-1">
            <div className="relative h-full">
              <Image
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&auto=format&fit=crop&q=80"
                alt="Interior Painting"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-full">
              <Image
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&auto=format&fit=crop&q=80"
                alt="Exterior Painting"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-full">
              <Image
                src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1600&auto=format&fit=crop&q=80"
                alt="Commercial Painting"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          <div className="relative container mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-block bg-gradient-to-r from-rose-400 to-purple-500 px-4 py-1 rounded-full text-white text-sm font-medium mb-4 animate-fade-in">
                Professional Painting Services
              </div>
              <h1 className="text-6xl font-bold mb-6 text-white animate-fade-in leading-tight">
                Transform Your Space with Expert Craftsmanship
              </h1>
              <p className="text-xl mb-8 text-white/90 animate-fade-in">
                From residential interiors to commercial exteriors, our professional team delivers excellence in every brushstroke. Experience the perfect blend of quality, expertise, and attention to detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-rose-400 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-in"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="#services"
                  className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-in"
                >
                  View Services
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-white/80">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">2500+</div>
                  <div className="text-white/80">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-white/80">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Professional painting solutions for every project
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                        {service.price}
                      </span>
                      <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Get Quote →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&auto=format&fit=crop&q=80"
                  alt="Professional Painters"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                  Why Choose Shine Paints?
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Expert Team",
                      description: "Our professional painters bring years of experience and expertise to every project.",
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    },
                    {
                      title: "Premium Materials",
                      description: "We use only the highest quality paints and materials for lasting results.",
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )
                    },
                    {
                      title: "Timely Completion",
                      description: "We value your time and ensure projects are completed on schedule.",
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      title: "Satisfaction Guaranteed",
                      description: "Your satisfaction is our priority, backed by our quality guarantee.",
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      )
                    }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-rose-400/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-purple-500">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-rose-400 to-purple-500">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white animate-fade-in">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto animate-fade-in">
              Contact us today for a free consultation and quote. Let our experts help you bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-in border-2 border-white hover:border-rose-400"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 