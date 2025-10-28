/**
 * Learning Insights Analysis - Phase 4: Learning Insights Tab
 */

import type { IAssessmentResults, IHint } from "@/types/ai/assessment";

import { TEMPLATES, THRESHOLDS } from "./insights-constants";
import {
  analyzeHintPatterns,
  calculateDifficultyBreakdown,
  identifyAreas,
} from "./insights-helpers";
import type { IInsight, IPerformanceAnalysis } from "./insights-types";

export function analyzePerformance(
  results: IAssessmentResults,
  hints: Map<string, IHint[]>,
): IPerformanceAnalysis {
  const { questions } = results;
  const avgScore =
    questions.length > 0
      ? Math.round(
          questions.reduce((s, q) => s + (q.feedback?.score ?? 0), 0) /
            questions.length,
        )
      : 0;

  let totalHints = 0;
  questions.forEach((q) => {
    totalHints += (hints.get(q.question.id) ?? []).length;
  });
  const hintsPerQuestion =
    questions.length > 0 ? totalHints / questions.length : 0;

  const difficultyBreakdown = calculateDifficultyBreakdown(questions);
  const timeEfficiency =
    results.totalTimeAllocated > 0
      ? Math.round(
          (results.totalTimeSpent / results.totalTimeAllocated) *
            THRESHOLDS.PERCENT,
        )
      : 0;

  const areas = identifyAreas(avgScore, hintsPerQuestion, difficultyBreakdown);
  const hintPatterns = analyzeHintPatterns(hints);

  return {
    avgScore,
    hintsPerQuestion,
    difficultyBreakdown,
    timeEfficiency,
    strongAreas: areas.strong,
    weakAreas: areas.weak,
    hintPatterns,
  };
}

export function generateStrengthInsights(
  analysis: IPerformanceAnalysis,
): IInsight[] {
  const insights: IInsight[] = [];
  const t = TEMPLATES.strengths;

  if (analysis.avgScore > THRESHOLDS.SCORE_HIGH)
    insights.push(t.find((i) => i.topic === "code-quality")!);
  if (analysis.hintsPerQuestion < THRESHOLDS.HINTS_LOW)
    insights.push(t.find((i) => i.topic === "problem-solving")!);
  if (analysis.strongAreas.includes("fundamentals"))
    insights.push(t.find((i) => i.topic === "hash-maps")!);
  if (
    analysis.hintsPerQuestion > 0 &&
    analysis.avgScore >= THRESHOLDS.SCORE_MEDIUM
  )
    insights.push(t.find((i) => i.topic === "hint-usage")!);

  return insights.slice(0, 4);
}

export function generateImprovementInsights(
  analysis: IPerformanceAnalysis,
): IInsight[] {
  const insights: IInsight[] = [];
  const t = TEMPLATES.improvements;

  if (analysis.difficultyBreakdown.hard < THRESHOLDS.SCORE_MEDIUM)
    insights.push(t.find((i) => i.topic === "data-structures")!);
  if (analysis.weakAreas.includes("advanced-concepts"))
    insights.push(t.find((i) => i.topic === "system-design")!);
  if (analysis.timeEfficiency > THRESHOLDS.SCORE_HIGH)
    insights.push(t.find((i) => i.topic === "time-management")!);
  if (insights.length < 3)
    insights.push(t.find((i) => i.topic === "space-complexity")!);

  return insights.slice(0, 4);
}

export function generateStrategyInsights(
  analysis: IPerformanceAnalysis,
): IInsight[] {
  const insights: IInsight[] = [];
  const t = TEMPLATES.strategies;

  if (analysis.hintPatterns.level1 > 0)
    insights.push(t.find((i) => i.topic === "level-1-hints")!);
  if (analysis.avgScore >= THRESHOLDS.SCORE_MEDIUM)
    insights.push(t.find((i) => i.topic === "breakdown")!);
  insights.push(t.find((i) => i.topic === "edge-cases")!);
  if (insights.length < 4)
    insights.push(t.find((i) => i.topic === "pattern-matching")!);

  return insights.slice(0, 4);
}
