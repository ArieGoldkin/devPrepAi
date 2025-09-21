"use client"

import React, { useState, useEffect } from 'react'

import type { IAssessmentAnswer } from '../../store/slices/assessmentSlice'
import { useAppStore } from '../../store/useAppStore'

import { AssessmentActions } from './AssessmentActions'
import { AssessmentHeader } from './AssessmentHeader'
import { QuestionDisplay } from './QuestionDisplay'

interface IAssessmentViewProps {
  onComplete?: () => void
}

export function AssessmentView({ onComplete }: IAssessmentViewProps): React.JSX.Element {
  const {
    questions,
    currentQuestionIndex,
    answers,
    submitAnswer,
    nextQuestion,
    completeAssessment,
    addResult
  } = useAppStore()

  const [currentAnswer, setCurrentAnswer] = useState('')
  const [hasAnswered, setHasAnswered] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  useEffect(() => {
    if (currentQuestion !== null && currentQuestion !== undefined) {
      const existingAnswer = answers.find((a: IAssessmentAnswer) => a.questionId === currentQuestion.id)
      setCurrentAnswer(existingAnswer?.answer ?? '')
      setHasAnswered(existingAnswer !== null && existingAnswer !== undefined)
    }
  }, [currentQuestionIndex, answers, currentQuestion])

  const handleAnswerChange = (value: string): void => {
    setCurrentAnswer(value)
  }

  const handleSubmitAnswer = (): void => {
    if (currentQuestion === null || currentQuestion === undefined || currentAnswer.trim() === "") return

    submitAnswer(currentQuestion.id, currentAnswer.trim())
    setHasAnswered(true)
  }

  const handleComplete = (): void => {
    const result = completeAssessment()
    addResult(result)
    onComplete?.()
  }

  const handleNext = (): void => {
    if (hasAnswered === false) {
      handleSubmitAnswer()
    }

    if (isLastQuestion) {
      handleComplete()
    } else {
      nextQuestion()
      setHasAnswered(false)
    }
  }

  const handleTimeUp = (): void => {
    if (currentAnswer.trim() !== "" && hasAnswered === false) {
      handleSubmitAnswer()
    }
    handleComplete()
  }

  const getAnswerTimeSpent = (): number | undefined => {
    if (!currentQuestion) return undefined
    const answerData = answers.find((a: IAssessmentAnswer) => a.questionId === currentQuestion.id)
    return answerData?.timeSpent
  }

  if (currentQuestion === null || currentQuestion === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No questions available</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AssessmentHeader
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onTimeUp={handleTimeUp}
      />
      <QuestionDisplay
        question={currentQuestion}
        currentAnswer={currentAnswer}
        hasAnswered={hasAnswered}
        answerTimeSpent={getAnswerTimeSpent() ?? 0}
        onAnswerChange={handleAnswerChange}
      />
      <AssessmentActions
        answersCount={answers.length}
        totalQuestions={questions.length}
        hasAnswered={hasAnswered}
        isLastQuestion={isLastQuestion}
        currentAnswer={currentAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onNext={handleNext}
      />
    </div>
  )
}
