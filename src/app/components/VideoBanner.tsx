'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function VideoBanner() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to load the video when component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video loading error:', e);
    setHasError(true);
  };

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleLoadedData}
          onError={handleVideoError}
          className={`object-cover w-full h-full  duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/media/sobha-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Loading State */}
        {!isVideoLoaded && !hasError && (
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="mb-4">Unable to load video</p>
              <button 
                onClick={() => {
                  setHasError(false);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-opacity-90"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-black/50" />
      </div>

  
      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square">
        <div className="w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute left-1/4 bottom-1/4 w-1/4 aspect-square">
        <div className="w-full h-full bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
} 