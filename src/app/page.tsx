'use client';

import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import VideoBanner from './components/VideoBanner';
import HomeHeroSlider from './components/HomeHeroSlider';
import FeaturedPropertiesSlider from './components/FeaturedPropertiesSlider';
import { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { useAppDispatch } from '@/store/store';
import { toast } from 'react-hot-toast';
import CustomDropdown from '@/components/CustomDropdown';
import { testimonials } from '@/data/testimonials';
import TestimonialsSlider from './components/TestimonialsSlider';

const propertyOptions = [
  { value: 'Luxury Apartments', label: 'Luxury Apartments' },
  { value: 'Premium Villas', label: 'Premium Villas' },
  { value: 'Plots', label: 'Plots' },
  { value: 'Commercial Spaces', label: 'Commercial Spaces' }
];

export default function Home() {
  const allProjects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: ''
  });

  const featuredProperties = useMemo(() => {
    return allProjects
      .map(project => ({
        id: project.id,
        title: project.title,
        price: project.price,
        location: project.location,
        specs: project.specs,
        image: project.image,
        badges: project.badges
      }));
  }, [allProjects]);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Show on initial load and refresh

  const redirectToWhatsApp = (data: typeof formData) => {
    const phone = "919999999999";
    const message = `*New Contact Form Submission*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Interest:* ${data.propertyInterest}%0A*Message:* ${data.message}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.propertyInterest || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      const submittedData = { ...formData };

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Popup Form'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Thank you for your interest! Our team will contact you soon.', {
          duration: 5000,
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyInterest: '',
          message: ''
        });

        redirectToWhatsApp(submittedData);
        setShowPopup(false);
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Contact Form Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-text-primary mb-2">
                Get in Touch with Sobha
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Fill out the form below and we will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interested In *</label>
                  <CustomDropdown
                    options={propertyOptions}
                    value={formData.propertyInterest}
                    onChange={(value) => setFormData(prev => ({ ...prev, propertyInterest: value }))}
                    placeholder="Select Property Type"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white py-3 rounded-lg text-sm font-semibold transition-all duration-300 
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark hover:text-white active:transform active:scale-[0.99]'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Video Banner Section */}
      <VideoBanner />

      {/* Featured Properties Section */}
      <section className="relative py-8 sm:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-4xl text-center sm:text-left font-bold text-text-primary">
                Our Projects
              </h2>
              <p className="text-text-light mt-2 max-w-2xl">
                Discover our collection of premium properties in the most sought-after locations
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-block text-sm sm:text-base bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 text-center sm:text-left"
            >
              View All Projects
            </Link>
          </div>
          <FeaturedPropertiesSlider properties={featuredProperties} />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="pb-0 sm:pb-0 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-text-primary mb-4">What We Do</h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-3xl mx-auto">
              We create exceptional living spaces that combine luxury, innovation, and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Residential Development */}
            <div className="bg-[#f5f2f0] p-6 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-8 sm:h-16 sm:w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">Residential Development</h3>
              </div>
              <p className="text-text-secondary text-sm sm:text-base">
                Creating luxurious apartments, villas, and premium plotted developments that set new standards in quality living.
              </p>
            </div>

            {/* Commercial Spaces */}
            <div className="bg-[#f5f2f0] p-6 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-8 sm:h-16 sm:w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">Commercial Spaces</h3>
              </div>
              <p className="text-text-secondary text-sm sm:text-base">
                Developing state-of-the-art office spaces, retail destinations, and integrated commercial complexes.
              </p>
            </div>

            {/* Property Management */}
            <div className="bg-[#f5f2f0] p-6 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-8 sm:h-16 sm:w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">Property Management</h3>
              </div>
              <p className="text-text-secondary text-sm sm:text-base">
                Offering comprehensive property management services to ensure your investment is well-maintained and profitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pt-12 sm:pt-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
              What Our Residents Say
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-light max-w-2xl mx-auto">
              Hear from our happy homeowners about their Sobha experience
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            <TestimonialsSlider testimonials={testimonials} variant="light" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-12 sm:pb-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-light max-w-2xl mx-auto">
              Find answers to common questions about our properties and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* First Column */}
            <div className="space-y-3 sm:space-y-4">
              <details className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 [&_summary::-webkit-details-marker]:hidden [&[open]>div]:animate-[slideDown_0.2s_ease-in-out]">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-semibold text-text-primary text-sm sm:text-base">
                  When is the launch of SOBHA QUEENS?
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-text-secondary text-sm sm:text-base">
                  Yet to be launched in the month of December.
                </div>
              </details>

              <details className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 [&_summary::-webkit-details-marker]:hidden [&[open]>div]:animate-[slideDown_0.2s_ease-in-out]">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-semibold text-text-primary text-sm sm:text-base">
                  How many apartments are there in SOBHA QUEENS Towers?
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-text-secondary text-sm sm:text-base">
                  SOBHA QUEENS Towers has a total of 2000+ apartments.
                </div>
              </details>
            </div>

            {/* Second Column */}
            <div className="space-y-3 sm:space-y-4">
              <details className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 [&_summary::-webkit-details-marker]:hidden [&[open]>div]:animate-[slideDown_0.2s_ease-in-out]">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-semibold text-text-primary text-sm sm:text-base">
                  Where is SOBHA QUEENS located?
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-text-secondary text-sm sm:text-base">
                  SOBHA Manhattan Towers – Townpark is located near Electronic City, Hosur Rd, Bengaluru, Karnataka.
                </div>
              </details>

              <details className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 [&_summary::-webkit-details-marker]:hidden [&[open]>div]:animate-[slideDown_0.2s_ease-in-out]">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-semibold text-text-primary text-sm sm:text-base">
                  What is the total area size of SOBHA QUEENS Towers?
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-text-secondary text-sm sm:text-base">
                  The total area size of SOBHA QUEENS Towers is 33 acres.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-4 sm:py-24 bg-gradient-to-br from-[#1a1a1a] to-[#404040]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-md sm:text-xl mb-8 sm:mb-10 text-white/90 max-w-2xl mx-auto">
              Schedule a consultation with our real estate experts today and take the first step towards your dream home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Schedule a Callback
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
