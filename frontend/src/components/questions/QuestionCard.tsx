import type * as React from 'react'
import { useState } from 'react'

import type { IQuestion } from '../../types/ai'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'


const EASY_THRESHOLD = 3
const MEDIUM_THRESHOLD = 7
const MAX_VISIBLE_TAGS = 2

interface IQuestionCardProps {
  question: IQuestion
}

const getDifficultyColor = (difficulty: number): 'secondary' | 'default' | 'destructive' => {
  if (difficulty <= EASY_THRESHOLD) return 'secondary'
  if (difficulty <= MEDIUM_THRESHOLD) return 'default'
  return 'destructive'
}

const getDifficultyLabel = (difficulty: number): string => {
  if (difficulty <= EASY_THRESHOLD) return 'Easy'
  if (difficulty <= MEDIUM_THRESHOLD) return 'Medium'
  return 'Hard'
}

const QuestionHeader = ({ 
  question 
}: { 
  question: IQuestion 
}): React.ReactElement => (
  <CardHeader>
    <div className="flex items-start justify-between gap-4">
      <CardTitle className="text-lg leading-6">{question.title}</CardTitle>
      <div className="flex gap-2 flex-shrink-0">
        <Badge variant="outline" className="text-xs">
          {question.type}
        </Badge>
        <Badge variant={getDifficultyColor(question.difficulty)} className="text-xs">
          {getDifficultyLabel(question.difficulty)}
        </Badge>
      </div>
    </div>
  </CardHeader>
)

const QuestionContent = ({ 
  content 
}: { 
  content: string 
}): React.ReactElement => (
  <div className="text-sm text-muted-foreground leading-relaxed">
    {content}
  </div>
)

const HintSection = ({ 
  hints,
  showHint,
  onToggleHint
}: { 
  hints: string[]
  showHint: boolean
  onToggleHint: () => void
}): React.ReactElement | null => {
  if (!hints?.length) return null

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleHint}
        className="text-xs"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </Button>
      {showHint && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground font-medium mb-1">Hint:</p>
          <p className="text-sm">{hints[0]}</p>
        </div>
      )}
    </div>
  )
}

const QuestionMetadata = ({ 
  question 
}: { 
  question: IQuestion 
}): React.ReactElement => {
  const hasValidTags = Boolean(question.tags?.length)
  const visibleTags = hasValidTags ? question.tags!.slice(0, MAX_VISIBLE_TAGS) : []

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span>Category: {question.category}</span>
      <span>•</span>
      <span>Time: {question.timeEstimate} min</span>
      {hasValidTags && (
        <>
          <span>•</span>
          <span>Tags: {visibleTags.join(', ')}</span>
        </>
      )}
    </div>
  )
}

export function QuestionCard({ question }: IQuestionCardProps): React.ReactElement {
  const [showHint, setShowHint] = useState(false)

  const handleToggleHint = (): void => {
    setShowHint(!showHint)
  }

  return (
    <Card className="w-full">
      <QuestionHeader question={question} />
      <CardContent className="space-y-4">
        <QuestionContent content={question.content} />
        <HintSection 
          hints={question.hints} 
          showHint={showHint} 
          onToggleHint={handleToggleHint} 
        />
        <QuestionMetadata question={question} />
      </CardContent>
    </Card>
  )
}
