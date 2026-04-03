---
title: 'restaurant-website-ux-initialization'
type: 'feature'
created: '2026-04-03'
status: 'done'
baseline_commit: '2c3bf920b1c6dbebcf0e678bdf8a446e7627c333'
context:
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - 'README.md'
---

<frozen-after-approval reason="human-owned intent - do not modify unless human renegotiates">

## Intent

**Problem:** The repository does not yet contain a runnable website, while the project needs a clear digital front door for a restaurant where users can quickly browse menu categories and complete a table booking on mobile.

**Approach:** Initialize a frontend web project and implement a mobile-first website skeleton that delivers the core UX flow: homepage with clear restaurant essentials, menu-first discovery, and a low-friction booking page with immediate confirmation feedback.

## Boundaries & Constraints

**Always:** Prioritize mobile-first layout and performance; keep navigation simple for non-tech-savvy users; keep booking form fields limited to name, phone, date, time, and party size; keep opening hours/address/hotline visible in primary surfaces; use warm visual tone aligned with UX planning artifact.

**Ask First:** Any backend/API integration for storing bookings; transactional email provider integration; multilingual content strategy; payment/pre-order features.

**Never:** Load or process image assets from docs/ during this implementation; add unrelated features (blog, auth, admin panel); introduce complex booking flow with non-essential fields; block initialization on unresolved visual asset decisions.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Homepage first visit | User opens site on mobile | Hero and core CTA are visible; menu categories and essential info are reachable without confusion | If runtime asset fails, render fallback text and keep CTA usable |
| Booking success | User submits valid booking form values | On-screen success confirmation appears immediately; form resets; essentials remain visible; duplicate submissions prevented | N/A |
| Booking validation error (empty field) | User submits with missing required field | Inline error message explains exactly what to fix; submit remains blocked; first invalid field focused | Focus first invalid field; preserve user-entered values |
| Booking validation error (invalid format) | User enters non-phone digits in phone field; or past date in date field | Inline error message explains constraint ("Phone must be numeric" / "Date must be today or later"); submit blocked | Focus invalid field; preserve user-entered values |
| Booking essentials visibility | User on booking page needs to verify hours/address before confirming | Opening hours, address, and hotline visible on booking page (header or sidebar) without scrolling to footer | Essential info persists across all pages |
| Small-screen navigation | User opens nav on narrow viewport | Navigation menu opens/closes reliably and provides direct links to menu and booking | If menu state breaks, keep visible fallback links in header/footer |
| Multiple rapid form submissions | User clicks "Confirm Reservation" multiple times in rapid succession | Submit button disabled on first valid submit; only one submission processed | Prevent duplicate bookings if backend integration added |

</frozen-after-approval>

## Code Map

- `README.md` -- Minimal project description; can be updated with startup instructions after initialization.
- `_bmad-output/planning-artifacts/ux-design-specification.md` -- UX source of truth for navigation simplicity, mobile-first behavior, and booking flow requirements.
- `package.json` -- Project initialization manifest and scripts for dev/build/lint.
- `src/main.*` -- App bootstrap and global style entry.
- `src/App.*` -- Application shell and route composition.
- `src/pages/Home.*` -- Homepage with menu-first discovery and restaurant essentials.
- `src/pages/Booking.*` -- Dedicated booking form with validation and immediate confirmation UI.
- `src/components/*` -- Reusable UI primitives (header, menu tabs, contact strip, form controls).
- `src/styles/*` -- Design tokens and responsive styling aligned with warm restaurant tone.

## Tasks & Acceptance

