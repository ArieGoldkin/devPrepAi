/**
 * Learning Insights Constants - Phase 4: Learning Insights Tab
 */

import type { IInsight } from "./insights-types";

export const HINT_MULTIPLIERS = { LOW: 50, OPTIMAL: 40, HIGH: 30 } as const;

export const THRESHOLDS = {
  SCORE_HIGH: 85,
  SCORE_MEDIUM: 70,
  HINTS_LOW: 1,
  HINTS_MEDIUM: 2,
  DIFFICULTY_EASY_MAX: 3,
  DIFFICULTY_MEDIUM_MAX: 7,
  PERCENT: 100,
} as const;

export const TEMPLATES = {
  strengths: [
    {
      topic: "hash-maps",
      text: "Strong understanding of array manipulation and hash maps",
      cta: "Practice",
    },
    {
      topic: "code-quality",
      text: "Excellent code quality and readability",
      cta: "Practice",
    },
    {
      topic: "problem-solving",
      text: "Good at solving problems independently when confident",
      cta: "Practice",
    },
    {
      topic: "hint-usage",
      text: "Effective use of hints when stuck",
      cta: "Practice",
    },
  ] as IInsight[],
  improvements: [
    {
      topic: "data-structures",
      text: "Review advanced data structures (LRU cache, trees)",
      cta: "Learn",
    },
    {
      topic: "system-design",
      text: "Practice more system design scalability concepts",
      cta: "Learn",
    },
    {
      topic: "time-management",
      text: "Work on reducing time on medium-difficulty problems",
      cta: "Learn",
    },
    {
      topic: "space-complexity",
      text: "Strengthen knowledge of space complexity optimization",
      cta: "Learn",
    },
  ] as IInsight[],
  strategies: [
    {
      topic: "level-1-hints",
      text: "Using Level 1 hints to clarify approach before coding",
      cta: "Deepen",
    },
    {
      topic: "breakdown",
      text: "Breaking down complex problems into smaller steps",
      cta: "Deepen",
    },
    {
      topic: "edge-cases",
      text: "Testing edge cases and validating solutions",
      cta: "Deepen",
    },
    {
      topic: "pattern-matching",
      text: "Applying learned patterns to similar problems",
      cta: "Deepen",
    },
  ] as IInsight[],
} as const;
