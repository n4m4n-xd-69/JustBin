# ⚡ Quick Deploy Guide - 5 Minutes

For experienced developers who want the fastest path to deployment.

---

## 🚀 Prerequisites

- GitHub account
- Vercel account  
- Neon database running

---

## 📦 1. Push to GitHub (2 min)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/justbin.git
git push -u origin main
```

**⚠️ VERIFY:** `.env` is NOT on GitHub!

---

## 🌐 2. Deploy to Vercel (1 min)

1. Go to https://vercel.com/new
2. Import your `justbin` repository
3. Add environment variables:
   - `DATABASE_URL` - Your Neon connection string
   - `AUTH_SECRET` - From your local .env
   - `AUTH_URL` - Leave blank for now
   - `AUTH_TRUST_HOST` - Set to `true`
4. Click **Deploy**

---

## 🔧 3. Update AUTH_URL (1 min)

After deployment:

1. Copy your deployment URL (e.g., `https://justbin-xxx.vercel.app`)
2. Go to Vercel → Settings → Environment Variables
3. Edit `AUTH_URL` to your deployment URL
4. Redeploy

---

## 🗄️ 4. Setup Database (1 min)

```bash
# From your local machine
npm run db:push   # Push schema
npm run db:seed   # Create admin user
```

---

## ✅ Done!

**Your site:** https://your-project.vercel.app  
**Admin panel:** https://your-project.vercel.app/admin  
**Login:** `admin@justbin.com` / `admin123`

---

## 🔄 Future Updates

```bash
git add .
git commit -m "Update"
git push
# Auto-deploys to Vercel!
```

---

## 🐛 Troubleshooting

**Build failed?**
- Check Vercel build logs
- Verify all 4 environment variables are set

**Can't login?**
- Make sure `AUTH_URL` matches your deployment URL
- Verify `AUTH_TRUST_HOST=true`

**Database error?**
- Check `DATABASE_URL` is correct
- Make sure it has `?sslmode=verify-full`

---

**See DEPLOY.md for detailed instructions.**
