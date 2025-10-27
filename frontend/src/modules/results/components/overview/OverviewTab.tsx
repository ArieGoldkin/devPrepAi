/**
 * OverviewTab Container Component
 *
 * Main container for the Results Analytics Overview tab.
 * Orchestrates all child components and fetches data using the useResultsMetrics hook.
 *
 * @module modules/results/components
 */

import {
  useResultsMetrics,
  type IResultsMetrics,
} from "@modules/results/hooks/useResultsMetrics";

import { DifficultyBreakdown } from "./DifficultyBreakdown";
import { HintUsageSummary } from "./HintUsageSummary";
import { PerformanceSummary } from "./PerformanceSummary";
import { RecommendationCard } from "./RecommendationCard";

/**
 * Mock data for placeholder display
 * Shows a realistic example when no real assessment data is available
 */
const PLACEHOLDER_METRICS: IResultsMetrics = {
  performance: {
    averageScore: 78,
    completionRate: 90,
    totalTime: 45,
    avgImprovement: 0,
  },
  byDifficulty: {
    easy: { score: 85, count: 3 },
    medium: { score: 72, count: 5 },
    hard: { score: 65, count: 2 },
  },
  hints: {
    totalHints: 15,
    effectiveness: 78,
    averagePerQuestion: 1.7,
  },
  recommendation: {
    title: "Great Job!",
    message:
      "Solid understanding demonstrated. Try practicing more questions in your weaker areas.",
    icon: "⭐",
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IOverviewTabProps {
  // No props - gets data from store via useResultsMetrics
}

/**
 * OverviewTab Component
 *
 * Container component that orchestrates the Overview tab layout:
 * - PerformanceSummary (full width at top)
 * - Two-column grid (DifficultyBreakdown | HintUsageSummary)
 * - RecommendationCard (full width at bottom)
 *
 * Responsive: two-column grid stacks vertically on mobile (<768px)
 *
 * @example
 * <OverviewTab />
 */
export const OverviewTab: React.FC<IOverviewTabProps> = () => {
  // Fetch aggregated metrics from store
  const realMetrics = useResultsMetrics();

  // Use placeholder data if no real metrics available (for visual demo)
  const metrics = realMetrics ?? PLACEHOLDER_METRICS;
  const isPlaceholder = !realMetrics;

  return (
    <div className="space-y-6" role="region" aria-label="Overview tab content">
      {/* Placeholder Banner - shown when using demo data */}
      {isPlaceholder && (
        <div className="glass-card-static p-4 border-l-4 border-purple-500">
          <p className="text-gray-300 text-sm">
            <span className="font-semibold text-purple-400">Preview Mode:</span>{" "}
            Showing example data. Complete a practice session to see your actual
            results.
          </p>
        </div>
      )}

      {/* Overall Performance Section Header */}
      <div className="glass-card-static p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[rgba(120,119,198,0.3)] to-[rgba(120,119,198,0.1)]">
            🏆
          </div>
          <div>
            <h2 className="text-xl font-bold">Overall Performance</h2>
            <p className="text-xs text-gray-400">
              Your session summary and key metrics
            </p>
          </div>
        </div>

        {/* Performance Summary Grid */}
        <PerformanceSummary {...metrics.performance} />
      </div>

      {/* Two-Column Grid - Difficulty Breakdown | Hint Usage Summary */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ marginBottom: 0 }}
      >
        {/* Left Column: Difficulty Breakdown */}
        <DifficultyBreakdown {...metrics.byDifficulty} />

        {/* Right Column: Hint Usage Summary */}
        <HintUsageSummary {...metrics.hints} />
      </div>

      {/* Recommendation Card - Full Width */}
      <RecommendationCard {...metrics.recommendation} />
    </div>
  );
};
