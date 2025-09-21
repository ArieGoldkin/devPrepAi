// Constants for practice wizard
export const DURATION_15_MIN = 15
export const DURATION_30_MIN = 30
export const DURATION_45_MIN = 45
export const QUESTION_COUNT_3 = 3
export const QUESTION_COUNT_5 = 5
export const QUESTION_COUNT_7 = 7
export const QUESTION_COUNT_10 = 10

export const DURATION_OPTIONS = [DURATION_15_MIN, DURATION_30_MIN, DURATION_45_MIN] as const
export const QUESTION_COUNT_OPTIONS = [QUESTION_COUNT_3, QUESTION_COUNT_5, QUESTION_COUNT_7, QUESTION_COUNT_10] as const
export const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'] as const
export const FOCUS_AREAS = [
  'Algorithms',
  'Data Structures',
  'System Design',
  'Behavioral',
  'Frontend',
  'Backend',
  'Databases',
  'Security'
] as const
export const TOTAL_STEPS = 4
export const PROGRESS_MULTIPLIER = 100

export type WizardStep = 'welcome' | 'profile' | 'settings' | 'ready'
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface IPracticeSettings {
  duration: number
  questionCount: number
  difficulty: DifficultyLevel
  focusAreas: string[]
}

// Legacy export for backward compatibility
export type PracticeSettings = IPracticeSettings