import React from "react";

import type { IHint } from "@/types/store";

interface IHintDisplayProps {
  hint: IHint;
}

/**
 * Level Colors
 * Cyan (Level 1) → Pink (Level 2) → Purple (Level 3)
 */
const LEVEL_COLORS = {
  1: {
    border: "rgba(120, 219, 255, 0.4)", // cyan
    shadow: "rgba(120, 219, 255, 0.1)",
    badgeBg: "rgba(120, 219, 255, 0.2)",
    badgeColor: "#78dbff",
    badgeBorder: "rgba(120, 219, 255, 0.4)",
  },
  2: {
    border: "rgba(255, 119, 198, 0.4)", // pink
    shadow: "rgba(255, 119, 198, 0.1)",
    badgeBg: "rgba(255, 119, 198, 0.2)",
    badgeColor: "#ff77c6",
    badgeBorder: "rgba(255, 119, 198, 0.4)",
  },
  3: {
    border: "rgba(120, 119, 198, 0.4)", // purple
    shadow: "rgba(120, 119, 198, 0.1)",
    badgeBg: "rgba(120, 119, 198, 0.2)",
    badgeColor: "#7877c6",
    badgeBorder: "rgba(120, 119, 198, 0.4)",
  },
};

/**
 * HintDisplay Component
 *
 * Displays a single hint with level-specific styling:
 * - Level 1: Cyan border/badge
 * - Level 2: Pink border/badge
 * - Level 3: Purple border/badge
 *
 * Features:
 * - Fade-in animation with stagger delay
 * - Inline code support with syntax highlighting
 * - Glassmorphism card design
 * - Level badge with timestamp
 *
 * Design ref: Prototype lines 290-390
 */
export const HintDisplay: React.FC<IHintDisplayProps> = ({ hint }) => {
  const colors = LEVEL_COLORS[hint.level as 1 | 2 | 3];

  // Format timestamp
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Process content to support inline code
  // Simple regex to convert `code` to <code>code</code>
  const renderContent = (content: string): React.ReactNode => {
    const parts = content.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        const codeText = part.slice(1, -1);
        return (
          <code
            key={index}
            className="
              px-2
              py-0.5
              rounded
              font-mono
              text-[13px]
            "
            style={{
              background: "rgba(10, 1, 24, 0.6)",
              color: "#78dbff",
            }}
          >
            {codeText}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className="
        rounded-xl
        p-4
        mb-3
        border
        animate-fadeInUp
      "
      style={{
        background: "rgba(120, 119, 198, 0.05)",
        borderColor: colors.border,
        boxShadow: `0 0 20px ${colors.shadow}`,
        animationDuration: "400ms",
        animationFillMode: "both",
        animationDelay: `${hint.level * 100}ms`,
      }}
    >
      {/* Header: Level badge + timestamp */}
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="
            px-3
            py-1
            rounded-full
            text-[12px]
            font-semibold
            uppercase
            tracking-wide
            border
          "
          style={{
            background: colors.badgeBg,
            color: colors.badgeColor,
            borderColor: colors.badgeBorder,
          }}
        >
          Level {hint.level}
        </span>

        <span
          className="
            ml-auto
            text-[12px]
          "
          style={{
            color: "rgba(229, 229, 255, 0.5)",
          }}
        >
          {formatTimestamp(hint.requestedAt)}
        </span>
      </div>

      {/* Hint content */}
      <div
        className="
          text-[14px]
          leading-relaxed
        "
        style={{
          color: "rgba(229, 229, 255, 0.9)",
        }}
      >
        {renderContent(hint.content)}
      </div>
    </div>
  );
};
