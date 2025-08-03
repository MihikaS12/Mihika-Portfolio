#!/usr/bin/env python3
"""
Email Service Setup Guide for Mihika Sharma's Portfolio
This script provides setup instructions for various email services.
"""

def print_service_setup():
    """Print setup instructions for different email services"""
    
    print("📧 Email Service Setup Options")
    print("=" * 50)
    
    print("\n🔥 RECOMMENDED: Resend (Modern, Developer-Friendly)")
    print("1. Sign up at https://resend.com")
    print("2. Get your API key")
    print("3. Add to .env.local: RESEND_API_KEY=your_api_key")
    print("4. Install: npm install resend")
    
    print("\n📮 SendGrid (Popular Choice)")
    print("1. Sign up at https://sendgrid.com")
    print("2. Create an API key")
    print("3. Add to .env.local: SENDGRID_API_KEY=your_api_key")
    print("4. Install: npm install @sendgrid/mail")
    
    print("\n🚀 Mailgun (Reliable)")
    print("1. Sign up at https://mailgun.com")
    print("2. Get your API key and domain")
    print("3. Add to .env.local:")
    print("   MAILGUN_API_KEY=your_api_key")
    print("   MAILGUN_DOMAIN=your_domain")
    print("4. Install: npm install mailgun-js")
    
    print("\n💬 Discord Webhook (Quick Notifications)")
    print("1. Create a Discord server")
    print("2. Go to Server Settings > Integrations > Webhooks")
    print("3. Create a new webhook")
    print("4. Copy the webhook URL")
    print("5. Add to .env.local: DISCORD_WEBHOOK_URL=your_webhook_url")
    
    print("\n📱 Slack Webhook (Team Notifications)")
    print("1. Go to https://api.slack.com/apps")
    print("2. Create a new app")
    print("3. Enable Incoming Webhooks")
    print("4. Create a webhook for your channel")
    print("5. Add to .env.local: WEBHOOK_URL=your_slack_webhook_url")
    
    print("\n🔧 Current Implementation")
    print("- Form submissions are logged to console")
    print("- Data is validated and processed")
    print("- Optional webhook notifications")
    print("- Direct email fallback button")
    
    print("\n✅ Next Steps:")
    print("1. Choose an email service from above")
    print("2. Update the API route with your chosen service")
    print("3. Test the contact form")
    print("4. Monitor submissions and responses")

if __name__ == "__main__":
    print_service_setup()
