# FlowFunnels - Project Structure

## 📁 Directory Structure

```
/app/
├── backend/                    # FastAPI Backend
│   ├── server.py              # Main FastAPI application
│   ├── seed_database.py       # Database seeding script
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── frontend/                   # React Frontend
│   ├── public/
│   │   └── index.html         # HTML template
│   │
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   └── DashboardLayout.js
│   │   │
│   │   ├── context/           # React Context providers
│   │   │   └── AuthContext.js
│   │   │
│   │   ├── pages/             # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── FunnelBuilder.js
│   │   │   ├── Templates.js
│   │   │   └── Analytics.js
│   │   │
│   │   ├── utils/             # Utility functions
│   │   │   └── api.js         # API client
│   │   │
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # Entry point
│   │   ├── index.css          # Global styles
│   │   └── App.css            # App styles
│   │
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── .env                   # Environment variables
│
├── ROADMAP.md                 # Development roadmap
├── QUICKSTART.md              # Quick start guide
├── README.md                  # Project documentation
└── PROJECT_STRUCTURE.md       # This file

```

## 🔧 Key Files Explained

### Backend Files

#### `server.py`
The main FastAPI application containing:
- API routes for auth, funnels, pages, analytics, templates
- MongoDB connection and collections setup
- JWT authentication middleware
- Pydantic models for request/response validation
- CORS configuration

**Key Routes:**
- `/api/auth/*` - Authentication endpoints
- `/api/funnels/*` - Funnel CRUD operations
- `/api/pages/*` - Page CRUD operations
- `/api/templates/*` - Template browsing and cloning
- `/api/analytics/*` - Analytics tracking and retrieval
- `/api/health` - Health check endpoint

#### `seed_database.py`
Database seeding script that populates MongoDB with:
- 3 pre-built funnel templates
- Sample template pages and elements
- Template metadata and styling

#### `requirements.txt`
Python dependencies:
- `fastapi` - Modern web framework
- `uvicorn` - ASGI server
- `pymongo` - MongoDB driver
- `python-jose` - JWT handling
- `passlib` - Password hashing
- `pydantic` - Data validation

#### `.env`
Environment configuration:
- `MONGO_URL` - MongoDB connection string
- `SECRET_KEY` - JWT secret key
- `ALGORITHM` - JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration

### Frontend Files

#### `App.js`
Main application component with:
- React Router configuration
- Route definitions (public and private)
- AuthProvider wrapper
- Loading states for authentication

#### `context/AuthContext.js`
Authentication context providing:
- User state management
- Login/Register functions
- Logout functionality
- Token management
- Authentication checks

#### `utils/api.js`
Axios HTTP client with:
- Base URL configuration
- Request interceptors (adds JWT token)
- Response interceptors (handles 401 errors)
- Automatic token refresh logic

#### Pages

**Login.js**
- Email/password login form
- Error handling
- Redirect to dashboard on success
- Link to registration

**Register.js**
- User registration form
- Password confirmation
- Validation
- Automatic login after registration

**Dashboard.js**
- Funnel listing grid
- Create funnel modal
- Delete funnel functionality
- Navigate to templates
- Analytics access

**FunnelBuilder.js**
- Funnel page management
- Add/edit/delete pages
- Page list view
- Editor placeholder (Phase 2)

**Templates.js**
- Template gallery
- Template preview
- Clone template functionality
- Category filtering (future)

**Analytics.js**
- Funnel metrics display
- Page views, clicks, conversions
- Conversion rate calculation
- Charts placeholder (Phase 4)

#### Components

**DashboardLayout.js**
- Sidebar navigation
- User profile display
- Logout button
- Active route highlighting
- Consistent layout wrapper

## 🗄️ Database Collections

### users
```javascript
{
  id: String (UUID),
  email: String (unique),
  password_hash: String,
  name: String,
  created_at: DateTime,
  subscription_tier: String (default: "free")
}
```

