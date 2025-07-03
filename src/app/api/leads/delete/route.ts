import { NextResponse } from 'next/server';
import { Resend } from 'resend';
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
    await fs.access(filePath);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(filePath, '[]');
  }
  return filePath;
}

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

    // Ensure leads file exists and get its path
    const filePath = await ensureLeadsFile();
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

    // Send notification email
    try {
      if (resend) {
        await resend.emails.send({
          from: 'Sobha Real Estate <onboarding@resend.dev>',
          to: [process.env.ADMIN_EMAIL!],
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
      } else {
        console.log('Resend API key not configured, skipping email notification');
      }
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