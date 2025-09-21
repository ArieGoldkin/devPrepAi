import * as React from 'react'

import type { IQuestionResult } from '../../types/ai'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface IQuestionResultCardProps {
  result: IQuestionResult
  index: number
  children?: React.ReactNode
}

export function QuestionResultCard({ result, index, children }: IQuestionResultCardProps): React.JSX.Element {
  return (
    <Card variant="interactive" className="animate-slide-up">
      <CardHeader>
        <CardTitle className="text-title">Question {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-subtitle font-semibold mb-2">Question:</h4>
            <p className="text-body text-gray-700">{result.question.content}</p>
          </div>
          
          <div>
            <h4 className="text-subtitle font-semibold mb-2">Your Answer:</h4>
            <p className="text-body text-gray-700 bg-gray-50 p-3 rounded">{result.userAnswer}</p>
          </div>
          
          <div>
            <h4 className="text-subtitle font-semibold mb-2">Feedback:</h4>
            <div className="bg-brand-primary/10 p-3 rounded">
              <div className="text-title font-bold text-brand-primary mb-2">
                Score: {result.feedback.score}%
              </div>
              <p className="text-body text-gray-700">{result.feedback.overallFeedback}</p>
            </div>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
