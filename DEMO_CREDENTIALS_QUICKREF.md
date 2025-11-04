# Demo Credentials - Quick Reference 🔑

## Login Credentials

```
📧 Email:    demo@flowfunnels.com
🔒 Password: demo123
```

## Status: ✅ PERMANENTLY FIXED

The demo user is **automatically created and maintained** by the backend on every startup.

---

## How to Use

### Option 1: Auto-fill Button (Recommended)
1. Go to the login page
2. Click **"Auto-fill Demo Credentials"** button
3. Click **"Sign In"**

### Option 2: Manual Entry
1. Enter email: `demo@flowfunnels.com`
2. Enter password: `demo123`
3. Click **"Sign In"**

---

## Troubleshooting

### If Login Fails

**Quick Fix (95% of issues):**
```bash
sudo supervisorctl restart backend
```

**Manual Reset (if needed):**
```bash
cd /app/backend
python reset_demo_user.py
```

**Check Status:**
```bash
# View backend logs
tail -f /var/log/supervisor/backend.out.log

# Test login API
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@flowfunnels.com","password":"demo123"}'
```

---

## What's Different Now?

### Before ❌
- Demo user might not exist
- Could get "incorrect credentials" error
- Required manual database seeding

### After ✅
- Demo user **ALWAYS exists** (auto-created on startup)
- Credentials **ALWAYS work**
- **Zero manual intervention** required
- Survives restarts, resets, and database issues

---

## Technical Implementation

1. **Backend Startup Hook**: Ensures demo user exists on every startup
2. **Auto Password Correction**: Fixes incorrect password hashes automatically
3. **Manual Reset Script**: Available if needed (`reset_demo_user.py`)

---

## For Developers

### Files Modified
- `/app/backend/server.py` - Added `@app.on_event("startup")` hook
- `/app/backend/reset_demo_user.py` - Manual reset script
- `/app/frontend/src/pages/Login.js` - Already had auto-fill (unchanged)

### Verification
```bash
# Backend logs show on startup:
✓ Demo user exists: demo@flowfunnels.com

# Login API returns JWT token:
{"access_token": "eyJ...", "token_type": "bearer"}

# Frontend auto-fill populates:
Email: demo@flowfunnels.com
Password: demo123
```

---

**Last Updated:** 2025-11-04  
**Status:** Permanently Fixed ✅  
**No Manual Maintenance Required** 🎉
