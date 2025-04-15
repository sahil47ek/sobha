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

export async function POST(request: Request) {
  try {
    const lead = await request.json();
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Add timestamp and ID to the lead
    const newLead = {
      ...lead,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    if (isProduction) {
      // In production, we'll just send the email notification
      // TODO: Add your database logic here
      console.log('Production environment - Lead would be saved to database:', newLead);
    } else {
      // In development, save to file
      const filePath = path.join(process.cwd(), 'leads.json');
      let leads = [];
      
      try {
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          leads = JSON.parse(fileContent);
        }
      } catch (error) {
        console.error('Error reading leads file:', error);
      }

      leads.push(newLead);

      try {
        fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
      } catch (error) {
        console.error('Error writing to leads file:', error);
        throw new Error('Failed to save lead');
      }
    }

    // Send email notification regardless of environment
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
    // Read the current leads
    const filePath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads: Lead[] = [];
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
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