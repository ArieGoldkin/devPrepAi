"use client";

import { GripVertical } from "lucide-react";
import React from "react";

import { cn } from "@shared/utils/cn";

export function ResizeHandle(): React.JSX.Element {
  return (
    <div
      className={cn(
        "relative w-2 bg-border hover:bg-primary/20 transition-colors cursor-col-resize",
        "focus:outline-none focus:bg-primary/30",
        "group"
      )}
      aria-label="Resize panels"
    >
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-11 flex items-center justify-center"
        role="separator"
        aria-orientation="vertical"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  );
}