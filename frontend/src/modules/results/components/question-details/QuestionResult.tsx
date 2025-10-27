/**
 * QuestionResult Component
 *
 * Displays individual question result in glassmorphism style
 * matching the prototype design exactly.
 */

import * as React from "react";

import type { IQuestionResult } from "@/types/ai";
import { cn } from "@shared/utils/cn";

interface IQuestionResultProps {
  result: IQuestionResult;
  index: number;
}

/**
 * Scoring and display constants
 */
const DIFFICULTY_THRESHOLDS = {
  EASY_MAX: 3,
  MEDIUM_MAX: 7,
} as const;

const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
} as const;

const DISPLAY_LIMITS = {
  QUESTION_TITLE_LENGTH: 50,
  FEEDBACK_PREVIEW_LENGTH: 80,
} as const;

const TIME_CONSTANTS = {
  SECONDS_PER_MINUTE: 60,
} as const;

/**
 * Get difficulty badge label
 */
const getDifficultyLabel = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_THRESHOLDS.EASY_MAX) return "Easy";
  if (difficulty <= DIFFICULTY_THRESHOLDS.MEDIUM_MAX) return "Medium";
  return "Hard";
};

/**
 * Get score color class based on percentage
 */
const getScoreColorClass = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return "score-excellent"; // green
  if (score >= SCORE_THRESHOLDS.GOOD) return "score-good"; // blue/cyan
  if (score >= SCORE_THRESHOLDS.FAIR) return "score-fair"; // orange
  return "score-poor"; // pink
};

/**
 * Format time in seconds to "Xm Ys" format
 */
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Extract strengths and improvements from feedback
 */
const extractFeedbackParts = (
  feedback: string,
): { strengths: string; improvements: string } => {
  // Try to extract strengths and improvements from feedback text
  const strengthsMatch = feedback.match(
    /strengths?:?\s*(.+?)(?=improvements?:|$)/is,
  );
  const improvementsMatch = feedback.match(/improvements?:?\s*(.+?)$/is);

  return {
    strengths:
      strengthsMatch?.[1]?.trim() ??
      feedback.substring(0, DISPLAY_LIMITS.FEEDBACK_PREVIEW_LENGTH),
    improvements:
      improvementsMatch?.[1]?.trim() ?? "Continue practicing similar problems",
  };
};

export const QuestionResult: React.FC<IQuestionResultProps> = ({
  result,
  index,
}) => {
  const difficultyLabel = getDifficultyLabel(result.question.difficulty);
  const scoreColorClass = getScoreColorClass(result.feedback.score);
  const { strengths, improvements } = extractFeedbackParts(
    result.feedback.overallFeedback,
  );
  const hintsCount = result.hintsUsed?.length ?? 0;

  return (
    <div className="question-item">
      {/* Header: Question Title + Score */}
      <div className="question-header">
        <div className="question-title">
          {index + 1}.{" "}
          {result.question.content.substring(
            0,
            DISPLAY_LIMITS.QUESTION_TITLE_LENGTH,
          )}
          {result.question.content.length > DISPLAY_LIMITS.QUESTION_TITLE_LENGTH
            ? "..."
            : ""}
        </div>
        <div className={cn("question-score", scoreColorClass)}>
          {result.feedback.score}
        </div>
      </div>

      {/* Meta Badges: Difficulty, Type, Hints, Time */}
      <div className="question-meta">
        <span className="badge badge-difficulty">{difficultyLabel}</span>
        <span className="badge badge-type">{result.question.type}</span>
        {hintsCount > 0 && (
          <span className="badge badge-hints">
            💡 {hintsCount} {hintsCount === 1 ? "Hint" : "Hints"}
          </span>
        )}
        {/* Time display - matches prototype style */}
        <span style={{ fontSize: "12px", color: "rgba(229, 229, 255, 0.6)" }}>
          ⏱️ {formatTime(result.timeSpent)}
        </span>
      </div>

      {/* Summary: Strengths & Improvements - matches prototype exactly */}
      <p
        style={{
          marginTop: "12px",
          fontSize: "13px",
          color: "rgba(229, 229, 255, 0.7)",
          lineHeight: "1.6",
        }}
      >
        ✅ <strong>Strengths:</strong>{" "}
        {strengths.substring(0, DISPLAY_LIMITS.FEEDBACK_PREVIEW_LENGTH)}
        {strengths.length > DISPLAY_LIMITS.FEEDBACK_PREVIEW_LENGTH ? "..." : ""}
        <br />
        📝 <strong>Improvements:</strong>{" "}
        {improvements.substring(0, DISPLAY_LIMITS.FEEDBACK_PREVIEW_LENGTH)}
        {improvements.length > DISPLAY_LIMITS.FEEDBACK_PREVIEW_LENGTH
          ? "..."
          : ""}
      </p>
    </div>
  );
};
