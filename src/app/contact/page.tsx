'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/store/store';
import { addLead } from '@/store/features/leadsSlice';
import { toast } from 'react-hot-toast';
import CustomDropdown from '@/components/CustomDropdown';
import Image from 'next/image';

const propertyOptions = [
  { value: 'Luxury Apartments', label: 'Luxury Apartments' },
  { value: 'Premium Villas', label: 'Premium Villas' },
  { value: 'Plots', label: 'Plots' },
  { value: 'Commercial Spaces', label: 'Commercial Spaces' }
];

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

  const redirectToWhatsApp = (data: typeof formData) => {
    const phone = "919999999999"; // Your business WhatsApp number
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
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.propertyInterest || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Basic phone validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      // Save the form data before submission
      const submittedData = { ...formData };

      // Submit to admin leads API
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Form'
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }

      const data = await response.json();

      // Add to Redux store if needed
      if (data.success && data.lead) {
        dispatch(addLead(data.lead));
      }

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

      // Redirect to WhatsApp with the submitted data
      redirectToWhatsApp(submittedData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: 'Bangalore',
      address: 'Sobha Corporate Office, Sarjapur - Marathahalli Outer Ring Rd',
      phone: '+91 80 4960 5000',
      email: 'bangalore@sobha.com',
      mapsUrl: 'https://goo.gl/maps/QZPz8K9nkQD2XyVt8'
    },
    {
      city: 'Mumbai',
      address: 'Sobha House, Andheri East, Mumbai',
      phone: '+91 22 4960 5000',
      email: 'mumbai@sobha.com',
      mapsUrl: 'https://goo.gl/maps/YHJ6rL8WLZL2'
    },
    {
      city: 'Delhi NCR',
      address: 'Sobha City, Sector 108, Gurgaon',
      phone: '+91 124 4960 5000',
      email: 'delhi@sobha.com',
      mapsUrl: 'https://goo.gl/maps/3X4Z5C6V7JK2'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] pt-16 sm:pt-20 md:pt-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/contact/contact-banner.webp"
              alt="Contact Us Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mt-8 sm:mt-12 md:mt-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                Contact Sobha Real Estate
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 px-4">
                Get in touch with our expert team to find your dream property
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-6 sm:py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm sm:text-base text-text-secondary mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base text-text-secondary mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base text-text-secondary mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base text-text-secondary mb-1.5">Interested In *</label>
                    <CustomDropdown
                      options={propertyOptions}
                      value={formData.propertyInterest}
                      onChange={(value) => setFormData(prev => ({ ...prev, propertyInterest: value }))}
                      placeholder="Select Property Type"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base text-text-secondary mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-black text-white py-2.5 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold transition-all duration-300 
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark hover:text-white active:transform active:scale-[0.99]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="mt-6 md:mt-0">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">Our Offices</h2>
                <div className="space-y-4 sm:space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{office.city}</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                          <p className="text-sm sm:text-base text-gray-600">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                          <p className="text-sm sm:text-base text-gray-600">{office.phone}</p>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                          <p className="text-sm sm:text-base text-gray-600">{office.email}</p>
                        </div>
                        <div className="mt-4">
                          <a
                            href={office.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-colors text-sm"
                          >
                            <MapPinIcon className="w-4 h-4" />
                            <span>View Location</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 