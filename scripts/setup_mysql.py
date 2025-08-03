#!/usr/bin/env python3
"""
MySQL Database Setup for Mihika Sharma's Portfolio
This script sets up the MySQL database and tables required for the portfolio backend.
"""

import mysql.connector
from mysql.connector import Error
import os
import sys

def create_database_connection():
    """Create connection to MySQL server"""
    try:
        connection = mysql.connector.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', ''),
            port=int(os.environ.get('DB_PORT', 3306))
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def create_database():
    """Create the portfolio database"""
    connection = create_database_connection()
    if not connection:
        return False
    
    try:
        cursor = connection.cursor()
        
        # Create database
        database_name = os.environ.get('DB_NAME', 'portfolio_db')
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")
        print(f"✓ Database '{database_name}' created successfully")
        
        # Use the database
        cursor.execute(f"USE {database_name}")
        
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
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            status ENUM('new', 'read', 'replied') DEFAULT 'new',
            ip_address VARCHAR(45),
            user_agent TEXT,
            INDEX idx_email (email),
            INDEX idx_created_at (created_at),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        """
        
        cursor.execute(create_contacts_table)
        print("✓ Contacts table created successfully")
        
        # Create analytics table
        create_analytics_table = """
        CREATE TABLE IF NOT EXISTS analytics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            event_type VARCHAR(100) NOT NULL,
            event_data JSON,
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_event_type (event_type),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        """
        
        cursor.execute(create_analytics_table)
        print("✓ Analytics table created successfully")
        
        connection.commit()
        return True
        
    except Error as e:
        print(f"Error creating database: {e}")
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def create_sample_data():
    """Create sample data for testing"""
    try:
        connection = mysql.connector.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            database=os.environ.get('DB_NAME', 'portfolio_db'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', ''),
            port=int(os.environ.get('DB_PORT', 3306))
        )
        
        cursor = connection.cursor()
        
        # Insert sample contact
        sample_contact = """
        INSERT INTO contacts (name, email, subject, message, company) 
        VALUES (%s, %s, %s, %s, %s)
        """
        
        cursor.execute(sample_contact, (
            'John Doe',
            'john.doe@example.com',
            'Interested in collaboration',
            'Hi Mihika, I came across your portfolio and I am impressed with your data science projects. Would love to discuss potential collaboration opportunities.',
            'Tech Solutions Inc.'
        ))
        
        connection.commit()
        print("✓ Sample data created successfully")
        
    except Error as e:
        print(f"Error creating sample data: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def main():
    """Main setup function"""
    print("🗄️  Setting up MySQL Database for Portfolio...")
    print("=" * 50)
    
    # Check if MySQL is accessible
    connection = create_database_connection()
    if not connection:
        print("❌ Cannot connect to MySQL server.")
        print("Please ensure MySQL is running and credentials are correct.")
        sys.exit(1)
    
    connection.close()
    print("✓ MySQL server connection successful")
    
    # Create database and tables
    if create_database():
        print("\n✅ Database setup completed successfully!")
        
        # Ask if user wants sample data
        create_sample = input("\nWould you like to create sample data for testing? (y/n): ").lower().strip()
        if create_sample == 'y':
            create_sample_data()
        
        print("\n📋 Database Setup Complete!")
        print("Database Name:", os.environ.get('DB_NAME', 'portfolio_db'))
        print("Tables Created: contacts, analytics")
        print("\n🔧 Next Steps:")
        print("1. Update your .env file with database credentials")
        print("2. Run the Flask backend: python enhanced_backend.py")
        print("3. Test the contact form on your website")
        
    else:
        print("\n❌ Database setup failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
