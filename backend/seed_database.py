import os
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid

load_dotenv()

# Connect to MongoDB
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.flowfunnels

# Sample templates
templates = [
    {
        "id": str(uuid.uuid4()),
        "name": "Lead Capture Funnel",
        "description": "Perfect for capturing leads with a high-converting landing page and thank you page",
        "category": "lead-generation",
        "thumbnail": "",
        "settings": {
            "theme": "modern",
            "colors": {
                "primary": "#0ea5e9",
                "secondary": "#8b5cf6"
            }
        },
        "pages": [
            {
                "name": "Landing Page",
                "slug": "landing",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Get Your Free Marketing Guide",
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "subheadline-1",
                        "type": "text",
                        "content": "Learn the secrets to growing your business online",
                        "styles": {
                            "fontSize": "24px",
                            "textAlign": "center",
                            "color": "#6b7280",
                            "marginTop": "20px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Your Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Your Email", "required": True}
                        ],
                        "submitText": "Get Free Access",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "500px",
                            "margin": "40px auto"
                        }
                    }
                ],
                "styles": {
                    "backgroundColor": "#ffffff",
                    "padding": "40px"
                },
                "seo_settings": {
                    "title": "Get Your Free Marketing Guide",
                    "description": "Download our comprehensive marketing guide and start growing your business today"
                }
            },
            {
                "name": "Thank You",
                "slug": "thank-you",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Thank You!",
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "100px"
                        }
                    },
                    {
                        "id": "text-2",
                        "type": "text",
                        "content": "Check your email for your free guide!",
                        "styles": {
                            "fontSize": "24px",
                            "textAlign": "center",
                            "marginTop": "20px"
                        }
                    }
                ],
                "styles": {},
                "seo_settings": {}
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Product Launch Funnel",
        "description": "Launch your product with a compelling sales page and order form",
        "category": "product-launch",
        "thumbnail": "",
        "settings": {
            "theme": "bold",
            "colors": {
                "primary": "#ef4444",
                "secondary": "#f97316"
            }
        },
        "pages": [
            {
                "name": "Sales Page",
                "slug": "sales",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Introducing: The Ultimate Solution",
                        "styles": {
                            "fontSize": "56px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "video-1",
                        "type": "video",
                        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "800px",
                            "margin": "40px auto"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Buy Now - $97",
                        "link": "/order",
                        "styles": {
                            "backgroundColor": "#ef4444",
                            "color": "#ffffff",
                            "fontSize": "24px",
                            "padding": "20px 60px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {},
                "seo_settings": {}
            },
            {
                "name": "Order Form",
                "slug": "order",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Complete Your Order",
                        "styles": {
                            "fontSize": "36px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Full Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Email Address", "required": True},
                            {"name": "card", "type": "text", "placeholder": "Card Number", "required": True}
                        ],
                        "submitText": "Complete Purchase",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "600px",
                            "margin": "40px auto"
                        }
                    }
                ],
                "styles": {},
                "seo_settings": {}
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Webinar Registration Funnel",
        "description": "Drive webinar registrations with this proven funnel template",
        "category": "webinar",
        "thumbnail": "",
        "settings": {
            "theme": "professional",
            "colors": {
                "primary": "#8b5cf6",
                "secondary": "#ec4899"
            }
        },
        "pages": [
            {
                "name": "Registration Page",
                "slug": "register",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Free Live Webinar: Master Digital Marketing",
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "countdown-1",
                        "type": "countdown",
                        "endDate": "2025-12-31T23:59:59",
                        "styles": {
                            "marginTop": "30px",
                            "textAlign": "center"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Your Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Your Email", "required": True}
                        ],
                        "submitText": "Save My Spot",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "500px",
                            "margin": "40px auto"
                        }
                    }
                ],
                "styles": {},
                "seo_settings": {}
            },
            {
                "name": "Confirmation",
                "slug": "confirmed",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "You're Registered!",
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "100px",
                            "color": "#10b981"
                        }
                    },
                    {
                        "id": "text-2",
                        "type": "text",
                        "content": "Check your email for webinar details and access link",
                        "styles": {
                            "fontSize": "20px",
                            "textAlign": "center",
                            "marginTop": "20px"
                        }
                    }
                ],
                "styles": {},
                "seo_settings": {}
            }
        ]
    }
]

# Insert templates
print("Seeding database with sample templates...")
for template in templates:
    # Check if template already exists
    if not db.templates.find_one({"id": template["id"]}):
        db.templates.insert_one(template)
        print(f"✓ Added template: {template['name']}")
    else:
        print(f"- Template already exists: {template['name']}")

print(f"\nTotal templates in database: {db.templates.count_documents({})}")
print("Database seeding complete!")

client.close()
