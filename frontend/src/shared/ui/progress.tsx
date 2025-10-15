"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@shared/utils/cn";

const FULL_PERCENTAGE = 100;

interface IProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  IProgressProps
>(({ className, indicatorClassName, value, ...props }, ref) => {
  const safeValue = value ?? 0;
  const translateX = FULL_PERCENTAGE - safeValue;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          indicatorClassName,
        )}
        style={{ transform: `translateX(-${translateX}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
