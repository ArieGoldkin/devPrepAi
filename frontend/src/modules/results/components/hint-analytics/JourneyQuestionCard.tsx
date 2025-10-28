/**
 * JourneyQuestionCard Component
 * Displays individual question in journey timeline format
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

import type { IQuestionHintData } from "@/modules/results/hooks/useHintAnalytics";

import { HintDots } from "./HintDots";

/**
 * Props for JourneyQuestionCard component
 */
interface IJourneyQuestionCardProps {
  question: IQuestionHintData;
}

// Time constants
const SECONDS_PER_MINUTE = 60;
const PAD_LENGTH = 2;

/**
 * Format time in seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${minutes}:${secs.toString().padStart(PAD_LENGTH, "0")}`;
}

// Score thresholds
const SCORE_EXCELLENT = 90;
const SCORE_GOOD = 75;
const SCORE_FAIR = 60;

// Difficulty thresholds
const DIFFICULTY_HARD_THRESHOLD = 7;
const DIFFICULTY_MEDIUM_THRESHOLD = 4;

/**
 * Get color based on score
 * @param score - Question score (0-100)
 * @returns Tailwind color class
 */
function getScoreColor(score: number): string {
  if (score >= SCORE_EXCELLENT) return "#4ade80"; // green-400
  if (score >= SCORE_GOOD) return "#60a5fa"; // blue-400
  if (score >= SCORE_FAIR) return "#fbbf24"; // yellow-400
  return "#f87171"; // red-400
}

/**
 * Get difficulty badge color and label
 * @param difficulty - Question difficulty (1-10 scale)
 * @returns Object with color class and label
 */
function getDifficultyInfo(difficulty: number): {
  color: string;
  label: string;
} {
  if (difficulty >= DIFFICULTY_HARD_THRESHOLD) {
    return { color: "text-red-400", label: "Hard" };
  }
  if (difficulty >= DIFFICULTY_MEDIUM_THRESHOLD) {
    return { color: "text-yellow-400", label: "Medium" };
  }
  return { color: "text-green-400", label: "Easy" };
}

/**
 * JourneyQuestionCard Component
 * Renders a question card in the hint journey timeline
 * Features:
 * - Numbered bubble on left (question number)
 * - Card content on right with title, metadata, hint dots
 * - Narrative text describing hint usage
 * - Hover effect (translateX + glow)
 *
 * @example
 * <JourneyQuestionCard question={questionData} />
 */
export const JourneyQuestionCard: React.FC<IJourneyQuestionCardProps> = ({
  question,
}) => {
  const difficultyInfo = getDifficultyInfo(question.difficulty);

  return (
    <div
      className="journey-item flex gap-5 items-stretch"
      role="article"
      aria-label={`Question ${question.questionNumber}`}
    >
      {/* Left: Numbered Bubble */}
      <div
        className="journey-number w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(120,119,198,0.3)] to-[rgba(120,119,198,0.1)] flex items-center justify-center text-xl font-bold text-[#7877c6] flex-shrink-0 border-2 border-[rgba(120,119,198,0.4)]"
        aria-hidden="true"
      >
        {question.questionNumber}
      </div>

      {/* Right: Card Content */}
      <div className="journey-content flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 transition-all duration-300 ease-in-out hover:bg-white/[0.06] hover:border-[rgba(120,119,198,0.3)] hover:translate-x-1">
        {/* Header: Title + Metadata + Hint Dots */}
        <div className="journey-header flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="journey-title text-base font-semibold text-[#e5e5ff] mb-1 truncate">
              {question.title}
            </h3>
            <div className="journey-meta flex gap-3 text-xs text-[rgba(229,229,255,0.6)]">
              <span className={`font-medium ${difficultyInfo.color}`}>
                {difficultyInfo.label}
              </span>
              <span aria-hidden="true">•</span>
              <span>{formatTime(question.timeSpent)}</span>
              <span aria-hidden="true">•</span>
              <span style={{ color: getScoreColor(question.score) }}>
                Score: {question.score}
              </span>
            </div>
          </div>

          {/* Hint Dots */}
          <div className="ml-4 flex-shrink-0">
            <HintDots hintsUsed={question.hintsUsed} />
          </div>
        </div>

        {/* Narrative Text */}
        <p className="journey-narrative text-[13px] text-[rgba(229,229,255,0.7)] leading-relaxed">
          {question.narrative}
        </p>
      </div>
    </div>
  );
};
