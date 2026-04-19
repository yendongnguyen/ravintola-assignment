# Azure Deployment Plan

## 1. Overview

- Status: Validated
- Mode: Modify existing Azure deployment
- Application: MAIDO Ravintola
- Workspace: `c:\Users\ASUS\maidoravintola`
- Goal: Reuse the existing Azure frontend hosting resource and the existing Azure Function App for the backend, then update code and production configuration.

## 2. Current Application Shape

- Frontend: React + TypeScript + Vite in workspace root
- Backend: Azure Functions v4 + TypeScript in `backend/`
- Data store: Azure Database for MySQL already configured by environment settings
- Local status: Frontend and backend tested locally and booking flow works

## 3. Existing Azure Targets To Reuse

- Frontend hosting: Existing Azure Static Web App
- Backend hosting: Existing Azure Function App
- Confirmed backend target: `func-maidoravintola-fc1-0418` in resource group `rg-maidoravintola-func`
- Confirmed frontend target: `maidoravintola` in resource group `maidoravintola`
- Subscription: `Azure subscription 1` (`084c4bbf-767a-4b88-9a7c-10673e855fd1`)
- Tenant: `Default Directory` (`8bce2a7d-37e3-40a3-9424-16b1f4cf1b79`)
- Region: `westeurope` for frontend and function resources

## 4. Deployment Recipe

- Recipe type: Direct update of existing Azure resources
- Frontend deployment: Build Vite app and publish built assets to existing Azure Static Web App
- Backend deployment: Build Azure Functions app and publish to existing Azure Function App
- Infrastructure changes: None unless app settings or CORS updates are required on existing resources

## 5. Required Production Configuration

- Frontend `VITE_API_BASE_URL` must point to the existing Function App `https://<function-app>.azurewebsites.net/api`
- Backend app settings must include MySQL connection values
- Backend app settings must include `CORS_ORIGIN` for the frontend production URL
- Backend app settings must include `ADMIN_KEY`
- Azure platform CORS settings on the Function App must allow the frontend production origin

## 6. Planned Execution Steps

- Confirm Azure subscription access and discover existing resources
- Validate local production builds for frontend and backend
- Inspect existing Azure app settings and CORS for both targets
- Update Azure configuration only where needed
- Deploy backend package to the existing Function App
- Deploy frontend build to the existing Static Web App
- Verify production health endpoint and end-to-end booking flow

## 7. Validation Proof

- Completed on 2026-04-18:
	- `npm run build` at workspace root: passed
	- `cd backend ; npm run build`: passed
	- Azure MCP confirmed subscription `084c4bbf-767a-4b88-9a7c-10673e855fd1`
	- Azure MCP confirmed existing frontend target `maidoravintola` in resource group `maidoravintola`
	- Azure MCP confirmed existing backend target `func-maidoravintola-fc1-0418` in resource group `rg-maidoravintola-func`
	- Frontend production API URL is configured in `.env.production` as `https://func-maidoravintola-fc1-0418.azurewebsites.net/api`
	- Added `staticwebapp.config.json` for SPA routing fallback in production
	- Backend CORS logic updated to support multiple allowed origins via `CORS_ORIGINS`

## 8. Notes / Risks

- Azure MCP confirmed the existing resources, but frontend hosting is Static Web Apps rather than App Service Web Apps, so deployment must follow the Static Web App path
- Azure extension authentication and Azure MCP credential resolution are separate; MCP worked only after passing the tenant and subscription explicitly
- Static Web App routing may require a `staticwebapp.config.json` file if client-side routes fail after deployment