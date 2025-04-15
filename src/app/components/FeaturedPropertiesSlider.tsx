'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Project } from '@/data/projects';
import { projectMedia } from '@/data/projectMedia';

interface FeaturedPropertiesSliderProps {
  properties: Project[];
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
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
        {properties.map((property, index) => {
          const media = projectMedia[property.id];
          if (!media) return null;

          return (
            <Link
              key={property.id}
              href={`/projects/${property.id}`}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out group hover:cursor-pointer ${
                currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background Image */}
              <div className="relative h-full">
                <Image
                  src={media.mainImage}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                      <div className="max-w-2xl">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          {property.badges.map((badge, idx) => (
                            <span
                              key={idx}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-1 sm:mb-2">
                          <span className="inline-block mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 inline-block -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </span>
                          {property.location}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-white/80">
                          <span className="inline-block mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 inline-block -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </span>
                          {property.specs}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{property.price}</p>
                        <span className="inline-block w-full sm:w-auto text-center bg-white text-black px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-sm sm:text-base font-semibold group-hover:bg-primary group-hover:text-black transition-all duration-300">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 sm:p-2 md:p-2.5 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 sm:p-2 md:p-2.5 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
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
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 