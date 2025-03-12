'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { cities, projectTypes, projectStatus } from '@/data/projects';
import { useAppSelector } from '@/store/store';
import CustomDropdown from '@/components/CustomDropdown';
import Navbar from '../components/Navbar';
import { Project } from '@/data/projects';

const NavbarComponent = dynamic(() => import('../components/Navbar'), {
  ssr: false,
  loading: () => <div className="h-20 bg-white" />
});

export default function Projects() {
  const { projects } = useAppSelector((state) => state.projects);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Debug log for projects
  useEffect(() => {
    console.log('Projects from Redux store:', projects);
  }, [projects]);

  console.log('Available projects in list:', projects.map(p => ({ id: p.id, title: p.title })));

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

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCity = selectedCity === 'all' || project.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesType = !selectedType || (project.details?.bhk || '').includes(selectedType);
      const matchesStatus = !selectedStatus || project.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCity && matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedCity, selectedType, selectedStatus, searchQuery, projects]);

  const cities = ['all', ...new Set(projects.map(project => project.city))];
  const projectTypes = [...new Set(projects.flatMap(project => {
    const bhk = project.details?.bhk;
    return bhk ? bhk.split(' & ') : [];
  }))];
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
                <div className="container mx-auto px-6">
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

      {/* Filters */}
      <section className="py-6 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 mb-8 sm:mb-12">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* City Filter */}
            <div className="w-full">
              <CustomDropdown
                options={cities.map(city => ({
                  value: city,
                  label: city.charAt(0).toUpperCase() + city.slice(1)
                }))}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="All Cities"
                variant="filter"
              />
            </div>

            {/* Type Filter */}
            <div className="w-full">
              <CustomDropdown
                options={projectTypes.map(type => ({ value: type, label: type }))}
                value={selectedType}
                onChange={setSelectedType}
                placeholder="All Types"
                variant="filter"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full">
              <CustomDropdown
                options={projectStatuses.map(status => ({ value: status, label: status }))}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="All Status"
                variant="filter"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-0 sm:mb-8">
            {selectedCity !== 'all' && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                {selectedCity}
                <button 
                  onClick={() => setSelectedCity('all')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
            {selectedType && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                {selectedType}
                <button 
                  onClick={() => setSelectedType('')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
            {selectedStatus && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                {selectedStatus}
                <button 
                  onClick={() => setSelectedStatus('')}
                  className="ml-2 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="bg-black/75 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 sm:mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-light mb-3 sm:mb-4">{project.location}, {project.city}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <span className="text-base sm:text-lg font-semibold text-primary">
                      {project.price}
                    </span>
                    <span className="text-xs sm:text-sm text-text-light">{project.specs}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 sm:mb-4">No Projects Found</h3>
              <p className="text-sm sm:text-base text-text-light">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 