import React from 'react'

import { TIME_CONSTANTS } from '../../store/constants'
import type { IQuestion } from '../../types/ai'
import { Textarea } from '../ui/textarea'

interface IQuestionDisplayProps {
  question: IQuestion
  currentAnswer: string
  hasAnswered: boolean
  answerTimeSpent?: number
  onAnswerChange: (value: string) => void
}

export function QuestionDisplay({
  question,
  currentAnswer,
  hasAnswered,
  answerTimeSpent,
  onAnswerChange
}: IQuestionDisplayProps): React.JSX.Element {
  const formatTimeSpent = (seconds: number): string => {
    const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE)
    const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">{question.content}</h3>

      {question.content !== null && question.content !== undefined && question.content !== "" && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Context:</h4>
          <pre className="whitespace-pre-wrap text-sm">{question.content}</pre>
        </div>
      )}

      <Textarea
        value={currentAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-32"
        disabled={hasAnswered}
      />

      {hasAnswered && answerTimeSpent !== undefined && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center text-green-700">
            <span className="font-medium">Answer submitted!</span>
            <span className="ml-2 text-sm">
              Time spent: {formatTimeSpent(answerTimeSpent)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}