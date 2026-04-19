**>>NOTE<<**
1. This public repository is an academic submission version of the Ravintola project.
The original working repository remains private because it contains business-related configuration and environment-specific deployment details for a real restaurant use case. Sensitive information has been removed or replaced in this public version while preserving the implementation, architecture, and commit history relevant for assessment.
2. Deployment automation was intentionally removed from this public academic submission repository because the original production deployment uses private Azure deployment credentials and infrastructure-specific configuration.

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

**1. Project Description and Problem Definition
1.1 Project Context**
Maido Ravintola is a mobile-first restaurant website developed for a local restaurant in Kuopio. The system consists of two main components: a frontend for customers and a backend for processing reservations on a cloud platform.
The project’s objectives are to help users easily:
•	find restaurant information, 
•	view the menu, 
•	make reservations quickly on their phones, 
while also enabling restaurant staff to conveniently view reservation data.
The current system includes:
•	A React website with the following pages: Home, Menu, Pricing, About, Booking, Admin Bookings. 
•	An online reservation form for customers. 
•	Azure Functions backend providing APIs to create bookings, retrieve booking lists, and check system status. 
•	A MySQL database to store reservation information. 
•	Bilingual support: English and Finnish
**1.2 Business Problem**
Many restaurants lose potential customers because:
•	contact information and operating hours are hard to find on mobile devices, 
•	the reservation process is lengthy, confusing, or not touchscreen-friendly, 
•	reservation data is not standardized, requiring manual processing, 
•	staff lack a simple interface to view recent bookings. 
Therefore, Maidoravintola needs to address two main issues:
•	Customer-facing: viewing the menu and making reservations fast, clear, and easy to use. 
•	Operations-facing: collect structured booking data and allow staff to review it securely. 
**1.3 Product Goal**
The core goal of the product is to create a seamless journey from viewing the menu to making a reservation, with as little friction as possible.
Specifically:
•    Increase the conversion rate of visitors into customers looking to make a reservation, 
•    Reduce booking errors or incomplete information through validation, 
•    Provide immediate confirmation feedback after form submission to build trust, 
•    Keep the architecture simple enough to ensure ease of maintenance and future scalability. 
**1.4 Scope and Functional Summary**
The system's current features include:
•	Content pages: Home, About, Menu, Pricing. 
•	Booking page with required fields and client-side data validation. 
•	Server-side data validation before saving. 
•	API to view the booking list for admins, protected by an admin key. 
•	Support for a local development environment using Vite for the frontend, Azure Functions for the backend, and the Azurite emulator. 
Beyond the current scope or future plans:
•	Reservation confirmation emails. 
•	Full authentication and authorization for staff. 
•	Advanced analytics and monitoring dashboard. 
•	Anti-spam, rate limiting, and bot protection. 
 
**2. ARCHITECTURE OVERVIEW
2.1 High-Level Architecture**
The system uses a layered architecture, consisting of:
•	Frontend SPA: displays the user interface and handles form interactions. 
•	API Layer: Azure Functions receive requests, validate data, and coordinate processing. 
•	Service Layer: handles booking business logic. 
•	Repository Layer: communicates with the MySQL database. 
•	Database Layer: stores reservation data. 
•	Monitoring & Local Development Support: supports system monitoring and local development. 
**2.2 Architecture Diagram
  ** Please view the architecture diagram image in repo****
 
