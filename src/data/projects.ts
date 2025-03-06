export const cities = ['Bangalore', 'Chennai', 'Gurugram', 'Pune', 'Mumbai'] as const;
export const projectTypes = ['Apartment', 'Villa', 'Plot', 'Commercial'] as const;
export const projectStatus = ['Ready to Move', 'Under Construction', 'Coming Soon'] as const;

export type City = typeof cities[number];
export type ProjectType = typeof projectTypes[number];
export type ProjectStatus = typeof projectStatus[number];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  city: string;
  price: string;
  specs: string;
  badges: string[];
  image: string;
  gallery: string[];
  amenities: string[];
  features: string[];
  featured: boolean;
  status: string;
  details: {
    bhk: string;
    landParcel: string;
    units: string;
    floors: string;
    theme: string;
    fullDescription: string[];
  };
}

// Sample projects data
export const projects: Project[] = [
  {
    id: 'sobha-windsor',
    title: 'Sobha Windsor',
    subtitle: 'Luxury Living Redefined',
    description: 'Luxury 3 & 4 BHK apartments with world-class amenities in a prime location.',
    location: 'Whitefield',
    city: 'bangalore',
    price: '₹2.5 Cr*',
    specs: '3 & 4 BHK',
    badges: ['Luxury', 'Ready to Move'],
    image: '/images/projects/windsor-main.jpg',
    gallery: [
      '/images/projects/windsor-1.jpg',
      '/images/projects/windsor-2.jpg',
      '/images/projects/windsor-3.jpg',
      '/images/projects/windsor-4.jpg',
    ],
    amenities: [
      'Swimming Pool',
      'Clubhouse',
      'Gym',
      'Children\'s Play Area',
      'Indoor Games',
      'Landscaped Gardens',
      'Jogging Track',
      'Tennis Court'
    ],
    features: [
      'Premium Flooring',
      'Modular Kitchen',
      'High-end Fixtures',
      'Smart Home Features',
      'Spacious Balconies',
      'Ample Parking'
    ],
    featured: true,
    status: 'Ready to Move',
    details: {
      bhk: '3 & 4 BHK',
      landParcel: '5 Acres',
      units: '250',
      floors: 'G + 25',
      theme: 'Modern Luxury Living',
      fullDescription: [
        'Experience luxury living at its finest with Sobha Windsor.',
        'Nestled in the heart of Whitefield, these premium apartments offer unmatched comfort and elegance.',
        'With world-class amenities and thoughtfully designed spaces, each home is a masterpiece of luxury.'
      ]
    }
  },
  {
    id: 'sobha-lake-gardens',
    title: 'Sobha Lake Gardens',
    subtitle: 'Lakeside Living Perfected',
    description: 'Premium lakeside living with spacious 2 & 3 BHK apartments.',
    location: 'Hebbal',
    city: 'bangalore',
    price: '₹1.8 Cr*',
    specs: '2 & 3 BHK',
    badges: ['Premium', 'Lake View'],
    image: '/images/projects/lake-gardens-main.jpg',
    gallery: [
      '/images/projects/lake-gardens-1.jpg',
      '/images/projects/lake-gardens-2.jpg',
      '/images/projects/lake-gardens-3.jpg',
      '/images/projects/lake-gardens-4.jpg',
    ],
    amenities: [
      'Lake View',
      'Infinity Pool',
      'Modern Clubhouse',
      'Fitness Center',
      'Yoga Deck',
      'Party Hall',
      'Kids Play Zone',
      'Walking Trail'
    ],
    features: [
      'Italian Marble Flooring',
      'Designer Kitchen',
      'VRV Air Conditioning',
      'Home Automation',
      'Private Gardens',
      'Multi-level Security'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '2 & 3 BHK',
      landParcel: '8 Acres',
      units: '320',
      floors: 'G + 20',
      theme: 'Lakeside Luxury',
      fullDescription: [
        'Sobha Lake Gardens offers a perfect blend of nature and luxury.',
        'With stunning views of the lake and premium amenities, it\'s more than just a home.',
        'Experience the serenity of lakeside living with the convenience of urban connectivity.'
      ]
    }
  },
  {
    id: 'sobha-silicon-oasis',
    title: 'Sobha Silicon Oasis',
    subtitle: 'Smart Living for Modern Professionals',
    description: 'Tech-integrated smart homes with 2, 3 & 4 BHK options near IT hub.',
    location: 'Electronic City',
    city: 'bangalore',
    price: '₹1.2 Cr*',
    specs: '2, 3 & 4 BHK',
    badges: ['Smart Homes', 'Under Construction'],
    image: '/images/projects/silicon-oasis-main.jpg',
    gallery: [
      '/images/projects/silicon-oasis-1.jpg',
      '/images/projects/silicon-oasis-2.jpg',
      '/images/projects/silicon-oasis-3.jpg',
      '/images/projects/silicon-oasis-4.jpg',
    ],
    amenities: [
      'Smart Security',
      'Co-working Space',
      'Rooftop Pool',
      'Sky Lounge',
      'Gaming Zone',
      'Theatre',
      'Sports Complex',
      'EV Charging'
    ],
    features: [
      'Smart Home System',
      'Energy Efficient Design',
      'Premium Finishes',
      'High-speed Internet',
      'Acoustic Insulation',
      'Sustainable Features'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '2, 3 & 4 BHK',
      landParcel: '12 Acres',
      units: '450',
      floors: 'G + 30',
      theme: 'Smart Living',
      fullDescription: [
        'Welcome to the future of living at Sobha Silicon Oasis.',
        'Located in the heart of Electronic City, these smart homes are designed for tech-savvy professionals.',
        'Experience seamless integration of technology with luxury living.'
      ]
    }
  },
  {
    id: 'sobha-royal-pavilion',
    title: 'Sobha Royal Pavilion',
    subtitle: 'Ultra-Luxury Redefined',
    description: 'Ultra-luxury 4 & 5 BHK residences with royal amenities.',
    location: 'Sarjapur Road',
    city: 'bangalore',
    price: '₹4.5 Cr*',
    specs: '4 & 5 BHK',
    badges: ['Ultra Luxury', 'Limited Edition'],
    image: '/images/projects/royal-pavilion-main.jpg',
    gallery: [
      '/images/projects/royal-pavilion-1.jpg',
      '/images/projects/royal-pavilion-2.jpg',
      '/images/projects/royal-pavilion-3.jpg',
      '/images/projects/royal-pavilion-4.jpg',
    ],
    amenities: [
      'Temperature Controlled Pool',
      'Helipad',
      'Private Theatre',
      'Wine Cellar',
      'Spa & Salon',
      'Concierge Service',
      'Business Center',
      'Banquet Hall'
    ],
    features: [
      'Double Height Living',
      'Private Elevator',
      'Italian Kitchen',
      'Smart Automation',
      'Private Pool Option',
      'Premium Security'
    ],
    featured: true,
    status: 'Ready to Move',
    details: {
      bhk: '4 & 5 BHK',
      landParcel: '15 Acres',
      units: '180',
      floors: 'G + 35',
      theme: 'Royal Living',
      fullDescription: [
        'Sobha Royal Pavilion represents the pinnacle of luxury living.',
        'These ultra-luxury residences offer unparalleled amenities and exclusivity.',
        'Every detail is crafted to provide a truly royal living experience.'
      ]
    }
  }
]; 