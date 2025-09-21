import type { StateCreator } from 'zustand'

import type { IAssessmentResults } from '../../types/ai'
import { RESULTS_LIMIT } from '../constants'

export interface IResultsState {
  assessmentResults: IAssessmentResults[]
}

export interface IResultsActions {
  addResult: (result: IAssessmentResults) => void
  getRecentResults: (limit?: number) => IAssessmentResults[]
}

export const createResultsSlice: StateCreator<
  IResultsState & IResultsActions,
  [],
  [],
  IResultsState & IResultsActions
> = (set, get) => ({
  assessmentResults: [],

  addResult: (result: IAssessmentResults): void => 
    set((state) => ({
      assessmentResults: [...state.assessmentResults, result]
    })),

  getRecentResults: (limit: number = RESULTS_LIMIT): IAssessmentResults[] => {
    const { assessmentResults } = get()
    return assessmentResults
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, limit)
  }
})

// Selectors
export const selectAssessmentResults = (state: IResultsState): IAssessmentResults[] => 
  state.assessmentResults
