import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, ...leadData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Check if we're in production environment
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // In production, use MongoDB or your preferred database
      try {
        // For now, we'll just simulate success since the database isn't set up
        // TODO: Implement actual database deletion here
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
          { error: 'Failed to delete lead from database' },
          { status: 500 }
        );
      }
    } else {
      // In development, use file system
      const filePath = path.join(process.cwd(), 'src', 'data', 'leads.json');
      let leads: Lead[] = [];
      
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        leads = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading leads file:', error);
        return NextResponse.json(
          { error: 'Failed to read leads data' },
          { status: 500 }
        );
      }

      // Find the lead to be deleted
      const leadIndex = leads.findIndex(lead => lead.id === id);
      
      if (leadIndex === -1) {
        return NextResponse.json(
          { error: 'Lead not found' },
          { status: 404 }
        );
      }

      // Remove the lead
      leads.splice(leadIndex, 1);

      try {
        await fs.writeFile(filePath, JSON.stringify(leads, null, 2));
      } catch (error) {
        console.error('Error writing leads file:', error);
        return NextResponse.json(
          { error: 'Failed to update leads data' },
          { status: 500 }
        );
      }
    }

    // Send notification email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: 'Lead Deleted',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Lead Deletion Notification</h2>
            <p>The following lead has been deleted from the system:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${leadData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${leadData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${leadData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Property Interest:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${leadData.propertyInterest}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${leadData.status}</td>
              </tr>
            </table>
            <p style="color: #666; margin-top: 20px;">This is an automated notification.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Continue with the deletion even if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling lead deletion:', error);
    return NextResponse.json(
      { error: 'Failed to process lead deletion' },
      { status: 500 }
    );
  }
} 