/**
 * DevPrep AI Design System Utilities
 *
 * This file provides TypeScript utilities for working with the design system,
 * including component variants, color utilities, and animation helpers.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes with proper deduplication
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Button variant configurations
 */
export const buttonVariants = {
  variant: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    outline: "btn-outline",
    ghost: "btn-ghost",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
  size: {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-8 text-base",
    xl: "h-12 px-10 text-lg",
    icon: "h-10 w-10",
  },
} as const;

/**
 * Card variant configurations
 */
export const cardVariants = {
  variant: {
    standard: "card-standard",
    feature: "card-feature",
    interactive: "card-interactive",
    gradient: "card-gradient",
  },
  padding: {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  },
} as const;

/**
 * Container variant configurations
 */
export const containerVariants = {
  size: {
    sm: "container-sm",
    md: "container-md",
    lg: "container-lg",
    xl: "container-xl",
    full: "container-full",
  },
} as const;

/**
 * Typography variant configurations
 */
export const typographyVariants = {
  variant: {
    display: "text-display",
    headline: "text-headline",
    title: "text-title",
    subtitle: "text-subtitle",
    body: "text-body",
    caption: "text-caption",
    overline: "text-overline",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  align: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  },
} as const;

/**
 * Animation variant configurations
 */
export const animationVariants = {
  type: {
    "fade-in": "animate-fade-in",
    "slide-up": "animate-slide-up",
    "scale-in": "animate-scale-in",
    "bounce-in": "animate-bounce-in",
    shimmer: "loading-shimmer",
  },
  duration: {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
  },
  ease: {
    linear: "ease-linear",
    in: "ease-in",
    out: "ease-out",
    "in-out": "ease-in-out",
  },
} as const;

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
