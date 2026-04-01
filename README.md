# 🌿 HopeRise Foundation — NGO Website

A fully responsive, production-ready NGO website built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) featuring JWT authentication, admin panel, modern animations, and a premium UI design.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite, Framer Motion, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Auth** | JWT (JSON Web Tokens) + bcrypt |
| **Styling** | Custom CSS with design tokens |

## 📁 Project Structure

```
├── server/                 # Express backend
│   ├── config/db.js        # MongoDB connection
│   ├── controllers/        # Route handlers (8 files)
│   ├── middleware/          # Auth & error handling
│   ├── models/             # Mongoose schemas (7 files)
│   ├── routes/             # Express routers (8 files)
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI (7 components)
│   │   ├── pages/          # Page components (10 pages)
│   │   ├── context/        # Auth context
│   │   ├── utils/          # API module
│   │   ├── App.jsx         # Router config
│   │   └── index.css       # Complete design system
│   └── index.html
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure Environment Variables

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hoperise_ngo?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
```

### 3. Create Admin User

Start the server, then make a POST request:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@hoperise.org","password":"admin123","role":"admin"}'
```

### 4. Run the Application

```bash
# Terminal 1 — Backend
cd server
npm start

# Terminal 2 — Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, mission, counters, CTA, testimonials |
| About | `/about` | Vision, mission, timeline, team |
| Our Works | `/works` | Projects with category filtering |
| Volunteer | `/volunteer` | Registration form with validation |
| Gallery | `/gallery` | Image grid with lightbox |
| Contact | `/contact` | Contact form + Google Maps |
| Blog | `/blog` | News and stories |
| Donate | `/donate` | Donation form with presets |
| Admin Login | `/admin/login` | JWT authentication |
| Admin Dashboard | `/admin` | Stats + CRUD management |

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/profile` | JWT | Get profile |
| POST | `/api/volunteers` | — | Register volunteer |
| GET | `/api/volunteers` | Admin | List volunteers |
| POST | `/api/contacts` | — | Submit message |
| GET/POST | `/api/projects` | Public/Admin | Projects CRUD |
| GET/POST | `/api/gallery` | Public/Admin | Gallery CRUD |
| GET/POST | `/api/blogs` | Public/Admin | Blog CRUD |
| POST | `/api/donations` | — | Make donation |
| GET | `/api/stats/dashboard` | Admin | Dashboard stats |

## 🎨 Design Features

- **Color**: Teal (#0D7377) + Gold (#FFD700) palette
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Animations**: Scroll reveals, hover effects, count-up counters, page transitions
- **Responsive**: Mobile-first, works on all screen sizes
- **Components**: Glassmorphism cards, gradient overlays, floating particles

## 📦 Database Collections

Users, Volunteers, Contacts, Projects, Gallery, Blogs, Donations
