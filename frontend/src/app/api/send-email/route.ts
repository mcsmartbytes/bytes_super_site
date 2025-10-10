import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // Email to admin (you)
    const adminEmail = {
      to: process.env.SENDGRID_TO_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `🔔 New Inquiry from ${name} - ${service}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}

---
Submitted from MC Smart Bytes website
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #f97316; }
    .label { font-weight: bold; color: #f97316; }
    .message-box { background: white; padding: 20px; margin-top: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🔔 New Contact Form Inquiry</h1>
    </div>
    <div class="content">
      <div class="info-row">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="info-row">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="info-row">
        <span class="label">Service Interested In:</span> ${service}
      </div>
      <div class="message-box">
        <p class="label">Message:</p>
        <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <a href="http://localhost:3000/admin/inquiries"
           style="display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          View in Admin Panel
        </a>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from your MC Smart Bytes contact form</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Customer confirmation email
    const customerEmail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Thank you for contacting MC Smart Bytes',
      text: `
Hi ${name},

Thank you for reaching out to MC Smart Bytes!

We've received your inquiry about ${service} and will get back to you within 24 hours.

In the meantime, feel free to explore our services at www.mcsmartbytes.com.

Best regards,
MC Smart Bytes Team

---
Your message:
${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .footer { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
    .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">MC Smart Bytes</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Business Solutions</p>
    </div>
    <div class="content">
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge">✅ Message Received</span>
      </div>
      <h2 style="color: #f97316; margin-top: 0;">Thank you, ${name}!</h2>
      <p>We've received your inquiry about <strong>${service}</strong> and appreciate you taking the time to reach out.</p>
      <p><strong>What happens next?</strong></p>
      <ul style="margin: 20px 0; padding-left: 20px;">
        <li>We'll review your message within 24 hours</li>
        <li>You'll receive a personalized response via email</li>
        <li>We'll schedule a consultation if needed</li>
      </ul>
      <div style="background: white; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Your message:</strong></p>
        <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="color: #6b7280; font-size: 14px;">If you have any urgent questions, feel free to reply to this email.</p>
    </div>
    <div class="footer">
      <p style="margin: 0 0 10px 0; font-weight: bold;">MC Smart Bytes</p>
      <p style="margin: 0; font-size: 12px; opacity: 0.8;">Professional bookkeeping, Excel solutions, and custom consulting</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send both emails
    await sgMail.send(adminEmail);
    await sgMail.send(customerEmail);

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully'
    });

  } catch (error: any) {
    console.error('Email send error:', error);

    // Return detailed error for debugging
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send email',
        details: error.response?.body || error
      },
      { status: 500 }
    );
  }
}
