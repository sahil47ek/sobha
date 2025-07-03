'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cities, projectStatus, type Project, City, ProjectStatus } from '@/data/projects';
import { addProject, updateProject, deleteProject } from '@/store/features/projectsSlice';
import { useAppSelector } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdown from '@/components/CustomDropdown';
import { toast } from 'react-hot-toast';
import { setLoading, setProjects, setError } from '@/store/features/projectsSlice';

// Utility function to safely parse JSON responses
const safeJsonParse = async (response: Response) => {
  try {
    return await response.json();
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return { error: 'Invalid response from server' };
  }
};

interface ProjectFormData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  city: City;
  price: string;
  badges: string[];
  amenities: string[];
  features: string[];
  featured: boolean;
  status: ProjectStatus;
  details: {
    bhk: string;
    landParcel: string;
    units: string;
    floors: string;
    theme: string;
    fullDescription: string[];
  };
}

// Add email sending function
const sendProjectEmail = async (projectData: Project) => {
  try {
    // Validate input
    if (!projectData || !projectData.title) {
      return { success: false, error: 'Invalid project data' };
    }

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
          specs: projectData.details.bhk,
          details: projectData.details,
          featured: projectData.featured ? 'Yes' : 'No'
        }
      }),
    });

    // Handle network errors
    if (!response) {
      return { success: false, error: 'Network error: No response from server' };
    }

    // Parse response safely
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return { success: false, error: 'Invalid response format from server' };
    }

    // Handle API errors
    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`;
      return { success: false, error: errorMessage };
    }

    // Return success
    return data || { success: true };
  } catch (error) {
    console.error('Error in sendProjectEmail:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export default function ProjectsManagement() {
  const dispatch = useDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<ProjectFormData>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    price: '',
    city: cities[0],
    status: projectStatus[0],
    location: '',
    badges: [],
    amenities: [],
    features: [],
    featured: false,
    details: {
      bhk: '',
      landParcel: '',
      units: '',
      floors: '',
      theme: '',
      fullDescription: []
    }
  });

  // Fetch projects from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch('/api/projects');
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          data = { error: 'Invalid response from server' };
        }
        
        if (response.ok && data.success) {
          dispatch(setProjects(data.projects));
        } else {
          console.error('Failed to fetch projects:', data?.error);
          dispatch(setError(data?.error || 'Failed to fetch projects'));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        dispatch(setError('Failed to fetch projects'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProjects();
  }, [dispatch]);

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
    const formDataToSet: ProjectFormData = {
      id: project.id,
      title: project.title,
      subtitle: project.subtitle || '',
      description: project.description,
      price: project.price,
      city: project.city as City,
      status: project.status as ProjectStatus,
      location: project.location,
      badges: project.badges || [],
      amenities: project.amenities || [],
      features: project.features || [],
      featured: project.featured,
      details: {
        bhk: project.details?.bhk || '',
        landParcel: project.details?.landParcel || '',
        units: project.details?.units || '',
        floors: project.details?.floors || '',
        theme: project.details?.theme || '',
        fullDescription: project.details?.fullDescription || [],
      },
    };
    setFormData(formDataToSet);
    setEditingProject(project);
    setModalOpen(true);

    // Save to localStorage after state is set
    localStorage.setItem('editingProject', JSON.stringify(project));
    localStorage.setItem('formData', JSON.stringify(formDataToSet));
  };

  const handleCityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      city: value as City
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value as ProjectStatus
    }));
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
      } catch (error) {
        console.error('Error loading saved form data:', error);
        // Clear invalid data from localStorage
        localStorage.removeItem('editingProject');
        localStorage.removeItem('formData');
      }
    }
  }, [isModalOpen]);

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // Make API call to delete project
        const apiResponse = await fetch(`/api/projects?id=${projectId}`, {
          method: 'DELETE',
        });

        const apiData = await safeJsonParse(apiResponse);

        if (!apiResponse.ok) {
          throw new Error(apiData?.error || 'Failed to delete project');
        }

        // Update Redux store after successful API call
        dispatch(deleteProject(projectId));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Error deleting project. Please try again.');
      }
    }
  };

  const handleFeaturedToggle = async (project: Project) => {
    try {
      const updatedProject = {
        ...project,
        featured: !project.featured
      };

      // Make API call to update project
      const apiResponse = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      const apiData = await safeJsonParse(apiResponse);

      if (!apiResponse.ok) {
        throw new Error(apiData?.error || 'Failed to update project');
      }

      // Update Redux store after successful API call
      dispatch(updateProject(apiData.project || updatedProject));
      toast.success(`Project ${updatedProject.featured ? 'featured' : 'unfeatured'} successfully!`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Error updating project. Please try again.');
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

      const projectData = {
        id: editingProject?.id || uuidv4(),
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        location: formData.location,
        city: formData.city,
        price: formData.price,
        specs: formData.details.bhk,
        status: formData.status,
        featured: formData.featured,
        badges: [formData.status],
        amenities: formData.amenities,
        features: formData.features,
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
      const emailResult = await sendProjectEmail(projectData);
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error);
        // Continue with form submission even if email fails
      }

      // Make API call to save/update project
      const apiResponse = await fetch('/api/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      console.log('API Response status:', apiResponse.status);
      console.log('API Response headers:', Object.fromEntries(apiResponse.headers.entries()));

      const apiData = await safeJsonParse(apiResponse);
      console.log('API Response data:', apiData);

      if (!apiResponse.ok) {
        const errorMessage = apiData?.error || `HTTP ${apiResponse.status}: ${apiResponse.statusText}`;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      // Update Redux store with the response from API
      if (editingProject) {
        dispatch(updateProject(apiData.project || projectData));
      } else {
        dispatch(addProject(apiData.project || projectData));
      }

      // Clear localStorage
      localStorage.removeItem('editingProject');
      localStorage.removeItem('formData');

      setModalOpen(false);
      setEditingProject(null);
      
      // Reset form
      setFormData({
        id: '',
        title: '',
        subtitle: '',
        description: '',
        price: '',
        city: cities[0],
        status: projectStatus[0],
        location: '',
        badges: [],
        amenities: [],
        features: [],
        featured: false,
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
      toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error('Error saving project. Please try again.');
    } finally {
      // Reset button state
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = editingProject ? 'Update Project' : 'Add Project';
      }
    }
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      price: '',
      city: cities[0],
      status: projectStatus[0],
      location: '',
      badges: [],
      amenities: [],
      features: [],
      featured: false,
      details: {
        bhk: '',
        landParcel: '',
        units: '',
        floors: '',
        theme: '',
        fullDescription: []
      }
    });
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
                      <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Project</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500">{project.details.bhk}</div>
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
                    onClick={() => handleFeaturedToggle(project)}
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
                    onChange={handleCityChange}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <CustomDropdown
                  options={projectStatus.map(status => ({ value: status, label: status }))}
                  value={formData.status}
                  onChange={handleStatusChange}
                  placeholder="Select Status"
                />
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