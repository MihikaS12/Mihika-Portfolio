#!/usr/bin/env python3
"""
Setup script for Mihika Sharma's Portfolio Backend
This script sets up the Flask backend with all necessary configurations.
"""

import os
import sys
import subprocess
from pathlib import Path

def create_directory_structure():
    """Create necessary directory structure for the backend"""
    directories = [
        'static/resume',
        'static/images',
        'templates',
        'logs'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def create_env_file():
    """Create environment file template"""
    env_content = """# Flask Configuration
FLASK_APP=flask_backend.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Database Configuration (if needed)
DATABASE_URL=sqlite:///portfolio.db

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✓ Created .env file template")
    print("  Please update the email credentials in .env file")

def install_dependencies():
    """Install Python dependencies"""
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✓ Installed Python dependencies")
    except subprocess.CalledProcessError as e:
        print(f"✗ Failed to install dependencies: {e}")
        return False
    return True

def create_wsgi_file():
    """Create WSGI file for production deployment"""
    wsgi_content = """#!/usr/bin/env python3
from flask_backend import app

if __name__ == "__main__":
    app.run()
"""
    
    with open('wsgi.py', 'w') as f:
        f.write(wsgi_content)
    
    print("✓ Created WSGI file for production deployment")

def create_dockerfile():
    """Create Dockerfile for containerization"""
    dockerfile_content = """FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]
"""
    
    with open('Dockerfile', 'w') as f:
        f.write(dockerfile_content)
    
    print("✓ Created Dockerfile")

def create_nginx_config():
    """Create Nginx configuration template"""
    nginx_content = """server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /path/to/your/app/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
"""
    
    with open('nginx.conf', 'w') as f:
        f.write(nginx_content)
    
    print("✓ Created Nginx configuration template")

def main():
    """Main setup function"""
    print("🚀 Setting up Mihika Sharma's Portfolio Backend...")
    print("=" * 50)
    
    # Create directory structure
    create_directory_structure()
    
    # Create configuration files
    create_env_file()
    create_wsgi_file()
    create_dockerfile()
    create_nginx_config()
    
    # Install dependencies
    if install_dependencies():
        print("\n✅ Backend setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Update the .env file with your email credentials")
        print("2. Place the resume PDF in static/resume/ directory")
        print("3. Run the backend with: python flask_backend.py")
        print("4. The API will be available at http://localhost:5000")
        print("\n🔧 For production deployment:")
        print("1. Use gunicorn: gunicorn --bind 0.0.0.0:5000 wsgi:app")
        print("2. Configure Nginx using the provided nginx.conf template")
        print("3. Set up SSL certificates for HTTPS")
    else:
        print("\n❌ Setup failed. Please check the error messages above.")

if __name__ == "__main__":
    main()
