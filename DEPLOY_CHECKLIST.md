# ✅ Vercel Deployment Quick Checklist

Use this before deploying to make sure everything is ready!

---

## 🔒 Security Check (CRITICAL!)

- [ ] `.env` file is in `.gitignore`
- [ ] No secrets committed to GitHub
- [ ] Created `.env.example` (safe to commit)
- [ ] Verified `.env` won't be pushed

**Test:** Run `git status` - `.env` should NOT appear!

---

## 📦 Pre-Deployment

- [ ] Code works perfectly locally
- [ ] All features tested
- [ ] Database schema is finalized
- [ ] `npm run build` works without errors
- [ ] No TypeScript errors
- [ ] No console errors

---

## 🐙 GitHub Setup

- [ ] GitHub account created
- [ ] New repository created on GitHub
- [ ] Repository is Public or Private (your choice)
- [ ] Git initialized locally (`git init`)
- [ ] All files committed
- [ ] Code pushed to GitHub
- [ ] Verified `.env` is NOT on GitHub

---

## 🌐 Vercel Setup

- [ ] Vercel account created
- [ ] Connected GitHub to Vercel
- [ ] Repository imported to Vercel
- [ ] Framework detected as Next.js

---

## 🔑 Environment Variables (ALL 4 REQUIRED!)

Add these in Vercel → Settings → Environment Variables:

- [ ] `DATABASE_URL` - Your Neon connection string
- [ ] `AUTH_SECRET` - From your local .env
- [ ] `AUTH_URL` - Your Vercel deployment URL
- [ ] `AUTH_TRUST_HOST` - Set to `true`

**Applied to:** All environments (Production, Preview, Development)

---

## 🚀 Deployment

- [ ] Clicked "Deploy" in Vercel
- [ ] Build succeeded (no errors)
- [ ] Deployment URL received
- [ ] Updated `AUTH_URL` with actual deployment URL
- [ ] Redeployed after updating `AUTH_URL`

---

## 🗄️ Database Setup

- [ ] Neon database is running
- [ ] Connection string is correct
- [ ] Ran `npm run db:push` (schema applied)
- [ ] Ran `npm run db:seed` (admin user created)
- [ ] Admin user credentials saved

---

## ✅ Post-Deployment Testing

### **Website:**
- [ ] Homepage loads (https://your-site.vercel.app)
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Images load correctly
- [ ] No console errors

### **Booking System:**
- [ ] Can access `/book` page
- [ ] Can fill booking form
- [ ] Form validation works
- [ ] Submission succeeds
- [ ] WhatsApp link generated
- [ ] Booking appears in admin panel

### **Admin Panel:**
- [ ] Can access `/login`
- [ ] Can login with `admin@justbin.com` / `admin123`
- [ ] Admin link appears in navbar
- [ ] Dashboard loads with stats
- [ ] Can view bookings
- [ ] Can update booking status
- [ ] Can view contacts
- [ ] Can view users
- [ ] Filters and search work

### **Contact Form:**
- [ ] Can access `/contact`
- [ ] Can submit message
- [ ] Message appears in admin contacts

---

## 🔐 Security

- [ ] Changed default admin password
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables are secure
- [ ] No secrets exposed in code
- [ ] Database has strong password

---

## 📱 Mobile Testing

- [ ] Website loads on mobile
- [ ] All pages responsive
- [ ] Booking form works on mobile
- [ ] Admin panel accessible on mobile
- [ ] Touch interactions work

---

## 🎨 Optional Enhancements

- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate verified
- [ ] Vercel Analytics enabled
- [ ] Speed Insights enabled
- [ ] Monitoring set up

---

## 📊 Production Ready Checklist

### **Critical (Must Have):**
- [x] Website loads without errors
- [x] Bookings save to database
- [x] Admin panel accessible
- [x] Login/Auth works
- [x] Environment variables set
- [x] HTTPS enabled
- [x] Database connected

### **Important (Should Have):**
- [ ] Mobile responsive
- [ ] Admin password changed
- [ ] Error pages work
- [ ] Contact form works
- [ ] All links work
- [ ] SEO meta tags set

### **Nice to Have:**
- [ ] Custom domain
- [ ] Analytics enabled
- [ ] Performance optimized
- [ ] Monitoring set up
- [ ] Backup strategy

---

## 🚨 Common Issues to Check

- [ ] `AUTH_URL` matches deployment URL exactly
- [ ] `DATABASE_URL` has `?sslmode=verify-full`
- [ ] `AUTH_TRUST_HOST` is set to `true`
- [ ] Prisma Client generated (`postinstall` script)
- [ ] No environment variable typos
- [ ] All dependencies in `package.json`

---

## 🔄 Deployment Commands

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/justbin.git
git push -u origin main

# Future updates
git add .
git commit -m "Your update message"
git push
# Vercel auto-deploys!

# Seed production database (ONCE only!)
npm run db:push
npm run db:seed
```

---

## 📞 Quick Help

**Deployment Failed?**
- Check build logs in Vercel
- Verify environment variables
- Run `npm run build` locally first

**Can't Login?**
- Verify `AUTH_URL` is correct
- Check `AUTH_TRUST_HOST=true`
- Make sure you ran `db:seed`

**Database Error?**
- Verify `DATABASE_URL` is correct
- Check Neon database is active
- Make sure connection string has `?sslmode=verify-full`

---

## ✨ Final Check

Before announcing your site is live:

1. **Open incognito browser**
2. **Visit your live URL**
3. **Test as a new user:**
   - Browse all pages
   - Create a booking
   - Submit contact form
4. **Login as admin:**
   - Check booking appeared
   - Verify all data shows
5. **Test on phone**

If all works → **You're Live!** 🎉

---

**See DEPLOY.md for detailed step-by-step instructions.**
