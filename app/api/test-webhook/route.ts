import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json(
        {
          error: "No webhook URL configured",
          message: "Add DISCORD_WEBHOOK_URL or WEBHOOK_URL to your .env.local file",
        },
        { status: 400 },
      )
    }

    const isDiscord = webhookUrl.includes("discord.com")

    let testPayload

    if (isDiscord) {
      // Discord test message
      testPayload = {
        embeds: [
          {
            title: "🧪 Webhook Test",
            description: "This is a test message from your portfolio contact form!",
            color: 0x00ff00, // Green color
            fields: [
              { name: "Status", value: "✅ Working correctly", inline: true },
              { name: "Time", value: new Date().toLocaleString(), inline: true },
            ],
            footer: {
              text: "Portfolio Contact Form Test",
            },
          },
        ],
      }
    } else {
      // Slack test message
      testPayload = {
        text: "🧪 *Webhook Test*\n\n✅ Your webhook is working correctly!\n\n*Time:* " + new Date().toLocaleString(),
      }
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    })

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Test webhook sent successfully!",
        webhookType: isDiscord ? "Discord" : "Slack",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Webhook failed",
          status: response.status,
          statusText: response.statusText,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Webhook test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test webhook",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
