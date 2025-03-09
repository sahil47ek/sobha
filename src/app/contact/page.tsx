'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/store/store';
import { addLead } from '@/store/features/leadsSlice';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.propertyInterest || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Basic phone validation (at least 10 digits)
      const phoneRegex = /^\d{10,}$/;
      if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      // Dispatch the lead to Redux store
      dispatch(addLead(formData));

      // Show success message
      toast.success('Thank you for your interest! Our team will contact you soon.', {
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyInterest: '',
        message: ''
      });

      // Optional: Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      // Show error message
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const offices = [
    {
      city: 'Bangalore',
      address: 'Sobha Corporate Office, Sarjapur - Marathahalli Outer Ring Rd',
      phone: '+91 80 4960 5000',
      email: 'bangalore@sobha.com'
    },
    {
      city: 'Mumbai',
      address: 'Sobha House, Andheri East, Mumbai',
      phone: '+91 22 4960 5000',
      email: 'mumbai@sobha.com'
    },
    {
      city: 'Delhi NCR',
      address: 'Sobha City, Sector 108, Gurgaon',
      phone: '+91 124 4960 5000',
      email: 'delhi@sobha.com'
    }
  ];

  return (
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-white">
          <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Contact Sobha Real Estate
              </h1>
            <p className="text-xl text-text-secondary">
              Get in touch with our expert team to find your dream property
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
      <section className="pt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-text-secondary mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Interested In *</label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="Luxury Apartments">Luxury Apartments</option>
                    <option value="Premium Villas">Premium Villas</option>
                    <option value="Plots">Plots</option>
                    <option value="Commercial Spaces">Commercial Spaces</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">Our Offices</h2>
              <div className="space-y-8">
                {offices.map((office) => (
                  <div key={office.city} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">{office.city}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 text-text-secondary">
                        <MapPinIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                        <p>{office.address}</p>
                      </div>
                      <div className="flex items-center space-x-3 text-text-secondary">
                        <PhoneIcon className="w-6 h-6" />
                        <p>{office.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3 text-text-secondary">
                        <EnvelopeIcon className="w-6 h-6" />
                        <p>{office.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-12">Visit Our Experience Centers</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5829025224435!2d77.64023531482193!3d12.937406090878037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1453952c5f5d%3A0x9c5c91f2c59b7d9f!2sSobha%20Limited!5e0!3m2!1sen!2sin!4v1645524557177!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
      </div>
  );
} 