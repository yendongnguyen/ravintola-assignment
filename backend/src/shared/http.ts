import type { HttpResponseInit } from "@azure/functions";

function getAllowedCorsOrigins(): string[] {
  const configuredOrigins = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN;

  if (!configuredOrigins) {
    return ["http://localhost:5173"];
  }

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function resolveCorsOrigin(requestOrigin?: string | null): string {
  const allowedOrigins = getAllowedCorsOrigins();

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0] ?? "http://localhost:5173";
}

function getDefaultHeaders(allowOrigin: string) {
  return {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
    vary: "origin",
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization, x-admin-key",
    "access-control-max-age": "86400"
  };
}

export function jsonResponse(status: number, jsonBody: unknown, allowOrigin: string): HttpResponseInit {
  return {
    status,
    jsonBody,
    headers: getDefaultHeaders(allowOrigin)
  };
}

export function corsPreflightResponse(allowOrigin: string): HttpResponseInit {
  return {
    status: 204,
    headers: getDefaultHeaders(allowOrigin)
  };
}