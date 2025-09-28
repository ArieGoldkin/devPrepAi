import { useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@lib/store/slices/assessmentSlice";

import { isCodingQuestion } from "../../answer/utils";

type QuestionType = "behavioral" | "system-design" | "coding" | "conceptual";

interface IQuestionHelpersParams {
  currentQuestion: IQuestion | null | undefined;
  answers: IAssessmentAnswer[];
}

interface IQuestionHelpersReturn {
  getQuestionType: () => QuestionType;
  getAnswerTimeSpent: () => number | undefined;
}

export function useQuestionHelpers({ currentQuestion, answers }: IQuestionHelpersParams): IQuestionHelpersReturn {
  const getQuestionType = useCallback((): QuestionType => {
    if (!currentQuestion) return "conceptual";
    if (isCodingQuestion(currentQuestion)) {
      return "coding";
    }
    const content = currentQuestion.content?.toLowerCase() || "";
    if (content.includes("system") || content.includes("design") || content.includes("architecture")) {
      return "system-design";
    }
    if (content.includes("experience") || content.includes("situation") || content.includes("challenge")) {
      return "behavioral";
    }
    return "conceptual";
  }, [currentQuestion]);

  const getAnswerTimeSpent = useCallback((): number | undefined => {
    if (!currentQuestion) return undefined;
    const answerData = answers.find(
      (a: IAssessmentAnswer) => a.questionId === currentQuestion.id,
    );
    return answerData?.timeSpent;
  }, [currentQuestion, answers]);

  return {
    getQuestionType,
    getAnswerTimeSpent,
  };
}
