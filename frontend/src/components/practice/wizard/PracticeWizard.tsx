import React from 'react'

import type { WizardStep, PracticeSettings } from './constants'
import { ProfileStep } from './ProfileStep'
import { ReadyStep } from './ReadyStep'
import { SettingsStep } from './SettingsStep'
import { StepIndicator } from './StepIndicator'
import { WelcomeStep } from './WelcomeStep'
import { WizardNavigation } from './WizardNavigation'

interface IPracticeWizardProps {
  currentStep: WizardStep
  userProfile: unknown
  practiceSettings: PracticeSettings
  loading: boolean
  onStepChange: (step: WizardStep) => void
  onSettingsChange: (settings: PracticeSettings) => void
  onStart: () => Promise<void>
}

export function PracticeWizard({
  currentStep,
  userProfile,
  practiceSettings,
  loading,
  onStepChange,
  onSettingsChange,
  onStart
}: IPracticeWizardProps): React.JSX.Element {
  const { handleNext, handleBack } = WizardNavigation({
    currentStep,
    userProfile,
    onStepChange
  })

  return (
    <>
      <StepIndicator currentStep={currentStep} />

      <div className="animate-fade-in">
        {currentStep === 'welcome' && <WelcomeStep onNext={handleNext} />}
        {currentStep === 'profile' && <ProfileStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 'settings' && (
          <SettingsStep
            settings={practiceSettings}
            onSettingsChange={onSettingsChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 'ready' && (
          <ReadyStep
            settings={practiceSettings}
            loading={loading}
            onStart={onStart}
            onBack={handleBack}
          />
        )}
      </div>
    </>
  )
}