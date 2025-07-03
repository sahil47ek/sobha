import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '@/data/projects';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// Initialize with empty array - will be populated from API
const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProjects: (state) => {
      state.projects = [];
    },
    addProject: (state, action: PayloadAction<Project>) => {
      // Ensure ID is a string
      const newProject = {
        ...action.payload,
        id: action.payload.id.toString()
      };
      state.projects.push(newProject);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id.toString() === action.payload.id.toString());
      if (index !== -1) {
        // Ensure ID is a string
        state.projects[index] = {
          ...action.payload,
          id: action.payload.id.toString()
        };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id.toString() !== action.payload.toString());
    },
    // Add action to set all projects
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload.map(project => ({
        ...project,
        id: project.id.toString()
      }));
    },
  },
});

export const { 
  addProject, 
  updateProject, 
  deleteProject, 
  setProjects, 
  resetProjects, 
  setLoading, 
  setError 
} = projectsSlice.actions;
export default projectsSlice.reducer; 