'use client';

import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cities, projectStatus, type Project } from '@/data/projects';
import { addProject, updateProject, deleteProject } from '@/store/features/projectsSlice';
import { useAppSelector } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdown from '@/components/CustomDropdown';

interface ProjectFormData {
  title: string;
  description: string;
  price: string;
  city: string;
  status: string;
  location: string;
  specs: string;
  image: string;
  gallery: string[];
  featured: boolean;
  badges: string[];
  details: {
    bhk: string;
    landParcel: string;
    units: string;
    floors: string;
    theme: string;
    fullDescription: string[];
  }
}

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
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    price: '',
    city: '',
    status: '',
    location: '',
    specs: '',
    image: '',
    gallery: [],
    featured: false,
    badges: [],
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditProduct = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      price: project.price,
      city: project.city,
      status: project.status,
      location: project.location,
      specs: project.specs,
      image: project.image,
      gallery: project.gallery || [],
      featured: project.featured,
      badges: project.badges || [],
      details: {
        bhk: project.details?.bhk || '',
        landParcel: project.details?.landParcel || '',
        units: project.details?.units || '',
        floors: project.details?.floors || '',
        theme: project.details?.theme || '',
        fullDescription: project.details?.fullDescription || []
      }
    });
    // Set existing main image preview
    setMainImagePreview(project.image || '');
    // Set existing gallery previews
    setGalleryPreviews(project.gallery || []);
    setModalOpen(true);
  };

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
      setGalleryImages(newFiles);
      
      // Create previews for gallery images
      const previews = newFiles.map(file => URL.createObjectURL(file));
      setGalleryPreviews(previews);
      setFormData(prev => ({
        ...prev,
        gallery: previews
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Upload main image if changed
      let mainImageUrl = formData.image;
      if (mainImage) {
        mainImageUrl = await uploadImage(mainImage);
      }

      // Upload gallery images if changed
      let galleryUrls = formData.gallery;
      if (galleryImages.length > 0) {
        galleryUrls = await Promise.all(galleryImages.map(file => uploadImage(file)));
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
        image: mainImageUrl,
        status: formData.status,
        featured: formData.featured,
        badges: formData.badges,
        gallery: galleryUrls,
        amenities: editingProject?.amenities || [],
        features: editingProject?.features || [],
        details: {
          bhk: formData.details.bhk,
          landParcel: formData.details.landParcel,
          units: formData.details.units,
          floors: formData.details.floors,
          theme: formData.details.theme,
          fullDescription: formData.details.fullDescription
        }
      };

      if (editingProject) {
        dispatch(updateProject(projectData));
      } else {
        dispatch(addProject(projectData));
      }

      setModalOpen(false);
      setEditingProject(null);
      // Reset image states
      setMainImage(null);
      setMainImagePreview('');
      setGalleryImages([]);
      setGalleryPreviews([]);
    } catch (error) {
      console.error('Error submitting project:', error);
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
      image: '',
      gallery: [],
      featured: false,
      badges: [],
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                      ))}
                    </div>
                  )}
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

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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