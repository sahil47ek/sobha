'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import { projectMedia } from '@/data/projectMedia';
import ProjectEnquiryForm from '@/components/ProjectEnquiryForm';
import { useAppSelector } from '@/store/store';
import Navbar from '@/app/components/Navbar';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { testimonials } from '@/data/testimonials';
import TestimonialsSlider from '@/app/components/TestimonialsSlider';

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { projects } = useAppSelector((state) => state.projects);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    // Debug logs
    console.log('Current URL params:', params);
    console.log('Looking for project with ID:', projectId);
    console.log('Available projects in store:', projects);

    if (projectId && projects.length > 0) {
      const foundProject = projects.find(p => p.id.toString() === projectId.toString());
      console.log('Found project:', foundProject);

      if (foundProject) {
        setProject(foundProject);
        // Set the initial selected image to the main project image from static media
        const media = projectMedia[foundProject.id];
        if (media) {
          setSelectedImage(media.mainImage || media.gallery?.[0] || '');
        }
      }
    }
  }, [projectId, projects, params]);

  // Add loading state
  if (!projectId || !projects.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Loading...</h1>
            <p className="text-text-light">Please wait while we load the project details.</p>
          </div>
        </div>
      </>
    );
  }

  // Not found state
  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Project Not Found</h1>
            <p className="text-text-light">The project you're looking for doesn't exist.</p>
            <p className="text-text-light mt-2">Project ID: {projectId}</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/projects')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Back to Projects
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Get static media data
  const media = projectMedia[project.id];
  if (!media) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Media Not Found</h1>
            <p className="text-text-light">The media for this project is not available.</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/projects')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Back to Projects
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Ensure all required arrays exist with fallbacks
  const projectGallery = media.gallery || [];
  const projectBadges = project.badges || [];
  const projectFeatures = project.features || [];
  const projectAmenities = project.amenities || [];

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-black">
          {media.videoUrl ? (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={media.mainImage}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={media.videoUrl} type="video/mp4" />
                {/* Fallback to image if video fails to load */}
                <Image
                  src={media.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </>
          ) : (
            <>
              <Image
                src={media.mainImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4">
                  {projectBadges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">{project.title}</h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 mb-1 sm:mb-2">{project.location}, {project.city}</p>
                <p className="text-base sm:text-lg md:text-2xl font-semibold">Starting from {project.price}</p>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          {media.videoUrl && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
              <button
                onClick={(e) => {
                  const video = document.querySelector('video');
                  if (video) {
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }
                }}
                className="p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto">
            <div className="space-y-6 sm:space-y-8 md:space-y-12 px-4 sm:px-6">
              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column - About and Gallery */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary mb-2 sm:mb-3 md:mb-4">About the Project</h2>
                    <p className="text-sm sm:text-base md:text-lg text-text-light leading-relaxed">{project.description}</p>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary mb-2 sm:mb-3 md:mb-4">Project Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
                        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Configuration</h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">BHK Types</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.details?.bhk || project.specs}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">Total Units</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.details?.units || 'Contact for details'}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">Floors</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.details?.floors || 'Contact for details'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
                        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Project Overview</h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">Land Parcel</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.details?.landParcel || 'Contact for details'}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">Theme</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.details?.theme || 'Contact for details'}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm md:text-base text-text-light">Status</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-text-primary">{project.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary mb-4 sm:mb-6">Project Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {media.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl group"
                          onClick={() => {
                            setSelectedImage(image);
                            setGalleryOpen(true);
                          }}
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - Gallery Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl sticky top-20 sm:top-24">
                    <ProjectEnquiryForm projectId={project.id} projectTitle={project.title} />
                  </div>
                </div>
              </div>

              {/* Testimonials Section */}
              {testimonials.filter(t => t.project === project.id).length > 0 && (
                <div className="mt-8 sm:mt-12 md:mt-16">
                  <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-2 sm:mb-3 md:mb-4">
                      What Our Residents Say
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-text-light max-w-2xl mx-auto">
                      Hear from our happy homeowners about their experience at {project.title}
                    </p>
                  </div>
                  <div className="max-w-7xl mx-auto">
                    <TestimonialsSlider 
                      testimonials={testimonials.filter(t => t.project === project.id)}
                      variant="light"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Image Gallery Modal */}
        {galleryOpen && selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close gallery"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            
            <div className="relative w-full max-w-6xl">
              <Image
                src={selectedImage}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              
              {/* Navigation Thumbnails */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2">
                {media.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImage === image ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 