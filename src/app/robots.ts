import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://shinepaint.com/sitemap.xml',
    host: 'https://shinepaint.com',
  }
} 