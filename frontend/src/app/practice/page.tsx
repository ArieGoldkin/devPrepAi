"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'


import { ErrorMessage } from '../../components/practice/ErrorMessage'
import { PracticeOptions } from '../../components/practice/PracticeOptions'
import { ProfilePrompt } from '../../components/practice/ProfilePrompt'
import { ProfileSetup } from '../../components/practice/ProfileSetup'
import { generatePracticeQuestions } from '../../services/ai'
import { useAppStore } from '../../store/useAppStore'

export default function PracticePage(): React.JSX.Element {
  const router = useRouter()
  const { userProfile, startAssessment, recordActivity } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showProfileSetup, setShowProfileSetup] = useState(false)

  useEffect(() => {
    if (!userProfile) {
      setShowProfileSetup(true)
    }
  }, [userProfile])

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
        duration: 30,
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

  if (showProfileSetup) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Practice Setup</h1>
        <ProfileSetup onComplete={() => setShowProfileSetup(false)} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Practice Session</h1>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="max-w-2xl mx-auto space-y-6">
        {userProfile ? (
          <PracticeOptions
            userProfile={userProfile}
            loading={loading}
            onGenerateQuestions={() => void handleGenerateQuestions()}
            onEditProfile={() => setShowProfileSetup(true)}
          />
        ) : (
          <ProfilePrompt onSetupClick={() => setShowProfileSetup(true)} />
        )}
      </div>
    </div>
  )
}
