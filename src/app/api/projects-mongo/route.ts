import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Project, projects as initialProjects } from '@/data/projects';

// MongoDB connection (example implementation)
let mongoClient: any = null;

const connectToMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!mongoClient) {
    // In a real implementation, you would import and use the MongoDB driver
    // const { MongoClient } = require('mongodb');
    // mongoClient = new MongoClient(process.env.MONGODB_URI);
    // await mongoClient.connect();
    console.log('MongoDB connection would be established here');
  }

  return mongoClient;
};

// GET - Fetch all projects
export async function GET() {
  try {
    console.log('GET /api/projects-mongo - Fetching projects from MongoDB');
    
    if (!process.env.MONGODB_URI) {
      // Fallback to static data if MongoDB is not configured
      console.log('MongoDB not configured, using static data');
      return NextResponse.json({ 
        success: true, 
        projects: initialProjects,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        note: 'Using static data - configure MongoDB for dynamic projects'
      });
    }

    // In a real implementation, you would:
    // const client = await connectToMongo();
    // const db = client.db('sobha');
    // const collection = db.collection('projects');
    // const projects = await collection.find({}).toArray();
    
    // For now, return static data with a note
    return NextResponse.json({ 
      success: true, 
      projects: initialProjects,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      note: 'MongoDB implementation example - replace with actual database calls'
    });
  } catch (error) {
    console.error('GET /api/projects-mongo - Error fetching projects:', error);
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
    
    console.log('POST /api/projects-mongo - Received data:', { id: data.id, title: data.title });
    
    // Validate required fields
    if (!data.title || !data.description || !data.location || !data.city || !data.price) {
      console.error('POST /api/projects-mongo - Missing required fields');
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

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB not configured. Please set up MONGODB_URI environment variable.' },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // const client = await connectToMongo();
    // const db = client.db('sobha');
    // const collection = db.collection('projects');
    
    // Check if project with same ID already exists
    // const existingProject = await collection.findOne({ id: newProject.id });
    
    // if (existingProject) {
    //   // Update existing project
    //   await collection.updateOne({ id: newProject.id }, { $set: newProject });
    // } else {
    //   // Add new project
    //   await collection.insertOne(newProject);
    // }

    console.log('Project would be saved to MongoDB:', newProject);

    return NextResponse.json({ 
      success: true, 
      message: 'Project saved to MongoDB (example implementation)',
      project: newProject,
      note: 'This is an example - implement actual MongoDB operations'
    });
  } catch (error) {
    console.error('POST /api/projects-mongo - Error processing project:', error);
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
    
    console.log('PUT /api/projects-mongo - Received data:', { id: data.id, title: data.title });
    
    if (!data.id) {
      console.error('PUT /api/projects-mongo - Missing project ID');
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB not configured. Please set up MONGODB_URI environment variable.' },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // const client = await connectToMongo();
    // const db = client.db('sobha');
    // const collection = db.collection('projects');
    
    // const result = await collection.updateOne(
    //   { id: data.id },
    //   { $set: data }
    // );
    
    // if (result.matchedCount === 0) {
    //   return NextResponse.json(
    //     { error: 'Project not found' },
    //     { status: 404 }
    //   );
    // }

    console.log('Project would be updated in MongoDB:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Project updated in MongoDB (example implementation)',
      project: data,
      note: 'This is an example - implement actual MongoDB operations'
    });
  } catch (error) {
    console.error('PUT /api/projects-mongo - Error updating project:', error);
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

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MongoDB not configured. Please set up MONGODB_URI environment variable.' },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // const client = await connectToMongo();
    // const db = client.db('sobha');
    // const collection = db.collection('projects');
    
    // const result = await collection.deleteOne({ id: id });
    
    // if (result.deletedCount === 0) {
    //   return NextResponse.json(
    //     { error: 'Project not found' },
    //     { status: 404 }
    //   );
    // }

    console.log('Project would be deleted from MongoDB:', id);

    return NextResponse.json({ 
      success: true, 
      message: 'Project deleted from MongoDB (example implementation)',
      note: 'This is an example - implement actual MongoDB operations'
    });
  } catch (error) {
    console.error('DELETE /api/projects-mongo - Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 