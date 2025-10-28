/**
 * Learning Insights Types - Phase 4: Learning Insights Tab
 */

export interface IPerformanceAnalysis {
  avgScore: number;
  hintsPerQuestion: number;
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  timeEfficiency: number;
  strongAreas: string[];
  weakAreas: string[];
  hintPatterns: { level1: number; level2: number; level3: number };
}

export interface IInsight {
  topic: string;
  text: string;
  cta: string;
}

export interface ILearningStyle {
  type: string;
  description: string;
  icon: string;
  hintUtilization: {
    percentage: number;
    label: string;
    avgPerQuestion: number;
  };
}

export interface IRecommendation {
  type: "study" | "practice" | "skill" | "milestone";
  icon: string;
  title: string;
  message: string;
}
