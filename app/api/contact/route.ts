import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, company } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Prepare contact data
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "Not provided",
      company: company?.trim() || "Not provided",
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "Unknown",
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
    }

    // Log the contact submission
    console.log("📧 New Contact Form Submission:")
    console.log("=" * 50)
    console.log(`👤 Name: ${contactData.name}`)
    console.log(`📧 Email: ${contactData.email}`)
    console.log(`📱 Phone: ${contactData.phone}`)
    console.log(`🏢 Company: ${contactData.company}`)
    console.log(`📋 Subject: ${contactData.subject}`)
    console.log(`💬 Message: ${contactData.message}`)
    console.log(`⏰ Time: ${new Date(contactData.timestamp).toLocaleString()}`)
    console.log("=" * 50)

    // Try to send webhook notification (Discord/Slack)
    let notificationSent = false
    try {
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.WEBHOOK_URL

      if (webhookUrl) {
        const isDiscord = webhookUrl.includes("discord.com")

        let webhookPayload

        if (isDiscord) {
          // Discord webhook format
          webhookPayload = {
            embeds: [
              {
                title: "🚀 New Portfolio Contact!",
                color: 0x6366f1, // Blue color
                fields: [
                  { name: "👤 Name", value: contactData.name, inline: true },
                  { name: "📧 Email", value: contactData.email, inline: true },
                  { name: "📱 Phone", value: contactData.phone, inline: true },
                  { name: "🏢 Company", value: contactData.company, inline: true },
                  { name: "📋 Subject", value: contactData.subject, inline: false },
                  {
                    name: "💬 Message",
                    value:
                      contactData.message.length > 1000
                        ? contactData.message.substring(0, 1000) + "..."
                        : contactData.message,
                    inline: false,
                  },
                ],
                timestamp: contactData.timestamp,
                footer: {
                  text: "Portfolio Contact Form",
                },
              },
            ],
          }
        } else {
          // Slack webhook format
          webhookPayload = {
            text: `🚀 *New Portfolio Contact!*\n\n*Name:* ${contactData.name}\n*Email:* ${contactData.email}\n*Phone:* ${contactData.phone}\n*Company:* ${contactData.company}\n*Subject:* ${contactData.subject}\n*Message:*\n${contactData.message}\n\n*Time:* ${new Date(contactData.timestamp).toLocaleString()}`,
          }
        }

        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookPayload),
        })

        if (webhookResponse.ok) {
          notificationSent = true
          console.log("✅ Webhook notification sent successfully")
        } else {
          console.log("❌ Webhook notification failed:", webhookResponse.status)
        }
      }
    } catch (webhookError) {
      console.error("Webhook notification error:", webhookError)
    }

    // Try to send email using a web-based email service
    let emailSent = false
    try {
      // Using EmailJS or similar service (if configured)
      const emailServiceUrl = process.env.EMAIL_SERVICE_URL
      const emailApiKey = process.env.EMAIL_API_KEY

      if (emailServiceUrl && emailApiKey) {
        const emailPayload = {
          to: "sharmamihika76@gmail.com",
          from: "noreply@portfolio.com",
          subject: `🚀 Portfolio Contact: ${contactData.subject}`,
          html: generateEmailHTML(contactData),
          replyTo: contactData.email,
        }

        const emailResponse = await fetch(emailServiceUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${emailApiKey}`,
          },
          body: JSON.stringify(emailPayload),
        })

        if (emailResponse.ok) {
          emailSent = true
          console.log("✅ Email sent successfully")
        }
      }
    } catch (emailError) {
      console.error("Email service error:", emailError)
    }

    // Store in a simple JSON file or database (optional)
    try {
      // In a real application, you would save to a database
      // For now, we'll just log it structured for easy parsing
      const logEntry = {
        id: `contact_${Date.now()}`,
        ...contactData,
        notificationSent,
        emailSent,
        status: "new",
      }

      console.log("💾 Contact Data (JSON):", JSON.stringify(logEntry, null, 2))
    } catch (storageError) {
      console.error("Storage error:", storageError)
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours.",
      data: {
        id: `contact_${Date.now()}`,
        timestamp: contactData.timestamp,
        notificationSent,
        emailSent,
      },
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

function generateEmailHTML(contactData: any): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Portfolio Contact</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600;
          }
          .content { 
            padding: 30px 20px; 
          }
          .field { 
            margin-bottom: 20px; 
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
          }
          .label { 
            font-weight: 600; 
            color: #1e293b; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            margin-bottom: 8px;
          }
          .value { 
            color: #475569; 
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-box { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #f59e0b; 
            margin-top: 10px; 
            white-space: pre-wrap; 
            line-height: 1.6;
          }
          .footer { 
            background: #1e293b; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
          }
          .priority { 
            background: #fef3c7; 
            color: #92400e;
            padding: 15px; 
            border-radius: 8px; 
            margin-bottom: 20px; 
            font-weight: 600;
            border-left: 4px solid #f59e0b;
          }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Portfolio Contact!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone wants to work with you</p>
          </div>
          
          <div class="content">
            <div class="priority">
              <strong>⚡ Action Required:</strong> New contact form submission received
            </div>
            
            <div class="field">
              <div class="label">👤 Full Name</div>
              <div class="value">${contactData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email Address</div>
              <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Phone Number</div>
              <div class="value">${contactData.phone}</div>
            </div>
            
            <div class="field">
              <div class="label">🏢 Company/Organization</div>
              <div class="value">${contactData.company}</div>
            </div>
            
            <div class="field">
              <div class="label">📋 Subject</div>
              <div class="value">${contactData.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-box">${contactData.message.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>📅 Received: ${new Date(contactData.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            <p>💻 Sent from your portfolio website contact form</p>
            <p>🔗 <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" style="color: #94a3b8;">Reply directly to this contact</a></p>
          </div>
        </div>
      </body>
    </html>
  `
}
