import React from "react";

import { cn } from "@shared/utils/cn";

interface IGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GradientBackground
 *
 * Glassmorphism gradient background wrapper with animated overlay.
 * Provides the rich purple gradient aesthetic used across assessment,
 * practice, and other session-based views.
 *
 * Based on design prototype: glassmorphism_session_split_1.html
 */
export const GradientBackground: React.FC<IGradientBackgroundProps> = ({
  children,
  className,
}) => (
  <div
    className={cn("min-h-screen relative", className)}
    style={{
      background:
        "linear-gradient(135deg, #0a0118 0%, #1a0f2e 50%, #0f0a1e 100%)",
    }}
  >
    {/* Animated background overlay with radial gradients */}
    <div
      className="fixed w-full h-full pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0,
      }}
    />

    {/* Content wrapper with proper z-index */}
    <div className="relative z-10 h-full">{children}</div>
  </div>
);
