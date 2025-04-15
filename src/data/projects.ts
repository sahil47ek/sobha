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
    id: 'sobha-townpark',
    title: 'Sobha Townpark',
    subtitle: 'New York Inspired Living',
    description: 'Vibrant and suave, challenging yet inspiring, New York is a city of possibilities. Living here is a statement – the one that differentiates you. The lifestyle you have always admired and desired for is coming closer to you. SOBHA presents Bengaluru\'s first-ever, self-sufficient residential township crafted in the architectural footsteps of New York. Come, bask in its sparkle and stride to the future with aplomb. Located near Electronic City in South Bengaluru, brimming with potential to be the next hub, these iconic residences will usher you into a world of unparalleled luxury.',
    location: 'Hosur Road',
    city: 'Bangalore',
    price: 'Starting From ₹ 90L Onwards*',
    specs: '1/2/3/4 BHK Apartments',
    badges: ['Tallest Building in Bengaluru', 'Launching New Phase 3'],
    amenities: [
      'Swimming Pool',
      'Clubhouse',
      'Gym',
      'Children\'s Play Area',
      'Indoor Games',
      'Landscaped Gardens',
      'Jogging Track',
      'Tennis Court',
      'Basketball Court',
      'Amphitheatre',
      'Yoga Deck',
      'Meditation Zone'
    ],
    features: [
      'Premium Flooring',
      'Modular Kitchen',
      'High-end Fixtures',
      'Smart Home Features',
      'Spacious Balconies',
      'Ample Parking',
      'High-speed Elevators',
      '24/7 Security'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '1/2/3/4 BHK',
      landParcel: '33 Acres',
      units: '2000+',
      floors: '1B + G + 44',
      theme: 'New York Inspired Living',
      fullDescription: [
        'Vibrant and suave, challenging yet inspiring, New York is a city of possibilities.',
        'Living here is a statement – the one that differentiates you.',
        'The lifestyle you have always admired and desired for is coming closer to you.',
        'SOBHA presents Bengaluru\'s first-ever, self-sufficient residential township crafted in the architectural footsteps of New York.',
        'Come, bask in its sparkle and stride to the future with aplomb.',
        'Located near Electronic City in South Bengaluru, brimming with potential to be the next hub, these iconic residences will usher you into a world of unparalleled luxury.'
      ]
    }
  },
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
  },
  {
    id: 'sobha-crystal-meadows',
    title: 'Sobha Crystal Meadows',
    subtitle: 'Luxury Living in Nature',
    description: 'Premium 3 & 4 BHK apartments with world-class amenities surrounded by lush greenery.',
    location: 'Whitefield Extension, Bangalore',
    city: 'bangalore',
    price: '₹1.8 Cr*',
    specs: '3 & 4 BHK',
    badges: ['Premium', 'Under Construction', 'Green Living'],
    amenities: [
      'Swimming Pool',
      'Clubhouse',
      'Gym',
      'Children\'s Play Area',
      'Indoor Games',
      'Landscaped Gardens',
      'Jogging Track',
      'Tennis Court',
      'Yoga Deck',
      'Meditation Zone'
    ],
    features: [
      'Premium Flooring',
      'Modular Kitchen',
      'High-end Fixtures',
      'Smart Home Features',
      'Spacious Balconies',
      'Ample Parking',
      'Large Windows',
      'Cross Ventilation'
    ],
    featured: true,
    status: 'Under Construction',
    details: {
      bhk: '3 & 4 BHK',
      landParcel: '12 Acres',
      units: '450',
      floors: 'G + 25',
      theme: 'Nature-inspired Luxury Living',
      fullDescription: [
        'Welcome to Sobha Crystal Meadows, where luxury meets nature.',
        'Located in the prime area of Whitefield Extension, Bangalore.',
        'Premium amenities and thoughtfully designed spaces for an elevated lifestyle.',
        'Surrounded by lush greenery and offering stunning views.'
      ]
    }
  }
]; 