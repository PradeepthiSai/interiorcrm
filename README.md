# 🏡 Maison Atelier — Luxury Interior Design CRM

A boutique **Lead Management & Client Relationship Platform** built for high-end interior design studios. Streamline client inquiries, track design projects, manage notes, and prioritize leads with elegance.

---

## ✨ Features

### 🎯 Lead Pipeline Management
- **3-Stage Kanban Board** (New → Contacted → Converted)
- **Drag-and-Drop Interface** — Move leads fluidly between pipeline stages
- **Real-Time Status Updates** — Smooth transitions with premium animations
- **Lead Counts & Stage Badges** — Visual overview of pipeline health

### 📝 Client Notes & Timeline
- **Per-Lead Note Tracking** — Comprehensive timeline for every client interaction
- **Timestamped Entries** — Know exactly when each note was added
- **Notes Modal** — Beautiful, distraction-free note view with quick add
- **Last Note Preview** — See the most recent follow-up at a glance

### 🚨 Smart Alerts & Aging Logic
- **48-Hour Action Alert** — "Awaiting Action" badge if no contact in 48 hours
- **Lead Aging Timer** — Display how long each lead has been in the pipeline
- **VIP Priority Scoring** — Mark high-budget clients (₹500K+) as VIP
- **Premium Tier Badges** — Visual distinction for budget brackets

### 🎨 Premium Design Suggestions
- **Room-Type Specific Styles** — Auto-suggest design concepts per project type
  - Kitchen → Minimal Modern
  - Living Room → Warm Luxe
  - Bedroom → Serene Retreat
  - Bathroom → Spa Elegance
  - Office → Contemporary Studio

### 🏫 Boutique Studio Branding
- **Maison Atelier** — Refined studio identity with luxury crest
- **Design Inspiration Panel** — Curated mood boards for team reference
- **Warm Luxury Palette** — Gold, cream, charcoal, and soft shadow colors
- **Premium Typography** — Playfair Display serif headlines + Poppins sans-serif

### 🔐 Enterprise Security
- **JWT Authentication** — Secure login with 7-day token expiry
- **Protected Routes** — All lead data requires authentication
- **Password Hashing** — bcryptjs encryption for all stored passwords
- **User Roles** — Admin and staff role support

### 🚀 Demo-Ready
- **Auto-Seeded Admin User** — `admin@atelier.test / Luxury123!`
- **Sample Leads** — 3 pre-loaded clients across all pipeline stages
- **Instant Dashboard Preview** — No setup required; login and explore

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** — Modern, functional component architecture
- **Axios** — HTTP client for API communication
- **CSS3** — Hand-crafted premium styling with gradients and animations
- **localStorage** — Client-side session persistence

### **Backend**
- **Node.js & Express 5** — Lightweight, fast REST API
- **MongoDB & Mongoose** — Flexible document storage
- **JWT (jsonwebtoken)** — Stateless authentication
- **bcryptjs** — Password hashing and comparison
- **CORS** — Cross-origin resource sharing for frontend

### **Deployment**
- **Frontend** — Vercel (optimized React builds)
- **Backend** — Render (MongoDB-friendly Node.js hosting)
- **Database** — MongoDB Atlas (cloud database)

---

## 📸 Screenshots

The following screenshot files are included as placeholders under `docs/screenshots/`.
Replace them with actual screenshots from the deployed app once available.

### 🏠 Landing Page
![Home Page](./docs/screenshots/home.png)
- Brand introduction with "Maison Atelier" studio crest
- Feature highlights (Curated Pipeline, Staff-ready Notes, Premium Alerts)
- Clear call-to-action buttons for entry

### 🔓 Login Screen
![Login](./docs/screenshots/login.png)
- Clean, centered auth form
- Toggle between Login/Register
- Sample admin credentials displayed
- Back-to-home navigation

### 📊 Dashboard Pipeline
![Dashboard](./docs/screenshots/dashboard.png)
- **3-Column Kanban**: New (yellow), Contacted (blue), Converted (green)
- **Premium Lead Cards** with:
  - Client name + room type emoji
  - VIP/Premium/Standard badges
  - Budget in ₹ (Indian Rupees)
  - Lead aging timer (days/hours/minutes)
  - Notes count
  - Status selector
  - Awaiting-action alert (if applicable)
