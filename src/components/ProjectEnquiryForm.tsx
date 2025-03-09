'use client';

import { useState } from 'react';

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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectId,
          projectTitle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }
      
      // Reset form and show success message
      setFormData({ name: '', email: '', phone: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-black rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-4">Interested in {projectTitle}?</h3>
      <p className="mb-6">Fill out the form below and we'll get back to you shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
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
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
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
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-white font-medium rounded-lg transition-all duration-200 ${
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-white/90 hover:text-black text-black'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Request Information'}
        </button>

        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg text-white text-center">
            Thank you! We'll contact you soon about {projectTitle}.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-500/20 rounded-lg text-white text-center">
            {errorMessage || 'Something went wrong. Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
} 