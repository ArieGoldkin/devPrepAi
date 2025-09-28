/**
 * HTTP Status Code Constants
 * Standard HTTP response codes used throughout the application
 */

// Success Codes (2xx)
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_ACCEPTED = 202;
export const HTTP_NO_CONTENT = 204;

// Redirection Codes (3xx)
export const HTTP_MOVED_PERMANENTLY = 301;
export const HTTP_FOUND = 302;
export const HTTP_NOT_MODIFIED = 304;

// Client Error Codes (4xx)
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_METHOD_NOT_ALLOWED = 405;
export const HTTP_CONFLICT = 409;
export const HTTP_UNPROCESSABLE_ENTITY = 422;
export const HTTP_TOO_MANY_REQUESTS = 429;

// Server Error Codes (5xx)
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_NOT_IMPLEMENTED = 501;
export const HTTP_BAD_GATEWAY = 502;
export const HTTP_SERVICE_UNAVAILABLE = 503;
export const HTTP_GATEWAY_TIMEOUT = 504;

// Grouped export for convenient imports
export const HTTP_STATUS = {
  // Success
  OK: HTTP_OK,
  CREATED: HTTP_CREATED,
  ACCEPTED: HTTP_ACCEPTED,
  NO_CONTENT: HTTP_NO_CONTENT,

  // Redirection
  MOVED_PERMANENTLY: HTTP_MOVED_PERMANENTLY,
  FOUND: HTTP_FOUND,
  NOT_MODIFIED: HTTP_NOT_MODIFIED,

  // Client Errors
  BAD_REQUEST: HTTP_BAD_REQUEST,
  UNAUTHORIZED: HTTP_UNAUTHORIZED,
  FORBIDDEN: HTTP_FORBIDDEN,
  NOT_FOUND: HTTP_NOT_FOUND,
  METHOD_NOT_ALLOWED: HTTP_METHOD_NOT_ALLOWED,
  CONFLICT: HTTP_CONFLICT,
  UNPROCESSABLE_ENTITY: HTTP_UNPROCESSABLE_ENTITY,
  TOO_MANY_REQUESTS: HTTP_TOO_MANY_REQUESTS,

  // Server Errors
  INTERNAL_SERVER_ERROR: HTTP_INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED: HTTP_NOT_IMPLEMENTED,
  BAD_GATEWAY: HTTP_BAD_GATEWAY,
  SERVICE_UNAVAILABLE: HTTP_SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT: HTTP_GATEWAY_TIMEOUT,
} as const;

// Alias for common usage
export const HTTP_SERVER_ERROR = HTTP_INTERNAL_SERVER_ERROR;

// Helper type for type-safe status codes
export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];