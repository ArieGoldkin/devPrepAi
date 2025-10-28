/**
 * InteractiveInsightCard Component
 * Category card containing multiple clickable insights
 * Tab 4: Learning Insights
 */

import * as React from "react";

import type { IInsight } from "@/modules/results/utils/insights";

import { InsightItem } from "./InsightItem";

/**
 * Props interface for InteractiveInsightCard component
 */
export interface IInteractiveInsightCardProps {
  /** Category type for styling */
  category: "strength" | "improvement" | "strategy";
  /** Card title */
  title: string;
  /** Card subtitle */
  subtitle: string;
  /** List of insights to display */
  insights: IInsight[];
  /** Click handler for insights */
  onInsightClick: (category: string, topic: string) => void;
}

/**
 * InteractiveInsightCard - Category card with clickable insights
 * Groups related insights under a category heading
 * Each insight can be clicked to trigger learning path
 */
export function InteractiveInsightCard({
  category,
  title,
  subtitle,
  insights,
  onInsightClick,
}: IInteractiveInsightCardProps): React.JSX.Element {
  return (
    <div className="insight-card">
      <div className={`insight-title ${category}`}>
        <span>{title}</span>
        <span style={{ fontSize: "11px", fontWeight: 500, opacity: 0.7 }}>
          {subtitle}
        </span>
      </div>
      <div className="insight-list">
        {insights.map((insight) => (
          <InsightItem
            key={insight.topic}
            category={category}
            insight={insight}
            onClick={onInsightClick}
          />
        ))}
      </div>
    </div>
  );
}
