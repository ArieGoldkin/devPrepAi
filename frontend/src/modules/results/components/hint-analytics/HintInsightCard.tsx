/**
 * HintInsightCard Component
 * Displays summary recommendation based on hint usage patterns
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

import type { IInsight } from "@/modules/results/utils/hint-narratives";

/**
 * Props for HintInsightCard component
 */
interface IHintInsightCardProps {
  insight: IInsight;
}

/**
 * HintInsightCard Component
 * Renders a gradient card with icon, title, and recommendation message
 * Styled similarly to RecommendationCard from Overview tab
 *
 * @example
 * <HintInsightCard insight={{ icon: "🌟", title: "...", message: "..." }} />
 */
export const HintInsightCard: React.FC<IHintInsightCardProps> = ({
  insight,
}) => (
  <div
    className="recommendation-card mt-6 p-6 rounded-2xl bg-gradient-to-br from-[rgba(120,119,198,0.15)] via-[rgba(120,119,198,0.08)] to-transparent border border-[rgba(120,119,198,0.3)]"
    role="complementary"
    aria-label="Hint usage insight"
  >
    <div className="recommendation-icon text-4xl mb-3 text-center">
      {insight.icon}
    </div>
    <div className="recommendation-title text-xl font-bold text-center text-[#e5e5ff] mb-2">
      {insight.title}
    </div>
    <div className="recommendation-text text-sm text-center text-[rgba(229,229,255,0.8)] leading-relaxed max-w-2xl mx-auto">
      {insight.message}
    </div>
  </div>
);