**2.3 Request Flow for Booking Creation**
The booking creation process proceeds as follows:
1.	The user opens the Booking page and enters the required information. 
2.	The frontend checks for required data and provides immediate feedback to the user. 
3.	The frontend sends a POST request to /api/bookings to the backend. 
4.	The Azure Function receives the request, parses the JSON, and validates the data using Zod. 
5.	If the data is valid, the backend passes it to the service layer for business logic processing. 
6.	The repository layer saves the booking to MySQL. 
7.	The API returns a success response (HTTP 201). 
8.	The frontend displays a confirmation message and resets the form. 
**2.4 Architectural Strengths**
Architectural strengths:
•	Separation of concerns: the frontend, business logic, and database are kept separate. 
•	Multi-layer validation: data is validated on both the client and server sides. 
•	Cloud-ready deployment uses Azure Functions, making it suitable for a serverless architecture. 
•	Scalable: email, authentication, and analytics can be added later. 
**2.5 Architectural Risks and Constraints**
Some current risks and limitations:
•	The admin currently uses a shared key and does not have a unique user identity. 
•	Secrets in the local environment need to be managed more strictly when deployed to production. 
•	There is no queueing or retry mechanism for high-load scenarios. 
•	There are no robust measures in place to prevent spam bookings. 

 
**3. TECHNOLOGY CHOICES AND JUSTIFICATION
3.1 Frontend Technologies**
•	React 18 + TypeScript: Ideal for building component-based UIs and reducing errors through explicit data typing. 
•	Vite: Fast startup, lightweight builds, suitable for modern frontend development. 
•	React Router: Clear route management for content pages, booking, and admin sections. 
•	Vitest + Testing Library: Supports testing form behavior and user interface. 
Reasons for selection:
•	The project involves a large volume of content and several critical interaction flows, such as booking. 
•	This stack strikes a balance between development speed and maintainability. 
**3.2 Backend Technologies**
•	Azure Functions v4 (Node.js + TypeScript): Ideal for request-based APIs, reducing the effort required to manage infrastructure. 
•	mysql2: A stable driver for connecting to MySQL in a Node.js environment. 
•	Zod: Provides clear data validation and is easy to maintain. 
Reasons for selection:
•	The booking API has a relatively simple workload, making it highly suitable for serverless architecture. 
•	Easy to integrate with Azure deployment and monitoring. 
**3.3 Data and Environment Choices**
•	Azure Database for MySQL: Suitable for structured booking data. 
•	Azurite: Helps simulate Azure services in a local environment. 
•	Static Web App configuration: Supports route fallback for SPAs and adds some basic security headers.
**3.4 Quality, Security, and Operability**
•	Quality: Validation, network errors, and submission status have been tested. 
•	Security: CORS and admin-key checks are in place, but further enhancements are needed for production. 
•	Operability: A health endpoint is available for logging and monitoring.  
**4. AI USAGE DISCLOSURE
4.1 Tools Used**
•	GitHub Copilot / Copilot Chat
•	BMAD workflow and agent tooling
**4.2 AI-Assisted Outputs**
Areas that can be supported by AI:
•	deployment plan documentation, 
•	certain planning/process artifacts, 
•	code scaffolding or boilerplate, 
•	documentation frameworks and configuration structures. 
**4.3 Human Modifications**
Manually edited sections:
•	Content tailored to the context of a restaurant in Finland, 
•	Booking form design, 
•	Validation rules and handling of edge cases, 
•	User-facing text, 
•	Environment configuration and deployment setup. 
**4.4 Responsible AI Use Statement**
AI is used as a tool to accelerate the process, not to replace technical judgment.
All outputs must be:
•	reviewed by humans, 
•	revised according to business requirements, 
•	tested in a local environment, 
•	and developers remain ultimately responsible for the accuracy, security, and system architecture. 

**5. REFLECTION AND FUTURE IMPROVEMENTS
5.1 Reflection on Current Outcome**
The project demonstrated a practical full-stack architecture with clear business value.
Key highlights:
•	A clear user journey to viewing information to make a reservation
•	A reasonable separation of frontend and backend
•	Multi-layer validation
•	An implementation approach suitable for Azure. 
However, the system is currently still at a stage between prototype and production ready.
The areas of security, monitoring, and reliability still need further refinement.
**5.2 Technical Improvement Roadmap
5.2.1 Authentication & Access Control** 
•	Replace the shared admin key with authentication and role-based access
•	Use Key Vault to manage secrets more securely. 
**5.2.2 Reliability**
•	Add retry logic for temporary database errors
•	Implement a mechanism to prevent duplicate bookings. 
**5.2.3 Observability**
•	Expand telemetry from frontend to backend
•	Set up alerts for API errors, high latency, or database errors. 
**5.2.4 User Experience**
•	Add email/SMS booking confirmations
•	Improve accessibility and data entry guidance
•	Expand multilingual support. 
**5.2.5 Quality Engineering** 
•	Increase backend test coverage
•	Add end-to-end tests, 
•	Integrate the CI pipeline with tests, linting, builds, and security scans. 
**5.3 Product and Business Extensions**
In the future, the system may be expanded to include:
•	A booking management dashboard for staff
•	a feature for noting customer/regular customer information
•	easier synchronization of menus and prices
•	funnel-based analytics from Home → Menu → Booking. 
**5.4 Final Evaluation**
Maido Ravintola provides a solid foundation for the restaurant’s online reservation system.
The current architecture is suitable for demos, pilot deployments, and ongoing refinement in phases.
With additional investment in:
•    authentication
•    secret management
•    observability
•    and test automation
The system can fully evolve into a production-ready reservation platform.
