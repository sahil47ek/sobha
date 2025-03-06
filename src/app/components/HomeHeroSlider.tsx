'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    title: 'Transform Your Space',
    subtitle: 'Premium Quality Paints for Every Surface',
    cta: 'Shop Now',
    ctaLink: '/products',
    gradient: 'from-rose-400 to-purple-500',
    image: 'https://img.freepik.com/free-photo/painter-painting-wall-with-roller_23-2148188261.jpg'
  },
  {
    title: 'Expert Color Consultation',
    subtitle: 'Find the Perfect Shade for Your Project',
    cta: 'Book Now',
    ctaLink: '/services/consultation',
    gradient: 'from-blue-400 to-emerald-500',
    image: 'https://img.freepik.com/free-photo/color-palette-guide-close-up_23-2148188273.jpg'
  },
  {
    title: 'Professional Tools',
    subtitle: 'Everything You Need for a Perfect Finish',
    cta: 'View Tools',
    ctaLink: '/tools',
    gradient: 'from-amber-400 to-orange-500',
    image: 'https://img.freepik.com/free-photo/paint-brushes-collection-arrangement_23-2148188265.jpg'
  }
];

export default function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 700); // Match this with the exit animation duration
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Background Image and Gradient */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-75`} />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={`transition-all duration-700 absolute w-full ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : isAnimating
                  ? 'opacity-0 -translate-y-8'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionTimingFunction: isAnimating ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaLink}
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {slide.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsAnimating(false);
                }, 700);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-100 w-6'
                  : 'bg-white/50 scale-75 hover:scale-90 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square">
        <div className="w-full h-full bg-white/10 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute left-1/4 bottom-1/4 w-1/4 aspect-square">
        <div className="w-full h-full bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
} 