export interface ProjectMedia {
  id: string;
  mainImage: string;
  videoUrl?: string;
  gallery: string[];
}

// Static media data for projects
export const projectMedia: Record<string, ProjectMedia> = {
  'sobha-neopolis': {
    id: 'sobha-neopolis',
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    videoUrl: '/videos/sobha-neopolis.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'
    ]
  },
  'sobha-infinia': {
    id: 'sobha-infinia',
    mainImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
    ]
  },
  'sobha-galera': {
    id: 'sobha-galera',
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'
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
  }
}; 