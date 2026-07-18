# 🚀 Admin Panel Setup Guide

## ✅ What's Been Created

Your full-stack admin panel is ready! Here's what was built:

### Database Changes
- ✅ Added `UserRole` enum (USER, ADMIN)
- ✅ Added `role` field to User model
- ✅ Updated seed script to create default admin user

### Admin Pages
- ✅ `/admin` - Dashboard with stats and recent bookings
- ✅ `/admin/bookings` - Full booking management with filters
- ✅ `/admin/contacts` - View contact form messages
- ✅ `/admin/users` - User management

### Components
- ✅ Admin layout with sidebar navigation
- ✅ Booking status badges (color-coded)
- ✅ Status update buttons (Confirm, Cancel, Collected)
- ✅ Filter and search functionality
- ✅ Admin link in main navbar (only visible to admins)

### Security
- ✅ Role-based access control
- ✅ Protected routes with auto-redirect
- ✅ Server-side validation
- ✅ TypeScript types for admin sessions

## 📋 Setup Steps

### Step 1: Configure Database

If you haven't already, create a PostgreSQL database (free options):

**Option A: Neon (Recommended - Free)**
1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string

**Option B: Supabase**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection pooler string

### Step 2: Update .env File

```bash
# Open .env and add your database URL
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# AUTH_SECRET should already be there from initial setup
```

### Step 3: Apply Database Changes

```bash
# Push the schema (adds role field and enum)
npm run db:push

# Seed the database (creates admin user + scrap rates)
npm run db:seed
```

You should see:
```
✅ Default admin user created:
   Email: admin@justbin.com
   Password: admin123
   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!

✅ Seeded 5 scrap categories with rates.
```

### Step 4: Access Admin Panel

```bash
# Start the development server
npm run dev
```

1. Go to http://localhost:3000/login
2. Login with:
   - **Email:** `admin@justbin.com`
   - **Password:** `admin123`
3. After login, click **"Admin"** in the navbar
4. Or go directly to http://localhost:3000/admin

## 🎯 Default Admin Credentials

```
Email:    admin@justbin.com
Password: admin123
```

⚠️ **SECURITY WARNING:** Change this password immediately!

## 🧪 Testing the Admin Panel

### Test Scenario 1: View Dashboard
1. Login as admin
2. Visit `/admin`
3. See overview stats (will be 0 if database is fresh)
4. View recent bookings table

### Test Scenario 2: Manage Bookings
1. Create a test booking:
   - Go to http://localhost:3000/book
   - Fill out the form and submit
2. Go to `/admin/bookings`
3. See your test booking in the list
4. Click ✓ to confirm it
5. Click 📦 to mark as collected

### Test Scenario 3: Filter Bookings
1. Go to `/admin/bookings`
2. Click "Pending" to see only pending bookings
3. Use search bar to find bookings by name/city
4. Click "All" to see everything

### Test Scenario 4: View Contact Messages
1. Submit a test message via `/contact` form
2. Go to `/admin/contacts`
3. See your message in the list

## 🛠️ Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```

**Fix:**
- Make sure your `DATABASE_URL` in `.env` is correct
- Check if your database is running
- For Neon/Supabase, verify the connection string includes `?sslmode=require`

### Admin Panel Shows Unauthorized
```
Redirects to homepage with ?error=unauthorized
```

**Fix:**
- Make sure you ran `npm run db:seed`
- Verify you're logged in as `admin@justbin.com`
- Check database: `SELECT role FROM "User" WHERE email = 'admin@justbin.com';`

### Build Errors After Adding Admin Panel
```
Type errors or module not found
```

**Fix:**
```bash
# Regenerate Prisma client
npx prisma generate

# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📁 File Structure

```
JustBin/
├── prisma/
│   ├── schema.prisma          # Updated with UserRole enum
│   └── seed.ts                # Creates admin user
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Sidebar layout
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── bookings/
│   │   │   ├── contacts/
│   │   │   └── users/
│   │   └── actions/
│   │       └── admin.ts        # Update booking status
│   ├── components/
│   │   ├── admin/              # Admin components
│   │   └── navbar.tsx          # Updated with admin link
│   ├── lib/
│   │   └── admin.ts            # requireAdmin() helper
│   ├── types/
│   │   └── next-auth.d.ts      # Updated with role
│   └── auth.ts                 # Updated to include role
├── ADMIN_PANEL.md              # Full documentation
└── ADMIN_SETUP.md              # This file
```

## 🎨 Admin Panel Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Dashboard with stats | ✅ Ready | `/admin` |
| Booking management | ✅ Ready | `/admin/bookings` |
| Status updates | ✅ Ready | Click buttons in table |
| Filter & search | ✅ Ready | Top of bookings page |
| Contact messages | ✅ Ready | `/admin/contacts` |
| User management | ✅ Ready | `/admin/users` |
| Role-based access | ✅ Ready | Auto-redirect |
| Mobile responsive | ✅ Ready | All pages |
| Dark green theme | ✅ Ready | Matches site |

## 🔐 Security Best Practices

1. **Change Default Password**
   - Login and update immediately
   - Use a strong, unique password

2. **Limit Admin Access**
   - Only give ADMIN role to trusted users
   - Review user list regularly

3. **Monitor Activity**
   - Check recent bookings for suspicious patterns
   - Review contact messages for spam

4. **Production Setup**
   - Use environment variables for credentials
   - Enable SSL/TLS for database connection
   - Set up proper backup strategy

## 📚 Next Steps

After setup, you can:

1. ✅ Test all admin features
2. ✅ Create sample bookings to see the workflow
3. ✅ Customize status colors or add more statuses
4. ✅ Add more admin users if needed
5. ✅ Explore the code and extend functionality

## 💡 Enhancement Ideas

Want to extend the admin panel? Consider adding:

- 📊 Charts and analytics (booking trends, popular cities)
- 📧 Email notifications for new bookings
- 📱 WhatsApp integration for status updates
- 📥 Export data to CSV/Excel
- 🔍 Advanced filters (date range, scrap type)
- 📋 Bulk actions (update multiple bookings)
- 📝 Admin activity logs
- 🗺️ Map view of pickup locations

## 🎉 You're Ready!

Your admin panel is fully configured and ready to use. The code is production-ready with:

- ✅ TypeScript type safety
- ✅ Server-side validation
- ✅ Protected routes
- ✅ Clean, maintainable code
- ✅ Responsive design
- ✅ Dark green JustBin branding

**Questions or issues?** Check the troubleshooting section above or review the code comments.

---

**Happy managing! 🚀**
