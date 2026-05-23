# Миний Чиглэл

`Миний Чиглэл` is a Mongolian career counseling MVP for students and parents.
It combines a public Next.js App Router site, a Hono API, Prisma models for
Supabase PostgreSQL, Telegram booking notifications, mini career exploration
tests, and a password-protected admin dashboard.

Booking is request-based in this version. A submitted request is saved with
status `NEW`; the consultant manually contacts the family and confirms the
appointment later. There is no QPay, payment form, bank screenshot upload, or
online checkout in this foundation.

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 design tokens in `app/globals.css`
- Hono API mounted at Next route handlers and runnable as a standalone server
- Prisma 7 with the PostgreSQL driver adapter for Supabase/PostgreSQL
- GSAP for reveals, text motion, mobile menu, FAQ, cards, and test transitions
- Three.js / React Three Fiber for the hero visual only

## Project Map

```text
app/
  (site)/                 Public home, services, booking, tests, about pages
  admin/                  Login and protected admin pages
  api/[[...route]]/       Next route handler that mounts the Hono API
components/
  admin/                  Dashboard tables, controls, badges, login shell
  motion/                 GSAP section reveal wrapper
  site/                   Navbar, footer, booking form, hero, FAQ, cards
  tests/                  Reusable assessment flow and result capture
lib/
  api/app.ts              Hono routes
  admin-data.ts           Admin server-side Prisma queries
  prisma.ts               Lazy Prisma client with PostgreSQL adapter
  telegram.ts             Telegram booking notification utility
  tests.ts                Mini-test definitions and scoring
  riasec.ts               RIASEC questions, scoring, code and guidance content
  validators.ts           Zod request validation
prisma/
  schema.prisma           Booking, TestResult, Service models and enums
server/
  index.ts                Standalone Hono Node server entry
```

## Environment

Copy `.env.example` to `.env.local` for Next.js local development and fill the
values.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Runtime PostgreSQL URL used by Prisma client |
| `DIRECT_URL` | Optional direct Supabase URL preferred by Prisma CLI/migrations |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for new booking notifications |
| `TELEGRAM_CHAT_ID` | Admin chat/channel target for Telegram messages |
| `ADMIN_PASSWORD` | MVP admin password for `/admin/login` |
| `NEXT_PUBLIC_API_URL` | Optional standalone API base URL; leave empty for same-origin Next API |

For Supabase, use a connection string appropriate for runtime in
`DATABASE_URL`. If migrations should bypass a pooled connection, place the
direct connection string in `DIRECT_URL`; `prisma.config.ts` prefers it for CLI
commands when present.

## Local Setup

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Open the public site at the Next dev URL and the admin login at `/admin/login`.
The default Next API surface includes the Hono routes under `/api`.

To run Hono separately during development:

```bash
npm run dev:api
```

Set `NEXT_PUBLIC_API_URL` to that API origin when the public booking and test
forms should submit to the separate server. Keep the same-origin Next API for
the admin cookie workflow unless you also plan a cross-origin auth strategy.

## API

Public:

- `GET /api/health`
- `POST /api/bookings`
- `POST /api/test-results`
- `POST /api/tests/riasec/submit`

Admin session:

- `POST /api/admin/session`
- `DELETE /api/admin/session`

Protected admin data:

- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/status`
- `PATCH /api/bookings/:id/notes`
- `GET /api/test-results`
- `GET /api/admin/riasec-results`
- `GET /api/admin/riasec-results/:id`

Booking status progression:

- `NEW`: request was submitted
- `CONTACTED`: consultant contacted the parent
- `CONFIRMED`: appointment confirmed manually
- `CANCELLED`: cancelled
- `DONE`: consultation completed

## Product Notes

- Mongolian language content is the default.
- Test results are general exploration prompts, not medical or psychological
  diagnosis.
- Test results are anonymous unless a student/parent chooses to save a result
  with name and phone.
- Telegram failure does not block booking creation; the booking record remains
  the source of truth.
- The `Service` model is ready for database-backed service management later;
  the current marketing cards use curated content in `lib/site-content.ts`.

## Deployment Shape

Deploy the Next.js app and admin to Vercel. The included catch-all route handler
keeps the Hono API available in that deployment. The same Hono app can also be
deployed separately from `server/index.ts` when the project needs a dedicated
API process later.
