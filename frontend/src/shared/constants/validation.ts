/**
 * Validation Constants
 * Constants for input validation and string manipulation
 */

// String Generation and Manipulation
export const STRING_GENERATION = {
  RANDOM_STRING_LENGTH: 36,
  SUBSTRING_START: 2,
  SUBSTRING_END: 9,
  UUID_LENGTH: 36,
  SHORT_ID_LENGTH: 8,
  HASH_LENGTH: 64,
} as const;

// Regular Expression Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  PHONE: /^[\d\s()+-]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC_ONLY: /^\d+$/,
  NO_SPECIAL_CHARS: /^[a-zA-Z0-9\s]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

// Input Validation Rules
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_AGE: 13,
  MAX_AGE: 120,
  MIN_YEAR_OF_EXPERIENCE: 0,
  MAX_YEAR_OF_EXPERIENCE: 50,
} as const;

// Error Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL_INVALID: "Please enter a valid email address",
  URL_INVALID: "Please enter a valid URL",
  PASSWORD_WEAK: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
  USERNAME_INVALID: "Username must be 3-20 characters and contain only letters, numbers, underscores, and hyphens",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  RANGE: (min: number, max: number) => `Must be between ${min} and ${max}`,
  NUMERIC_ONLY: "Must contain only numbers",
  ALPHANUMERIC_ONLY: "Must contain only letters and numbers",
} as const;

// Sanitization Options
export const SANITIZATION = {
  TRIM_WHITESPACE: true,
  LOWERCASE_EMAIL: true,
  REMOVE_HTML_TAGS: true,
  ESCAPE_HTML_ENTITIES: true,
} as const;

// Helper Functions
export function validateEmail(email: string): boolean {
  return VALIDATION_PATTERNS.EMAIL.test(email);
}

export function validateUrl(url: string): boolean {
  return VALIDATION_PATTERNS.URL.test(url);
}

export function validateUsername(username: string): boolean {
  return VALIDATION_PATTERNS.USERNAME.test(username);
}

export function validatePassword(password: string): boolean {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH &&
         password.length <= VALIDATION_RULES.MAX_PASSWORD_LENGTH &&
         VALIDATION_PATTERNS.PASSWORD_STRONG.test(password);
}

export function sanitizeInput(input: string): string {
  let sanitized = input;

  if (SANITIZATION.TRIM_WHITESPACE) {
    sanitized = sanitized.trim();
  }

  if (SANITIZATION.ESCAPE_HTML_ENTITIES) {
    sanitized = sanitized
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return sanitized;
}

export function generateId(length: number = STRING_GENERATION.SHORT_ID_LENGTH): string {
  return Math.random()
    .toString(STRING_GENERATION.RANDOM_STRING_LENGTH)
    .substring(STRING_GENERATION.SUBSTRING_START, STRING_GENERATION.SUBSTRING_START + length);
}

// Type exports
export type ValidationPattern = keyof typeof VALIDATION_PATTERNS;
export type ValidationRule = keyof typeof VALIDATION_RULES;
export type ValidationMessage = keyof typeof VALIDATION_MESSAGES;