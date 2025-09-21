import type * as React from 'react'
import { useState } from 'react'


import { aiService } from '../../services/ai'
import type { IAnswerFeedback, IQuestion, IUserProfile } from '../../types/ai'
import { AnswerInput } from '../AnswerInput'
import { QuestionList } from '../questions/QuestionList'

import { BackToProfileButton } from './BackToProfileButton'
import { ErrorMessage } from './ErrorMessage'
import { FeedbackSection } from './FeedbackSection'

interface IPracticeSessionProps {
  questions: IQuestion[]
  userProfile: IUserProfile
  onFinish: () => void
}



 
export function PracticeSession({
  questions,
  userProfile,
  onFinish
}: IPracticeSessionProps): React.ReactElement {
  // Note: userProfile is available for future enhancements (personalized feedback, etc.)
  console.warn('Practice session started for profile:', userProfile.experienceLevel)
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [feedback, setFeedback] = useState<IAnswerFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitAnswer = async (answer: string): Promise<void> => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await aiService.evaluateAnswer({
        question: currentQuestion,
        answer
      })

      if (response.success) {
        setFeedback(response.data.feedback)
        setCurrentAnswer("")
      } else {
        setError(response.error ?? "Failed to evaluate answer")
      }
    } catch {
      setError("Failed to evaluate answer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetQuestionState = (): void => {
    setCurrentAnswer("")
    setFeedback(null)
  }

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      resetQuestionState()
    }
  }

  const handlePreviousQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      resetQuestionState()
    }
  }

  const handleQuestionChange = (index: number): void => {
    setCurrentQuestionIndex(index)
    resetQuestionState()
  }

  const handleTryAgain = (): void => {
    setFeedback(null)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      
      <QuestionList
        questions={questions}
        currentIndex={currentQuestionIndex}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        onQuestionChange={handleQuestionChange}
      />

      {!feedback && currentQuestion && (
        <AnswerInput
          value={currentAnswer}
          onChange={setCurrentAnswer}
          onSubmit={(answer: string) => void handleSubmitAnswer(answer)}
          disabled={isLoading}
          submitButtonText={isLoading ? "Evaluating..." : "Submit Answer"}
          placeholder="Type your answer here. Take your time to think through the problem..."
          question={currentQuestion}
        />
      )}

      {feedback && (
        <FeedbackSection
          feedback={feedback}
          questionTitle={currentQuestion?.title ?? "Question"}
          onTryAgain={handleTryAgain}
          onNext={handleNextQuestion}
          onFinish={onFinish}
          isLastQuestion={isLastQuestion}
        />
      )}

      <BackToProfileButton onEditProfile={onFinish} />
    </div>
  )
}
