export interface ProjectMedia {
  id: string;
  mainImage: string;
  videoUrl?: string;
  embedVideo?: string;
  gallery: string[];
}

// Static media data for projects
export const projectMedia: Record<string, ProjectMedia> = {
  'sobha-neopolis': {
    id: 'sobha-neopolis',
    mainImage: '/images/projects/neopolis/1.jpg',
    videoUrl: '/images/projects/neopolis/neopolis.mp4',
    gallery: [
      '/images/projects/neopolis/1.jpg',
      '/images/projects/neopolis/2.webp',
      '/images/projects/neopolis/3.webp',
      '/images/projects/neopolis/4.webp',
      '/images/projects/neopolis/5.webp',
      '/images/projects/neopolis/6.webp',
      '/images/projects/neopolis/7.webp',
      '/images/projects/neopolis/8.webp',
      '/images/projects/neopolis/9.webp',
      '/images/projects/neopolis/10.webp',
      '/images/projects/neopolis/11.webp',
      '/images/projects/neopolis/12.webp',
      '/images/projects/neopolis/13.webp',
      '/images/projects/neopolis/14.jpg',
      '/images/projects/neopolis/15.jpg'
    ]
  },
  'sobha-infinia': {
    id: 'sobha-infinia',
    mainImage: '/images/projects/infinia/1.webp',
    gallery: [
      '/images/projects/infinia/1.webp',
      '/images/projects/infinia/2.webp',
      '/images/projects/infinia/3.webp',
      '/images/projects/infinia/4.webp',
      '/images/projects/infinia/5.jpg',
      '/images/projects/infinia/6.jpg',
      '/images/projects/infinia/7.webp',
      '/images/projects/infinia/8.webp',
      '/images/projects/infinia/9.jpg',
      '/images/projects/infinia/10.jpg',
      '/images/projects/infinia/11.jpg'
    ]
  },
  'sobha-galera': {
    id: 'sobha-galera',
    mainImage: '/images/projects/galera/1.webp',
    videoUrl: '/images/projects/galera/galera.mp4',
    gallery: [
      '/images/projects/galera/2.webp',
      '/images/projects/galera/3.webp',
      '/images/projects/galera/4.webp',
      '/images/projects/galera/5.webp',
      '/images/projects/galera/6.webp',
      '/images/projects/galera/7.webp',
      '/images/projects/galera/8.webp',
      '/images/projects/galera/9.webp',
      '/images/projects/galera/10.webp'
    ]
  },
  'sobha-ayana': {
    id: 'sobha-ayana',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ]
  },
  'sobha-crystal-meadows': {
    id: 'sobha-crystal-meadows',
    mainImage: '/images/projects/crystal-meadows/1.webp',
    videoUrl: '/videos/Crystal-MeadowsLP-1080-1744694248179-814580685.mp4',
    gallery: [
      '/images/projects/crystal-meadows/1.webp',
      '/images/projects/crystal-meadows/2.webp',
      '/images/projects/crystal-meadows/3.webp',
      '/images/projects/crystal-meadows/4.webp',
      '/images/projects/crystal-meadows/5.webp',
      '/images/projects/crystal-meadows/6.webp',
      '/images/projects/crystal-meadows/7.webp',
      '/images/projects/crystal-meadows/8.webp',
      '/images/projects/crystal-meadows/9.webp',
      '/images/projects/crystal-meadows/10.webp'
    ]
  },
  'sobha-townpark': {
    id: 'sobha-townpark',
    mainImage: '/images/projects/townpark/1.jpg',
    videoUrl: '/images/projects/townpark/townpark.mp4',
    gallery: [
      '/images/projects/townpark/1.jpg',
      '/images/projects/townpark/2.jpg',
      '/images/projects/townpark/3.jpg'
    ]
  }
}; 