'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownMenus = {
    products: [
      {
        name: 'Interior Paints',
        href: '/products/interior',
        description: 'Premium wall paints for every room',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Exterior Paints',
        href: '/products/exterior',
        description: 'Weather-resistant outdoor finishes',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Specialty Finishes',
        href: '/products/specialty',
        description: 'Unique textures and effects',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V17a4 4 0 01-4 4H7z" />
          </svg>
        )
      },
      {
        name: 'Color Collections',
        href: '/products/collections',
        description: 'Curated palettes for any style',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V17a4 4 0 01-4 4H7z" />
          </svg>
        )
      }
    ],
    services: [
      {
        name: 'Interior Painting',
        href: '/services/interior',
        description: 'Professional indoor painting services',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Exterior Painting',
        href: '/services/exterior',
        description: 'Complete outdoor painting solutions',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Color Consultation',
        href: '/services/consultation',
        description: 'Expert color selection advice',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V17a4 4 0 01-4 4H7z" />
          </svg>
        )
      },
      {
        name: 'Commercial Services',
        href: '/services/commercial',
        description: 'Large-scale project solutions',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      }
    ],
    tools: [
      {
        name: 'Paint Calculator',
        href: '/tools/calculator',
        description: 'Estimate paint quantity and cost',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v4m-3-4v4m-6-4v4m-3-4v4m-6.5-7h21M5 4h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Color Visualizer',
        href: '/tools/visualizer',
        description: 'Preview colors in your space',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        featured: true
      },
      {
        name: 'Project Planner',
        href: '/tools/planner',
        description: 'Organize your painting project',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
      },
      {
        name: 'Professional Tools',
        href: '/tools/professional',
        description: 'High-quality painting equipment',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        )
      }
    ]
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              scrolled 
                ? 'bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent' 
                : 'text-white'
            }`}>
              Shine Paints
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
            {/* Home Link */}
            <Link
              href="/"
              className={`${
                scrolled ? 'text-gray-900' : 'text-white'
              } hover:opacity-80 transition-opacity text-base font-medium`}
            >
              HOME
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className={`${
                scrolled ? 'text-gray-900' : 'text-white'
              } hover:opacity-80 transition-opacity text-base font-medium`}
            >
              ABOUT
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className={`flex items-center space-x-1 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } hover:opacity-80 transition-opacity text-base font-medium`}
              >
                <span>PRODUCTS</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'products' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Products Dropdown Menu */}
              {activeDropdown === 'products' && (
                <div className="absolute left-0 right-0 mt-7">
                  <div className={`${
                    scrolled 
                      ? 'bg-white/100 backdrop-blur-md' 
                      : 'bg-black/90 backdrop-blur-sm'
                  } border-t border-gray-100/20 w-screen relative left-[142%] -translate-x-1/2`}>
                    <div className="container mx-auto px-6">
                      <div className="grid grid-cols-2 gap-8 py-8 max-w-4xl">
                        {dropdownMenus.products.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-start space-x-4 p-4 rounded-xl ${
                              scrolled 
                                ? 'hover:bg-black/5' 
                                : 'hover:bg-white/10'
                            } transition-colors w-full group cursor-pointer`}
                          >
                            <div className="flex items-start space-x-4 w-full">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  scrolled
                                    ? 'bg-gradient-to-r from-rose-400/10 to-purple-500/10'
                                    : 'bg-white/10'
                                }`}>
                                  <div className={scrolled 
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500'
                                    : 'text-white'
                                  }>
                                    {item.icon}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className={`font-medium ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                  {item.name}
                                </h3>
                                <p className={`text-sm ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className={`py-4 border-t ${scrolled ? 'border-gray-100' : 'border-white/10'} max-w-4xl`}>
                        <Link
                          href="/products"
                          className={`flex items-center text-sm font-medium ${
                            scrolled 
                              ? 'text-rose-500 hover:text-purple-500' 
                              : 'text-white hover:text-white/80'
                          } transition-colors`}
                        >
                          View all products
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('services')}
                className={`flex items-center space-x-1 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } hover:opacity-80 transition-opacity text-base font-medium`}
              >
                <span>SERVICES</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Dropdown Menu */}
              {activeDropdown === 'services' && (
                <div className="absolute left-0 right-0 mt-7">
                  <div className={`${
                    scrolled 
                      ? 'bg-white/100 backdrop-blur-md' 
                      : 'bg-black/90 backdrop-blur-sm'
                  } border-t border-gray-100/20 w-screen relative left-[14%] -translate-x-1/2`}>
                    <div className="container mx-auto px-6">
                      <div className="grid grid-cols-2 gap-8 py-8 max-w-4xl">
                        {dropdownMenus.services.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-start space-x-4 p-4 rounded-xl ${
                              scrolled 
                                ? 'hover:bg-black/5' 
                                : 'hover:bg-white/10'
                            } transition-colors w-full group cursor-pointer`}
                          >
                            <div className="flex items-start space-x-4 w-full">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  scrolled
                                    ? 'bg-gradient-to-r from-rose-400/10 to-purple-500/10'
                                    : 'bg-white/10'
                                }`}>
                                  <div className={scrolled 
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500'
                                    : 'text-white'
                                  }>
                                    {item.icon}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className={`font-medium ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                  {item.name}
                                </h3>
                                <p className={`text-sm ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className={`py-4 border-t ${scrolled ? 'border-gray-100' : 'border-white/10'} max-w-4xl`}>
                        <Link
                          href="/services"
                          className={`flex items-center text-sm font-medium ${
                            scrolled 
                              ? 'text-rose-500 hover:text-purple-500' 
                              : 'text-white hover:text-white/80'
                          } transition-colors`}
                        >
                          View all services
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('tools')}
                className={`flex items-center space-x-1 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } hover:opacity-80 transition-opacity text-base font-medium`}
              >
                <span>TOOLS</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'tools' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Tools Dropdown Menu */}
              {activeDropdown === 'tools' && (
                <div className="absolute left-0 right-0 mt-7">
                  <div className={`${
                    scrolled 
                      ? 'bg-white/100 backdrop-blur-md' 
                      : 'bg-black/90 backdrop-blur-sm'
                  } border-t border-gray-100/20 w-screen relative left-[-160%] -translate-x-1/2`}>
                    <div className="container mx-auto px-6">
                      <div className="grid grid-cols-2 gap-8 py-8 max-w-4xl">
                        {dropdownMenus.tools.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-start space-x-4 p-4 rounded-xl ${
                              scrolled 
                                ? 'hover:bg-black/5' 
                                : 'hover:bg-white/10'
                            } transition-colors w-full group cursor-pointer`}
                          >
                            <div className="flex items-start space-x-4 w-full">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  scrolled
                                    ? 'bg-gradient-to-r from-rose-400/10 to-purple-500/10'
                                    : 'bg-white/10'
                                }`}>
                                  <div className={scrolled 
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500'
                                    : 'text-white'
                                  }>
                                    {item.icon}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className={`font-medium ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                  {item.name}
                                </h3>
                                <p className={`text-sm ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className={`py-4 border-t ${scrolled ? 'border-gray-100' : 'border-white/10'} max-w-4xl`}>
                        <Link
                          href="/tools"
                          className={`flex items-center text-sm font-medium ${
                            scrolled 
                              ? 'text-rose-500 hover:text-purple-500' 
                              : 'text-white hover:text-white/80'
                          } transition-colors`}
                        >
                          View all tools
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us Button */}
            <Link
              href="/contact"
              className={`px-6 py-2 rounded-full ${
                scrolled
                  ? 'bg-gradient-to-r from-rose-400 to-purple-500 text-white'
                  : 'bg-white text-gray-900'
              } hover:shadow-lg transition-all duration-300`}
            >
              CONTACT US
            </Link>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com/shinepaint"
              target="_blank"
              rel="noopener noreferrer"
              className={scrolled ? 'text-gray-900' : 'text-white'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:contact@shinepaint.com"
              className={scrolled ? 'text-gray-900' : 'text-white'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/shinepaint"
              target="_blank"
              rel="noopener noreferrer"
              className={scrolled ? 'text-gray-900' : 'text-white'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 