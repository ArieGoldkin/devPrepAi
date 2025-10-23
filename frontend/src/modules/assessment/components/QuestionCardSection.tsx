import React from "react";

import type { IQuestion } from "@/types/ai";

import {
  ConstraintsSection,
  ExamplesSection,
  QuestionCard,
  QuestionContent,
  QuestionHeader,
} from "./QuestionPanel";

interface IQuestionCardSectionProps {
  question: IQuestion;
  questionNumber: number;
}

/**
 * QuestionCardSection
 *
 * Renders the question card with all its content sections
 * Extracted from AssessmentLayout to reduce file size
 */
export const QuestionCardSection: React.FC<IQuestionCardSectionProps> = ({
  question,
  questionNumber,
}) => (
  <QuestionCard question={question} questionNumber={questionNumber}>
    <QuestionHeader
      questionNumber={questionNumber}
      difficulty={question.difficulty}
    />
    <QuestionContent title={question.title} content={question.content} />
    {(question.constraints?.length ?? 0) > 0 && (
      <ConstraintsSection constraints={question.constraints ?? []} />
    )}
    {(question.examples?.length ?? 0) > 0 && (
      <ExamplesSection examples={question.examples ?? []} />
    )}
  </QuestionCard>
);
