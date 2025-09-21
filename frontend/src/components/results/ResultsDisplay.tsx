import * as React from 'react'

import type { IAssessmentResults } from '../../types/ai'
import { QuestionResult } from '../questions/QuestionResult'

import { ResultsSummary } from './ResultsSummary'

interface IResultsDisplayProps {
  assessmentResults: IAssessmentResults
  className?: string
}

export function ResultsDisplay({ assessmentResults, className = '' }: IResultsDisplayProps): React.JSX.Element {
  return (
    <div className={`${className} animate-fade-in`}>
      <ResultsSummary results={assessmentResults} />
      
      <div className="mt-6 space-y-4">
        <h3 className="text-title font-semibold">Question Details</h3>
        {assessmentResults.questions.map((result, index) => (
          <QuestionResult key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  )
}
