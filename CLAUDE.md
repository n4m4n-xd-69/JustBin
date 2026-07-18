# JustBin

Full-stack Next.js (App Router) site for a scrap-pickup startup. See README.md
for setup.

- Tailwind v4 — design tokens are CSS variables in `src/app/globals.css`
  (`:root` = light, `.dark` = night mode). Palette is all-green (lime → green
  → emerald → teal); no purple/blue anywhere by explicit user request.
- Self-hosted prod requires `AUTH_TRUST_HOST=true` in `.env` (Auth.js v5).
- DB: Prisma + PostgreSQL. `npm run db:push && npm run db:seed`. UI must keep
  working without a DB (rates fall back to `src/lib/data.ts`; bookings still
  return the WhatsApp hand-off URL).
- Auth: Auth.js v5 credentials in `src/auth.ts`, JWT sessions.
- Mutations go through Server Actions in `src/app/actions/*` and are validated
  with the Zod schemas in `src/lib/validations.ts` on both client and server.
