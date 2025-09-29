import type { IQuestion } from "@/types/ai";
import { SECONDS_PER_MINUTE } from "@shared/utils/time";

export const formatAssessmentTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % SECONDS_PER_MINUTE;
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toString().padStart(2, "0");
  return `${minutesStr}:${secondsStr}`;
};

interface IEvaluateAnswerParams {
  question: IQuestion;
  answer: string;
}

export const createEvaluationPromises = (
  answers: Array<{ questionId: string; answer: string }>,
  questions: IQuestion[],
  evaluateAnswer: (params: IEvaluateAnswerParams) => Promise<unknown>,
): Array<Promise<unknown | null>> =>
  answers.map(async (answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return null;
    return evaluateAnswer({ question, answer: answer.answer });
  });
