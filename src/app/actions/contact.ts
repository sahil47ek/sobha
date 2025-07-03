'use server'

import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function submitContactForm(data: ContactFormData) {
  try {
    if (!ADMIN_EMAIL) throw new Error('ADMIN_EMAIL env variable not set');
    if (!resend) throw new Error('Resend API key not configured');
    
    // Send email via Resend
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.subject}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.message}</td></tr>
        </table>
      </div>
    `;
    await resend.emails.send({
      from: 'Sobha Real Estate <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: data.subject || 'New Contact Form Submission',
      html,
      replyTo: data.email,
    });
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}

export async function sendContactForm(formData: FormData) {
  try {
    if (!ADMIN_EMAIL) throw new Error('ADMIN_EMAIL env variable not set');
    if (!resend) throw new Error('Resend API key not configured');
    
    // Process form data here
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string || 'New Contact Form Submission';
    const message = formData.get('message') as string;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${subject}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td></tr>
        </table>
      </div>
    `;
    await resend.emails.send({
      from: 'Sobha Real Estate <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject,
      html,
      replyTo: email,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { success: false, error: 'Failed to send message' };
  }
} 