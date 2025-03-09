'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { addLead } from '@/store/features/leadsSlice';
import { toast } from 'react-hot-toast';

interface ProjectEnquiryFormProps {
  projectId: string;
  projectTitle: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function ProjectEnquiryForm({ projectId, projectTitle }: ProjectEnquiryFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const redirectToWhatsApp = (data: FormData) => {
    const message = `*New Project Enquiry*%0A
Project: ${projectTitle}%0A
Name: ${data.name}%0A
Email: ${data.email}%0A
Phone: ${data.phone}`;
    
    window.open(`https://wa.me/+919999999999?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone) {
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

      // Submit to admin leads API
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectId,
          projectTitle,
          source: 'Project Enquiry'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      // Add to Redux store
      dispatch(addLead({
        ...formData,
        propertyInterest: projectTitle,
        message: `Interested in ${projectTitle}`
      }));
      
      // Show success message
      toast.success('Thank you for your interest! Our team will contact you soon.');
      setSubmitStatus('success');
      
      // Redirect to WhatsApp
      redirectToWhatsApp(formData);
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-100">Interested in {projectTitle}?</h3>
      <p className="mb-6 text-gray-300">Fill out the form below and we'll get back to you shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            required
            pattern="[0-9]{10}"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-blue-500 font-medium rounded-lg text-gray-100 transition-all duration-200 ${
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Request Information'}
        </button>

        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-500/20 rounded-lg text-gray-100 text-center">
            Thank you! We'll contact you soon about {projectTitle}.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-500/20 rounded-lg text-gray-100 text-center">
            {errorMessage || 'Something went wrong. Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
} 