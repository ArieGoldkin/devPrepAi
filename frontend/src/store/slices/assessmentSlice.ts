import type { StateCreator } from 'zustand'

import type { IQuestion, IAssessmentResults, IQuestionResult } from '../../types/ai'
import { TIME_CONSTANTS, ASSESSMENT_DEFAULTS } from '../constants'

export interface IAssessmentAnswer {
  questionId: string
  answer: string
  timeSpent: number
  answeredAt: string
}

export interface IAssessmentState {
  questions: IQuestion[]
  currentQuestionIndex: number
  answers: IAssessmentAnswer[]
  timeRemaining: number
  isActive: boolean
  startedAt: string | null
  settings: {
    duration: number // minutes
    questionCount: number
    autoSubmit: boolean
  }
}

export interface IAssessmentActions {
  startAssessment: (questions: IQuestion[], settings?: Partial<IAssessmentState['settings']>) => void
  submitAnswer: (questionId: string, answer: string) => void
  nextQuestion: () => void
  completeAssessment: () => IAssessmentResults
  resetAssessment: () => void
  updateTimer: (timeRemaining: number) => void
}

const initialAssessmentState: IAssessmentState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: 0,
  isActive: false,
  startedAt: null,
  settings: ASSESSMENT_DEFAULTS
}

export const createAssessmentSlice: StateCreator<
  IAssessmentState & IAssessmentActions,
  [],
  [],
  IAssessmentState & IAssessmentActions
> = (set, get) => ({
  ...initialAssessmentState,

  startAssessment: (questions: IQuestion[], settings?: Partial<IAssessmentState['settings']>): void => {
    if (questions.length === 0) return

    set({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isActive: true,
      startedAt: new Date().toISOString(),
      timeRemaining: (settings?.duration ?? ASSESSMENT_DEFAULTS.duration) * TIME_CONSTANTS.SECONDS_PER_MINUTE,
      settings: { ...ASSESSMENT_DEFAULTS, ...settings }
    })
  },

  submitAnswer: (questionId: string, answer: string): void =>
    set((state) => {
      const existingAnswer = state.answers.find((a: IAssessmentAnswer) => a.questionId === questionId)
      if (existingAnswer !== null && existingAnswer !== undefined) return state

      const startTime = new Date(state.startedAt ?? '').getTime()
      const currentTime = new Date().getTime()
      const timeSpent = Math.floor((currentTime - startTime) / TIME_CONSTANTS.MS_PER_SECOND)

      const newAnswer: IAssessmentAnswer = {
        questionId,
        answer,
        timeSpent,
        answeredAt: new Date().toISOString()
      }

      const existingIndex = state.answers.findIndex((a: IAssessmentAnswer) => a.questionId === questionId)
      const updatedAnswers = existingIndex >= 0
        ? state.answers.map((a: IAssessmentAnswer, i: number) => i === existingIndex ? newAnswer : a)
        : [...state.answers, newAnswer]

      return {
        ...state,
        answers: updatedAnswers
      }
    }),

  nextQuestion: (): void =>
    set((state) => ({
      ...state,
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      )
    })),

  completeAssessment: (): IAssessmentResults => {
    const state = get()

    const questionResults: IQuestionResult[] = state.questions.map((question: IQuestion) => {
      const answer = state.answers.find((a: IAssessmentAnswer) => a.questionId === question.id)
      return {
        question,
        userAnswer: answer?.answer ?? '',
        feedback: {
          score: 0,
          strengths: [],
          improvements: [],
          suggestions: [],
          overallFeedback: 'Assessment completed - evaluation pending'
        },
        timeSpent: answer?.timeSpent ?? 0
      }
    })

    const totalTimeAllocated = state.settings.duration * TIME_CONSTANTS.SECONDS_PER_MINUTE
    const totalTimeSpent = totalTimeAllocated - state.timeRemaining

    const result: IAssessmentResults = {
      questions: questionResults,
      totalTimeSpent,
      totalTimeAllocated,
      completedAt: new Date().toISOString()
    }

    set(initialAssessmentState)
    return result
  },

  resetAssessment: (): void =>
    set(initialAssessmentState),

  updateTimer: (timeRemaining: number): void =>
    set((state) => ({
      ...state,
      timeRemaining
    }))
})

// Selectors
export const selectCurrentQuestion = (state: IAssessmentState): IQuestion | null =>
  state.questions[state.currentQuestionIndex] ?? null

export const selectAssessmentProgress = (state: IAssessmentState): number =>
  state.questions.length > 0
    ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
    : 0

export const selectTimeProgress = (state: IAssessmentState): number => {
  const totalTime = state.settings.duration * TIME_CONSTANTS.SECONDS_PER_MINUTE
  return totalTime > 0 ? ((totalTime - state.timeRemaining) / totalTime) * 100 : 0
}