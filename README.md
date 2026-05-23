# Миний Чиглэл

`Миний Чиглэл` is a Mongolian career counseling MVP for students and parents.
The site uses Next.js for the public website and admin dashboard, and Convex as
the main backend and database.

Booking is request-based. A submitted request is saved as `NEW`; the consultant
manually contacts the family and confirms the appointment later. There is no
QPay, payment form, bank screenshot upload, or online checkout in this MVP.

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 design tokens in `app/globals.css`
- Convex database, queries, mutations, and Telegram action
- GSAP for motion and interaction polish
- Recharts for RIASEC result charts
- Password-gated MVP admin dashboard

Prisma, Supabase, and Hono are not used for the MVP backend.

## Project Map

```text
app/
  (site)/                 Public home, services, booking, tests, about pages
  admin/                  Login and protected admin pages
  providers.tsx           ConvexProvider wrapper
components/
  admin/                  Dashboard tables, controls, badges, login shell
  motion/                 GSAP section reveal wrapper
  site/                   Navbar, footer, booking form, hero, FAQ, cards
  tests/                  RIASEC and mini-test experiences
convex/
  schema.ts               bookings, riasecResults, services tables
  bookings.ts             Booking queries and mutations
  riasec.ts               RIASEC scoring, save, admin queries
  services.ts             Service package query and seed mutation
  telegram.ts             Telegram notification action
  admin.ts                Dashboard stats query
lib/
  admin-auth.ts           MVP admin cookie/password helpers
  admin-types.ts          Shared admin status labels
  tests.ts                Mini-test definitions and scoring
  riasec.ts               Frontend RIASEC questions and result content
  validators.ts           Shared Zod helpers for route/page inputs
```

## Environment

Copy `.env.example` to `.env.local` for Next.js local development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL used by the browser client |
| `ADMIN_PASSWORD` | MVP admin password for `/admin/login` |

Telegram secrets must be configured in the Convex dashboard for the deployment:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Do not expose Telegram secrets as `NEXT_PUBLIC_*` variables.

## Local Setup

```bash
npm install
npx convex dev
npm run dev
```

`npx convex dev` creates or updates:

- `convex/_generated/`
- `.env.local`
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`

Open the public site at the Next dev URL and the admin login at
`/admin/login`.

## Convex Functions

Bookings:

- `bookings.createBooking`
- `bookings.listBookings`
- `bookings.getBooking`
- `bookings.updateBookingStatus`
- `bookings.updateBookingNote`

RIASEC:

- `riasec.submitRiasecResult`
- `riasec.listRiasecResults`
- `riasec.getRiasecResult`

Services:

- `services.listServices`
- `services.seedServices`

Telegram:

- `telegram.sendBookingNotification` runs as an internal Convex action when a
  new booking is created.

## Booking Statuses

- `NEW`: request was submitted
- `CONTACTED`: consultant contacted the parent
- `CONFIRMED`: appointment confirmed manually
- `CANCELLED`: cancelled
- `DONE`: consultation completed

## Product Notes

- Mongolian language content is the default.
- RIASEC results are career exploration guidance, not medical or psychological
  diagnosis.
- RIASEC results can be viewed anonymously or saved with optional contact info.
- Telegram failure does not block booking creation; Convex remains the source
  of truth.
- Mini tests are local-only in this MVP; admin-saved test results focus on
  RIASEC / Holland Code.

## Deployment

Deploy the Next.js app/admin to Vercel.

Add the production Convex URL to Vercel:

```text
NEXT_PUBLIC_CONVEX_URL=https://brave-chickadee-230.eu-west-1.convex.cloud
ADMIN_PASSWORD=your-admin-password
```

Configure Telegram variables in the Convex production dashboard:

```text
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```
