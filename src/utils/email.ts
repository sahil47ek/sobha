interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  project?: string;
  message?: string;
  timestamp: string;
}

export async function sendLeadNotificationEmail(lead: Lead): Promise<void> {
  // TODO: Implement your email sending logic here
  // This is a placeholder that logs the lead information
  console.log('Email notification would be sent for lead:', {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    project: lead.project || 'Not specified',
    message: lead.message || 'No message',
    timestamp: lead.timestamp
  });
} 