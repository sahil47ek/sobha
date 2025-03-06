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
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="pt-16 grid grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            <Image
              src="/images/sobha-logo.png"
              alt="Sobha Logo"
              width={130}
              height={30}
              className=""
            />
            <p className="text-text-primary leading-relaxed">
              Building dreams and delivering excellence in real estate since 1995. Experience luxury living with Sobha.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-text-primary">
                <PhoneIcon className="h-5 w-5" />
                <span>080 4960 5000</span>
              </div>
              <div className="flex items-center space-x-3 text-text-primary">
                <EnvelopeIcon className="h-5 w-5" />
                <span>contact@sobha.com</span>
              </div>
              <div className="flex items-start space-x-3 text-text-primary">
                <MapPinIcon className="h-5 w-5 mt-1" />
                <span>Sobha Corporate Office, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-12 md:col-span-2">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-primary hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Our Presence</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {cities.map((city) => (
                <span key={city} className="text-text-primary">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-12 md:col-span-3">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Stay Updated</h3>
            <p className="text-text-primary mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-black rounded-lg font-medium hover:bg-black/80 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 py-8">
          {/* Disclaimer */}
          <div className="mb-8 text-sm text-text-primary">
            <p className="mb-4 font-semibold">DISCLAIMER:</p>
            <p className="leading-relaxed">
              The content is for information purposes only and does not constitute an offer to avail of any service. 
              Prices mentioned are subject to change without notice and properties mentioned are subject to availability. 
              Images for representation purposes only. The logos and images used on this website are the exclusive property 
              of Sobha Ltd. and are protected under applicable copyright laws. We do not claim any ownership or rights to 
              these materials, and they are used on this website solely for informational purposes.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-text-primary text-sm">
              <p>© {new Date().getFullYear()} SOBHA Limited. All rights reserved.</p>
              <p className="mt-1">CIN: L45201KA1995PLC018475</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 