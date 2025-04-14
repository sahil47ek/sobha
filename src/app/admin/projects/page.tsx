'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cities, projectStatus, type Project } from '@/data/projects';
import { addProject, updateProject, deleteProject } from '@/store/features/projectsSlice';
import { useAppSelector } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdown from '@/components/CustomDropdown';
import { toast } from 'react-hot-toast';

interface ProjectFormData {
  title: string;
  description: string;
  price: string;
  city: string;
  status: string;
  location: string;
  specs: string;
  image: string | null;
  gallery: string[];
  featured: boolean;
  badges: string[];
  videoUrl?: string;
  details: {
    bhk: string;
    landParcel: string;
    units: string;
    floors: string;
    theme: string;
    fullDescription: string[];
  }
}

// Add email sending function
const sendProjectEmail = async (projectData: Project) => {
  try {
    const response = await fetch('/api/send-project-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `New Project Lead: ${projectData.title}`,
        projectDetails: {
          title: projectData.title,
          description: projectData.description,
          price: projectData.price,
          location: projectData.location,
          city: projectData.city,
          status: projectData.status,
          specs: projectData.specs,
          details: projectData.details,
          featured: projectData.featured ? 'Yes' : 'No'
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending project email:', error);
    throw error;
  }
};

export default function ProjectsManagement() {
  const dispatch = useDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    price: '',
    city: '',
    status: '',
    location: '',
    specs: '',
    image: null,
    gallery: [],
    featured: false,
    badges: [],
    videoUrl: '',
    details: {
      bhk: '',
      landParcel: '',
      units: '',
      floors: '',
      theme: '',
      fullDescription: []
    }
  });

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested details object
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'details') {
      setFormData(prev => ({
        ...prev,
          details: {
            ...prev.details,
            [child]: value
          }
      }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      } as ProjectFormData));
    }
  };

  const handleEditProduct = (project: Project) => {
    const formDataToSet = {
      title: project.title,
      description: project.description,
      price: project.price,
      city: project.city,
      status: project.status,
      location: project.location,
      specs: project.specs,
      image: project.image || null,
      gallery: project.gallery || [],
      featured: project.featured,
      badges: project.badges || [],
      videoUrl: project.videoUrl || '',
      details: {
        bhk: project.details?.bhk || '',
        landParcel: project.details?.landParcel || '',
        units: project.details?.units || '',
        floors: project.details?.floors || '',
        theme: project.details?.theme || '',
        fullDescription: project.details?.fullDescription || []
      }
    };

    setEditingProject(project);
    setFormData(formDataToSet);
    // Set existing main image preview
    setMainImagePreview(project.image || '');
    // Set existing gallery previews
    setGalleryPreviews(project.gallery || []);
    // Reset file states when editing
    setMainImage(null);
    setGalleryImages([]);
    setVideoFile(null);
    setVideoPreview('');
    setModalOpen(true);

    // Save to localStorage after state is set
    localStorage.setItem('editingProject', JSON.stringify(project));
    localStorage.setItem('formData', JSON.stringify(formDataToSet));
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedProject = localStorage.getItem('editingProject');
    const savedFormData = localStorage.getItem('formData');
    
    if (savedProject && savedFormData && isModalOpen) {
      try {
        const project = JSON.parse(savedProject);
        const formData = JSON.parse(savedFormData);
        
        setEditingProject(project);
        setFormData(formData);
        setMainImagePreview(formData.image || '');
        setGalleryPreviews(formData.gallery || []);
        setVideoPreview(formData.videoUrl || '');
      } catch (error) {
        console.error('Error loading saved form data:', error);
        // Clear invalid data from localStorage
        localStorage.removeItem('editingProject');
        localStorage.removeItem('formData');
      }
    }
  }, [isModalOpen]);

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId));
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      const preview = URL.createObjectURL(file);
      setMainImagePreview(preview);
      setFormData(prev => ({
        ...prev,
        image: preview
      }));
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Limit to 6 images
      const newFiles = files.slice(0, 6);
      setGalleryImages(prev => [...prev, ...newFiles].slice(0, 6));
      
      // Create previews for gallery images
      const previews = newFiles.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...previews].slice(0, 6));
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...previews].slice(0, 6)
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    const isExistingImage = !galleryImages[index];
    
    if (isExistingImage) {
      // If it's an existing image, just remove from formData and preview
      setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index)
      }));
    } else {
      // If it's a new image, remove from all states
      setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index)
      }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
      return data.path;
      } catch (error) {
        console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a valid video file');
        return;
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('Video file size should be less than 100MB');
        return;
      }

      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideoPreview(preview);
      setFormData(prev => ({
        ...prev,
        videoUrl: preview
      }));
    }
  };

  const uploadVideo = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'video');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const data = await response.json();
      return data.path;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Show loading state
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitButton.innerText;
      submitButton.disabled = true;
      submitButton.innerText = 'Saving...';

      // Upload main image if changed
      let mainImageUrl = formData.image;
      if (mainImage) {
        try {
          mainImageUrl = await uploadImage(mainImage);
        } catch (error) {
          console.error('Error uploading main image:', error);
          alert('Failed to upload main image. Please try again.');
          submitButton.disabled = false;
          submitButton.innerText = originalText;
          return;
        }
      }

      // Handle gallery images
      let galleryUrls = [...formData.gallery];
      
      // Upload new gallery images
      if (galleryImages.length > 0) {
        try {
          const uploadedUrls = await Promise.all(
            galleryImages.map(file => uploadImage(file))
          );
          
          // Replace the temporary preview URLs with actual uploaded URLs
          galleryUrls = uploadedUrls;
        } catch (error) {
          console.error('Error uploading gallery images:', error);
          alert('Failed to upload gallery images. Please try again.');
          submitButton.disabled = false;
          submitButton.innerText = originalText;
          return;
        }
      }

      let videoUrl = formData.videoUrl;
      if (videoFile) {
        videoUrl = await uploadVideo(videoFile);
      }

      const projectData: Project = {
        id: editingProject?.id || uuidv4(),
        title: formData.title,
        subtitle: formData.title,
        description: formData.description,
        location: formData.location,
        city: formData.city,
        price: formData.price,
        specs: formData.specs,
        image: mainImageUrl || '',
        status: formData.status,
        featured: formData.featured,
        badges: [formData.status], // Add status as a badge
        gallery: galleryUrls,
        videoUrl: videoUrl,
        amenities: editingProject?.amenities || [],
        features: editingProject?.features || [],
        details: {
          bhk: formData.details.bhk,
          landParcel: formData.details.landParcel,
          units: formData.details.units,
          floors: formData.details.floors,
          theme: formData.details.theme,
          fullDescription: formData.details.fullDescription ? 
            formData.details.fullDescription : []
        }
      };

      // Send email with project details
      try {
        await sendProjectEmail(projectData);
      } catch (error) {
        console.error('Error sending project email:', error);
        // Continue with form submission even if email fails
      }

      if (editingProject) {
        dispatch(updateProject(projectData));
      } else {
        dispatch(addProject(projectData));
      }

      // Clear localStorage
      localStorage.removeItem('editingProject');
      localStorage.removeItem('formData');

      setModalOpen(false);
      setEditingProject(null);
      
      // Reset all states
      setMainImage(null);
      setMainImagePreview('');
      setGalleryImages([]);
      setGalleryPreviews([]);
      setVideoFile(null);
      setVideoPreview('');
      setFormData({
        title: '',
        description: '',
        price: '',
        city: '',
        status: '',
        location: '',
        specs: '',
        image: null,
        gallery: [],
        featured: false,
        badges: [],
        videoUrl: '',
        details: {
          bhk: '',
          landParcel: '',
          units: '',
          floors: '',
          theme: '',
          fullDescription: []
        }
      });

      // Show success message
      alert(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      city: '',
      status: '',
      location: '',
      specs: '',
      image: null,
      gallery: [],
      featured: false,
      badges: [],
      videoUrl: '',
      details: {
        bhk: '',
        landParcel: '',
        units: '',
        floors: '',
        theme: '',
        fullDescription: []
      }
    });
    setMainImagePreview('');
    setGalleryPreviews([]);
    setGalleryImages([]);
    setVideoPreview('');
    setVideoFile(null);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, and manage your real estate projects
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 text-white bg-black rounded-lg hover:bg-black/80 transition-colors duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {project.image ? (
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={project.image}
                        alt={project.title}
                      />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500">{project.specs}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{project.location}</div>
                  <div className="text-sm text-gray-500">{project.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      dispatch(updateProject({
                        ...project,
                        featured: !project.featured
                      }));
                    }}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                      project.featured ? 'bg-black' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        project.featured ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditProduct(project)}
                    className="text-black hover:text-black/80 mr-3 transition-colors duration-300"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-black hover:text-black/80 transition-colors duration-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title and City */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <CustomDropdown
                    options={cities.map(city => ({ value: city, label: city }))}
                    value={formData.city}
                    onChange={(value) => {
                      setFormData(prev => ({
                        ...prev,
                        city: value
                      }));
                    }}
                    placeholder="Select City"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={4}
                  placeholder="Project description"
                />
              </div>

              {/* Price and Location */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="₹0.00 Cr*"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Specific location"
                  />
                </div>
              </div>

              {/* Status and Specifications */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <CustomDropdown
                    options={projectStatus.map(status => ({ value: status, label: status }))}
                    value={formData.status}
                    onChange={(value) => {
                      setFormData(prev => ({
                        ...prev,
                        status: value
                      }));
                    }}
                    placeholder="Select Status"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications
                  </label>
                  <input
                    name="specs"
                    type="text"
                    required
                    value={formData.specs}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 3 & 4 BHK Luxury Apartments"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    BHK Types
                </label>
                <input
                    name="details.bhk"
                  type="text"
                  required
                    value={formData.details.bhk}
                    onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 2, 3 & 4 BHK"
                />
              </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land Parcel
                  </label>
                  <input
                    name="details.landParcel"
                    type="text"
                    required
                    value={formData.details.landParcel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 25 Acres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Units
                  </label>
                  <input
                    name="details.units"
                    type="text"
                    required
                    value={formData.details.units}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 1500+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floors
                  </label>
                  <input
                    name="details.floors"
                    type="text"
                    required
                    value={formData.details.floors}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., G + 30"
                  />
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <input
                  name="details.theme"
                    type="text"
                    required
                  value={formData.details.theme}
                  onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Modern Living Redefined"
                />
              </div>

              {/* Main Project Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Project Image
                </label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                      id="main-image-upload"
                    />
                    <label
                      htmlFor="main-image-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Choose Main Image
                    </label>
                  </div>

                  {/* Main Image Preview */}
                  {mainImagePreview && (
                    <div className="relative w-full h-48">
                      <img
                        src={mainImagePreview}
                        alt="Main project image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Up to 6)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImageChange}
                      className="hidden"
                      id="gallery-images-upload"
                    />
                    <label
                      htmlFor="gallery-images-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Choose Gallery Images
                    </label>
                    <span className="text-sm text-gray-500">
                      {galleryPreviews.length > 0 ? `${galleryPreviews.length} images selected` : 'No gallery images chosen'}
                    </span>
                  </div>

                  {/* Gallery Previews */}
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {galleryPreviews.map((preview, index) => (
                        preview && (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Gallery preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Video
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-black file:text-white
                      hover:file:bg-black/80"
                  />
                  {videoPreview && (
                    <div className="relative">
                      <video
                        src={videoPreview}
                        className="h-20 w-36 object-cover rounded"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null);
                          setVideoPreview('');
                          setFormData(prev => ({ ...prev, videoUrl: '' }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a video file (MP4, WebM, etc.) up to 100MB
                </p>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Featured Project
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      featured: !prev.featured
                    }));
                  }}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    formData.featured ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.featured ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('editingProject');
                    localStorage.removeItem('formData');
                    setModalOpen(false);
                  }}
                  className="px-4 py-2 text-black border border-black hover:bg-black/5 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors duration-300"
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 