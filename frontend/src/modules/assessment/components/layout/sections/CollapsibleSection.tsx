"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState, useCallback } from "react";

import { cn } from "@shared/utils/cn";

interface ICollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  priority?: "high" | "medium" | "low";
  onToggle?: (isOpen: boolean) => void;
}

const priorityColors = {
  high: "text-red-600 dark:text-red-400",
  medium: "text-yellow-600 dark:text-yellow-400",
  low: "text-blue-600 dark:text-blue-400",
};

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  priority = "medium",
  onToggle,
}: ICollapsibleSectionProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  }, [isOpen, onToggle]);

  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="border rounded-lg overflow-hidden transition-all">
      <button
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center gap-2 p-4 text-left",
          "hover:bg-muted/50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-expanded={isOpen}
        aria-controls={sectionId}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )}
        {icon !== null && icon !== undefined && (
          <span className={cn("flex-shrink-0", priorityColors[priority])}>
            {icon}
          </span>
        )}
        <span className="font-medium flex-1">{title}</span>
        {!isOpen && (
          <span className="text-sm text-muted-foreground">
            Click to expand
          </span>
        )}
      </button>

      <div
        id={sectionId}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
