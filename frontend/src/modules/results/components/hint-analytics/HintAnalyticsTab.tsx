/**
 * HintAnalyticsTab Component
 * Main container for Hint Analytics tab in Results Analytics
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

import { useHintAnalytics } from "@/modules/results/hooks/useHintAnalytics";

import { HintInsightCard } from "./HintInsightCard";
import { HintJourney } from "./HintJourney";
import { HintLegend } from "./HintLegend";

/**
 * HintAnalyticsTab Component
 * Container component that orchestrates the Hint Analytics tab layout:
 * - HintLegend (color key at top)
 * - HintJourney (timeline of questions with hints)
 * - HintInsightCard (recommendation at bottom)
 *
 * Uses useHintAnalytics hook to fetch data from store
 * Responsive design with mobile-first approach
 *
 * @example
 * <HintAnalyticsTab />
 */
export const HintAnalyticsTab: React.FC = () => {
  // Fetch aggregated hint analytics data
  const { questions, insight, isLoading } = useHintAnalytics();

  // Loading state
  if (isLoading) {
    return (
      <div
        className="glass-card-static p-12 text-center rounded-2xl"
        role="status"
        aria-live="polite"
      >
        <div className="animate-pulse">
          <div className="text-4xl mb-3">💡</div>
          <p className="text-gray-400 text-lg">Loading hint analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-0"
      role="region"
      aria-label="Hint analytics tab content"
    >
      {/* Header Section */}
      <div className="glass-card-static p-6 rounded-2xl mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[rgba(255,179,71,0.3)] to-[rgba(255,179,71,0.1)] border-2 border-[rgba(255,179,71,0.3)]">
            💡
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#e5e5ff]">Hint Journey</h2>
            <p className="text-xs text-gray-400">
              Your path through each question with hint support
            </p>
          </div>
        </div>

        {/* Hint Legend - Color Key */}
        <HintLegend />
      </div>

      {/* Hint Journey Timeline */}
      <HintJourney questions={questions} />

      {/* Insight Recommendation Card */}
      <HintInsightCard insight={insight} />
    </div>
  );
};