- **Design Inspiration Panel** at top with mood boards
- **Add Lead Button** + Logout control

### 📋 Add Lead Modal
![Add Lead](./docs/screenshots/add-lead.png)
- Form for: Client Name, Email, Phone, Room Type, Budget
- Clean modal overlay with smooth animations
- Cancel & Create buttons

### 💬 Notes Timeline
![Notes Modal](./docs/screenshots/notes-modal.png)
- Vertical timeline of all client interactions
- Timestamped entries (date + time)
- Quick-add textarea at bottom
- Beautiful modal with backdrop blur

### 🎨 Design Inspiration Section
![Inspiration](./docs/screenshots/inspiration-panel.png)
- 3 mood cards: Minimal Luxe, Serene Living, Curated Retreat
- Each with style description and material hints
- Hover effects for interactivity

---

## 🚀 How It Works

### **1. Authentication Flow**
1. User lands on **Home Page**
2. Clicks "Login / Register"
3. Registers a new studio account OR logs in with existing credentials
4. Backend creates JWT token → stored in `localStorage`
5. User directed to **Dashboard**

### **2. Lead Lifecycle**
1. **New Lead**: Client fills inquiry form
   - Lead appears in "New" column
   - "Awaiting Action" alert triggers if no note in 48h
2. **Contact**: Team reaches out
   - Move lead to "Contacted" column via drag-and-drop
   - Add notes about conversation
3. **Conversion**: Client approves project
   - Drag to "Converted" column
   - Track project milestones in notes

### **3. Data Persistence**
- Every action (status change, note, delete) hits the backend immediately
- MongoDB stores all data with user ownership
- Changes reflected across browser tabs in real-time

### **4. Smart Scoring**
- **Budget Parsing**: ₹250K+ = Premium, ₹500K+ = VIP
- **Aging Calculation**: Tracks days/hours since lead created
- **Room Type Matching**: Suggests design style based on room type

### **5. Drag-and-Drop Pipeline**
- Drag a card between columns
- Backend updates lead status
- Card animates to new column with pulse effect
- No page refresh needed

---

## 📦 Installation & Local Setup

### **Prerequisites**
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### **Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/interiorcrm.git
   cd interiorcrm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   touch .env
   ```
   Add to `.env`:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/interior-crm
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   ```
   Start:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Start:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

4. **Login**
   - Email: `admin@atelier.test`
   - Password: `Luxury123!`

---

## 🌐 Deployment

### **Frontend → Vercel**

1. Push frontend folder to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repo → Select `frontend/` as root directory
4. Set environment variables if needed
5. Deploy

### **Backend → Render**

1. Push backend folder to GitHub
2. Go to [render.com](https://render.com)
3. Create **New Web Service** → Connect GitHub
4. Set build command: `npm install`
5. Set start command: `npm run dev` (or `node server.js`)
6. Add environment variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Secret key
7. Deploy

### **Environment Variables**

#### Backend (.env)
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/interior-crm
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
```

#### Frontend (update axios baseURL)
In `frontend/src/` files, ensure API calls point to your Render backend:
```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
```

---

## 📐 API Reference

### **Authentication**
- `POST /api/auth/register` — Create new user
- `POST /api/auth/login` — Login and get JWT token

### **Leads (Protected)**
- `GET /api/leads` — Fetch all leads for user
- `POST /api/leads` — Create new lead
- `PUT /api/leads/:id` — Update lead (status, budget, etc.)
- `DELETE /api/leads/:id` — Delete lead

### **Notes (Protected)**
- `POST /api/leads/:id/notes` — Add note to lead

---

## 🎯 Future Enhancements

- [ ] Photo uploads for mood boards
- [ ] Email reminders for awaiting-action leads
- [ ] Proposal generation from notes
- [ ] Calendar view for project timelines
- [ ] Team collaboration & permissions
- [ ] Advanced filtering & search
- [ ] Export leads to PDF
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License — Feel free to use this project for your design studio.

---

## 🤝 Contributing

Contributions welcome! Please fork, create a feature branch, and submit a pull request.

---

## 💬 Support

For issues, questions, or feature requests, open an issue on GitHub or reach out to the team.

---

**Built with ❤️ for luxury interior design studios.**

*Maison Atelier CRM — Where elegance meets efficiency.*
