# 🚀 Deploy JustBin to Vercel - Complete Guide

This guide will walk you through deploying your JustBin website to Vercel from start to finish.

---

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ GitHub account (create at https://github.com/signup)
- ✅ Vercel account (create at https://vercel.com/signup)
- ✅ Neon.tech database (already set up)
- ✅ Your JustBin code working locally

**Time Required:** 15-20 minutes

---

## 🎯 Deployment Overview

```
Local Code → GitHub Repository → Vercel → Live Website
              ↓
         Database (Neon.tech)
```

---

## 📦 Step 1: Prepare Your Code for Deployment

### **1.1 Create .gitignore (if not exists)**

Check if you have a `.gitignore` file in your project root. If not, create one:

```bash
# Check if it exists
ls .gitignore

# If not, create it
New-Item -Path ".gitignore" -ItemType File
```

### **1.2 Verify .gitignore Contents**

Make sure your `.gitignore` includes these critical items:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
/prisma/migrations
```

**⚠️ CRITICAL:** Never commit `.env` file to GitHub!

### **1.3 Create Production Environment Template**

Create `.env.example` file (this is safe to commit):

```bash
DATABASE_URL="postgresql://username:password@host/database?sslmode=verify-full"
AUTH_SECRET="your-secret-key-here"
AUTH_URL="https://your-domain.vercel.app"
AUTH_TRUST_HOST="true"
```

### **1.4 Update package.json Scripts**

Open `package.json` and verify these scripts exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed"
  }
}
```

**Important:** The `postinstall` script ensures Prisma Client is generated during Vercel build.

---

## 🐙 Step 2: Push Code to GitHub

### **2.1 Initialize Git Repository**

Open PowerShell in your project folder:

```bash
# Navigate to your project
cd C:\Users\V3X0R\AntiGravity\JustBin

# Initialize git (if not already done)
git init

# Check status
git status
```

### **2.2 Create GitHub Repository**

1. Go to https://github.com/new
2. **Repository name:** `justbin` (or any name you prefer)
3. **Description:** "JustBin - Scrap Pickup Platform"
4. **Visibility:** Choose Public or Private
5. **DO NOT** check any boxes (no README, no .gitignore, no license)
6. Click **"Create repository"**

### **2.3 Add All Files to Git**

```bash
# Stage all files
git add .

# Check what will be committed
git status

# Verify .env is NOT in the list (should be ignored)
# If you see .env, STOP and fix .gitignore first!
```

### **2.4 Commit Your Code**

```bash
# Create first commit
git commit -m "Initial commit - JustBin scrap pickup platform"
```

### **2.5 Push to GitHub**

GitHub will show you commands. Copy them and run:

```bash
# Add remote repository (replace with YOUR GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/justbin.git

# Rename branch to main (if needed)
git branch -M main

# Push code
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

### **2.6 Verify Upload**

Go to your GitHub repository URL:
```
https://github.com/YOUR-USERNAME/justbin
```

You should see all your code files!

**⚠️ SECURITY CHECK:**
- Click through files
- Make sure `.env` is **NOT** there
- If you see `.env`, DELETE the repository and start over!

---

## 🌐 Step 3: Deploy to Vercel

### **3.1 Sign Up / Login to Vercel**

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### **3.2 Import Your Repository**

1. On Vercel Dashboard, click **"Add New..."**
2. Select **"Project"**
3. You'll see **"Import Git Repository"**
4. Find your `justbin` repository
5. Click **"Import"**

### **3.3 Configure Project**

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### **3.4 Add Environment Variables**

This is **CRITICAL**! Click **"Environment Variables"** and add these:

#### **Variable 1: DATABASE_URL**
```
Name:  DATABASE_URL
Value: postgresql://neondb_owner:npg_lWrdxma60OFG@ep-withered-bar-az6e0yha-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full
```
*Use your actual Neon connection string*

#### **Variable 2: AUTH_SECRET**
```
Name:  AUTH_SECRET
Value: j4VjfgkGU6TMBduO4LDpJtWWfAME/Xr2cv3TL9dPhlc=
```
*Use your actual auth secret from .env*

#### **Variable 3: AUTH_URL**
```
Name:  AUTH_URL
Value: https://YOUR-PROJECT-NAME.vercel.app
```
*We'll update this after deployment*

#### **Variable 4: AUTH_TRUST_HOST**
```
Name:  AUTH_TRUST_HOST
Value: true
```

**Apply to:** All (Production, Preview, Development)

### **3.5 Deploy!**

Click **"Deploy"** button and wait...

You'll see:
1. ⏳ Installing dependencies...
2. ⏳ Building application...
3. ⏳ Generating Prisma Client...
4. ⏳ Creating production build...
5. ✅ **Deployment Complete!**

**Estimated time:** 2-5 minutes

---

## 🎉 Step 4: Post-Deployment Setup

### **4.1 Get Your Deployment URL**

After successful deployment, you'll see:

```
🎊 Congratulations!
Your project is live at:
https://justbin-xxxxx.vercel.app
```

**Copy this URL!**

### **4.2 Update AUTH_URL Environment Variable**

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Environment Variables"**
3. Find **AUTH_URL**
4. Click **"Edit"**
5. Change value to your actual Vercel URL:
   ```
   https://justbin-xxxxx.vercel.app
   ```
6. Click **"Save"**

### **4.3 Redeploy to Apply Changes**

1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## 🗄️ Step 5: Set Up Production Database

### **5.1 Verify Neon Database Connection**

Your database is already set up, but let's verify:

1. Go to https://console.neon.tech
2. Check your `justbin` project is active
3. Verify connection string matches what you put in Vercel

### **5.2 Push Database Schema to Production**

**Option A: From Local (Recommended)**

```bash
# Make sure DATABASE_URL in .env points to production Neon database
npm run db:push
```

**Option B: From Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull .env.production
npm run db:push
```

### **5.3 Seed Production Database**

⚠️ **Only run this ONCE to create admin user!**

```bash
npm run db:seed
```

You should see:
```
✅ Default admin user created:
   Email: admin@justbin.com
   Password: admin123

✅ Seeded 5 scrap categories with rates.
```

**IMPORTANT:** Change admin password after first login!

---

## ✅ Step 6: Test Your Live Website

### **6.1 Test Main Website**

Visit: `https://your-project.vercel.app`

**Check:**
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Images load
- ✅ Theme toggle works (light/dark)
- ✅ All pages accessible

### **6.2 Test Booking System**

1. Go to `/book`
2. Fill out booking form
3. Submit
4. Should see WhatsApp confirmation
5. **Check admin panel** to verify it saved

### **6.3 Test Admin Panel**

1. Go to `/login`
2. Login with:
   ```
   Email: admin@justbin.com
   Password: admin123
   ```
3. Click **"Admin"** in navbar
4. **Dashboard should load** with stats
5. Check all admin pages work

### **6.4 Test Contact Form**

1. Go to `/contact`
2. Fill out form
3. Submit
4. Check `/admin/contacts` to see message

---

## 🎨 Step 7: Configure Custom Domain (Optional)

### **7.1 Add Custom Domain**

1. In Vercel dashboard → **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain: `justbin.com`
4. Click **"Add"**

### **7.2 Configure DNS**

Vercel will show you DNS records to add:

**For Root Domain (justbin.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### **7.3 Update AUTH_URL**

After domain is verified:

1. Go to **"Settings"** → **"Environment Variables"**
2. Update **AUTH_URL** to:
   ```
   https://justbin.com
   ```
3. Redeploy

---

## 🔧 Step 8: Configure Vercel Project Settings

### **8.1 Set Production Branch**

1. Go to **"Settings"** → **"Git"**
2. **Production Branch:** `main`
3. Enable **"Auto-Deploy"** ✅

This means every push to `main` branch auto-deploys!

### **8.2 Set Build Settings**

Already configured, but verify:

- **Framework:** Next.js
- **Node Version:** 20.x (or latest)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### **8.3 Configure Environment-Specific Variables**

You can have different values for:
- **Production:** Live site
- **Preview:** Pull request previews
- **Development:** Local development

Example:
```
Production AUTH_URL: https://justbin.com
Preview AUTH_URL: https://preview-justbin.vercel.app
```

---

## 🚨 Troubleshooting Common Issues

### **Issue 1: Build Failed - Prisma Error**

**Error:**
```
Error: Prisma Client not generated
```

**Fix:**
Add to `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

Redeploy.

---

### **Issue 2: Database Connection Failed**

**Error:**
```
Can't reach database server
```

**Fix:**
1. Check `DATABASE_URL` in Vercel environment variables
2. Verify Neon database is running
3. Make sure connection string has `?sslmode=verify-full`
4. Redeploy

---

### **Issue 3: Auth Errors / Redirect Issues**

**Error:**
```
Invalid redirect URL
```

**Fix:**
1. Make sure `AUTH_URL` matches your deployment URL exactly
2. Set `AUTH_TRUST_HOST=true`
3. For custom domain, update `AUTH_URL` to domain
4. Redeploy

---

### **Issue 4: Admin Panel Shows 401 Unauthorized**

**Fix:**
1. Make sure you ran `npm run db:seed`
2. Check admin user exists in database:
   ```bash
   npm run db:studio
   ```
3. Look in `User` table for `admin@justbin.com`
4. Verify `role = ADMIN`

---

### **Issue 5: Environment Variables Not Working**

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Make sure all 4 variables are set:
   - DATABASE_URL
   - AUTH_SECRET
   - AUTH_URL
   - AUTH_TRUST_HOST
3. Make sure they're applied to all environments
4. **Redeploy** after any env var change!

---

### **Issue 6: Images Not Loading**

**Fix:**
Add to `next.config.ts`:
```typescript
const config: NextConfig = {
  images: {
    domains: ['your-domain.com'],
  },
};
```

---

### **Issue 7: Module Not Found Errors**

**Fix:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Commit and push
git add .
git commit -m "Fix dependencies"
git push
```

Vercel will auto-deploy.

---

## 📊 Step 9: Monitoring & Analytics

### **9.1 Enable Vercel Analytics**

1. In project dashboard → **"Analytics"**
2. Click **"Enable"**
3. Free tier gives you:
   - Page views
   - Visitor counts
   - Top pages
   - Referral sources

### **9.2 Enable Speed Insights**

1. Go to **"Speed Insights"**
2. Click **"Enable"**
3. Monitor:
   - First Contentful Paint
   - Largest Contentful Paint
   - Time to Interactive

### **9.3 Check Logs**

View deployment logs:
1. Go to **"Deployments"**
2. Click on any deployment
3. Click **"View Build Logs"**
4. Check **"Runtime Logs"** for production errors

---

## 🔐 Step 10: Security Best Practices

### **10.1 Change Default Admin Password**

**IMMEDIATELY after deployment:**

1. Login to `/login`
2. Go to admin panel
3. Create a new admin user with strong password
4. Delete or disable default admin

### **10.2 Secure Environment Variables**

✅ Never commit `.env` to GitHub  
✅ Use different `AUTH_SECRET` for production  
✅ Rotate secrets regularly  
✅ Use strong database passwords  

### **10.3 Enable HTTPS Only**

Vercel automatically enables HTTPS, but verify:
1. Settings → Domains
2. **SSL:** Auto-enabled ✅
3. **Force HTTPS:** Enabled ✅

### **10.4 Configure Rate Limiting**

Add to your API routes for production:
```typescript
// Prevent spam bookings
import rateLimit from 'express-rate-limit';
```

---

## 🔄 Step 11: Continuous Deployment Workflow

### **11.1 Make Changes Locally**

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test locally

# Commit
git add .
git commit -m "Add new feature"

# Push
git push origin feature/new-feature
```

### **11.2 Preview Deployment**

Vercel automatically creates a preview deployment for your branch!

Check it at: `https://justbin-git-feature-username.vercel.app`

### **11.3 Merge to Production**

```bash
# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

**Vercel auto-deploys to production!** 🚀

---

## 📱 Step 12: Test on Mobile

### **12.1 Test Responsive Design**

1. Open your live site on mobile
2. Test all pages:
   - Homepage
   - Booking form
   - Admin panel
   - Contact form

### **12.2 Test Mobile Booking**

1. Fill booking form on mobile
2. Submit
3. WhatsApp link should work
4. Check admin panel

---

## 🎯 Deployment Checklist

Before going live, check all these:

### **Pre-Deployment:**
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` created
- [ ] Code tested locally
- [ ] All features working
- [ ] Database schema pushed
- [ ] Admin user seeded

### **Vercel Configuration:**
- [ ] Repository imported
- [ ] All 4 environment variables set
- [ ] `AUTH_URL` matches deployment URL
- [ ] Production branch set to `main`
- [ ] Auto-deploy enabled

### **Post-Deployment:**
- [ ] Website loads successfully
- [ ] All pages accessible
- [ ] Booking form works
- [ ] Admin login works
- [ ] Admin panel shows data
- [ ] Contact form works
- [ ] Theme toggle works
- [ ] Mobile responsive

### **Security:**
- [ ] Default admin password changed
- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] No secrets in GitHub

### **Optional:**
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Speed insights enabled
- [ ] Monitoring set up

---

## 🚀 Quick Deployment Commands Reference

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit"

# 2. Push to GitHub
git remote add origin https://github.com/USERNAME/justbin.git
git push -u origin main

# 3. After Vercel deployment, seed database
npm run db:push
npm run db:seed

# 4. Future updates
git add .
git commit -m "Update message"
git push
# Vercel auto-deploys!
```

---

## 📞 Support & Resources

### **Vercel Documentation:**
- https://vercel.com/docs
- https://vercel.com/docs/frameworks/nextjs

### **Neon Documentation:**
- https://neon.tech/docs/introduction

### **Next.js Documentation:**
- https://nextjs.org/docs

### **Prisma Documentation:**
- https://www.prisma.io/docs

---

## 🎊 Congratulations!

Your JustBin website is now live on the internet! 🌍

**Your live URLs:**
- **Website:** https://your-project.vercel.app
- **Admin Panel:** https://your-project.vercel.app/admin
- **Login:** https://your-project.vercel.app/login

**Next Steps:**
1. Share your website URL
2. Test all features thoroughly
3. Monitor analytics
4. Collect user feedback
5. Iterate and improve!

---

**Happy Deploying! 🚀**

Need help? Check the troubleshooting section or Vercel's support documentation.
