import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const cities = [
    'Bengaluru', 'Delhi NCR', 'Mysuru', 'Hyderabad', 'Chennai', 'Coimbatore',
    'Kozhikode', 'Thrissur', 'Gift City Gujarat', 'Pune', 'Thiruvananthapuram', 'Kochi'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#f5f2f0]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="pt-8 sm:pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            <Image
              src="/images/sobha-logo.png"
              alt="Sobha Logo"
              width={110}
              height={25}
              className="w-[110px] sm:w-[130px]"
            />
            <p className="text-sm sm:text-base text-text-primary leading-relaxed">
              Building dreams and delivering excellence in real estate since 1995. Experience luxury living with Sobha.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a href="tel:08049605000" className="flex items-center space-x-3 text-text-primary hover:text-primary transition-colors">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">080 4960 5000</span>
              </a>
              <a href="mailto:sales@sobha.com" className="flex items-center space-x-3 text-text-primary hover:text-primary transition-colors">
                <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">sales@sobha.com</span>
              </a>
              <div className="flex items-start space-x-3 text-text-primary">
                {/* <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mt-1" /> */}
                <span className="text-sm sm:text-md">SOBHA Corporate Office, Sarjapur - Marathahalli Outer Ring Road, Devarabisanahalli, Bellandur Post, Bangalore - 560103</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm sm:text-base text-text-primary hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">Our Presence</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
              {cities.map((city) => (
                <span key={city} className="text-sm sm:text-base text-text-primary">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">Stay Updated</h3>
            <p className="text-sm sm:text-base text-text-primary mb-4">
              Subscribe to our newsletter to receive exclusive updates about new project launches, special offers, and real estate insights.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white bg-black rounded-lg font-medium hover:bg-black/80 transition-colors duration-300"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 mt-8 sm:mt-8 py-6 sm:py-8">
          {/* Disclaimer */}
          <div className="mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm font-semibold text-text-primary mb-3 sm:mb-4">DISCLAIMER:</p>
            <p className="text-xs sm:text-sm text-text-primary/80 leading-relaxed">
              The content provided on this website is for information purposes only and does not constitute an offer to avail of any service. 
              Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images used are for 
              representation purposes only. Maps are not to scale. Floor plans, specifications, fixtures, details, and dimensions are approximate 
              and subject to change without notice. The company reserves the right to modify the plans, specifications, and features without 
              prior notice. All trademarks, logos, images, and intellectual property displayed are legally owned by SOBHA Limited. 
              This website is for the exclusive use of persons in India. By accessing this website, you agree to its terms of use.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            {/* Copyright */}
            <div className="text-text-primary text-center sm:text-left">
              <p className="text-xs sm:text-sm">© {new Date().getFullYear()} SOBHA Limited. All rights reserved.</p>
              <p className="text-xs sm:text-sm mt-1">CIN: L45201KA1995PLC018475</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 