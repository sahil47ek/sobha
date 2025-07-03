import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest?: string;
  projectId?: string;
  projectTitle?: string;
  message?: string;
  source: string;
  date: string;
  status: string;
}

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Additional validation for project enquiries
    if (data.source === 'Project Enquiry') {
      if (!data.projectId || !data.projectTitle) {
        return NextResponse.json(
          { error: 'Project ID and title are required for project enquiries' },
          { status: 400 }
        );
      }
    }

    // Additional validation for contact form
    if (data.source === 'Contact Form') {
      if (!data.propertyInterest || !data.message) {
        return NextResponse.json(
          { error: 'Property interest and message are required for contact form' },
          { status: 400 }
        );
      }
    }

    // Create new lead object
    const newLead: Lead = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      propertyInterest: data.propertyInterest || 'Not specified',
      projectId: data.projectId || undefined,
      projectTitle: data.projectTitle || undefined,
      message: data.message || '',
      source: data.source || 'Contact Form',
      date: new Date().toISOString(),
      status: 'New'
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

    // Add new lead
    leads.push(newLead);

    // Save updated leads
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(leads, null, 2));
    } catch (error) {
      console.error('Error writing to leads file:', error);
      throw new Error('Failed to save lead');
    }

    // Send email notification
    try {
      if (resend) {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Lead Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Property Interest:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.propertyInterest}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.message}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
        `;

        await resend.emails.send({
          from: 'Sobha Real Estate <onboarding@resend.dev>',
          to: ['sahil.ek@gmail.com'],
          subject: 'New Lead from Contact Form',
          html: emailHtml,
        });

        console.log('Email notification sent successfully');
      } else {
        console.log('Resend API key not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue with the submission even if email fails
    }

    return NextResponse.json({ 
      success: true,
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