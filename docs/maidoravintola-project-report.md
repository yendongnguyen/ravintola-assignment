# Maidoravintola Website Project Report

## 1. Project Description and Problem Definition

### 1.1 Project Context
Maidoravintola is a mobile-first restaurant website for a local dining business in Kuopio. The project combines a customer-facing frontend and a cloud-ready backend for reservation handling. The main purpose is to make discovery and booking simple for users who are not highly technical, while giving restaurant staff a practical way to view reservations.

The current implementation includes:
- A multi-page React single-page application (Home, Menu, Pricing, About, Booking, Admin Bookings).
- A reservation workflow where users submit booking details through an online form.
- An Azure Functions backend exposing API endpoints for booking creation, booking retrieval, and service health checks.
- A MySQL-backed persistence layer for reservation records.
- Bilingual content support (English and Finnish).

### 1.2 Business Problem
Restaurants often lose potential bookings because:
- Contact information and opening hours are hard to find on mobile.
- Reservation experiences are too long, confusing, or not optimized for touch devices.
- Booking requests are not structured, causing manual follow-up and data quality issues.
- Operational staff lack a lightweight view of recent reservation data.

In this context, Maidoravintola must solve two connected problems:
- Customer-side problem: make menu exploration and table booking fast, clear, and low-friction.
- Operator-side problem: capture booking data in structured form and make retrieval secure enough for staff use.

### 1.3 Product Goal
The core product goal is to create a reliable menu-to-booking journey with minimal user friction. Specifically:
- Improve conversion from visitor to reservation intent.
- Reduce failed or incomplete booking submissions through validation.
- Provide immediate confirmation feedback to improve user trust.
- Keep architecture simple enough for maintainability and future feature growth.

### 1.4 Scope and Functional Summary
The implemented system currently provides:
- Informational and marketing pages: Home, About, Menu, Pricing.
- Booking page with required user details and basic client-side validation.
- Server-side schema validation for booking payloads before persistence.
- Admin booking list endpoint protected by an admin header key.
- Local development support using Vite frontend + Azure Functions backend + Azurite emulator.

Out-of-scope or future scope (currently planned or implied by code/docs):
- Email-based reservation confirmations.
- Rich authentication/authorization for staff users.
- Advanced analytics and observability dashboards.
- Fine-grained anti-abuse controls (rate limiting, bot protection).

---

## 2. Architecture Overview

### 2.1 High-Level Architecture
The architecture follows a decoupled web-app pattern:
- Frontend SPA serves user interface and form interactions.
- API layer (Azure Functions HTTP triggers) handles request validation and orchestration.
- Data layer stores and retrieves bookings from MySQL.
- Deployment configuration supports Azure-hosted production and local emulation.

### 2.2 Architecture Diagram (Required)
```mermaid
flowchart LR
    A[Customer Browser\nReact + Vite SPA] -->|HTTPS /api/bookings POST| B[Azure Functions HTTP API\nbookings handler]
    A -->|HTTPS /api/bookings GET + x-admin-key| B
    A -->|HTTPS /api/health GET| C[Azure Functions health handler]

    B --> D[Validation Layer\nZod schema checks]
    D --> E[Service Layer\nbookingsService]
    E --> F[Repository Layer\nbookingRepository]
    F --> G[(Azure MySQL Database\nbookings table)]

    B --> H[JSON + CORS Response Helpers]
    C --> H

    I[Admin Page in SPA] -->|sessionStorage admin key| A

    J[Local Dev: Vite Proxy + Azurite] -. supports .-> A
    J -. supports .-> B

    K[Application Insights\n(host config enabled)] -. telemetry .-> B
    K -. telemetry .-> C
```

### 2.3 Request Flow (Booking Creation)
1. User opens Booking page and fills mandatory fields.
2. Frontend validates required fields for immediate UX feedback.
3. Frontend sends POST request to bookings API endpoint.
4. Azure Function parses JSON body and runs schema validation.
5. Valid payload is transformed and persisted via service + repository layers.
6. API returns HTTP 201 and booking object metadata.
7. Frontend resets form and shows success confirmation.

### 2.4 Architectural Strengths
- Separation of concerns:
  - UI logic in frontend pages/components.
  - Validation and business logic in backend service modules.
  - SQL access isolated in repository layer.
- Progressive hardening:
  - Input validation on both client and server.
  - Admin listing guarded by key-based header check.
- Deployment readiness:
  - Azure Functions project shape is production-oriented.
  - CORS and runtime settings are externalized through configuration.

### 2.5 Architectural Risks and Constraints
- Admin access model currently uses a shared key and does not provide user-level identity.
- Secrets appear in local settings during development; production handling must enforce secure secret storage.
- No explicit queueing/retry strategy for high write bursts.
- Limited defensive controls for abuse scenarios (e.g., repeated booking spam).

---

## 3. Technology Choices and Justification

### 3.1 Frontend Technologies
- React 18 + TypeScript:
  - React is well-suited for componentized, stateful UI flows such as booking forms.
  - TypeScript reduces runtime errors by enforcing typed props/state and API contracts.
- Vite:
  - Fast local startup and hot module replacement improve developer productivity.
  - Straightforward bundling for static hosting workflows.
- React Router:
  - Clean route segmentation for content pages and booking/admin flows.
- Vitest + Testing Library:
  - Supports practical component-level behavior tests for user-facing form logic.

Why this is appropriate:
- The project is content-heavy with a few high-value interactive flows.
- The stack balances speed of development with maintainability.
- Testing setup aligns with the most failure-prone part of the app: reservation form behavior.

