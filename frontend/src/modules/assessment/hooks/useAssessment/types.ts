import type { IQuestion } from "@/types/ai";

export interface IUseAssessmentReturn {
  // State
  questions: IQuestion[];
  currentQuestion: IQuestion | null;
  currentIndex: number;
  currentAnswer: string;
  answers: Map<string, string>;
  progress: number;
  timeRemaining: number;

  // Flags
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasAnswer: boolean;
  isActive: boolean;
  isEvaluating: boolean;

  // Handlers
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => Promise<void>;
  handleAnswerChange: (value: string) => void;
}
