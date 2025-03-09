import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, source } = body;

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
      const { propertyInterest, message } = body;
      if (!propertyInterest || !message) {
        return NextResponse.json(
          { error: 'Property interest and message are required for contact form' },
          { status: 400 }
        );
      }
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Integrate with CRM
    // For now, we'll just simulate a successful save
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        message: 'Enquiry received successfully',
        enquiry: body
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 