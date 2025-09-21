import React from 'react'

import { TIME_CONSTANTS } from '../../store/constants'
import type { IAssessmentResults } from '../../types/ai'
import { Card, CardContent } from '../ui/card'

interface IStatisticsProps {
  results: IAssessmentResults[]
}

export function Statistics({ results }: IStatisticsProps): React.JSX.Element {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE)
    const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE

    if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} sec`
    }
    return `${remainingSeconds} sec`
  }

  const calculateAverageScore = (): number => {
    if (results.length === 0) return 0

    const totalScore = results.reduce((acc, result) => {
      const resultScore = result.questions.reduce((questionAcc, q) =>
        questionAcc + q.feedback.score, 0
      ) / result.questions.length
      return acc + resultScore
    }, 0)

    return Math.round((totalScore / results.length) * 100) / 100
  }

  const averageTime = Math.round(
    results.reduce((acc, r) => acc + r.totalTimeSpent, 0) / results.length
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{results.length}</div>
          <p className="text-sm text-gray-600">Total Assessments</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">
            {calculateAverageScore().toFixed(1)}%
          </div>
          <p className="text-sm text-gray-600">Average Score</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">
            {formatDuration(averageTime)}
          </div>
          <p className="text-sm text-gray-600">Average Time</p>
        </CardContent>
      </Card>
    </div>
  )
}