### 3.2 Backend Technologies
- Azure Functions v4 (Node.js + TypeScript):
  - Serverless model reduces infrastructure overhead and scales on-demand.
  - Good fit for request-driven endpoints (bookings, health).
- mysql2 driver:
  - Mature Node.js integration for MySQL-based workloads.
- Zod validation:
  - Declarative schema validation for strict payload checking and clear error messages.

Why this is appropriate:
- Reservation APIs are bursty and low-to-medium complexity, ideal for serverless.
- Type-safe validation and modular backend structure improve long-term reliability.
- Azure Functions integrates naturally with planned Azure deployment and monitoring.

### 3.3 Data and Environment Choices
- Azure Database for MySQL:
  - Relational schema fits structured booking records.
  - Familiar SQL querying for sorting and reporting by creation timestamp.
- Azurite for local storage emulation:
  - Enables local Azure Functions development compatibility without immediate cloud dependency.
- Static Web App routing/security headers config:
  - Handles SPA navigation fallback and baseline browser security headers.

### 3.4 Quality, Security, and Operability Considerations
- Quality:
  - Form tests already cover required fields, backend validation feedback, pending-submit behavior, and network failure handling.
- Security:
  - CORS handling and admin-key checks are present.
  - Additional hardening is still required for production maturity.
- Operability:
  - Host configuration includes Application Insights logging settings.
  - Health endpoint supports monitoring and uptime checks.

---

## 4. AI Usage Disclosure

This section is intentionally explicit and evidence-based, to maintain academic and professional transparency.

### 4.1 Tools Used
Based on project artifacts and repository structure, the following AI-assisted tooling appears to have been used:
- GitHub Copilot / Copilot Chat for implementation and iterative coding support.
- BMAD-related workflow and agent tooling (indicated by _bmad folders, manifests, and generated planning artifacts).
- AI-assisted deployment planning content generation (indicated by deployment plan/status markdown artifacts).

### 4.2 What Was Generated (AI-Assisted)
Likely AI-generated or AI-drafted elements include:
- Project planning and process artifacts:
  - Deployment plan and deployment status documentation.
  - BMAD-generated planning and implementation artifact files.
- Portions of scaffolded or patterned code structures:
  - Function-oriented backend layout and modular file organization.
  - Boilerplate-like sections in UI and configuration files.
- Supporting documentation skeletons and workflow metadata.

### 4.3 What Was Manually Modified (Human-in-the-Loop)
Based on implementation characteristics and domain-specific details, manually guided refinement likely includes:
- Business-specific content and UX tailoring for a Finnish restaurant context.
- Booking form field design and user-facing messaging.
- Validation rules and edge-case handling adjustments.
- API endpoint behavior tuning and response/error wording.
- Styling/theme consistency and page-level content curation.
- Environment-specific deployment and connectivity configuration.

### 4.4 Responsible AI Use Statement
AI was used as an accelerator, not a substitute for engineering judgment. The effective workflow reflects:
- Human review of generated outputs.
- Manual correction of domain details and technical constraints.
- Verification through local testing and functional checks.
- Retention of accountability for architecture, correctness, and security decisions.

---

## 5. Reflection and Future Improvements

### 5.1 Reflection on Current Outcome
The project successfully demonstrates a practical full-stack web architecture with real business relevance. The strongest achievements are:
- A clear customer journey from information discovery to reservation action.
- Separation of frontend and backend concerns with typed contracts.
- Input validation at multiple layers for better data quality.
- A deployment path aligned with Azure-native services.

At the same time, the project remains in a transitional stage between prototype-level and production-grade maturity. Operational and security controls are present but minimal, and some deployment steps are not fully finalized.

### 5.2 Technical Improvement Roadmap
1. Identity and access hardening
- Replace shared admin key approach with managed identity and role-based authentication.
- Add secure secret handling in Key Vault and remove sensitive values from local-tracked settings.

2. Reliability and resilience
- Add structured retry/error-handling strategy for transient DB failures.
- Introduce idempotency or duplicate-detection logic for repeated booking submissions.

3. Observability and diagnostics
- Expand telemetry coverage with trace correlation from frontend request to backend processing.
- Define alert rules for API error rates, latency spikes, and database connectivity failures.

4. User experience and conversion
- Add booking confirmation email/SMS pipeline.
- Improve field-level validation hints and accessibility labels for assistive technology.
- Consider multilingual extensibility beyond two languages through content management support.

5. Quality engineering
- Increase test coverage for backend functions and repository integration.
- Add end-to-end test scenarios for full booking lifecycle.
- Integrate CI quality gates (tests + lint + build + security scan).

### 5.3 Product and Business Extensions
- Reservation management dashboard for staff (search, filter, status updates).
- Simple CRM-like features (repeat customer insights, notes, preferences).
- Menu-content synchronization workflow for faster price/item updates.
- Analytics on conversion funnel (home -> menu -> booking form -> successful booking).

### 5.4 Final Evaluation
Maidoravintola provides a strong foundation for a restaurant digital channel with realistic architecture and maintainable technology choices. The current implementation is suitable for demonstration, iterative release, and incremental hardening. With focused work on authentication, secret management, observability, and test automation, it can evolve into a production-grade reservation platform.

---

## Appendix: Evidence Basis Used for This Report
This report is grounded in repository evidence including:
- Frontend routing, pages, booking/admin logic, i18n support, and tests.
- Backend Azure Functions handlers, validation schema, service/repository modules, and host settings.
- Static web app routing/security config and deployment planning artifacts.
