import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ProjectDetails {
  [key: string]: string | number | boolean | ProjectDetails;
}

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Format project details into HTML
const formatProjectDetails = (details: ProjectDetails): string => {
  return Object.entries(details)
    .map(([key, value]): string => {
      if (typeof value === 'object' && value !== null) {
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">${key}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${formatProjectDetails(value as ProjectDetails)}
            </td>
          </tr>
        `;
      }
      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">${key}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${value}</td>
        </tr>
      `;
    })
    .join('');
};

export async function POST(request: Request) {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = ['ADMIN_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json(
        { error: 'Email configuration is incomplete. Please check environment variables.' },
        { status: 500 }
      );
    }

    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { subject, projectDetails } = body;

    // Create HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Project Lead Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${formatProjectDetails(projectDetails)}
        </table>
      </div>
    `;

    // Send email
    await resend.emails.send({
      from: 'Sobha Real Estate <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL!],
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 
