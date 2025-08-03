from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'your-email@gmail.com')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'your-app-password')
RECIPIENT_EMAIL = 'sharmamihika76@gmail.com'

def send_notification_email(form_data):
    """Send notification email to Mihika"""
    try:
        # Create HTML email content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Portfolio Contact - Mihika Sharma</title>
            <style>
                body {{ 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    line-height: 1.6; 
                    color: rgb(27, 60, 83); 
                    margin: 0; 
                    padding: 0; 
                    background-color: rgb(249, 243, 239);
                }}
                .container {{ 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: white; 
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(27, 60, 83, 0.1);
                }}
                .header {{ 
                    background: linear-gradient(135deg, rgb(27, 60, 83) 0%, rgb(69, 104, 130) 100%); 
                    color: white; 
                    padding: 30px 20px; 
                    text-align: center; 
                }}
                .header h1 {{ 
                    margin: 0; 
                    font-size: 24px; 
                    font-weight: 600;
                }}
                .content {{ 
                    padding: 30px 20px; 
                    background: rgb(249, 243, 239);
                }}
                .field {{ 
                    margin-bottom: 20px; 
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid rgb(69, 104, 130);
                }}
                .label {{ 
                    font-weight: 600; 
                    color: rgb(27, 60, 83); 
                    font-size: 14px; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px; 
                    margin-bottom: 8px;
                }}
                .value {{ 
                    color: rgb(69, 104, 130); 
                    font-size: 16px;
                    word-wrap: break-word;
                }}
                .message-box {{ 
                    background: white; 
                    padding: 20px; 
                    border-radius: 8px; 
                    border-left: 4px solid rgb(210, 193, 182); 
                    margin-top: 10px; 
                    white-space: pre-wrap; 
                    line-height: 1.6;
                }}
                .footer {{ 
                    background: rgb(27, 60, 83); 
                    color: white; 
                    padding: 20px; 
                    text-align: center; 
                    font-size: 12px; 
                }}
                .priority {{ 
                    background: rgb(210, 193, 182); 
                    color: rgb(27, 60, 83);
                    padding: 15px; 
                    border-radius: 8px; 
                    margin-bottom: 20px; 
                    font-weight: 600;
                }}
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
                        <div class="value">{form_data['name']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email Address</div>
                        <div class="value"><a href="mailto:{form_data['email']}" style="color: rgb(69, 104, 130);">{form_data['email']}</a></div>
                    </div>
                    
                    {f'''
                    <div class="field">
                        <div class="label">📱 Phone Number</div>
                        <div class="value">{form_data['phone']}</div>
                    </div>
                    ''' if form_data.get('phone') else ''}
                    
                    {f'''
                    <div class="field">
                        <div class="label">🏢 Company/Organization</div>
                        <div class="value">{form_data['company']}</div>
                    </div>
                    ''' if form_data.get('company') else ''}
                    
                    <div class="field">
                        <div class="label">📋 Subject</div>
                        <div class="value">{form_data['subject']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Message</div>
                        <div class="message-box">{form_data['message']}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>📅 Received: {datetime.now().strftime('%B %d, %Y at %I:%M %p IST')}</p>
                    <p>💻 Sent from your portfolio website contact form</p>
                    <p>🔗 <a href="mailto:{form_data['email']}?subject=Re: {form_data['subject']}" style="color: rgb(210, 193, 182);">Reply directly to this contact</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🚀 Portfolio Contact: {form_data['subject']}"
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = form_data['email']
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Notification email sent for contact: {form_data['email']}")
        return True
        
    except Exception as e:
        logger.error(f"Email sending error: {e}")
        return False

def send_confirmation_email(form_data):
    """Send confirmation email to the contact"""
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank you for contacting Mihika Sharma</title>
            <style>
                body {{ 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    line-height: 1.6; 
                    color: rgb(27, 60, 83); 
                    margin: 0; 
                    padding: 0; 
                    background-color: rgb(249, 243, 239);
                }}
                .container {{ 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: white; 
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(27, 60, 83, 0.1);
                }}
                .header {{ 
                    background: linear-gradient(135deg, rgb(27, 60, 83) 0%, rgb(69, 104, 130) 100%); 
                    color: white; 
                    padding: 40px 20px; 
                    text-align: center; 
                }}
                .content {{ 
                    padding: 30px 20px; 
                    background: rgb(249, 243, 239);
                }}
                .footer {{ 
                    background: rgb(27, 60, 83); 
                    color: white; 
                    padding: 20px; 
                    text-align: center; 
                }}
                .highlight {{ 
                    background: white; 
                    padding: 15px; 
                    border-radius: 8px; 
                    border-left: 4px solid rgb(210, 193, 182); 
                    margin: 20px 0; 
                }}
                a {{ color: rgb(69, 104, 130); text-decoration: none; }}
                a:hover {{ text-decoration: underline; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✨ Thank You for Reaching Out!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
                </div>
                
                <div class="content">
                    <p>Hi <strong>{form_data['name']}</strong>,</p>
                    
                    <p>Thank you for contacting me through my portfolio website! I've received your message about "<strong>{form_data['subject']}</strong>" and I truly appreciate you taking the time to reach out.</p>
                    
                    <div class="highlight">
                        <strong>⏰ What's Next?</strong><br>
                        I'll carefully review your message and get back to you within 24 hours. If your inquiry is urgent, feel free to reach me directly at <a href="mailto:sharmamihika76@gmail.com">sharmamihika76@gmail.com</a>.
                    </div>
                    
                    <p>I'm excited about the possibility of working together and discussing how I can contribute to your project or organization.</p>
                    
                    <p>Best regards,<br>
                    <strong>Mihika Sharma</strong><br>
                    <em>Data Science Explorer | Python Programmer | AI Enthusiast</em></p>
                </div>
                
                <div class="footer">
                    <p>💼 LinkedIn: <a href="https://linkedin.com/in/mihika-sharma-/" style="color: rgb(210, 193, 182);">linkedin.com/in/mihika-sharma-/</a></p>
                    <p>🔗 GitHub: <a href="https://github.com/MihikaS12" style="color: rgb(210, 193, 182);">github.com/MihikaS12</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Thank you for contacting Mihika Sharma"
        msg['From'] = SMTP_USERNAME
        msg['To'] = form_data['email']
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Confirmation email sent to: {form_data['email']}")
        return True
        
    except Exception as e:
        logger.error(f"Confirmation email error: {e}")
        return False

@app.route('/')
def home():
    return jsonify({
        "message": "Mihika Sharma Portfolio Contact API",
        "status": "active",
        "version": "1.0.0"
    })

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        # Prepare form data
        form_data = {
            'name': data['name'].strip(),
            'email': data['email'].strip().lower(),
            'phone': data.get('phone', '').strip(),
            'company': data.get('company', '').strip(),
            'subject': data['subject'].strip(),
            'message': data['message'].strip()
        }
        
        # Send notification email to Mihika
        notification_sent = send_notification_email(form_data)
        
        # Send confirmation email to the contact
        confirmation_sent = send_confirmation_email(form_data)
        
        if notification_sent and confirmation_sent:
            return jsonify({
                "success": True,
                "message": "Thank you for your message! I'll get back to you within 24 hours."
            })
        elif notification_sent:
            return jsonify({
                "success": True,
                "message": "Your message has been sent successfully! I'll get back to you soon."
            })
        else:
            return jsonify({
                "success": False,
                "error": "There was an issue sending your message. Please try again or contact me directly."
            }), 500
        
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        return jsonify({
            "success": False,
            "error": "An unexpected error occurred. Please try again later."
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
