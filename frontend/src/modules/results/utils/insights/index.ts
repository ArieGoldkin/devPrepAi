/**
 * Learning Insights Generation - Phase 4: Learning Insights Tab
 * Main export file for backward compatibility
 */

// Re-export all types
export type {
  IInsight,
  ILearningStyle,
  IPerformanceAnalysis,
  IRecommendation,
} from "./insights-types";

// Re-export all functions
export {
  analyzePerformance,
  generateImprovementInsights,
  generateStrategyInsights,
  generateStrengthInsights,
} from "./insights-analysis";
export {
  determineLearningStyle,
  generateRecommendations,
} from "./insights-recommendations";
