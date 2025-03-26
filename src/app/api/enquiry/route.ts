import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahil.ek@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // You'll need to set this up
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, source, propertyInterest, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Additional validation for project enquiries
    if (source === 'Project Enquiry') {
      const { projectId, projectTitle } = body;
      if (!projectId || !projectTitle) {
        return NextResponse.json(
          { error: 'Project ID and title are required for project enquiries' },
          { status: 400 }
        );
      }
    }

    // Additional validation for contact form
    if (source === 'Contact Form') {
      if (!propertyInterest || !message) {
        return NextResponse.json(
          { error: 'Property interest and message are required for contact form' },
          { status: 400 }
        );
      }
    }

    // Create new lead object
    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      propertyInterest: source === 'Project Enquiry' ? body.projectTitle : propertyInterest,
      message: source === 'Project Enquiry' ? `Interested in ${body.projectTitle}` : message,
      date: new Date().toISOString(),
      status: 'new'
    };

    // Read existing leads
    const filePath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads = [];
    
    // Read the file
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      leads = JSON.parse(fileContent);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      leads = [];
    }

    // Add new lead to the beginning of the array
    leads.unshift(newLead);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2));

    // Send email notification
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Lead Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Property Interest:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${propertyInterest}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `;

      await transporter.sendMail({
        from: 'Sobha Real Estate <sahil.ek@gmail.com>',
        to: 'sahil.ek@gmail.com',
        subject: 'New Lead from Contact Form',
        html: emailHtml,
      });

      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue with the submission even if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
} 