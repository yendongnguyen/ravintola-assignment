/**
 * API Configuration
 * This module provides the base API URL for the frontend to communicate with the backend.
 * 
 * Environments:
 * - Development: http://localhost:4000 (proxied by Vite to /api)
 * - Production: https://func-maidoravintola-fc1-0418.azurewebsites.net
 */

const isDevelopment = import.meta.env.MODE === 'development';

// In development, use relative /api path (proxied to localhost:4000 by Vite)
// In production, use the full Azure Function App URL
const API_BASE_URL = isDevelopment
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'https://func-maidoravintola-fc1-0418.azurewebsites.net/api');

export const api = {
  baseUrl: API_BASE_URL,
  endpoints: {
    bookings: `${API_BASE_URL}/bookings`,
    health: `${API_BASE_URL}/health`
  }
};

export default api;
