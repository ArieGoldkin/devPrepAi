/**
 * HintDots Component
 * Displays 3 colored dots indicating hint usage
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

import type { IHint } from "@/types/ai/assessment";

/**
 * Props for HintDots component
 */
interface IHintDotsProps {
  hintsUsed: IHint[];
}

/**
 * Hint level configuration
 */
interface IHintLevel {
  level: number;
  label: string;
}

const HINT_LEVELS: IHintLevel[] = [
  { level: 1, label: "General Approach" },
  { level: 2, label: "Specific Technique" },
  { level: 3, label: "Code Skeleton" },
];

/**
 * HintDots Component
 * Renders 3 dots representing hint levels 1, 2, 3
 * - Used hints: colored based on level
 * - Unused hints: gray
 * - Hover effect: scales up
 * - Tooltips: show level description
 *
 * @example
 * <HintDots hintsUsed={[{ level: 1, content: "...", ... }]} />
 */
export const HintDots: React.FC<IHintDotsProps> = ({ hintsUsed }) => {
  // Extract hint levels that were used
  const usedLevels = new Set(hintsUsed.map((hint) => hint.level));

  /**
   * Get CSS class for a hint dot based on usage
   * @param level - Hint level (1, 2, or 3)
   * @returns CSS class string
   */
  const getDotClass = (level: number): string =>
    usedLevels.has(level) ? `level-${level}` : "unused";

  /**
   * Get tooltip text for a hint dot
   * @param level - Hint level (1, 2, or 3)
   * @returns Tooltip text
   */
  const getTooltipText = (level: number): string => {
    const levelConfig = HINT_LEVELS.find((l) => l.level === level);
    if (!levelConfig) return "Unknown level";

    return usedLevels.has(level)
      ? `Level ${level}: ${levelConfig.label}`
      : "Not used";
  };

  return (
    <div
      className="journey-hints flex gap-2"
      role="group"
      aria-label="Hint usage indicators"
    >
      {HINT_LEVELS.map(({ level }) => (
        <div
          key={level}
          className={`hint-dot w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 ${getDotClass(level)}`}
          title={getTooltipText(level)}
          role="img"
          aria-label={getTooltipText(level)}
        >
          {level}
        </div>
      ))}
    </div>
  );
};
