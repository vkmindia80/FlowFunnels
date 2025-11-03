# FlowFunnels - API Configuration Guide

## 🔧 API Routing in Kubernetes Environment

### How It Works

FlowFunnels is deployed in a Kubernetes container with an ingress controller that automatically routes requests:

```
Frontend (Port 3000) ─────┐
                          ├──→ Ingress Controller
Backend (Port 8001) ──────┘
```

### Routing Rules

**1. Frontend Routes (No /api prefix)**
- Served from port 3000
- React application and static assets
- Example: `/dashboard`, `/login`, `/register`

**2. Backend API Routes (With /api prefix)**
- Automatically routed to port 8001
- All backend endpoints MUST start with `/api`
- Example: `/api/auth/login`, `/api/funnels`, `/api/templates`

### Environment Configuration

#### Frontend (.env)
```bash
# Use empty string for relative URLs in production
REACT_APP_BACKEND_URL=

# This makes all API calls use relative paths:
# /api/auth/login instead of http://localhost:8001/api/auth/login
```

#### Backend (.env)
```bash
# Backend always runs on 0.0.0.0:8001 internally
# Kubernetes ingress maps this to /api/* routes
MONGO_URL=mongodb://localhost:27017/flowfunnels
```

### API Client Configuration

The frontend uses Axios with relative URLs:

```javascript
// frontend/src/utils/api.js
const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_URL,  // Empty string = relative URLs
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### API Call Examples

**Before (Localhost - Won't Work in Production):**
```javascript
// ❌ This fails in Kubernetes
POST http://localhost:8001/api/auth/login
```

**After (Relative URLs - Works Everywhere):**
```javascript
// ✅ This works in both dev and production
POST /api/auth/login

// Kubernetes ingress automatically routes to port 8001
```

### All API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Funnels
- `POST /api/funnels` - Create funnel
- `GET /api/funnels` - List user's funnels
- `GET /api/funnels/{id}` - Get funnel details
- `PUT /api/funnels/{id}` - Update funnel
- `DELETE /api/funnels/{id}` - Delete funnel
- `GET /api/funnels/{id}/pages` - Get funnel pages

#### Pages
- `POST /api/pages` - Create page
- `GET /api/pages/{id}` - Get page details
- `PUT /api/pages/{id}` - Update page
- `DELETE /api/pages/{id}` - Delete page

#### Templates
- `GET /api/templates` - List all templates
- `POST /api/templates/{id}/clone` - Clone template

#### Analytics
- `POST /api/analytics/track` - Track event
- `GET /api/analytics/funnel/{id}` - Get funnel analytics

#### Health Check
- `GET /api/health` - Health check endpoint

### Testing API Endpoints

#### From Inside Container
```bash
# Health check
curl http://localhost:8001/api/health

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@flowfunnels.com","password":"demo123"}'
```

#### From Browser
```javascript
// Frontend automatically uses relative URLs
fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Troubleshooting

#### Issue: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Cause:** Frontend trying to connect to `localhost:8001` instead of relative URLs

**Solution:**
1. Check frontend `.env` file has `REACT_APP_BACKEND_URL=` (empty)
2. Restart frontend: `sudo supervisorctl restart frontend`
3. Clear browser cache
4. Reload page

#### Issue: "404 Not Found" on API calls

**Cause:** Backend routes not prefixed with `/api`

**Solution:**
- Verify all backend routes start with `/api/`
- Check `server.py` route definitions

#### Issue: CORS errors

**Cause:** CORS not configured properly

**Solution:**
- Backend already has CORS enabled for all origins
- Check CORS middleware in `server.py`

### Development vs Production

#### Local Development (Optional)
```bash
# If you want to run locally outside Kubernetes:
REACT_APP_BACKEND_URL=http://localhost:8001
```

#### Production (Current Setup)
```bash
# Use relative URLs (empty)
REACT_APP_BACKEND_URL=
```

### Network Flow

```
User Browser
    ↓
Frontend (React App)
    ↓ (makes request to /api/*)
Kubernetes Ingress
    ↓ (routes /api/* to port 8001)
Backend (FastAPI)
    ↓
MongoDB
```

### Important Notes

1. **Never hardcode URLs** - Always use environment variables
2. **Always prefix backend routes** with `/api`
3. **Use relative URLs** in production (empty REACT_APP_BACKEND_URL)
4. **Backend binds to 0.0.0.0:8001** internally
5. **Ingress handles routing** automatically

### Verification

To verify the setup is working:

1. **Check Backend:**
```bash
curl http://localhost:8001/api/health
# Should return: {"status":"healthy","timestamp":"..."}
```

2. **Check Frontend:**
```bash
# Open browser console
fetch('/api/health').then(r => r.json()).then(console.log)
# Should return: {status: "healthy", timestamp: "..."}
```

3. **Check Services:**
```bash
sudo supervisorctl status
# All should show RUNNING
```

### Environment Variables Summary

| Variable | Location | Value | Purpose |
|----------|----------|-------|---------|
| `REACT_APP_BACKEND_URL` | Frontend | `` (empty) | Use relative API URLs |
| `MONGO_URL` | Backend | `mongodb://localhost:27017/flowfunnels` | Database connection |
| `SECRET_KEY` | Backend | (secret) | JWT signing |

---

**Last Updated:** November 3, 2025
**Status:** Configured for Kubernetes deployment
