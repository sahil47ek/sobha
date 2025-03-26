import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ProjectDetails {
  [key: string]: string | number | boolean | ProjectDetails;
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
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
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
