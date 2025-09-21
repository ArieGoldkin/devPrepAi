import * as React from 'react'

import type { IAssessmentResults } from '../../types/ai'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface IResultsSummaryProps {
  results: IAssessmentResults
}

export function ResultsSummary({ results }: IResultsSummaryProps): React.JSX.Element {
  const totalQuestions = results.questions.length
  const averageScore = results.questions.reduce((acc, q) => acc + q.feedback.score, 0) / totalQuestions

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
            <div className="text-sm text-gray-600">Questions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{averageScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
