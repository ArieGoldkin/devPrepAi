/**
 * Results Store Types
 */
import type { IAssessmentResults } from "@/types/ai";

export interface IResultsState {
  assessmentResults: IAssessmentResults[];
}

export interface IResultsActions {
  addResult: (result: IAssessmentResults) => void;
  getRecentResults: (limit?: number) => IAssessmentResults[];
}
