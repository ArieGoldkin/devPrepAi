/**
 * QuestionDetailsTab Container Component
 *
 * Displays a list of all questions from the practice session with detailed feedback.
 * Each question shows score, difficulty, type, hints used, time spent, and AI feedback.
 *
 * @module modules/results/components/question-details
 */

import { useAppStore } from "@/store";
import type { IQuestionResult } from "@/types/ai/assessment";

import { QuestionResult } from "./QuestionResult";

/**
 * QuestionDetailsTab Component
 *
 * Container that fetches questions from the store and renders a QuestionResult card
 * for each question in the assessment.
 *
 * Features:
 * - Automatic data fetching from Zustand store
 * - Empty state handling (no questions)
 * - Responsive vertical list layout
 * - Glassmorphism card styling for each question
 *
 * @example
 * <QuestionDetailsTab />
 */
export const QuestionDetailsTab: React.FC = () => {
  // Get questions from the most recent assessment results
  const questions = useAppStore((state): IQuestionResult[] =>
    state.assessmentResults.length > 0
      ? (state.assessmentResults[state.assessmentResults.length - 1]
          ?.questions ?? [])
      : [],
  );

  // Empty state: no assessment results yet
  if (questions.length === 0) {
    return (
      <div
        className="glass-card-static p-12 rounded-2xl text-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No Questions Yet</h3>
        <p className="text-gray-400">
          Complete a practice session to see detailed question-by-question
          feedback here.
        </p>
      </div>
    );
  }

  // Render list of question result cards
  return (
    <div
      className="space-y-4"
      role="region"
      aria-label="Question-by-question results"
    >
      {/* Section Header */}
      <div className="glass-card-static p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[rgba(120,219,255,0.3)] to-[rgba(120,219,255,0.1)]">
            📝
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Question-by-Question Breakdown
            </h2>
            <p className="text-xs text-gray-400">
              Detailed performance on each question ({questions.length} total)
            </p>
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {questions.map((result: IQuestionResult, index: number) => (
          <QuestionResult
            key={result.question.id}
            result={result}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
