"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
import Logo from '@/components/ui/logo'
import { Progress } from '@/components/ui/progress'

import { ErrorMessage } from '../../components/practice/ErrorMessage'
import {
  TOTAL_STEPS,
  PROGRESS_MULTIPLIER
} from '../../components/practice/wizard'
import type { WizardStep, PracticeSettings } from '../../components/practice/wizard'
import { PracticeWizard } from '../../components/practice/wizard/PracticeWizard'
import { generatePracticeQuestions } from '../../services/ai'
import { useAppStore } from '../../store/useAppStore'

export default function PracticePage(): React.JSX.Element {
  const router = useRouter()
  const { userProfile, startAssessment, recordActivity } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState<WizardStep>('welcome')
  const [practiceSettings, setPracticeSettings] = useState<PracticeSettings>({
    duration: 30,
    questionCount: 5,
    difficulty: 'medium',
    focusAreas: []
  })

  useEffect(() => {
    if (!userProfile && currentStep !== 'welcome') {
      setCurrentStep('profile')
    }
  }, [userProfile, currentStep])

  const handleGenerateQuestions = async (): Promise<void> => {
    if (!userProfile) {
      setError('Please complete your profile first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const questions = await generatePracticeQuestions(userProfile)

      if (questions.length === 0) {
        throw new Error('No questions could be generated. Please try again.')
      }

      startAssessment(questions, {
        duration: practiceSettings.duration,
        questionCount: questions.length,
        autoSubmit: false
      })
      recordActivity()
      router.push('/assessment')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate questions'
      setError(`Failed to generate practice questions: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  const getStepNumber = (): number => {
    switch (currentStep) {
      case 'welcome': return 1
      case 'profile': return 2
      case 'settings': return 3
      case 'ready': return 4
      default: return 1
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container-xl flex h-16 items-center justify-between">
          <Logo size="sm" />
          <Badge variant="outline" className="text-xs">
            Practice Mode
          </Badge>
        </div>
      </header>

      <div className="container-xl py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <Progress value={(getStepNumber() / TOTAL_STEPS) * PROGRESS_MULTIPLIER} className="h-1 max-w-2xl mx-auto" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <ErrorMessage message={error} onDismiss={() => setError('')} />
          </div>
        )}

        {/* Practice Wizard */}
        <PracticeWizard
          currentStep={currentStep}
          userProfile={userProfile}
          practiceSettings={practiceSettings}
          loading={loading}
          onStepChange={setCurrentStep}
          onSettingsChange={setPracticeSettings}
          onStart={handleGenerateQuestions}
        />
      </div>
    </div>
  )
}