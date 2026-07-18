# JustBin — Sell Scrap Without Leaving Home

A modern full-stack website for JustBin, a green-tech startup that connects
Indian households with verified local scrap collectors (kabadiwalas) for
doorstep waste pickups at transparent market rates.

Night-mode-first design with an all-green brand palette (lime → green →
emerald → teal), plus a light theme toggle. See `adminPanel.md` for the
admin panel plan.

## Tech stack

| Layer      | Tech                                             |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js (App Router) + React + TypeScript        |
| Styling    | Tailwind CSS v4 + CSS-variable design tokens     |
| Animation  | Framer Motion (scroll reveals, micro-interactions) |
| Components | Radix UI primitives, shadcn-style               |
| Database   | PostgreSQL (Neon / Supabase) via Prisma ORM      |
| Auth       | Auth.js (NextAuth v5) — credentials provider     |
| Forms      | React Hook Form + Zod, Next.js Server Actions    |

## Getting started

```bash
npm install

# 1. Configure the database — edit .env:
#    DATABASE_URL="postgresql://..."   (Neon: https://neon.tech, free tier works)
#    AUTH_SECRET is already generated for you.

# 2. Create tables and seed scrap rates:
npm run db:push
npm run db:seed

# 3. Run:
npm run dev
```

> The site also runs **without a database**: the homepage falls back to static
> rate data, and bookings still hand off to WhatsApp. Auth and persistence
> need Postgres.

## Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server                      |
| `npm run build`   | Production build                          |
| `npm run db:push` | Push the Prisma schema to the database    |
| `npm run db:seed` | Seed scrap categories + market rates      |
| `npm run db:studio` | Open Prisma Studio                      |

## Structure

```
prisma/            schema + seed (users, bookings, rates, contact messages)
src/auth.ts        Auth.js configuration (credentials + Prisma adapter)
src/app/           App Router pages: / /book /login /register
src/app/actions/   Server Actions: booking, contact, auth
src/components/    Navbar, Footer, sections, forms, shadcn-style UI kit
src/lib/           prisma client, zod schemas, design/seed data
```

## Features

- **Landing page** — hero, trust strip, sellable categories, 4-step how-it-works,
  live scrap rates (from DB), kabadiwala/impact section, FAQ accordion, CTA,
  contact form
- **Booking flow** (`/book`) — validated pickup form → saved to Postgres →
  WhatsApp hand-off for instant confirmation
- **Auth** — email/password register + login, JWT sessions, bookings linked
  to the signed-in user
- **Theming** — dark (default) and light themes via CSS variables + `next-themes`
