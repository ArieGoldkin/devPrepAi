/**
 * useLearningInsights Hook
 * Aggregates assessment results and hint data to generate learning insights
 * Phase 4: Results Analytics - Learning Insights Tab
 */

import { useMemo } from "react";

import { useAppStore } from "@/store";
import type { IAssessmentResults, IHint } from "@/types/ai/assessment";

import {
  analyzePerformance,
  generateStrengthInsights,
  generateImprovementInsights,
  generateStrategyInsights,
  determineLearningStyle,
  generateRecommendations,
  type IInsight,
  type ILearningStyle,
  type IRecommendation,
} from "../utils/insights";

/**
 * Learning insights data structure for Learning Insights tab
 */
export interface ILearningInsightsData {
  strengths: IInsight[];
  improvements: IInsight[];
  strategies: IInsight[];
  learningStyle: ILearningStyle;
  recommendations: IRecommendation[];
  isLoading: boolean;
}

/**
 * Custom hook to generate learning insights from assessment results
 * Combines data from results slice and practice slice
 * @returns Learning insights data or loading state
 */
export function useLearningInsights(): ILearningInsightsData {
  // Get all assessment results from store
  const assessmentResults = useAppStore(
    (state): IAssessmentResults[] => state.assessmentResults,
  );

  // Get hints from practice slice
  const hintsList = useAppStore(
    (state): Map<string, IHint[]> => state.hintsList,
  );

  // Memoize calculations to avoid unnecessary recalculations
  const insights = useMemo(() => {
    // Get the most recent result (last in array)
    const currentResults =
      assessmentResults.length > 0
        ? assessmentResults[assessmentResults.length - 1]
        : null;

    // Return loading state if no results available
    if (!currentResults || currentResults.questions.length === 0) {
      return {
        strengths: [],
        improvements: [],
        strategies: [],
        learningStyle: {
          type: "",
          description: "",
          icon: "",
          hintUtilization: {
            percentage: 0,
            label: "",
            avgPerQuestion: 0,
          },
        },
        recommendations: [],
        isLoading: true,
      };
    }

    // Analyze performance across multiple dimensions
    const analysis = analyzePerformance(currentResults, hintsList);

    // Generate insights using rule-based logic
    const strengths = generateStrengthInsights(analysis);
    const improvements = generateImprovementInsights(analysis);
    const strategies = generateStrategyInsights(analysis);
    const learningStyle = determineLearningStyle(analysis);
    const recommendations = generateRecommendations(analysis);

    return {
      strengths,
      improvements,
      strategies,
      learningStyle,
      recommendations,
      isLoading: false,
    };
  }, [assessmentResults, hintsList]);

  return insights;
}
