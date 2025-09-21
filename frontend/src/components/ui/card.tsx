import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "src/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        feature: "shadow-sm hover:shadow-md hover:-translate-y-1",
        interactive: "shadow-sm hover:shadow-brand hover:-translate-y-2 cursor-pointer hover:border-primary/50",
        gradient: "text-primary-foreground shadow-md bg-gradient-to-br from-brand-primary to-brand-secondary border-0",
        outline: "border-2 shadow-none",
        elevated: "shadow-lg",
      },
      padding: {
        none: "",
        sm: "[&>*]:p-4",
        default: "[&>*]:p-6",
        lg: "[&>*]:p-8",
      },
      size: {
        sm: "max-w-sm",
        default: "",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      size: "default",
    },
  }
)

export interface ICardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ className, variant, padding, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, size, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-title font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
