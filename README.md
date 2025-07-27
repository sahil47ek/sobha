# Sobha Real Estate Website

A modern, responsive real estate website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Static Project Management**: All projects are hardcoded in `src/data/projects.ts`
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Built-in SEO features with Next.js
- **Performance**: Optimized images and fast loading times
- **Contact Management**: Admin panel for managing leads and enquiries
- **WhatsApp Integration**: Direct WhatsApp contact functionality

## Project Structure

```
sobha/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel (leads management only)
│   │   ├── components/      # Reusable UI components
│   │   ├── projects/        # Project listing and detail pages
│   │   └── ...
│   ├── data/
│   │   ├── projects.ts      # Static project data
│   │   ├── projectMedia.ts  # Project images and media
│   │   └── testimonials.ts  # Customer testimonials
│   └── ...
├── public/
│   └── images/              # Static images and project media
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sobha
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Management

### Adding/Editing Projects

Projects are managed statically in `src/data/projects.ts`. To add or edit projects:

1. Open `src/data/projects.ts`
2. Add new project objects to the `projects` array
3. Update project media in `src/data/projectMedia.ts`
4. Add project images to `public/images/projects/[project-id]/`

### Project Structure

Each project follows this structure:

```typescript
{
  id: 'unique-project-id',
  title: 'Project Title',
  subtitle: 'Project Subtitle',
  description: 'Detailed project description',
  location: 'Project Location',
  city: 'City Name',
  price: '₹ Price Range',
  specs: 'Property Specifications',
  badges: ['Badge 1', 'Badge 2'],
  amenities: ['Amenity 1', 'Amenity 2'],
  features: ['Feature 1', 'Feature 2'],
  featured: true/false,
  status: 'Under Construction',
  details: {
    bhk: 'BHK Details',
    landParcel: 'Land Area',
    units: 'Number of Units',
    floors: 'Floor Details',
    theme: 'Project Theme',
    fullDescription: ['Description 1', 'Description 2']
  }
}
```

## Admin Panel

The admin panel is accessible at `/admin` and includes:

- **Dashboard**: Overview of leads and enquiries
- **Leads Management**: View and manage customer enquiries
- **Settings**: Admin configuration

### Admin Access

To access the admin panel, you'll need to implement authentication. Currently, the admin routes are publicly accessible.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: Redux Toolkit (for admin features)
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
