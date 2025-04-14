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
    content: "We couldn't be happier with our Sobha home. The attention to detail and quality of construction is unmatched. The entire process from booking to possession was smooth and professional.",
    author: "Rahul & Priya Sharma",
    role: "Homeowners",
    project: "sobha-neopolis",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop"
  },
  {
    id: '2',
    type: 'video',
    content: "The amenities and community at Sobha Infinia have exceeded our expectations. It's not just a home, it's a lifestyle upgrade.",
    author: "Arun Kumar",
    role: "Resident",
    project: "sobha-infinia",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/your_video_id"
  },
  {
    id: '3',
    type: 'text',
    content: "As an NRI investor, I appreciate Sobha's transparency and professionalism. Their property management services are excellent, making it easy to maintain my investment from overseas.",
    author: "Dr. Meera Patel",
    role: "NRI Investor",
    project: "sobha-galera",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop"
  },
  {
    id: '4',
    type: 'video',
    content: "The build quality and attention to detail in my Sobha villa is remarkable. Every corner speaks of luxury and thoughtful design.",
    author: "Vikram & Anjali Reddy",
    role: "Villa Owners",
    project: "sobha-galera",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400&h=400&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/another_video_id"
  }
]; 