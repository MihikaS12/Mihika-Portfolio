#!/usr/bin/env python3
"""
Webhook Setup Guide for Mihika Sharma's Portfolio
This script provides step-by-step instructions for setting up webhooks.
"""

def print_discord_setup():
    """Print Discord webhook setup instructions"""
    print("🎮 Discord Webhook Setup")
    print("=" * 30)
    print("1. Create a Discord server (or use existing)")
    print("2. Go to Server Settings > Integrations")
    print("3. Click 'Create Webhook'")
    print("4. Choose a channel (e.g., #portfolio-contacts)")
    print("5. Customize name and avatar (optional)")
    print("6. Copy the Webhook URL")
    print("7. Add to .env.local:")
    print("   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...")
    print()

def print_slack_setup():
    """Print Slack webhook setup instructions"""
    print("💬 Slack Webhook Setup")
    print("=" * 25)
    print("1. Go to https://api.slack.com/apps")
    print("2. Click 'Create New App' > 'From scratch'")
    print("3. Name your app and select workspace")
    print("4. Go to 'Incoming Webhooks'")
    print("5. Toggle 'Activate Incoming Webhooks' to On")
    print("6. Click 'Add New Webhook to Workspace'")
    print("7. Choose a channel")
    print("8. Copy the Webhook URL")
    print("9. Add to .env.local:")
    print("   WEBHOOK_URL=https://hooks.slack.com/services/...")
    print()

def print_testing_guide():
    """Print testing instructions"""
    print("🧪 Testing Your Setup")
    print("=" * 20)
    print("1. Fill out the contact form on your website")
    print("2. Check your browser console for logs")
    print("3. Check Discord/Slack for notifications")
    print("4. Verify all form data is captured correctly")
    print()
    print("📊 Monitoring")
    print("=" * 12)
    print("- Check server logs for form submissions")
    print("- Monitor webhook delivery status")
    print("- Track response times and errors")
    print()

def print_troubleshooting():
    """Print troubleshooting tips"""
    print("🔧 Troubleshooting")
    print("=" * 17)
    print("❌ Webhook not working?")
    print("  - Check webhook URL is correct")
    print("  - Verify environment variables are loaded")
    print("  - Test webhook URL with curl or Postman")
    print()
    print("❌ Form not submitting?")
    print("  - Check browser console for errors")
    print("  - Verify API route is accessible")
    print("  - Check network tab for failed requests")
    print()
    print("❌ Data not appearing?")
    print("  - Check server logs/console")
    print("  - Verify JSON structure matches expected format")
    print("  - Test with minimal data first")
    print()

def main():
    """Main function to display all setup information"""
    print("🚀 Portfolio Contact Form Setup Guide")
    print("=" * 40)
    print()
    
    print_discord_setup()
    print_slack_setup()
    print_testing_guide()
    print_troubleshooting()
    
    print("✅ Quick Start:")
    print("1. Choose Discord OR Slack (or both)")
    print("2. Follow setup instructions above")
    print("3. Add webhook URL to .env.local")
    print("4. Restart your development server")
    print("5. Test the contact form")
    print()
    print("🎯 The form works without webhooks too!")
    print("   All submissions are logged to console.")

if __name__ == "__main__":
    main()
