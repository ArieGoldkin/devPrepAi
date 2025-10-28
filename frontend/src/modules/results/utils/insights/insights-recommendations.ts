/**
 * Learning Style and Recommendations - Phase 4: Learning Insights Tab
 */

import { HINT_MULTIPLIERS, THRESHOLDS } from "./insights-constants";
import type {
  ILearningStyle,
  IPerformanceAnalysis,
  IRecommendation,
} from "./insights-types";

export function determineLearningStyle(
  analysis: IPerformanceAnalysis,
): ILearningStyle {
  const { hintsPerQuestion } = analysis;
  const avgRounded = Math.round(hintsPerQuestion * 10) / 10;

  if (hintsPerQuestion < THRESHOLDS.HINTS_LOW) {
    return {
      type: "Independent Learner",
      description: "You prefer working through problems on your own",
      icon: "🎯",
      hintUtilization: {
        percentage: Math.round(hintsPerQuestion * HINT_MULTIPLIERS.LOW),
        label: "Low",
        avgPerQuestion: avgRounded,
      },
    };
  }

  if (hintsPerQuestion <= THRESHOLDS.HINTS_MEDIUM) {
    return {
      type: "Strategic Learner",
      description: "You use hints effectively to overcome challenges",
      icon: "🧠",
      hintUtilization: {
        percentage: Math.round(hintsPerQuestion * HINT_MULTIPLIERS.OPTIMAL),
        label: "Optimal",
        avgPerQuestion: avgRounded,
      },
    };
  }

  return {
    type: "Guided Learner",
    description: "You benefit from structured guidance",
    icon: "📚",
    hintUtilization: {
      percentage: Math.min(
        THRESHOLDS.PERCENT,
        Math.round(hintsPerQuestion * HINT_MULTIPLIERS.HIGH),
      ),
      label: "High",
      avgPerQuestion: avgRounded,
    },
  };
}

export function generateRecommendations(
  analysis: IPerformanceAnalysis,
): IRecommendation[] {
  const recs: IRecommendation[] = [];

  recs.push(
    analysis.avgScore < THRESHOLDS.SCORE_MEDIUM
      ? {
          type: "study",
          icon: "📖",
          title: "Review Fundamentals",
          message:
            "Strengthen your understanding of core data structures and algorithms",
        }
      : {
          type: "study",
          icon: "📖",
          title: "Explore Advanced Topics",
          message: "Dive into system design and optimization techniques",
        },
  );

  recs.push({
    type: "practice",
    icon: "💻",
    title: "Daily Practice",
    message: "Aim for 2-3 problems daily to maintain momentum",
  });

  recs.push(
    analysis.weakAreas.includes("advanced-concepts")
      ? {
          type: "skill",
          icon: "🎓",
          title: "Master Hard Problems",
          message: "Focus on challenging questions to build confidence",
        }
      : {
          type: "skill",
          icon: "🎓",
          title: "Refine Your Approach",
          message: "Practice explaining your thought process clearly",
        },
  );

  recs.push({
    type: "milestone",
    icon: "🏆",
    title: "Track Progress",
    message: "Set weekly goals and review your improvement metrics",
  });

  return recs;
}
