/**
 * Design System Variants
 * Component variant configurations for consistent styling
 */

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
