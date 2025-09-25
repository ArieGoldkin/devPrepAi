/**
 * Design System Tokens
 * Core visual tokens: colors, spacing, shadows, typography
 */

/**
 * Color utility functions
 */
export const colors = {
  brand: {
    primary: "hsl(236 86% 63%)",
    secondary: "hsl(259 100% 71%)",
    accent: "hsl(200 98% 39%)",
    success: "hsl(142 76% 36%)",
    warning: "hsl(45 93% 47%)",
    error: "hsl(0 84% 60%)",
  },
  semantic: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    muted: "hsl(var(--muted))",
    "muted-foreground": "hsl(var(--muted-foreground))",
    border: "hsl(var(--border))",
  },
} as const;

/**
 * Spacing scale based on design tokens
 */
export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
} as const;

/**
 * Shadow scale
 */
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  brand: "0 10px 25px -5px hsl(236 86% 63% / 0.3)",
} as const;

/**
 * Breakpoint utilities
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Z-index scale
 */
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;
