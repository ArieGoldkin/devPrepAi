"use client"

import React, { useEffect, useState } from 'react'


import { EmptyState } from '../../components/results/EmptyState'
import { ResultCard } from '../../components/results/ResultCard'
import { Statistics } from '../../components/results/Statistics'
import { useAppStore } from '../../store/useAppStore'
import type { IAssessmentResults } from '../../types/ai'

export default function ResultsPage(): React.JSX.Element {
  const { getRecentResults } = useAppStore()
  const [results, setResults] = useState<IAssessmentResults[]>([])

  useEffect(() => {
    const recentResults = getRecentResults()
    setResults(recentResults)
  }, [getRecentResults])

  if (results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Assessment Results</h1>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Assessment Results</h1>
        <Statistics results={results} />
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <ResultCard
            key={index}
            result={result}
            index={index}
            totalResults={results.length}
          />
        ))}
      </div>
    </div>
  )
}
