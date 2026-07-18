# JustBin Admin Panel — Full Plan

A complete, fully functional admin panel at `/admin` for managing the JustBin
platform: pickup bookings, scrap rates, collectors, customers, and contact
messages — built on the existing stack (Next.js App Router, Prisma 7 +
PostgreSQL, Auth.js v5, Tailwind v4 tokens, Server Actions + Zod).

---

## 1. Goals

| Goal | Detail |
| --- | --- |
| Operate bookings | See every pickup request, assign a collector, move it through its lifecycle |
| Manage pricing | Edit the live scrap rate list without touching code |
| Manage people | Customers (users), collectors (kabadiwalas), and admin staff |
| Handle inbound | Read/resolve contact messages |
| See the business | Dashboard with KPIs, trends, and recent activity |
| Stay secure | Role-based access; every mutation validated and audited |

---

## 2. Access Control & Security

### 2.1 Roles (schema change)

```prisma
enum Role {
  CUSTOMER   // default — normal site users
  COLLECTOR  // kabadiwala with an assigned profile
  ADMIN      // full access to /admin
}

model User {
  // ...existing fields
  role Role @default(CUSTOMER)
}
```

### 2.2 Enforcement layers (all three, not one)

1. **Middleware** (`src/middleware.ts`) — matcher `/admin/:path*`; redirects
   unauthenticated users to `/login?next=/admin`, non-admins to `/`.
2. **Server layout guard** — `src/app/admin/layout.tsx` calls `auth()` and
   re-verifies `session.user.role === "ADMIN"` (middleware can be bypassed by
   misconfiguration; the layout cannot).
3. **Per-action guard** — every admin Server Action starts with a shared
   `requireAdmin()` helper (`src/lib/auth-guard.ts`) that throws if the caller
   isn't an admin. UI checks are cosmetic; actions are the real boundary.

### 2.3 Session & JWT

Add `role` to the JWT in the `jwt` callback and expose it on
`session.user.role` (extend `src/types/next-auth.d.ts`). Bootstrap the first
admin via a seed entry (`ADMIN_EMAIL` env var) or a one-off
`npm run make-admin -- email@x.com` script.

### 2.4 Audit log

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  actorId   String
  action    String   // "booking.status_changed", "rate.updated", ...
  entity    String   // "PickupBooking:ckx..."
  meta      Json?
  createdAt DateTime @default(now())
}
```

Written inside every admin mutation (same transaction where possible).

---

## 3. Database Additions

```prisma
model Collector {
  id        String          @id @default(cuid())
  name      String
  phone     String          @unique
  area      String          // service area / locality
  city      String
  isActive  Boolean         @default(true)
  userId    String?         @unique  // optional login account
  user      User?           @relation(fields: [userId], references: [id])
  bookings  PickupBooking[]
  createdAt DateTime        @default(now())
}

model PickupBooking {
  // ...existing fields
  collectorId  String?
  collector    Collector? @relation(fields: [collectorId], references: [id])
  finalWeight  String?    // recorded after pickup
  finalAmount  Int?       // paise, recorded after pickup
  adminNotes   String?
}

model ContactMessage {
  // ...existing fields
  status     MessageStatus @default(NEW) // NEW | READ | RESOLVED
  resolvedAt DateTime?
}
```

`BookingStatus` already exists (`PENDING → CONFIRMED → COLLECTED / CANCELLED`);
add `ASSIGNED` between CONFIRMED and COLLECTED.

---

## 4. Routes & Screens

```
src/app/admin/
├── layout.tsx            # guard + sidebar shell (no public navbar/footer)
├── page.tsx              # Dashboard
├── bookings/
│   ├── page.tsx          # table: filter by status/date/city, search, pagination
│   └── [id]/page.tsx     # detail: timeline, assign collector, status, notes
├── rates/
│   └── page.tsx          # categories + items CRUD, inline price editing
├── collectors/
│   ├── page.tsx          # list + activate/deactivate
│   └── [id]/page.tsx     # profile + assigned bookings history
├── customers/
│   └── page.tsx          # users list, booking counts, role management
├── messages/
│   └── page.tsx          # contact inbox: NEW/READ/RESOLVED workflow
└── settings/
    └── page.tsx          # site settings: WhatsApp number, time slots, toggles
