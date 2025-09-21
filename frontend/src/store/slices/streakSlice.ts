import type { StateCreator } from 'zustand'

import { TIME_CONSTANTS } from '../constants'

export interface IStreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
}

export interface IStreakState {
  streak: IStreakData
}

export interface IStreakActions {
  recordActivity: () => void
  getStreakData: () => IStreakData
}

const initialStreakData: IStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null
}

// Helper functions
const getTodayDateString = (): string => 
  new Date().toISOString().split('T')[0] ?? ''

const getYesterdayDateString = (): string => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0] ?? ''
}

const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (TIME_CONSTANTS.MS_PER_SECOND * TIME_CONSTANTS.SECONDS_PER_MINUTE * TIME_CONSTANTS.MINUTES_PER_HOUR * TIME_CONSTANTS.HOURS_PER_DAY))
}

export const createStreakSlice: StateCreator<
  IStreakState & IStreakActions,
  [],
  [],
  IStreakState & IStreakActions
> = (set, get) => ({
  streak: initialStreakData,

  recordActivity: (): void => 
    set((state) => {
      const today = getTodayDateString()
      const yesterday = getYesterdayDateString()

      // Don't update if already recorded today
      if (state.streak.lastActivityDate === today) return state

      const isFirstActivity = !state.streak.lastActivityDate
      const isContinuousStreak = state.streak.lastActivityDate === yesterday

      let newCurrentStreak = 1
      if (!isFirstActivity && isContinuousStreak) {
        newCurrentStreak = state.streak.currentStreak + 1
      }

      return {
        streak: {
          currentStreak: newCurrentStreak,
          longestStreak: Math.max(state.streak.longestStreak, newCurrentStreak),
          lastActivityDate: today
        }
      }
    }),

  getStreakData: (): IStreakData => {
    const state = get()
    const today = getTodayDateString()

    // Check if streak should be reset
    if (state.streak.lastActivityDate &&
        state.streak.lastActivityDate !== today &&
        daysBetween(state.streak.lastActivityDate, today) > 1) {

      const resetStreak = { ...state.streak, currentStreak: 0 }
      set({ streak: resetStreak })
      return resetStreak
    }

    return state.streak
  }
})

// Selectors
export const selectStreak = (state: IStreakState): IStreakData => 
  state.streak

export const selectStreakActions = (actions: IStreakActions): Pick<IStreakActions, 'recordActivity' | 'getStreakData'> => ({
  recordActivity: actions.recordActivity,
  getStreakData: actions.getStreakData
})
