'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  specs: string;
  image: string;
}

interface FeaturedPropertiesSliderProps {
  properties: Property[];
}

export default function FeaturedPropertiesSlider({ properties }: FeaturedPropertiesSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Slides */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="relative h-full">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-8 md:p-12">
                <div className="container mx-auto">
                  <div className="flex justify-between items-end">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {property.title}
                      </h3>
                      <p className="text-xl text-white/90 mb-2">{property.location}</p>
                      <p className="text-lg text-white/80">{property.specs}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white mb-4">{property.price}</p>
                      <Link
                        href={`/projects/${property.id}`}
                        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-black transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 