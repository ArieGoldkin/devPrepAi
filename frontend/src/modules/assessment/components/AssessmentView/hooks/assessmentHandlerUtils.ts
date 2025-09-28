import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@lib/store/slices/assessmentSlice";

/**
 * Utility functions for assessment handlers
 */

export function initializeAnswerState(
  currentQuestion: IQuestion | null | undefined,
  answers: IAssessmentAnswer[],
  draftAnswers: Array<{ questionId: string; draft: string }>,
): {
  currentAnswer: string;
  draftAnswer: string;
  hasAnswered: boolean;
} {
  if (!currentQuestion) {
    return {
      currentAnswer: "",
      draftAnswer: "",
      hasAnswered: false,
    };
  }

  const existingAnswer = answers.find(
    (a: IAssessmentAnswer) => a.questionId === currentQuestion.id,
  );
  const existingDraft = draftAnswers.find(
    (d) => d.questionId === currentQuestion.id,
  );

  return {
    currentAnswer: existingAnswer?.answer ?? "",
    draftAnswer: existingDraft?.draft ?? "",
    hasAnswered: !!existingAnswer,
  };
}

export function shouldAutoSave(
  draftAnswer: string,
  currentAnswer: string,
): boolean {
  return (
    draftAnswer !== currentAnswer &&
    draftAnswer.trim() !== ""
  );
}

export function canSubmitAnswer(
  currentQuestion: IQuestion | null | undefined,
  draftAnswer: string,
): boolean {
  return (
    !!currentQuestion &&
    draftAnswer.trim() !== ""
  );
}

export function shouldCompleteAssessment(
  isLastQuestion: boolean,
): boolean {
  return isLastQuestion;
}

export function getNavigationState(
  currentQuestionIndex: number,
  totalQuestions: number,
): {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
} {
  return {
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === totalQuestions - 1,
  };
}
