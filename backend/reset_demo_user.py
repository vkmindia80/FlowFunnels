#!/usr/bin/env python3
"""
Reset Demo User Script
This script forcefully resets the demo user credentials to ensure they work.
Use this if you ever have issues with demo login.
"""

import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv
from passlib.context import CryptContext
import uuid
from datetime import datetime

load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Connect to MongoDB
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.flowfunnels

# Demo credentials (MUST match Login.js)
DEMO_EMAIL = "demo@flowfunnels.com"
DEMO_PASSWORD = "demo123"
DEMO_NAME = "Demo User"

def reset_demo_user():
    """Reset the demo user with correct credentials"""
    print("=" * 60)
    print("RESETTING DEMO USER")
    print("=" * 60)
    
    try:
        # Check if demo user exists
        existing_user = db.users.find_one({"email": DEMO_EMAIL})
        
        if existing_user:
            print(f"\n✓ Found existing demo user: {DEMO_EMAIL}")
            
            # Update with correct password
            db.users.update_one(
                {"email": DEMO_EMAIL},
                {
                    "$set": {
                        "password_hash": pwd_context.hash(DEMO_PASSWORD),
                        "name": DEMO_NAME,
                        "subscription_tier": "free",
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            print("✓ Demo user password reset successfully!")
            user_id = existing_user["id"]
        else:
            print(f"\n✗ Demo user not found. Creating new one...")
            
            # Create new demo user
            user_id = str(uuid.uuid4())
            demo_user = {
                "id": user_id,
                "email": DEMO_EMAIL,
                "password_hash": pwd_context.hash(DEMO_PASSWORD),
                "name": DEMO_NAME,
                "created_at": datetime.utcnow(),
                "subscription_tier": "free"
            }
            
            db.users.insert_one(demo_user)
            print("✓ New demo user created successfully!")
        
        # Ensure demo funnel exists
        existing_funnel = db.funnels.find_one({"user_id": user_id, "name": "Demo Funnel"})
        
        if not existing_funnel:
            print("\n✓ Creating demo funnel...")
            demo_funnel = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "name": "Demo Funnel",
                "description": "Welcome to FlowFunnels! This is your demo funnel.",
                "pages": [],
                "settings": {},
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "published": False
            }
            db.funnels.insert_one(demo_funnel)
            print("✓ Demo funnel created!")
        else:
            print("\n✓ Demo funnel already exists")
        
        print("\n" + "=" * 60)
        print("DEMO USER CREDENTIALS - READY TO USE")
        print("=" * 60)
        print(f"Email:    {DEMO_EMAIL}")
        print(f"Password: {DEMO_PASSWORD}")
        print("=" * 60)
        print("\n✓ Demo user is now ready! You can login with these credentials.")
        print("✓ The auto-fill button on the login page will populate these.")
        print("\nNOTE: The backend now automatically ensures this user exists on startup.")
        
    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    reset_demo_user()
