'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { cities, projectTypes, projectStatus } from '@/data/projects';
import { projectMedia } from '@/data/projectMedia';
import { useAppSelector, useAppDispatch } from '@/store/store';
import CustomDropdown from '@/components/CustomDropdown';
import Navbar from '../components/Navbar';
import { Project } from '@/data/projects';
import { resetProjects } from '@/store/features/projectsSlice';

const NavbarComponent = dynamic(() => import('../components/Navbar'), {
  ssr: false,
  loading: () => <div className="h-20 bg-white" />
});

export default function Projects() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Reset projects on mount
  useEffect(() => {
    dispatch(resetProjects());
  }, [dispatch]);

  // Debug log for projects
  useEffect(() => {
    console.log('Projects from Redux store:', projects);
    console.log('Available projects in list:', projects.map(p => ({ id: p.id, title: p.title })));
  }, [projects]);

  const bannerImages = [
    {
      image: '/images/projects/project-banner.webp',
      title: 'Luxury Living Redefined',
      description: 'Experience unparalleled comfort and elegance'
    },
    {
      image: '/images/about/about-banner.webp',
      title: 'Premium Locations',
      description: 'Strategic locations with excellent connectivity'
    },
    {
      image: '/images/projects/project-banner.webp',
      title: 'World-Class Amenities',
      description: 'Modern facilities for a luxurious lifestyle'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter projects based on selected criteria
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const cityMatch = selectedCity === 'all' || project.city.toLowerCase() === selectedCity.toLowerCase();
      const typeMatch = !selectedType || project.specs.toLowerCase().includes(selectedType.toLowerCase());
      const statusMatch = !selectedStatus || project.status === selectedStatus;
      const searchMatch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return cityMatch && typeMatch && statusMatch && searchMatch;
    });
  }, [projects, selectedCity, selectedType, selectedStatus, searchQuery]);

  // Get unique project statuses
  const projectStatuses = [...new Set(projects.map(project => project.status))];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner Carousel */}
      <section className="relative h-[80vh] overflow-hidden">
        {bannerImages.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentBannerIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-xl text-white/90">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentBannerIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <input
                  type="text"
                  placeholder="Search projects by name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              {/* City Filter */}
              <div>
                <CustomDropdown
                  options={[
                    { value: 'all', label: 'All Cities' },
                    ...cities.map(city => ({
                      value: city.toLowerCase(),
                      label: city
                    }))
                  ]}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  placeholder="Select City"
                  variant="filter"
                />
              </div>

              {/* Type Filter */}
              <div>
                <CustomDropdown
                  options={projectTypes.map(type => ({
                    value: type.toLowerCase(),
                    label: type
                  }))}
                  value={selectedType}
                  onChange={setSelectedType}
                  placeholder="Property Type"
                  variant="filter"
                />
              </div>

              {/* Status Filter */}
              <div>
                <CustomDropdown
                  options={projectStatus.map(status => ({
                    value: status,
                    label: status
                  }))}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  placeholder="Project Status"
                  variant="filter"
                />
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setSelectedCity('all');
                    setSelectedType('');
                    setSelectedStatus('');
                    setSearchQuery('');
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Results Count */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'} Found
              </h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => {
                const media = projectMedia[project.id];
                if (!media) return null;

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 sm:h-56 lg:h-64">
                      <Image
                        src={media.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                        {project.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm font-medium bg-black/75 text-white rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{project.location}, {project.city}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary">
                          {project.price}
                        </span>
                        <span className="text-sm text-gray-500">{project.specs}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 