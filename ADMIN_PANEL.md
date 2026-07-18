# JustBin Admin Panel

## 🔐 Default Admin Credentials

**Email:** `admin@justbin.com`  
**Password:** `admin123`

⚠️ **IMPORTANT:** Change this password immediately after first login!

## 🚀 Quick Start

### 1. Database Setup

First, push the updated schema and seed the admin user:

```bash
# Push schema changes (adds UserRole enum and role field)
npm run db:push

# Seed database (creates admin user + scrap categories)
npm run db:seed
```

### 2. Access Admin Panel

1. Start the development server: `npm run dev`
2. Navigate to **http://localhost:3000/login**
3. Login with the default admin credentials above
4. Click **"Admin"** in the navbar or go to **http://localhost:3000/admin**

## 📊 Admin Dashboard Features

### **Dashboard** (`/admin`)
- **Overview Statistics**
  - Total bookings count
  - Pending, Confirmed, Collected counts
  - Contact messages count
  - Registered users count
- **Recent Bookings Table**
  - Last 10 bookings with customer info, status, and pickup dates

### **Bookings Management** (`/admin/bookings`)
- **View All Bookings** with complete details:
  - Customer name, email, phone
  - Full address, city, pincode
  - Scrap types and estimated weight
  - Pickup date and time
  - Current status with color-coded badges
- **Filter Bookings**
  - By status: All / Pending / Confirmed / Collected / Cancelled
  - Search by name, phone, city, or address
- **Status Management**
  - **Pending → Confirmed**: Click ✓ (Check icon)
  - **Pending → Cancelled**: Click ✗ (X icon)
  - **Confirmed → Collected**: Click 📦 (Package icon)
- **Real-time Updates**: All changes refresh automatically

### **Contact Messages** (`/admin/contacts`)
- View all messages from the contact form
- See customer name, email, message content
- Sorted by newest first with timestamps

### **User Management** (`/admin/users`)
- View all registered users
- See user details: name, email, role (USER/ADMIN)
- Track booking count per user
- View registration dates

## 🎨 UI Features

- **Sidebar Navigation** - Fixed sidebar with quick access to all sections
- **Dark Green Theme** - Consistent with JustBin branding
- **Responsive Design** - Works on all screen sizes
- **Color-Coded Status**:
  - 🟡 **Pending** - Yellow badge
  - 🔵 **Confirmed** - Blue badge
  - 🟢 **Collected** - Green badge
  - 🔴 **Cancelled** - Red badge

## 🔒 Security Features

- **Role-Based Access Control**
  - Only users with `ADMIN` role can access `/admin/*` routes
  - Automatic redirect to login if not authenticated
  - Automatic redirect to home if user is not admin
- **Server-Side Validation**
  - All admin actions are validated on the server
  - Protected API endpoints with `requireAdmin()` helper
- **Session-Based Auth**
  - Uses NextAuth v5 (Auth.js) with JWT sessions
  - Secure password hashing with bcrypt

## 📝 Admin Workflow Example

1. **New Booking Arrives**
   - Shows up in Dashboard "Recent Bookings"
   - Appears in Bookings list with PENDING status (yellow)

2. **Review & Confirm**
   - Admin reviews booking details
   - Clicks ✓ to confirm → Status becomes CONFIRMED (blue)

3. **Mark as Collected**
   - After pickup is completed
   - Click 📦 → Status becomes COLLECTED (green)

4. **Handle Cancellations**
   - If booking needs to be cancelled
   - Click ✗ → Status becomes CANCELLED (red)

## 🛠️ Technical Details

### Database Schema
```prisma
enum UserRole {
  USER
  ADMIN
}

model User {
  role UserRole @default(USER)
  // ... other fields
}
```

### Protected Routes
All routes under `/admin/*` are protected:
- Layout component checks authentication and role
- Helper function `requireAdmin()` for server components
- Automatic redirects for unauthorized access

### Key Files
```
src/
├── app/
│   └── admin/
│       ├── layout.tsx          # Admin sidebar layout
│       ├── page.tsx             # Dashboard
│       ├── bookings/page.tsx    # Bookings management
│       ├── contacts/page.tsx    # Contact messages
│       └── users/page.tsx       # User management
├── components/
│   └── admin/
│       ├── booking-actions.tsx  # Status update buttons
│       ├── booking-filters.tsx  # Filter & search
│       └── booking-status-badge.tsx # Status badges
├── lib/
│   └── admin.ts                 # Admin helper functions
└── app/actions/
    └── admin.ts                 # Server actions for admin
```

## 🔐 Creating Additional Admin Users

To create more admin users, either:

### Option 1: Via Database
```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'user@example.com';
```

### Option 2: Update seed.ts
Add more admin users to the seed script before running `npm run db:seed`

## 📱 Mobile Support

The admin panel is responsive and works on mobile devices:
- Horizontal scrolling for wide tables
- Touch-friendly buttons and interactions
- Mobile-optimized sidebar (collapsible on smaller screens)

## 🎯 Future Enhancements (Optional)

- [ ] Export bookings to CSV/Excel
- [ ] Email notifications on status changes
- [ ] Bulk actions (select multiple bookings)
- [ ] Analytics dashboard with charts
- [ ] Admin activity logs
- [ ] WhatsApp integration for status updates
- [ ] Advanced filters (date range, city, scrap type)
- [ ] Customer profiles with booking history

## 🆘 Troubleshooting

**Can't access admin panel?**
- Make sure you've run `npm run db:seed` to create admin user
- Verify you're logging in with `admin@justbin.com`
- Check that the database connection is working

**Database errors?**
- Run `npm run db:push` to apply schema changes
- Check that `DATABASE_URL` is set correctly in `.env`

**Admin link not showing?**
- Make sure you're logged in as admin
- Check that `session.user.role === "ADMIN"` in navbar

---

**Built with:** Next.js 15, Prisma, PostgreSQL, NextAuth v5, Tailwind CSS v4
