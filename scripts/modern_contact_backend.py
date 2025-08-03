from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import logging
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://your-domain.com"])

# Email configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
RECIPIENT_EMAIL = 'sharmamihika76@gmail.com'

def validate_email(email):
    """Basic email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_notification_email(form_data):
    """Send modern notification email to Mihika"""
    try:
        # Modern HTML email template
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Portfolio Contact - Mihika Sharma</title>
            <style>
                body {{ 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6; 
                    color: #1e293b; 
                    margin: 0; 
                    padding: 0; 
                    background-color: #f8fafc;
                }}
                .container {{ 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: white; 
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }}
                .header {{ 
                    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                    color: white; 
                    padding: 40px 30px; 
                    text-align: center; 
                }}
                .header h1 {{ 
                    margin: 0; 
                    font-size: 28px; 
                    font-weight: 700;
                    letter-spacing: -0.025em;
                }}
                .header p {{
                    margin: 12px 0 0 0;
                    opacity: 0.9;
                    font-size: 16px;
                }}
                .content {{ 
                    padding: 40px 30px; 
                }}
                .priority-banner {{
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    font-weight: 600;
                    text-align: center;
                }}
                .field {{ 
                    margin-bottom: 24px; 
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 12px;
                    border-left: 4px solid #2563eb;
                    transition: all 0.2s ease;
                }}
                .field:hover {{
                    background: #f1f5f9;
                    transform: translateX(2px);
                }}
                .label {{ 
                    font-weight: 600; 
                    color: #1e293b; 
                    font-size: 14px; 
                    text-transform: uppercase; 
                    letter-spacing: 0.05em; 
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }}
                .value {{ 
                    color: #475569; 
                    font-size: 16px;
                    word-wrap: break-word;
                    line-height: 1.5;
                }}
                .message-box {{ 
                    background: white; 
                    padding: 24px; 
                    border-radius: 12px; 
                    border-left: 4px solid #f59e0b; 
                    margin-top: 12px; 
                    white-space: pre-wrap; 
                    line-height: 1.6;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }}
                .footer {{ 
                    background: #1e293b; 
                    color: white; 
                    padding: 30px; 
                    text-align: center; 
                }}
                .footer p {{
                    margin: 8px
