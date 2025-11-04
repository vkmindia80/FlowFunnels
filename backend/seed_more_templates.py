#!/usr/bin/env python3
"""Seed more funnel templates into the database"""

import os
import sys
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import uuid

load_dotenv()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.flowfunnels
templates_collection = db.templates

# Comprehensive template data
templates = [
    {
        "id": str(uuid.uuid4()),
        "name": "Lead Magnet Download",
        "description": "Capture leads with a free downloadable resource. Perfect for ebooks, guides, and checklists.",
        "category": "lead_generation",
        "thumbnail": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400",
        "pages": [
            {
                "name": "Landing Page",
                "slug": "download",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 80},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "48px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Get Your Free Guide"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 180},
                        "size": {"width": 500, "height": 60},
                        "styles": {"fontSize": "18px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "Download our comprehensive guide and learn proven strategies."}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 280},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Email Address", "placeholder": "your@email.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 360},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#0ea5e9", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Download Now", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Video Sales Letter",
        "description": "Convert visitors with a compelling video presentation and clear CTA.",
        "category": "sales",
        "thumbnail": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400",
        "pages": [
            {
                "name": "Sales Page",
                "slug": "watch",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 60},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Watch This Video Now"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "video",
                        "position": {"x": 360, "y": 160},
                        "size": {"width": 560, "height": 315},
                        "styles": {"borderRadius": "8px"},
                        "content": {"url": "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 500},
                        "size": {"width": 200, "height": 60},
                        "styles": {"backgroundColor": "#10b981", "color": "#ffffff", "borderRadius": "8px", "fontSize": "18px"},
                        "content": {"text": "Get Started", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "E-commerce Product Page",
        "description": "Showcase your product with images, descriptions, and easy purchase options.",
        "category": "ecommerce",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        "pages": [
            {
                "name": "Product Page",
                "slug": "product",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "image",
                        "position": {"x": 200, "y": 100},
                        "size": {"width": 400, "height": 400},
                        "styles": {"borderRadius": "8px"},
                        "content": {"src": "https://via.placeholder.com/400", "alt": "Product"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 650, "y": 100},
                        "size": {"width": 400, "height": 60},
                        "styles": {"fontSize": "36px", "fontWeight": "bold", "color": "#1f2937"},
                        "content": {"text": "Premium Product"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 650, "y": 180},
                        "size": {"width": 400, "height": 100},
                        "styles": {"fontSize": "16px", "color": "#4b5563"},
                        "content": {"text": "High-quality product with amazing features."}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 750, "y": 300},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#ef4444", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Buy Now", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Consultation Booking",
        "description": "Let clients easily book a consultation call with you.",
        "category": "services",
        "thumbnail": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
        "pages": [
            {
                "name": "Booking Page",
                "slug": "book-call",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 60},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Book Your Free Consultation"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "input",
                        "position": {"x": 440, "y": 160},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Full Name", "placeholder": "John Doe", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 240},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Email", "placeholder": "john@example.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "phone",
                        "position": {"x": 440, "y": 320},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Phone", "placeholder": "+1 (555) 000-0000", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 400},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#8b5cf6", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Schedule Call", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Membership Sign-up",
        "description": "Onboard new members with a streamlined registration process.",
        "category": "membership",
        "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
        "pages": [
            {
                "name": "Registration",
                "slug": "join",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 60},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Join Our Community"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "input",
                        "position": {"x": 440, "y": 160},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Username", "placeholder": "Your username", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 240},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Email", "placeholder": "you@example.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "checkbox",
                        "position": {"x": 440, "y": 320},
                        "size": {"width": 400, "height": 40},
                        "styles": {"fontSize": "14px"},
                        "content": {"label": "I agree to the terms and conditions", "checked": False}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 380},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#ec4899", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Sign Up", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Event Registration",
        "description": "Register attendees for your webinar, workshop, or live event.",
        "category": "events",
        "thumbnail": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
        "pages": [
            {
                "name": "Register",
                "slug": "event-registration",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 60},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Register for Live Event"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 150},
                        "size": {"width": 500, "height": 60},
                        "styles": {"fontSize": "16px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "Secure your spot at our exclusive event!"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "input",
                        "position": {"x": 440, "y": 230},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Full Name", "placeholder": "Your name", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 310},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Email", "placeholder": "your@email.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 390},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#f59e0b", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Register Now", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Free Trial Signup",
        "description": "Convert visitors into trial users with a simple signup form.",
        "category": "saas",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        "pages": [
            {
                "name": "Trial Signup",
                "slug": "start-trial",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 80},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Start Your 14-Day Free Trial"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 170},
                        "size": {"width": 500, "height": 40},
                        "styles": {"fontSize": "16px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "No credit card required. Cancel anytime."}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 240},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Work Email", "placeholder": "you@company.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 320},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#06b6d4", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Start Free Trial", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Survey Funnel",
        "description": "Collect valuable feedback with an engaging survey form.",
        "category": "feedback",
        "thumbnail": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
        "pages": [
            {
                "name": "Survey",
                "slug": "survey",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 60},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "We'd Love Your Feedback"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "rating",
                        "position": {"x": 490, "y": 160},
                        "size": {"width": 300, "height": 60},
                        "styles": {"padding": "8px"},
                        "content": {"label": "Rate your experience", "maxRating": 5, "rating": 0}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "textarea",
                        "position": {"x": 440, "y": 250},
                        "size": {"width": 400, "height": 120},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Additional Comments", "placeholder": "Tell us more...", "required": False}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 400},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#14b8a6", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Submit Feedback", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Thank You Page",
        "description": "Show appreciation and provide next steps after conversion.",
        "category": "confirmation",
        "thumbnail": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400",
        "pages": [
            {
                "name": "Thank You",
                "slug": "thank-you",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 150},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "48px", "fontWeight": "bold", "color": "#10b981", "textAlign": "center"},
                        "content": {"text": "Thank You!"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 250},
                        "size": {"width": 500, "height": 80},
                        "styles": {"fontSize": "18px", "color": "#4b5563", "textAlign": "center", "lineHeight": "1.6"},
                        "content": {"text": "We've received your submission. Check your email for next steps."}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 360},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#0ea5e9", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Go to Dashboard", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Coming Soon Page",
        "description": "Build anticipation for your upcoming launch.",
        "category": "landing",
        "thumbnail": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400",
        "pages": [
            {
                "name": "Coming Soon",
                "slug": "coming-soon",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 120},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "52px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Something Amazing Is Coming"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 220},
                        "size": {"width": 500, "height": 60},
                        "styles": {"fontSize": "18px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "Be the first to know when we launch!"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "email",
                        "position": {"x": 440, "y": 310},
                        "size": {"width": 400, "height": 50},
                        "styles": {"padding": "12px", "border": "1px solid #d1d5db", "borderRadius": "6px"},
                        "content": {"label": "Email Address", "placeholder": "your@email.com", "required": True}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 390},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#6366f1", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Notify Me", "url": "#"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "404 Error Page",
        "description": "Help lost visitors find their way back with a friendly error page.",
        "category": "utility",
        "thumbnail": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400",
        "pages": [
            {
                "name": "404 Page",
                "slug": "404",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 120},
                        "size": {"width": 600, "height": 100},
                        "styles": {"fontSize": "72px", "fontWeight": "bold", "color": "#ef4444", "textAlign": "center"},
                        "content": {"text": "404"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 240},
                        "size": {"width": 500, "height": 80},
                        "styles": {"fontSize": "20px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "Oops! The page you're looking for doesn't exist."}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 350},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#0ea5e9", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Go Home", "url": "/"}
                    }
                ]
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Webinar Replay",
        "description": "Share your recorded webinar with registrants and collect leads.",
        "category": "webinar",
        "thumbnail": "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
        "pages": [
            {
                "name": "Replay Page",
                "slug": "webinar-replay",
                "elements": [
                    {
                        "id": str(uuid.uuid4()),
                        "type": "heading",
                        "position": {"x": 340, "y": 40},
                        "size": {"width": 600, "height": 80},
                        "styles": {"fontSize": "42px", "fontWeight": "bold", "color": "#1f2937", "textAlign": "center"},
                        "content": {"text": "Webinar Replay Available"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "video",
                        "position": {"x": 360, "y": 140},
                        "size": {"width": 560, "height": 315},
                        "styles": {"borderRadius": "8px"},
                        "content": {"url": "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "text",
                        "position": {"x": 390, "y": 480},
                        "size": {"width": 500, "height": 60},
                        "styles": {"fontSize": "16px", "color": "#4b5563", "textAlign": "center"},
                        "content": {"text": "Watch the full recording and get exclusive bonuses!"}
                    },
                    {
                        "id": str(uuid.uuid4()),
                        "type": "button",
                        "position": {"x": 540, "y": 560},
                        "size": {"width": 200, "height": 50},
                        "styles": {"backgroundColor": "#a855f7", "color": "#ffffff", "borderRadius": "8px"},
                        "content": {"text": "Get Access", "url": "#"}
                    }
                ]
            }
        ]
    }
]

def seed_templates():
    """Seed templates into MongoDB"""
    try:
        # Clear existing templates (optional - comment out if you want to keep old ones)
        # templates_collection.delete_many({})
        
        # Insert new templates
        for template in templates:
            template["created_at"] = datetime.utcnow()
            template["updated_at"] = datetime.utcnow()
            
            # Check if template already exists
            existing = templates_collection.find_one({"name": template["name"]})
            if existing:
                print(f"Template '{template['name']}' already exists, skipping...")
                continue
            
            templates_collection.insert_one(template)
            print(f"✓ Added template: {template['name']}")
        
        print(f"\n✓ Successfully seeded {len(templates)} templates!")
        print(f"Total templates in database: {templates_collection.count_documents({})}")
        
    except Exception as e:
        print(f"Error seeding templates: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Seeding funnel templates...")
    seed_templates()
