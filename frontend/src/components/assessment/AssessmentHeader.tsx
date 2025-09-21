import React from 'react'

import { Timer } from './Timer'

interface IAssessmentHeaderProps {
  currentIndex: number
  totalQuestions: number
  onTimeUp: () => void
}

export function AssessmentHeader({ currentIndex, totalQuestions, onTimeUp }: IAssessmentHeaderProps): React.JSX.Element {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold">
          Question {currentIndex + 1} of {totalQuestions}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <Timer onTimeUp={onTimeUp} />
    </div>
  )
}