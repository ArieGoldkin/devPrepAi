import type * as React from 'react'

import type { IAnswerFeedback } from '../types/ai'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'


const EXCELLENT_THRESHOLD = 80
const GOOD_THRESHOLD = 60

interface IFeedbackCardProps {
  feedback: IAnswerFeedback
  questionTitle?: string
}

const getScoreColor = (score: number): string => {
  if (score >= EXCELLENT_THRESHOLD) return 'bg-green-500'
  if (score >= GOOD_THRESHOLD) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getScoreLabel = (score: number): string => {
  if (score >= EXCELLENT_THRESHOLD) return 'Excellent'
  if (score >= GOOD_THRESHOLD) return 'Good'
  return 'Needs Improvement'
}

const getIconColor = (colorClass: string): string => colorClass.replace('text-', 'text-').replace('-700', '-500')

const FeedbackHeader = ({
  questionTitle,
  feedback
}: {
  questionTitle: string
  feedback: IAnswerFeedback
}): React.ReactElement => {
  const scoreColorClass = getScoreColor(feedback.score)
  const scoreLabel = getScoreLabel(feedback.score)
  
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg">Feedback</CardTitle>
          <CardDescription>{questionTitle}</CardDescription>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${scoreColorClass}`}>
            {feedback.score}/100
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {scoreLabel}
          </div>
        </div>
      </div>
    </CardHeader>
  )
}

const FeedbackSection = ({
  title,
  items,
  icon,
  colorClass
}: {
  title: string
  items: string[]
  icon: string
  colorClass: string
}): React.ReactElement | null => {
  if (items.length === 0) return null

  const iconColorClass = getIconColor(colorClass)

  return (
    <div>
      <h4 className={`font-medium mb-2 text-sm ${colorClass}`}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start">
            <span className={`mr-2 mt-0.5 ${iconColorClass}`}>
              {icon}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const OverallFeedback = ({ 
  feedback 
}: { 
  feedback: string 
}): React.ReactElement => (
  <div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      {feedback}
    </p>
  </div>
)

const StrengthsSection = ({ 
  strengths 
}: { 
  strengths: string[] 
}): React.ReactElement | null => (
  <FeedbackSection
    title="Strengths"
    items={strengths}
    icon="✓"
    colorClass="text-green-700"
  />
)

const ImprovementsSection = ({ 
  improvements 
}: { 
  improvements: string[] 
}): React.ReactElement | null => (
  <FeedbackSection
    title="Areas for Improvement"
    items={improvements}
    icon="→"
    colorClass="text-orange-700"
  />
)

const SuggestionsSection = ({ 
  suggestions 
}: { 
  suggestions: string[] 
}): React.ReactElement | null => (
  <FeedbackSection
    title="Suggestions"
    items={suggestions}
    icon="💡"
    colorClass="text-blue-700"
  />
)

export function FeedbackCard({
  feedback,
  questionTitle = "Your Answer"
}: IFeedbackCardProps): React.ReactElement {
  return (
    <Card className="w-full">
      <FeedbackHeader questionTitle={questionTitle} feedback={feedback} />
      <CardContent className="space-y-4">
        <OverallFeedback feedback={feedback.overallFeedback} />
        <Separator />
        <StrengthsSection strengths={feedback.strengths} />
        <ImprovementsSection improvements={feedback.improvements} />
        <SuggestionsSection suggestions={feedback.suggestions} />
      </CardContent>
    </Card>
  )
}
