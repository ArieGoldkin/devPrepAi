import { useState, useEffect } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@store/slices/assessmentSlice";
import { useAppStore } from "@store/useAppStore";

interface IUseAssessmentHandlersReturn {
  questions: IQuestion[];
  currentQuestion: IQuestion | null | undefined;
  currentQuestionIndex: number;
  currentAnswer: string;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  answers: IAssessmentAnswer[];
  handleAnswerChange: (value: string) => void;
  handleSubmitAnswer: () => void;
  handleNext: () => void;
  handleTimeUp: () => void;
  getAnswerTimeSpent: () => number | undefined;
}

export function useAssessmentHandlers(
  onComplete?: () => void,
): IUseAssessmentHandlersReturn {
  const {
    questions,
    currentQuestionIndex,
    answers,
    submitAnswer,
    nextQuestion,
    completeAssessment,
    addResult,
  } = useAppStore();

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (currentQuestion !== null && currentQuestion !== undefined) {
      const existingAnswer = answers.find(
        (a: IAssessmentAnswer) => a.questionId === currentQuestion.id,
      );
      setCurrentAnswer(existingAnswer?.answer ?? "");
      setHasAnswered(existingAnswer !== null && existingAnswer !== undefined);
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleAnswerChange = (value: string): void => {
    setCurrentAnswer(value);
  };

  const handleSubmitAnswer = (): void => {
    if (
      currentQuestion === null ||
      currentQuestion === undefined ||
      currentAnswer.trim() === ""
    )
      return;

    submitAnswer(currentQuestion.id, currentAnswer.trim());
    setHasAnswered(true);
  };

  const handleComplete = (): void => {
    const result = completeAssessment();
    addResult(result);
    onComplete?.();
  };

  const handleNext = (): void => {
    if (hasAnswered === false) {
      handleSubmitAnswer();
    }

    if (isLastQuestion) {
      handleComplete();
    } else {
      nextQuestion();
      setHasAnswered(false);
    }
  };

  const handleTimeUp = (): void => {
    if (currentAnswer.trim() !== "" && hasAnswered === false) {
      handleSubmitAnswer();
    }
    handleComplete();
  };

  const getAnswerTimeSpent = (): number | undefined => {
    if (!currentQuestion) return undefined;
    const answerData = answers.find(
      (a: IAssessmentAnswer) => a.questionId === currentQuestion.id,
    );
    return answerData?.timeSpent;
  };

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentAnswer,
    hasAnswered,
    isLastQuestion,
    answers,
    handleAnswerChange,
    handleSubmitAnswer,
    handleNext,
    handleTimeUp,
    getAnswerTimeSpent,
  };
}
