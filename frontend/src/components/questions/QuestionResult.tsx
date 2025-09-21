import * as React from 'react'

import type { IQuestionResult } from '../../types/ai'
import { FeedbackCard } from '../results/FeedbackCard'
import { QuestionResultCard } from '../results/QuestionResultCard'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const ANSWER_MAX_LENGTH = 150
const FEEDBACK_MAX_LENGTH = 100
const ELLIPSIS = '...'

const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text
  return text.substring(0, max) + ELLIPSIS
}

interface IQuestionResultProps {
  result: IQuestionResult
  index: number
}

export const QuestionResult: React.FC<IQuestionResultProps> = ({
  result, 
  index
}) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <QuestionResultCard result={result} index={index}>
      <div>
        <h4 className="font-medium text-sm mb-2">Your Answer:</h4>
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
          {truncate(result.userAnswer, ANSWER_MAX_LENGTH)}
        </p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">
          {truncate(result.feedback.overallFeedback, FEEDBACK_MAX_LENGTH)}
        </p>
        <Button
          variant={expanded ? "ghost" : "outline"}
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
      </div>

      {expanded && (
        <div>
          <Separator className="my-3" />
          <FeedbackCard
            feedback={result.feedback}
            questionTitle={`Question ${index + 1} Feedback`}
          />
        </div>
      )}
    </QuestionResultCard>
  )
}
