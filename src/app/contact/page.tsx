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

      const data = await response.json();

      if (response.ok && data.success) {
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
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] pt-20 md:pt-32 pb-8 md:pb-16">
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
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mt-16 sm:mt-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
                Contact Sobha Real Estate
              </h1>
              <p className="text-base md:text-xl text-white/90 px-4">
                Get in touch with our expert team to find your dream property
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-8 md:pt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold text-text-primary mb-4 md:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm md:text-base text-text-secondary mb-1.5 md:mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base text-text-secondary mb-1.5 md:mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base text-text-secondary mb-1.5 md:mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base text-text-secondary mb-1.5 md:mb-2">Interested In *</label>
                    <CustomDropdown
                      options={propertyOptions}
                      value={formData.propertyInterest}
                      onChange={(value) => setFormData(prev => ({ ...prev, propertyInterest: value }))}
                      placeholder="Select Property Type"
                      className="w-full text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base text-text-secondary mb-1.5 md:mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-black text-white py-2.5 md:py-4 rounded-lg text-sm md:text-lg font-semibold transition-all duration-300 
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark hover:text-white active:transform active:scale-[0.99]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="mt-6 md:mt-0">
                <h2 className="text-lg md:text-2xl font-bold text-text-primary mb-4 md:mb-8">Our Offices</h2>
                <div className="space-y-4 md:space-y-16">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">{office.city}</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0" />
                          <p className="text-gray-600">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <PhoneIcon className="w-6 h-6 text-primary flex-shrink-0" />
                          <p className="text-gray-600">{office.phone}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <EnvelopeIcon className="w-6 h-6 text-primary flex-shrink-0" />
                          <p className="text-gray-600">{office.email}</p>
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
        <section className="pb-8 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-xl md:text-3xl font-bold text-text-primary text-center mb-6 md:mb-12">
              Visit Our Experience Centers
            </h2>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5829025224435!2d77.64023531482193!3d12.937406090878037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1453952c5f5d%3A0x9c5c91f2c59b7d9f!2sSobha%20Limited!5e0!3m2!1sen!2sin!4v1645524557177!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 