**Execution:**
- [x] `package.json` -- Initialize frontend project scripts and dependencies for local development and production build -- provides runnable foundation requested by user.
- [x] `src/main.*` -- Create app entrypoint and global style imports -- ensures app boots consistently.
- [x] `src/App.*` -- Implement top-level layout and route/navigation structure for Home and Booking pages -- supports clear, simple user flow.
- [x] `src/pages/Home.*` -- Build mobile-first homepage sections: hero, menu category preview, opening hours, address, hotline, booking CTA -- satisfies core discovery and trust requirements.
- [x] `src/pages/Booking.*` -- Build booking form with required fields only; add phone format validation (numeric only), date validation (today or future only); disable submit button on valid submission; show essentials strip above form; inline validation with error messages and focus management; immediate success feedback -- enforces low-friction reservation flow with validated booking data.
- [x] `src/components/*` -- Add reusable components for navigation, menu category tabs/cards, and contact/info blocks -- keeps implementation clean and maintainable.
- [x] `src/components/EssentialsStrip.tsx` -- Reproduce on Booking page (above booking form) and on Footer -- ensures critical hours/address/hotline visible on all primary surfaces per spec boundary.
- [x] `src/styles/*` -- Define warm color tokens, typography stack, spacing, and responsive behavior with touch-friendly targets (min 48px) -- aligns implementation with UX specification and WCAG accessibility.
- [x] `README.md` -- Add setup/run/build instructions and brief feature summary; clarify that email confirmation is deferred -- documents initialized project for contributors.
- [x] `src/pages/Booking.*` (tests) -- Add unit/component tests for validation edge cases: empty phone, non-numeric phone, past dates, today/future dates, form reset, multiple-submit prevention -- verifies critical booking behavior and prevents regression.

**Acceptance Criteria:**
- Given a first-time mobile visitor, when the homepage loads, then menu-first content, booking CTA, and essential restaurant details (hours, address, hotline) are immediately accessible without deep navigation.
- Given a user on any page, when they choose to reserve, then they can reach the booking page in one clear action from visible navigation or CTA.
- Given valid required booking inputs, when the form is submitted, then the user sees immediate success confirmation on-screen.
- Given invalid or missing booking inputs, when submit is attempted, then concise inline errors appear and the form does not submit until corrected.
- Given the initialized project, when standard scripts are run, then development and production build commands complete successfully.

## Spec Change Log

### Iteration 1 — Bad Spec Findings from Review

**Triggered by:** Blind Hunter + Edge Case Hunter (30 findings combined; 3 classified as bad_spec violations of frozen intent)

**Root cause:** Spec did not explicitly define validation rules for form fields and essentials visibility scope, causing code to implement insufficient validation and incomplete information architecture.

**Amended sections:**
- Code Map: added explicit validation scope
- I/O & Edge-Case Matrix: clarified "invalid" input handling and essentials visibility on all pages
- Tasks & Acceptance: added specific validation task and essentials-on-booking task

**Known-bad state avoided:**
- Users booking for past dates reaching restaurant with impossible reservations
- Invalid phone numbers (special chars, non-numeric) preventing contact after booking
- Booking page lacking critical restaurant hours/contact info, forcing users back to Home for verification
- Touch targets below 48px minimum, violating mobile-first accessibility
- Multiple rapid form submissions creating duplicate bookings if backend added later

**KEEP instructions:**
- Keep form limited to 5 fields (name, phone, date, time, partySize) — correct scope
- Keep success confirmation visible on-page — correct UX choice
- Keep warm color palette and typography — correct aesthetic
- Keep test coverage for happy path and validation errors — solid foundational tests
- Keep responsive CSS and Footer link reproduction — correct architectural patterns

## Design Notes

Use a lightweight component architecture with route-level pages and shared UI primitives to keep complexity low while preserving a distinctive warm presentation. Prefer semantic HTML structure and explicit section headings to support readability and non-tech-savvy audiences.

## Verification

**Commands:**
- `npm install` -- expected: dependency installation completes without errors.
- `npm run dev` -- expected: local development server starts and renders Home/Booking flow.
- `npm run build` -- expected: production bundle builds successfully.
- `npm test` -- expected: booking validation/success edge-case tests pass.
