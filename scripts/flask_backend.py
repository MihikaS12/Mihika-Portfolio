from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USER = 'your-email@gmail.com'  # Replace with your email
EMAIL_PASS = 'your-app-password'     # Replace with your app password

@app.route('/')
def home():
    return jsonify({
        "message": "Mihika Sharma Portfolio API",
        "version": "1.0.0",
        "endpoints": [
            "/api/contact",
            "/api/resume/download"
        ]
    })

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        name = data['name'].strip()
        email = data['email'].strip()
        message = data['message'].strip()
        
        # Create email content
        subject = f"Portfolio Contact: Message from {name}"
        
        # HTML email template
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1e40af;">Contact Details:</h3>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    </div>
                    
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1e40af;">Message:</h3>
                        <p style="white-space: pre-wrap;">{message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
                        <p>This message was sent from your portfolio website contact form.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = 'sharmamihika76@gmail.com'  # Mihika's email
        msg['Reply-To'] = email
        
        # Add HTML part
        html_part = MIMEText(html_body, 'html')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        
        # Log the contact (in production, you might want to save to database)
        print(f"Contact form submission from {name} ({email}) at {datetime.now()}")
        
        return jsonify({
            "success": True,
            "message": "Message sent successfully! I'll get back to you soon."
        })
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to send message. Please try again later."
        }), 500

@app.route('/api/resume/download')
def download_resume():
    try:
        # In production, this would be the actual path to the resume file
        resume_path = 'static/resume/Mihika_Sharma_Resume.pdf'
        
        # Check if file exists
        if not os.path.exists(resume_path):
            return jsonify({
                "success": False,
                "error": "Resume file not found"
            }), 404
        
        return send_file(
            resume_path,
            as_attachment=True,
            download_name='Mihika_Sharma_Resume.pdf',
            mimetype='application/pdf'
        )
        
    except Exception as e:
        print(f"Error downloading resume: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to download resume"
        }), 500

@app.route('/api/stats')
def get_stats():
    """Get portfolio statistics"""
    return jsonify({
        "education": {
            "current_cgpa": 9.3,
            "degree": "BCA - Honors in Data Science",
            "university": "Jagran Lakecity University"
        },
        "experience": {
            "total_internships": 3,
            "current_role": "AI/ML Developer Intern",
            "company": "Stick & Dot Media"
        },
        "projects": {
            "total_projects": 6,
            "featured_projects": 5,
            "github_repos": "10+"
        },
        "achievements": {
            "hackathon_rank": "Top 80 out of 1,700",
            "research_papers": 2,
            "leadership_roles": 5
        }
    })

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('static/resume', exist_ok=True)
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)
