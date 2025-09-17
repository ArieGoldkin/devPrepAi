/* eslint-disable max-lines */
'use client'

import type { ReactElement } from 'react'
import { useState } from 'react'

import { AnswerInput } from '../../components/AnswerInput'
import { QuestionCard } from '../../components/QuestionCard'
import { QuestionList } from '../../components/QuestionList'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import type { IQuestion } from '../../types/ai'

const ANSWER_PREVIEW_LENGTH = 50

// Sample data for testing
const sampleQuestions: IQuestion[] = [
  {
    id: '1',
    title: 'Explain the difference between let, const, and var',
    content: 'JavaScript has three ways to declare variables. Can you explain the differences between let, const, and var, including their scoping rules and when you would use each one?',
    type: 'conceptual',
    difficulty: 4,
    category: 'JavaScript Fundamentals',
    hints: ['Think about block scope vs function scope', 'Consider hoisting behavior'],
    solution: 'var is function-scoped and hoisted, let is block-scoped and temporal dead zone, const is block-scoped and immutable reference',
    timeEstimate: 5,
    tags: ['javascript', 'variables', 'scope'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Implement a debounce function',
    content: 'Write a debounce function that delays the execution of a function until after a specified delay has passed since the last time it was invoked.',
    type: 'coding',
    difficulty: 6,
    category: 'JavaScript Programming',
    hints: ['Use setTimeout and clearTimeout', 'Return a function that wraps the original'],
    solution: 'function debounce(func, delay) { let timeoutId; return function(...args) { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; }',
    timeEstimate: 15,
    tags: ['javascript', 'functions', 'optimization'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Design a URL shortener system',
    content: 'Design a URL shortening service like bit.ly. Consider the database schema, API endpoints, and how you would handle scaling to millions of URLs.',
    type: 'system-design',
    difficulty: 8,
    category: 'System Design',
    hints: ['Think about encoding algorithms', 'Consider caching strategies', 'Database partitioning'],
    solution: 'Use base62 encoding, implement caching layer, design for horizontal scaling',
    timeEstimate: 30,
    tags: ['system-design', 'scaling', 'databases'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

const handleAnswerSubmit = (submittedAnswer: string): void => {
  console.warn('Answer submitted:', submittedAnswer)
  // Replace alert with better UX in real app
  const preview = submittedAnswer.slice(0, ANSWER_PREVIEW_LENGTH)
  console.warn(`Answer submitted: ${preview}...`)
}

// eslint-disable-next-line max-lines-per-function
const SingleQuestionDemo = ({ 
  currentIndex, 
  questions, 
  answer, 
  setAnswer, 
  handleNext, 
  handlePrevious 
}: {
  currentIndex: number
  questions: IQuestion[]
  answer: string
  setAnswer: (answer: string) => void
  handleNext: () => void
  handlePrevious: () => void
}): ReactElement => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Single Question Demo</CardTitle>
      </CardHeader>
      <CardContent>
        {questions[currentIndex] && (
          <QuestionCard question={questions[currentIndex]} />
        )}
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Answer Input Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <AnswerInput
          value={answer}
          onChange={setAnswer}
          onSubmit={handleAnswerSubmit}
          placeholder="Type your answer here..."
        />
      </CardContent>
    </Card>
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Previous Question
      </Button>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentIndex === questions.length - 1}
      >
        Next Question
      </Button>
    </div>
  </div>
)

const QuestionListDemo = ({
  questions,
  currentIndex,
  handleNext,
  handlePrevious,
  setCurrentQuestionIndex
}: {
  questions: IQuestion[]
  currentIndex: number
  handleNext: () => void
  handlePrevious: () => void
  setCurrentQuestionIndex: (index: number) => void
}): ReactElement => (
  <Card>
    <CardHeader>
      <CardTitle>Question List Demo</CardTitle>
    </CardHeader>
    <CardContent>
      <QuestionList
        questions={questions}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onQuestionChange={setCurrentQuestionIndex}
      />
    </CardContent>
  </Card>
)

// eslint-disable-next-line max-lines-per-function
export default function DemoPage(): ReactElement {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showList, setShowList] = useState(false)

  const handleNext = (): void => {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, sampleQuestions.length - 1))
    setAnswer('') // Reset answer for new question
  }

  const handlePrevious = (): void => {
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))
    setAnswer('')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Component Demo</h1>
          <p className="text-lg text-muted-foreground">
            Testing QuestionCard, QuestionList, and AnswerInput components
          </p>
        </header>
        <div className="flex gap-4 justify-center">
          <Button
            variant={!showList ? "default" : "outline"}
            onClick={() => setShowList(false)}
          >
            Single Question
          </Button>
          <Button
            variant={showList ? "default" : "outline"}
            onClick={() => setShowList(true)}
          >
            Question List
          </Button>
        </div>
        {!showList ? (
          <SingleQuestionDemo
            currentIndex={currentQuestionIndex}
            questions={sampleQuestions}
            answer={answer}
            setAnswer={setAnswer}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        ) : (
          <QuestionListDemo
            questions={sampleQuestions}
            currentIndex={currentQuestionIndex}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        )}
      </main>
    </div>
  )
}
