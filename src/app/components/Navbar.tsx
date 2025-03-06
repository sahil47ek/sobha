'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useAppSelector } from '@/store/store';

const SocialIcons = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center space-x-4 ${className}`}>
    <a
      href="mailto:contact@sobha.com"
      className="transition-all duration-300"
      aria-label="Email"
    >
      <EnvelopeIcon className="h-7 w-6" />
    </a>
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all duration-300"
      aria-label="WhatsApp"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
    <a
      href="tel:+1234567890"
      className="transition-all duration-300"
      aria-label="Phone"
    >
      <PhoneIcon className="h-5 w-5" />
    </a>
    <a
      href="https://linkedin.com/company/sobha"
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all duration-300"
      aria-label="LinkedIn"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const projects = useAppSelector((state) => state.projects.projects);
  
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
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

  const menuItems = [
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Projects',
      href: '/projects',
      submenu: projects.map(project => ({
        title: project.title,
        href: `/projects/${project.id}`
      }))
    },
    {
      title: 'Contact',
      href: '/contact'
    }
  ];

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Fixed Navbar with Centered Logo */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/10 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Menu Button - Left */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="hover:text-primary transition-all duration-300 flex items-center p-2 -ml-2 text-text-primary"
              aria-label="Menu"
            >
              <Bars3Icon className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            {/* Centered Logo */}
            <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/sobha-logo.png"
                alt="Sobha Real Estate"
                width={140}
                height={50}
                className="w-24 sm:w-32 md:w-40 h-auto transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Contact Icons - Right */}
            <SocialIcons className="text-text-primary hidden sm:flex" />
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-text-light hover:text-text-primary transition-colors p-2"
          aria-label="Close menu"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-primary/10">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Image
              src="/images/sobha-logo.png"
              alt="Sobha Real Estate"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="py-4 sm:py-6">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2 sm:mb-4">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className="w-full px-4 sm:px-6 py-2 flex items-center justify-between text-text-primary hover:text-primary transition-colors"
                  >
                    <span className="text-base sm:text-lg font-medium">{item.title}</span>
                    <ChevronDownIcon 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeDropdown === item.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeDropdown === item.title && (
                    <div className="bg-secondary py-3 sm:py-4">
                      <div className="px-6 sm:px-8">
                        <Link
                          href={item.href}
                          className="block text-primary font-medium hover:text-primary-dark transition-colors text-sm sm:text-base py-2 mb-4 border-b border-primary/10"
                          onClick={() => setSidebarOpen(false)}
                        >
                          View All Projects
                        </Link>
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block text-text-light hover:text-text-primary transition-colors text-sm py-2"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block px-4 sm:px-6 py-2 text-base sm:text-lg font-medium text-text-primary hover:text-primary transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-4 px-4 sm:px-6 py-6 sm:py-8 bg-secondary/50">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-text-secondary">
              <MapPinIcon className="h-5 w-5 flex-shrink-0 mt-1" />
              <p className="text-sm sm:text-base">
                123 Sobha Avenue, Business District<br />
                Bangalore, Karnataka 560001
              </p>
            </div>
            <div className="flex items-center space-x-3 text-text-secondary">
              <ClockIcon className="h-5 w-5" />
              <p className="text-sm sm:text-base">Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Social Icons in Sidebar */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-text-primary mb-3">Connect With Us</h4>
            <SocialIcons className="text-text-primary sm:hidden" />
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-4 sm:px-6 py-4 bg-primary/5 text-center">
          <p className="text-xs sm:text-sm text-text-light">
            Experience luxury living with Sobha
          </p>
        </div>
      </div>
    </>
  );
} 