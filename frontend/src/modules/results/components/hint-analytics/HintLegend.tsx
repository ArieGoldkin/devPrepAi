/**
 * HintLegend Component
 * Displays color key for 3 hint levels
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

/**
 * Legend item data structure
 */
interface ILegendItem {
  level: number;
  label: string;
  description: string;
}

/**
 * Static legend items for 3 hint levels
 */
const LEGEND_ITEMS: ILegendItem[] = [
  {
    level: 1,
    label: "Level 1",
    description: "General Approach",
  },
  {
    level: 2,
    label: "Level 2",
    description: "Specific Technique",
  },
  {
    level: 3,
    label: "Level 3",
    description: "Code Skeleton",
  },
];

/**
 * HintLegend Component
 * Renders a horizontal legend showing the meaning of each hint level color
 * Responsive: stacks vertically on mobile devices
 *
 * @example
 * <HintLegend />
 */
export const HintLegend: React.FC = () => (
  <div
    className="hint-legend flex flex-col md:flex-row justify-center gap-6 md:gap-8 p-5 bg-white/[0.03] rounded-xl mb-6"
    role="list"
    aria-label="Hint level color key"
  >
    {LEGEND_ITEMS.map((item) => (
      <div
        key={item.level}
        className="legend-item flex items-center gap-3"
        role="listitem"
      >
        <div
          className={`legend-dot w-6 h-6 rounded-md border-2 flex-shrink-0 hint-dot level-${item.level}`}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span className="legend-label text-[13px] font-semibold text-[rgba(229,229,255,0.9)]">
            {item.label}
          </span>
          <span className="text-[11px] text-[rgba(229,229,255,0.6)]">
            {item.description}
          </span>
        </div>
      </div>
    ))}
  </div>
);
