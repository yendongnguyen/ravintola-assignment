# MAIDO Ravintola

Mobile-first restaurant website for MAIDO Ravintola in Kuopio. The site focuses on a simple menu-to-booking journey for non-tech-savvy users.

## Features

- Homepage with clear hero messaging and direct booking CTA.
- Menu category preview (Buffet, Main Dishes, Drinks).
- Essential visit information always visible: opening hours, address, hotline.
- Dedicated booking page with required fields only: name, phone, date, time, party size.
- Phone format validation (numeric only) and date validation (today or later only).
- Inline validation errors and immediate booking confirmation feedback.
- 48px minimum touch targets for mobile accessibility.
- Responsive design optimized for non-tech-savvy users.

## Tech Stack

- React + TypeScript + Vite
- React Router
- Vitest + Testing Library
- Backend: Express + TypeScript

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Run tests:

   ```bash
   npm test
   ```

## Backend Setup

1. Install backend dependencies:

   ```bash
   npm install --prefix backend
   ```

2. Run backend only:

   ```bash
   npm run dev:backend
   ```

3. Run frontend + backend together:

   ```bash
   npm run dev:full
   ```

The frontend dev server proxies `/api` calls to `http://localhost:4000`.

4. Configure backend database:

   - Copy `backend/.env.example` to `backend/.env`
   - Fill your Azure MySQL connection values
   - Set `ADMIN_BOOKINGS_KEY` for the `/admin/bookings` screen
   - Run SQL in `backend/sql/schema.sql`

## About Confirmation

Bookings show an on-screen confirmation message immediately after submission. Email confirmation is a planned feature for future integration with a transactional email provider.