### funnels
```javascript
{
  id: String (UUID),
  user_id: String,
  name: String,
  description: String,
  pages: Array<String>, // Page IDs
  settings: Object,
  created_at: DateTime,
  updated_at: DateTime,
  published: Boolean
}
```

### pages
```javascript
{
  id: String (UUID),
  funnel_id: String,
  name: String,
  slug: String,
  elements: Array<Object>,
  styles: Object,
  seo_settings: Object,
  created_at: DateTime,
  updated_at: DateTime
}
```

### templates
```javascript
{
  id: String (UUID),
  name: String,
  description: String,
  category: String,
  thumbnail: String (URL),
  settings: Object,
  pages: Array<Object> // Full page definitions
}
```

### analytics
```javascript
{
  id: String (UUID),
  funnel_id: String,
  page_id: String (optional),
  event_type: String, // "page_view", "button_click", "form_submit"
  metadata: Object,
  timestamp: DateTime
}
```

## 🔐 Authentication Flow

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server generates JWT token and returns it
3. Frontend stores token in localStorage
4. API client adds token to Authorization header for all requests
5. Backend validates token using middleware
6. Protected routes check for valid token before processing

## 🎨 Styling Architecture

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette (primary blues)
- Responsive design utilities
- Custom component classes

### Color Scheme
- Primary: Blue shades (#0ea5e9)
- Accent: Purple (#8b5cf6)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Neutral: Gray scales

## 🚀 Development Workflow

### Starting Development

1. **Backend:**
```bash
cd /app/backend
python server.py
# Or use supervisor: sudo supervisorctl restart backend
```

2. **Frontend:**
```bash
cd /app/frontend
yarn start
# Or use supervisor: sudo supervisorctl restart frontend
```

3. **Both:**
```bash
sudo supervisorctl restart all
```

### Making Changes

**Backend changes:**
- Edit `server.py`
- Server auto-reloads (Uvicorn --reload)
- Check logs: `tail -f /var/log/supervisor/backend.err.log`

**Frontend changes:**
- Edit React components
- React hot-reload updates browser
- Check logs: `tail -f /var/log/supervisor/frontend.out.log`

**Database changes:**
- Use MongoDB shell or Compass
- Or add migration scripts to `backend/`

## 📦 Dependencies Management

### Backend (Python)
```bash
# Add new package
pip install package-name
pip freeze > requirements.txt

# Install dependencies
pip install -r requirements.txt
```

### Frontend (Node.js)
```bash
# Add new package
yarn add package-name

# Install dependencies
yarn install
```

## 🧪 Testing Strategy (Future)

### Backend Tests
- Unit tests for API endpoints
- Integration tests for database operations
- Authentication tests
- Use pytest framework

### Frontend Tests
- Component tests with React Testing Library
- Integration tests for user flows
- E2E tests with Playwright

## 📝 Code Standards

### Backend (Python)
- PEP 8 style guide
- Type hints where applicable
- Docstrings for functions
- FastAPI best practices

### Frontend (JavaScript/React)
- ES6+ syntax
- Functional components with hooks
- Prop types or TypeScript (future)
- Component composition

## 🔄 Git Workflow

1. Work on feature branch
2. Commit with descriptive messages
3. Push to remote
4. Create pull request
5. Review and merge

## 📊 Monitoring & Logging

### Current Setup
- Supervisor process management
- Log files in `/var/log/supervisor/`
- Console logging in development

### Future Improvements
- Structured logging
- Error tracking (Sentry)
- Performance monitoring
- Analytics dashboard

## 🚢 Deployment

### Current (Development)
- Kubernetes container
- Supervisor for process management
- MongoDB on same instance

### Future (Production)
- Containerized deployment (Docker)
- Managed MongoDB (MongoDB Atlas)
- Load balancing
- CDN for static assets
- CI/CD pipeline

---

**Last Updated:** November 3, 2025
**Version:** MVP Phase 1
**Status:** Active Development
