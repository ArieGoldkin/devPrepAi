/**
 * useHintAnalytics Hook
 * Aggregates hint data from results and practice slices
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import { useMemo } from "react";

import { useAppStore } from "@/store";
import type {
  IAssessmentResults,
  IHint,
  IQuestionResult,
} from "@/types/ai/assessment";

import {
  generateHintNarrative,
  generateHintInsight,
  type IInsight,
} from "../utils/hint-narratives";

/**
 * Question data with hint information
 * Used for journey timeline visualization
 */
export interface IQuestionHintData {
  questionId: string;
  questionNumber: number;
  title: string;
  difficulty: number; // 1-10 scale
  timeSpent: number;
  score: number;
  hintsUsed: IHint[];
  narrative: string;
}

/**
 * Hint analytics data structure
 * Returned by useHintAnalytics hook
 */
export interface IHintAnalyticsData {
  questions: IQuestionHintData[];
  insight: IInsight;
  isLoading: boolean;
}

/**
 * Custom hook to aggregate hint analytics data
 * Combines results from both resultsSlice and practiceSlice
 * @returns Aggregated hint analytics data or loading state
 */
export function useHintAnalytics(): IHintAnalyticsData {
  // Get assessment results from store
  const assessmentResults = useAppStore(
    (state): IAssessmentResults[] => state.assessmentResults,
  );

  // Get hints from practice slice
  const hintsList = useAppStore(
    (state): Map<string, IHint[]> => state.hintsList,
  );

  // Memoize calculations to avoid unnecessary recalculations
  const analyticsData = useMemo(() => {
    // Get the most recent result
    const currentResults =
      assessmentResults.length > 0
        ? assessmentResults[assessmentResults.length - 1]
        : null;

    if (!currentResults || currentResults.questions.length === 0) {
      return {
        questions: [],
        insight: {
          icon: "📊",
          title: "No Data Available",
          message:
            "Complete a practice session with hints enabled to see your hint journey.",
        },
        isLoading: true,
      };
    }

    // Map questions to hint data format
    const questions: IQuestionHintData[] = currentResults.questions.map(
      (questionResult: IQuestionResult, index: number) => {
        // Get hints from hintsList or use attached hints
        const hintsUsed =
          questionResult.hintsUsed ??
          hintsList.get(questionResult.question.id) ??
          [];

        // Generate narrative for this question
        const narrative = generateHintNarrative(questionResult, hintsUsed);

        return {
          questionId: questionResult.question.id,
          questionNumber: index + 1,
          title: questionResult.question.title,
          difficulty: questionResult.question.difficulty,
          timeSpent: questionResult.timeSpent,
          score: questionResult.feedback.score,
          hintsUsed,
          narrative,
        };
      },
    );

    // Generate overall insight
    const insight = generateHintInsight(
      questions.map((q) => ({
        hintsUsed: q.hintsUsed,
        score: q.score,
      })),
    );

    return {
      questions,
      insight,
      isLoading: false,
    };
  }, [assessmentResults, hintsList]);

  return analyticsData;
}
