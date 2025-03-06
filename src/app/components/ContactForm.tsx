'use client';

import { useState } from 'react';
import { submitContactForm } from '../actions/contact';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string
    };

    try {
      const result = await submitContactForm(data);
      setFormStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
      if (result.success) {
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
            
            {/* Form Status Message */}
            {formStatus.message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a topic</option>
                  <option value="product">Product Inquiry</option>
                  <option value="consultation">Color Consultation</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-rose-400 to-purple-500 text-white py-3 px-6 rounded-lg transition-all ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Visit Our Showroom</h3>
                    <p className="text-gray-600">
                      123 Paint Street<br />
                      Colorful City, ST 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Call Us</h3>
                    <p className="text-gray-600">
                      Sales: (555) 123-4567<br />
                      Support: (555) 987-6543
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Email Us</h3>
                    <p className="text-gray-600">
                      Sales: sales@shinepaint.com<br />
                      Support: support@shinepaint.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Business Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-gray-900">Closed</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Find Us</h2>
              <div className="relative h-[300px] rounded-lg overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Map will be embedded here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 