/**
 * HintJourney Component
 * Container for vertical timeline of question cards
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import * as React from "react";

import type { IQuestionHintData } from "@/modules/results/hooks/useHintAnalytics";

import { JourneyQuestionCard } from "./JourneyQuestionCard";

/**
 * Props for HintJourney component
 */
interface IHintJourneyProps {
  questions: IQuestionHintData[];
}

/**
 * HintJourney Component
 * Renders a vertical timeline of all questions with hint usage
 * Each question is represented by a JourneyQuestionCard
 * Handles empty state gracefully
 *
 * @example
 * <HintJourney questions={questionData} />
 */
export const HintJourney: React.FC<IHintJourneyProps> = ({ questions }) => {
  // Handle empty state
  if (questions.length === 0) {
    return (
      <div
        className="hint-journey p-12 text-center bg-white/[0.03] rounded-xl"
        role="status"
      >
        <p className="text-gray-400 text-base">No hint data available</p>
        <p className="text-gray-500 text-sm mt-2">
          Complete a practice session with hints enabled to see your journey
        </p>
      </div>
    );
  }

  return (
    <div
      className="hint-journey flex flex-col gap-6 mt-6"
      role="feed"
      aria-label="Hint journey timeline"
    >
      {questions.map((question) => (
        <JourneyQuestionCard key={question.questionId} question={question} />
      ))}
    </div>
  );
};
