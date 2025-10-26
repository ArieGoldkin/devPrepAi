"use client";
import type { ReactNode } from "react";

import { cn } from "@shared/utils/cn";

interface IAnswerPanelContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

/**
 * AnswerPanelContainer - Glassmorphism card wrapper for the answer editor
 *
 * Features:
 * - Glassmorphism effects (backdrop-filter blur, transparent backgrounds)
 * - Purple border with signature glow
 * - Responsive layout with mobile-first approach
 * - Accessible structure with proper ARIA labels
 *
 * Design System:
 * - Background: rgba(20, 15, 40, 0.85) with 20px blur
 * - Border: 1px solid rgba(120, 119, 198, 0.3)
 * - Shadows: Multiple layers for depth
 * - Border radius: 20px for desktop, 16px for mobile
 */
export function AnswerPanelContainer({
  children,
  className = "",
  title = "Your Answer",
  description,
}: IAnswerPanelContainerProps): React.JSX.Element {
  return (
    <section
      className={cn(
        // Base glassmorphism card (static variant - no hover effects)
        "glass-card-static relative rounded-[20px] p-6",
        "bg-[rgba(20,15,40,0.85)] backdrop-blur-[20px]",
        "border border-[rgba(120,119,198,0.3)]",

        // Enhanced shadows for depth
        "shadow-[0_0_60px_rgba(120,119,198,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]",

        // Responsive padding
        "md:p-8 lg:p-10",

        // Mobile: smaller border radius
        "sm:rounded-[16px]",

        className,
      )}
      aria-label="Answer editor panel"
      role="region"
    >
      {/* Header */}
      {(title || description) && (
        <header className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-300 opacity-80">{description}</p>
          )}
        </header>
      )}

      {/* Content area - will contain CodeAnswerEditor */}
      <div
        className={cn(
          "code-editor-wrapper relative",
          "rounded-[12px] overflow-hidden",
          "border border-[rgba(120,119,198,0.2)]",
          "transition-all duration-300 ease-in-out",

          // Focus-within state for accessibility
          "focus-within:border-[rgba(120,119,198,0.5)]",
          "focus-within:shadow-[0_0_20px_rgba(120,119,198,0.2)]",
        )}
      >
        {children}
      </div>

      {/* Optional: Bottom gradient fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(20,15,40,0.9)] to-transparent opacity-50"
        aria-hidden="true"
      />
    </section>
  );
}

export default AnswerPanelContainer;
