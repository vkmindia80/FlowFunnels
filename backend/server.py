from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI(title="FlowFunnels API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.flowfunnels

# Collections
users_collection = db.users
funnels_collection = db.funnels
pages_collection = db.pages
analytics_collection = db.analytics
templates_collection = db.templates

# Security
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 43200))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Pydantic Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime
    subscription_tier: str = "free"

class FunnelCreate(BaseModel):
    name: str
    description: Optional[str] = None

class FunnelUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    settings: Optional[Dict[str, Any]] = None

class PageCreate(BaseModel):
    funnel_id: str
    name: str
    slug: Optional[str] = None

class PageUpdate(BaseModel):
    name: Optional[str] = None
    elements: Optional[List[Dict[str, Any]]] = None
    styles: Optional[Dict[str, Any]] = None
    seo_settings: Optional[Dict[str, Any]] = None

class AnalyticsEvent(BaseModel):
    funnel_id: str
    page_id: Optional[str] = None
    event_type: str
    metadata: Optional[Dict[str, Any]] = None

# Helper Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = users_collection.find_one({"id": user_id})
    if user is None:
        raise credentials_exception
    return user

# Auth Routes
@app.post("/api/auth/register", response_model=Token)
async def register(user_data: UserRegister):
    # Check if user exists
    if users_collection.find_one({"email": user_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "email": user_data.email,
        "password_hash": get_password_hash(user_data.password),
        "name": user_data.name,
        "created_at": datetime.utcnow(),
        "subscription_tier": "free"
    }
    users_collection.insert_one(user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    user = users_collection.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "created_at": current_user["created_at"],
        "subscription_tier": current_user.get("subscription_tier", "free")
    }

# Funnel Routes
@app.post("/api/funnels")
async def create_funnel(funnel: FunnelCreate, current_user: dict = Depends(get_current_user)):
    funnel_id = str(uuid.uuid4())
    new_funnel = {
        "id": funnel_id,
        "user_id": current_user["id"],
        "name": funnel.name,
        "description": funnel.description,
        "pages": [],
        "settings": {},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "published": False
    }
    funnels_collection.insert_one(new_funnel)
    # Return without MongoDB's _id field
    return {
        "id": funnel_id,
        "user_id": current_user["id"],
        "name": funnel.name,
        "description": funnel.description,
        "pages": [],
        "settings": {},
        "created_at": new_funnel["created_at"],
        "updated_at": new_funnel["updated_at"],
        "published": False
    }

@app.get("/api/funnels")
async def get_funnels(current_user: dict = Depends(get_current_user)):
    funnels = list(funnels_collection.find({"user_id": current_user["id"]}))
    for funnel in funnels:
        funnel.pop("_id", None)
    return funnels

@app.get("/api/funnels/{funnel_id}")
async def get_funnel(funnel_id: str, current_user: dict = Depends(get_current_user)):
    funnel = funnels_collection.find_one({"id": funnel_id, "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=404, detail="Funnel not found")
    funnel.pop("_id", None)
    return funnel

@app.put("/api/funnels/{funnel_id}")
async def update_funnel(funnel_id: str, funnel_update: FunnelUpdate, current_user: dict = Depends(get_current_user)):
    funnel = funnels_collection.find_one({"id": funnel_id, "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=404, detail="Funnel not found")
    
    update_data = {k: v for k, v in funnel_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    funnels_collection.update_one({"id": funnel_id}, {"$set": update_data})
    return {"message": "Funnel updated successfully"}

@app.delete("/api/funnels/{funnel_id}")
async def delete_funnel(funnel_id: str, current_user: dict = Depends(get_current_user)):
    result = funnels_collection.delete_one({"id": funnel_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Funnel not found")
    # Also delete associated pages
    pages_collection.delete_many({"funnel_id": funnel_id})
    return {"message": "Funnel deleted successfully"}

# Page Routes
@app.post("/api/pages")
async def create_page(page: PageCreate, current_user: dict = Depends(get_current_user)):
    # Verify funnel ownership
    funnel = funnels_collection.find_one({"id": page.funnel_id, "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=404, detail="Funnel not found")
    
    page_id = str(uuid.uuid4())
    slug = page.slug or page.name.lower().replace(" ", "-")
    new_page = {
        "id": page_id,
        "funnel_id": page.funnel_id,
        "name": page.name,
        "slug": slug,
        "elements": [],
        "styles": {},
        "seo_settings": {},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    pages_collection.insert_one(new_page)
    
    # Add page to funnel's pages array
    funnels_collection.update_one(
        {"id": page.funnel_id},
        {"$push": {"pages": page_id}, "$set": {"updated_at": datetime.utcnow()}}
    )
    
    return {"id": page_id, **new_page}

@app.get("/api/pages/{page_id}")
async def get_page(page_id: str, current_user: dict = Depends(get_current_user)):
    page = pages_collection.find_one({"id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Verify ownership through funnel
    funnel = funnels_collection.find_one({"id": page["funnel_id"], "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=403, detail="Access denied")
    
    page.pop("_id", None)
    return page

@app.put("/api/pages/{page_id}")
async def update_page(page_id: str, page_update: PageUpdate, current_user: dict = Depends(get_current_user)):
    page = pages_collection.find_one({"id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Verify ownership
    funnel = funnels_collection.find_one({"id": page["funnel_id"], "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=403, detail="Access denied")
    
    update_data = {k: v for k, v in page_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    pages_collection.update_one({"id": page_id}, {"$set": update_data})
    funnels_collection.update_one({"id": page["funnel_id"]}, {"$set": {"updated_at": datetime.utcnow()}})
    
    return {"message": "Page updated successfully"}

@app.delete("/api/pages/{page_id}")
async def delete_page(page_id: str, current_user: dict = Depends(get_current_user)):
    page = pages_collection.find_one({"id": page_id})
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Verify ownership
    funnel = funnels_collection.find_one({"id": page["funnel_id"], "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=403, detail="Access denied")
    
    pages_collection.delete_one({"id": page_id})
    funnels_collection.update_one(
        {"id": page["funnel_id"]},
        {"$pull": {"pages": page_id}, "$set": {"updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Page deleted successfully"}

@app.get("/api/funnels/{funnel_id}/pages")
async def get_funnel_pages(funnel_id: str, current_user: dict = Depends(get_current_user)):
    funnel = funnels_collection.find_one({"id": funnel_id, "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=404, detail="Funnel not found")
    
    pages = list(pages_collection.find({"funnel_id": funnel_id}))
    for page in pages:
        page.pop("_id", None)
    return pages

# Analytics Routes
@app.post("/api/analytics/track")
async def track_event(event: AnalyticsEvent):
    event_data = {
        "id": str(uuid.uuid4()),
        "funnel_id": event.funnel_id,
        "page_id": event.page_id,
        "event_type": event.event_type,
        "metadata": event.metadata or {},
        "timestamp": datetime.utcnow()
    }
    analytics_collection.insert_one(event_data)
    return {"message": "Event tracked successfully"}

@app.get("/api/analytics/funnel/{funnel_id}")
async def get_funnel_analytics(funnel_id: str, current_user: dict = Depends(get_current_user)):
    # Verify ownership
    funnel = funnels_collection.find_one({"id": funnel_id, "user_id": current_user["id"]})
    if not funnel:
        raise HTTPException(status_code=404, detail="Funnel not found")
    
    # Get analytics data
    events = list(analytics_collection.find({"funnel_id": funnel_id}))
    
    # Calculate metrics
    page_views = len([e for e in events if e["event_type"] == "page_view"])
    button_clicks = len([e for e in events if e["event_type"] == "button_click"])
    form_submissions = len([e for e in events if e["event_type"] == "form_submit"])
    
    return {
        "funnel_id": funnel_id,
        "page_views": page_views,
        "button_clicks": button_clicks,
        "form_submissions": form_submissions,
        "conversion_rate": (form_submissions / page_views * 100) if page_views > 0 else 0
    }

# Templates Routes
@app.get("/api/templates")
async def get_templates():
    templates = list(templates_collection.find({}))
    for template in templates:
        template.pop("_id", None)
    return templates

@app.post("/api/templates/{template_id}/clone")
async def clone_template(template_id: str, current_user: dict = Depends(get_current_user)):
    template = templates_collection.find_one({"id": template_id})
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Create new funnel from template
    funnel_id = str(uuid.uuid4())
    new_funnel = {
        "id": funnel_id,
        "user_id": current_user["id"],
        "name": f"{template['name']} (Copy)",
        "description": template.get("description", ""),
        "pages": [],
        "settings": template.get("settings", {}),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "published": False
    }
    funnels_collection.insert_one(new_funnel)
    
    # Clone pages
    page_ids = []
    for template_page in template.get("pages", []):
        page_id = str(uuid.uuid4())
        new_page = {
            "id": page_id,
            "funnel_id": funnel_id,
            "name": template_page["name"],
            "slug": template_page["slug"],
            "elements": template_page.get("elements", []),
            "styles": template_page.get("styles", {}),
            "seo_settings": template_page.get("seo_settings", {}),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        pages_collection.insert_one(new_page)
        page_ids.append(page_id)
    
    # Update funnel with page IDs
    funnels_collection.update_one(
        {"id": funnel_id},
        {"$set": {"pages": page_ids}}
    )
    
    return {"id": funnel_id, "message": "Template cloned successfully"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
