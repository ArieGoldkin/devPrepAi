import React from "react";

interface IHintsCardProps {
  children: React.ReactNode;
  hintsUsed?: number;
  maxHints?: number;
}

/**
 * HintsCard Container Component
 *
 * Glassmorphism card that contains the smart hints system
 * with gradient animated title and hint counter badge.
 *
 * Scrolling behavior:
 * - Header and hint button are always visible (fixed)
 * - Hints list scrolls independently when content overflows
 * - Encouragement message is always visible (fixed)
 *
 * Design ref: Prototype lines 358-384, 512-521, 824-838
 */
export const HintsCard: React.FC<IHintsCardProps> = ({
  children,
  hintsUsed = 0,
  maxHints = 3,
}) => {
  const allHintsUsed = hintsUsed >= maxHints;

  return (
    <div
      className="
        rounded-2xl
        p-4
        backdrop-blur-[20px]
        border
        shadow-lg
        flex
        flex-col
        h-full
      "
      style={{
        background: "rgba(20, 15, 40, 0.85)",
        borderColor: "rgba(120, 119, 198, 0.3)",
        boxShadow:
          "0 0 60px rgba(120, 119, 198, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Header with gradient title and counter - FIXED */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3
          className="
            text-[13px]
            font-bold
            bg-gradient-to-r
            from-[#7877c6]
            via-[#ff77c6]
            to-[#78dbff]
            bg-[length:200%_auto]
            bg-clip-text
            text-transparent
            animate-gradient-flow
          "
        >
          💡 Smart Hints
        </h3>

        {/* Hint counter badge */}
        <span
          className="
            px-2
            py-1
            text-[10px]
            rounded-lg
          "
          style={{
            background: "rgba(120, 119, 198, 0.3)",
            color: "#e5e5ff",
          }}
        >
          {hintsUsed}/{maxHints} used
        </span>
      </div>

      {/* Scrollable hints content area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      {/* Encouragement message when all hints used - FIXED */}
      {allHintsUsed && (
        <div
          className="
            mt-3
            text-center
            p-2.5
            rounded-lg
            text-[11px]
            flex-shrink-0
          "
          style={{
            background: "rgba(0, 255, 136, 0.05)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            color: "rgba(229, 229, 255, 0.8)",
          }}
        >
          🎯 You&apos;ve got this! Keep working on the solution.
        </div>
      )}
    </div>
  );
};
