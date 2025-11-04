import os
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid

load_dotenv()

# Connect to MongoDB
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.flowfunnels

# Additional professional templates
new_templates = [
    {
        "id": str(uuid.uuid4()),
        "name": "E-commerce Product Funnel",
        "description": "Complete e-commerce funnel with product showcase, cart, and checkout pages",
        "category": "e-commerce",
        "thumbnail": "",
        "settings": {
            "theme": "modern-ecommerce",
            "colors": {
                "primary": "#10b981",
                "secondary": "#059669"
            }
        },
        "pages": [
            {
                "name": "Product Page",
                "slug": "product",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Premium Quality Product",
                        "styles": {
                            "fontSize": "42px",
                            "fontWeight": "bold",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "image-1",
                        "type": "image",
                        "url": "https://via.placeholder.com/600x400",
                        "alt": "Product Image",
                        "styles": {
                            "marginTop": "30px",
                            "maxWidth": "600px",
                            "borderRadius": "12px"
                        }
                    },
                    {
                        "id": "price-1",
                        "type": "text",
                        "content": "$149.99",
                        "styles": {
                            "fontSize": "36px",
                            "fontWeight": "bold",
                            "color": "#10b981",
                            "marginTop": "30px"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Add to Cart",
                        "link": "/cart",
                        "styles": {
                            "backgroundColor": "#10b981",
                            "color": "#ffffff",
                            "fontSize": "20px",
                            "padding": "16px 48px",
                            "borderRadius": "8px",
                            "marginTop": "30px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center",
                    "padding": "40px"
                },
                "seo_settings": {
                    "title": "Premium Product - Shop Now",
                    "description": "Get the best quality product at an amazing price"
                }
            },
            {
                "name": "Checkout",
                "slug": "checkout",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Secure Checkout",
                        "styles": {
                            "fontSize": "36px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Full Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Email", "required": True},
                            {"name": "address", "type": "text", "placeholder": "Shipping Address", "required": True},
                            {"name": "card", "type": "text", "placeholder": "Card Number", "required": True}
                        ],
                        "submitText": "Complete Order",
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
        "name": "Consultation Booking Funnel",
        "description": "Perfect for service providers to book consultations and capture qualified leads",
        "category": "services",
        "thumbnail": "",
        "settings": {
            "theme": "professional-services",
            "colors": {
                "primary": "#3b82f6",
                "secondary": "#1d4ed8"
            }
        },
        "pages": [
            {
                "name": "Service Overview",
                "slug": "services",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Book Your Free Consultation",
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
                        "content": "30-minute strategy session to discuss your goals",
                        "styles": {
                            "fontSize": "22px",
                            "textAlign": "center",
                            "color": "#6b7280",
                            "marginTop": "20px"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Schedule Now",
                        "link": "/booking",
                        "styles": {
                            "backgroundColor": "#3b82f6",
                            "color": "#ffffff",
                            "fontSize": "20px",
                            "padding": "16px 48px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Free Consultation - Book Now",
                    "description": "Schedule your free 30-minute consultation today"
                }
            },
            {
                "name": "Booking Form",
                "slug": "booking",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Schedule Your Consultation",
                        "styles": {
                            "fontSize": "36px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Your Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Email Address", "required": True},
                            {"name": "phone", "type": "tel", "placeholder": "Phone Number", "required": True},
                            {"name": "date", "type": "date", "placeholder": "Preferred Date", "required": True}
                        ],
                        "submitText": "Book Consultation",
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
        "name": "Affiliate Bridge Funnel",
        "description": "Build trust and pre-sell before sending traffic to affiliate offers",
        "category": "affiliate",
        "thumbnail": "",
        "settings": {
            "theme": "trust-builder",
            "colors": {
                "primary": "#f59e0b",
                "secondary": "#d97706"
            }
        },
        "pages": [
            {
                "name": "Bridge Page",
                "slug": "bridge",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Before You Go, Read This...",
                        "styles": {
                            "fontSize": "44px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "text-1",
                        "type": "text",
                        "content": "I've personally tested this product and here's what I discovered...",
                        "styles": {
                            "fontSize": "20px",
                            "textAlign": "center",
                            "marginTop": "30px",
                            "maxWidth": "800px",
                            "margin": "30px auto"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Click Here to Learn More",
                        "link": "#offer",
                        "styles": {
                            "backgroundColor": "#f59e0b",
                            "color": "#ffffff",
                            "fontSize": "22px",
                            "padding": "18px 48px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Honest Review - Must Read",
                    "description": "Real user review and experience with this product"
                }
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Course Launch Funnel",
        "description": "Launch your online course with high-converting sales pages and enrollment flow",
        "category": "education",
        "thumbnail": "",
        "settings": {
            "theme": "education",
            "colors": {
                "primary": "#8b5cf6",
                "secondary": "#7c3aed"
            }
        },
        "pages": [
            {
                "name": "Course Landing",
                "slug": "course",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Master [Your Skill] in 30 Days",
                        "styles": {
                            "fontSize": "52px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "subheadline-1",
                        "type": "text",
                        "content": "Join 10,000+ students who transformed their career",
                        "styles": {
                            "fontSize": "24px",
                            "textAlign": "center",
                            "color": "#6b7280",
                            "marginTop": "20px"
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
                        "text": "Enroll Now - $297",
                        "link": "/enroll",
                        "styles": {
                            "backgroundColor": "#8b5cf6",
                            "color": "#ffffff",
                            "fontSize": "24px",
                            "padding": "20px 60px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Online Course - Enroll Today",
                    "description": "Transform your skills with our comprehensive online course"
                }
            },
            {
                "name": "Enrollment",
                "slug": "enroll",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Secure Your Spot",
                        "styles": {
                            "fontSize": "40px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "40px"
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
                        "submitText": "Complete Enrollment",
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
        "name": "App Download Funnel",
        "description": "Drive mobile app downloads with compelling landing and download pages",
        "category": "mobile-app",
        "thumbnail": "",
        "settings": {
            "theme": "app-modern",
            "colors": {
                "primary": "#06b6d4",
                "secondary": "#0891b2"
            }
        },
        "pages": [
            {
                "name": "App Landing",
                "slug": "app",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "The Best App for [Your Purpose]",
                        "styles": {
                            "fontSize": "50px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "subheadline-1",
                        "type": "text",
                        "content": "Join millions of users worldwide",
                        "styles": {
                            "fontSize": "24px",
                            "textAlign": "center",
                            "color": "#6b7280",
                            "marginTop": "20px"
                        }
                    },
                    {
                        "id": "image-1",
                        "type": "image",
                        "url": "https://via.placeholder.com/400x800",
                        "alt": "App Screenshot",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "400px",
                            "margin": "40px auto"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Download Now - Free",
                        "link": "/download",
                        "styles": {
                            "backgroundColor": "#06b6d4",
                            "color": "#ffffff",
                            "fontSize": "22px",
                            "padding": "18px 48px",
                            "borderRadius": "12px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Download Our App - Free",
                    "description": "Get the best mobile app for your needs"
                }
            },
            {
                "name": "Download Page",
                "slug": "download",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Choose Your Platform",
                        "styles": {
                            "fontSize": "40px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "80px"
                        }
                    },
                    {
                        "id": "button-ios",
                        "type": "button",
                        "text": "Download for iOS",
                        "link": "#ios",
                        "styles": {
                            "backgroundColor": "#000000",
                            "color": "#ffffff",
                            "fontSize": "20px",
                            "padding": "16px 48px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "button-android",
                        "type": "button",
                        "text": "Download for Android",
                        "link": "#android",
                        "styles": {
                            "backgroundColor": "#34a853",
                            "color": "#ffffff",
                            "fontSize": "20px",
                            "padding": "16px 48px",
                            "borderRadius": "8px",
                            "marginTop": "20px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {}
            }
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Free Trial Signup Funnel",
        "description": "Convert visitors into free trial users with this optimized SaaS funnel",
        "category": "saas",
        "thumbnail": "",
        "settings": {
            "theme": "saas-modern",
            "colors": {
                "primary": "#0ea5e9",
                "secondary": "#0284c7"
            }
        },
        "pages": [
            {
                "name": "Features Page",
                "slug": "features",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Everything You Need to Succeed",
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
                        "content": "Try free for 14 days - No credit card required",
                        "styles": {
                            "fontSize": "22px",
                            "textAlign": "center",
                            "color": "#10b981",
                            "marginTop": "20px",
                            "fontWeight": "600"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Start Free Trial",
                        "link": "/signup",
                        "styles": {
                            "backgroundColor": "#0ea5e9",
                            "color": "#ffffff",
                            "fontSize": "22px",
                            "padding": "18px 48px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Start Your Free Trial Today",
                    "description": "Try our platform free for 14 days"
                }
            },
            {
                "name": "Signup Form",
                "slug": "signup",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Start Your 14-Day Free Trial",
                        "styles": {
                            "fontSize": "36px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Full Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Work Email", "required": True},
                            {"name": "company", "type": "text", "placeholder": "Company Name", "required": True},
                            {"name": "password", "type": "password", "placeholder": "Choose Password", "required": True}
                        ],
                        "submitText": "Start Free Trial",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "500px",
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
        "name": "Event Registration Funnel",
        "description": "Maximize event attendance with this proven registration and reminder sequence",
        "category": "events",
        "thumbnail": "",
        "settings": {
            "theme": "event-vibrant",
            "colors": {
                "primary": "#ec4899",
                "secondary": "#db2777"
            }
        },
        "pages": [
            {
                "name": "Event Landing",
                "slug": "event",
                "elements": [
                    {
                        "id": "headline-1",
                        "type": "text",
                        "content": "Join Us for an Unforgettable Experience",
                        "styles": {
                            "fontSize": "46px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "60px"
                        }
                    },
                    {
                        "id": "date-time",
                        "type": "text",
                        "content": "December 15, 2025 | 2:00 PM EST",
                        "styles": {
                            "fontSize": "24px",
                            "textAlign": "center",
                            "color": "#ec4899",
                            "marginTop": "20px",
                            "fontWeight": "600"
                        }
                    },
                    {
                        "id": "countdown-1",
                        "type": "countdown",
                        "endDate": "2025-12-15T14:00:00",
                        "styles": {
                            "marginTop": "40px",
                            "textAlign": "center"
                        }
                    },
                    {
                        "id": "button-1",
                        "type": "button",
                        "text": "Register Now - Free",
                        "link": "/register",
                        "styles": {
                            "backgroundColor": "#ec4899",
                            "color": "#ffffff",
                            "fontSize": "22px",
                            "padding": "18px 48px",
                            "borderRadius": "8px",
                            "marginTop": "40px"
                        }
                    }
                ],
                "styles": {
                    "textAlign": "center"
                },
                "seo_settings": {
                    "title": "Register for Our Event",
                    "description": "Join us for an amazing event experience"
                }
            },
            {
                "name": "Registration",
                "slug": "register",
                "elements": [
                    {
                        "id": "headline-2",
                        "type": "text",
                        "content": "Reserve Your Spot",
                        "styles": {
                            "fontSize": "40px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "40px"
                        }
                    },
                    {
                        "id": "form-1",
                        "type": "form",
                        "fields": [
                            {"name": "name", "type": "text", "placeholder": "Full Name", "required": True},
                            {"name": "email", "type": "email", "placeholder": "Email Address", "required": True},
                            {"name": "phone", "type": "tel", "placeholder": "Phone Number (optional)", "required": False},
                            {"name": "tickets", "type": "number", "placeholder": "Number of Tickets", "required": True}
                        ],
                        "submitText": "Complete Registration",
                        "styles": {
                            "marginTop": "40px",
                            "maxWidth": "600px",
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
                        "id": "headline-3",
                        "type": "text",
                        "content": "You're All Set! 🎉",
                        "styles": {
                            "fontSize": "48px",
                            "fontWeight": "bold",
                            "textAlign": "center",
                            "marginTop": "100px",
                            "color": "#10b981"
                        }
                    },
                    {
                        "id": "text-3",
                        "type": "text",
                        "content": "Check your email for event details and calendar invite",
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

# Insert new templates
print("Adding more professional templates to database...")
print("=" * 60)

templates_added = 0
for template in new_templates:
    # Check if template already exists by name
    existing = db.templates.find_one({"name": template["name"]})
    if not existing:
        db.templates.insert_one(template)
        print(f"✓ Added: {template['name']}")
        print(f"  Category: {template['category']}")
        print(f"  Pages: {len(template['pages'])}")
        print()
        templates_added += 1
    else:
        print(f"- Already exists: {template['name']}")

print("=" * 60)
print(f"\n✅ Added {templates_added} new templates")
print(f"📊 Total templates in database: {db.templates.count_documents({})}")
print("\n🎉 Template library updated successfully!")

client.close()
