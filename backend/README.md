# MAIDO Backend

Azure Functions v4 + TypeScript backend for bookings.

## Endpoints

- `GET /api/health`
- `GET /api/bookings`
- `POST /api/bookings`

## Run Locally

1. Install backend dependencies:

```bash
npm install --prefix backend
```

2. Make sure local prerequisites are available:

```bash
azurite
```

The backend uses `AzureWebJobsStorage=UseDevelopmentStorage=true` in `local.settings.json`, so Azurite must be running for local development.

Azure Functions Core Tools v4 must also be installed and available as `func` on your PATH.

3. Update local settings:

Edit `backend/local.settings.json` and replace the placeholder MySQL values.

4. Initialize the schema once for the target database:

```bash
npm run db:init --prefix backend
```

5. Start the Functions host:

```bash
npm run dev --prefix backend
```

Default URL is `http://localhost:4000`.

For live TypeScript recompilation during backend-only work, run these in separate terminals:

```bash
npm run watch --prefix backend
npm run start:host --prefix backend
```

## Frontend + Backend Together

From project root:

```bash
npm install
npm install --prefix backend
npm run dev:full
```

Vite proxies `/api/*` requests to backend during local development.

## Database (Azure MySQL)

The schema bootstrap is no longer executed during function startup. Use `npm run db:init --prefix backend` or apply `backend/sql/schema.sql` manually before running the app.

## Deployment Shape

The backend now follows the Azure Functions Node.js project model:

- HTTP handlers are in `src/functions/`
- shared data access lives in `src/data/`
- request validation lives in `src/validation/`
- business logic lives in `src/services/`
- function host configuration is in `host.json`
- local runtime settings are in `local.settings.json`
