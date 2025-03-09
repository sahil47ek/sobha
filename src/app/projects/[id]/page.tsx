'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import ProjectEnquiryForm from '@/components/ProjectEnquiryForm';
import { useAppSelector } from '@/store/store';
import Navbar from '@/app/components/Navbar';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
        // Set the initial selected image to the main project image
        setSelectedImage(foundProject.image || foundProject.gallery?.[0] || '');
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

  // Ensure all required arrays exist with fallbacks
  const projectGallery = project.gallery || [];
  const projectBadges = project.badges || [];
  const projectFeatures = project.features || [];
  const projectAmenities = project.amenities || [];

  return (
    <>
      <Navbar />
      <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black">
        <Image
          src={selectedImage}
          alt={project.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {projectBadges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-white/90 mb-2">{project.location}, {project.city}</p>
              <p className="text-2xl font-semibold">Starting from {project.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="space-y-12 px-6">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - About and Gallery */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">About the Project</h2>
                  <p className="text-text-light text-lg leading-relaxed">{project.description}</p>
                </div>

                {/* Project Details */}
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Project Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Configuration</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-text-light">BHK Types</p>
                          <p className="text-lg font-medium text-text-primary">{project.details?.bhk || project.specs}</p>
                        </div>
                        <div>
                          <p className="text-text-light">Total Units</p>
                          <p className="text-lg font-medium text-text-primary">{project.details?.units || 'Contact for details'}</p>
                        </div>
                        <div>
                          <p className="text-text-light">Floors</p>
                          <p className="text-lg font-medium text-text-primary">{project.details?.floors || 'Contact for details'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Project Overview</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-text-light">Land Parcel</p>
                          <p className="text-lg font-medium text-text-primary">{project.details?.landParcel || 'Contact for details'}</p>
                        </div>
                        <div>
                          <p className="text-text-light">Theme</p>
                          <p className="text-lg font-medium text-text-primary">{project.details?.theme || 'Contact for details'}</p>
                        </div>
                        <div>
                          <p className="text-text-light">Status</p>
                          <p className="text-lg font-medium text-text-primary">{project.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-4">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
                          onClick={() => {
                            setSelectedImage(image);
                            setGalleryOpen(true);
                          }}
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Gallery Image ${index + 1}`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact Form */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-8 rounded-xl sticky top-24">
                  <ProjectEnquiryForm projectId={project.id} projectTitle={project.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {galleryOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt={project.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </main>
    </>
  );
} 