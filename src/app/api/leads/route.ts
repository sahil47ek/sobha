import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

export async function POST(request: Request) {
  try {
    const lead = await request.json();

    // Validate required fields
    if (!lead.id || !lead.name || !lead.email || !lead.phone) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Read the current leads
    const filePath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads: Lead[] = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      leads = JSON.parse(fileContent);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      leads = [];
    }

    // Add the new lead
    leads.unshift(lead);

    // Write back to the file
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read the current leads
    const filePath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads: Lead[] = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
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