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
      image: '/banners/project-banner-1.jpg',
      title: 'Luxury Living Redefined',
      description: 'Experience unparalleled comfort and elegance'
    },
    {
      image: '/banners/project-banner-2.jpg',
      title: 'Premium Locations',
      description: 'Strategic locations with excellent connectivity'
    },
    {
      image: '/banners/project-banner-3.jpg',
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
      <section className="relative h-[60vh] overflow-hidden">
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
            <CustomDropdown
              options={projectTypes.map(type => ({ value: type, label: type }))}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="All Types"
              variant="filter"
            />
            <CustomDropdown
              options={projectStatuses.map(status => ({ value: status, label: status }))}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="All Status"
              variant="filter"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              // Debug log for each project
              console.log('Rendering project:', {
                id: project.id,
                title: project.title,
                url: `/projects/${project.id}`
              });
              
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                      {project.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="bg-black/75 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-light mb-4">{project.location}, {project.city}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary">
                        {project.price}
                      </span>
                      <span className="text-sm text-text-light">{project.specs}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-text-primary mb-4">No Projects Found</h3>
              <p className="text-text-light">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 