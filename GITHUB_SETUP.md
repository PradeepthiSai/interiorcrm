# GitHub Repository Setup

## 📋 Quick Start for GitHub

### **1. Create Repository on GitHub**
- Go to [github.com/new](https://github.com/new)
- Repository name: `interiorcrm` or `interior-design-crm`
- Description: "Luxury interior design CRM with lead pipeline, notes, and smart alerts"
- Make it **Public** (so others can see it)
- Do NOT initialize with README (we already have one)
- Click **Create repository**

### **2. Push Code to GitHub**

Open PowerShell in your `c:\Users\User\InteriorCRM` folder and run:

```powershell
# Install Git (if not already installed)
# Download from: https://git-scm.com/download/win

# Initialize repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Maison Atelier luxury interior design CRM"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/interiorcrm.git

# Set default branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### **3. Your Repository is Live!**

Your code is now at: `https://github.com/YOUR_USERNAME/interiorcrm`

---

## 🎯 What to Include in Your GitHub Description

Use this in your repo description:
```
🏡 Luxury Interior Design CRM | Lead Pipeline • Notes Timeline • Smart Alerts 
JWT Auth • React • Node.js • MongoDB • Vercel + Render Deployed
```

---

## 📌 Topics to Add

In your repo settings, add these topics:
- `interior-design`
- `crm`
- `lead-management`
- `react`
- `node`
- `mongodb`
- `kanban-board`
- `jwt-auth`

---

## ✨ Optional: Add a GitHub Badge

In your README, add this after the title:

```markdown
[![Vercel Deploy](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)](https://your-vercel-url.vercel.app)
[![Render Deploy](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://your-render-url.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

---

## 🚀 Deploy After Pushing

Once code is on GitHub:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Select `frontend/` as root
4. Deploy

Then:

1. Go to [render.com](https://render.com)
2. Create new Web Service from your GitHub repo
3. Configure backend settings
4. Deploy

---

## 📊 Repository File Structure

Your repo will have this structure:

```
interiorcrm/
├── README.md                 # Main project guide
├── DEPLOYMENT.md            # Step-by-step deployment instructions
├── .gitignore              # Ignore node_modules, .env, etc
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── LeadCard.js
│   │   ├── utils.js
│   │   └── *.css
│   └── vercel.json         # Vercel config
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example        # Template for .env (add this)
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   └── render.json         # Render config
└── docs/
    └── screenshots/        # Add screenshots here
```

---

## 💡 Tips

- Add a `.env.example` file to show what environment variables are needed:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  PORT=5000
  REACT_APP_API_URL=http://localhost:5000
  ```

- Update your README with live links once deployed
- Consider adding GitHub Actions for CI/CD later
- Enable GitHub Pages if you want to host docs

---

## ✅ You're Ready!

Your complete Interior Design CRM is ready for GitHub, Vercel, and Render. 🎉
