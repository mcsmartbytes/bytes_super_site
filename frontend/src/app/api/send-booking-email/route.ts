import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, booking_date, booking_time, notes } = await request.json();

    // Format date and time for display
    const formattedDate = new Date(booking_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Admin notification email
    const adminEmail = {
      to: process.env.SENDGRID_TO_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `New Booking Request - ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c; }
            .label { font-weight: bold; color: #ea580c; margin-top: 15px; display: block; }
            .value { color: #333; margin-top: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🗓️ New Booking Request</h1>
            </div>
            <div class="content">
              <p>You have received a new booking request from your website.</p>

              <div class="booking-details">
                <span class="label">📅 Date & Time:</span>
                <div class="value">${formattedDate} at ${booking_time}</div>

                <span class="label">👤 Client Name:</span>
                <div class="value">${name}</div>

                <span class="label">📧 Email:</span>
                <div class="value">${email}</div>

                ${phone ? `
                  <span class="label">📞 Phone:</span>
                  <div class="value">${phone}</div>
                ` : ''}

                <span class="label">💼 Service:</span>
                <div class="value">${service}</div>

                ${notes ? `
                  <span class="label">📝 Notes:</span>
                  <div class="value">${notes}</div>
                ` : ''}
              </div>

              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Review the booking request in your admin panel</li>
                <li>Check your availability for the requested time</li>
                <li>Send a confirmation email to the client</li>
              </ul>

              <div class="footer">
                <p>MC Smart Bytes | Professional Business Solutions</p>
              </div>
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
      subject: `Booking Request Received - MC Smart Bytes`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c; }
            .label { font-weight: bold; color: #ea580c; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Booking Request Received!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>

              <p>Thank you for requesting a consultation with MC Smart Bytes! I've received your booking request and will review it shortly.</p>

              <div class="booking-summary">
                <p><span class="label">Service:</span> ${service}</p>
                <p><span class="label">Requested Date:</span> ${formattedDate}</p>
                <p><span class="label">Requested Time:</span> ${booking_time}</p>
              </div>

              <p><strong>What happens next?</strong></p>
              <ul>
                <li>I'll review your request within 24 hours</li>
                <li>You'll receive a confirmation email with meeting details</li>
                <li>If the requested time isn't available, I'll suggest alternative times</li>
              </ul>

              <p>If you have any questions in the meantime, feel free to reply to this email.</p>

              <p>Best regards,<br>
              <strong>MC Smart Bytes</strong></p>

              <div class="footer">
                <p>MC Smart Bytes | Professional Business Solutions</p>
                <p>This is an automated confirmation. I'll be in touch soon!</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await sgMail.send(adminEmail);
    await sgMail.send(customerEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
