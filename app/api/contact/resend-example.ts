// Example implementation with Resend (recommended)
// Uncomment and modify this if you want to use Resend

/*
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, company } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send notification email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <noreply@yourdomain.com>',
      to: ['sharmamihika76@gmail.com'],
      replyTo: email,
      subject: `🚀 Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Portfolio Contact!</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    if (error) {
      throw error
    }

    // Send confirmation email to sender
    await resend.emails.send({
      from: 'Mihika Sharma <noreply@yourdomain.com>',
      to: [email],
      subject: 'Thank you for contacting Mihika Sharma',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Thank You for Reaching Out!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for contacting me through my portfolio website! I've received your message about "<strong>${subject}</strong>" and I truly appreciate you taking the time to reach out.</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>⏰ What's Next?</strong><br>
            I'll carefully review your message and get back to you within 24 hours.
          </div>
          <p>Best regards,<br><strong>Mihika Sharma</strong></p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
*/