```

### 4.1 Dashboard (`/admin`)

- **KPI tiles**: bookings today / this week, pending count, total customers,
  unread messages — each with a small trend indicator.
- **Bookings-per-day chart** (last 30 days) — lightweight SVG bars, no chart
  library needed.
- **Recent activity feed** from `AuditLog`.
- **Action shortcuts**: "X pending bookings need confirmation →".

### 4.2 Bookings (the core screen)

- Table columns: id (short), customer, phone (click-to-WhatsApp), city,
  scrap types (chips), pickup date + slot, status badge, collector, created.
- Filters: status tabs (All / Pending / Confirmed / Assigned / Collected /
  Cancelled) + date range + city + free-text search (name/phone).
- Status transitions with guarded rules (e.g. can't collect before assigning);
  each transition writes an AuditLog row.
- Detail page: full address, notes, status timeline, collector assignment
  (searchable select of active collectors in that city), completion form
  (final weight + amount paid), admin notes, "Open in WhatsApp" deep link
  with a pre-filled message.

### 4.3 Rates

- Grouped by category, matching the public /rates page.
- Inline edit of item price/icon/name; add/remove items; reorder (sortOrder).
- Category CRUD (name, icon, description, order).
- "Last updated" timestamp shown publicly once rates are DB-backed;
  `revalidatePath("/rates")` + `revalidatePath("/")` on every change.

### 4.4 Collectors

- CRUD + active toggle; list shows assigned/completed booking counts.
- Optional link to a User account (future collector app / login).

### 4.5 Customers

- Read-mostly list: name, email, joined, bookings count.
- Promote/demote role (ADMIN ↔ CUSTOMER) — self-demotion blocked.

### 4.6 Messages

- Inbox table with status workflow NEW → READ → RESOLVED, reply-via-email
  (mailto) and reply-via-WhatsApp deep links.

### 4.7 Settings

- Singleton `SiteSetting` row (JSON): WhatsApp number, pickup time slots,
  minimum notice hours, service cities list, "accepting bookings" kill switch
  (public /book shows a friendly closed notice when off).

---

## 5. Server Actions (all in `src/app/admin/actions/`)

Every action: `requireAdmin()` → Zod-parse input → Prisma mutation →
`AuditLog` → `revalidatePath` → typed `{ success } | { error }` result.

| File | Actions |
| --- | --- |
| `bookings.ts` | `updateBookingStatus`, `assignCollector`, `completeBooking(weight, amount)`, `updateAdminNotes` |
| `rates.ts` | `upsertCategory`, `deleteCategory`, `upsertItem`, `deleteItem`, `reorder` |
| `collectors.ts` | `createCollector`, `updateCollector`, `toggleActive` |
| `users.ts` | `setUserRole` |
| `messages.ts` | `setMessageStatus` |
| `settings.ts` | `updateSettings` |

---

## 6. UI / Component Plan

Reuse the existing design system (tokens, Button, Card, Input, Label,
Accordion) plus new admin primitives in `src/components/admin/`:

- `sidebar.tsx` — collapsible left nav (icons + labels), active route
  highlight, sign-out; mobile: sheet/drawer.
- `data-table.tsx` — generic table with sorting, pagination (URL search
  params, server-driven), empty states, skeleton rows.
- `status-badge.tsx` — colored pill per BookingStatus/MessageStatus using the
  green-family tokens (pending=lime, confirmed=green, assigned=teal,
  collected=emerald, cancelled=zinc).
- `kpi-card.tsx`, `bar-chart.tsx` (pure SVG), `confirm-dialog.tsx`
  (Radix Dialog), `toast` — wire up the already-installed `sonner` for
  mutation feedback.
- Layout: dark-first like the site, but denser (smaller radii, tighter
  spacing, `max-w-none` full-width tables).

---

## 7. Data Fetching Rules

- All admin pages are **dynamic** (`export const dynamic = "force-dynamic"`) —
  admins must never see stale data.
- Lists are paginated server-side (`?page=&q=&status=`) — searchParams drive
  Prisma `where/skip/take`; no client state for source-of-truth.
- Counts for KPI tiles via one `prisma.$transaction` of grouped counts.

---

## 8. Build Phases

| Phase | Scope | Est. effort |
| --- | --- | --- |
| **1. Foundation** | Role enum + migration, middleware, admin layout + sidebar, guard helpers, make-admin script | small |
| **2. Bookings** | Table + filters + detail + status flow + WhatsApp deep links | medium |
| **3. Rates CRUD** | Categories/items editing + public revalidation | small |
| **4. Dashboard** | KPIs, chart, activity feed (needs AuditLog from day 1) | small |
| **5. People & inbox** | Collectors, customers, messages | medium |
| **6. Settings & polish** | SiteSetting, kill switch, toasts, empty/loading states, audit viewer | small |

Phase 1+2 alone already replace the WhatsApp-only workflow with a real ops
tool; each later phase is independently shippable.

---

## 9. Out of Scope (for now)

- Collector-facing mobile app / login portal (schema is ready via
  `Collector.userId`).
- Payments/ledger beyond recording final amount.
- Multi-admin permissions granularity (single ADMIN role is enough today).
- Email notifications (WhatsApp remains the confirmation channel).

---

## 10. Definition of Done

- [ ] Non-admin cannot reach any `/admin` route or invoke any admin action
      (verified by test hitting an action without a session).
- [ ] Booking can go PENDING → CONFIRMED → ASSIGNED → COLLECTED with collector
      + final weight/amount recorded, and shows up in the audit log.
- [ ] Editing a rate updates `/rates` and the homepage preview without
      redeploy.
- [ ] Dashboard numbers match direct SQL counts.
- [ ] `npm run build` and lint pass; all admin tables paginate at 500+ rows.
