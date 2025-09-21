import { TIME_CONSTANTS } from "../constants/time"
import type { IQuestion } from "../types/ai"

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE)
  const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE
  const minutesStr = minutes.toString().padStart(TIME_CONSTANTS.PAD_LENGTH, TIME_CONSTANTS.PAD_CHAR)
  const secondsStr = remainingSeconds.toString().padStart(TIME_CONSTANTS.PAD_LENGTH, TIME_CONSTANTS.PAD_CHAR)
  return `${minutesStr}:${secondsStr}`
}

interface IEvaluateAnswerParams {
  question: IQuestion
  answer: string
}

export const createEvaluationPromises = (
  answers: Array<{ questionId: string; answer: string }>, 
  questions: IQuestion[], 
  evaluateAnswer: (params: IEvaluateAnswerParams) => Promise<unknown>
): Array<Promise<unknown | null>> =>
  answers.map(async (answer) => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return null
    return evaluateAnswer({ question, answer: answer.answer })
  })
