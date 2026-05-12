# 🔐 Security & Environment Variables Guide

## ⚠️ Critical: Never Commit Secrets

This project uses environment variables to keep sensitive data (MongoDB credentials, JWT secrets) out of version control.

## Setup Instructions

### 1. Create Your Local `.env` File

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env`:
- Replace `<username>` and `<password>` with your MongoDB user
- Replace `<cluster>` with your MongoDB cluster name
- Set a strong JWT_SECRET

### 2. Verify `.env` is Git-Ignored

The `.gitignore` file already includes `.env`, so it won't be committed. Verify:

```bash
git status  # .env should NOT appear in the list
```

### 3. Environment Variables for Deployment

#### Render Backend
When deploying to Render, set these in the **Environment** section of your Web Service:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/interior-crm?retryWrites=true&w=majority
JWT_SECRET=<your-strong-secret>
NODE_ENV=production
```

**Do NOT paste these values in code or documentation.**

#### Vercel Frontend
When deploying to Vercel, set this in the **Environment Variables** section:

```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com
```

## 🚨 If You Ever Expose Credentials

1. **Immediately rotate credentials** in MongoDB Atlas:
   - Go to Database Access → Users
   - Reset the password or delete the old user
   - Create a new database user

2. **Check Git history** to ensure they weren't committed

3. **Update all deployments** with new credentials

4. **Verify** the old credentials are completely removed from:
   - Local files
   - GitHub commits
   - Deployment platforms

## Best Practices

✅ **DO:**
- Use `.env` files for local development
- Use platform environment variables for production
- Keep `.env` in `.gitignore`
- Rotate credentials periodically
- Use strong, unique secrets (avoid predictable patterns)

❌ **DON'T:**
- Commit `.env` to GitHub
- Hardcode secrets in source code
- Share credentials in documentation
- Use the same secret for dev, test, and production
- Paste actual credentials in code examples or READMEs
