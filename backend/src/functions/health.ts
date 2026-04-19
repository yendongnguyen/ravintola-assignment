import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { jsonResponse, corsPreflightResponse, resolveCorsOrigin } from "../shared/http.js";

export async function healthFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const allowOrigin = resolveCorsOrigin(request.headers.get("origin"));

  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return corsPreflightResponse(allowOrigin);
  }

  context.log(`Health function processed request for url \"${request.url}\"`);

  return jsonResponse(
    200,
    {
      ok: true,
      service: "maidoravintola-backend"
    },
    allowOrigin
  );
}

app.http("health", {
  methods: ["GET", "OPTIONS"],
  authLevel: "anonymous",
  route: "health",
  handler: healthFunction
});