import React from "react";

import type { IQuestion } from "@/types/ai";
import { Textarea } from "@shared/ui/textarea";

import { isCodingQuestion } from "./answer/utils";
import QuestionLayout from "./layout/containers/QuestionLayout";
import { AnswerSubmitted } from "./question/AnswerSubmitted";
import { QuestionConstraints } from "./question/QuestionConstraints";
import { QuestionContext } from "./question/QuestionContext";
import { QuestionEdgeCases } from "./question/QuestionEdgeCases";
import { QuestionExamples } from "./question/QuestionExamples";

interface IQuestionDisplayProps {
  question: IQuestion;
  currentAnswer: string;
  hasAnswered: boolean;
  answerTimeSpent?: number;
  onAnswerChange: (value: string) => void;
  onSubmit?: () => void;
  onNavigate?: (direction: "next" | "previous") => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
}

export function QuestionDisplay({
  question,
  currentAnswer,
  hasAnswered,
  answerTimeSpent,
  onAnswerChange,
  onSubmit,
  onNavigate,
  isLastQuestion = false,
  isFirstQuestion = false,
}: IQuestionDisplayProps): React.JSX.Element {
  // Use QuestionLayout for coding questions with enhanced features
  if (isCodingQuestion(question)) {
    return (
      <QuestionLayout
        question={question}
        currentAnswer={currentAnswer}
        onAnswerChange={onAnswerChange}
        onSubmit={onSubmit ?? (() => {})}
        isLastQuestion={isLastQuestion}
        isFirstQuestion={isFirstQuestion}
        className="animate-slide-up"
        {...(onNavigate ? { onNavigate } : {})}
      />
    );
  }

  // Fallback to original layout for non-coding questions
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border animate-slide-up">
      <h3 className="text-title font-semibold mb-4">{question.content}</h3>

      <QuestionContext question={question} />
      <QuestionExamples examples={question.examples} />
      <QuestionConstraints constraints={question.constraints} />
      <QuestionEdgeCases edgeCases={question.edgeCases} />

      <Textarea
        value={currentAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-32"
        disabled={hasAnswered}
      />

      {hasAnswered && answerTimeSpent !== undefined && (
        <AnswerSubmitted answerTimeSpent={answerTimeSpent} />
      )}
    </div>
  );
}