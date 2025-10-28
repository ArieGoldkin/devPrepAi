/**
 * RecommendationsList Component
 * Display 4 personalized recommendation cards
 * Tab 4: Learning Insights
 */

import * as React from "react";

import type { IRecommendation } from "@/modules/results/utils/insights";

/**
 * Props interface for RecommendationsList component
 */
export interface IRecommendationsListProps {
  /** List of recommendations to display */
  recommendations: IRecommendation[];
}

/**
 * Icon mapping for recommendation types
 */
const RECOMMENDATION_ICONS: Record<string, string> = {
  study: "📚",
  practice: "💪",
  skill: "🎯",
  milestone: "🌟",
};

/**
 * Title mapping for recommendation types
 */
const RECOMMENDATION_TITLES: Record<string, string> = {
  study: "Study Focus",
  practice: "Practice Plan",
  skill: "Skill Development",
  milestone: "Next Milestone",
};

/**
 * RecommendationsList - Grid of recommendation cards
 * 4-column responsive grid with hover effects
 * Each card shows icon, title, and message
 */
export function RecommendationsList({
  recommendations,
}: IRecommendationsListProps): React.JSX.Element {
  return (
    <div className="recommendation-grid">
      {recommendations.map((rec) => (
        <div key={rec.type} className="recommendation-item">
          <div className="recommendation-header">
            <span>{RECOMMENDATION_ICONS[rec.type]}</span>
            <h4>{RECOMMENDATION_TITLES[rec.type]}</h4>
          </div>
          <p className="recommendation-text">{rec.message}</p>
        </div>
      ))}
    </div>
  );
}
