---
stepsCompleted: [1, 2, 3, 4, 6, 7]
inputDocuments:
  - docs/figma-ux-design-for-mainpage/
designSystem:
  colors:
    primary: "#113402"
    accent: "#f39c45"
    light: "#d8e8d0"
  typography:
    fontFamily: Poppin
---

# UX Design Specification maidoravintola

**Author:** KIET
**Date:** April 3, 2026

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

maidoravintola is a restaurant website that works as the digital front door of the restaurant. The site provides clear information about menu, services, opening hours, address, and hotline, while making table booking easy and fast for users.

### Target Users

Primary users are people in Kuopio, Finland who want to browse the menu and reserve a table in advance. The audience is broad across age and demographics, and many users are not highly tech-savvy. Most users will access the website from mobile phones.

### Key Design Challenges

- Keep navigation simple for non-tech-savvy users.
- Prioritize mobile-first layout and touch-friendly interactions.
- Make key information and actions (menu, booking, hours, contact) immediately visible.
- Reflect warm, close customer service through visual and content tone.

### Design Opportunities

- Highlight menu diversity as a core brand strength.
- Reduce friction in booking with a short and clear flow.
- Build trust using welcoming visuals and straightforward copy.
- Use strong hierarchy and CTAs so users can act quickly from any section.

## Core User Experience

### Defining Experience

The core experience for maidoravintola is menu-first discovery that leads naturally to booking. Users should quickly browse menu categories, decide what they want, then move to a dedicated booking page. The primary value flow is: browse menu, check essentials (hours and contact), and reserve a table.

### Platform Strategy

The platform is a mobile-first website with touch-first interaction patterns, while desktop support is secondary. Because users are often not tech-savvy and use phones most, interfaces should prioritize readability, large tap targets, and minimal interaction complexity. Mobile performance is a strict requirement.

### Effortless Interactions

- Browse menu through simple category tabs (for example: buffet, main, drinks).
- Move from menu to booking through clear call-to-action buttons.
- Complete booking on a dedicated page with only required fields: name, phone, date, time, and number of people.
- Receive immediate on-screen confirmation and email confirmation.
- Find opening hours, address, and hotline quickly from key sections.

### Critical Success Moments

- Users immediately understand menu categories and begin browsing without confusion.
- Users open the booking page and complete reservation quickly with minimal friction.
- Users see clear opening hours and contact information before committing.
- Users receive confirmation they can trust after booking submission.

Failure-sensitive moments to prevent:
- Slow loading on mobile.
- Confusing menu categories.
- Unclear opening hours or contact information.

### Experience Principles

- Menu first and always clear.
- Mobile performance is part of UX quality.
- Keep flows simple for non-tech-savvy users.
- Build trust through clarity and consistent confirmations.
- Minimize booking friction with essential inputs only.

## Desired Emotional Response

### Primary Emotional Goals

maidoravintola should make users feel welcomed, confident, and cared for. The emotional target is a calm and friendly experience where users feel they are interacting with a trustworthy local restaurant that values personal service.

### Emotional Journey Mapping

- First discovery: users feel welcomed and oriented quickly through clear structure and warm visual tone.
- During menu browsing: users feel confident and in control because categories are simple and predictable.
- During booking: users feel reassured by a focused booking page with essential fields only.
- After booking: users feel certain and relieved through immediate on-screen confirmation and email confirmation.
- Returning visits: users feel familiarity and trust because key information is always easy to find.

### Micro-Emotions

- Confidence over confusion.
- Trust over skepticism.
- Comfort over anxiety.
- Accomplishment over frustration.
- Warmth and belonging over transactional distance.

### Design Implications

- Use warm imagery and friendly copy to support a welcoming feeling.
- Keep navigation simple and consistent, especially for mobile users.
- Maintain clear menu category tabs to reduce uncertainty.
- Keep opening hours, address, and hotline highly visible across sections.
- Confirm reservations clearly with both in-app and email feedback.
- Optimize loading speed to avoid stress and drop-off on mobile.

### Emotional Design Principles

- Clarity creates confidence.
- Warmth builds connection.
- Speed protects trust.
- Consistency reduces anxiety.
- Confirmation closes the emotional loop.

## Design System Foundation

### 1.1 Design System Choice

Themeable system with a lightweight custom component set.

### Rationale for Selection

- Fits a mobile-first restaurant site where speed and clarity matter more than visual complexity.
- Gives enough flexibility to create a warm, local, welcoming brand feel.
- Avoids the rigidity of a large enterprise UI library.
- Reduces build time compared with a fully custom system while preserving uniqueness.

### Implementation Approach

- Build core UI around reusable primitives for navigation, buttons, cards, forms, tabs, and alerts.
- Use a small set of consistent spacing, color, and typography tokens.
- Keep interactions simple and touch-friendly for mobile users.
- Prioritize readable layouts, large tap targets, and strong call-to-action hierarchy.

### Customization Strategy

- Use warm, food-friendly colors and generous whitespace.
- Keep typography highly legible and friendly.
- Design booking and menu components as first-class patterns rather than generic templates.
- Tune components for speed, accessibility, and low-friction mobile use.

## 2. Core User Experience

### 2.1 Defining Experience

The defining experience for maidoravintola is quickly moving from menu discovery to table booking without confusion or friction. Users should be able to scan categories, understand what the restaurant offers, and reserve a table with a short, clear flow. If the site gets one thing exactly right, it should make users feel that checking the menu and booking a table is easy, immediate, and trustworthy.

### 2.2 User Mental Model

Users approach the site with a simple expectation: find the food, confirm the basics, then book if it feels right. Most will think in terms of "what can I eat here?" and "can I reserve a table now?" rather than exploring a complex website structure.

They are likely to expect familiar restaurant-site patterns such as menu categories, opening hours, contact details, and a visible booking button. Confusion will come from hidden information, too many steps, or unclear labels. Because many users are not highly tech-savvy, they will prefer obvious paths and direct actions over discovery-heavy navigation.

### 2.3 Success Criteria

Users should be able to:
- understand the menu categories at a glance
- reach booking from the menu or homepage without hunting
- complete reservation using only essential fields
- receive clear confirmation immediately after submitting
- trust the site because key details stay visible and consistent

Success feels like "this just works" when users can decide and act in under a minute on mobile.

### 2.4 Novel UX Patterns

This experience is mostly built on established patterns rather than novel interaction design. The opportunity is to combine familiar restaurant-site conventions in a cleaner, faster way.

Proven patterns to adopt:
- category-based menu browsing
- prominent booking call-to-action
- persistent visibility of hours, address, and contact
- short booking forms with immediate confirmation

The unique twist is making the menu-to-booking path feel almost effortless, with fewer distractions and stronger mobile clarity than typical restaurant sites.

### 2.5 Experience Mechanics

#### Initiation

Users begin from the homepage or menu page. A clear menu entry point and visible booking button invite them to start.

#### Interaction

Users browse categories, scan items, and tap booking when ready. The booking form asks only for name, phone, date, time, and party size. The site should respond instantly to taps and keep the interface uncluttered.

#### Feedback

Users should always know where they are in the flow through clear labels, visible actions, and concise validation messages. If something is missing or incorrect, the error should be direct and easy to fix.

#### Completion

Users finish when the reservation is submitted and a confirmation is shown on screen. An email confirmation reinforces trust. The successful outcome is a clear, low-stress path from curiosity to reservation.
