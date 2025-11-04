# FlowFunnels 🚀

> An intuitive and powerful affiliate marketing funnel builder platform

FlowFunnels simplifies creating and managing complete sales funnels to accelerate revenue growth and provide a smooth buying experience for customers. Build high-converting affiliate marketing funnels with our drag-and-drop editor, professional templates, and powerful analytics.

## 🎯 Current Status: MVP Phase 1.5 Complete

### ✅ Phase 1: Foundation & Core Infrastructure (COMPLETE)
- **Backend:** FastAPI server with JWT authentication
- **Frontend:** React application with modern Tailwind CSS
- **Database:** MongoDB with user, funnel, page, analytics, and template collections
- **Authentication:** Secure login and registration system
- **Dashboard:** Modern funnel management interface

### ✅ Phase 1.5: UI Modernization & Enhancement (COMPLETE)
- **Design System:** Modern minimalist design with glassmorphism effects
- **Responsive:** Fully mobile-responsive with collapsible sidebar
- **Animations:** Smooth transitions and micro-interactions throughout
- **Components:** Enhanced cards, buttons, modals, and forms
- **User Experience:** Loading skeletons, better empty states, improved feedback

### 🚧 Currently Available Features

#### 1. User Authentication
- Secure registration and login
- JWT-based authentication
- User profile management

#### 2. Funnel Management
- Create unlimited funnels
- Edit funnel details
- Delete funnels
- View all your funnels in one dashboard

#### 3. Page Management
- Add multiple pages to each funnel
- Configure page names and slugs
- Basic page settings

#### 4. Template Library
- 3 pre-built professional templates:
  - Lead Capture Funnel
  - Product Launch Funnel
  - Webinar Registration Funnel
- Clone templates to start quickly

#### 5. Basic Analytics
- Page view tracking
- Button click tracking
- Form submission tracking
- Conversion rate calculation

## 📋 Upcoming Features (Phases 2-3)

### Phase 2: Funnel Builder Core
- Drag-and-drop visual editor
- Element library (buttons, forms, text, images, video)
- Real-time preview
- Mobile/Desktop view toggle
- Undo/Redo functionality

### Phase 3: Publishing & Advanced Features
- Custom domain support
- Funnel publishing system
- A/B split testing
- Email marketing automation
- Advanced analytics dashboard

## 🛠 Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB
- **Authentication:** JWT
- **API Documentation:** OpenAPI/Swagger

### Frontend
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Charts:** Recharts

### Infrastructure
- **Hosting:** Kubernetes Container
- **Process Manager:** Supervisor
- **Database:** MongoDB

## 🚀 Getting Started

### 🎮 Quick Demo (No Registration Required!)

**Try FlowFunnels instantly with our demo account:**

```
Email:    demo@flowfunnels.com
Password: demo123
```

Just click the **"Auto-fill Demo Credentials"** button on the login page!

See [DEMO_GUIDE.md](DEMO_GUIDE.md) for complete testing instructions.

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- Yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/vkmindia80/FlowFunnels.git
cd FlowFunnels
```

2. **Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
python seed_database.py  # Seed sample templates
python server.py
```

3. **Frontend Setup:**
```bash
cd frontend
yarn install
yarn start
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs

### Using Supervisor (Production)

```bash
sudo supervisorctl restart all
sudo supervisorctl status
```

## 📚 API Documentation

Once the backend is running, visit http://localhost:8001/docs for interactive API documentation.

### Key Endpoints:

**Authentication:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

**Funnels:**
- POST `/api/funnels` - Create funnel
- GET `/api/funnels` - List all funnels
- GET `/api/funnels/{id}` - Get funnel details
- PUT `/api/funnels/{id}` - Update funnel
- DELETE `/api/funnels/{id}` - Delete funnel

**Pages:**
- POST `/api/pages` - Create page
- GET `/api/pages/{id}` - Get page details
- PUT `/api/pages/{id}` - Update page
- DELETE `/api/pages/{id}` - Delete page
- GET `/api/funnels/{id}/pages` - Get funnel pages

**Templates:**
- GET `/api/templates` - List all templates
- POST `/api/templates/{id}/clone` - Clone template

**Analytics:**
- POST `/api/analytics/track` - Track event
- GET `/api/analytics/funnel/{id}` - Get funnel analytics

## 🗺️ Development Roadmap

See [ROADMAP.md](ROADMAP.md) for the complete 20-week development plan covering:
- Phases 1-3: Core Foundation & Funnel Builder (✅ In Progress)
- Phases 4-6: Tracking, Analytics & Optimization
- Phases 7-9: Advanced Features & AI Integration
- Phase 10: Mobile Optimization & Final Polish

## 🎨 Design Philosophy

- **Modern Minimalist:** Clean, spacious layouts with subtle animations
- **Glassmorphism:** Frosted glass effects for depth and elegance
- **Intuitive:** Easy to use for non-technical users
- **Powerful:** Advanced features for power users
- **Fast:** Optimized for performance with smooth 60fps animations
- **Beautiful:** Modern gradient design with enhanced visual hierarchy
- **Responsive:** Works perfectly on all devices with touch-optimized controls

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation

## 📈 Performance

- Fast page loading (<2s target)
- Optimized database queries
- Efficient API responses
- CDN-ready architecture

## 🤝 Contributing

This is currently in MVP development phase. Stay tuned for contribution guidelines!

## 📄 License

Copyright © 2025 FlowFunnels. All rights reserved.

## 🙋 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for affiliate marketers and digital entrepreneurs**
