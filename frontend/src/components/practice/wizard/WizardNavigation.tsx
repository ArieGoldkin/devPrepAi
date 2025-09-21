import type { WizardStep } from './constants'

interface IWizardNavigationProps {
  currentStep: WizardStep
  userProfile: unknown
  onStepChange: (step: WizardStep) => void
}

export function WizardNavigation({ currentStep, userProfile, onStepChange }: IWizardNavigationProps): {
  handleNext: () => void
  handleBack: () => void
  canGoNext: boolean
  canGoBack: boolean
} {
  const handleNext = (): void => {
    switch (currentStep) {
      case 'welcome':
        onStepChange(userProfile != null ? 'settings' : 'profile')
        break
      case 'profile':
        onStepChange('settings')
        break
      case 'settings':
        onStepChange('ready')
        break
      default:
        break
    }
  }

  const handleBack = (): void => {
    switch (currentStep) {
      case 'profile':
        onStepChange('welcome')
        break
      case 'settings':
        onStepChange('profile')
        break
      case 'ready':
        onStepChange('settings')
        break
      default:
        break
    }
  }

  const canGoNext = currentStep !== 'ready'
  const canGoBack = currentStep !== 'welcome'

  return {
    handleNext,
    handleBack,
    canGoNext,
    canGoBack
  }
}