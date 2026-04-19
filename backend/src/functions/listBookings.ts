import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { getBookings, submitBooking, validateBookingPayload } from "../services/bookingsService.js";
import { jsonResponse, corsPreflightResponse, resolveCorsOrigin } from "../shared/http.js";

const ADMIN_KEY = process.env.ADMIN_KEY || "admin-key-12345";

export async function bookingsFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const allowOrigin = resolveCorsOrigin(request.headers.get("origin"));

  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return corsPreflightResponse(allowOrigin);
  }

  // Handle GET request - list bookings
  if (request.method === "GET") {
    context.log(`List bookings function processed request for url \"${request.url}\"`);

    // Check admin key for GET requests
    const adminKey = request.headers.get("x-admin-key");
    if (!adminKey || adminKey !== ADMIN_KEY) {
      return jsonResponse(401, { error: "Unauthorized" }, allowOrigin);
    }

    try {
      const items = await getBookings();
      return jsonResponse(200, { data: items }, allowOrigin);
    } catch (error) {
      context.error(error);
      return jsonResponse(500, { error: "Failed to load bookings" }, allowOrigin);
    }
  }

  // Handle POST request - create booking
  if (request.method === "POST") {
    context.log(`Create booking function processed request for url \"${request.url}\"`);

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return jsonResponse(400, { error: "Invalid JSON request body" }, allowOrigin);
    }

    const validationResult = validateBookingPayload(payload);
    if (!validationResult.success) {
      return jsonResponse(
        400,
        {
          error: "Validation failed",
          details: validationResult.messages
        },
        allowOrigin
      );
    }

    try {
      const created = await submitBooking(validationResult.data);
      return jsonResponse(201, { data: created }, allowOrigin);
    } catch (error) {
      context.error(error);
      return jsonResponse(500, { error: "Failed to create booking" }, allowOrigin);
    }
  }

  // Handle unsupported methods
  return jsonResponse(405, { error: "Method not allowed" }, allowOrigin);
}

app.http("bookings", {
  methods: ["GET", "POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "bookings",
  handler: bookingsFunction
});