from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
from mysql.connector import Error
import os
from datetime import datetime
import logging
from werkzeug.security import generate_password_hash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

# Database configuration
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'database': os.environ.get('DB_NAME', 'portfolio_db'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', ''),
    'port': int(os.environ.get('DB_PORT', 3306))
}

mail = Mail(app)

def get_db_connection():
    """Create database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        logger.error(f"Database connection error: {e}")
        return None

def init_database():
    """Initialize database tables"""
    connection = get_db_connection()
    if not connection:
        return False
    
    try:
        cursor = connection.cursor()
        
        # Create contacts table
        create_contacts_table = """
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            company VARCHAR(255),
            subject VARCHAR(500) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('new', 'read', 'replied') DEFAULT 'new',
            ip_address VARCHAR(45)
        )
        """
        
        cursor.execute(create_contacts_table)
        connection.commit()
        logger.info("Database tables initialized successfully")
        return True
        
    except Error as e:
        logger.error(f"Database initialization error: {e}")
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def save_contact_to_db(contact_data):
    """Save contact form data to database"""
    connection = get_db_connection()
    if not connection:
        return False
    
    try:
        cursor = connection.cursor()
        
        insert_query = """
        INSERT INTO contacts (name, email, phone, company, subject, message, ip_address)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(insert_query, (
            contact_data['name'],
            contact_data['email'],
            contact_data.get('phone', ''),
            contact_data.get('company', ''),
            contact_data['subject'],
            contact_data['message'],
            contact_data.get('ip_address', '')
        ))
        
        connection.commit()
        logger.info(f"Contact saved to database: {contact_data['email']}")
        return True
        
    except Error as e:
        logger.error(f"Database save error: {e}")
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def send_notification_email(contact_data):
    """Send notification email to Mihika"""
    try:
        # Create HTML email content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Portfolio Contact</title>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ padding: 30px 20px; }}
                .field {{ margin-bottom: 20px; }}
                .label {{ font-weight: 600; color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }}
                .value {{ margin-top: 8px; padding: 12px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #667eea; }}
                .message-box {{ background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #28a745; margin-top: 10px; white-space: pre-wrap; }}
                .footer {{ background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 12px; }}
                .priority {{ background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin-bottom: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 New Portfolio Contact!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone is interested in working with you</p>
                </div>
                
                <div class="content">
                    <div class="priority">
                        <strong>⚡ Action Required:</strong> New contact form submission received
                    </div>
                    
                    <div class="field">
                        <div class="label">👤 Full Name</div>
                        <div class="value">{contact_data['name']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email Address</div>
                        <div class="value"><a href="mailto:{contact_data['email']}">{contact_data['email']}</a></div>
                    </div>
                    
                    {f'''
                    <div class="field">
                        <div class="label">📱 Phone Number</div>
                        <div class="value">{contact_data['phone']}</div>
                    </div>
                    ''' if contact_data.get('phone') else ''}
                    
                    {f'''
                    <div class="field">
                        <div class="label">🏢 Company/Organization</div>
                        <div class="value">{contact_data['company']}</div>
                    </div>
                    ''' if contact_data.get('company') else ''}
                    
                    <div class="field">
                        <div class="label">📋 Subject</div>
                        <div class="value">{contact_data['subject']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Message</div>
                        <div class="message-box">{contact_data['message']}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>📅 Received: {datetime.now().strftime('%B %d, %Y at %I:%M %p IST')}</p>
                    <p>💻 Sent from your portfolio website contact form</p>
                    <p>🔗 <a href="mailto:{contact_data['email']}?subject=Re: {contact_data['subject']}">Reply directly to this contact</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send email using SMTP
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🚀 Portfolio Contact: {contact_data['subject']}"
        msg['From'] = app.config['MAIL_USERNAME']
        msg['To'] = 'sharmamihika76@gmail.com'
        msg['Reply-To'] = contact_data['email']
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT']) as server:
            server.starttls()
            server.login(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            server.send_message(msg)
        
        logger.info(f"Notification email sent for contact: {contact_data['email']}")
        return True
        
    except Exception as e:
        logger.error(f"Email sending error: {e}")
        return False

def send_confirmation_email(contact_data):
    """Send confirmation email to the contact"""
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank you for contacting Mihika Sharma</title>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }}
                .content {{ padding: 30px 20px; }}
                .footer {{ background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; }}
                .highlight {{ background: #e3f2fd; padding: 15px; border-radius: 6px; border-left: 4px solid #2196f3; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✨ Thank You for Reaching Out!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
                </div>
                
                <div class="content">
                    <p>Hi <strong>{contact_data['name']}</strong>,</p>
                    
                    <p>Thank you for contacting me through my portfolio website! I've received your message about "<strong>{contact_data['subject']}</strong>" and I truly appreciate you taking the time to reach out.</p>
                    
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
                    <p>🌐 Portfolio: <a href="https://your-portfolio-url.com">your-portfolio-url.com</a></p>
                    <p>💼 LinkedIn: <a href="https://linkedin.com/in/mihika-sharma-/">linkedin.com/in/mihika-sharma-/</a></p>
                    <p>🔗 GitHub: <a href="https://github.com/MihikaS12">github.com/MihikaS12</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Thank you for contacting Mihika Sharma"
        msg['From'] = app.config['MAIL_USERNAME']
        msg['To'] = contact_data['email']
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT']) as server:
            server.starttls()
            server.login(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            server.send_message(msg)
        
        logger.info(f"Confirmation email sent to: {contact_data['email']}")
        return True
        
    except Exception as e:
        logger.error(f"Confirmation email error: {e}")
        return False

@app.route('/')
def home():
    return jsonify({
        "message": "Mihika Sharma Portfolio API v2.0",
        "status": "active",
        "endpoints": {
            "contact": "/api/contact",
            "contacts": "/api/contacts",
            "stats": "/api/stats"
        }
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
        
        # Prepare contact data
        contact_data = {
            'name': data['name'].strip(),
            'email': data['email'].strip().lower(),
            'phone': data.get('phone', '').strip(),
            'company': data.get('company', '').strip(),
            'subject': data['subject'].strip(),
            'message': data['message'].strip(),
            'ip_address': request.remote_addr
        }
        
        # Save to database
        db_saved = save_contact_to_db(contact_data)
        
        # Send notification email
        notification_sent = send_notification_email(contact_data)
        
        # Send confirmation email
        confirmation_sent = send_confirmation_email(contact_data)
        
        if notification_sent and confirmation_sent:
            return jsonify({
                "success": True,
                "message": "Thank you for your message! I'll get back to you within 24 hours.",
                "database_saved": db_saved
            })
        else:
            return jsonify({
                "success": True,
                "message": "Message received, but there was an issue with email delivery. I'll still get back to you soon!",
                "database_saved": db_saved
            })
        
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        return jsonify({
            "success": False,
            "error": "An unexpected error occurred. Please try again later."
        }), 500

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    """Get all contacts (admin endpoint)"""
    connection = get_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM contacts ORDER BY created_at DESC")
        contacts = cursor.fetchall()
        
        return jsonify({
            "success": True,
            "contacts": contacts,
            "total": len(contacts)
        })
        
    except Error as e:
        logger.error(f"Get contacts error: {e}")
        return jsonify({"error": "Failed to fetch contacts"}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get portfolio statistics"""
    connection = get_db_connection()
    stats = {
        "portfolio": {
            "total_contacts": 0,
            "new_contacts": 0,
            "this_month": 0
        },
        "profile": {
            "current_cgpa": 9.3,
            "total_projects": 6,
            "internships_completed": 3,
            "hackathon_rank": "Top 80 out of 1,700"
        }
    }
    
    if connection:
        try:
            cursor = connection.cursor()
            
            # Total contacts
            cursor.execute("SELECT COUNT(*) as total FROM contacts")
            result = cursor.fetchone()
            stats["portfolio"]["total_contacts"] = result[0] if result else 0
            
            # New contacts
            cursor.execute("SELECT COUNT(*) as new FROM contacts WHERE status = 'new'")
            result = cursor.fetchone()
            stats["portfolio"]["new_contacts"] = result[0] if result else 0
            
            # This month contacts
            cursor.execute("SELECT COUNT(*) as this_month FROM contacts WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())")
            result = cursor.fetchone()
            stats["portfolio"]["this_month"] = result[0] if result else 0
            
        except Error as e:
            logger.error(f"Stats query error: {e}")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
    
    return jsonify(stats)

if __name__ == '__main__':
    # Initialize database
    init_database()
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)
