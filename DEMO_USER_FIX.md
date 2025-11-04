# Demo User - Permanent Fix Documentation

## Problem
The "Auto-fill Demo Credentials" button on the login page was showing incorrect credentials error, preventing users from testing the application easily.

## Root Cause
The demo user either didn't exist in the database or had incorrect password hash, causing authentication failures when users tried to login with `demo@flowfunnels.com` / `demo123`.

## Solution Implemented

### ✅ 1. Backend Startup Check (Primary Fix)
Modified `/app/backend/server.py` to automatically ensure the demo user exists on every startup:

```python
@app.on_event("startup")
async def startup_event():
    ensure_demo_user()
```

**How it works:**
- On every backend restart/startup, the `ensure_demo_user()` function runs
- Checks if demo user exists in MongoDB
- If not exists: Creates it with correct credentials
- If exists: Verifies password is correct, updates if needed
- This ensures demo credentials ALWAYS work, even after database resets

### ✅ 2. Manual Reset Script (Backup Solution)
Created `/app/backend/reset_demo_user.py` for manual fixes if needed:

```bash
cd /app/backend
python reset_demo_user.py
```

This script:
- Forcefully resets demo user credentials
- Creates demo funnel if missing
- Verifies everything is working

### ✅ 3. Initial Setup Script
Enhanced `/app/backend/create_demo_user.py` to:
- Create demo user on first setup
- Create sample demo funnel
- Show credentials clearly

## Demo Credentials (Permanent)

```
Email:    demo@flowfunnels.com
Password: demo123
```

These credentials:
- ✅ Match the Login.js auto-fill button
- ✅ Are automatically created on backend startup
- ✅ Cannot be deleted (recreated if missing)
- ✅ Password automatically corrected if wrong

## How to Verify Fix

### 1. Check Backend Logs
```bash
tail -f /var/log/supervisor/backend.out.log
```

You should see on startup:
```
✓ Demo user exists: demo@flowfunnels.com
```

### 2. Test Login API
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@flowfunnels.com","password":"demo123"}'
```

Should return:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### 3. Test Frontend Auto-fill
1. Navigate to login page
2. Click "Auto-fill Demo Credentials" button
3. Click "Sign In"
4. Should successfully login to dashboard

## Troubleshooting

### If Demo Login Still Fails

**Option 1: Restart Backend**
```bash
sudo supervisorctl restart backend
```
The startup hook will recreate/fix the user.

**Option 2: Manual Reset**
```bash
cd /app/backend
python reset_demo_user.py
```

**Option 3: Check Database Connection**
```bash
# Verify MongoDB is running
sudo supervisorctl status mongodb

# Check backend can connect
cd /app/backend
python -c "from pymongo import MongoClient; import os; from dotenv import load_dotenv; load_dotenv(); client = MongoClient(os.getenv('MONGO_URL')); print('✓ Connected:', client.server_info()['version'])"
```

**Option 4: Check Environment Variables**
```bash
cd /app/backend
grep MONGO_URL .env
```

## Technical Details

### Database Structure
```javascript
{
  "id": "uuid-v4",
  "email": "demo@flowfunnels.com",
  "password_hash": "$2b$12$...", // bcrypt hash of "demo123"
  "name": "Demo User",
  "created_at": ISODate("2025-..."),
  "subscription_tier": "free"
}
```

### Password Hashing
- Algorithm: bcrypt via passlib
- Scheme: `CryptContext(schemes=["bcrypt"])`
- The same context is used for verification in login

### Startup Hook
- FastAPI lifecycle event: `@app.on_event("startup")`
- Runs once when uvicorn starts
- Non-blocking, doesn't slow down server start

## Files Modified

1. `/app/backend/server.py` - Added startup hook
2. `/app/backend/reset_demo_user.py` - Created manual reset script
3. `/app/backend/create_demo_user.py` - Already existed, verified working

## Testing Results

✅ Demo user auto-created on startup
✅ Login API works with demo credentials  
✅ Frontend auto-fill button works
✅ Can login and access dashboard
✅ Survives backend restarts
✅ Password automatically corrected if corrupted

## Maintenance

**No manual maintenance required!**

The startup hook ensures the demo user always exists with correct credentials. Even if:
- Database is wiped
- User is manually deleted
- Password hash is corrupted
- Backend is restarted

The demo user will be automatically restored on next backend startup.

## Security Note

The demo user has "free" subscription tier and should be treated as a public testing account. Do not store sensitive data in this account.

For production deployments, consider:
- Adding environment variable to disable demo user creation
- Implementing rate limiting on demo account
- Periodic cleanup of demo user data

---

**Status: PERMANENTLY FIXED** ✅

Last Updated: 2025-11-04
