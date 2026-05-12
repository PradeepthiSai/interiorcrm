# Maison Atelier Interior Design CRM

## Quick Deployment Guide

### 🚀 Frontend Deployment (Vercel)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/interiorcrm.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Framework: **React**
   - Root Directory: **frontend**
   - Environment Variables:
     - `REACT_APP_API_URL` = Your Render backend URL (e.g., `https://interiorcrm-api.onrender.com`)
   - Click **Deploy**

3. **Your frontend will be live at:** `https://yourusername-interiorcrm.vercel.app`

---

### 🚀 Backend Deployment (Render)

1. **Push Backend to GitHub**
   - Your `backend/` folder is already in the main repo

2. **Deploy to Render**
   - Go to [render.com](https://render.com/dashboard)
   - Click **New +** → **Web Service**
   - Connect your GitHub repo
   - Name: `interiorcrm-api`
   - Environment: **Node**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: **Free** (or Starter)
   - Environment Variables:
     ```
MONGO_URI=your_connection_string_here     JWT_SECRET=<your-jwt-secret>
     NODE_ENV=production
     ```
     ⚠️ **Do NOT paste actual credentials here** — set them in Render's dashboard instead (see section below).
   - Click **Create Web Service**

3. **Your backend will be live at:** `https://interiorcrm-api.onrender.com`

---

### 📦 MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with a strong password
4. Whitelist all IP addresses (0.0.0.0/0) or your Render IP
5. Copy the connection string (save it temporarily, never commit it)
6. In Render dashboard, go to **Environment** and add:
   - Key: `MONGO_URI`
   - Value: Your MongoDB connection string (paste the actual URI here, not in code)
   - Do **NOT** commit this to GitHub

⚠️ **Security Note**: Database URIs with credentials should ONLY be stored in:
- Local `.env` file (Git-ignored)
- Deployment platform environment variables (Render, Vercel dashboards)
- **NEVER** in committed code or documentation

---

### ✅ Testing the Live Deployment

1. Open your Vercel frontend URL
2. Login with:
   - Email: `admin@atelier.test`
   - Password: `Luxury123!`
3. Try adding a lead, drag-and-drop, and add notes
4. All data should persist

---

### 🔗 Environment Variables Summary

| Service | Variable | Where to Set |
|---------|----------|------|
| **Render Backend** | `MONGO_URI` | Render Dashboard → Environment |
| **Render Backend** | `JWT_SECRET` | Render Dashboard → Environment |
| **Vercel Frontend** | `REACT_APP_API_URL` | Vercel Dashboard → Environment |

⚠️ **Never** put actual `MONGO_URI` or `JWT_SECRET` values in code, documentation, or version control.

---

### 🐛 Troubleshooting

**Frontend can't connect to backend?**
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check CORS is enabled in backend (it is by default)
- Verify backend is running and accessible

**MongoDB connection error?**
- Whitelist Render IP in MongoDB Atlas
- Check username/password in connection string
- Ensure database exists

**JWT errors?**
- Backend and frontend are using the same `JWT_SECRET` (they should be)
- Token expires in 7 days; user must re-login after that

---

### 📞 Support

For deployment help, check:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

**Your live CRM is ready! 🎉**
