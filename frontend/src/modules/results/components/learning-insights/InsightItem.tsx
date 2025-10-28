/**
 * InsightItem Component
 * Individual clickable insight with shimmer hover effect
 * Tab 4: Learning Insights
 */

import * as React from "react";

import type { IInsight } from "@/modules/results/utils/insights";

/**
 * Props interface for InsightItem component
 */
export interface IInsightItemProps {
  /** Category type for styling */
  category: "strength" | "improvement" | "strategy";
  /** Insight data */
  insight: IInsight;
  /** Click handler callback */
  onClick: (category: string, topic: string) => void;
}

/**
 * InsightItem - Individual clickable insight card
 * Displays insight text with category-colored action button
 * Features shimmer effect and glow on hover
 */
export function InsightItem({
  category,
  insight,
  onClick,
}: IInsightItemProps): React.JSX.Element {
  const handleClick = (): void => {
    onClick(category, insight.topic);
  };

  return (
    <div className={`insight-item ${category}`} onClick={handleClick}>
      <div className="insight-text">{insight.text}</div>
      <div className={`insight-action ${category}`}>
        <span>{insight.cta}</span>
        <span>→</span>
      </div>
    </div>
  );
}
