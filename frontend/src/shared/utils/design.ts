/**
 * Design System Utilities
 * Helper functions and constants for working with the design system
 */

/**
 * Color utility functions (semantic colors that reference CSS variables)
 */
export const semanticColors = {
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
 * Focus ring utility
 */
export const focusRing = "focus-ring";

/**
 * Screen reader only utility
 */
export const srOnly = "sr-only";

/**
 * Common layout utilities
 */
export const layout = {
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexCol: "flex flex-col",
  flexColCenter: "flex flex-col items-center justify-center",
  gridCenter: "grid place-items-center",
  absolute: "absolute inset-0",
  fixed: "fixed inset-0",
} as const;

/**
 * Accessibility utilities
 */
export const a11y = {
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background px-4 py-2 rounded-md z-50",
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ariaHidden: 'aria-hidden="true"',
  roleButton: 'role="button" tabindex="0"',
} as const;

/**
 * Helper function to get dark mode classes
 */
export function darkMode(lightClass: string, darkClass: string): string {
  return `${lightClass} dark:${darkClass}`;
}

/**
 * Helper function for conditional classes
 */
export function conditional(
  condition: boolean,
  trueClass: string,
  falseClass = "",
): string {
  return condition ? trueClass : falseClass;
}
