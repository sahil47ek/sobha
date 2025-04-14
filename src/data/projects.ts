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
  videoUrl?: string;
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
    id: 'sobha-neopolis',
    title: 'Sobha Neopolis',
    subtitle: 'Modern Urban Living',
    description: 'Premium 2 & 3 BHK apartments with world-class amenities in a prime location.',
    location: 'Panathur Road, Bangalore',
    city: 'bangalore',
    price: '₹1.2 Cr*',
    specs: '2 & 3 BHK',
    badges: ['Premium', 'Ready to Move'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    videoUrl: '/videos/sobha-neopolis.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'
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
      bhk: '2 & 3 BHK',
      landParcel: '5 Acres',
      units: '250',
      floors: 'G + 25',
      theme: 'Modern Urban Living',
      fullDescription: [
        'Experience modern urban living at Sobha Neopolis.',
        'Located in the heart of Bangalore\'s IT corridor.',
        'Premium amenities and thoughtfully designed spaces for a comfortable lifestyle.'
      ]
    }
  },
  {
    id: 'sobha-infinia',
    title: 'Sobha Infinia',
    subtitle: 'Luxury Redefined',
    description: 'Ultra-luxury 3 & 4 BHK apartments with premium amenities and stunning views.',
    location: 'Outer Ring Road, Bangalore',
    city: 'bangalore',
    price: '₹2.8 Cr*',
    specs: '3 & 4 BHK',
    badges: ['Ultra Luxury', 'Under Construction'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
    ],
    amenities: [
      'Infinity Pool',
      'Sky Lounge',
      'Premium Clubhouse',
      'Spa & Salon',
      'Multi-purpose Court',
      'Zen Garden',
      'Business Center',
      'Party Hall'
    ],
    features: [
      'Italian Marble Flooring',
      'German Kitchen',
      'Home Automation',
      'VRV Air Conditioning',
      'Private Decks',
      '24/7 Security'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '3 & 4 BHK',
      landParcel: '8 Acres',
      units: '180',
      floors: 'G + 30',
      theme: 'Luxury Living',
      fullDescription: [
        'Sobha Infinia represents the pinnacle of luxury living.',
        'Stunning views of the city skyline from every apartment.',
        'World-class amenities and unparalleled luxury in every detail.'
      ]
    }
  },
  {
    id: 'sobha-galera',
    title: 'Sobha Galera',
    subtitle: 'Exclusive Villa Living',
    description: 'Premium villas with private gardens and exclusive amenities.',
    location: 'Sarjapur Road, Bangalore',
    city: 'bangalore',
    price: '₹4.5 Cr*',
    specs: '4 BHK Villas',
    badges: ['Premium Villas', 'Limited Edition'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'
    ],
    amenities: [
      'Private Pool Option',
      'Clubhouse',
      'Tennis Court',
      'Mini Theatre',
      'Landscaped Parks',
      'Walking Trail',
      'BBQ Area',
      'Kids Play Zone'
    ],
    features: [
      'Private Garden',
      'Double Height Living',
      'Premium Finishes',
      'Smart Home',
      'Servant Quarter',
      'Multiple Parking'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '4 BHK',
      landParcel: '15 Acres',
      units: '100',
      floors: 'G + 2',
      theme: 'Villa Living',
      fullDescription: [
        'Experience exclusive villa living at Sobha Galera.',
        'Spacious villas with private gardens in a gated community.',
        'Premium amenities and luxurious features for an elevated lifestyle.'
      ]
    }
  },
  {
    id: 'sobha-ayana',
    title: 'Sobha Ayana',
    subtitle: 'Nature-inspired Living',
    description: 'Premium apartments surrounded by nature with modern amenities.',
    location: 'Whitefield, Bangalore',
    city: 'bangalore',
    price: '₹1.8 Cr*',
    specs: '2 & 3 BHK',
    badges: ['Premium', 'Green Living'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ],
    amenities: [
      'Organic Garden',
      'Yoga Deck',
      'Meditation Zone',
      'Swimming Pool',
      'Nature Trail',
      'Butterfly Garden',
      'Fitness Center',
      'Multi-purpose Court'
    ],
    features: [
      'Large Windows',
      'Cross Ventilation',
      'Premium Flooring',
      'Modular Kitchen',
      'Sustainable Features',
      'Energy Efficient'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '2 & 3 BHK',
      landParcel: '10 Acres',
      units: '300',
      floors: 'G + 20',
      theme: 'Nature Living',
      fullDescription: [
        'Sobha Ayana offers a perfect blend of nature and modern living.',
        'Thoughtfully designed spaces that bring you closer to nature.',
        'Premium amenities focused on wellness and sustainable living.'
      ]
    }
  }
]; 