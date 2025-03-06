'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const slides = [
  {
    image: '/properties/slide1.jpg',
    title: 'Luxury Living Redefined',
    description: 'Experience unparalleled luxury in prime locations'
  },
  {
    image: '/properties/slide2.jpg',
    title: 'Premium Residences',
    description: 'Discover homes that match your lifestyle'
  },
  {
    image: '/properties/slide3.jpg',
    title: 'World-Class Amenities',
    description: 'Live life at its finest with premium facilities'
  }
];

export default function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent py-12">
                <div className="container mx-auto px-6">
                  <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-transform duration-500 ease-out">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-8 w-8" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 