import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { sendLeadNotificationEmail } from '@/utils/email';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: string;
  message?: string;
  date: string;
}

// Helper function to get the leads file path
const getLeadsFilePath = () => {
  // In production (Vercel), use /tmp directory which is writable
  const baseDir = process.env.NODE_ENV === 'production' ? '/tmp' : process.cwd();
  return path.join(baseDir, 'leads.json');
};

// Helper function to ensure the leads file exists
async function ensureLeadsFile() {
  const filePath = getLeadsFilePath();
  try {
    await fs.promises.access(filePath);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.promises.writeFile(filePath, '[]');
  }
  return filePath;
}

export async function POST(request: Request) {
  try {
    const lead = await request.json();
    
    // Add timestamp and ID to the lead
    const newLead = {
      ...lead,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    // Get the leads file path and ensure it exists
    const filePath = await ensureLeadsFile();
    let leads = [];
    
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      leads = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading leads file:', error);
    }

    leads.push(newLead);

    try {
      await fs.promises.writeFile(filePath, JSON.stringify(leads, null, 2));
    } catch (error) {
      console.error('Error writing to leads file:', error);
      throw new Error('Failed to save lead');
    }

    // Send email notification
    try {
      await sendLeadNotificationEmail(newLead);
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Don't throw here - we still want to return success if the lead was saved
    }

    return NextResponse.json({ 
      message: 'Lead created successfully',
      lead: newLead 
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get the leads file path and ensure it exists
    const filePath = await ensureLeadsFile();
    let leads: Lead[] = [];
    
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      leads = JSON.parse(fileContent);
    } catch (error) {
      // If file doesn't exist or is empty, return empty array
      leads = [];
    }

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
} 