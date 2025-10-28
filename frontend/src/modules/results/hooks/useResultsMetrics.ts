/**
 * useResultsMetrics Hook
 * Aggregates assessment results data into Overview-ready metrics
 * Phase 4: Results Analytics - Overview Tab
 */

import { useMemo } from "react";

import { useAppStore } from "@/store";
import type {
  IAssessmentResults,
  IHint,
  IQuestionResult,
} from "@/types/ai/assessment";

import {
  calculateAverageScore,
  calculateCompletionRate,
  groupByDifficulty,
  calculateHintEffectiveness,
  generateRecommendation,
  type IDifficultyBreakdown,
  type IRecommendation,
} from "../utils/metricsCalculations";

/**
 * Results metrics data structure for Overview tab
 */
export interface IResultsMetrics {
  performance: {
    averageScore: number;
    completionRate: number;
    totalTime: number;
    avgImprovement: number;
  };
  byDifficulty: IDifficultyBreakdown;
  hints: {
    totalHints: number;
    effectiveness: number;
    averagePerQuestion: number;
  };
  recommendation: IRecommendation;
}

// Constants
const SECONDS_PER_MINUTE = 60;

/**
 * Custom hook to aggregate and calculate results metrics
 * Combines data from results slice and practice slice
 * @returns Aggregated metrics or null if no results available
 */
export function useResultsMetrics(): IResultsMetrics | null {
  // Get all assessment results from store
  const assessmentResults = useAppStore(
    (state): IAssessmentResults[] => state.assessmentResults,
  );

  // Get hints from practice slice
  const hintsList = useAppStore(
    (state): Map<string, IHint[]> => state.hintsList,
  );

  // Memoize calculations to avoid unnecessary recalculations
  const metrics = useMemo(() => {
    // Get the most recent result (last in array)
    const currentResults =
      assessmentResults.length > 0
        ? assessmentResults[assessmentResults.length - 1]
        : null;

    if (!currentResults || currentResults.questions.length === 0) {
      return null;
    }

    const { questions, totalTimeSpent } = currentResults;

    // Attach hints to question results if not already present
    const questionsWithHints = questions.map((result: IQuestionResult) => {
      if (result.hintsUsed) return result;

      const questionHints = hintsList.get(result.question.id) ?? [];
      return {
        ...result,
        hintsUsed: questionHints,
      };
    });

    // Calculate performance metrics
    const averageScore = calculateAverageScore(questionsWithHints);
    const completionRate = calculateCompletionRate(questionsWithHints);
    const totalTime = Math.round(totalTimeSpent / SECONDS_PER_MINUTE); // Convert to minutes

    // Calculate improvement (placeholder - requires historical data)
    const avgImprovement = 0; // TODO: Implement historical comparison

    // Calculate difficulty breakdown
    const byDifficulty = groupByDifficulty(questionsWithHints);

    // Calculate hint metrics
    const totalHints = questionsWithHints.reduce(
      (sum: number, result: IQuestionResult) =>
        sum + (result.hintsUsed?.length ?? 0),
      0,
    );

    const effectiveness = calculateHintEffectiveness(questionsWithHints);
    const averagePerQuestion =
      questions.length > 0
        ? Math.round((totalHints / questions.length) * 10) / 10
        : 0;

    // Generate recommendation
    const recommendation = generateRecommendation(
      averageScore,
      completionRate,
      totalHints,
    );

    return {
      performance: {
        averageScore,
        completionRate,
        totalTime,
        avgImprovement,
      },
      byDifficulty,
      hints: {
        totalHints,
        effectiveness,
        averagePerQuestion,
      },
      recommendation,
    };
  }, [assessmentResults, hintsList]);

  return metrics;
}
