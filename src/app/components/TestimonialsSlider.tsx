'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  variant?: 'light' | 'dark';
}

export default function TestimonialsSlider({ testimonials, variant = 'light' }: TestimonialsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setShowVideo(false);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setShowVideo(false);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const textColorClass = variant === 'light' ? 'text-gray-900' : 'text-white';
  const bgColorClass = variant === 'light' ? 'bg-white' : 'bg-gray-900';
  const quoteBgClass = variant === 'light' ? 'bg-primary/5' : 'bg-white/5';

  return (
    <div className="relative pb-16">
      {/* Video Modal */}
      {showVideo && testimonials[currentSlide].type === 'video' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={testimonials[currentSlide].videoUrl}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Testimonials Slider */}
      <div className={`relative overflow-hidden rounded-2xl ${bgColorClass} px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]`}>
        <div className="max-w-6xl mx-auto h-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 absolute inset-0 px-4 sm:px-6 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
                <div className="flex flex-col items-center">
                  {/* Quote Icon */}
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary mb-6 sm:mb-8 md:mb-10"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>

                  {/* Content */}
                  <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
                    <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed ${textColorClass}`}>
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex flex-col items-center mt-auto">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 sm:mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                    {testimonial.type === 'video' && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors group"
                      >
                        <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      </button>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm sm:text-base md:text-lg font-semibold ${textColorClass}`}>
                      {testimonial.author}
                    </p>
                    <p className={`text-xs sm:text-sm md:text-base mt-1 ${variant === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {testimonial.role}
                      {testimonial.project && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{testimonial.project}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 ${
            variant === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'
          } rounded-full p-2 sm:p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110`}
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${variant === 'light' ? 'text-gray-600' : 'text-white'}`} />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 ${
            variant === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'
          } rounded-full p-2 sm:p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110`}
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${variant === 'light' ? 'text-gray-600' : 'text-white'}`} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setShowVideo(false);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? (variant === 'light' ? 'bg-primary scale-125' : 'bg-white scale-125')
                  : (variant === 'light' ? 'bg-gray-300 hover:bg-gray-400' : 'bg-white/50 hover:bg-white/75')
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}