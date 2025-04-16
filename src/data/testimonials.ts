export interface Testimonial {
  id: string;
  type: 'text' | 'video';
  content: string;
  author: string;
  role: string;
  project?: string;
  image: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    type: 'text',
    content: "We found SOBHA to be very transparent. Nothing was hidden, everything was well detailed out. Hats off to team SOBHA on giving us a timely handover even during Covid times.",
    author: "Mr. Anupam Sharma & Family",
    role: "Residents, SOBHA City",
    image: "/images/testimonial/1.jpg"
  },
  {
    id: '2',
    type: 'text',
    content: "The team at SOBHA is so transparent and efficient that I booked my home at SOBHA Atlantis even without a site visit! Although my entire communication was over the phone, the process felt hassle-free.",
    author: "Mr. Joby & Family",
    role: "SOBHA Atlantis, Vyttila, Kochi",
    image: "/images/testimonial/3.jpg"
  },
  {
    id: '3',
    type: 'text',
    content: "The meticulous detailing, superior quality, and world-class workmanship convinced us that we need not look any further – this is it.",
    author: "Mr. Satish",
    role: "Resident, SOBHA HRC Pristine",
    image: "/images/testimonial/2.jpg"
  }
]; 