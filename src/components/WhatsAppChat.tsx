'use client';

import { useState } from 'react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
  const welcomeMessage = 'Hello! I am interested in Sobha properties.';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl mb-4 w-72 overflow-hidden transition-all duration-300 transform">
          <div className="bg-[#25D366] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413zm-8.413 18.297h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm5.422-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="font-bold">WhatsApp Chat</div>
                  <div className="text-xs opacity-80">Typically replies instantly</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-4">
              Hello! 👋 How can we help you today?
            </p>
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(welcomeMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white w-full py-3 px-4 rounded-lg text-center block font-medium hover:bg-[#22bf5b] transition-colors"
            >
              Start Chat
            </a>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#22bf5b] transition-all duration-300 ${
          isOpen ? 'scale-90' : 'scale-100 hover:scale-110'
        }`}
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413zm-8.413 18.297h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
          </svg>
        )}
      </button>
    </div>
  );
} 