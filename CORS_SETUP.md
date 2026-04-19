# CORS Setup Guide

This document explains how CORS (Cross-Origin Resource Sharing) has been configured for the Maidoravintola application to enable frontend-backend communication.

## Overview

- **Frontend**: Running on Azure Web App or localhost:5173
- **Backend**: Running on Azure Function App at `https://func-maidoravintola-fc1-0418.azurewebsites.net`
- **CORS Status**: ✅ Enabled on both sides

## Backend CORS Configuration

### 1. HTTP Response Headers (Backend)

The backend automatically adds CORS headers to all responses:

```typescript
// Headers added to every response:
{
  "access-control-allow-origin": "${CORS_ORIGIN}",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Content-Type, Authorization, x-admin-key",
  "access-control-max-age": "86400"
}
```

### 2. CORS_ORIGIN Environment Variable

**Local Development** (`backend/local.settings.json`):
```json
{
  "CORS_ORIGIN": "http://localhost:5173"
}
```

**Production** (Azure Portal - Function App Settings):
- In Azure Portal, go to **Configuration** → **Application settings**
- Add new setting: `CORS_ORIGIN`
- Value: Your frontend URL (e.g., `https://web-maidoravintola.azurewebsites.net`)

### 3. Admin Key Configuration

Used for protecting the bookings list endpoint:

**Local Development** (`backend/local.settings.json`):
```json
{
  "ADMIN_KEY": "admin-key-12345"
}
```

**Production** (Azure Portal):
- Add new setting: `ADMIN_KEY`
- Value: Choose a secure key (update the frontend to match)

### 4. OPTIONS Request Handling

All API endpoints handle CORS preflight (OPTIONS) requests automatically:
- `GET /api/health`
- `POST /api/bookings`
- `GET /api/bookings` (with x-admin-key header)

## Frontend Configuration

### 1. API Base URL Configuration

**Development** (`.env.development`):
```
VITE_API_BASE_URL=http://localhost:4000/api
```

**Production** (`.env.production`):
```
VITE_API_BASE_URL=https://func-maidoravintola-fc1-0418.azurewebsites.net/api
```

### 2. API Endpoint Usage

All API calls use the configured base URL:
```typescript
import api from "../config/api";

// Development: Uses relative path /api (proxied by Vite)
// Production: Uses full Azure Function App URL

await fetch(api.endpoints.bookings, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(bookingData)
});
```

### 3. Local Development (Vite Proxy)

During local development, Vite proxies `/api` requests to `http://localhost:4000`:

```typescript
// vite.config.ts
proxy: {
  "/api": {
    target: "http://localhost:4000",
    changeOrigin: true
  }
}
```

This means:
- Frontend: `http://localhost:5173`
- Vite proxies: `http://localhost:5173/api/bookings` → `http://localhost:4000/api/bookings`
- Backend: `http://localhost:4000`

## Testing CORS Locally

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test Booking Creation

Open browser DevTools → Network tab, then:
1. Go to http://localhost:5173/booking
2. Fill the form and submit
3. Verify in Network tab:
   - Request method: POST
   - URL: `http://localhost:5173/api/bookings` (proxied)
   - Response includes CORS headers

### 4. Verify CORS Headers in Response

```bash
curl -i -X OPTIONS http://localhost:4000/api/bookings
```

Response should include:
```
access-control-allow-origin: http://localhost:5173
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: Content-Type, Authorization, x-admin-key
```

## Azure Deployment Configuration

### Frontend (Static Web App)

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Get the output path** (typically: `dist/`)

3. **Deploy to Static Web App** and set the custom domain

4. **Configure Application Settings:**
   - In Azure Portal → Static Web App → Environment variables
   - Add: `VITE_API_BASE_URL=https://func-maidoravintola-fc1-0418.azurewebsites.net/api`

### Backend (Function App)

1. **Rebuild and deploy:**
   ```bash
   cd backend
   npm run build
   ```

2. **Configure CORS in Azure Portal:**
   - Go to Function App → Configuration
   - Add: `CORS_ORIGIN=https://your-web-app-domain.azurewebsites.net`
   - Add: `ADMIN_KEY=your-secure-key`

3. **Apply settings and restart the function app**

## Troubleshooting

### CORS Error: "No 'access-control-allow-origin' header"

**Cause**: Backend CORS_ORIGIN doesn't match frontend domain

**Solution**:
1. Check frontend URL in Azure Portal
2. Update `CORS_ORIGIN` in Function App settings
3. Restart the Function App

### Booking Submission Fails

1. Check browser DevTools → Network → see the response
2. Verify Function App is running: `https://func-maidoravintola-fc1-0418.azurewebsites.net/api/health`
3. Check Database connection in Function App logs

### Admin Bookings Shows 401

**Cause**: Wrong admin key

**Solution**:
1. Update the admin key in the frontend
2. Update `ADMIN_KEY` in Function App settings to match

## Quick Reference

| Environment | Frontend URL | Backend URL | CORS Origin |
|---|---|---|---|
| **Local Dev** | http://localhost:5173 | http://localhost:4000 | http://localhost:5173 |
| **Production** | https://web-*.azurewebsites.net | https://func-maidoravintola-fc1-0418.azurewebsites.net | https://web-*.azurewebsites.net |

## Related Files

- Backend: `backend/src/shared/http.ts` (CORS header logic)
- Backend: `backend/src/functions/*.ts` (endpoints with OPTIONS handling)
- Frontend: `src/config/api.ts` (API configuration)
- Frontend: `.env.development` and `.env.production` (environment settings)
- Vite: `vite.config.ts` (proxy configuration)
