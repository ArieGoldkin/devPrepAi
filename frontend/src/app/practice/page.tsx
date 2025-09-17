"use client"

import type React from "react"
import { useState } from "react"

import { PracticeSession } from "../../components/PracticeSession"
import { ProfileWizard, type IUserProfile as IProfileWizardProfile } from "../../components/ProfileWizard"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { aiService } from "../../services/ai"
import type { IQuestion, IUserProfile } from "../../types/ai"

const DEFAULT_QUESTION_COUNT = 3

const createAiProfile = (profile: IProfileWizardProfile): IUserProfile => ({
  experienceLevel: profile.experienceLevel as 'junior' | 'mid' | 'senior',
  technologies: profile.technologies,
  role: 'fullstack', // Default to fullstack
  interviewType: profile.interviewType as 'technical' | 'behavioral' | 'system-design'
})

const getDifficultyLevel = (experienceLevel: string): number => {
  switch (experienceLevel) {
    case 'junior': return 1
    case 'mid': return 2
    default: return 3
  }
}

const getQuestionType = (interviewType: string): string => interviewType === 'technical' ? 'coding' : interviewType

const ProfileSetup = ({ 
  onComplete 
}: { 
  onComplete: (profile: IProfileWizardProfile) => void 
}): React.JSX.Element => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice</h1>
      <p className="text-gray-600">Set up your profile to get personalized practice</p>
    </div>
    <ProfileWizard onComplete={onComplete} />
  </div>
)

// eslint-disable-next-line max-lines-per-function
const ProfileDisplay = ({
  profile,
  isLoading,
  error,
  onStartPractice,
  onEditProfile
}: {
  profile: IProfileWizardProfile
  isLoading: boolean
  error: string | null
  onStartPractice: () => Promise<void>
  onEditProfile: () => void
}): React.JSX.Element => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ready to Practice!</h1>
      <p className="text-gray-600">Your profile is configured. Start practicing now.</p>
    </div>
    {error && (
      <div className="w-full max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    )}
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Current practice settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-medium">Experience:</span> <span className="capitalize">{profile.experienceLevel}</span>
        </div>
        <div>
          <span className="font-medium">Technologies:</span> <span>{profile.technologies.join(", ")}</span>
        </div>
        <div>
          <span className="font-medium">Type:</span> <span className="capitalize">{profile.interviewType.replace("-", " ")}</span>
        </div>
        <div className="pt-4 space-y-2">
          <Button
            onClick={() => void onStartPractice()}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Generating Questions..." : "Start Practice"}
          </Button>
          <Button onClick={onEditProfile} variant="outline" className="w-full">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

const PracticeView = ({
  questions,
  userProfile,
  onFinish
}: {
  questions: IQuestion[]
  userProfile: IUserProfile
  onFinish: () => void
}): React.JSX.Element => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice Session</h1>
      <p className="text-gray-600">Answer the questions and get AI feedback</p>
    </div>
    <PracticeSession
      questions={questions}
      userProfile={userProfile}
      onFinish={onFinish}
    />
  </div>
)

// eslint-disable-next-line max-lines-per-function
export default function PracticePage(): React.JSX.Element {
  const [userProfile, setUserProfile] = useLocalStorage<IProfileWizardProfile | null>("devprep-user-profile", null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [practiceStarted, setPracticeStarted] = useState(false)

  const handleProfileComplete = (profile: IProfileWizardProfile): void => {
    setUserProfile(profile)
  }

  const handleStartPractice = async (): Promise<void> => {
    if (!userProfile) return

    setIsLoading(true)
    setError(null)

    try {
      const aiProfile = createAiProfile(userProfile)
      const difficulty = getDifficultyLevel(aiProfile.experienceLevel)
      const questionType = getQuestionType(aiProfile.interviewType)

      const response = await aiService.generateQuestions({
        profile: aiProfile,
        count: DEFAULT_QUESTION_COUNT,
        difficulty,
        type: questionType as "coding" | "behavioral" | "system-design"
      })

      if (response.success && response.data.questions.length > 0) {
        setQuestions(response.data.questions)
        setPracticeStarted(true)
      } else {
        setError(response.error ?? "Failed to generate questions")
      }
    } catch {
      setError("Failed to generate questions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinishSession = (): void => {
    setPracticeStarted(false)
    setQuestions([])
    setError(null)
  }

  const handleEditProfile = (): void => {
    setUserProfile(null)
    handleFinishSession()
  }

  if (!userProfile) {
    return <ProfileSetup onComplete={handleProfileComplete} />
  }

  if (!practiceStarted) {
    return (
      <ProfileDisplay
        profile={userProfile}
        isLoading={isLoading}
        error={error}
        onStartPractice={handleStartPractice}
        onEditProfile={handleEditProfile}
      />
    )
  }

  return (
    <PracticeView
      questions={questions}
      userProfile={createAiProfile(userProfile)}
      onFinish={handleFinishSession}
    />
  )
}
