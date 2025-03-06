'use client';

import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cities, projectStatus, type Project } from '@/data/projects';
import { addProject, updateProject, deleteProject } from '@/store/features/projectsSlice';
import { useAppSelector } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdown from '@/components/CustomDropdown';

export default function ProjectsManagement() {
  const dispatch = useDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEdit = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setImagePreview(project.image);
      setGalleryPreviews(project.gallery || []);
    } else {
      setEditingProject(null);
      setImagePreview('');
      setGalleryPreviews([]);
    }
    setSelectedImages([]);
    setModalOpen(true);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const mainImage = files[0];
      setSelectedImages(prev => [...prev, ...files].slice(0, 6));
      
      // Create previews for all selected images
      const previews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...previews].slice(0, 6));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
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
        uploadedUrls.push(data.path);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      // Upload all selected images
      const uploadedUrls = await uploadImages(selectedImages);
      
      // Use the first uploaded image as the main image, or keep existing one
      const mainImageUrl = uploadedUrls[0] || editingProject?.image || '/properties/default-project.jpg';
      
      // Combine existing gallery images with new ones
      const existingGallery = editingProject?.gallery || [];
      const newGallery = [...existingGallery, ...uploadedUrls].slice(0, 6);

      const projectData: Project = {
        id: editingProject?.id || uuidv4(),
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        city: formData.get('city') as string,
        price: formData.get('price') as string,
        specs: formData.get('specs') as string,
        image: mainImageUrl,
        status: formData.get('status') as string,
        featured: formData.get('featured') === 'true',
        badges: [], // Will be populated based on status and features
        gallery: newGallery,
        amenities: [],
        features: [],
        details: {
          bhk: formData.get('bhk') as string,
          landParcel: formData.get('landParcel') as string,
          units: formData.get('units') as string,
          floors: formData.get('floors') as string,
          theme: formData.get('theme') as string,
          fullDescription: editingProject?.details?.fullDescription || []
        }
      };

      if (editingProject) {
        dispatch(updateProject(projectData));
      } else {
        dispatch(addProject(projectData));
      }

      setModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
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
          onClick={() => handleAddEdit()}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={project.image}
                        alt={project.title}
                      />
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
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      project.featured ? 'bg-primary' : 'bg-gray-200'
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
                    onClick={() => handleAddEdit(project)}
                    className="text-primary hover:text-primary-dark mr-3"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-900"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            {/* Project Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Project title"
                    defaultValue={editingProject?.title}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <CustomDropdown
                    options={cities.map(city => ({ value: city, label: city }))}
                    value={editingProject?.city || ''}
                    onChange={(value) => {
                      const cityInput = document.querySelector('input[name="city"]') as HTMLInputElement;
                      if (cityInput) cityInput.value = value;
                    }}
                    placeholder="Select City"
                  />
                  <input type="hidden" name="city" defaultValue={editingProject?.city} />
                </div>
              </div>

              {/* Add Image Input after Title and City */}
              <div className="col-span-2 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image
                </label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Choose Image
                    </label>
                    
                    <span className="text-sm text-gray-500">
                      {selectedImages.length > 0 ? selectedImages[0].name : 'No file chosen'}
                    </span>
                    {imagePreview && (
                      <div className="h-16 w-16 flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Project preview"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Image Preview */}
                  <div className="flex items-center space-x-4">
                   
                    
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Project subtitle"
                  defaultValue={editingProject?.subtitle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={4}
                  placeholder="Project description"
                  defaultValue={editingProject?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="₹0.00 Cr*"
                    defaultValue={editingProject?.price}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Specific location"
                    defaultValue={editingProject?.location}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <CustomDropdown
                    options={projectStatus.map(status => ({ value: status, label: status }))}
                    value={editingProject?.status || ''}
                    onChange={(value) => {
                      const statusInput = document.querySelector('input[name="status"]') as HTMLInputElement;
                      if (statusInput) statusInput.value = value;
                    }}
                    placeholder="Select Status"
                  />
                  <input type="hidden" name="status" defaultValue={editingProject?.status} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge
                  </label>
                  <input
                    name="badge"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Premium Location"
                    defaultValue={editingProject?.badges?.[1]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specifications
                </label>
                <input
                  name="specs"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 3 & 4 BHK Luxury Apartments"
                  defaultValue={editingProject?.specs}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land Parcel
                  </label>
                  <input
                    name="landParcel"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 25 Acres"
                    defaultValue={editingProject?.details?.landParcel}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Units
                  </label>
                  <input
                    name="units"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 1500+"
                    defaultValue={editingProject?.details?.units}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floors
                  </label>
                  <input
                    name="floors"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., G + 30"
                    defaultValue={editingProject?.details?.floors}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <input
                    name="theme"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Modern Living Redefined"
                    defaultValue={editingProject?.details?.theme}
                  />
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Featured Project
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('form') as HTMLFormElement;
                    const featuredInput = form.querySelector('[name="featured"]') as HTMLInputElement;
                    featuredInput.value = featuredInput.value === 'true' ? 'false' : 'true';
                    featuredInput.dispatchEvent(new Event('change'));
                  }}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    editingProject?.featured ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      editingProject?.featured ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <input
                  type="hidden"
                  name="featured"
                  defaultValue={String(editingProject?.featured || false)}
                />
              </div>

              {/* Add the gallery images input in your form */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Up to 6)
                </label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Gallery preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p className="mt-2 text-sm text-gray-500">Select up to 6 images for the project gallery.</p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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