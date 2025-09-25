// Re-export store types for convenience
export type { IUserProfile } from "@/types/ai";
export type { IUserState, IUserActions } from "./slices/userSlice";
export type {
  IAssessmentState,
  IAssessmentActions,
  IAssessmentAnswer,
} from "./slices/assessmentSlice";
export type { IResultsState, IResultsActions } from "./slices/resultsSlice";
export type {
  IStreakState,
  IStreakActions,
  IStreakData,
} from "./slices/streakSlice";
export type {
  IQuestionsState,
  IQuestionsActions,
  IQuestionAnswer,
  IHintUsage,
  IPerformanceMetrics,
} from "./slices/questionsSlice";
