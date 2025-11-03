import os
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

# Demo user credentials
demo_email = "demo@flowfunnels.com"
demo_password = "demo123"
demo_name = "Demo User"

print("Creating demo user...")

# Check if demo user already exists
existing_user = db.users.find_one({"email": demo_email})

if existing_user:
    print(f"✓ Demo user already exists: {demo_email}")
else:
    # Create demo user
    demo_user = {
        "id": str(uuid.uuid4()),
        "email": demo_email,
        "password_hash": pwd_context.hash(demo_password),
        "name": demo_name,
        "created_at": datetime.utcnow(),
        "subscription_tier": "free"
    }
    
    db.users.insert_one(demo_user)
    print(f"✓ Demo user created successfully!")

print("\n" + "="*50)
print("DEMO CREDENTIALS:")
print("="*50)
print(f"Email:    {demo_email}")
print(f"Password: {demo_password}")
print("="*50)

# Create a sample funnel for demo user
demo_user_data = db.users.find_one({"email": demo_email})
user_id = demo_user_data["id"]

# Check if demo funnel exists
existing_funnel = db.funnels.find_one({"user_id": user_id, "name": "Demo Funnel"})

if not existing_funnel:
    print("\nCreating demo funnel...")
    demo_funnel = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "name": "Demo Funnel",
        "description": "This is a sample funnel to help you get started",
        "pages": [],
        "settings": {},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "published": False
    }
    db.funnels.insert_one(demo_funnel)
    print("✓ Demo funnel created!")

print("\nDemo account setup complete! You can now login with the credentials above.")

client.close()
