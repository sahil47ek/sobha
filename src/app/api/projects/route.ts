import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Project, projects as initialProjects } from '@/data/projects';

// Ensure the projects file exists
const ensureProjectsFile = async (): Promise<string> => {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'projects.json');

  try {
    await fs.promises.access(dataDir);
  } catch {
    await fs.promises.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.promises.access(filePath);
    // Check if file is empty or has invalid JSON
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const projects = JSON.parse(fileContent);
    
    // If file is empty or has no projects, initialize with static data
    if (!Array.isArray(projects) || projects.length === 0) {
      await fs.promises.writeFile(filePath, JSON.stringify(initialProjects, null, 2));
    }
  } catch {
    // Initialize with static data if file doesn't exist or is invalid
    await fs.promises.writeFile(filePath, JSON.stringify(initialProjects, null, 2));
  }

  return filePath;
};

// GET - Fetch all projects
export async function GET() {
  try {
    const filePath = await ensureProjectsFile();
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const projects = JSON.parse(fileContent);

    return NextResponse.json({ 
      success: true, 
      projects 
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.location || !data.city || !data.price) {
      return NextResponse.json(
        { error: 'Title, description, location, city, and price are required' },
        { status: 400 }
      );
    }

    // Create new project with ID
    const newProject: Project = {
      id: data.id || uuidv4(),
      title: data.title,
      subtitle: data.subtitle || '',
      description: data.description,
      location: data.location,
      city: data.city,
      price: data.price,
      specs: data.specs || data.details?.bhk || '',
      badges: data.badges || [data.status || 'Under Construction'],
      amenities: data.amenities || [],
      features: data.features || [],
      featured: data.featured || false,
      status: data.status || 'Under Construction',
      details: {
        bhk: data.details?.bhk || '',
        landParcel: data.details?.landParcel || '',
        units: data.details?.units || '',
        floors: data.details?.floors || '',
        theme: data.details?.theme || '',
        fullDescription: data.details?.fullDescription || []
      }
    };

    // Get the projects file path and ensure it exists
    const filePath = await ensureProjectsFile();
    let projects = [];
    
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      projects = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading projects file:', error);
    }

    // Check if project with same ID already exists
    const existingIndex = projects.findIndex((p: Project) => p.id === newProject.id);
    
    if (existingIndex !== -1) {
      // Update existing project
      projects[existingIndex] = newProject;
    } else {
      // Add new project
      projects.push(newProject);
    }

    try {
      await fs.promises.writeFile(filePath, JSON.stringify(projects, null, 2));
    } catch (error) {
      console.error('Error writing to projects file:', error);
      throw new Error('Failed to save project');
    }

    return NextResponse.json({ 
      success: true, 
      message: existingIndex !== -1 ? 'Project updated successfully' : 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error('Error processing project:', error);
    return NextResponse.json(
      { error: 'Failed to process project' },
      { status: 500 }
    );
  }
}

// PUT - Update a project
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const filePath = await ensureProjectsFile();
    let projects = [];
    
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      projects = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading projects file:', error);
      return NextResponse.json(
        { error: 'Failed to read projects' },
        { status: 500 }
      );
    }

    const projectIndex = projects.findIndex((p: Project) => p.id === data.id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update the project
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...data,
      id: data.id // Ensure ID doesn't change
    };

    try {
      await fs.promises.writeFile(filePath, JSON.stringify(projects, null, 2));
    } catch (error) {
      console.error('Error writing to projects file:', error);
      throw new Error('Failed to update project');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Project updated successfully',
      project: projects[projectIndex]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const filePath = await ensureProjectsFile();
    let projects = [];
    
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      projects = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading projects file:', error);
      return NextResponse.json(
        { error: 'Failed to read projects' },
        { status: 500 }
      );
    }

    const projectIndex = projects.findIndex((p: Project) => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Remove the project
    projects.splice(projectIndex, 1);

    try {
      await fs.promises.writeFile(filePath, JSON.stringify(projects, null, 2));
    } catch (error) {
      console.error('Error writing to projects file:', error);
      throw new Error('Failed to delete project');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 